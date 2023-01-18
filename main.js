let coles = [];

function princ() {
    var boton1 = document.querySelector(".botonColegio");

    boton1.addEventListener("click",añadirColegios);

    recibirColegios();

}

function añadirColegios() {
    if (!document.querySelector(".tablaColegios")) {
        tabla_coles = document.createElement("table")
        tabla_coles.classList.add("tablaColegios")

        let fila = tabla_coles.insertRow();

        fila.insertCell().innerHTML = "Nombre";
        fila.insertCell().innerHTML = "Direccion";
        fila.insertCell().innerHTML = "Localidad";
        fila.insertCell().innerHTML = "Nº Alumnos";
        fila.insertCell().innerHTML = "Nº Aulas";
    }
    else
    {
        tabla_coles = document.querySelector(".tablaColegios")
    }

    col = new Colegio(
        document.querySelector(".colnom").value,
        document.querySelector(".coldir").value,
        document.querySelector(".colloc").value,
        document.querySelector(".colnalu").value,
        document.querySelector(".colnaul").value


    )
    coles.push(col)

    listaColes = new listaColegios(coles);
    rellenarTablaColegios(listaColes)

}

function recibirColegios() {

    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function () {
        
        if (this.readyState == 4 && this.status == 200) {
            
            obtenerListaColegios(JSON.parse(this.responseText))

        }

    }

    xhttp.open("GET", "colegios.json", true);


    xhttp.send();
    

    

}

function obtenerListaColegios(xhttp) {

    var cole = xhttp.colegios.colegio;

    for (let index = 0; index < cole.length; index++) {

        col = new Colegio(
            cole[index].nombre,
            cole[index].direccion,
            cole[index].localidad,
            cole[index].nalumnos,
            cole[index].naulas,


        )

        coles.push(col);

        
    }
    
    listaColes = new listaColegios(coles);
    rellenarTablaColegios(listaColes)

}

function rellenarTablaColegios(listaColes) {

    if (!document.querySelector(".tablaColegios")) {
        tabla_coles = document.createElement("table")
        tabla_coles.classList.add("tablaColegios")
    }
    else
    {
        tabla_coles = document.querySelector(".tablaColegios")
        tabla_coles.innerHTML = "";
    }
    
    let fila = tabla_coles.insertRow();

    fila.insertCell().innerHTML = "Nombre";
    fila.insertCell().innerHTML = "Direccion";
    fila.insertCell().innerHTML = "Localidad";
    fila.insertCell().innerHTML = "Nº Alumnos";
    fila.insertCell().innerHTML = "Nº Aulas";
    fila.insertCell().innerHTML = "Modificaciones";
    

    for (let i = 0; i < listaColes.colegios.length; i++) {
        let fila = tabla_coles.insertRow();

        fila.insertCell().innerHTML = listaColes.colegios[i].nombre;
        fila.insertCell().innerHTML = listaColes.colegios[i].direccion;
        fila.insertCell().innerHTML = listaColes.colegios[i].localidad;
        fila.insertCell().innerHTML = listaColes.colegios[i].nalumnos;
        fila.insertCell().innerHTML = listaColes.colegios[i].naulas;

        mod = document.createElement("button")
        mod.className += "modificarColegios ";
        mod.className += 1+i;
        

        

        mod.innerHTML = "Modificar este";

        fila.insertCell().appendChild(mod);
        
    }

    document.querySelector(".contenedor").appendChild(tabla_coles);

    var botones = document.querySelectorAll(".modificarColegios");

    botones.forEach(boton => {
        boton.addEventListener("click",editarColegios)
    });
    
}

function editarColegios() {
    
    var campo = prompt("¿Qué campo quieres editar?")

    var tabla = document.querySelector(".tablaColegios>tbody");

    var enc = false

    row = tabla.rows[0];

    for (var j = 0, col; col = row.cells[j]; j++) {

        if(col.innerText == campo && campo != "Modificar este")
        {
            var cell = j;
            enc = true;

        }

    }

    if (enc) {
        
        var dato = prompt("¿Cual es el nuevo dato?")
        tabla.rows[this.classList[1]].cells[cell].innerText = dato;

        cell = cell;

        switch (campo) {
            case "Nombre":
                
            coles[cell].nombre = dato;;

            break;

            case "Descripcion":
                
                coles[cell].descripcion = dato;

            break;

            case "Localidad":
                
                coles[cell].localidad = dato;  

            break;

            case "Nº Alumnos":
                
                coles[cell].nalumnos = dato;  

            break;

            case "Nº Aulas":
                
                coles[cell].naulas = dato;  

            break;
        
            default:
                break;
        }

        

    }

    else
    {

        alert("No hay ningun campo con ese nombre, prueba de nuevo");

    }
    
    listaColes = new listaColegios(coles);
    rellenarTablaColegios(listaColes)

}