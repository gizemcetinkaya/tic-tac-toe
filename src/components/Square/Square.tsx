import { useEffect } from "react";
import { setPlayer } from "../../features/appSlice";
import { useAppDispatch } from "../../store";

type SquareProps = {
    value: string,
    onClick: (e: React.MouseEvent<HTMLElement>) => void;
}
const Square = (props: SquareProps) => {

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(setPlayer(props.value));
    }, [props.value])

    return (
        <div className="square" onClick={props.onClick}>{props.value}</div>
    )
}

export default Square;