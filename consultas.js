const urlParams = new URLSearchParams(window.location.search);

const radiestesista = urlParams.get("radiestesista"); // edusantana
const repo = urlParams.get("repo"); // consultas
const consulta = urlParams.get("consulta"); // consultas/eduardo/21-04-2020

// https://edusantana.github.io/consultas/resultado.html?cliente=eduardo&consulta=21-04-2019
// https://edusantana.github.io/consultas/consultas/eduardo/21-04-2020.json
// https://radiestesiaonline.github.io/resultado.html?radiestesista=edusantana&repo=consultas&consulta=consultas/eduardo/21-04-2020
// https://radiestesiaonline.github.io/resultado.html?radiestesista=edusantana&repo=consultas&consulta=paty/21-04-2020

// https://edusantana.github.io/consultas/paty/21-04-2020.csv
// https://edusantana.github.io/consultas/paty/20-04-2020.csv -- ok

console.log("Atualizando cores a partir da consulta");
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
    noheader:true,
    output: "csv"
  })
  .fromString(csvData)
  .then((csvRow)=>{
    console.log(csvRow) // => [["1","2","3"], ["4","5","6"], ["7","8","9"]]
  })
}
