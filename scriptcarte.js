// SCRIPT POUR CARTE 

const triggers = document.querySelectorAll('.map_image path, polygon');
const mini_cercle = document.querySelector('.mini_cercle');
const map = document.querySelector('.map')

function entree () { //Ce qui se passe quand la souris entre dans l'etat
mini_cercle.classList.add('visible');

const etatcoords = this.getBoundingClientRect();//recuperer coordonnées de l'etat
const mapcoords = map.getBoundingClientRect();//récupérer les coordonnées de la carte

const coords = {
    top: (etatcoords.top - mapcoords.top) + (etatcoords.height/2)-8,
    left: (etatcoords.left - mapcoords.left) + (etatcoords.width/2)-8,
}; //le 8 correspond à la moitié de la taille du mini_cercle, pour bien le centrer
mini_cercle.style.setProperty('transform', `translate(${coords.left}px,${coords.top}px)`);//Le minicercle se place sur le bon etat au moment du hover

const CRITERIA_STATE = this.id;
console.log(CRITERIA_STATE);
//Affichage de la description en fonction de l'etat
fetch('data2.json')
    .then((response) => response.json())
    .then((dataFetched) => {
        console.log(dataFetched)

        const CRITERIA_YEAR = "2016";
        const CRITERIA_INDICATOR = 'Number of Drug Overdose Deaths';
        const CRITERIA_MONTH = 'April';

        const dataReduced = dataFetched.filter(d => {
            if (
                d.Month === CRITERIA_MONTH &&
                d.Year === CRITERIA_YEAR &&
                d && d["State Name"] === CRITERIA_STATE &&
                d.Indicator === CRITERIA_INDICATOR
            ) return true
            else return false;
        })
        console.log(dataReduced);

        const dataValues = dataReduced.map(d => (
            d && d["Data Value"] // Il y a un espace dans le fichier json donc il faut écrira comme ça
        ));
        console.log(dataValues);

        d3.select(".info_sup h3")
        .data(dataReduced)
        .text((d,i) => `${d && d["State Name"]}` );
    })
}

function sortie () {//Ce qui se passe quand la souris sort dans l'etat
    mini_cercle.classList.remove('visible');//faire les classes dans css
}

triggers.forEach(trigger => trigger.addEventListener('mouseenter',entree));//quand la souris entre déclenche la fonction entree
triggers.forEach(trigger => trigger.addEventListener('mouseleave',sortie)); //idem pour la fonction sorite

//réparer Florida
const florida = document.querySelector('.cls-12')
florida.addEventListener('mouseenter', function (){
    mini_cercle.classList.add('visible');//faire les classes dans css

const etatcoords = this.getBoundingClientRect();
const mapcoords = map.getBoundingClientRect();

const coords = {
    top: (etatcoords.top - mapcoords.top) + (etatcoords.height/2)-8,
    left: (etatcoords.left - mapcoords.left) + (etatcoords.width/1.3)-8,
}; //le 8 correspond à la moitié de la taille du mini_cercle, pour bien le centrer
mini_cercle.style.setProperty('transform', `translate(${coords.left}px,${coords.top}px)`);
});

//----------------------------------------------------------------

//Nom de l'état qui change en fonction de la partie de la carte que on hover