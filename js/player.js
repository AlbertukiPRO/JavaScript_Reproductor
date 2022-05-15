
initPlayer();
var indexTrak = 0;
var isPlay = false;

function initPlayer() {

    var audio = document.getElementById("audio");

     fileJSON = JSON.parse(jsonString); //load data.
    // audio.src = "../resources/music/The Neighbourhood - Devil's Advocate.mp3";
    //
    // audio.load();
    // audio.play();

    //TODO: SHOW load indicator;
    buildInterfaz(fileJSON).then(()=>{
        document.getElementById("cargador").classList.add("hide");
    });

    var albums = document.getElementsByClassName("item");

    for (let i = 0; i < albums.length; i++) {
        albums[i].addEventListener("click",function () {
            ocultar(document.querySelector(".listaCanciones"));
            mostrar(document.querySelector(".view1"))
            buildTrack(fileJSON[i]['caratula'],fileJSON[i]['nombre'],fileJSON[i]['artista'],fileJSON[i]['canciones']).then(()=>{

            });
        });
    }
}

async function buildTrack(portada,nombre,artista,canciones) {

    document.querySelector(".btnBack").addEventListener("click",function () {
        mostrar(document.querySelector(".listaCanciones"));
        ocultar(document.querySelector(".view1"))

        let audio = document.querySelector("#audio");
    });

    let container = document.querySelector(".container");
    container.style.backgroundImage = 'url('+portada+')';

    let titulo = document.querySelector('#titleSong');
    titulo.innerHTML = nombre + " - " +artista;

    let imgportada = document.querySelector(".portada");
    imgportada.style.backgroundImage= 'url('+portada+')';

    setDuration(canciones[indexTrak]['source']);

    let audio = document.querySelector("#audio");
    audio.src=canciones[indexTrak]['source'];
    audio.load();

    document.querySelector(".btnControllers").style.backgroundImage = 'url("../resources/icons/play.png") !important;';

    document.querySelector("#play").addEventListener("click", function () {

        isPlay = !isPlay;

        if (isPlay){
            PlaySong(audio);
        }else{
            PauseSong(audio);
        }
    });

    document.querySelector(".btnNext").addEventListener("click", function () {
       audio.src=canciones[indexTrak+1]['source'];
       setDuration(canciones[indexTrak+1]['source']);
       audio.load();
       audio.play();
    });
}

function PlaySong(audio) {
    document.querySelector(".btnControllers").style.backgroundImage = 'url("../resources/icons/play.png") !important;';
    audio.play();
}

function PauseSong(audio) {
    document.querySelector(".btnControllers").style.backgroundImage = 'url("../resources/icons/pause.png") !important;';
    audio.pause();
}

function getDuration(src, cb) {
    var audio = new Audio();
    $(audio).on("loadedmetadata", function(){
        cb(audio.duration);
    });
    audio.src = src;
}

function setDuration(ruta){
    getDuration(ruta, function(length) {
        console.log('I got length ' + length);
        document.getElementById("tiempo").textContent = length;
    });
}

async function buildInterfaz(json){
    const contenedor = document.getElementById("grid");

    for (let i = 0; i < json.length; i++) {

        let TagA = document.createElement("a");
        TagA.setAttribute('class',"item");


        let DivIma = document.createElement("div");
        DivIma.setAttribute("class","img");
        DivIma.style.backgroundImage = 'url('+json[i]['caratula']+')';

        let Icon = document.createElement("span");
        Icon.setAttribute("class", "medium material-icons");
        Icon.innerHTML="play_circle_filled";

        let Divsubtitle = document.createElement("div");
        let PAlbumName = document.createElement("p");
        let PNcanciones = document.createElement("p");

        Divsubtitle.setAttribute("class","subtitle");
        PAlbumName.innerHTML=json[i]['nombre'];
        PNcanciones.innerHTML=json[i]['ncanciones'] + " canciones en total";

        Divsubtitle.appendChild(PAlbumName);
        Divsubtitle.appendChild(PNcanciones);

        TagA.appendChild(DivIma);
        TagA.appendChild(Icon);
        TagA.appendChild(Divsubtitle);

        contenedor.appendChild(TagA);
    }
}

function mostrar(element) {
    element.classList.remove("hide");
    element.classList.add("show");
}

function ocultar(element) {
    element.classList.remove("show");
    element.classList.add("hide");
}