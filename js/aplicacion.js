$(document).ready(()=>{

mapa();
//tiempoVueloEstacion();
  
});







function tiempoVueloEstacion(){
  $.getJSON("http://api.open-notify.org/iss-pass.json", (datos) => {

     /* var tiempo = datos.timestamp;

      var date = new Date(tiempo * 1000);

      var hours = date.getHours();

      var minutes = "0" + date.getMinutes();

      var seconds = "0" + date.getSeconds();

      var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

      console.log(formattedTime);*/
  
       console.log(datos);
    });
}


