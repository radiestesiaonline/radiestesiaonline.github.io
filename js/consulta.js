const urlParams = new URLSearchParams(window.location.search);

const radiestesista = urlParams.get("r"); // edusantana
const repo = urlParams.get("repo") || "radiestesia"; // consultas
const consulta = urlParams.get("c"); // consultas/eduardo/21-04-2020

// https://radiestesiaonline.github.io/consulta.html?r=edusantana&repo=radiestesia&c=paty/20-04-2020
// https://radiestesiaonline.github.io/consulta.html?r=edusantana&c=paty/20-04-2020


console.log("Baixando consulta");
console.log(radiestesista);
console.log(repo);
console.log(consulta);

const csvFileURL="https://"+radiestesista+".github.io/"+repo+"/"+consulta+".csv"

$(document).ready(function() {
    $.ajax({
        type: "GET",
        url: csvFileURL,
        dataType: "text",
        success: function(data) {processData(data);}
     });
});

function processData(csvData){
  csv({
    noheader:false,
    headers: ['tipo','nome','status','link']
  })
  .fromString(csvData)
  .then((jsonData)=>{
    console.log("Processando CSV...");

    const chacras = [null, "coronario", "frontal","laringeo","cardiaco","plexosolar","sacro","basico"]
    const cores = {"e": "darkgreen", "d": "red"}

    // Processa os 7 primeiros itens (os chakras)
    for (var i = 1; i <= 7; i++) {
      chacra = jsonData.shift();
      console.log("chacra: " +  chacra.nome + " - " + chacra.tipo);
      var key = chacras[i];
      corDaImagem=cores[chacra.status];
      // pinta chacra na imagem
      $('#' + key + ', #' + key + " *").css('fill',corDaImagem);
      // muda o link
      $("#link_chacra"+i).attr('href', chacra.link);
    }

    var status_map = {"e": "success", "d": "danger"}
    var titulo_id = null;
    $.each( jsonData, function( index, linha) {
      console.log(linha);

      if (linha.tipo == "t"){
        titulo_id = linha.nome.replace(/[^\w]/gi, '_');
        // titulo
        var div = `
        <div class="col">
        <h2>${linha.nome}</h2>
          <ul class="list-unstyled" id="${titulo_id}"></ul>
        </div>
        `
        $( "#resultados" ).append( div );

      }else if(linha.tipo == "i"){
        // item equilibrado vs desequilibrado
        // <li class="text-success">Energia Telúrica</li>
        // <li class="text-danger">Energia Provocada</li>
        status_class = status_map[linha.status];
        if (linha.link) {
          var item = `
          <a href="${linha.link}">
            <li class="text-${status_class}">${linha.nome}</li>
          </a>
          `
        }else{
          var item = `
          <li class="text-${status_class}">${linha.nome}</li>
          `
        }
        $( "#" + titulo_id ).append( item );
      }

    });

  })
}
