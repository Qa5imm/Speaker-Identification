import { useDispatch } from "react-redux";
import { Recordings } from "../Redux/features/state";

const ChooseFile = (props) => {
  const dispatch = useDispatch();

  const handleFile = (e) => {
    console.log(e.target.files[0]);
    if (e.target.files[0] !== undefined) {
      dispatch(Recordings({ name: props.name, file: e.target.files[0] })); // saving file in redux
    }
  };

  return (
    <div>
      <h1 className="font-bold m-12 text-2xl">Upload file</h1>
      <form>
        <input
          type="file"
          accept=".wav, .ogg, .mp3, .mpeg, "
          onChange={handleFile}
        />
      </form>
    </div>
  );
};

export default ChooseFile;
