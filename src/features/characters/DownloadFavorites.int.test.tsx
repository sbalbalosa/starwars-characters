import { render, screen } from "@testing-library/react";
import DownloadFavorites from "./DownloadFavorites";
import { Provider } from "react-redux";
import { store } from "../../app/store";

describe("DownloadFavorites", () => {
  it("should have a download button", () => {
    render(
      <Provider store={store}>
        <DownloadFavorites />
      </Provider>
    );

    const button = screen.getByRole("button");
    const link = screen.getByRole("link");

    expect(button).toBeInTheDocument();
    expect(link).toBeInTheDocument();

    expect(link.hasAttribute("download")).toEqual(true);
    expect(link.hasAttribute("href")).toEqual(true);
  });
});
