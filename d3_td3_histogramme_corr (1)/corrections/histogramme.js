// Dans cet exemple, l'axe horizontal fait 100 de large, l'axe vertical fait 2*25 
let data_paires=[
    {A:32, B:25},
    {A:40, B:75},
    {A:65, B:84},
    {A:70, B:54},
    {A:99, B:21},
    {A:43, B:19},
    {A:52, B:33},
    {A:12, B:37}
]
let largeur_colonne=400/data_paires.length;



d3.select("#barres")
    .selectAll(".histobarre")
    .data(data_paires)
    .join("g")
    .attr("class","histobarre")
    .attr("transform", (d,i)=>`translate(${i*largeur_colonne},0)`);

d3.selectAll(".histobarre")
    .append("rect")
    .attr("width", largeur_colonne)
    .attr("height", d=> d.A  )
    .style("fill","blue");

d3.selectAll(".histobarre")
    .append("rect")
    .attr("width", largeur_colonne )
    .attr("height", d=> d.B   )
    .attr("transform", "scale(1,-1)")
    .style("fill","red");    
    
    



d3.selectAll(".histobarre")
    .on("mouseenter", function(e,d){
    /* transparence */
    d3.selectAll(".histobarre")
        .style("opacity","0.5")
    d3.select(this)
        .style("opacity",null)
        
    /* dimensions des barres du sous-graphique */
    let barWidthScale=400/(d.A+d.B);    //ratio entre valeur (d.A ou d.B) et largeur de la barre correspondante
    let barHeight=40*(d.A+d.B)/200;     //hauteur des deux barres

    d3.select("#blueBar")
        .transition()
        .attr("width", d.A*barWidthScale)
        .attr("height",barHeight)

    d3.select("#redBar") 
        .transition()
        .attr("width", d.B*barWidthScale)
        .attr("height",barHeight)

    /* labels */
    d3.select("#blueLabel")        
        .text(d.A);
    d3.select("#redLabel") 
        .text(d.B);   
    
    /* hauteur du séparateur */    
    d3.select("#sep5050")
        .transition()
        .attr("y2", barHeight)
})  

d3.selectAll(".histobarre")
    .on("mouseleave", function(){
    /* transparence */
    
    d3.selectAll(".histobarre")
        .style("opacity",null)
        
    
    /* dimensions des barres du sous-graphique */    
    d3.select("#blueBar")
        .transition()
        .attr("width", 0);
    d3.select("#redBar") 
        .transition()
        .attr("width", 0);   
    /* labels */
    d3.select("#blueLabel")        
        .text("");
    d3.select("#redLabel") 
        .text("");
    
    /* hauteur du séparateur */ 
    
    d3.select("#sep5050")
        .transition()
        .attr("y2", 0)
        
})  
    
    

