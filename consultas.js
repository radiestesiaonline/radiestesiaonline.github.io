const urlParams = new URLSearchParams(window.location.search);

const radiestesista = urlParams.get("radiestesista"); // edusantana
const repo = urlParams.get("repo"); // consultas
const consulta = urlParams.get("consulta"); // consultas/eduardo/21-04-2020

// https://edusantana.github.io/consultas/resultado.html?cliente=eduardo&consulta=21-04-2019
// https://edusantana.github.io/consultas/consultas/eduardo/21-04-2020.json
// https://radiestesiaonline.github.io/resultado.html?radiestesista=edusantana&repo=consultas&consulta=consultas/eduardo/21-04-2020

console.log("Atualizando cores a partir da consulta");
console.log(radiestesista);
console.log(repo);
console.log(consulta);

$.getJSON( "https://"+radiestesista+".github.io/"+repo+"/"+consulta+".json", function( data ) {
  var items = [];
  $.each( data, function( key, val ) {
    if (val == 1){
      var corDaImagem ="red";
      var classe ="desequilibrio";
    }else{
      var corDaImagem ="blue";
      var classe ="equilibrio";
    }

    // Texto
    $( "." + key ).addClass(classe);
    // SVG
    $('#' + key +' >tspan').css('fill',corDaImagem);
    $('#' + key).css('fill',corDaImagem); // chakras
  });
});
