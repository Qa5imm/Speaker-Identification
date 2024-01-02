import { useDispatch } from "react-redux";
import { Recordings } from "../Redux/features/state";

const ChooseFile = (props) => {
  const dispatch = useDispatch();

  const handleFile = (e) => {
    if (e.target.files[0] !== undefined) {
      dispatch(Recordings({ name: props.name, file: e.target.files[0] })); // saving file in redux
    }
  };

  return (
    <div className="mt-12 mb-6">
      <form>
        <input
          className="text-lg cursor-pointer md:text-xl"
          type="file"
          accept=".wav, .ogg, .mp3, .mpeg, "
          onChange={handleFile}
        />
      </form>
    </div>
  );
};

export default ChooseFile;
