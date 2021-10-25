import { render, screen, fireEvent } from "@testing-library/react";
import Header from "./Header";

describe("CharacterCard", () => {
  it("should toggle filter", () => {
    const onToggleMock = jest.fn();
    render(
      <Header
        filterSelected
        onToggleFilter={onToggleMock}
        hasFilters={false}
        onClearFilters={() => {}}
      />
    );

    const button = screen.getByLabelText("Filter toggle");

    fireEvent.click(button);
    expect(onToggleMock).toBeCalledTimes(1);
    expect(onToggleMock).toBeCalledWith(false);
  });

  it("should show clear filter", () => {
    const clearMock = jest.fn();
    render(
      <Header
        filterSelected={false}
        onToggleFilter={() => {}}
        hasFilters={true}
        onClearFilters={clearMock}
      />
    );

    const button = screen.getByLabelText("Clear filter");

    fireEvent.click(button);
    expect(clearMock).toBeCalledTimes(1);
  });
});
