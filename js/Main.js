import AssetManager from "./AssetManager.js";
import Mixer from "./Mixer.js";
import inputManager from "./inputManager.js";
import Game from "./Game.js";
import CenaCarregando from "./CenaCarregando.js";
import CenaJogo from "./CenaJogo.js";
import CenaFim from "./CenaFim.js";
import Markov from "./Markov.js";

const assets = new AssetManager(new Mixer(10));
assets.adicionaImagem("humano", "assets/humano.png");
assets.adicionaImagem("terreno", "assets/terrain_atlas.png");
assets.adicionaImagem("pedra", "assets/rock.png");
assets.adicionaImagem("parede", "assets/brick_gray.png");
assets.adicionaImagem("chest", "assets/Chest.png");
assets.adicionaImagem("coin", "assets/coin.jpg");

assets.adicionaAudio("hurt", "assets/hurt.wav");
const canvas = document.querySelector("canvas");


const input = new inputManager();

input.configurarTeclado({
  ArrowLeft: "MOVE_ESQUERDA",
  ArrowRight: "MOVE_DIREITA",
  ArrowUp: "MOVE_CIMA",
  ArrowDown: "MOVE_BAIXO",
  Escape:"TESTE"
});

document.entrada.iniciar.addEventListener("click", function(event) {
  let LINHAS = document.entrada.linhas.valueAsNumber;
  let COLUNAS = Number(document.getElementById("colunas").value);
  let modelo = document.getElementById("treino").value;

  canvas.width = COLUNAS * 32;
  canvas.height = LINHAS * 32;

  console.log(LINHAS)
  console.log(COLUNAS)
  console.log(modelo)
  console.log(localizacao)
  console.log(tamanhoMapa)
  console.log(grid)
  console.log(iteracoes)

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


document.entrada.addEventListener("submit", function(event) {
  event.preventDefault();

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


  assets.adicionaImagem("treino",localizacao);

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

