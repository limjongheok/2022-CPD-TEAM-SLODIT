import React from "react";
import styles from './Splash.module.css'

const Splash= () =>{

  return(
    <div>
      <div className={styles.splashimg}><img className={styles.splashmark} src={require('./slowditsplashmark.png')}/></div>
      
    </div>
  )
}
export default Splash