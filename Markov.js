class Markov 
{
  
  constructor(canvas, assets,input,mapa)
  {
      this.canvas = canvas;
      this.ctx = canvas.getContext("2d");
      this.assets = assets;
      this.tiles = []
      this.possibilidades = []
      this.mapa = mapa
 
  }
    getRandomItem(arr) 
    {
    const random = Math.random(0,1)
    const randomIndex = Math.floor(Math.random() * arr.length);
    if(random>=arr[randomIndex])
      {
    return randomIndex;
    }
    else
    {
      return this.getRandomItem(arr)
    }
  }
    GenerateRandomMap(primeiroTile)
    {
      let anterior =primeiroTile
      for (let l = 0; l < 15; l++) 
      {
          for (let c = 0; c < 15; c++) 
          {
          aux = []
          a = a.concat(this.possibilidades[anterior])
          anterior = randomIndex(a);
          this.mapa[l][c] = this.tiles[anterior];
          }
      
      }
      return this.mapa
    }

  // Add a single state or states
  addStates(tile) {
    this.tiles.push(tile)
    }
  setPosssibilidades(possibilite)
  {
    this.possibilidades = possibilite
  }

  iniciar()
  {
    return this.GenerateRandomMap
  }
  }











