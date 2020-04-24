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
    headers: ['item','tipo','link']
  })
  .fromString(csvData)
  .then((jsonData)=>{
    console.log("Processando CSV...");

    $.each( jsonData, function( index, value ) {
      console.log(value);

    });

  })
}
