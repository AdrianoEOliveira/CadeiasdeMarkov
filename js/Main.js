import AssetManager from "./AssetManager.js";
import Mixer from "./Mixer.js";
import inputManager from "./inputManager.js";
import Game from "./Game.js";
import CenaCarregando from "./CenaCarregando.js";
import CenaJogo from   "./CenaJogo.js";
import CenaFim from   "./CenaFim.js";
import Markov from   "./Markov.js";

const InicialX = 3;
const InicialY = 3;
const Linhas =15;
const COLUNAS =15;


const assets= new AssetManager(new Mixer(10));
assets.adicionaImagem("humano","assets/humano.png");
assets.adicionaImagem("terreno","assets/terrain_atlas.png")
assets.adicionaImagem("chest","assets/Chest.png")
assets.adicionaImagem("coin","assets/coin.jpg")
assets.adicionaImagem("ship","assets/ship.png")
assets.adicionaImagem("Treino25","assets/Treino25.png")
assets.adicionaImagem("Treino30","assets/Treino30.png")
assets.adicionaImagem("TreinoCirculo","assets/TreinoCirculo.png")
assets.adicionaAudio("boom","assets/boom.wav")
assets.adicionaAudio("hurt","assets/hurt.wav")

const input = new inputManager();


const canvas = document.querySelector("canvas");
canvas.width = Linhas*32;
canvas.height = COLUNAS*32;
input.configurarTeclado(
    {"ArrowLeft":"MOVE_ESQUERDA",
     "ArrowRight" : "MOVE_DIREITA",
     "ArrowUp":"MOVE_CIMA",
     "ArrowDown":"MOVE_BAIXO",
     "1":"TESTE",
     "2":"C3",
     "3":"C5",
     "4":"C10",
     "5":"T3",
     "6":"T5",
     "7":"T10"
    }
);

const markov25 = new Markov(assets,canvas,Linhas,COLUNAS,5,25,"Treino25",InicialX,InicialY);
const cenaTeste= new CenaJogo(canvas,assets,input,markov25,Linhas,COLUNAS);

const game = new Game(canvas,assets,input);
const markovCirculo3 = new Markov(assets,canvas,Linhas,COLUNAS,3,30,"TreinoCirculo",InicialX,InicialY);
const cenaCirculo_3= new CenaJogo(canvas,assets,input,markovCirculo3,Linhas,COLUNAS);
const markovCirculo5 = new Markov(assets,canvas,Linhas,COLUNAS,5,30,"TreinoCirculo",InicialX,InicialY);
const cenaCirculo_5= new CenaJogo(canvas,assets,input,markovCirculo5,Linhas,COLUNAS);
const markovCirculo10 = new Markov(assets,canvas,Linhas,COLUNAS,10,30,"TreinoCirculo",InicialX,InicialY);
const cenaCirculo_10= new CenaJogo(canvas,assets,input,markovCirculo10,Linhas,COLUNAS);

const markov3 = new Markov(assets,canvas,Linhas,COLUNAS,3,30,"Treino30",InicialX,InicialY);
const cena_3= new CenaJogo(canvas,assets,input,markov3,Linhas,COLUNAS);
const markov5 = new Markov(assets,canvas,Linhas,COLUNAS,5,30,"Treino30",InicialX,InicialY);
const cena_5= new CenaJogo(canvas,assets,input,markov5,Linhas,COLUNAS);
const markov10 = new Markov(assets,canvas,Linhas,COLUNAS,10,30,"Treino30",InicialX,InicialY);
const cena_10= new CenaJogo(canvas,assets,input,markov10,Linhas,COLUNAS);

const carregando= new CenaCarregando(canvas,assets,input,markov25);

const fim= new CenaFim(canvas,assets,input);

game.adicionarCena("carregando",carregando);
game.adicionarCena("teste",cenaTeste);
game.adicionarCena("testeCirculo_3",cenaCirculo_3);
game.adicionarCena("testeCirculo_5",cenaCirculo_5);
game.adicionarCena("testeCirculo_10",cenaCirculo_10);
game.adicionarCena("teste_3",cena_3);
game.adicionarCena("teste_5",cena_5);
game.adicionarCena("teste_10",cena_10);
game.adicionarCena("fim",fim);










//cena1.adicionarSprite(new Sprite({x:50,y:100,w:20,h:20,vx:-10,color:"red"}));

game.iniciar();

document.addEventListener("keydown",(e)=>{switch (e.key)
    {
    case " ":
        game.iniciar();
        break;
    case "Escape":
        game.parar()
        break;
        case "c":
        assets.play("boom");
        break;
    }
}
)



