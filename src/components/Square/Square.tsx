
type SquareProps = {
    value: string,
    isDisabled: boolean,
    onClick: (e: React.MouseEvent<HTMLElement>) => void;
}
const Square = (props: SquareProps) => {

    return (
        <div className={props.isDisabled ? 'square is-disabled' : 'square'} onClick={props.onClick}>{props.value}</div>
    )
}

export default Square;