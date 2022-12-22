
type SquareProps = {
    value: string,
    onClick: (e: React.MouseEvent<HTMLElement>) => void;
}
const Square = (props: SquareProps) => {

    return (
        <div className="square" onClick={props.onClick}>{props.value}</div>
    )
}

export default Square;