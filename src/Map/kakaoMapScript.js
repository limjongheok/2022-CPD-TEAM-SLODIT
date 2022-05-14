const {kakao} = window;

export default function kakaoMapScript(){
    const container = document.getElementById('map');
    const options ={
        center : new kakao.maps.LatLng(34.4,126.570667),
        levle: 3
    };
    const map = new kakao.maps.Map(container,options);
    
}