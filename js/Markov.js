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
    for (let l = 0; l < 30; l++) {
      this.mapa[l] = [];
      for (let c = 0; c < 30; c++) {
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
    img = this.assets.Img("Treino");
    this.ctx.drawImage(img, 0, 0);
    //img.style.display = "none";

    //let imgData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);

    //for (let i = 16 *4  i < imgData.data.length; i = (4*32)) {
    //console.log(imgData.data[i],imgData.data[i+1],imgData.data[i+2],imgData.data[3])
    //const rgba = `rgba(${data[0]}, ${data[1]}, ${data[2]}, ${data[3] / 255})`;
    //if(imgData.data[0]== 0 && imgData.data[1] == 0 && imgaData.data[2] == 0)
    //{
    //pos[ant][0] = pos[ant][0] +1
    //}
    //else
    //{
    //pos[ant][1] = pos[ant][1] + 1
    //}
    //cont = cont + 1
    let ant = 0;
    let cont = 0;
    // i = 16 pixel medio do quadrado de 32
    for (let gi = 0; gi<5;gi++){
      for (let gj = 0; gj<5;gj++){
    for (let i = gi*5; i < gi*5 + 5; i++) {
      for (let j = gj*5; j < gj*5+ 5; j++) {
        let pixel = this.ctx.getImageData(i, j, 1, 1);
        let data = pixel.data;
        //const rgba = `rgba(${data[0]}, ${data[1]}, ${data[2]}, ${data[3] / 255})`;
        //console.log(data)
        if (data[0] == 0 && data[1] == 0 && data[2] == 0) {
          this.possibilidades[ant][0] = this.possibilidades[ant][0] + 1;
          ant = 0;
        } else {
          this.possibilidades[ant][1] = this.possibilidades[ant][1] + 1;
          ant = 1;
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
