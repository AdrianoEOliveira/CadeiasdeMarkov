import AssetManager from "./AssetManager.js";
import Mixer from "./Mixer.js";
import inputManager from "./inputManager.js";
import Mapa from "./Mapa.js";
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
let canvas = document.getElementById("canvas")

let canvasMarkov = document.getElementById("canvasMarkov")
//canvasMarkov.setAttribute("hidden", "hidden");

canvas.width = 10 * 32;
canvas.height = 10 * 32;

canvasMarkov.width = 50;
canvasMarkov.height = 50;


const input = new inputManager();

input.configurarTeclado({
  ArrowLeft: "MOVE_ESQUERDA",
  ArrowRight: "MOVE_DIREITA",
  ArrowUp: "MOVE_CIMA",
  ArrowDown: "MOVE_BAIXO",
  Escape:"TESTE"
});

let LINHAS = document.entrada.linhas.valueAsNumber;
let COLUNAS = document.entrada.colunas.valueAsNumber
let modelo = document.entrada.modelo.value;
let localizacao = document.entrada.localizacao.value;
let tamanhoMapa = document.entrada.tamanho.valueAsNumber;
let grid = document.entrada.grid.valueAsNumber;
let iteracoes = document.entrada.iteracoes.valueAsNumber;
let newTiles = document.entrada.newTiles.value


let  markov = new Markov(
  assets,
  canvasMarkov,
  LINHAS,
  COLUNAS,
  grid,
  tamanhoMapa,
  "treino",
  0,
  modelo,
  newTiles
);


let cena = new CenaJogo(canvas,assets,input,markov);

let carregando = new CenaCarregando(canvas, assets, input, markov);

let game = new Game(canvas, assets, input);

let fim = new CenaFim(canvas, assets, input);


game.adicionarCena("carregando", carregando);
game.adicionarCena("teste", cena);
game.adicionarCena("fim", fim);


game.iniciar();

// Dados da tabela (exemplo)

// Função para criar a tabela
function criarTabela(dados) {
  // Criando a tabela e o cabeçalho
  let tabela = document.createElement('table');
  let cabecalho = tabela.createTHead();
  let linhaCabecalho = cabecalho.insertRow();

  // Adicionando os cabeçalhos das colunas
  for (let chave in dados[0]) {
      let th = document.createElement('th');
      th.textContent = chave.charAt(0).toUpperCase() + chave.slice(1); // Primeira letra maiúscula
      linhaCabecalho.appendChild(th);
  }

  // Adicionando os dados
  let corpoTabela = tabela.createTBody();
  dados.forEach(item => {
    let linha = corpoTabela.insertRow();
    for (let chave in item) {
      console.log(chave);
        let celula = linha.insertCell();
        // Verifica se a chave existe antes de acessá-la
        if(chave == "vizinho")
        {
          //console.log(item[chave])
          var canvasTabela = document.createElement('canvas');
          canvasTabela.width = 100;
          canvasTabela.height = 100;
          var ctx = canvasTabela.getContext('2d');
          let mapaTabela = new Mapa(3, 3, 32);
          mapaTabela.tiles = item[chave];
          //console.log(mapaTabela)
          let cenaAux = new CenaJogo(
            canvasTabela,
            assets,
            input,
            markov,
            3,
            3
          );
          cenaAux.configuraMapa(mapaTabela)
          mapaTabela.desenhar(ctx);
          celula.appendChild(canvasTabela);
        }
        else
        {
          var canvasTabela = document.createElement('canvas');
          canvasTabela.width = 200;
          canvasTabela.height = 100;
          var ctx = canvasTabela.getContext('2d');
          ctx.font = "15px Arial";
          var textoNumero = item[chave].toString();
          var larguraTexto = ctx.measureText(textoNumero).width;
          var x = (canvasTabela.width - larguraTexto) / 2;
          var y = canvasTabela.height / 2;
          ctx.fillText(textoNumero, x, y);
          celula.appendChild(canvasTabela);
        //celula.textContent = item[chave] !== undefined ? item[chave] : 'vv';
        }
    }
});

  // Adicionando a tabela ao container
  document.getElementById('tabela-container').appendChild(tabela);

}

function limparTabela() {
  // Define o innerHTML do elemento da tabela como uma string vazia
  document.getElementById('tabela-container').innerHTML = '';
}

// Chamando a função para criar a tabela com os dados fornecidos


document.entrada.iniciar.addEventListener("click", function(event) {

  LINHAS = document.entrada.linhas.valueAsNumber;
  COLUNAS = document.entrada.colunas.valueAsNumber
  modelo = document.entrada.modelo.value;

  canvas.width = COLUNAS * 32;
  canvas.height = LINHAS * 32;
  markov.LINHAS = LINHAS;
  markov.COLUNAS = COLUNAS;
  markov.modelo = modelo;
  markov.iteracoes = 0;

  cena = new CenaJogo(
    canvas,
    assets,
    input,
    markov,
    LINHAS,
    COLUNAS
  );

  game.adicionarCena("teste", cena);
  game.selecionaCena("teste");

});


document.entrada.treinamento.addEventListener("click", function(event) {
  
  localizacao = document.entrada.localizacao.value;
  tamanhoMapa = document.entrada.tamanho.valueAsNumber;
  grid = document.entrada.grid.valueAsNumber;

  assets.adicionaImagem("treino",localizacao);
  game.selecionaCena("carregando")

  markov.GRID = grid;
  markov.TAMANHOIMAGEM = tamanhoMapa
  cena = new CenaJogo(
    canvas,
    assets,
    input,
    markov,
    LINHAS,
    COLUNAS
  );

  game.adicionarCena("teste", cena);

});

document.entrada.tabela.addEventListener("click", function(event) {


cena.markov.zeraTabela();
cena.treinarMarkov();
criarTabela(cena.markov.getTabelaDados());

});

document.entrada.limpar.addEventListener("click", function(event) {

  limparTabela()

  });

document.entrada.gerar.addEventListener("click", function(event) {

  game.selecionaCena("carregando")

  iteracoes = document.entrada.iteracoes.valueAsNumber;
  newTiles = document.entrada.newTiles.value
  markov.iteracoes = iteracoes;
  markov.newTiles = newTiles
  cena = new CenaJogo(
    canvas,
    assets,
    input,
    markov,
    LINHAS,
    COLUNAS
  );

  game.adicionarCena("teste", cena);

  cena.treinarMarkov();
  

  cena.treinarMarkov();

  game.selecionaCena("teste");


});


