export default class Markov {
  constructor(assets, canvas) {
    this.tiles = [];
    this.possibilidades = [];
    this.mapa = [];
    this.assets = assets;
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
  }
  RandomIndex(arr) {
    let randomIndex = Math.floor(Math.random() * arr.length);
    //let randomIndex = Math.floor(Math.random())
    if (arr[randomIndex] > 0) {
      return randomIndex;
    } else {
      return this.RandomIndex(arr);
    }
  }
  GenerateRandomMap(primeiroTile) {
    let anterior = primeiroTile;
    for (let l = 0; l < 10; l++) {
      this.mapa[l] = [];
      for (let c = 0; c < 10; c++) {
        if (l == 0 && c == 0) {
          this.mapa[l][c] = this.tiles[anterior];
        } else {
          let aux = [];
          aux = aux.concat(this.possibilidades[anterior]);
          anterior = this.RandomIndex(aux);
          this.mapa[l][c] = this.tiles[anterior];
        }
      }
    }
    return this.mapa;
  }

  // Add a single state or states
  addStates(tile) {
    this.tiles.push(tile);
  }
  setPosssibilidades(possibilite) {
    this.possibilidades = possibilite;
  }

  treino() {
    for (let i = 0; i < this.tiles.length; i++) {
      this.possibilidades[i] = [];
    }
    for (let i = 0; i < this.tiles.length; i++) {
      for (let j = 0; j < this.tiles.length; j++) {
        this.possibilidades[i][j] = 0;
      }
    }
    let img = new Image();
    img = this.assets.Img("Treino100");
    this.ctx.drawImage(img, 0, 0);
    img.style.display = "none";


    let ant = 0;
    let cont = 0;
    for (let gi = 0; gi<20;gi++)
    {
      for (let gj = 0; gj<20;gj++){
        for (let i = gi*5; i < gi*5 + 5; i++) {
          for (let j = gj*5; j < gj*5+ 5; j++) {
          let pixel = this.ctx.getImageData(i, j, 1, 1);
          let data = pixel.data;
          //const rgba = `rgba(${data[0]}, ${data[1]}, ${data[2]}, ${data[3] / 255})`;
          console.log(data)
          if (data[0] == 0 && data[1] == 0 && data[2] == 0) {
            this.possibilidades[ant][0] = this.possibilidades[ant][0] + 1;
            ant = 0;
          } 
          else 
          {
            if(data[0]== 255 && data[1] == 255 && data[2] ==255)
            {
            this.possibilidades[ant][1] = this.possibilidades[ant][1] + 1;
            ant = 1;
           }
            else
            {
              this.possibilidades[ant][2] = this.possibilidades[ant][2] + 1;
              ant = 2;
            }
          }
        cont = cont + 1;
        //console.log(rgba)
        }
      }
    }
  }
    for (let i = 0; i < this.tiles.length; i++) {
      for (let j = 0; j < this.tiles.length; j++) {
        this.possibilidades[i][j] = this.possibilidades[i][j] / cont;
      }
    }
    console.log(this.possibilidades);
  }

  iniciar() {
    this.treino();
    return this.GenerateRandomMap(0);
  }

  limpa() {
    this.possibilidades = [];
    this.tiles = [];
  }
}
