
//on selectionne les paths et les polygon de la carte
document.querySelectorAll("path, polygon").forEach(element => {
element.addEventListener('click', function () {
//on récupère les etats choisis
    const CRITERIA_STATE = this.id;
fetch('data2.json')
    .then((response) => response.json())
    .then((dataFetched) => {
 // on définis la plage d'années de 2015 à 2023
 const yearRange = Array.from({ length: 9 }, (_, index) => (2015 + index).toString());

 // on definit l'indicateur comme Methadone ou heroine
 const CRITERIA_INDICATOR = 'Heroin (T40.1)';

 // on stocke la somme dans un tableau
 const sumValuesByYear = Array(yearRange.length).fill(0); 

 // on filtre en fonction des critères
 dataFetched.forEach(d => {
     if (
         yearRange.includes(d.Year) &&
         d && d["State Name"] === CRITERIA_STATE &&
         d.Indicator === CRITERIA_INDICATOR
     ) {
         // Convertissez la valeur de données en nombre
         const numericValue = parseFloat(d["Data Value"].replace(',', ''));
         // remplace les NaN en 0 
         const yearIndex = yearRange.indexOf(d.Year);
         if (!isNaN(numericValue)) {
             sumValuesByYear[yearIndex] += numericValue;
             console.log(sumValuesByYear)
         }
     }
 });


    const dataPoints = yearRange.map((year, index) => ({
        x: parseInt(year, 10), // Utilisez parseInt pour obtenir un nombre entier mais ça marche pas 
        y: sumValuesByYear[index]
    }));

    // Utilisez D3.js pour créer un graphique en ligne
    const svg = d3.select('.graphique');
    const margin = { top: 20, right: 20, bottom: 30, left: 50 };
    const width = +svg.attr('width') - margin.left - margin.right;
    const height = +svg.attr('height') - margin.top - margin.bottom;

    const x = d3.scaleLinear()
        .range([0, width])
        .domain(d3.extent(dataPoints, d => d.x));

    const y = d3.scaleLinear()
        .range([height, 0])
        .domain([0, d3.max(dataPoints, d => d.y)]);

    const line = d3.line()
        .x(d => x(d.x))
        .y(d => y(d.y));

    // Effacez le contenu existant du groupe
        svg.select(".graphGroup").remove();


    // Ajoutez un groupe pour le tracé du graphe
    const graphGroup = svg.append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`)
        .attr('class',"graphGroup");
   


    // Ajoutez la ligne du graphique avec le dégradé
    const linePath = graphGroup.append('path')
        .data([dataPoints])
        .attr('class', 'line')
        .attr('d', line)
        .style('stroke', 'url(#line-gradient)') // Utilisez le dégradé
        .style('stroke-width', 3) // Ajustez l'épaisseur du trait
        .attr('fill', 'none');

    // Création et Ajout du dégradé au SVG
    svg.append("defs").append("linearGradient")
        .attr("id", "line-gradient")
        .attr("gradientUnits", "userSpaceOnUse")
        .attr("x1", 0).attr("y1", y(0))
        .attr("x2", 0).attr("y2", y(d3.max(dataPoints, d => d.y)))
        .selectAll("stop")
        .data([
            { offset: "0%", color: "#E42A2A" },
            { offset: "50%", color: "#DA5B58" },
            { offset: "100%", color: "#ED8240" }
        ])
        .enter().append("stop")
        .attr("offset", d => d.offset)
        .attr("stop-color", d => d.color);

    // pour obtenir la longueur totale du chemin
    const totalLength = linePath.node().getTotalLength();

    // Ajout de l'animation du tracé
    linePath
        .attr('stroke-dasharray', `${totalLength} ${totalLength}`)
        .attr('stroke-dashoffset', totalLength)
        .transition()
        .duration(1500) // Durée de l'animation en millisecondes
        .ease(d3.easeLinear)
        .attr('stroke-dashoffset', 0);

    // Ajout des cercles pour chaque point de données
    graphGroup.selectAll('circle')
        .data(dataPoints)
        .enter().append('circle')
        .attr('cx', d => x(d.x))
        .attr('cy', d => y(d.y))
        .attr('r', 4) // Rayon du cercle
        .attr('fill', 'white'); // Couleur du cercl

    // Ajout des axes x et y
    graphGroup.append('g')
        .attr('transform', `translate(0, ${height})`)
        .call(d3.axisBottom(x))
        .style('fill','white')
        .selectAll('text')
        .style('fill', 'white') 
        .style('font-size', '1rem'); 
        

    graphGroup.append('g')
        .call(d3.axisLeft(y))
        .attr('fill', 'white')
        .selectAll('text')
        .style('fill', 'white') 
        .style('font-size', '1rem'); 


    
});

        // au moment du clique sur la carte on descend vers le graphe correspondant
        document.getElementById('graphique').scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});



// Sélectionnez tous les éléments de type "path" et "polygon" et ajoutez un écouteur d'événements pour le clic
document.querySelectorAll(".graphiqueboutons input[type=button]").forEach(button => {
    button.addEventListener('click', function () {

        const CRITERIA_INDICATOR_two = this.id;

        fetch('data2.json')
        .then((response) => response.json())
        .then((dataFetched) => {
     // on définis la plage d'années de 2015 à 2023
     const yearRange = Array.from({ length: 9 }, (_, index) => (2015 + index).toString());
    
        
    
     // on stocke la somme dans un tableau
     const sumValuesByYear = Array(yearRange.length).fill(0); 
    
     // on filtre en fonction des critères
     dataFetched.forEach(d => {
         if (
             yearRange.includes(d.Year) &&
             d && d["State Name"] === CRITERIA_STATE &&
             d && d["Indicator"] ===CRITERIA_INDICATOR_two
         ) {
             // Convertissez la valeur de données en nombre
             const numericValue = parseFloat(d["Data Value"].replace(',', ''));
             // remplace les NaN en 0 
             const yearIndex = yearRange.indexOf(d.Year);
             if (!isNaN(numericValue)) {
                 sumValuesByYear[yearIndex] += numericValue;
                 console.log(sumValuesByYear)
             }
         }
     });
    
    
        const dataPoints = yearRange.map((year, index) => ({
            x: parseInt(year, 10), // Utilisez parseInt pour obtenir un nombre entier mais ça marche pas 
            y: sumValuesByYear[index]
        }));
    
    
        // Utilisez D3.js pour créer un graphique en ligne
        const svg = d3.select('.graphique');
        const margin = { top: 20, right: 20, bottom: 30, left: 50 };
        const width = +svg.attr('width') - margin.left - margin.right;
        const height = +svg.attr('height') - margin.top - margin.bottom;
    
        const x = d3.scaleLinear()
            .range([0, width])
            .domain(d3.extent(dataPoints, d => d.x));
    
        const y = d3.scaleLinear()
            .range([height, 0])
            .domain([0, d3.max(dataPoints, d => d.y)]);
    
        const line = d3.line()
            .x(d => x(d.x))
            .y(d => y(d.y));
    
        // Effacez le contenu existant du groupe
            svg.select(".graphGroup").remove();
    
    
        // Ajoutez un groupe pour le tracé du graphe
        const graphGroup = svg.append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`)
            .attr('class',"graphGroup");
       
    
    
        // Ajoutez la ligne du graphique avec le dégradé
        const linePath = graphGroup.append('path')
            .data([dataPoints])
            .attr('class', 'line')
            .attr('d', line)
            .style('stroke', 'url(#line-gradient)') // Utilisez le dégradé
            .style('stroke-width', 3) // Ajustez l'épaisseur du trait
            .attr('fill', 'none');
    
        // Création et Ajout du dégradé au SVG
        svg.append("defs").append("linearGradient")
            .attr("id", "line-gradient")
            .attr("gradientUnits", "userSpaceOnUse")
            .attr("x1", 0).attr("y1", y(0))
            .attr("x2", 0).attr("y2", y(d3.max(dataPoints, d => d.y)))
            .selectAll("stop")
            .data([
                { offset: "0%", color: "#E42A2A" },
                { offset: "50%", color: "#DA5B58" },
                { offset: "100%", color: "#ED8240" }
            ])
            .enter().append("stop")
            .attr("offset", d => d.offset)
            .attr("stop-color", d => d.color);
    
        // pour obtenir la longueur totale du chemin
        const totalLength = linePath.node().getTotalLength();
    
        // Ajout de l'animation du tracé
        linePath
            .attr('stroke-dasharray', `${totalLength} ${totalLength}`)
            .attr('stroke-dashoffset', totalLength)
            .transition()
            .duration(1500) // Durée de l'animation en millisecondes
            .ease(d3.easeLinear)
            .attr('stroke-dashoffset', 0);
    
        // Ajout des cercles pour chaque point de données
        graphGroup.selectAll('circle')
            .data(dataPoints)
            .enter().append('circle')
            .attr('cx', d => x(d.x))
            .attr('cy', d => y(d.y))
            .attr('r', 4) // Rayon du cercle
            .attr('fill', 'white'); // Couleur du cercl
    
        // Ajout des axes x et y
        graphGroup.append('g')
            .attr('transform', `translate(0, ${height})`)
            .call(d3.axisBottom(x))
            .style('fill','white')
            .selectAll('text')
            .style('fill', 'white') 
            .style('font-size', '1rem'); 
            
    
        graphGroup.append('g')
            .call(d3.axisLeft(y))
            .attr('fill', 'white')
            .selectAll('text')
            .style('fill', 'white') 
            .style('font-size', '1rem'); 
            
        
    
        
    });
    
            // au moment du clique sur la carte on descend vers le graphe correspondant
            document.getElementById('graphique').scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });
    