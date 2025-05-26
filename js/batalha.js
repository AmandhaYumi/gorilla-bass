let vidaGG = 100; 
const vidaMaxima = 100;
const totalBG = 100;
let limiteCura = 10;

let BG = Array(totalBG).fill(true);
let BGRestantes = totalBG;
let GGDefesa = false;
let podeAtacar = true;

const vaiAtacar = 3000; 
const spanVida = document.getElementById("vidaGG");
const spanBG = document.getElementById("BGRestantes");
const divLog = document.getElementById("log");
const divResultado = document.getElementById("resultadoFinal");
const mensagemFinal = document.getElementById("mensagemFinal");
const spanAtaques = document.getElementById("ataquesRestantes");
const barraVida = document.getElementById("barraVida");
const barraBG = document.getElementById("barraBG");