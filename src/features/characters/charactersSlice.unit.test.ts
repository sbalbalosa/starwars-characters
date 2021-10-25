import charactersReducer, {
  initFavorites,
  setFavorite,
  CharactersState,
} from "./charactersSlice";

describe("character reducer", () => {
  const initialState: CharactersState = {
    favorites: {},
  };
  it("should handle initial state", () => {
    expect(charactersReducer(undefined, { type: "unknown" })).toEqual({
      favorites: {},
    });
  });

  it("should handle loading of favorites", () => {
    const actual = charactersReducer(
      initialState,
      initFavorites({ id: false })
    );
    expect(actual).toEqual({
      favorites: {
        id: false,
      },
    });
  });

  it("should handle set favorite", () => {
    const initial: CharactersState = {
      favorites: {
        test: false,
      },
    };
    const actual = charactersReducer(
      initial,
      setFavorite({ id: "test", value: true })
    );
    expect(actual).toEqual({
      favorites: {
        test: true,
      },
    });
  });
});
