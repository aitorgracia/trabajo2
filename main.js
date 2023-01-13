function princ() {
    var boton = document.querySelector(".obtenerColegios");
    boton.addEventListener("click",recibirColegios);
}

function recibirColegios() {

    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "colegios.xml", true);
    xhttp.send();

    console.log(xhttp.responseXML());

}