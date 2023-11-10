// code de Alina

//afficher quelques données du fichier json test
fetch('data.json').then(function (response){
    response.json().then(function () {

        d3.select("#graphique")
    .selectAll(".noms")
    .data(data)
    .join("div")
    .attr("class","noms")
    .text(`state : ${State}`);
    });
});