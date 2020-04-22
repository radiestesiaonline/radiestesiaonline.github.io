const urlParams = new URLSearchParams(window.location.search);

const cliente = urlParams.get("cliente");
const consulta = urlParams.get("consulta");

console.log("Atualizando cores a partir da consulta");
console.log(consulta);
console.log(cliente);

$.getJSON( "consultas/"+cliente+"/"+consulta+".json", function( data ) {
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
