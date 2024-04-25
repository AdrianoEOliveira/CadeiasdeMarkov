import AssetManager from "./AssetManager.js";
import Mixer from "./Mixer.js";
import inputManager from "./inputManager.js";
import Game from "./Game.js";
import CenaCarregando from "./CenaCarregando.js";
import CenaJogo from "./CenaJogo.js";
import CenaFim from "./CenaFim.js";
import Markov from "./Markov.js";


document.querySelector("form").addEventListener("submit", function(event) {
  event.preventDefault();

  let LINHAS = Number(document.getElementById("linhas").value);
  let COLUNAS = Number(document.getElementById("colunas").value);
  let modelo = document.getElementById("treino").value;
  let localizacao = document.getElementById("localizacao").value;
  let tamanhoMapa = Number(document.getElementById("tamanho").value);
  let grid = Number(document.getElementById("grid").value);
  let iteracoes = Number(document.getElementById("iteracoes").value);

  console.log(LINHAS)
  console.log(COLUNAS)
  console.log(modelo)
  console.log(localizacao)
  console.log(tamanhoMapa)
  console.log(grid)
  console.log(iteracoes)

  const assets = new AssetManager(new Mixer(10));
  assets.adicionaImagem("humano", "assets/humano.png");
  assets.adicionaImagem("terreno", "assets/terrain_atlas.png");
  assets.adicionaImagem("pedra", "assets/rock.png");
  assets.adicionaImagem("parede", "assets/brick_gray.png");
  assets.adicionaImagem("chest", "assets/Chest.png");
  assets.adicionaImagem("coin", "assets/coin.jpg");
  
  assets.adicionaImagem("treino",localizacao);
  assets.adicionaAudio("hurt", "assets/hurt.wav");


  const input = new inputManager();

  const canvas = document.querySelector("canvas");
  canvas.width = LINHAS * 32;
  canvas.height = COLUNAS * 32;
  input.configurarTeclado({
  ArrowLeft: "MOVE_ESQUERDA",
  ArrowRight: "MOVE_DIREITA",
  ArrowUp: "MOVE_CIMA",
  ArrowDown: "MOVE_BAIXO",
  Escape:"TESTE"
});

  let markov = new Markov(
    assets,
    canvas,
    LINHAS,
    COLUNAS,
    grid,
    tamanhoMapa,
    "treino",
    iteracoes,
    modelo
  );
  const cena = new CenaJogo(
    canvas,
    assets,
    input,
    markov,
    LINHAS,
    COLUNAS
  );
  const game = new Game(canvas, assets, input);

  const carregando = new CenaCarregando(canvas, assets, input, markov);

  const fim = new CenaFim(canvas, assets, input);

  game.adicionarCena("carregando", carregando);
  game.adicionarCena("teste", cena);
  game.adicionarCena("fim", fim);

  game.iniciar();


});

/*

const Linhas = 25; 
const COLUNAS = 25;

const assets = new AssetManager(new Mixer(10));
assets.adicionaImagem("humano", "assets/humano.png");
assets.adicionaImagem("terreno", "assets/terrain_atlas.png");
assets.adicionaImagem("pedra", "assets/rock.png");
assets.adicionaImagem("parede", "assets/brick_gray.png");
assets.adicionaImagem("chest", "assets/Chest.png");
assets.adicionaImagem("coin", "assets/coin.jpg");
assets.adicionaImagem("Treino25", "assets/Treino25b.bmp");
assets.adicionaImagem("Treino30", "assets/Treino30.png");
assets.adicionaImagem("TreinoCirculo", "assets/TreinoCirculo.png");
assets.adicionaImagem("xadrez", "assets/xadrez.bmp");
assets.adicionaImagem("corredor", "assets/corredores.bmp");
assets.adicionaAudio("hurt", "assets/hurt.wav");

const input = new inputManager();

const canvas = document.querySelector("canvas");
canvas.width = Linhas * 32;
canvas.height = COLUNAS * 32;
input.configurarTeclado({
  ArrowLeft: "MOVE_ESQUERDA",
  ArrowRight: "MOVE_DIREITA",
  ArrowUp: "MOVE_CIMA",
  ArrowDown: "MOVE_BAIXO",
  1: "TESTE",
  2: "C3",
  3: "C5",
  4: "C10",
  5: "T3",
  6: "T5",
  7: "T10",
});

const MarkovBasico = new Markov(
  assets,
  canvas,
  Linhas,
  COLUNAS,
  5,
  25,
  "Treino25"
);
const cenaTeste = new CenaJogo(
  canvas,
  assets,
  input,
  MarkovBasico,
  Linhas,
  COLUNAS
);


const game = new Game(canvas, assets, input);
const markovCirculo3 = new Markov(
  assets,
  canvas,
  Linhas,
  COLUNAS,
  3,
  30,
  "TreinoCirculo"
);
const cenaCirculo_3 = new CenaJogo(
  canvas,
  assets,
  input,
  markovCirculo3,
  Linhas,
  COLUNAS
);
const markovCirculo5 = new Markov(
  assets,
  canvas,
  Linhas,
  COLUNAS,
  5,
  30,
  "TreinoCirculo"
);
const cenaCirculo_5 = new CenaJogo(
  canvas,
  assets,
  input,
  markovCirculo5,
  Linhas,
  COLUNAS
);
const markovCirculo10 = new Markov(
  assets,
  canvas,
  Linhas,
  COLUNAS,
  10,
  30,
  "TreinoCirculo"
);
const cenaCirculo_10 = new CenaJogo(
  canvas,
  assets,
  input,
  markovCirculo10,
  Linhas,
  COLUNAS
);

const markovMaior3 = new Markov(
  assets,
  canvas,
  Linhas,
  COLUNAS,
  3,
  30,
  "Treino30"
);
const cenaMaior_3 = new CenaJogo(
  canvas,
  assets,
  input,
  markovMaior3,
  Linhas,
  COLUNAS
);
const markovMaior5 = new Markov(
  assets,
  canvas,
  Linhas,
  COLUNAS,
  5,
  30,
  "Treino30"
);
const cenaMaior_5 = new CenaJogo(
  canvas,
  assets,
  input,
  markovMaior5,
  Linhas,
  COLUNAS
);
const markovMaior10 = new Markov(
  assets,
  canvas,
  Linhas,
  COLUNAS,
  10,
  30,
  "Treino30"
);
const cenaMaior_10 = new CenaJogo(
  canvas,
  assets,
  input,
  markovMaior10,
  Linhas,
  COLUNAS
);
const xadrez = new Markov(
  assets,
  canvas,
  Linhas,
  COLUNAS,
  5,
  5,
  "xadrez"
);

const cenaXadrez = new CenaJogo(
  canvas,
  assets,
  input,
  xadrez,
  Linhas,
  COLUNAS
);

const corredor = new Markov(
  assets,
  canvas,
  Linhas,
  COLUNAS,
  5,
  10,
  "corredor"
);
const cenaCorredor = new CenaJogo(
  canvas,
  assets,
  input,
  corredor,
  Linhas,
  COLUNAS
);

const carregando = new CenaCarregando(canvas, assets, input, MarkovBasico);

const fim = new CenaFim(canvas, assets, input);

game.adicionarCena("carregando", carregando);
//game.adicionarCena("teste", cenaTeste);
//game.adicionarCena("teste", cenaXadrez);
game.adicionarCena("teste", cenaCorredor);
game.adicionarCena("fim", fim);

//cena1.adicionarSprite(new Sprite({x:50,y:100,w:20,h:20,vx:-10,color:"red"}));

game.iniciar();

document.addEventListener("keydown", (e) => {
  switch (e.key) {
    case " ":
      game.iniciar();
      break;
    case "Escape":
      game.parar();
      break;
    case "c":
      assets.play("boom");
      break;
  }
});
*/
