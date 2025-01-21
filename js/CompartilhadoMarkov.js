


const Piso = 0;
const Pedra = 1;
const Parede = 2;
const Bau = 3;
const Enemy = 4;
const Vazio = 10;

export default class Markov {
  constructor(
    assets,
    canvas,
    linhas,
    colunas,
    grid,
    tamanhoimagem,
    imagem,
    numero_de_iteracoes,
    modelo,
    newTiles,
    metodo
  ) {
    this.LINHAS = linhas;
    this.COLUNAS = colunas;
    this.GRID = grid;
    this.TAMANHOIMAGEM = tamanhoimagem;
    this.IMAGEM = imagem;
    this.iteracoes = numero_de_iteracoes;
    this.modelo = modelo;
    this.newTiles = newTiles;
    this.metodo = metodo;

    this.dados = [];

    this.tiles = [];

    this.dadosBacktracking = [];
    this.backVezes = [];

    this.escolhidos = [];
    this.dadosEscolhidos = [];

    this.contagem = [];
    this.estados = [];
    this.probabilidades = [];
    this.probabilidadesGlobal = [];
    this.porcentagemDeUso = [];

    this.corte =0.25;
    this.totalGlobal = 0;
    this.assets = assets;
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d", { willReadFrequently: true });
    this.semente;;
  }

  AdicionaSemente(semente)
  {
    this.semente = semente
  }

  atualizaParte1(LINHAS, COLUNAS , modelo)
  {
    this.LINHAS = LINHAS;
    this.COLUNAS = COLUNAS;
    this.modelo = modelo;
    this.iteracoes = 0;
  }
  atualizaParte2(tamanhoMapa)
  {
    this.TAMANHOIMAGEM = tamanhoMapa
  }
  atualizaParte3(grid,metodo)
  {
    this.GRID = grid;
    this.metodo = metodo
  }
  atualizaParte4(iteracoes,newTiles)
  {
    this.iteracoes = iteracoes;
    this.newTiles = newTiles
  }
  atualizaCorte(corte)
  {
    this.corte = corte;
  }


  zeraTreino() {
    this.backVezes = [];
    this.escolhidos = [];
    this.contagem = [];
    this.estados = [];
    this.probabilidades = [];
    this.probabilidadesGlobal = [];
    this.porcentagemDeUso = [];
    this.totalGlobal = 0;
  }

  zeraTabela() {
    this.dados = [];
    this.dadosBacktracking = [];
    this.dadosEscolhidos = [];
  }

  adicionaEstado(estado) {
    this.estados.push(estado);
  }

  iniciaPorcentagem(ordems) {
    for (let i = 0; i < ordems.length; i++) {
      this.porcentagemDeUso[ordems[i].toString()] = 0;
    }
  }


  getPorcentagem() {
    return this.porcentagemDeUso;
  }

  adicionaVezesEscolhidos(vizinhos, alvo) {
    const chave = vizinhos.join("");
    if (this.escolhidos[chave] === undefined) {
      this.escolhidos[chave] = [];

      for (let i = 0; i < this.estados.length; i++) {
        this.escolhidos[chave][this.estados[i]] = 0;
      }
    }
    this.escolhidos[chave][alvo]++;
  }

  adicionaBacktracking(vizinhos, ordem) {
    const chave = vizinhos.join("");
    if (this.backVezes[chave] === undefined) {
      this.backVezes[chave] = [];

      for (let i = 0; i < 4; i++) {
        this.backVezes[chave][i] = 0;
      }
    }
    this.backVezes[chave][ordem - 1]++;
  }

  soma(vizinhos, alvo) {
    const chave = vizinhos.join("");
    if (this.contagem[chave] === undefined) {
      this.contagem[chave] = [];
      this.probabilidades[chave] = [];

      for (let i = 0; i < this.estados.length; i++) {
        this.contagem[chave][this.estados[i]] = 0;
        this.probabilidades[chave][this.estados[i]] = 0;
      }
    }

    this.contagem[chave][alvo]++;
  }
  calculate() {
    let vizinhos = Object.keys(this.contagem);
    for (const vizinho of vizinhos) {
      let total = 0;
      let chaves = Object.keys(this.contagem[vizinho]);
      for (const chave of chaves) {
        total = total + this.contagem[vizinho][chave];
      }
      for (const chave of chaves) {
        this.probabilidades[vizinho][chave] =
          this.contagem[vizinho][chave] / total;
      }
    }
    for (let i = 0; i < this.estados.length; i++) {
      this.probabilidadesGlobal[this.estados[i]] =
        this.probabilidadesGlobal[this.estados[i]] / this.totalGlobal;
    }
    //console.log(this.probabilidadesGlobal)
  }

  getProbabilidades(vizinho, alvo) {
    if (this.probabilidades[vizinho] === undefined) {
      return this.probabilidadesGlobal[alvo];
    }
    return this.probabilidades[vizinho][alvo];
  }

  separarPorNumerosEMaiusculas(string) {
    return string.split(/(?=\d)|(?=[A-Z])/);
  }

  converterEstado(vizinhos) {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (vizinhos[i][j] == "Piso") vizinhos[i][j] = Piso;
        if (vizinhos[i][j] == "Pedra") vizinhos[i][j] = Pedra;
        if (vizinhos[i][j] == "Parede") vizinhos[i][j] = Parede;
        if (vizinhos[i][j] == "Bau") vizinhos[i][j] = Bau;
        if (vizinhos[i][j] == "Enemy") vizinhos[i][j] = Enemy;
        if (vizinhos[i][j] == "Vazio") vizinhos[i][j] = Vazio;
      }
    }
    return vizinhos;
  }

  converterImagem() {
    for (let i = 0; i < this.estados.length; i++) {
      this.probabilidadesGlobal[this.estados[i]] = 0;
    }
    let img = new Image();
    img = this.assets.Img(this.IMAGEM);
    this.canvas.width = img.width;
    this.canvas.height = img.height;

    this.ctx.drawImage(img, 0, 0);

    let tiles = [];
    for (let i = 0; i < this.TAMANHOIMAGEM; i++) {
      tiles[i] = [];
      for (let j = 0; j < this.TAMANHOIMAGEM; j++) {
        let pixel = this.ctx.getImageData(j, i, 1, 1);
        let corRgb = pixel.data;
        if (corRgb[0] == 0 && corRgb[1] == 0 && corRgb[2] == 0) {
          tiles[i][j] = "Pedra";
        } else {
          if (corRgb[0] == 255 && corRgb[1] == 255 && corRgb[2] == 255) {
            tiles[i][j] = "Piso";
          } else {
            if (corRgb[0] == 32 && corRgb[1] == 32 && corRgb[2] == 32) {
              tiles[i][j] = "Parede";
            } else {
              if (corRgb[0] == 255 && corRgb[1] == 255 && corRgb[2] == 0) {
                tiles[i][j] = "Bau";
              } else {
                if (corRgb[0] == 255 && corRgb[1] == 0 && corRgb[2] == 0) {
                  tiles[i][j] = "Enemy";
                }
                else
                {
                console.log(i, j, corRgb);
                }
              }
            }
          }
        }
      }
    }

    return tiles;
  }

  removePedraColadoComPiso() { 
    let end = false;
    while (!end) {
        end = true;  // Assume que nenhuma alteração ocorrerá a princípio
        for (let i = 1; i < this.LINHAS - 1; i++) {
            for (let j = 1; j < this.COLUNAS - 1; j++) {
                // Verifica se o tile é Piso
                if (this.tiles[i][j] == Pedra) {
                    // Verifica as condições de colagem com Pedra (horizontal e vertical)
                    if (
                        this.tiles[i][j - 1] == Piso || // Vizinho à esquerda
                        this.tiles[i][j + 1] == Piso || // Vizinho à direita
                        this.tiles[i - 1][j] == Piso || // Vizinho acima
                        this.tiles[i + 1][j] == Piso    // Vizinho abaixo
                    ) {
                        this.tiles[i][j] = Parede;  // Altera Piso para Parede
                        end = false;  // Marca que houve alteração, para continuar o loop
                    }
                }
            }
        }
    }
}


removePedraColadoComBau() {
  let end = false;
  while (!end) {
      end = true;  // Assume que nenhuma alteração ocorrerá a princípio
      for (let i = 1; i < this.LINHAS - 1; i++) {
          for (let j = 1; j < this.COLUNAS - 1; j++) {
              // Verifica se o tile é Pedra
              if (this.tiles[i][j] == Pedra) {
                  // Verifica as condições de colagem com Baú e aplica a mudança para Parede
                  if (this.tiles[i][j - 1] == Bau || this.tiles[i][j + 1] == Bau || 
                      this.tiles[i - 1][j] == Bau || this.tiles[i + 1][j] == Bau) {
                      this.tiles[i][j] = Parede;  // Altera Pedra para Parede
                      end = false;  // Marca que houve alteração, para continuar o loop
                  }
              }
          }
      }
  }
}
removeParedeEnvoltaDePedra() {
  let end = false;
  while (!end) {
      end = true;  // Assume que nenhuma alteração ocorrerá a princípio
      for (let i = 1; i < this.LINHAS - 1; i++) {
          for (let j = 1; j < this.COLUNAS - 1; j++) {
              // Verifica se o tile é uma Parede
              if (this.tiles[i][j] == Parede) {
                  // Verifica se há Piso, Bau ou Enemy nas vizinhanças horizontais ou verticais
                  if (
                      this.tiles[i][j - 1] == Piso ||   // Vizinho à esquerda
                      this.tiles[i][j + 1] == Piso ||   // Vizinho à direita
                      this.tiles[i - 1][j] == Piso ||   // Vizinho acima
                      this.tiles[i + 1][j] == Piso ||   // Vizinho abaixo
                      this.tiles[i][j - 1] == Bau ||    // Vizinho à esquerda (Bau)
                      this.tiles[i][j + 1] == Bau ||    // Vizinho à direita (Bau)
                      this.tiles[i - 1][j] == Bau ||    // Vizinho acima (Bau)
                      this.tiles[i + 1][j] == Bau ||    // Vizinho abaixo (Bau)
                      this.tiles[i][j - 1] == Enemy ||  // Vizinho à esquerda (Enemy)
                      this.tiles[i][j + 1] == Enemy ||  // Vizinho à direita (Enemy)
                      this.tiles[i - 1][j] == Enemy ||  // Vizinho acima (Enemy)
                      this.tiles[i + 1][j] == Enemy     // Vizinho abaixo (Enemy)
                  ) {
                      continue;  // Não faz alterações se estiver colado com Piso, Bau ou Enemy
                  }

                  // Verifica se os vizinhos esquerdo e direito são Pedra
                  if (
                      (this.tiles[i][j - 1] == Pedra && this.tiles[i][j + 1] == Pedra) || 
                      (this.tiles[i - 1][j] == Pedra && this.tiles[i + 1][j] == Pedra)
                  ) {
                      this.tiles[i][j] = Pedra;  // Altera Parede para Pedra
                      end = false;  // Marca que houve alteração, para continuar o loop
                  }

                  // Verifica se o vizinho de baixo é Parede e existe uma Pedra mais abaixo
                  let currentRow = i;
                  while (currentRow < this.LINHAS - 1 && this.tiles[currentRow + 1][j] == Parede) {
                      currentRow++;
                      if (this.tiles[currentRow + 1][j] == Pedra) {
                          this.tiles[i][j] = Pedra;  // Altera Parede para Pedra
                          end = false;  // Marca que houve alteração, para continuar o loop
                          break;  // Sai do loop interno quando a alteração ocorrer
                      }
                  }
              }
          }
      }
  }
}

removerExcessoEPovoaDeBaus() {
  // Definir o número de zonas baseado no grid
  const numeroDeZonas = this.GRID; // Este valor define a quantidade de zonas ao longo de cada dimensão (linhas e colunas)

  // Calcular o tamanho de cada zona
  const linhasPorZona = Math.floor(this.LINHAS / numeroDeZonas);
  const colunasPorZona = Math.floor(this.COLUNAS / numeroDeZonas);

  // Contém as zonas
  let zonas = [];

  // Dividindo o mapa em zonas com base no grid
  for (let i = 0; i < numeroDeZonas; i++) {
    for (let j = 0; j < numeroDeZonas; j++) {
      // Calcular o início e fim das coordenadas da zona
      const startX = i * linhasPorZona;
      const startY = j * colunasPorZona;
      const endX = (i + 1) * linhasPorZona;
      const endY = (j + 1) * colunasPorZona;

      // Adiciona a zona ao array de zonas
      zonas.push({ startX, startY, endX, endY });
    }
  }

  // Itera sobre cada zona
  for (const zona of zonas) {
    let baus = [];

    // Contagem de todos os baús dentro da zona
    for (let i = zona.startX; i < zona.endX; i++) {
      for (let j = zona.startY; j < zona.endY; j++) {
        if (this.tiles[i][j] == Bau) {
          baus.push({ x: i, y: j }); // Armazena a posição dos baús dentro da zona
        }
      }
    }

    // Verifica a quantidade de baús na zona
    const totalBaus = baus.length;
    const bausParaManter = 3; // Mantém pelo menos 3 baús na zona

    // Inicializar a variável bausParaAdicionar
    let bausParaAdicionar = 0;

    // Se houver menos de 3 baús, adiciona os faltantes
    if (totalBaus < bausParaManter) {
      bausParaAdicionar = bausParaManter - totalBaus; // Quantidade de baús a adicionar

      // Povoar a zona com baús
      for (let i = 0; i < bausParaAdicionar; i++) {
        let x, y;
        // Encontrar uma posição vazia na zona (Piso)
        do {
          x = Math.floor(this.semente() * (zona.endX - zona.startX) + zona.startX);
          y = Math.floor(this.semente() * (zona.endY - zona.startY) + zona.startY);
        } while (this.tiles[x][y] != Piso); // Garante que a posição seja Piso (vacío)

        // Adiciona um baú na posição encontrada
        this.tiles[x][y] = Bau;
      }
    }

    // Após adicionar baús, verifica a quantidade total de baús
    const totalBausFinal = baus.length + bausParaAdicionar;
    if (totalBausFinal > bausParaManter) {
      const bausParaRemover = totalBausFinal - bausParaManter; // Calcula o excesso de baús a remover

      // Embaralha as posições dos baús dentro da zona para remoção aleatória
      baus = this._embaralharArray(baus);

      // Seleciona aleatoriamente os baús a remover
      let bausRemover = baus.slice(0, bausParaRemover);

      // Remove os baús selecionados dentro da zona
      for (let i = 0; i < bausRemover.length; i++) {
        const { x, y } = bausRemover[i];
        this.tiles[x][y] = Piso; // Remove o baú substituindo por 0 (Piso)
      }
    }
  }
}

  


  removerEAdicionarInimigosPorZona() {
    const numeroDeZonas = this.GRID;  // Define a quantidade de zonas ao longo de cada dimensão (linhas e colunas)
  
    // Calcular o tamanho de cada zona
    const linhasPorZona = Math.floor(this.LINHAS / numeroDeZonas);
    const colunasPorZona = Math.floor(this.COLUNAS / numeroDeZonas);
  
    // Contém as zonas
    let zonas = [];
  
    // Criar as zonas dividindo o mapa com base no número de zonas e tamanho de cada zona
    for (let i = 0; i < numeroDeZonas; i++) {
      for (let j = 0; j < numeroDeZonas; j++) {
        const startX = i * linhasPorZona;
        const startY = j * colunasPorZona;
        const endX = Math.min((i + 1) * linhasPorZona, this.LINHAS);
        const endY = Math.min((j + 1) * colunasPorZona, this.COLUNAS);
  
        zonas.push({ startX, startY, endX, endY });
      }
    }
  
    // Itera sobre cada zona
    for (const zona of zonas) {
      let inimigos = [];
      let espacosVazios = [];
      
      // Contagem de todos os inimigos dentro da zona e marcação das posições vazias
      for (let i = zona.startX; i < zona.endX; i++) {
        for (let j = zona.startY; j < zona.endY; j++) {
          if (this.tiles[i][j] == Enemy) {
            inimigos.push({ x: i, y: j }); // Armazena a posição dos inimigos dentro da zona
          }
          if (this.tiles[i][j] == Piso) {
            espacosVazios.push({ x: i, y: j }); // Marca as áreas vazias dentro da zona
          }
        }
      }
  
      // Verifica a quantidade de inimigos na zona
      const totalInimigos = inimigos.length;
      const totalEspacosVazios = espacosVazios.length;
      
      if (totalInimigos <= 10) {
        // Se houver 10 ou menos inimigos, preenche as áreas vazias com inimigos aleatoriamente
        const inimigosParaAdicionar = Math.min(10 - totalInimigos, totalEspacosVazios); // Quantos inimigos adicionar
        if (inimigosParaAdicionar > 0) {
          // Embaralha as áreas vazias
          espacosVazios = this._embaralharArray(espacosVazios);
          
          // Adiciona inimigos nas áreas vazias
          for (let i = 0; i < inimigosParaAdicionar; i++) {
            const { x, y } = espacosVazios[i];
            this.tiles[x][y] = Enemy; // Coloca um inimigo na posição vazia
          }
        }
        continue;
      }
  
      // Calcula o excesso de inimigos a remover
      const inimigosParaRemover = totalInimigos - 10;
      if (inimigosParaRemover > 0) {
        // Embaralha as posições dos inimigos dentro da zona para remoção aleatória
        inimigos = this._embaralharArray(inimigos);
  
        // Seleciona aleatoriamente os inimigos a remover
        let inimigosRemover = inimigos.slice(0, inimigosParaRemover);
  
        // Remove os inimigos selecionados dentro da zona
        for (let i = 0; i < inimigosRemover.length; i++) {
          const { x, y } = inimigosRemover[i];
          this.tiles[x][y] = 0; // Remove o inimigo substituindo por 0
        }
      }
  
      // Após a remoção, calcula as áreas vazias restantes e adiciona inimigos aleatoriamente
      const totalInimigosApósRemocao = 10; // Após remoção, mantemos 10 inimigos
      const inimigosRestantesParaAdicionar = totalInimigosApósRemocao - inimigos.length;
  
      if (inimigosRestantesParaAdicionar > 0 && totalEspacosVazios > 0) {
        // Embaralha as áreas vazias para garantir distribuição aleatória
        espacosVazios = this._embaralharArray(espacosVazios);
  
        // Preenche as áreas vazias com inimigos até o limite
        const espacosParaPreencher = espacosVazios.slice(0, inimigosRestantesParaAdicionar);
        for (let i = 0; i < espacosParaPreencher.length; i++) {
          const { x, y } = espacosParaPreencher[i];
          this.tiles[x][y] = Enemy; // Coloca um inimigo nas áreas vazias
        }
      }
    }
  }

  _embaralharArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(this.semente() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]]; // Troca os elementos
    }
    return arr;
  }
  
}
