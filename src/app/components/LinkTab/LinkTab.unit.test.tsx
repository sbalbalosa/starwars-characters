import { render, screen, fireEvent } from "@testing-library/react";
import LinkTab from "./LinkTab";

describe("LinkTab", () => {
  it("should select an href", () => {
    const mockedFn = jest.fn();
    render(<LinkTab label="test" href="/" onLinkSelect={mockedFn}></LinkTab>);

    const tab = screen.getByRole("tab");
    fireEvent.click(tab);
    expect(mockedFn).toBeCalledTimes(1);
    expect(mockedFn).toBeCalledWith("/");
  });

  it("should render label", () => {
    render(<LinkTab label="test" href="/" onLinkSelect={() => {}}></LinkTab>);
    const tab = screen.getByRole("tab");
    expect(tab.textContent).toEqual("test");
  });
});
