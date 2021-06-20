const URL = 'https://www.theaudiodb.com/api/v1/json/1/search.php?s=';
const button = document.getElementById("enviar");
const botonbuscar = document.getElementById("busqueda");
const informacion = document.getElementById("informaciongenerada");
const fragment = document.createDocumentFragment();
const template = document.querySelector("#template-musico").content;
const card = document.querySelector(".card");




button.addEventListener("click", () => {
    artista(botonbuscar.value);
   // card.setAttribute(`style`, `display:none`)


});

/*
nuevaBusqueda.addEventListener("click",() =>{
    console.log("tocado")
})*/

function artista(artistaBuscado) {
    
    const fetchPromise = fetch(`${URL}${artistaBuscado}`);
    fetchPromise.then(response => {
         console.log('result', response);
        return response.json();
    }).then(result => {
        //    console.log('data', result);

        localStore(result);


    }).catch(err => {
        console.log('fallo!: ', err);
        informacion.innerHTML = `<div class="row justify-content-center text-center">
<p class="mb-3 col-12  align-self-center" style="color: red; font-weight: bold">Artista no encontrado. </p>
<button type="button" class="btn btn-primary mt-3  col-2 align-self-center" onclick="location.reload()">Volver a intentarlo</button>
</div>`

    });

}


function localStore(result) {
    if (!localStorage.getItem("artistaConsultado")) {
        var arrayDatos = [];
    } else {
        arrayDatos = JSON.parse(localStorage.artistaConsultado);

    }

    var bio = result.strBiographyES;
    console.log("🚀 ~ file: main.js ~ line 57 ~ localStore ~ bio", bio)
    
    

    data = {
        bio: bio,
     
    }

    arrayDatos.push(data);

    localStorage.setItem("artistaConsultado", JSON.stringify(arrayDatos));
    recuperar_localStorage = JSON.parse(localStorage.getItem("artistaConsultado"));


   // mostrardatos(data);

}
/*
function mostrardatos(data) {

    informacion.innerHTML = '';
    template.querySelector(".card-header").textContent = botonbuscar.value.toUpperCase();
    template.querySelector(".card-body ul li:nth-child(1)").textContent = `Temperatura Actual: ` + data.temperatura + ` °C`;
    template.querySelector(".card-body ul li:nth-child(2)").textContent = `Temperatura Máxima: ` + data.temperaturaMax + ` °C`;
    template.querySelector(".card-body ul li:nth-child(3)").textContent = `Temperatura Mínima: ` + data.temperaturaMin + ` °C`;
    template.querySelector(".card-body ul li:nth-child(4)").textContent = `Humedad: ` + data.humedad + ` %`;
    template.querySelector(".card-body ul li:nth-child(5)").textContent = `Sensación térmica : ` + data.sensasionTermica + ` °C`;
    template.querySelector(".card-body ul li:nth-child(6)").textContent = `Presión atmosférica : ` + data.presionAtmosferica + ` Pa`;
    template.querySelector(".card-body ul li:nth-child(7)").textContent = `Velocidad del viento : ` + data.velocidadViento + ` m/s`;
    template.querySelector(".card-body ul li:nth-child(8)").textContent = ` Estado del clima: ` + data.estadoClima;

    let rutaclima = '';

   

    template.querySelector(".card-body img").setAttribute(`src`, `${rutaclima}`);
    template.querySelector(".card-body img").setAttribute(`class`, `img-fluid`);


    let rutaMapa = `${url_mapa}/map/1/staticimage?key=${api_mapa}&zoom=9&center=${data.longitud},${data.latitud}&format=jpg&layer=basic&style=main&width=1305&height=748&view=Unified&language=es-ES`

    let imagenMapa = `<img src="`;
    imagenMapa += rutaMapa;
    imagenMapa += `" alt="mapa de la ciudad"`;
    imagenMapa += ` class = "img-fluid" >`

    template.querySelector(".card-body .mapa").innerHTML = imagenMapa;
    //  console.log(imagenMapa)


    const clone = template.cloneNode(true);
    fragment.appendChild(clone);

    informacion.appendChild(fragment);


}*/

