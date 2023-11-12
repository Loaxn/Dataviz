// SCRIPT POUR CARTE 

//Le minicercle se place sur la carte au moment du hover
console.log('coucous')
const triggers = document.querySelectorAll('.map_image path, polygon');
const mini_cercle = document.querySelector('.mini_cercle');
const map = document.querySelector('.map')

function entree () {
console.log('enter');
mini_cercle.classList.add('visible');//faire les classes dans css

const etatcoords = this.getBoundingClientRect();
const mapcoords = map.getBoundingClientRect();

const coords = {
    top: (etatcoords.top - mapcoords.top) + (etatcoords.height/2)-8,
    left: (etatcoords.left - mapcoords.left) + (etatcoords.width/2)-8,
}; //le 8 correspond à la moitié de la taille du mini_cercle, pour bien le centrer
mini_cercle.style.setProperty('transform', `translate(${coords.left}px,${coords.top}px)`);
}

function sortie () {
    console.log('leave')
    mini_cercle.classList.remove('visible');//faire les classes dans css
}

triggers.forEach(trigger => trigger.addEventListener('mouseenter',entree));
triggers.forEach(trigger => trigger.addEventListener('mouseleave',sortie)); 

//réparer Florida 
const florida = document.querySelector('.cls-12')
console.log(florida)
florida.addEventListener('mouseenter', function (){
    console.log('fuck florida')
    mini_cercle.classList.add('visible');//faire les classes dans css

const etatcoords = this.getBoundingClientRect();
const mapcoords = map.getBoundingClientRect();

const coords = {
    top: (etatcoords.top - mapcoords.top) + (etatcoords.height/2)-8,
    left: (etatcoords.left - mapcoords.left) + (etatcoords.width/1.3)-8,
}; //le 8 correspond à la moitié de la taille du mini_cercle, pour bien le centrer
mini_cercle.style.setProperty('transform', `translate(${coords.left}px,${coords.top}px)`);
});