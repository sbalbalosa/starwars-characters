import { render, screen, fireEvent } from "@testing-library/react";
import CharacterCard from "./CharacterCard";

describe("CharacterCard", () => {
  it("should toggle favorite", () => {
    const onToggleMock = jest.fn();
    render(
      <CharacterCard
        isFavorite
        name=""
        onToggleFavorite={onToggleMock}
        imgSrc="test"
      />
    );

    const toggle = screen.getByRole("button");

    fireEvent.click(toggle);
    expect(onToggleMock).toBeCalledTimes(1);
    expect(onToggleMock).toBeCalledWith(false);
  });

  it("should render props", () => {
    render(
      <CharacterCard
        isFavorite
        name="test"
        onToggleFavorite={() => {}}
        imgSrc="test"
      />
    );

    const toggle = screen.getByRole("button");
    const title = screen.getByRole("heading");

    expect(title.textContent).toBe("test");
    expect(toggle).toHaveAttribute("aria-pressed", "true");
  });
});
