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

//code du prof
fetch('data.json')
    .then((response) => response.json())
    .then((dataFetched) => {
        console.log(dataFetched)

        const CRITERIA_STATE = 'AK';
        const CRITERIA_YEAR = "2016";
        const CRITERIA_INDICATOR = 'Number of Drug Overdose Deaths';

        const dataReduced = dataFetched.filter(d => {
            if (
                d.state === CRITERIA_STATE &&
                d.year === CRITERIA_YEAR &&
                d.indicator === CRITERIA_INDICATOR
            ) return true
            else return false;
        })

        console.log(dataReduced);

        const dataValues = dataReduced.map(d => d.data_value)

        console.log(dataValues);

        d3.select("#graphique")
        .selectAll(".noms")
        .data(dataFetched)
        .join("div")
        .attr("class","noms")
        .text((d,i) => `${d.state_name}` );

    })

//Comment afficher les données du json
//Est ce que c'est vraiment nécessaire d'éffacer des données
//Est ce que pour les coueurs de carte il faut utiliser le json ou on peut le faire manuellement
//Comment faire pour le graphique
// fetch('data.json').then(function (response){
//     response.json().then(function () {

//     d3.select("#graphique")
//     .selectAll(".noms")
//     .data(data)
//     .join("div")
//     .attr("class","noms")
//     .text(`state : ${state}`);
//     });
// });

// CECI EST UN EXEMPLE reste à mettre les vrais données
document.addEventListener('DOMContentLoaded', function () {
    var donnees = [
        { "nom": "Heroine", "valeur": 20 },
        { "nom": "Cocaine", "valeur": 50 },
        { "nom": "Methadone", "valeur": 30 },
        { "nom": "Methadone", "valeur": 10 }
        // Ajoutez les autres données ici
    ];

    // Configuration du graphique
    var largeur = 750;
    var hauteur = 200;

    // Création de l'échelle pour l'axe des x
    var echelleX = d3.scaleBand()
        .domain(donnees.map(function (d) { return d.nom; }))
        .range([0, largeur])
        .padding(0.1);

    // Création de l'échelle pour l'axe des y
    var echelleY = d3.scaleLinear()
        .domain([0, d3.max(donnees, function (d) { return d.valeur; })])
        .range([hauteur, 0]);

    // Création du conteneur SVG
    var svg = d3.select("#graphique")
        .append("svg")
        .attr("width", largeur)
        .attr("height", hauteur);

    // Création de la ligne
    var ligne = d3.line()
        .x(function (d) { return echelleX(d.nom) + echelleX.bandwidth() / 2; }) // Centre de la bande
        .y(function (d) { return echelleY(d.valeur); });

    // Ajout de la ligne au graphique
    svg.append("path")
        .datum(donnees)
        .attr("d", ligne)
        .attr("fill", "none")
        .attr("stroke", "red");

    // Ajout des points de données
    svg.selectAll(".point")
        .data(donnees)
        .enter().append("circle")
        .attr("class", "point")
        .attr("cx", function (d) { return echelleX(d.nom) + echelleX.bandwidth() / 2; })
        .attr("cy", function (d) { return echelleY(d.valeur); })
        .attr("r", 4) // rayon du cercle

   
});
