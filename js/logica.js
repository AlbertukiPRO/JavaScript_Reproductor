var index = 0;
var isPlay = false;

window.onload = async function () {
    UpdateStyle(document.querySelector(".viewPlayer"),'hide');

    await getDatos().then(res => {
        console.log(res);
        getDatos(res);
        UpdateStyle(document.querySelector(".boxload"),'hide');
        buildInterface(res);
    });


    document.querySelector("#back").addEventListener("click",function () {
        UpdateStyle(document.querySelector('.viewPlayer'),'hide');
        UpdateStyle(document.querySelector('#viewAlbum'),'show');
        location.reload();
    })
}

function UpdateStyle(elemet, type){
    switch (type) {
        case 'hide':
            elemet.classList.remove("show");
            elemet.classList.add("hide");
            break;
        case 'show':
            elemet.classList.remove("hide");
            elemet.classList.add("show");

    }
}


function buildInterface(dataMusic){
    const musicaData = dataMusic;

    const body = document.querySelector("#body");

    for (let i = 0; i < musicaData.length; i++) {

        var divItem = document.createElement("div");
        divItem.classList.add("item");


        var divPortada = document.createElement("div");
        divPortada.setAttribute("class","portada")
        divPortada.style.backgroundImage = "url("+musicaData[i]['caratula']+")";


        var spanIcon = document.createElement("span");
        spanIcon.setAttribute("class","material-icons");
        spanIcon.innerHTML = "play_circle";

        var divData = document.createElement("div");
        divData.setAttribute("class","dataalumbun");

        var p1 = document.createElement("p");
        p1.innerHTML = musicaData[i]['nombre'];

        var p2 = document.createElement("p");
        p2.innerHTML = "No. Canciones:"+ musicaData[i]['ncanciones'];

        divData.appendChild(p1);
        divData.appendChild(p2);

        divItem.appendChild(divPortada);
        divPortada.appendChild(spanIcon);
        divItem.appendChild(divData);

        body.appendChild(divItem);
    }

    var listItems = document.querySelectorAll(".item");
    for (let i = 0; i < listItems.length; i++) {
        listItems[i].addEventListener("click", function () {
            let listDataAlbum = [];
            listDataAlbum.push(dataMusic[i]['nombre']);
            listDataAlbum.push(dataMusic[i]['artista']);
            listDataAlbum.push(dataMusic[i]['caratula']);
            listDataAlbum.push(dataMusic[i]['ncanciones']);
            listDataAlbum.push(dataMusic[i]['canciones']);

            console.log(listDataAlbum);

            buildPlayer(listDataAlbum);
        });
    }
}

function buildPlayer(listadata) {

    UpdateStyle(document.querySelector('#viewAlbum'), 'hide');
    UpdateStyle(document.querySelector('.viewPlayer'), 'show');


    document.querySelector("#titleSong").innerHTML = listadata[0];
    console.log(listadata[2]);


    let portada = document.querySelector("#changeP");
    portada.style.backgroundImage = 'url('+listadata[2]+')';

    document.querySelector(".container").style.backgroundImage ='url('+listadata[2]+')';

    var player = document.querySelector('#setAudio');

    player.setAttribute("src",listadata[4][0]['source']);
    player.load();

    document.querySelector('#play').addEventListener("click", function (){
       if (!isPlay){
           player.play();

           setDuration(listadata[4][index]['source']);

           isPlay = true// isPlay => false,
           console.log("Click Play Song");
       }else{
           player.pause();
           isPlay = false;
           console.log("Click Pause Song");
       }
    });

    document.querySelector("#nametrack").innerHTML = listadata[4][index]['trackName'];

    document.querySelector(".btnPrev").addEventListener("click", function (){
        player.setAttribute("src",listadata[4][index+1]['source']);
        setDuration(listadata[4][index+1]['source']);
        player.load();
        player.play();
        console.log(listadata[4][index+1]['source']);
        document.querySelector("#nametrack").innerHTML = listadata[4][index]['trackName'];
    });

    document.querySelector(".btnNext").addEventListener("click", function (){
        if (!index==0){ //index => 0 - 1
            index--;
        }
        player.setAttribute("src",listadata[4][index]['source']);
        setDuration(listadata[4][index]['source']);
        player.load();
        player.play();
        document.querySelector("#nametrack").innerHTML = listadata[4][index]['trackName'];
    });



}

function setBarra(length) {
    let barra = document.querySelector(".subbarra");
    barra.style.animationName = "barra";
    var secons = tiempo*60;
    barra.style.animationDuration= ''+secons+'s';
    barra.style.backgroundColor = "#001";
    barra.style.width = "0";
    barra.style.height = "100%";
    barra.style.borderRadius = "15px";
}


function setDuration(ruta){
    getDuration(ruta, function(length) {
        console.log('I got length ' + length);
        tiempo = length/60;
        setBarra(tiempo);
        document.getElementById("tiempo").textContent = tiempo.toFixed(2) + " min";
    });
}


function getDuration(src, cb) {
    var audio = new Audio();
    $(audio).on("loadedmetadata", function(){
        cb(audio.duration);
    });
    audio.src = src;
}

async function getDatos(){
    let dataMusic = JSON.parse(JsonFile);
    return dataMusic;
}