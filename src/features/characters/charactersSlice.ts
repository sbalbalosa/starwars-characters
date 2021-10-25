import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState, AppThunk } from "../../app/store";
import { CharactersQuery, Person } from "../../app/api/generated";
import { selectDirectFilters } from "../filters/filtersSlice";

type PeopleQueryKeys = keyof NonNullable<
  NonNullable<NonNullable<CharactersQuery["allPeople"]>["people"]>[number]
>;
type Character = Pick<Person, PeopleQueryKeys>;
type CharacterFlat = {
  id: Character["id"];
  name: Character["name"];
  films: string;
};

export interface CharactersState {
  favorites: {
    [key in string]: boolean;
  };
}

const initialState: CharactersState = {
  favorites: {},
};

export const charactersSlice = createSlice({
  name: "characters",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    initFavorites: (
      state,
      action: PayloadAction<CharactersState["favorites"]>
    ) => {
      state.favorites = action.payload;
    },
    setFavorite: (
      state,
      action: PayloadAction<{ id: string; value: boolean }>
    ) => {
      state.favorites[action.payload.id] = action.payload.value;
    },
  },
});

function applyFilters(
  character: Character,
  favorites: RootState["characters"]["favorites"] | null = null,
  films: RootState["filters"]["films"] | null = null,
  directFilters: ReturnType<typeof selectDirectFilters> | null = null
): boolean {
  const passed: boolean[] = [];

  if (favorites) {
    passed.push(!!favorites[character.id]);
  }

  if (films && Object.values(films).some((x) => x)) {
    const characterFilms = character.filmConnection.films;
    let foundFilm = false;
    for (const x of characterFilms) {
      if (films[x.id]) {
        foundFilm = true;
        break;
      }
    }
    passed.push(foundFilm);
  }

  if (directFilters) {
    const { selectedEyeColor, selectedGender, selectedHairColor } =
      directFilters;
    passed.push(
      selectedEyeColor === character.eyeColor || selectedEyeColor === ""
    );
    passed.push(selectedGender === character.gender || selectedGender === "");
    passed.push(
      selectedHairColor === character.hairColor || selectedHairColor === ""
    );
  }

  return passed.every((x) => x);
}

function applyFlat(character: Character): CharacterFlat {
  const { filmConnection, __typename, ...rest } = character;
  const flatData = {
    ...rest,
    films: character.filmConnection.films.map((x) => x.title).join(","),
  };
  return flatData;
}

export const { setFavorite, initFavorites } = charactersSlice.actions;

export const selectFavorites = (
  state: RootState
): CharactersState["favorites"] => state.characters.favorites;

export const selectAllCharacters = (state: RootState): Character[] => {
  const currentValue = state.api.queries["characters(undefined)"]
    ?.data as CharactersQuery;
  const characters = (currentValue?.allPeople?.people || []) as Character[];
  return characters;
};

export const selectAllCharacterIndex = (state: RootState) => {
  const characters = selectAllCharacters(state);
  return characters.reduce((acc, current, index) => {
    // TODO: this is a hack because there is no image for 17 https://starwars-visualguide.com/
    const plus = index + 1 >= 17 ? 2 : 1;
    return { ...acc, [current.id]: index + plus };
  }, {} as { [key in string]: number });
};

export const selectFavoriteCharacters = (state: RootState) => {
  const characters = selectAllCharacters(state);
  const films = state.filters.films;
  const directFilters = selectDirectFilters(state);
  const favorites = selectFavorites(state);
  return characters.filter(
    (x) => x && applyFilters(x, favorites, films, directFilters)
  );
};

export const selectCharacters = (state: RootState) => {
  const characters = selectAllCharacters(state);
  const films = state.filters.films;
  const directFilters = selectDirectFilters(state);
  return characters.filter(
    (x) => x && applyFilters(x, null, films, directFilters)
  );
};

export const selectFlatFavoriteCharacters = (state: RootState) => {
  const favoriteCharacters = selectFavoriteCharacters(state);
  return favoriteCharacters.map((x) => applyFlat(x));
};

export const toggleFavorite =
  (key: string): AppThunk =>
  (dispatch, getState) => {
    const currentValue = selectFavorites(getState());
    if (currentValue[key] !== undefined) {
      dispatch(setFavorite({ id: key, value: !currentValue[key] }));
    }
  };

export const loadFavorites = (): AppThunk => (dispatch, getState) => {
  const currentValue = selectAllCharacters(getState()).reduce(
    (acc, current) => {
      if (current) {
        return { ...acc, [current.id]: false };
      }
      return acc;
    },
    {} as CharactersState["favorites"]
  );
  dispatch(initFavorites(currentValue));
};

export default charactersSlice.reducer;
