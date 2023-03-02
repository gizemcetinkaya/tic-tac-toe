import { render, screen } from "@testing-library/react";
import { makeMove } from "../../features/appSlice";
import store from "../../store";
import Board from "../Board/Board";
import Square from "./Square";

describe('Square component', () => {
    it('is-disabled class should be added when game finished', () => {
        // Arrange
        store.dispatch(makeMove(0));
        store.dispatch(makeMove(3));
        store.dispatch(makeMove(1));
        store.dispatch(makeMove(5));

        // Act
        store.dispatch(makeMove(2));

        // Assert
        const { container } = render(<Square value="X" isDisabled={true} onClick={() => {}} />);
        const element = container.querySelector('div');
        expect(element).toHaveClass('is-disabled');
    })
});

export { }