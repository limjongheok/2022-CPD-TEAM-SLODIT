import {collection, doc, getDocs} from 'firebase/firestore';
import {db} from './firebase'
import React,{useState, useEffect} from "react";
import Map from "./Map/Map2"
import Splash from "./splash/Splash";
import styles from './App.module.css'





const App =() => {
  
  const [isLoading, setIsLoading] = useState(true);
  const [coords, setCoords]=useState([]);

  
  
 
  const userCollectionRef = collection(db,"users");
  var list=[]

  //주소 이동 함수 

  // firestore  api 가져오기 
  const getUsers = async() =>{
    const data = await getDocs(userCollectionRef);
    setCoords(data.docs.map((doc)=>({...doc.data(),id:doc.id})))
      
  }

  useEffect(()=>{
    getUsers();
    setTimeout(()=>{
      setIsLoading(false);
    },4000)

    
  },[])

 
    return(
      <div className={styles.allheight}>
        {isLoading ? <Splash/> : <Map coords={coords}/>}
      </div>
    )
    
}

export default App;
