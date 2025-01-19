import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authorizedAxiosInstance from "../../utils/authorizedAxios";

const initialState = {
  matchesValue: [],
  modifiedMatches: {},
  loading: false,
  error: null,
};

const getMatches = createAsyncThunk("matches/getMatches", async () => {
  try {
    const res = await authorizedAxiosInstance.get("/matches");
    return res.data.data;
  } catch (error) {
    console.error(error);
  }
});

export const matchesSlice = createSlice({
  name: "matches",
  initialState,
  reducers: {
    // addMatch: (state, action) => {
    //   const newMatch = action.payload;
    //   const matchDate = newMatch.matchDate

    //   if (!state.modifiedMatches[matchDate]) {
    //     state.modifiedMatches[matchDate] = [];
    //   }

    //   const matchExists = state.modifiedMatches[matchDate].some(
    //     (m) => m.id === newMatch.id
    //   );

    //   if (!matchExists) {
    //     state.modifiedMatches[matchDate].push(newMatch);
    //   }
    // },
    updateUsersJoin(state, action) {
      const { matchId, usersJoin } = action.payload;

      // Update matchesValue
      if (Array.isArray(state.matchesValue)) {
        state.matchesValue = state.matchesValue.map((match) =>
          match.id === matchId ? { ...match, usersJoin } : match
        );
      } else {
        console.error("matchesValue is not an array!", state.matchesValue);
      }

      // Update modifiedMatches
      const updatedModifiedMatches = { ...state.modifiedMatches };
      Object.keys(updatedModifiedMatches).forEach((key) => {
        updatedModifiedMatches[key] = updatedModifiedMatches[key].map((match) =>
          match.id === matchId ? { ...match, usersJoin } : match
        );
      });
      state.modifiedMatches = updatedModifiedMatches;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMatches.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMatches.fulfilled, (state, action) => {
        state.matchesValue = action.payload;
        state.loading = false;

        const newModifiedMatches = {};
        action.payload.forEach((match) => {
          if (!newModifiedMatches[match.matchDate]) {
            newModifiedMatches[match.matchDate] = [match];
          } else {
            newModifiedMatches[match.matchDate].push(match);
          }
        });

        state.modifiedMatches = newModifiedMatches;
      })
      .addCase(getMatches.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch matches data";
      });
  },
});

export { getMatches };

export const { updateUsersJoin } = matchesSlice.actions;

export default matchesSlice.reducer;
