import {collection, doc, getDocs} from 'firebase/firestore';
import {db} from '../firebase'
import React, {useEffect ,useState} from "react";
import geocoder from 'react-geocode';
import Header from '../Header/Header'
const { kakao } = window;


const Map2 =() =>{

  const [coords, setCoords]=useState([]);

  const[ctaddress, setCtaddress]= useState("");
  
 
  const userCollectionRef = collection(db,"users");

  //주소 이동 함수 


  // firestore  api 가져오기 
  const getUsers = async() =>{
    const data = await getDocs(userCollectionRef);
    setCoords(data.docs.map((doc)=>({...doc.data(),id:doc.id})))
      
  }


  



  let addressname;
  // 좌표로 위치 구하기 
  function getAddr(lats,lons){
    let geocoder = new kakao.maps.services.Geocoder();
    let coord = new kakao.maps.LatLng(lats,lons);
    let callback = function(result,status){
      if(status === kakao.maps.services.Status.OK){
        console.log(result)
        console.log(result[0].address.address_name);
        addressname = result[0].address.address_name;
      }
    }
    geocoder.coord2Address(coord.getLng(), coord.getLat(), callback);
  }
   var lats = null;
   var lons = null;
   var centerlat ; //중앙 좌표
   var centerlon ;
   var a ;

   //클릭시 중심 좌표로 이동
   function centermove(centerlat,centerlon){

    var moveLatLon = new kakao.maps.LatLng(centerlat,centerlon)
    a.panTo(moveLatLon);   
    
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

        a=map;
        

        // 스카이뷰및 컨트롤러 
        const mapTypeControl = new kakao.maps.MapTypeControl();
        map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);
        const zoomControl = new kakao.maps.ZoomControl();
        map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

        // 내 위치 찾기 
        if(navigator.geolocation){
          navigator.geolocation.getCurrentPosition((position)=>{
              var lat = position.coords.latitude;
              var lon = position.coords.longitude;
              centerlat =lat;
              centerlon = lon;

              // 내 위치 이미지 마커 
              var imageSrc = require('./slowditmyloc.png')
              var imageSize = new kakao.maps.Size(30, 30); // 마커이미지의 크기입니다
              var imageOption = {offset: new kakao.maps.Point(0, 0)}; 
              var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);
              
              var locPosition = new kakao.maps.LatLng(lat,lon);
        
              var marker = new kakao.maps.Marker({
                map: map,
                position: locPosition,
                image: markerImage
            });
           
            
    
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

      //중심 좌표 받아오기 
      

      //중심 좌표 얻어서 표시 
    

      // 나머지 좌표 찍기 
      if(coords.length != 0)
      { console.log(coords)
        for(let i=0 ; i<= coords.length-1 ; i++ ){
          let a = coords[i]
          console.log(a.lat)
          console.log(a.lon)
          console.log(a.id)

          var markerPosition = new kakao.maps.LatLng(a.lat, a.lon);
          var marker = new kakao.maps.Marker({
            position: markerPosition
          });
          marker.setMap(map);
          console.log("setup 완료 ")


          var iwContent = '<div style="padding: 5px">'+a.id+'</div>'
          var infowindow = new kakao.maps.InfoWindow({
            position: markerPosition,
            content: iwContent
          })
          infowindow.open(map,marker)

          
          //클릭 이벤트
          kakao.maps.event.addListener(marker,'click', () =>{
            console.log("클릭시 lat lon")
            console.log(a.lat)
            console.log(a.lon)
            lats = a.lat;
            lons= a.lon;
            getAddr(lats,lons)

            if(lats != null && lons !=null){

              window.open("https://map.kakao.com/link/to/"+addressname+","+lats+","+lons)
    
            }
            
          })
        }
      }
  },)

  useEffect(()=>{
    getUsers();
    
  },[])


    
      return (
        <div>
          <Header style={{position: 'fixed'}}/>
          <div id="map" style={{width:'100vw' , height : 
        '90vh', zIndex: 1}}></div>
        <button onClick={()=> centermove(centerlat,centerlon)} style={{zIndex:"100" , position:"absolute", bottom:"5%" ,left:"50%",transform:"translate(-50%)" , borderRadius: "30px", height:"8%", border:"none", backgroundColor:'white'}}><div style={{color:"#4B89DC",fontWeight:"bold"}}>내위치로 이동하기</div></button>
        </div>
        
      );
}
export default Map2;