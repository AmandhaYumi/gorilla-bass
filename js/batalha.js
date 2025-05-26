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

/*Progresso*/
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
  if (spanAtaques) { 
    spanAtaques.textContent = "";  
  }
  barraVida.style.width = `${(vidaGG / vidaMaxima) * 100}%`;
  barraBG.style.width = `${(BGRestantes / totalBG) * 100}%`;
  salvarProgresso();
};

// Som de ataque
const botaoAtaque = document.getElementById("botaoSomAtaque");
const audioAtaque = document.getElementById("meuAudioAtaque");
if (botaoAtaque && audioAtaque) {
  botaoAtaque.addEventListener("click", () => {
    atacar();
    audioAtaque.currentTime = 0;
    audioAtaque.play();
  });
}

// Som de cura
const botaoCura = document.getElementById("botaoSomCura");
const audioCura = document.getElementById("meuAudioCura");
if (botaoCura && audioCura) {
  botaoCura.addEventListener("click", () => {
    curar();
    audioCura.currentTime = 0;
    audioCura.play();
  });
}

// Som de defesa
const botaoDefesa = document.getElementById("botaoSomDefesa");
const audioDefesa = document.getElementById("meuAudioDefesa");
if (botaoDefesa && audioDefesa) {
  botaoDefesa.addEventListener("click", () => {
    defender();
    audioDefesa.currentTime = 0;
    audioDefesa.play();
  });
}

// Log
const mostrarLog = (texto) => {
  const hora = new Date().toLocaleTimeString();
  const p = document.createElement("p");
  p.textContent = `[${hora}] ${texto}`;
  divLog.appendChild(p);
  divLog.scrollTop = divLog.scrollHeight;
  divLog.style.display = "block";

  setTimeout(() => {
    p.remove();
  }, 1000);
};

// Atacar 
const atacar = () => {
  if (divResultado.style.display === "block") return;

  if (!podeAtacar) {
    mostrarLog("⏳ O GG está se recuperando!");
    return;
  }

  let eliminados = 0;

  for (let i = 0; i < BG.length && eliminados < 5; i++) {
    if (BG[i]) {
      BG[i] = false;
      eliminados++;
    }
  }

  BGRestantes -= eliminados;

  mostrarLog(`🦍 O GG atacou e eliminou ${eliminados} bigodinho(s)!`);

  atualizarTela();
  fimDeJogo();

  podeAtacar = false;
  setTimeout(() => {
    podeAtacar = true;
    mostrarLog("🦍 O GG está pronto para atacar novamente!");
  }, vaiAtacar);
};

// Ataque dos BG
const ataqueBG = () => {
  if (divResultado.style.display === "block" || BGRestantes === 0) return;

  let dano = Math.floor(Math.random() * 8) + 3;

  if (GGDefesa) {
    dano = Math.floor(dano / 2);
    GGDefesa = false;
    mostrarLog("🛡️ O GG se defendeu!");
  } else {
    mostrarLog(`👥 Os bigodinhos abracadabraram e causaram ${dano} de dano no GG.`);
  }

  vidaGG -= dano;
  if (vidaGG < 0) vidaGG = 0;

  atualizarTela();
  fimDeJogo();
};

// Defesa
const defender = () => {
  if (divResultado.style.display === "block") return;

  GGDefesa = true;
  mostrarLog("🛡️ O GG se defendeu");
};

// Cura
const curar = () => {
  if (divResultado.style.display === "block") return;

  if (limiteCura <= 0) {
    mostrarLog("⚠️ O GG não pode mais curar!");
    return;
  }

  if (vidaGG < vidaMaxima) {
    vidaGG = Math.min(vidaMaxima, vidaGG + 5);
    limiteCura--;
    mostrarLog("💚 O GG ganhou +5 de vida.");
    atualizarTela();
  } else {
    mostrarLog("💚 O GG está com vida cheia.");
  }
};

// Fim
const fimDeJogo = () => {
  if (vidaGG <= 0) {
    mensagemFinal.textContent = "❌ O GG perdeu...";
    divResultado.style.display = "block";
    mostrarLog("❌ O GG perdeu...");
    localStorage.removeItem("progressoGG");
  } else if (BGRestantes <= 0) {
    mensagemFinal.textContent = "🏆 O GG venceu!";
    divResultado.style.display = "block";
    mostrarLog("🏆 O GG venceu!");
    localStorage.removeItem("progressoGG");
  }
};

const reiniciarJogo = () => {
  vidaGG = vidaMaxima;
  BG = Array(totalBG).fill(true);
  BGRestantes = totalBG;
  GGDefesa = false;
  limiteCura = 10;
  divResultado.style.display = "none";
  divLog.innerHTML = "";
  divLog.style.display = "block";
  podeAtacar = true;
  salvarProgresso();
  atualizarTela();
};

document.addEventListener("DOMContentLoaded", () => {
  carregarProgresso();
  atualizarTela();

  setInterval(ataqueBG, 2000);

  setInterval(() => {
    if (podeAtacar && BGRestantes > 0 && divResultado.style.display !== "block") {
      atacar();
    }
  }, 2000);
});
