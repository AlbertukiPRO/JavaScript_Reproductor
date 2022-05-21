window.onload = async function () {

    await getDatos().then(res => {
        console.log(res);
        getDatos(res);
        Hide(document.querySelector(".boxload"));
        buildInterface(res);
    });
}

function Hide(elemet){
    elemet.classList.add("hide");
}


function buildInterface(dataMusic){
    const musicaData = dataMusic;

    let body = document.querySelector("#body");

    for (let i = 0; i < musicaData.length; i++) {

        var divItem = document.createElement("div");
        divItem.classList.add("item");

        var divPortada = document.createElement("div");
        divPortada.style.backgroundImage = "url("+musicaData[i]['caratula']+")";

        divItem.appendChild(divPortada);
        body.appendChild(divItem);
    }

}

async function getDatos(){
    let dataMusic = JSON.parse(JsonFile);
    return dataMusic;
}