import React from "react";
import styles from './Header.module.css'



const Header = () =>{

    return(
        <div>
            <div className={styles.Header_main}>
                <div className={styles.Header_flexbox}>
                <div className={styles.Header_font} >S L O W D I T</div>
                <img  src={require('./slowditiconwhite.png')} alt="log" className={styles.Header_logo}></img>
                </div> 
                
                
            </div>
        </div>
        
    )
}

export default Header;