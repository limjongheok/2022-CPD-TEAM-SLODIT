import {collection, doc, getDocs} from 'firebase/firestore';
import {db} from '../firebase'
import React, {useEffect ,useState} from "react";
const { kakao } = window;


const Map2 =() =>{

  const [coords, setCoords]=useState([]);
  const userCollectionRef = collection(db,"users");


  // firestore  api 가져오기 
  const getUsers = async() =>{
    const data = await getDocs(userCollectionRef);
    setCoords(data.docs.map((doc)=>({...doc.data(),id:doc.id})))
      
  }
  
  
  useEffect(()=>{
    //처음 map 그리기 
    // id 정의 및 div id 로  그리기 
    const container = document.getElementById("map");
        const options = {
          center: new kakao.maps.LatLng(33.450701, 126.570667),
          level: 3,
        };
       

        const map = new kakao.maps.Map(container, options);

        // 내 위치 찾기 
        if(navigator.geolocation){
          navigator.geolocation.getCurrentPosition((position)=>{
              var lat = position.coords.latitude;
              var lon = position.coords.longitude;
              
              console.log(lon);
              console.log("lon")
              console.log(lat);
              var locPosition = new kakao.maps.LatLng(lat,lon);
              var message ='<div style="padding:5px>내위치</div>';
              var marker = new kakao.maps.Marker({
                map: map,
                position: locPosition
            });
            var iwContent = message;
            var iwRemoveable = true;
    
            var infowindow = new kakao.maps.InfoWindow({
                content: iwContent,
                removable: iwRemoveable
            });
    
            infowindow.open(map,marker)
            map.setCenter(locPosition)
          })
      }else{
          var locPosition = new kakao.maps.LatLng(33.450701,126.570667),
          message="gps 사용불가"
          var marker = new kakao.maps.Marker({
            map: map,
            position: locPosition
        });
        var iwContent = message;
        var iwRemoveable = true;

        var infowindow = new kakao.maps.infoWindow({
            content: iwContent,
            removable: iwRemoveable
        });

        infowindow.open(map,marker)
        map.setCenter(locPosition)  
    
      }

      // 나머지 좌표 찍기 
      if(coords.length != 0)
      { console.log(coords)
        for(let i=0 ; i<= coords.length -1; i++ ){
          let a = coords[i]
          console.log(a.lat)
          console.log(a.lon)

          var markerPosition = new kakao.maps.LatLng(a.lat, a.lon);
          var marker = new kakao.maps.Marker({
            position: markerPosition
          });
          marker.setMap(map);
          console.log("setup 완료 ")
          
        }
        
      }
  })

  useEffect(()=>{
    getUsers();
    
  },[])


  

    
     
    
      return (
        <>
          <div id="map" style={{width:'100vw' , height : 
        '100vh'}}></div>
        </>
      );
}
export default Map2;