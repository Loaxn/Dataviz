// code de Alina

//afficher quelques données du fichier json test
console.log("hello")


// d3.select("#graphique")
// .selectAll(".noms")
// .data(data)
// .join("div")
// .attr("class","noms")
// // .text(`state : ${state}`)
// .text((d,i) => `${d.state_name}` );

fetch('data.json').then(function (response){
    response.json().then(function () {

        d3.select("#graphique")
    .selectAll(".noms")
    .data(data.json)
    .join("div")
    .attr("class","noms")
    .text((d,i) => `${d.state_name}` );
    });
});

//Comment afficher les données du json
//Est ce que c'est vraiment nécessaire d'éffacer des données
//Est ce que pour les coueurs de carte il faut utiliser le json ou on peut le faire manuellement
//Comment faire pour le graphique