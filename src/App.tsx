import { useEffect, useState } from "react";
import Board from "./components/Board/Board";
import { restartGame } from "./features/appSlice";
import { useAppDispatch, useAppSelector } from "./store";

const App = () => {

  const player = useAppSelector(state => state.game.player);
  const winner = useAppSelector(state => state.game.winner);
  const [winnerMessage, setWinnerMessage] = useState("");

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (winner !== null && winner !== "No one") {
      setWinnerMessage(`Game finished! Winning Player: ${winner}`);
    } else {
      setWinnerMessage(`Game finished! No one won`);
    }
  }, [winner]);

  const handleClick = () => {
    dispatch(restartGame());
  }

  return (
    <div className="container">
      {
        winner === null && <div className="text">Now {player} is playing</div>
      }
      <Board />
      {
        winner && <>
          <div className="text">{winnerMessage}</div>
          <button className="button" onClick={handleClick}>Replay</button>
        </>
      }
    </div>
  );
}

export default App;
