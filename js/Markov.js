export default class Markov {
  constructor(assets,canvas) {
    this.tiles = [];
    this.possibilidades = [];
    this.mapa = [];
    this.assets = assets;
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d",{willReadFrequently: true});
  }
  RandomIndex(arr) {
    let randomIndex = Math.floor(Math.random() * arr.length);
    if (arr[randomIndex] > 0) {
      return randomIndex;
    } else {
      return this.RandomIndex(arr);
    }
  }
  GenerateRandomMap(primeiroTile) {
    let anterior = primeiroTile;
    for (let l = 0; l < 60; l++) {
      this.mapa[l] = [];
      for (let c = 0; c < 60; c++) {
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

  treino()
  {
    for (let i = 0; i<this.tiles.length;i++)
    {
    this.possibilidades[i] = []
    }
    for (let i = 0; i<this.tiles.length;i++)
    {
      for (let j = 0; j<this.tiles.length;j++)
      {
        this.possibilidades[i][j] = 0
      }
    }
    let img =new Image();
    img = this.assets.Img("Treino");
    this.ctx.drawImage(img, 0, 0);
    img.style.display = "none";

    let ant = 0
    let cont = 0
    //let imgData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);

      // invert colors
      //for (let i = 0; i < imgData.data.length; i += 4) {
        //console.log(imgData.data[i],imgData.data[i+1],imgData.data[i+2],imgData.data[3]) 
      for(let i = 16 ; i<1920 ; i = i +32)
      {
      for(let j = 16; j<1920; j = j + 32 )
      {
        const pixel = this.ctx.getImageData(i, j, 1, 1);
        const data = pixel.data;
        //const rgba = `rgba(${data[0]}, ${data[1]}, ${data[2]}, ${data[3] / 255})`;
        if(data[0]==0 && data[1] == 0 && data[2]==0)
        {
          this.possibilidades[ant][0]++
        }
        else
        {
          this.possibilidades[ant][1]++
        }
        cont++
        //console.log(rgba)
      //}
      }
      for ( let i = 0 ; i< this.tiles.length;i++)
      {
        for ( let j = 0 ; i< this.tiles.length;j++)
        {
          this.possibilidades[i][j] = this.possibilidades[i][j]/cont
        
        }

      }
    }
    
  }

  iniciar() 
  {
    return this.GenerateRandomMap;
  }
}
