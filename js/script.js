function loadComponent(id, file) {
    fetch(file)
        .then(response => response.text())
        .then(data => {
            document.getElementById(id).innerHTML = data;
        })
        .catch(error => console.error('Error al cargar ' + file, error));
}

document.addEventListener("DOMContentLoaded", function () {
    loadComponent("header-container", "components/header.html");
    loadComponent("footer-container", "components/footer.html");
});

const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');

let catalogos = document.querySelector('.btn-1');
let operacion = document.querySelector('.btn-2');
let consultas = document.querySelector('.btn-3');
let calidad = document.querySelector('.btn-4');
let backTo = document.querySelector('.menu');

const originalStyles = {
    catalogos: { top: '5%', left: '-35%', text: 'CATÁLOGOS' },
    operacion: { top: '30%', left: '-10%', text: 'OPERACIÓN' },
    consultas: { top: '55%', left: '-10%', text: 'CONSULTAS' },
    calidad: { top: '82%', left: '-35%', text: 'CALIDAD' }
};

const ptransparentes = {
    p1: { top: '20%', left: '-140%' },
    p2: { top: '45%', left: '-115%' },
    p3: { top: '70%', left: '-140%' }
};

const botones = {
    catalogos: { icon: '<i class="fa-solid fa-book"></i>' },
    operacion: { icon: '<i class="fa-solid fa-briefcase"></i>' },
    consultas: { icon: '<i class="fa-solid fa-magnifying-glass"></i>' },
    calidad: { icon: '<i class="fa-solid fa-award"></i>' }
};

const buttons = document.querySelectorAll('.btn-custom');

buttons.forEach(button => {
    button.addEventListener('click', function() {
        // Eliminar la clase 'pressed' de todos los botones
        buttons.forEach(b => b.classList.remove('pressed'));

        // Añadir la clase 'pressed' al botón que fue clicado
        this.classList.add('pressed');
    });
});

document.querySelectorAll('#catalogos, #operacion, #consultas, #calidad').forEach(boton => {
    boton.addEventListener('click', () => {

        backTo.style.display = 'block';
    
        if (window.matchMedia("(min-width: 45em)").matches && window.matchMedia("(min-height: 25em)").matches) {

            // Si el botón no estaba transparente, hacer transparentes los demás
            Object.keys(botones).forEach(id => {
                let elemento = document.getElementById(id);
                if (boton.id !== id) {
                    // Hacer transparente el resto de los botones
                    elemento.classList.add('transparente');
                    elemento.innerHTML = botones[id].icon;  // Solo el icono, sin texto
                    elemento.setAttribute('data-tooltip', originalStyles[id].text);

                    // Mover los botones transparentes a las nuevas posiciones
                    if (id === 'catalogos') {
                        elemento.style.top = ptransparentes.p1.top;
                        elemento.style.left = ptransparentes.p1.left;
                    } else if (id === 'operacion') {
                        if (boton.id == 'catalogos'){
                            elemento.style.top = ptransparentes.p1.top;
                            elemento.style.left = ptransparentes.p1.left;
                        }else{
                            elemento.style.top = ptransparentes.p2.top;
                            elemento.style.left = ptransparentes.p2.left; 
                        }
                    } else if (id === 'consultas') {
                        if (boton.id != 'calidad'){
                            elemento.style.top = ptransparentes.p2.top;
                            elemento.style.left = ptransparentes.p2.left;
                        }else{
                            elemento.style.top = ptransparentes.p3.top;
                            elemento.style.left = ptransparentes.p3.left; 
                        }
                    } else if (id === 'calidad') {
                        elemento.style.top = ptransparentes.p3.top;
                        elemento.style.left = ptransparentes.p3.left;
                    }
                }
            });

            if (boton.classList.contains('transparente')) {
                boton.classList.remove('transparente');
                boton.style.top = originalStyles[boton.id].top;
                boton.style.left = originalStyles[boton.id].left;
                boton.innerHTML = botones[boton.id].icon + " " + originalStyles[boton.id].text;
                boton.removeAttribute('title');
            }
        } else {
            document.querySelectorAll('.btn-1, .btn-2, .btn-3, .btn-4').forEach(b => {
                if (b !== boton) {
                    let x = b.id;
                    alert = (x)
                    document.getElementById(x).style.display = 'none';
                    document.getElementById(x).style.alignSelf = 'start';
                }
            });
        }

        showHidden(boton.id);

        window.addEventListener('resize', () => {
            if (window.matchMedia("(max-width: 45em)").matches || window.matchMedia("(max-height: 25em)").matches ) {
                originalButton();
                hideHidden();
            }
        });
        

    });
});

document.querySelectorAll('.menu').forEach(button => {
    button.addEventListener('click', () => {
        originalButton();
        rotateCircles();
        hideHidden();
        backTo.style.display = 'none';
        boton.removeAttribute('title');
    });
});


function originalButton (){
    document.querySelectorAll('#catalogos, #operacion, #consultas, #calidad').forEach(boton => {
        boton.style.display = 'block'
        boton.classList.remove('pressed');
        if (boton.classList.contains('transparente')) {
            boton.classList.remove('transparente');
            boton.style.top = originalStyles[boton.id].top;
            boton.style.left = originalStyles[boton.id].left;
            boton.innerHTML = botones[boton.id].icon + " " + originalStyles[boton.id].text;
            boton.removeAttribute('title');
        }
    });
}

function showHidden(boton){
    const submenus = document.querySelectorAll('.submenu > .smenu'); 

    submenus.forEach(botonElemento => {
        botonElemento.style.display = 'none';
    });
    document.querySelector('.submenu').style.display = 'block';

    document.querySelector('.' + boton).style.display = 'flex';
}

function hideHidden(){
    const submenus = document.querySelectorAll('.submenu > .smenu'); 
    submenus.forEach(botonElemento => {
        botonElemento.style.display = 'none';
    });
}

let rotationState1 = 0;
let rotationState2 = 0;
let rotationState3 = 0;

function rotateCircles() {
    
    const direction1 = Math.random() < 0.5 ? 1 : -1;
    const direction2 = Math.random() < 0.5 ? 1 : -1; 
    const direction3 = Math.random() < 0.5 ? 1 : -1; 

    rotationState1 += 110 * direction1;
    rotationState2 += 105 * direction2; 
    rotationState3 += 100 * direction3; 

    document.querySelector('.circle-1').style.transform = `rotate(${rotationState1}deg)`;
    document.querySelector('.circle-2').style.transform = `rotate(${rotationState2}deg)`;
    document.querySelector('.circle-3').style.transform = `rotate(${rotationState3}deg)`;
}
