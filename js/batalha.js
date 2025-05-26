/*Variáveis e DOM*/
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

/*Progesso*/
const salvarProgresso = () => {
  const progresso = {
    vidaGG,
    BGRestantes,
    BG,
    limiteCura
  };
  localStorage.setItem("progressoGG", JSON.stringify(progresso));
};

const carregarProgresso = () => {
  const progressoSalvo = localStorage.getItem("progressoGG");
  if (progressoSalvo) {
    const progresso = JSON.parse(progressoSalvo);
    vidaGG = progresso.vidaGG;
    BGRestantes = progresso.BGRestantes;
    BG = progresso.BG;
    limiteCura = progresso.limiteCura;
  }
};

const atualizarTela = () => {
  spanVida.textContent = vidaGG;
  spanBG.textContent = BGRestantes;
  if(spanAtaques) { 
    spanAtaques.textContent = "";  
  }
  barraVida.style.width = `${(vidaGG / vidaMaxima) * 100}%`;
  barraBG.style.width = `${(BGRestantes / totalBG) * 100}%`;
  salvarProgresso();
};

// Som de ataque
  const botaoAtaque = document.getElementById("botaoSomAtaque");
  const audioAtaque = document.getElementById("meuAudioAtaque");
  if(botaoAtaque && audioAtaque) {
    botaoAtaque.addEventListener("click", () => {
      atacar();
      audioAtaque.currentTime = 0;
      audioAtaque.play();
    });
  }

  // Som de cura
  const botaoCura = document.getElementById("botaoSomCura");
  const audioCura = document.getElementById("meuAudioCura");
  if(botaoCura && audioCura) {
    botaoCura.addEventListener("click", () => {
      curar();
      audioCura.currentTime = 0;
      audioCura.play();
    });
  }

  // Som de defesa
  const botaoDefesa = document.getElementById("botaoSomDefesa");
  const audioDefesa = document.getElementById("meuAudioDefesa");
  if(botaoDefesa && audioDefesa) {
    botaoDefesa.addEventListener("click", () => {
      defender();
      audioDefesa.currentTime = 0;
      audioDefesa.play();
    });
  }