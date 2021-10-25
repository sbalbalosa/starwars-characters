import { render, screen } from "@testing-library/react";
import NavTabs from "./NavTabs";

describe("NavTab", () => {
  it("should render children", () => {
    render(
      <NavTabs value={0}>
        <div data-testid="custom-child">test</div>
      </NavTabs>
    );

    const child = screen.getByTestId("custom-child");
    expect(child).toBeDefined();
  });
});
