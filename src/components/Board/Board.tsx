import Row from "../Row/Row";
import { useAppSelector } from "../../store";

const Board = () => {

    const board = useAppSelector(state => state.game.board);

    return (
        <div className="board">
            {board.map((row, index) => (
                index % 3 === 0
                    ? <Row key={index} board={board} row={Math.floor(index / 3)} /> : null
            ))}
        </div>
    )
}

export default Board;