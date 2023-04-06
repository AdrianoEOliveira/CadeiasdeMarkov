export default class Markov 
{
  
  constructor()
  {
      this.tiles = []
      this.possibilidades = []
      this.mapa = []
 
  }
  RandomIndex(arr) 
  {
  let randomIndex = Math.floor(Math.random() * arr.length);
  if(arr[randomIndex]>0)
    {
    return randomIndex;
    }
    else
    {
      return this.RandomIndex(arr)
    }
  }
    GenerateRandomMap(primeiroTile)
    {
      let anterior =primeiroTile
      for (let l = 0; l < 15; l++) 
      {
        this.mapa [l] = []
          for (let c = 0; c < 15; c++) 
          {
          let aux = []
          aux = aux.concat(this.possibilidades[anterior])
          anterior = this.RandomIndex(aux);
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











