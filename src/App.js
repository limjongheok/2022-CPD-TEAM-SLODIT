import React from "react";
import Map from "./Map/Map2"
import Splash from "./splash/Splash";
import styles from './App.module.css'





class App extends React.Component {
  state = {
    isLoading : true,
  };
  setScreenSize() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh",`%{vh}px`)
    
  }

  componentDidMount(){
    this.setScreenSize();
    setTimeout(()=>{
      this.setState({isLoading: false});
    },4000)
  }
  render(){
    const {isLoading} = this.state;
    return(
      <div className={styles.allheight}>
        {isLoading ? <Splash/> : <Map/>}
      </div>
    )

  }
    
}

export default App;
