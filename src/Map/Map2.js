import React, {useEffect} from "react";
import kakaoMapScript from "./kakaoMapScript";

const Map2 =() =>{

    useEffect(() => {kakaoMapScript();},[]);
    return(
        <div id='map' style={{width: '100vw', height: '100vh'}}>
        </div>)
}
export default Map2;