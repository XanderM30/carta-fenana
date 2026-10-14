
const inicio = document.getElementById("inicio");
const sobre = document.getElementById("abrirCarta");
const historia = document.getElementById("historia");

const cancion = document.getElementById("cancion");
const botonMusica = document.getElementById("botonMusica");
const iconoMusica = document.getElementById("iconoMusica");
const textoMusica = document.getElementById("textoMusica");
const volumen = document.getElementById("volumen");
const estadoMusica = document.getElementById("estadoMusica");

const respuestaSi = document.getElementById("respuestaSi");
const respuestaHablar = document.getElementById("respuestaHablar");
const respuestaFinal = document.getElementById("respuestaFinal");
const respuestaTitulo = document.getElementById("respuestaTitulo");
const respuestaDetalle = document.getElementById("respuestaDetalle");


const irPregunta = document.getElementById("irPregunta");
const pantallaPregunta = document.getElementById("pantallaPregunta");

let cartaAbierta = false;

// Abrir la carta una sola vez.
sobre.addEventListener("click", async () => {
  if (cartaAbierta) return;

  cartaAbierta = true;
  sobre.classList.add("abierto");
  sobre.setAttribute("aria-expanded", "true");

  inicio.classList.add("desaparecer");
  inicio.hidden = true;

  historia.hidden = false;

  window.scrollTo({ top: 0, behavior: "smooth" });

  // El audio comienza a partir de la interacción de la persona.
  cancion.volume = Number(volumen.value);

  try {
    await cancion.play();
    actualizarReproductor(true);
    estadoMusica.textContent = "Reproduciendo: Salvemos esto — Latin Mafia";
  } catch (error) {
    actualizarReproductor(false);
    estadoMusica.textContent =
      "Toca «Reproducir canción» para escuchar nuestra canción.";
  }
});

// Actualizar el botón de música.
function actualizarReproductor(reproduciendo) {
  botonMusica.setAttribute("aria-pressed", String(reproduciendo));
  iconoMusica.textContent = reproduciendo ? "Ⅱ" : "♫";
  textoMusica.textContent = reproduciendo
    ? "Pausar canción"
    : "Reproducir canción";
}

botonMusica.addEventListener("click", async () => {
  if (cancion.paused) {
    try {
      await cancion.play();
      actualizarReproductor(true);
      estadoMusica.textContent =
        "Reproduciendo: Salvemos esto — Latin Mafia";
    } catch (error) {
      actualizarReproductor(false);
      estadoMusica.textContent =
        "No se pudo reproducir el audio. Comprueba que el archivo exista.";
    }
  } else {
    cancion.pause();
    actualizarReproductor(false);
    estadoMusica.textContent = "Canción en pausa.";
  }
});

// Control de volumen.
volumen.addEventListener("input", () => {
  cancion.volume = Number(volumen.value);
});

// Mantener el botón sincronizado si el audio se detiene.
cancion.addEventListener("pause", () => actualizarReproductor(false));
cancion.addEventListener("play", () => actualizarReproductor(true));

cancion.addEventListener("error", () => {
  estadoMusica.textContent =
    "No se encontró la canción. Revisa assets/audio/Latin_Mafia_-_Salvemos_Esto.mp3.";
});

// Respuesta afirmativa.
respuestaSi.addEventListener("click", () => {
  respuestaTitulo.textContent = "Entonces, escribamos este capítulo juntos 💗";
  respuestaDetalle.textContent =
    "Gracias por darme esta oportunidad. Quiero que lo nuestro siga creciendo, " +
    "que nos cuidemos y que construyamos algo bonito, a nuestra manera y a nuestro tiempo.";
    "Dame un beso si dices que sí, y vamos a escribir nuestra historia juntos. 💌";

  mostrarRespuesta();
});

// Una alternativa para que ella pueda expresar lo que siente.
respuestaHablar.addEventListener("click", () => {
  respuestaTitulo.textContent = "Te escucho, mi niña 💌";
  respuestaDetalle.textContent =
    "Quiero saber lo que sientes de verdad. No tienes que responder por compromiso; " +
    "para mí también importa que podamos hablar con sinceridad.";
  
  mostrarRespuesta();
});

function mostrarRespuesta() {
  respuestaFinal.hidden = false;
  respuestaFinal.scrollIntoView({
    behavior: "smooth",
    block: "center"
  });
}

// Crear partículas decorativas.
const particulas = document.querySelector(".particulas");

for (let i = 0; i < 32; i++) {
  const particula = document.createElement("span");

  particula.className = "particula";
  particula.style.left = `${Math.random() * 100}%`;
  particula.style.animationDuration = `${7 + Math.random() * 10}s`;
  particula.style.animationDelay = `${Math.random() * -15}s`;

  particulas.appendChild(particula);
}

irPregunta.addEventListener("click", () => {
    historia.hidden = true;
    pantallaPregunta.hidden = false;

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});
