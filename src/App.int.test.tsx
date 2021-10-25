import {
  render,
  screen,
  within,
  fireEvent,
  waitFor,
  cleanup,
} from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter as Router } from "react-router-dom";
import { store } from "./app/store";
import App from "./App";
import routes from "./routes";

describe("App", () => {
  it("renders initial component dependencies on load", async () => {
    render(
      <Provider store={store}>
        <Router>
          <App />
        </Router>
      </Provider>
    );

    const header = screen.getByRole("banner");
    const loading = screen.queryByRole("progressbar");

    await waitFor(() => {
      expect(loading).not.toBeInTheDocument();
    });

    const tabList = screen.getByRole("tablist");
    const tabs = screen.getAllByRole("tab");
    const selectedTab = tabs.findIndex(
      (x) => x.getAttribute("aria-selected") === "true"
    );
    const drawer = screen.queryByLabelText("Filter options");
    const allCharacters = screen.getByLabelText("All characters");

    expect(tabs.length).toEqual(routes.length);
    expect(header).toBeInTheDocument();
    expect(tabList).toBeInTheDocument();
    expect(selectedTab).toEqual(0);
    expect(allCharacters).toBeInTheDocument();
    expect(drawer).toBeNull();
  });

  it("renders to correctly based on current location path", () => {
    routes.forEach((x, index) => {
      render(
        <Provider store={store}>
          <Router initialEntries={[x.path]}>
            <App />
          </Router>
        </Provider>
      );

      const content = screen.getByLabelText(x.contentLabel);
      const tabs = screen.getAllByRole("tab");
      const selectedTab = tabs.findIndex(
        (x) => x.getAttribute("aria-selected") === "true"
      );

      expect(content).toBeInTheDocument();
      expect(selectedTab).toEqual(index);

      cleanup();
    });
  });

  it("navigates to the correct route on tab selection", () => {
    render(
      <Provider store={store}>
        <Router>
          <App />
        </Router>
      </Provider>
    );

    const tabs = screen.getAllByRole("tab");

    routes.forEach((x, index) => {
      fireEvent.click(tabs[index]);
      const content = screen.getByLabelText(x.contentLabel);

      const selectedTab = tabs.findIndex(
        (x) => x.getAttribute("aria-selected") === "true"
      );
      expect(content).toBeInTheDocument();
      expect(selectedTab).toEqual(index);
    });
  });

  it("toggles filter drawer", async () => {
    render(
      <Provider store={store}>
        <Router>
          <App />
        </Router>
      </Provider>
    );

    const header = screen.getByRole("banner");
    const button = within(header).getByRole("button");

    fireEvent.click(button);

    const drawer = screen.getByLabelText("Filter options");
    expect(drawer).toBeInTheDocument();

    fireEvent.click(button);
    waitFor(() => {
      expect(drawer).not.toBeInTheDocument();
    });
  });
});
