import {collection, doc, getDocs} from 'firebase/firestore';
import {db} from '../firebase'
import React, {useEffect ,useState} from "react";
import Mapprops from './Mapprops';
const { kakao } = window;


const Map2 =() =>{

  const [coords, setCoords]=useState([]);
  
  const userCollectionRef = collection(db,"users");


  // firestore  api 가져오기 
  const getUsers = async() =>{
    const data = await getDocs(userCollectionRef);
    setCoords(data.docs.map((doc)=>({...doc.data(),id:doc.id})))
      
  }
  
   var lats = null;
   var lons = null;
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

          //클릭 이벤트
          kakao.maps.event.addListener(marker,'click', () =>{
            console.log("클릭시 lat lon")
            console.log(a.lat)
            console.log(a.lon)
            lats = a.lat;
            lons= a.lon;
            if(lats != null && lons !=null){
              var iwContent = '<div style="padding:5px;">길찾기<br><a herf></a></div>', // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
              iwPosition = new kakao.maps.LatLng(lats, lons), //인포윈도우 표시 위치입니다
              iwRemoveable = true; // removeable 속성을 ture 로 설정하면 인포윈도우를 닫을 수 있는 x버튼이 표시됩니다
    
              // 인포윈도우를 생성하고 지도에 표시합니다
              var infowindow = new kakao.maps.InfoWindow({
              map: map, // 인포윈도우가 표시될 지도
              position : iwPosition, 
              content : iwContent,
              removable : iwRemoveable
              });
    
            }
            
          })
        }
      }
  })

  useEffect(()=>{
    getUsers();
    
  },[])


  

    
     
    
      return (
        <div>
          <div id="map" style={{width:'100vw' , height : 
        '100vh', zIndex: 1}}></div>
        </div>
      );
}
export default Map2;