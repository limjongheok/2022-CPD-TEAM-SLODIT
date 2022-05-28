import React from "react";
import Map from "./Map/Map2"
import Splash from "./splash/Splash";





class App extends React.Component {
  state = {
    isLoading : true,
  };
  componentDidMount(){
    setTimeout(()=>{
      this.setState({isLoading: false});
    },3000)
  }
  render(){
    const {isLoading} = this.state;
    return(
      <div>
        {isLoading ? <Splash/> : <Map/>}
      </div>
    )

  }
    
}

export default App;
