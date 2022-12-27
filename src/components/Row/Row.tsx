import { makeMove } from "../../features/appSlice";
import { useAppDispatch, useAppSelector } from "../../store";
import Square from "../Square/Square";

type RowProps = {
    board: string[],
    row: number
}
const Row = ({ board, row }: RowProps) => {

    const isFinished = useAppSelector(state => state.game.isFinished);
    const dispatch = useAppDispatch();

    const handleClick = (square: number) => {
        dispatch(makeMove(square));
    };

    return (
        <div className="row">
            {board.map((value, index) => (
                Math.floor(index / 3) === row
                    ? <Square key={`${index}`} isDisabled={isFinished} value={value} onClick={() => handleClick(index)} />
                    : null
            ))}
        </div>
    )
}

export default Row;