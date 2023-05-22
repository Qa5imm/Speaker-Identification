from fastapi import FastAPI, UploadFile, File, Body, Form
from pathlib import Path
from fastapi.middleware.cors import CORSMiddleware
from typing import List
import numpy as np
from resemblyzer import preprocess_wav, VoiceEncoder
from itertools import groupby
from pathlib import Path
from tqdm import tqdm
import os
from sklearn.metrics.pairwise import cosine_similarity, cosine_distances
import glob


UPLOAD_DIR = Path() / "uploads"
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)

app = FastAPI()


# Add a CORS middleware to allow cross-origin requests from the frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# del all files in uploads folder


def delFiles():
    files = glob.glob('uploads/*')
    for f in files:
        os.remove(f)

# main function which returns the name of person which has highest similarity index with test audio


async def predictor(names, file_uploads, usersNum, recordingsNum):
    speaker_embed_list = []
    encoder = VoiceEncoder()
    # Iterating over list of files corresponding to each user
    speaker_wavs_list = []
    fileInd = 0
    names.pop()  # to remove key named "test"
    for name in names:
        wav_fpaths = []
        for ind in range(int(recordingsNum)):
            file_upload = file_uploads[fileInd]
            data = await file_upload.read()
            # appending person's name to the his/her recordings
            filename = name+"¬"+file_upload.filename
            file_path = UPLOAD_DIR / filename
            with open(file_path, "wb") as file_object:
                file_object.write(data)
            wav_fpaths.append(Path(file_path))
            fileInd += 1
        speaker_wavs = {speaker: list(map(preprocess_wav, wav_fpaths)) for speaker, wav_fpaths in
                        groupby(tqdm(wav_fpaths, "Preprocessing wavs", len(wav_fpaths), unit="wavs"),
                                lambda wav_fpath: os.path.basename(wav_fpath).split("¬")[0])}  # extracting person's name from file name
        speaker_wavs_list.append(speaker_wavs)

    # make a list of the pre-processed audios ki arrays
    for sp_wvs in speaker_wavs_list:
        speaker_embed_list.append(
            np.array([encoder.embed_speaker(wavs) for wavs in sp_wvs.values()]))


    # making preprocessed test audio
    wav_fpaths = []
    file_upload = file_uploads[-1]
    data = await file_upload.read()
    filename = "test¬"+file_upload.filename
    file_path = UPLOAD_DIR / filename
    with open(file_path, "wb") as file_object:
        file_object.write(data)
    wav_fpaths.append(Path(file_path))
    test_pos_wavs = {speaker: list(map(preprocess_wav, wav_fpaths)) for speaker, wav_fpaths in
                     groupby(tqdm(wav_fpaths, "Preprocessing wavs", len(wav_fpaths), unit="wavs"),
                             lambda wav_fpath: "test")}
    test_pos_emb = np.array([encoder.embed_speaker(wavs)
                            for wavs in test_pos_wavs.values()])

    # calculates cosine similarity between the ground truth (test file) and registered audios
    speakers = {}
    val = 0
    for spkr_embd in speaker_embed_list:
        key_val = names[val]
        spkr_sim = cosine_similarity(spkr_embd, test_pos_emb)[0][0]
        speakers[key_val] = spkr_sim
        val += 1

    norm = [float(i)/sum(speakers.values()) for i in speakers.values()]
    for i in range(len(norm)):
        key_val = names[i]
        speakers[key_val] = norm[i]

    identified = max(speakers, key=speakers.get)
    print("\nThe identity of the test speaker:\n", identified, "with a similarity with test of",
          speakers[identified]*100, "percent match as compared to all.")
    return identified


# Update the function parameter to use the Body module and media_type
@app.post("/predict/")
async def resultGenerator(names: List[str] = Form(...), file_uploads: List[UploadFile] = File(...), usersNum: str = Form(...), recordingsNum: str = Form(...)):
    # equal to 2 because names list is of the form [name1, name2,..., test]
    try:
        if (len(names) <= 2):
            return {"error: ", "Incorrect data provided"}
        else:
            result = await predictor(names, file_uploads, usersNum, recordingsNum)
            print('## Test Audio Belonged To: {}'.format(result))
            delFiles()  # to delete all files from backend, used in this identification
            return {"result": result}
    except:
        return {"error": "Server not responding"}
