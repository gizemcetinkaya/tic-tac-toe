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

    it('should not change the player when clicking filled square', () => {
        // Arrange
        store.dispatch(makeMove(0));

        // Act
        store.dispatch(makeMove(0));

        // Assert
        const board = store.getState().game.board;
        const player = store.getState().game.player;
        expect(board[0]).toBe("X");
        expect(player).toBe("O");
    });

    it('should winner be null when the game is draw', () => {
        // Arrange
        store.dispatch(makeMove(0));
        store.dispatch(makeMove(1));
        store.dispatch(makeMove(2));
        store.dispatch(makeMove(3));
        store.dispatch(makeMove(4));
        store.dispatch(makeMove(6));
        store.dispatch(makeMove(5));
        store.dispatch(makeMove(8));

        // Act
        store.dispatch(makeMove(7));

        // Assert
        const winner = store.getState().game.winner;
        const isFinished = store.getState().game.isFinished;

        expect(winner).toBeNull();
        expect(isFinished).toBeTruthy();
        
    });

    it('should initialize the state in the game when dispatch restartGame action', () => {
        // Arrange
        const expectedState: BoardState = {
            board: ["", "", "", "", "", "", "", "", ""],
            player: "X",
            winner: null,
            isFinished: false
        }

        store.dispatch(makeMove(0));
        store.dispatch(makeMove(2));
        store.dispatch(makeMove(4));

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