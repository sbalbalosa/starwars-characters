import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../app/store";
import Characters from "./Characters";
import { loadFavorites, toggleFavorite } from "./charactersSlice";
import { api } from "../../app/api/generated";

describe("Characters", () => {
  it("should display no character cards", () => {
    render(
      <Provider store={store}>
        <Characters filterFavorite={false} />
      </Provider>
    );

    const cards = screen.queryAllByLabelText("Character card");
    expect(cards.length).toEqual(0);
  });

  it("should display the right amount of character cards", async () => {
    render(
      <Provider store={store}>
        <Characters filterFavorite={false} />
      </Provider>
    );

    const result = store.dispatch(api.endpoints.characters.initiate());

    const cards = await screen.findAllByLabelText("Character card");
    expect(cards.length).toEqual(3);

    result.unsubscribe();
  });

  it("should display the right amount of favorite cards", async () => {
    render(
      <Provider store={store}>
        <Characters filterFavorite={true} />
      </Provider>
    );

    const result = store.dispatch(api.endpoints.characters.initiate());
    store.dispatch(loadFavorites());
    const keys = Object.keys(store.getState().characters.favorites);
    store.dispatch(toggleFavorite(keys[0]));
    store.dispatch(toggleFavorite(keys[1]));

    const cards = await screen.findAllByLabelText("Character card");
    expect(cards.length).toEqual(2);

    result.unsubscribe();
  });
});
