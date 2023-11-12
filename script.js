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