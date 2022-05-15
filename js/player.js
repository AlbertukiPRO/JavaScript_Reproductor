
initPlayer();
var indexTrak = 0;
var isPlay = false;
var tiempo= 0;

function initPlayer() {

    var audio = document.getElementById("audio");

     fileJSON = JSON.parse(jsonString); //load data.

    //TODO: SHOW load indicator;
    buildInterfaz(fileJSON).then(()=>{
        ocultar(document.getElementById("cargador"));
    });

    var albums = document.getElementsByClassName("item");

    for (let i = 0; i < albums.length; i++) {
        albums[i].addEventListener("click",function () {
            mostrar(document.querySelector("#cargador"));
            ocultar(document.querySelector(".listaCanciones"));
            mostrar(document.querySelector(".view1"))
            buildTrack(fileJSON[i]['caratula'],fileJSON[i]['nombre'],fileJSON[i]['artista'],fileJSON[i]['canciones']).then(()=>{
                ocultar(document.querySelector("#cargador"));
            });
        });
    }
}

async function buildTrack(portada,nombre,artista,canciones) {

    document.querySelector(".btnBack").addEventListener("click",function () {
        mostrar(document.querySelector(".listaCanciones"));
        ocultar(document.querySelector(".view1"))

        let audio = document.querySelector("#audio");
        audio.pause();

        location.reload();
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
    audio.play();
    document.querySelector("#nombreCancion").innerHTML = canciones[indexTrak]['trackName'];

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
        tiempo=0;
        indexTrak++;
        buildTrack(portada,nombre,artista,canciones);
    });

    document.querySelector(".btnPrev").addEventListener("click", function () {
        indexTrak--;
        tiempo=0;
        buildTrack(portada,nombre,artista,canciones);
    });
    console.log(indexTrak);
}

function PlaySong(audio) {
    document.querySelector(".btnControllers").style.backgroundImage = 'url("../resources/icons/play.png") !important;';
    audio.play();
}

function PauseSong(audio) {
    document.querySelector(".btnControllers").style.backgroundImage = 'url("../resources/icons/pause.png") !important;';
    audio.pause();
}
function setBarra(length) {
    let barra = document.querySelector(".subbarra");
    barra.style.animationName = "nada";
    barra.style.animationName = "barra";
    var secons = tiempo*60;
    barra.style.animationDuration= ''+secons+'s';
    barra.style.backgroundColor = "#001";
    barra.style.width = "0";
    barra.style.height = "100%";
    barra.style.borderRadius = "15px";
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
        tiempo = length/60;
        setBarra(tiempo);
        document.getElementById("tiempo").textContent = tiempo.toFixed(2) + " min";
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