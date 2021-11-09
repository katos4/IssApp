$(document).ready(()=>{

    mapa();
    //setInterval(informacionISS, 1000);
    informacionISS();
      
});

const ubicacionISS = "http://api.open-notify.org/iss-now.json";
const infoISS = "https://api.wheretheiss.at/v1/satellites/25544";

//ICONO DE USUARIO
const iconoUsuario = new L.Icon({
    iconUrl: "../img/signs.png",
    iconSize: [50, 50],
    iconAnchor: [25, 50]
  });
  //ICONO DE LA ESTACION ESPACIAL
  const iconoEstacion = new L.Icon({
    iconUrl: "../img/iss2.png",
    iconSize: [50, 50],
    iconAnchor: [25, 50]
  });


function mapa(){
    var latitud;
    var longitud;
   
    //CREAR EL MAPA Y EL MARCADOR
    var map = L.map('mapa').setView([0,0], 1),
      marcador = L.marker(map.getCenter(),{icon: iconoEstacion}).addTo(map);
    
    //CREAR LA CAPA DEL MAPA, ES DECIR, LA MANERA DE MOSTRARLO VISUALMENTE
    L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012'
    }).addTo(map);
    

    //POSICION DEL USUARIO
     L.marker([37.27,-6.95], {icon: iconoUsuario}).addTo(map);

    /*-------TEMPORIZADOR--------------*/ 
      setInterval(()=>{
        $.getJSON(ubicacionISS, (datos) => {
           latitud = datos.iss_position.latitude;
           longitud = datos.iss_position.longitude;
           var nuevaPos = new L.LatLng(latitud, longitud);
           marcador.setLatLng(nuevaPos); 
           
        });
      },1000);
     
      //------
    }

async function informacionISS(){
  
    setInterval(()=>{
      $.getJSON(infoISS, (datos)=>{
        //console.log(datos.latitude);
        $('#altitud').html("Altitud: "+datos.altitude.toFixed(2)+" km");
        $('#velocidad').html("Velocidad: "+datos.velocity.toFixed(2)+" km/h");
        $('#latitud').html("Latitud: "+datos.latitude.toFixed(2)+"º");
        $('#longitud').html("Longitud: "+datos.longitude.toFixed(2)+"º");
      })
    },1000);

    var respuesta = await fetch(infoISS);
    var datos = await respuesta.json();
    var dianoche = datos.visibility;
 

    if(dianoche = "daylight"){
        $('#dianoche').html("Visibilidad: Dia");
        //$('#dianoche').css("background-color: yellow;");
    }else{
        $('#dianoche').html("Visibilidad: Noche");
    }
  
}

