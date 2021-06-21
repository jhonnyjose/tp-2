const URL = 'https://www.theaudiodb.com/api/v1/json/1/search.php?s=';
const button = document.getElementById("enviar");
const botonbuscar = document.getElementById("busqueda");
const informacion = document.getElementById("informaciongenerada");
const fragment = document.createDocumentFragment();
const template = document.querySelector("#template-musico").content;
const card = document.querySelector(".card");
const busqueda = document.querySelector(".valign-wrapper");
const container1 = document.querySelector(".container");






button.addEventListener("click", () => {
    artista(botonbuscar.value);
    busqueda.setAttribute(`style`, `display:none`)


});


function artista(artistaBuscado) {

    const fetchPromise = fetch(`${URL}${artistaBuscado}`);
    fetchPromise.then(response => {
        //  console.log('result', response);
        return response.json();
    }).then(result => {
        //    console.log('data', result);
        document.querySelector('body').classList.add('fondoEncontrado');
        localStore(result);


    }).catch(err => {
        console.log('fallo!: ', err);

        document.querySelector('body').classList.add('fondos');


        informacion.innerHTML = `
        
        
        <div class="row">
            <div class=" valign-wrapper  ">

                    <div class="col s12 m12 l12   center">
                        <p >Artista no encontrado. </p>
                        <button type="button" class="btn azul pulse" onclick="location.reload()">Intentar nuevamente</button>
                    </div>

            </div>
        </div>

        
`

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
    let strArtistFanart = result.artists[0].strArtistFanart;
    let strArtistFanart2 = result.artists[0].strArtistFanart2;
    let strArtistFanart3 = result.artists[0].strArtistFanart3;
    let strArtistBanner = result.artists[0].strArtistBanner;





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
        img1: strArtistFanart,
        img2: strArtistFanart2,
        img3: strArtistFanart3,
        img4: strArtistBanner,

    }

    videos(idArtista);


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

        document.querySelector('body').classList.add('fondos');


        informacion.innerHTML = `
        
        
        <div class="row">
            <div class=" valign-wrapper  ">

                    <div class="col s12 m12 l12   center">
                        <p >Algo fallo. </p>
                        <button type="button" class="btn azul pulse" onclick="location.reload()">Intentar nuevamente</button>
                    </div>

            </div>
        </div>`

    });

}

function pintarVideos(result) {

    let texto = template.querySelector('.collapsible li:nth-child(5) .collapsible-body .videos .carousel-item');

    if (result.mvids != '' && result.mvids != null) {
        for (let i = 0; i < result.mvids.length; i++) {

            let p = document.createElement('p');
            let iframe = document.createElement('iframe');
            iframe.setAttribute(`height`, 315);
            iframe.setAttribute(`width`, 560);
            iframe.setAttribute(`src`, '');
            iframe.setAttribute(`frameborder`, 0);
            iframe.setAttribute(`allow`,`accelerometer`);
            iframe.setAttribute(`autoplay`, true);
            iframe.setAttribute(`clipboard-write`, true);
            iframe.setAttribute(`encrypted-media`, true);
            iframe.setAttribute(`gyroscope`, true);
            iframe.setAttribute(`picture-in-picture`, true);
            iframe.setAttribute(`allowfullscreen`, true);
    
            let canciones = result.mvids[i].strTrack;
    
            let videosCanciones = result.mvids[i].strMusicVid;
    
            p.textContent = `${canciones}`;
            iframe.setAttribute(`src`, `${videosCanciones}`)
    
            texto.appendChild(p);
            texto.appendChild(iframe);
           
        } 
    }
    else
    {
        let p2 = document.createElement('p');
        p2.textContent = 'Sin Videos';
        texto.appendChild(p2);
        
    }


    const clone = template.cloneNode(true);
    fragment.appendChild(clone);

    informacion.appendChild(fragment);
    

}




function mostrardatos(data) {


    informacion.innerHTML = '';

    template.querySelector('.card-title').textContent = data.nombreArtista;

    if (data.logo != '' && data.logo != null) {
        template.querySelector('#logo').setAttribute(`src`, `${data.logo}`);
    }

    if (data.imgGrupo != '' && data.imgGrupo != null) {
        template.querySelector('.activator').setAttribute(`src`, `${data.imgGrupo}`);
    }

    if (data.bio != '' && data.bio != null) {
        template.querySelector('.card-reveal .card-title ~ p').textContent = data.bio;
    }

    if (data.Genero != '' && data.Genero != null) {
        template.querySelector('.collapsible li:nth-child(1) .collapsible-body ').textContent = data.Genero;
    }

    if (data.sitioWeb != '' && data.sitioWeb != null) {
        template.querySelector('.collapsible li:nth-child(2) .collapsible-body a').textContent = data.sitioWeb;
        template.querySelector('.collapsible li:nth-child(2) .collapsible-body a').setAttribute(`href`, `https://` + `${data.sitioWeb}`);
    }

    if (data.facebook != '' && data.facebook != null) {
        template.querySelector('.collapsible li:nth-child(3) .collapsible-body ul li:nth-child(1) a').textContent = data.facebook;
        template.querySelector('.collapsible li:nth-child(3) .collapsible-body ul li:nth-child(1) a').setAttribute(`href`, `https://` + `${data.facebook}`);
    }

    if (data.twitter != '' && data.twitter != null) {
        template.querySelector('.collapsible li:nth-child(3) .collapsible-body ul li:nth-child(2) a').textContent = data.twitter;
        template.querySelector('.collapsible li:nth-child(3) .collapsible-body ul li:nth-child(2) a').setAttribute(`href`, `https://` + `${data.twitter}`);
    }
    if (data.img1 != '' && data.img1 != null) {
        template.querySelector('.collapsible li:nth-child(4) .collapsible-body .carousel img:nth-child(1)').setAttribute(`src`, `${data.img1}`);
    }
    if (data.img2 != '' && data.img2 != null) {
        template.querySelector('.collapsible li:nth-child(4) .collapsible-body .carousel img:nth-child(2)').setAttribute(`src`, `${data.img2}`);
    }

    if (data.img3 != '' && data.img3 != null) {
        template.querySelector('.collapsible li:nth-child(4) .collapsible-body .carousel img:nth-child(3)').setAttribute(`src`, `${data.img3}`);
    }

    if (data.img4 != '' && data.img4 != null) {
        template.querySelector('.collapsible li:nth-child(4) .collapsible-body .carousel img:nth-child(4)').setAttribute(`src`, `${data.img4}`);
    }










}