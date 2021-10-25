import { render, screen, cleanup } from "@testing-library/react";
import Loading from "./Loading";

describe("Loading", () => {
  it("should toggle between Loading component and children", () => {
    render(
      <Loading isLoading>
        <div data-testid="test">test</div>
      </Loading>
    );

    const loading1 = screen.getByRole("alert");
    const child1 = screen.queryByTestId("test");

    expect(loading1).toBeInTheDocument();
    expect(child1).not.toBeInTheDocument();

    cleanup();

    render(
      <Loading isLoading={false}>
        <div data-testid="test">test</div>
      </Loading>
    );

    const loading2 = screen.queryByRole("alert");
    const child2 = screen.getByTestId("test");

    expect(loading2).not.toBeInTheDocument();
    expect(child2).toBeInTheDocument();
  });
});
