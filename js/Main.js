import AssetManager from "./AssetManager.js";
import Mixer from "./Mixer.js";
import inputManager from "./inputManager.js";
import Mapa from "./Mapa.js";
import Game from "./Game.js";
import CenaCarregando from "./CenaCarregando.js";
import CenaJogo from "./CenaJogo.js";
import CenaFim from "./CenaFim.js";
import Markov from "./Markov.js";

const Piso = 0;
const Pedra = 1;
const Parede = 2;
const Bau =3;


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
canvasMarkov.setAttribute("hidden", "hidden");

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

let LINHAS = document.inicial.linhas.valueAsNumber;
let COLUNAS = document.inicial.colunas.valueAsNumber
let modelo = document.inicial.modelo.value;
let localizacao = document.mapaTreinamento.localizacao.value;
let tamanhoMapa = 0;
let grid = document.metodo.grid.valueAsNumber;
let metodo = document.metodo.highOrLow.value;
let iteracoes = document.teste.iteracoes.valueAsNumber;
let newTiles = document.teste.newTiles.value

let canvasVisual= document.getElementById("canvasVisual");
canvasVisual.width = 0;
canvasVisual.height = 0;

let canvasTreinamento= document.getElementById("canvasTreinamento");
canvasTreinamento.width = 0;
canvasTreinamento.height = 0;


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
  newTiles,
  metodo
);


let cena = new CenaJogo(canvas,assets,input,markov);

let carregando = new CenaCarregando(canvas, assets, input, markov);

let game = new Game(canvas, assets, input);

let fim = new CenaFim(canvas, assets, input);


game.adicionarCena("carregando", carregando);
game.adicionarCena("teste", cena);
game.adicionarCena("fim", fim);


game.iniciar();

let zoomSlider = document.getElementById("zoom");
let zoomOutput = document.getElementById("zoomValue");
//slider.hidden = true;
//zz.hidden = true;
zoomOutput.innerHTML = zoomSlider.value; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
zoomSlider.oninput = function() {
  zoomOutput.innerHTML = this.value;
  console.log(zoomSlider.value)
  cena.zoom(zoomSlider.value/100)
}

function aleatorioMapa(markov,LINHAS,COLUNAS) {

  markov.tiles = [];
  for (let l = 0; l < LINHAS; l++) {
    markov.tiles[l] = [];
    for (let c = 0; c < COLUNAS; c++) {
      //mapa.tiles[l][c] = Math.floor(Math.random() * 4)
      markov.tiles[l][c] = Piso;
    }
  }
  for (let l = 0; l < LINHAS; l++) {
    for (let c = 0; c < COLUNAS; c++) {
      if (l == 1 || l == LINHAS - 2 || c == 1 || c == COLUNAS - 2) {
        markov.tiles[l][c] = Parede;
        continue;
      }

      if (l == 0 || l == LINHAS - 1 || c == 0 || c == COLUNAS - 1) {
        markov.tiles[l][c] = Pedra;
        continue;
      }

      if (Math.random() < 0.1) {
        markov.tiles[l][c] = Parede;
      }
    }
  }
  console.log(markov.tiles)
}

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
        let celula = linha.insertCell();
        // Verifica se a chave existe antes de acessá-la
        if(chave == "vizinho")
        {
          //console.log(item[chave])
          var canvasTabela = document.createElement('canvas');
          canvasTabela.width = 3*32;
          canvasTabela.height = 3*32;
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

          
          const imageData = ctx.getImageData(0, 0, canvasTabela.width, canvasTabela.height);

          const tempCanvas = document.createElement('canvas');
          const tempCtx = tempCanvas.getContext('2d');
          tempCanvas.width = imageData.width;
          tempCanvas.height = imageData.height;
          tempCtx.putImageData(imageData, 0, 0);

          const newWidth = 50; // Nova largura desejada
          const newHeight = 50; // Nova altura desejada
        
          canvasTabela.width = newWidth;
          canvasTabela.height = newHeight;
      
        ctx.imageSmoothingEnabled = false; // Desabilitar suavização de imagem para preservar a nitidez
        ctx.drawImage(tempCanvas, 0, 0, tempCanvas.width, tempCanvas.height, 0, 0, newWidth, newHeight);

          celula.appendChild(canvasTabela);
        }
        else
        {
          /*
          var canvasTabela = document.createElement('canvas');
          canvasTabela.width = 200;
          canvasTabela.height = 100;
          var ctx = canvasTabela.getContext('2d');
          var textoNumero = item[chave].toString();
          var larguraTexto = ctx.measureText(textoNumero).width;
          var x = (canvasTabela.width - larguraTexto) / 2;
          var y = canvasTabela.height / 2;
          ctx.fillText(textoNumero, x, y);
          //celula.appendChild(textoNumero);
          */
          celula.textContent = item[chave] !== undefined ? item[chave] : 'vv';
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

function redimensionarImagem(img , canvas , taxa)
{

  canvas.width = tamanhoMapa;
  canvas.height = tamanhoMapa;

    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    const newWidth = (tamanhoMapa * 20) /taxa; // Nova largura desejada
    const newHeight = (tamanhoMapa * 20)/ taxa; // Nova altura desejada
  
    canvas.width = newWidth;
    canvas.height = newHeight;

    ctx.imageSmoothingEnabled = false;

    ctx.putImageData(imageData, 0, 0);
    ctx.drawImage(canvas, 0, 0, imageData.width, imageData.height, 0, 0, newWidth, newHeight);

}

function contornarImagem(canvas,taxa)
{
  const ctx = canvas.getContext('2d');
  ctx.strokeStyle = "blue"

  for (let l = 0; l < tamanhoMapa; l++) {
    for (let c = 0; c < tamanhoMapa; c++) {
    
      ctx.strokeRect(
        (c * 20) /taxa,
        l * 20 /taxa,
        20 /taxa,
        20 /taxa
      );
    }
  }

  ctx.strokeStyle = "red"
  ctx.lineWidth = 2; // Largura da linha do contorno

  let tamanhoGrid = tamanhoMapa / grid;
  tamanhoGrid = Math.floor(tamanhoGrid);
    for (let gridI = 0; gridI < tamanhoGrid; gridI++) {
      for (let gridJ = 0; gridJ < tamanhoGrid; gridJ++) {

        ctx.strokeRect(
          gridI * grid * 20/taxa,
          gridJ * grid * 20 /taxa,
          20 *grid /taxa,
          20 *grid /taxa
        );
      }
  }
}


document.inicial.iniciar.addEventListener("click", function(event) {

  LINHAS = document.inicial.linhas.valueAsNumber;
  COLUNAS = document.inicial.colunas.valueAsNumber
  modelo = document.inicial.modelo.value;
  if(modelo=="aleatorio")
  {
    aleatorioMapa(markov,LINHAS,COLUNAS)
  }

  canvas.width = COLUNAS * 32;
  canvas.height = LINHAS * 32;
  markov.LINHAS = LINHAS;
  markov.COLUNAS = COLUNAS;
  markov.modelo = modelo;
  markov.iteracoes = 0;

  cena.LINHAS = LINHAS;
  cena.COLUNAS = COLUNAS;
  cena.Markov = markov;

  game.adicionarCena("teste", cena);
  game.selecionaCena("teste");

});


document.mapaTreinamento.adicionar.addEventListener("click", function(event) {
  
  localizacao = document.mapaTreinamento.localizacao.value;
  //tamanhoMapa = document.mapaTreinamento.tamanho.valueAsNumber;

  assets.adicionaImagem("treino",localizacao);
  game.selecionaCena("carregando")

  cena.Markov = markov

  game.adicionarCena("teste", cena);

  const img = new Image();
  img.src = localizacao;
  img.onload = function(){
    tamanhoMapa =  img.naturalWidth;
    markov.TAMANHOIMAGEM = tamanhoMapa
    redimensionarImagem(img,canvasVisual ,tamanhoMapa/9);
  }
}
);

document.metodo.treinar.addEventListener("click", function(event) {

  metodo = document.metodo.highOrLow.value;
  grid = document.metodo.grid.valueAsNumber;
  
  markov.GRID = grid;
  markov.metodo = metodo

  cena.Markov = markov

  game.adicionarCena("teste", cena);

  let img = new Image();
  img = assets.Img("treino");

  redimensionarImagem(img,canvasTreinamento,tamanhoMapa/9);

  contornarImagem(canvasTreinamento,tamanhoMapa/9);
  
  });

document.tabelas.tabela.addEventListener("click", function(event) {


cena.markov.zeraTabela();
limparTabela()
//cena.treinarMarkov();
let dados = cena.markov.getTabelaDados()
console.log(dados)
for (let i = 0 ; i< dados.length; i++)
{
  criarTabela(dados[i]);
}
});

document.tabelas.limpar.addEventListener("click", function(event) {

  limparTabela()

  });

document.teste.gerar.addEventListener("click", function(event) {

  //game.selecionaCena("carregando")

  iteracoes = document.teste.iteracoes.valueAsNumber;
  newTiles = document.teste.newTiles.value
  markov.iteracoes = iteracoes;
  markov.newTiles = newTiles
  cena.markov = markov

  game.adicionarCena("teste", cena);

  cena.treinarMarkov();
  

  game.selecionaCena("teste");


});



