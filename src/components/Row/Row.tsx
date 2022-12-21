import { setBoard } from "../../features/appSlice";
import { useAppDispatch } from "../../store";
import Square from "../Square/Square";

type RowProps = {
    board: string[],
    row: number
}
const Row = ({ board, row }: RowProps) => {

    const dispatch = useAppDispatch();

    const handleClick = (square: number) => {
        dispatch(setBoard(square));
    };

    return (
        <div className="row">
            {board.map((value, index) => (
                Math.floor(index / 3) === row
                    ? <Square key={`${index}`} value={value} onClick={() => handleClick(index)} />
                    : null
            ))}
        </div>
    )
}

export default Row;