import store from "../store";
import { BoardState, initialState, makeMove, restartGame } from "./appSlice";

describe('app reducer', () => {

    beforeEach(() => {
        store.dispatch(restartGame());
    });

    it.each([
        [[0, 1, 2]],
        [[3, 4, 5]],
        [[6, 7, 8]],
        [[0, 3, 6]],
        [[1, 4, 7]],
        [[2, 5, 8]],
        [[0, 4, 8]],
        [[2, 4, 6]]
    ])('should set the winner when winning combinations match', (winningCombinations) => {
        //Arrange
        let disallowedNumbers = [...winningCombinations];

        // Act
        winningCombinations.forEach((combination, index) => {
            store.dispatch(makeMove(combination));
            if (index < 2) {
                const randomNumber = getRandomNumber(disallowedNumbers);
                disallowedNumbers.push(randomNumber);
                store.dispatch(makeMove(randomNumber));
            }
        });

        // Assert
        const state = store.getState().game;
        expect(state.winner).toBe("X");
        expect(state.isFinished).toBe(true);
        expect(state.player).toBe("O");

        winningCombinations.forEach(combination => {
            expect(state.board[combination]).toBe("X");
        });
    });

    it('should initialize the state in the game when dispatch restartGame action', () => {
        // Arrange
        const expectedState: BoardState = {
            board: ["", "", "", "", "", "", "", "", ""],
            player: "X",
            winner: null,
            isFinished: false
        }

        // Act
        store.dispatch(restartGame());

        // Assert
        expect(initialState).toEqual(expectedState);
    });

    const getRandomNumber = (combinations: number[]): number => {
        const combination = Math.floor(Math.random() * 9);

        const matched = combinations.includes(combination);

        if (matched) {
            return getRandomNumber(combinations);
        }
        return combination;
    };

})