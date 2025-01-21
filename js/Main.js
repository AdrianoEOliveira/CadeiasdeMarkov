import AssetManager from "./AssetManager.js";
import Mixer from "./Mixer.js";
import inputManager from "./inputManager.js";
import Mapa from "./Mapa.js";
import Game from "./Game.js";
import CenaCarregando from "./CenaCarregando.js";
import CenaJogo from "./CenaJogo.js";
import CenaFim from "./CenaFim.js";
import LowMarkov from "./Markov.js";
import HighMarkov from "./MultiDimensionalMarkov.js";
import HierarquicoMarkov from "./HierarquicoMarkov.js";
import Markov from "./CompartilhadoMarkov.js";

const Piso = 0;
const Pedra = 1;
const Parede = 2;
const Bau = 3;

let myrng = new Math.seedrandom(document.teste.seed.value);

const assets = new AssetManager(new Mixer(10));
assets.adicionaImagem("humano", "assets/humano.png");
assets.adicionaImagem("terreno", "assets/terrain_atlas.png");
assets.adicionaImagem("pedra", "assets/rock.png");
assets.adicionaImagem("parede", "assets/brick_gray.png");
assets.adicionaImagem("chest", "assets/Chest.png");
assets.adicionaImagem("coin", "assets/coin.jpg");
assets.adicionaImagem("enemy", "assets/enemy.png");

assets.adicionaAudio("hurt", "assets/hurt.wav");
let canvas = document.getElementById("canvas");

let canvasMarkov = document.getElementById("canvasMarkov");
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
  Escape: "TESTE",
});

let LINHAS = document.inicial.linhas.valueAsNumber;
let COLUNAS = document.inicial.colunas.valueAsNumber;
let modelo = document.inicial.modelo.value;
let localizacao = document.mapaTreinamento.localizacao.value;
let tamanhoMapa = 0;
let grid = document.metodo.grid.valueAsNumber;
let metodo = document.metodo.highOrLow.value;
let iteracoes = document.teste.iteracoes.valueAsNumber;
let newTiles = document.teste.newTiles.value;

let canvasVisual = document.getElementById("canvasVisual");
canvasVisual.width = 0;
canvasVisual.height = 0;

let canvasTreinamento = document.getElementById("canvasTreinamento");
canvasTreinamento.width = 0;
canvasTreinamento.height = 0;

let markov = new Markov(
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

let hierarquico = new HierarquicoMarkov(
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
let lowmarkov = new LowMarkov(
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
let highMarkov = new HighMarkov(
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

let cena = new CenaJogo(canvas, assets, input, markov);

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
zoomSlider.oninput = function () {
  zoomOutput.innerHTML = this.value;
  console.log(zoomSlider.value);
  cena.Zoom(zoomSlider.value / 100);
};

let corteSlider = document.getElementById("corte");
let corteOutput = document.getElementById("corteValue");
//slider.hidden = true;
//zz.hidden = true;
corteOutput.innerHTML = corteSlider.value; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
corteSlider.oninput = function () {
  corteOutput.innerHTML = this.value;
  console.log(corteSlider.value);
  hierarquico.atualizaCorte(corteSlider.value / 100);
};

function aleatorioMapa(markov, LINHAS, COLUNAS) {
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
  console.log(markov.tiles);
}

// Dados da tabela (exemplo)

// Função para criar a tabela
function criarTabela(dados) {
  // Criando a tabela e o cabeçalho
  let tabela = document.createElement("table");
  let cabecalho = tabela.createTHead();
  let linhaCabecalho = cabecalho.insertRow();

  // Adicionando os cabeçalhos das colunas
  for (let chave in dados[0]) {
    let th = document.createElement("th");
    th.textContent = chave.charAt(0).toUpperCase() + chave.slice(1); // Primeira letra maiúscula
    linhaCabecalho.appendChild(th);
  }

  // Adicionando os dados
  let corpoTabela = tabela.createTBody();
  dados.forEach((item) => {
    let linha = corpoTabela.insertRow();
    for (let chave in item) {
      let celula = linha.insertCell();
      // Verifica se a chave existe antes de acessá-la
      if (chave == "vizinho") {
        //console.log(item[chave])
        var canvasTabela = document.createElement("canvas");
        canvasTabela.width = 3 * 32;
        canvasTabela.height = 3 * 32;
        var ctx = canvasTabela.getContext("2d");
        let mapaTabela = new Mapa(3, 3, 32);
        mapaTabela.tiles = item[chave];
        //console.log(mapaTabela)
        let cenaAux = new CenaJogo(canvasTabela, assets, input, markov, 3, 3);
        cenaAux.configuraMapa(mapaTabela);
        mapaTabela.desenhar(ctx);

        const imageData = ctx.getImageData(
          0,
          0,
          canvasTabela.width,
          canvasTabela.height
        );

        const tempCanvas = document.createElement("canvas");
        const tempCtx = tempCanvas.getContext("2d");
        tempCanvas.width = imageData.width;
        tempCanvas.height = imageData.height;
        tempCtx.putImageData(imageData, 0, 0);

        const newWidth = 50; // Nova largura desejada
        const newHeight = 50; // Nova altura desejada

        canvasTabela.width = newWidth;
        canvasTabela.height = newHeight;

        ctx.imageSmoothingEnabled = false; // Desabilitar suavização de imagem para preservar a nitidez
        ctx.drawImage(
          tempCanvas,
          0,
          0,
          tempCanvas.width,
          tempCanvas.height,
          0,
          0,
          newWidth,
          newHeight
        );

        celula.appendChild(canvasTabela);
      } else {
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
        celula.textContent = item[chave] !== undefined ? item[chave] : "falha";
      }
    }
  });

  // Adicionando a tabela ao container
  document.getElementById("tabela-container").appendChild(tabela);
}

function limparTabela() {
  // Define o innerHTML do elemento da tabela como uma string vazia
  document.getElementById("tabela-container").innerHTML = "";
}

function redimensionarImagem(img, canvas, taxa) {
  canvas.width = tamanhoMapa;
  canvas.height = tamanhoMapa;

  const ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0);

  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

  const newWidth = (tamanhoMapa * 20) / taxa; // Nova largura desejada
  const newHeight = (tamanhoMapa * 20) / taxa; // Nova altura desejada

  canvas.width = newWidth;
  canvas.height = newHeight;

  ctx.imageSmoothingEnabled = false;

  ctx.putImageData(imageData, 0, 0);
  ctx.drawImage(
    canvas,
    0,
    0,
    imageData.width,
    imageData.height,
    0,
    0,
    newWidth,
    newHeight
  );
}

function contornarImagem(canvas, taxa) {
  const ctx = canvas.getContext("2d");
  ctx.strokeStyle = "green";

  for (let l = 0; l < tamanhoMapa; l++) {
    for (let c = 0; c < tamanhoMapa; c++) {
      ctx.strokeRect((c * 20) / taxa, (l * 20) / taxa, 20 / taxa, 20 / taxa);
    }
  }
  if (metodo == "highComCantos") {
    let gi = cena.markov.treinoGrids();

    ctx.lineWidth = 2; // Largura da linha do contorno

    let tamanhoGrid = tamanhoMapa / grid;
    tamanhoGrid = Math.floor(tamanhoGrid);
    for (let gridI = 0; gridI < tamanhoGrid; gridI++) {
      for (let gridJ = 0; gridJ < tamanhoGrid; gridJ++) {
        if (gi[gridI][gridJ] == "Meio") {
          ctx.strokeStyle = "red";
        }
        if (gi[gridI][gridJ] == "Superior esquerdo") {
          ctx.strokeStyle = "blue";
        }
        if (gi[gridI][gridJ] == "Superior direito") {
          ctx.strokeStyle = "blue";
        }
        if (gi[gridI][gridJ] == "Inferior esquerdo") {
          ctx.strokeStyle = "blue";
        }
        if (gi[gridI][gridJ] == "Inferior direito") {
          ctx.strokeStyle = "blue";
        }
        if (gi[gridI][gridJ] == "Cima") {
          ctx.strokeStyle = "orange";
        }
        if (gi[gridI][gridJ] == "Direita") {
          ctx.strokeStyle = "orange";
        }
        if (gi[gridI][gridJ] == "Baixo") {
          ctx.strokeStyle = "orange";
        }
        if (gi[gridI][gridJ] == "Esquerda") {
          ctx.strokeStyle = "orange";
        }
        ctx.strokeRect(
          (gridI * grid * 20) / taxa,
          (gridJ * grid * 20) / taxa,
          (20 * grid) / taxa,
          (20 * grid) / taxa
        );
      }
    }
  } else {
    ctx.strokeStyle = "red";
    ctx.lineWidth = 2; // Largura da linha do contorno

    let tamanhoGrid = tamanhoMapa / grid;
    tamanhoGrid = Math.floor(tamanhoGrid);
    for (let gridI = 0; gridI < tamanhoGrid; gridI++) {
      for (let gridJ = 0; gridJ < tamanhoGrid; gridJ++) {
        ctx.strokeRect(
          (gridI * grid * 20) / taxa,
          (gridJ * grid * 20) / taxa,
          (20 * grid) / taxa,
          (20 * grid) / taxa
        );
      }
    }
  }
}

function setSeed() {
  myrng = new Math.seedrandom(document.teste.seed.value);
  hierarquico.AdicionaSemente(myrng);
  lowmarkov.AdicionaSemente(myrng);
  highMarkov.AdicionaSemente(myrng);
}

function atualizaMarkov1(LINHAS, COLUNAS, metodo) {
  markov.atualizaParte1(LINHAS, COLUNAS, modelo);
  lowmarkov.atualizaParte1(LINHAS, COLUNAS, modelo);
  hierarquico.atualizaParte1(LINHAS, COLUNAS, modelo);
  highMarkov.atualizaParte1(LINHAS, COLUNAS, modelo);
  setSeed();
  lowmarkov.tiles = markov.tiles;
  hierarquico.tiles = markov.tiles;
  highMarkov.tiles = markov.tiles;
}
function atualizaMarkov2(tamanhoMapa) {
  markov.atualizaParte2(tamanhoMapa);
  lowmarkov.atualizaParte2(tamanhoMapa);
  hierarquico.atualizaParte2(tamanhoMapa);
  highMarkov.atualizaParte2(tamanhoMapa);
  setSeed();
}
function atualizaMarkov3(grid, metodo) {
  markov.atualizaParte3(grid, metodo);
  lowmarkov.atualizaParte3(grid, metodo);
  hierarquico.atualizaParte3(grid, metodo);
  highMarkov.atualizaParte3(grid, metodo);
  setSeed();
  if (metodo == "high") {
    cena.markov = highMarkov;
  } else {
    if (metodo == "low") {
      cena.markov = lowmarkov;
    } else {
      cena.markov = hierarquico;
    }
  }
  console.log(cena.markov);
}
function atualizaMarkov4(iteracoes, newTiles, metodo) {
  markov.atualizaParte4(iteracoes, newTiles);
  lowmarkov.atualizaParte4(iteracoes, newTiles);
  hierarquico.atualizaParte4(iteracoes, newTiles);
  highMarkov.atualizaParte4(iteracoes, newTiles);
  setSeed();
  if (metodo == "high") {
    cena.markov = highMarkov;
  } else {
    if (metodo == "low") {
      cena.markov = lowmarkov;
    } else {
      cena.markov = hierarquico;
    }
  }
}

document.inicial.iniciar.addEventListener("click", function (event) {
  LINHAS = document.inicial.linhas.valueAsNumber;
  COLUNAS = document.inicial.colunas.valueAsNumber;
  modelo = document.inicial.modelo.value;
  if (modelo == "aleatorio") {
    aleatorioMapa(markov, LINHAS, COLUNAS);
  }

  atualizaMarkov1(LINHAS, COLUNAS, modelo);

  cena.LINHAS = LINHAS;
  cena.COLUNAS = COLUNAS;
  canvas.width = COLUNAS * 32;
  canvas.height = LINHAS * 32;

  game.adicionarCena("teste", cena);
  game.selecionaCena("teste");
});

document.mapaTreinamento.adicionar.addEventListener("click", function (event) {
  localizacao = document.mapaTreinamento.localizacao.value;
  //tamanhoMapa = document.mapaTreinamento.tamanho.valueAsNumber;

  assets.adicionaImagem("treino", localizacao);
  game.selecionaCena("carregando");

  game.adicionarCena("teste", cena);

  const img = new Image();
  img.src = localizacao;
  img.onload = function () {
    tamanhoMapa = img.naturalWidth;
    atualizaMarkov2(tamanhoMapa);
    redimensionarImagem(img, canvasVisual, tamanhoMapa / 9);
  };
});

document.metodo.treinar.addEventListener("click", function (event) {
  metodo = document.metodo.highOrLow.value;
  grid = document.metodo.grid.valueAsNumber;

  atualizaMarkov3(grid, metodo);

  game.adicionarCena("teste", cena);

  let img = new Image();
  img = assets.Img("treino");

  redimensionarImagem(img, canvasTreinamento, tamanhoMapa / 9);

  contornarImagem(canvasTreinamento, tamanhoMapa / 9);
});

document.tabelas.tabela.addEventListener("click", function (event) {
  cena.markov.zeraTabela();
  limparTabela();
  //cena.treinarMarkov();
  let dados = cena.markov.getTabelaDados();
  console.log(dados);
  for (let i = 0; i < dados.length; i++) {
    criarTabela(dados[i]);
  }
});

document.tabelas.limpar.addEventListener("click", function (event) {
  limparTabela();
});

document.teste.gerar.addEventListener("click", function (event) {
  //game.selecionaCena("carregando")

  iteracoes = document.teste.iteracoes.valueAsNumber;
  newTiles = document.teste.newTiles.value;

  atualizaMarkov4(iteracoes, newTiles, metodo);
  console.log(cena);

  game.adicionarCena("teste", cena);

  cena.treinarMarkov();

  game.selecionaCena("teste");
});

document.checklistForm.checkButton.addEventListener("click", function (event) {
  // Impede o envio padrão do formulário (se necessário)
  event.preventDefault();

  // Seleciona o formulário e o local para exibir os resultados
  const checklistForm = document.checklistForm;

  // Obtém os itens marcados como concluídos
  const checkedItems = Array.from(
    checklistForm.querySelectorAll('input[type="checkbox"]:checked')
  ).map((checkbox) => checkbox.parentElement.textContent.trim());

  document.getElementById("resultadoCheck").innerHTML = "";
  // Exibe o resultado
  if (checkedItems.length === 0) {
    let escrito = document.createElement("h2");
    escrito.textContent = "Nenhuma tarefa Marcada"; // Adiciona o texto ao elemento <p>
    document.getElementById("resultadoCheck").appendChild(escrito);
  } else {
    let escrito = document.createElement("h2");

    // Cria o conteúdo das tarefas concluídas, separando cada tarefa com uma quebra de linha <br>
    escrito.innerHTML = `Tarefas concluídas:<br>${checkedItems
      .map((item) => `${item}`)
      .join("<br>")}`;

    document.getElementById("resultadoCheck").appendChild(escrito);
  }

  const valores = Array.from(
    checklistForm.querySelectorAll('input[type="checkbox"]:checked')
  ).map((checkbox) => checkbox.value); // Usando o valor do checkbox

  let mapa = cena.mapa.tiles;
  let processamento = new Markov(
    assets,
    canvasMarkov,
    LINHAS,
    COLUNAS,
    grid,
    tamanhoMapa,
    "teste",
    0,
    "aleatorio",
    newTiles,
    "low"
  );
  processamento.tiles = mapa;
  let cena2 = new CenaJogo(canvas, assets, input, processamento, LINHAS, COLUNAS);
  myrng = new Math.seedrandom(document.teste.seed.value);
  processamento.AdicionaSemente(myrng);

  for (let i = 0; i < valores.length; i++) {
    if (valores[i] == "1") {
      processamento.removePedraColadoComPiso()
    }
    if(valores[i] == "2") {
      processamento.removePedraColadoComBau();
    }
    if(valores[i] == "3") {
      processamento.removeParedeEnvoltaDePedra();
    }
    if(valores[i] == "4") {
      processamento.removerExcessoEPovoaDeBaus();
    }
    if(valores[i] == "5") {
      processamento.removerEAdicionarInimigosPorZona();
    }
  }
  zoomSlider.oninput = function () {
    zoomOutput.innerHTML = this.value;
    console.log(zoomSlider.value);
    cena2.Zoom(zoomSlider.value / 100);
  };
  game.adicionarCena("teste2", cena2);

  game.selecionaCena("teste2");
});

// Adiciona o evento de submissão ao formulário quando o DOM é carregado

const themeSwitcher = {
  // Config
  _scheme: "auto",
  menuTarget: "details.dropdown",
  buttonsTarget: "a[data-theme-switcher]",
  buttonAttribute: "data-theme-switcher",
  rootAttribute: "data-theme",
  localStorageKey: "picoPreferredColorScheme",

  // Init
  init() {
    this.scheme = this.schemeFromLocalStorage;
    this.initSwitchers();
  },

  // Get color scheme from local storage
  get schemeFromLocalStorage() {
    return window.localStorage?.getItem(this.localStorageKey) ?? this._scheme;
  },

  // Preferred color scheme
  get preferredColorScheme() {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  },

  // Init switchers
  initSwitchers() {
    const buttons = document.querySelectorAll(this.buttonsTarget);
    buttons.forEach((button) => {
      button.addEventListener(
        "click",
        (event) => {
          event.preventDefault();
          // Set scheme
          this.scheme = button.getAttribute(this.buttonAttribute);
          // Close dropdown
          document.querySelector(this.menuTarget)?.removeAttribute("open");
        },
        false
      );
    });
  },

  // Set scheme
  set scheme(scheme) {
    if (scheme == "auto") {
      this._scheme = this.preferredColorScheme;
    } else if (scheme == "dark" || scheme == "light") {
      this._scheme = scheme;
    }
    this.applyScheme();
    this.schemeToLocalStorage();
  },

  // Get scheme
  get scheme() {
    return this._scheme;
  },

  // Apply scheme
  applyScheme() {
    document
      .querySelector("html")
      ?.setAttribute(this.rootAttribute, this.scheme);
  },

  // Store scheme to local storage
  schemeToLocalStorage() {
    window.localStorage?.setItem(this.localStorageKey, this.scheme);
  },
};

// Init
themeSwitcher.init();
