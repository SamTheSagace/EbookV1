import './Next.scss'
//(prev) => !prev
function Next({onCheck}){
    return(
        <>
           <button onClick={() => onCheck()}></button>
        </>
    )
}
export default Next