import filtersReducer, {
  clearFilters,
  initDirectFilters,
  initFilms,
  setDirectFilter,
  setFilm,
  initialState,
  FiltersState,
} from "./filtersSlice";

describe("filters reducer", () => {
  it("should handle initial state", () => {
    expect(filtersReducer(undefined, { type: "unknown" })).toEqual(
      initialState
    );
  });

  it("should handle clear filters", () => {
    const testState: FiltersState = JSON.parse(JSON.stringify(initialState));
    testState.selectedEyeColor = "test";
    testState.selectedHairColor = "test";
    testState.selectedGender = "test";
    testState.films = {
      test: true,
    };
    const emptyState: FiltersState = JSON.parse(JSON.stringify(initialState));
    emptyState.films = {
      test: false,
    };
    const actual = filtersReducer(testState, clearFilters());
    expect(actual).toEqual(emptyState);
  });

  it("should set film", () => {
    const testState: FiltersState = JSON.parse(JSON.stringify(initialState));
    testState.films = {
      test: false,
    };
    const actual = filtersReducer(
      testState,
      setFilm({ id: "test", value: true })
    );
    expect(actual).toEqual({
      ...testState,
      films: {
        test: true,
      },
    });
  });

  it("should initialize direct filters", () => {
    const direct = {
      genders: ["test1", "test2"],
      eyeColors: ["test4", "test5"],
      hairColors: ["test6", "test7"],
    };
    const actual = filtersReducer(initialState, initDirectFilters(direct));
    expect(actual).toEqual({
      ...initialState,
      ...direct,
    });
  });

  it("should initialize films", () => {
    const actual = filtersReducer(initialState, initFilms({ test: true }));
    expect(actual).toEqual({
      ...initialState,
      films: {
        test: true,
      },
    });
  });

  it("should set direct filters", () => {
    const actual = filtersReducer(
      initialState,
      setDirectFilter(["selectedGender", "test1"])
    );
    expect(actual).toEqual({
      ...initialState,
      selectedGender: "test1",
    });

    const actual1 = filtersReducer(
      initialState,
      setDirectFilter(["selectedEyeColor", "test1"])
    );
    expect(actual1).toEqual({
      ...initialState,
      selectedEyeColor: "test1",
    });

    const actual2 = filtersReducer(
      initialState,
      setDirectFilter(["selectedHairColor", "test1"])
    );
    expect(actual2).toEqual({
      ...initialState,
      selectedHairColor: "test1",
    });
  });
});
