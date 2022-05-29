import {collection, doc, getDocs} from 'firebase/firestore';
import {db} from '../firebase'
import React, {useEffect ,useState} from "react";
import styles from './Map2.module.css';
import Header from '../Header/Header'
const { kakao } = window;


const Map2 =(props) =>{

  const {coords} = props;
  



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
   var lats = null; //클릭시 카카오 맵 이동시 필요
   var lons = null;
   let centerlat; //중앙 좌표 내위치로 이동시 필요
   var centerlon;
   var a ; //카카오map
   var list = []; // 장소 거리를 담을 리스트
   let nearlat; // 가장 근처 위도 경도
   let nearlon;
   
   

   //클릭시 중심 좌표로 이동
   function centermove(centerlat,centerlon){

    var moveLatLon = new kakao.maps.LatLng(centerlat,centerlon)
    a.panTo(moveLatLon);   
    
   }
   function nearpoint(nearlat, nearlon){
     var moveLatLon = new kakao.maps.LatLng(nearlat,nearlon)
     a.panTo(moveLatLon)

   }

  useEffect(()=>{
    console.log(coords)
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
              centerlat = lat;
              centerlon = lon;

              // 내 위치 이미지 마커 
              var imageSrc = require('./slowditmyloc.png')
              var imageSize = new kakao.maps.Size(30, 30); // 마커이미지의 크기입니다
              var imageOption = {offset: new kakao.maps.Point(23, 0)}; 
              var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);
              
              var locPosition = new kakao.maps.LatLng(lat,lon);
        
              var marker = new kakao.maps.Marker({
          
                position: locPosition,
                image: markerImage,
                yAnchor :1

            });
           
            marker.setMap(map)
    
            map.setCenter(locPosition)

        // 나머지 좌표 찍기 
        if(coords.length != 0)
        { console.log(coords)
          for(let i=0 ; i<= coords.length-1 ; i++ ){
            let a = coords[i]
            console.log(a.lat,a.lon , "나머지 좌표 위도 , 경도")
            console.log(a.id ,"지역")

            var markerPosition = new kakao.maps.LatLng(a.lat, a.lon);

            var imageSrc = require('./slowditcostomimg.png')
            var imageSize = new kakao.maps.Size(35,49);
            var imageOption = {offset: new kakao.maps.Point(20,49)}
            var markerImage = new kakao.maps.MarkerImage(imageSrc,imageSize, imageOption)
            var marker = new kakao.maps.Marker({
              position: markerPosition,
              image: markerImage,
              yAnchor : 1
          
            });
            marker.setMap(map);
        

            //폴리 라인 그리기 
            var polyline = new kakao.maps.Polyline({
          
              map: map,
              path:[
              
                new kakao.maps.LatLng(lat,lon),
                new kakao.maps.LatLng(a.lat,a.lon)
              ],
            

            });
            polyline.setMap(null);
            var distance = polyline.getLength();
            console.log(distance,"distance");

            console.log(centerlat,"중앙좌표")
            ////폴리라인 그리기 끝 

            console.log("setup 완료 ")
            list.push({distance : distance , lat: a.lat, lon: a.lon})
          


          
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
          }//for 종료 
          //list 에서  정렬 시키고 상위 3개만 뽑기 
          
          list.sort((a,b)=> a.distance-b.distance)
          var besttreelist = [list[0],list[1],list[2]];
          console.log(besttreelist,"상위 3개 리스트")
          var one = besttreelist[0]
          nearlat = one.lat;
          nearlon =one.lon;
         
          

      }//나머지 좌표 찍기 종료
     }) 
    } //내 위치 받아오기 종료 
    else{
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

  })

 


    
      return (
        <div style={{position: "relative"}}>
          <Header style={{position: 'fixed'}}/>
          <div id="map" className={styles.Maps}></div>
        
        <div className={styles.buttondiv}>
        
        <button onClick={()=> nearpoint(nearlat,nearlon) } className={styles.nearpointbutton}><div className={styles.buttonfontnear}>가까운구역 이동하기</div></button>
       
       <button onClick={()=> centermove(centerlat,centerlon)} className={styles.centerpoint}><div className={styles.buttonfont}>내 위치로 이동하기</div></button>
        </div>
       
        </div>
        
      );
}
export default Map2;