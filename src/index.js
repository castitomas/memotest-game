let turnos = 0;
let $primerCuadro = null;
const $tablero = document.querySelector('#tablero');
const $cuadros = $tablero.querySelectorAll('.cuadro');
const $mensajeFinJuego = document.querySelector('#fin-juego');

//configurarJuego le asigna un color al azar a cada cuadro

function configurarJuego() {
  const coloresBase = ['rojo', 'azul', 'verde', 'amarillo', 'negro', 'blanco'];
  const coloresRepetidos = coloresBase.concat(coloresBase);
  configurarCuadros($cuadros, coloresRepetidos);
  manejarEventos($tablero);
}


// manejarEventos se asegura de que se clickee sobre el target, que es el que contiene la clase .cuadro

function manejarEventos($tablero) {
  $tablero.onclick = function(e) {
    const $elemento = e.target;
    if ($elemento.classList.contains('cuadro')) {
      manejarClickCuadro($elemento);
    }
  };
}

// Se randomizan los colores para los cuadros

function configurarCuadros($cuadros, colores) {
  const coloresRandom = colores.sort(function() {
    return 0.5 - Math.random();
  });

  coloresRandom.forEach(function(color, i) {
    $cuadros[i].classList.add(color);
  });
}


function manejarClickCuadro($cuadroActual) {
  mostrarCuadro($cuadroActual);

  if ($primerCuadro === null) {
    $primerCuadro = $cuadroActual; //Esto es para que si se clickea el mismo cuadro dos veces, no suceda nada
  } else {

    if ($primerCuadro === $cuadroActual) {
      return;
    }

    turnos++;

    if (cuadrosSonIguales($primerCuadro, $cuadroActual)) {
      eliminarCuadro($primerCuadro);
      eliminarCuadro($cuadroActual);
    } else {
      ocultarCuadro($primerCuadro);
      ocultarCuadro($cuadroActual);
    }
    $primerCuadro = null;
  }
}

// Se compara ambos cuadros, si son iguales retorna true, de caso contrario retorna false

function cuadrosSonIguales($cuadro1, $cuadro2) {
  return $cuadro1.className === $cuadro2.className;
}

//Cambia la opacidad del cuadro de 0 a 1

function mostrarCuadro($cuadro) {
  $cuadro.style.opacity = '1';
}

//Oculta el cuadro cambiando la opacidad de 1 a 0

function ocultarCuadro($cuadro) {
  setTimeout(function() {
    $cuadro.style.opacity = '0';
  }, 500);

}

//Agrega el estilo .completo que contiene el fondo gris oscuro, y remueve el color asignado mas arriba

function eliminarCuadro($cuadro) {
  setTimeout(function() {
    $cuadro.parentElement.classList.add('completo');
    $cuadro.remove();
    evaluarFinDeJuego();
  }, 500);
}

// Se fija cuantos cuadros quedan, si es igual que cero, el juego termina y aparece la pantalla de #fin-juego

function evaluarFinDeJuego() {
  if (document.querySelectorAll('.cuadro').length === 0) {
    $tablero.style.display = 'none';
    $mensajeFinJuego.querySelector('strong').textContent = turnos.toString();
    $mensajeFinJuego.style.display = 'block';
  }
}

configurarJuego();