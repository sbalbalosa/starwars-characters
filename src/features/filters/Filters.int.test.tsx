import { render, screen, fireEvent, within } from "@testing-library/react";
import Filters from "./Filters";
import { Provider } from "react-redux";
import { store } from "../../app/store";
import { api } from "../../app/api/generated";
import db from "../../mocks/db";

describe("Filters", () => {
  it("should have a selection for films", async () => {
    render(
      <Provider store={store}>
        <Filters />
      </Provider>
    );

    const result = store.dispatch(api.endpoints.films.initiate());

    const buttons = await screen.findAllByLabelText("Film title");
    expect(buttons.length).toEqual(4);

    result.unsubscribe();
  });

  it("should have a selection for gender", async () => {
    render(
      <Provider store={store}>
        <Filters />
      </Provider>
    );

    const result = store.dispatch(api.endpoints.characters.initiate());

    const selectButton = screen.getByLabelText("Gender");
    expect(selectButton).toBeInTheDocument();

    fireEvent.mouseDown(selectButton);

    const listBox = await screen.findByRole("listbox");
    expect(listBox).toBeInTheDocument();

    const options = within(listBox).getAllByRole("option");
    const peoples = db.people.getAll();

    const [initOpt, ...restOpts] = options;
    expect(initOpt.textContent).toEqual("-- Remove filter --");

    restOpts.forEach((x, index) => {
      expect(x.textContent).toEqual(peoples[index].gender);
    });

    result.unsubscribe();
  });

  it("should have a selection for eye color", async () => {
    render(
      <Provider store={store}>
        <Filters />
      </Provider>
    );

    const result = store.dispatch(api.endpoints.characters.initiate());

    const selectButton = screen.getByLabelText("Eye Color");
    expect(selectButton).toBeInTheDocument();

    fireEvent.mouseDown(selectButton);

    const listBox = await screen.findByRole("listbox");
    expect(listBox).toBeInTheDocument();

    const options = within(listBox).getAllByRole("option");
    const peoples = db.people.getAll();

    const [initOpt, ...restOpts] = options;
    expect(initOpt.textContent).toEqual("-- Remove filter --");

    restOpts.forEach((x, index) => {
      expect(x.textContent).toEqual(peoples[index].eyeColor);
    });

    result.unsubscribe();
  });

  it("should have a selection for hair color", async () => {
    render(
      <Provider store={store}>
        <Filters />
      </Provider>
    );

    const result = store.dispatch(api.endpoints.characters.initiate());

    const selectButton = screen.getByLabelText("Hair Color");
    expect(selectButton).toBeInTheDocument();

    fireEvent.mouseDown(selectButton);

    const listBox = await screen.findByRole("listbox");
    expect(listBox).toBeInTheDocument();

    const options = within(listBox).getAllByRole("option");
    const peoples = db.people.getAll();

    const [initOpt, ...restOpts] = options;
    expect(initOpt.textContent).toEqual("-- Remove filter --");

    restOpts.forEach((x, index) => {
      expect(x.textContent).toEqual(peoples[index].hairColor);
    });

    result.unsubscribe();
  });
});
