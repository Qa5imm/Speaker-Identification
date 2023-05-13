from fastapi import FastAPI, UploadFile, File, Body, Form
from pathlib import Path
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List


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


@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.get("/check")
async def get_users():
    # code to retrieve users
    return {"message": "Users retrieved successfully"}



# Update the function parameter to use the Body module and media_type
@app.post("/uploadfile/")
async def create_upload_file(name: str = Form(...), file_uploads: List[UploadFile] = File(...)):
    # Iterating over list of files corresponding to each user
    for file_upload in file_uploads:
        # Use the file_upload.file attribute to read the uploaded file
        data = await file_upload.read()
        file_path = UPLOAD_DIR / file_upload.filename
        with open(file_path, "wb") as file_object:
            file_object.write(data)
    # Return the filenames as a list
    return {"filenames": [f.filename for f in file_uploads]}
