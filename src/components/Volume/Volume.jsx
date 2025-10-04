import './Volume.scss'

function Volume({fullVolume, setFullVolume}){
    return(
        <div>
            <input type="range" min="0" max="100" value={fullVolume} onChange={(e) => setFullVolume(Number(e.target.value))}/>
            <label htmlFor="volume" >Volume</label>
        </div>
    )

}

export default Volume