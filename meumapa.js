function pegaValue(){
    var city = document.getElementById('cidade').value;
    return city
}

var resposta;

 var Pesquisar = function(){

    limpar();

    var consulta = new XMLHttpRequest();
    var url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+pegaValue()+".json?access_token=pk.eyJ1IjoiY2ZsYmVkdWNhdG9yIiwiYSI6ImNrMTZrYm1vNTA1dWEzaGxqN2tmMTZlazcifQ.XXsWkpgiguegb-C7WQpGBA";
    consulta.open("GET", url, true);
    consulta.onreadystatechange = function(e){

        if(this.readyState == 4){
            console.log(JSON.parse(this.response));
         resposta = JSON.parse(this.responseText);

        resultado(resposta);

              
        }

    }
        consulta.send();

}

function elementoOl(){
    var nova_Ol = document.createElement('ol');
    document.getElementById('principal');
    principal.appendChild(nova_Ol);
    nova_Ol.setAttribute('id', 'lista_ordenada');
}


function resultado(resposta) {

    qualquer = resposta.features.length;
    for(let x=0; x<qualquer; x++){
        
        var nome_da_cidade = resposta.features[x].place_name;
        var latitude = resposta.features[x].center[1];
        var longitude = resposta.features[x].center[0];

        itens(nome_da_cidade, x, latitude, longitude );

    }
}

function itens(nome_do_item, id, lat, long){
    elementoOl();
    var nova_li = document.createElement('li');
    nova_li.setAttribute('id', 'id');

    var novo_link = document.createElement('a');
    novo_link.setAttribute('href', '#');
    novo_link.setAttribute('onclick', 'GerarMapa('+lat+','+long+')');
    var texto = document.createTextNode(nome_do_item);
    novo_link.appendChild(texto);
    nova_li.appendChild(novo_link);
    document.getElementById('id');

    document.getElementById('lista_ordenada').appendChild(nova_li);
}


function limpar() {
    document.getElementById('principal').innerHTML = "";
}

function limpaMapa() {
    document.getElementById('mapid').innerHTML = "";
}

function mapAgain() {
    var div = document.createElement('div');
    div.setAttribute('id', 'mapa');
    div.style.width = '600px';
    div.style.heigth = '600px';
    document.getElementById('mapid').appendChild(div);
}

function GerarMapa(lat, long, nome_do_item) {

    limpaMapa();
    mapAgain();

    var mymap = L.map('mapid').setView([lat, long], 15);

    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiY2ZsYmVkdWNhdG9yIiwiYSI6ImNrMTZrYm1vNTA1dWEzaGxqN2tmMTZlazcifQ.XXsWkpgiguegb-C7WQpGBA', {
        maxZoom: 18,
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
            '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
            'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        id: 'mapbox.streets'
    }).addTo(mymap);
    
    L.marker([lat, long]).addTo(mymap)
        .bindPopup("<b>Seja Bem vindo a " + nome_do_item + "!</b><br /").openPopup();
    
    L.circle([lat, long], 400, {
        color: 'black',
        fillColor: 'white',
        fillOpacity: 0.5
    }).addTo(mymap).bindPopup("I am a circle.");
    mymap.on('click', onMapClick);



}