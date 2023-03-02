import { render, screen, RenderResult, act } from "@testing-library/react";
import '@testing-library/jest-dom';
import { Provider } from "react-redux";
import App from "./App";
import { makeMove } from "./features/appSlice";
import store from "./store";

const renderApp = (): RenderResult => render(
    <Provider store={store}>
        <App />
    </Provider>
);

describe('App component', () => {
    it('winner message and replay button should be rendered when the game finished', async () => {

        // Arrange
        act(() => {
            renderApp();
        });

        act(() => {
            store.dispatch(makeMove(0));
            store.dispatch(makeMove(3));
            store.dispatch(makeMove(1));
            store.dispatch(makeMove(5));
        });

        // Act
        act(() => {
            store.dispatch(makeMove(2));
        });

        // Assert 
        const winner = store.getState().game.winner;
        const isFinished = store.getState().game.isFinished;

        expect(winner).toBe('X');
        expect(isFinished).toBeTruthy();
        expect(await screen.findByText(/Game finished! Winning Player: X/i)).toBeInTheDocument();
        expect(await screen.findByRole('button', { name: /Replay/i })).toBeInTheDocument();
    });
});