import React from "react";
import './Header.css'



const Header = () =>{

    return(
        <div>
            <div className="Header_main">
                <div className="Header_line"></div>   
                <div className="Headers" >SLOWDIT</div>
                <img  src={require('./slowditicon.png')} alt="log" className="Header_log" />
                <button className="Header_button">App</button>
            </div>
        </div>
        
    )
}

export default Header;