// tous les éléments de type "path" et "polygon" et ajoutez un écouteur d'événements pour le clic
document.querySelectorAll("path, polygon").forEach(element => {
    element.addEventListener('click', function() {
        // on récupère l'identifiant de l'État à partir de l'élément cliqué
        const CRITERIA_STATE = this.id;
        // Effectuez une requête pour récupérer les données du fichier JSON
        fetch('data2.json')
            .then((response) => response.json())
            .then((dataFetched) => {
                // on definit la plage d'années de 2015 à 2023
                const yearRange = Array.from({ length: 9 }, (_, index) => (2015 + index).toString());
                // on definit l'indicateur comme 'Methadone (T40.3)'
                const CRITERIA_INDICATOR = 'Methadone (T40.3)'
                // stockage de la somme des valeurs de données pour chaque année
                const sumValuesByYear = Array(yearRange.length).fill(0); // Initialiser le tableau avec des zéros

                // Filtrez en fonction des critères
                dataFetched.forEach(d => {
                    if (
                        yearRange.includes(d.Year) &&
                        d && d["State Name"] === CRITERIA_STATE &&
                        d.Indicator === CRITERIA_INDICATOR
                    ) {
                        // Convertissez la valeur de données en nombre
                        const numericValue = parseFloat(d["Data Value"].replace(',', ''));

                        // Ajoutez la valeur de données convertie en nombre à la somme de l'année correspondante
                        const yearIndex = yearRange.indexOf(d.Year);
                        if (!isNaN(numericValue)) {
                            sumValuesByYear[yearIndex] += numericValue;
                        }
                    }
                });

                const dataPoints = yearRange.map((year, index) => ({
                    x: parseInt(year, 10), // Utilisez parseInt pour obtenir un nombre entier
                    y: sumValuesByYear[index]
                }));

                // Utilisez D3.js pour créer un graphique en ligne
                const svg = d3.select('#graphique');

                const margin = { top: 20, right: 20, bottom: 30, left: 50 };
                const width = +svg.attr('width') - margin.left - margin.right;
                const height = +svg.attr('height') - margin.top - margin.bottom;

                const x = d3.scaleLinear()
                    .range([0, width])
                    .domain(d3.extent(dataPoints, d => d.x))
                   

                const y = d3.scaleLinear()
                    .range([height, 0])
                    .domain([0, d3.max(dataPoints, d => d.y)])
                    

                const line = d3.line()
                    .x(d => x(d.x))
                    .y(d => y(d.y));

                // Ajoutez un groupe pour le tracé du graphe
                const graphGroup = svg.append('g')
                    .attr('transform', `translate(${margin.left},${margin.top})`);

                graphGroup.append('path')
                    .data([dataPoints])
                    .attr('class', 'line')
                    .attr('d', line)
                    .attr('stroke','#9D1815')
                    .attr('fill','none');

                // Ajoutez les cercles pour chaque point de données
                graphGroup.selectAll('circle')
                    .data(dataPoints)
                    .enter().append('circle')
                    .attr('cx', d => x(d.x))
                    .attr('cy', d => y(d.y))
                    .attr('r', 4) // Rayon du cercle
                    .attr('fill', 'white'); // Couleur du cercle

                // Ajoutez les axes x et y
                graphGroup.append('g')
                    .attr('transform', `translate(0, ${height})`)
                    .call(d3.axisBottom(x))
                    .attr('fill','white');

                graphGroup.append('g')
                    .call(d3.axisLeft(y))
                    .attr('fill','white');
            });

        // Faites défiler la vue vers l'élément contenant le graphique
        document.getElementById('graphique').scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

