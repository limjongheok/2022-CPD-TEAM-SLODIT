import {collection, doc, getDocs} from 'firebase/firestore';
import {db} from './firebase'
import React,{useState, useEffect} from "react";
import Map from "./Map/Map2"
import Splash from "./splash/Splash";
import styles from './App.module.css'
import { getDatabase, ref, onValue , child,get,query} from "firebase/database";





const App =() => {
  
  const [isLoading, setIsLoading] = useState(true);
  const [coords, setCoords]=useState([]);
  const [iwContent, setIwcontet] = useState([]);

  
  
 
  const userCollectionRef = collection(db,"users");
  var list=[]

  //주소 이동 함수 

  // firestore  api 가져오기 
  const getUsers = async() =>{
    const data = await getDocs(userCollectionRef);
    
    setCoords(data.docs.map((doc)=>({...doc.data(),id:doc.id})))
    list.push(data.docs.map((doc)=>({...doc.data(),id:doc.id})))
      
  }

  const getInfow = () => {
    const db = getDatabase();
    const starCountRef = ref(db);
    onValue(starCountRef,(snapshot)=>{
      const data = snapshot.val();
      setIwcontet({... data})
     
      var i = '한밭수목원'
      var idin = ''+"한밭수목원" +''
      if(i === idin ){
       
      }else{

        console.log("다름")
      }
      
    })
  }

  useEffect(()=>{
    getUsers();
    getInfow();
    setTimeout(()=>{
      setIsLoading(false);
    },4000)

  
    
  },[])

 
    return(
      <div className={styles.allheight}>
        {isLoading ? <Splash/> : <Map coords={coords} iw={iwContent}/>}
      </div>
    )
    
}

export default App;
