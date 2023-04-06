const surfaceJeu = document.querySelector(".surface-jeu");
const scoreElement = document.querySelector(".score");
const controles = document.querySelectorAll(".controles i");

let serpentX = 5, serpentY = 5;
let finJeu = false;
let pommeX, pommeY;
let vitesseX = 0, vitesseY = 0;
let setIntervalId;
let corpsSerpent = [];
let score = 0;

const updatePomme = () => {
    pommeX = Math.floor(Math.random() * 30) + 1;
    pommeY = Math.floor(Math.random() * 30) + 1;
}

const GameOver = () => {
    clearInterval(setIntervalId);
    alert("Fin du JEU! Appuyez sur OK pour continuer");
    location.reload();
}

const changementDirection = e => {
    if (e.key === "ArrowUp" && vitesseY != 1) {
        vitesseX = 0;
        vitesseY = -1;
    } else if (e.key === "ArrowDown" && vitesseY != -1) {
        vitesseX = 0;
        vitesseY = 1;
    } else if (e.key === "ArrowLeft" && vitesseX != 1) {
        vitesseX = -1;
        vitesseY = 0;
    } else if (e.key === "ArrowRight" && vitesseX != -1) {
        vitesseX = 1;
        vitesseY = 0;
    }
}

controles.forEach(button => button.addEventListener("click", () => changeDirection({ key: button.dataset.key })));


const initJeu = () => {
    if (finJeu) return GameOver();

    let html = `<div class="pomme" style="grid-area: ${pommeY} / ${pommeX}"></div>`;

    if (serpentX === pommeX && serpentY === pommeY) {
        updatePomme();
        corpsSerpent.push([pommeY, pommeX]);
        score++;
        scoreElement.innerText = `Score: ${score}`;
    }
    serpentX += vitesseX;
    serpentY += vitesseY;

    for (let i = corpsSerpent.length - 1; i > 0; i--) {
        corpsSerpent[i] = corpsSerpent[i - 1];
    }

    corpsSerpent[0] = [serpentX, serpentY];

    if (serpentX <= 0 || serpentX > 30 || serpentY <= 0 || serpentY > 30) {
        return finJeu = true;
    }

    for (let i = 0; i < corpsSerpent.length; i++) {
        html += `<div class="serpent" style="grid-area: ${corpsSerpent[i][1]} / ${corpsSerpent[i][0]}"></div>`;
        if (i !== 0 && corpsSerpent[0][1] === corpsSerpent[i][1] && corpsSerpent[0][0] === corpsSerpent[i][0]) {
            finJeu = true;
        }
    }
    surfaceJeu.innerHTML = html;
}

updatePomme();
setIntervalId = setInterval(initJeu, 100);
document.addEventListener("keyup", changementDirection);

