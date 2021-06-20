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
        //  console.log('result', response);
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

    let idArtista = result.artists[0].idArtist;
    let nombreArtista = result.artists[0].strArtist;
    let logo = result.artists[0].strArtistLogo;
    let bio = result.artists[0].strBiographyES;
    let imgGrupo = result.artists[0].strArtistThumb;
    let genMus = result.artists[0].strGenre;
    let sitWeb = result.artists[0].strWebsite;
    let facebook = result.artists[0].strFacebook;
    let twitter = result.artists[0].strTwitter;





    let data = {
        idArtista: idArtista,
        nombreArtista: nombreArtista,
        logo: logo,
        bio: bio,
        imgGrupo: imgGrupo,
        Genero: genMus,
        sitioWeb: sitWeb,
        facebook: facebook,
        twitter: twitter,

    }

    // videos(idArtista);


    arrayDatos.push(data);

    localStorage.setItem("artistaConsultado", JSON.stringify(arrayDatos));
    recuperar_localStorage = JSON.parse(localStorage.getItem("artistaConsultado"));


    mostrardatos(data);

}


function videos(idArtist) {
    let urlVideo = 'https://theaudiodb.com/api/v1/json/1/mvid.php?i=';
    const fetchPromise = fetch(`${urlVideo}${idArtist}`);
    fetchPromise.then(response => {
        return response.json();
    }).then(result => {

        pintarVideos(result);

    }).catch(err => {
        console.log('fallo!: ', err);
        informacion.innerHTML = `<div class="row justify-content-center text-center">
<p class="mb-3 col-12  align-self-center" style="color: red; font-weight: bold">Videos no encontrados. </p>

</div>`

    });

}

function pintarVideos(result) {


    for (let i = 0; i < result.mvids.length; i++) {

        let canciones = result.mvids[i].strTrack;
        let videosCanciones = result.mvids[i].strMusicVid;

        //ver estooo



    }


}




function mostrardatos(data) {


    informacion.innerHTML = '';
    template.querySelector('.card-title').textContent = data.nombreArtista;
    template.querySelector('#logo').setAttribute(`src`, `${data.logo}`);
    template.querySelector('.activator').setAttribute(`src`, `${data.imgGrupo}`);
    template.querySelector('.card-reveal .card-title ~ p').textContent = data.bio;
    template.querySelector('.collapsible li:nth-child(1) .collapsible-body ').textContent = data.Genero;
    template.querySelector('.collapsible li:nth-child(2) .collapsible-body a').textContent=data.sitioWeb;
    template.querySelector('.collapsible li:nth-child(2) .collapsible-body a').setAttribute(`href`,`https://`+`${data.sitioWeb}`);

    console.log("🚀 ~ file: main.js ~ line 148 ~ mostrardatos ~ data.sitioWeb", data.sitioWeb)




 
    /* template.querySelector(".card-header").textContent = botonbuscar.value.toUpperCase();
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

*/
    const clone = template.cloneNode(true);
    fragment.appendChild(clone);

    informacion.appendChild(fragment);


}


