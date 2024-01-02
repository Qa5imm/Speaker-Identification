import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  usersNum: 0,
  recordingsNum: 0,
  duration: 0,
  recordings: {},
};

const stateSlice = createSlice({
  name: "state",
  initialState,
  reducers: {
    UsersNum: (state, action) => {
      state.usersNum = action.payload;
    },
    RecordingsNum: (state, action) => {
      state.recordingsNum = action.payload;
    },
    Duration: (state, action) => {
      state.duration = action.payload;
    },
    Recordings: (state, action) => {
      if (state.recordings[action.payload.name] !== undefined) {
        // checking if a value exist corresponding to a key
        state.recordings[action.payload.name] = [
          ...state.recordings[action.payload.name],
          action.payload.file,
        ];
      } else {
        // if not then add it for the first time
        state.recordings[action.payload.name] = [action.payload.file];
      }
    },
    removeRecording: (state, action) => {
      // to reomve a specific file against a specific user
      const list = state.recordings[action.payload.uname].filter(
        (file) => file.name !== action.payload.fname
      );
      state.recordings[action.payload.uname] = list;
    },
  },
});

export const {
  UsersNum,
  RecordingsNum,
  Duration,
  Recordings,
  removeRecording,
} = stateSlice.actions;
export default stateSlice.reducer;
