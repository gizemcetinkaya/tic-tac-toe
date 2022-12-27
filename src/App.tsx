import { useEffect, useState } from "react";
import Board from "./components/Board/Board";
import { restartGame } from "./features/appSlice";
import { useAppDispatch, useAppSelector } from "./store";

const App = () => {

  const player = useAppSelector(state => state.game.player);
  const winner = useAppSelector(state => state.game.winner);
  const isFinished = useAppSelector(state => state.game.isFinished);
  const [winnerMessage, setWinnerMessage] = useState("");

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isFinished && winner) {
      setWinnerMessage(`Game finished! Winning Player: ${winner}`);
    } else {
      setWinnerMessage(`Game finished! No one won`);
    }
  }, [isFinished, winner]);

  const handleClick = () => {
    dispatch(restartGame());
  }

  return (
    <div className="container">
      {
        !isFinished && <div className="text">Now {player} is playing</div>
      }
      <Board />
      {
        isFinished && <>
          <div className="text">{winnerMessage}</div>
          <button className="button" onClick={handleClick}>Replay</button>
        </>
      }
    </div>
  );
}

export default App;
