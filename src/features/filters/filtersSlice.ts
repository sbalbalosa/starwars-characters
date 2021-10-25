import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../app/store";
import { FilmsQuery, Film as Movie } from "../../app/api/generated";

import { selectAllCharacters } from "../characters/charactersSlice";

type FilmQueryKeys = keyof NonNullable<
  NonNullable<NonNullable<FilmsQuery["allFilms"]>["films"]>[number]
>;
type Film = Pick<Movie, FilmQueryKeys>;

export interface FiltersState {
  films: {
    [key in string]: boolean;
  };
  genders: string[];
  hairColors: string[];
  eyeColors: string[];
  selectedGender: string;
  selectedEyeColor: string;
  selectedHairColor: string;
}

export const initialState: FiltersState = {
  films: {},
  hairColors: [],
  eyeColors: [],
  genders: [],
  selectedEyeColor: "",
  selectedHairColor: "",
  selectedGender: "",
};

export const charactersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    initFilms: (state, action: PayloadAction<FiltersState["films"]>) => {
      state.films = action.payload;
    },
    initDirectFilters: (
      state,
      action: PayloadAction<
        Pick<FiltersState, "hairColors" | "eyeColors" | "genders">
      >
    ) => {
      const { hairColors, eyeColors, genders } = action.payload;

      state.hairColors = hairColors;
      state.eyeColors = eyeColors;
      state.genders = genders;
    },
    setDirectFilter: (
      state,
      action: PayloadAction<
        ["selectedGender" | "selectedEyeColor" | "selectedHairColor", string]
      >
    ) => {
      const [key, value] = action.payload;
      state[key] = value;
    },
    setFilm: (state, action: PayloadAction<{ id: string; value: boolean }>) => {
      state.films[action.payload.id] = action.payload.value;
    },
    clearFilters: (state) => {
      state.selectedEyeColor = initialState.selectedEyeColor;
      state.selectedGender = initialState.selectedGender;
      state.selectedHairColor = initialState.selectedHairColor;
      for (const key in state.films) {
        state.films[key] = false;
      }
    },
  },
});

export const {
  setFilm,
  initFilms,
  initDirectFilters,
  setDirectFilter,
  clearFilters,
} = charactersSlice.actions;

export const selectFilms = (state: RootState): FiltersState["films"] =>
  state.filters.films;

export const selectAllFilms = (state: RootState) => {
  const currentValue = state.api.queries["films(undefined)"]
    ?.data as FilmsQuery;
  return (currentValue?.allFilms?.films || []) as Film[];
};

export const selectDirectFilters = (state: RootState) => {
  const { films, ...directFilters } = state.filters;
  return directFilters;
};

export const selectHasFilters = (state: RootState) => {
  const films = Object.values(state.filters.films);

  const isEmptyFilters = [
    films.length > 0 ? films.every((x) => x === false) : true,
    state.filters.selectedEyeColor === "",
    state.filters.selectedGender === "",
    state.filters.selectedHairColor === "",
  ];

  return !isEmptyFilters.every((x) => x);
};

export const loadDirectFilters = (): AppThunk => (dispatch, getState) => {
  const currentValue = selectAllCharacters(getState());

  const genders = new Set<string>();
  const hairColors = new Set<string>();
  const eyeColors = new Set<string>();

  currentValue.forEach((x) => {
    genders.add(x.gender);
    hairColors.add(x.hairColor);
    eyeColors.add(x.eyeColor);
  });

  dispatch(
    initDirectFilters({
      eyeColors: Array.from(eyeColors),
      genders: Array.from(genders),
      hairColors: Array.from(hairColors),
    })
  );
};

export const toggleFilm =
  (key: string): AppThunk =>
  (dispatch, getState) => {
    const currentValue = selectFilms(getState());
    if (currentValue[key] !== undefined) {
      dispatch(setFilm({ id: key, value: !currentValue[key] }));
    }
  };

export const loadFilms = (): AppThunk => (dispatch, getState) => {
  const currentValue = selectAllFilms(getState()).reduce((acc, current) => {
    if (current) {
      return { ...acc, [current.id]: false };
    }
    return acc;
  }, {} as FiltersState["films"]);
  dispatch(initFilms(currentValue));
};

export default charactersSlice.reducer;
