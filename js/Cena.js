import Sprite from "./Sprite.js";

export default class Cena
{
    /* E responsável por desenhar elementos na tela de uma animação
    */
    constructor(canvas,assets,input,markov,linhas = 21, colunas = 21){
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.assets = assets;
        this.mapa=null;
        this.game=null;
        this.rodando =true;
        this.input = input;
        this.pontuacao = 0;
        this.markov = markov;
        this.LINHAS = linhas;
        this.COLUNAS = colunas;
        //this.preparar();
    }
    desenhar()
    {
        this.ctx.fillStyle = "white";
        this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height);

        this.mapa?.desenhar(this.ctx);
        if(this.assets.acabou())
        {
            for (let s = 0; s < this.sprites.length; s++) {
                const sprite = this.sprites[s];
                sprite.desenhar(this.ctx);
                sprite.AplicaRestrições();
            }
        }
        this.ctx.fillStyle = "yellow";
        this.ctx.fillText(this.assets?.progresso(),10,20);
    }
    adicionarSprite(sprite)
    {
        sprite.cena=this;
        this.sprites.push(sprite);
    }
    passo(dt)
    {
        if(this.assets.acabou())
        {
            for (const sprite of this.sprites) 
            {
                sprite.passo(dt);
            }
        }
    }
    MudaEstado()
    {

        this.criaSprite();
    }
    criaSprite()
    {
        let Invalido = 1;
        let xa ,ya;
            while(Invalido ===1)
            {
            xa = Math.floor(Math.random() * 11*32) + 64;
            let mx=Math.floor(xa/this.mapa.TAMANHO);
            ya = Math.floor(Math.random() * 11*32) + 64;
            let my=Math.floor(ya/this.mapa.TAMANHO);
                
            if(mx<15&& my <15)
            {
                if(this.mapa.tiles[my][mx]!=1)
                {
                    Invalido = 0;
                }
            }
            }
        let vxa = Math.floor(Math.random() * 11);
        let positivoOuNegativo =Math.floor(Math.random() * 10) +1;
        vxa = vxa * Math.pow(-1,positivoOuNegativo);
        let vya = Math.floor(Math.random() * 11);
        positivoOuNegativo =Math.floor(Math.random() * 10) +1;
        vya = vya * Math.pow(-1,positivoOuNegativo);
        //const en1 = new Sprite({x:xa,y:ya,w:20,h:20,vx:vxa,vy:vya,color:"red"});
        //en1.tags.add("enemy");
        const pc = this.sprites[0];
        function perseguePC(dt)
        {
            this.vx = 25 * Math.sign(pc.x-this.x);
            this.vy = 25 * Math.sign(pc.y-this.y);
    
        }
        //en1.controlar = perseguePC;
        //this.adicionarSprite(en1);

    }


    quadro(t)
    {
        this.t0 = this.t0 ?? t;
        this.dt = (t-this.t0)/1000;
        this.tempo = this.dt +this.tempo;
        let respawn=4;
        if(this.game.stars==1)
        {
            respawn = 3; 
        }
        if(this.game.stars>=2)
        {
            respawn = 2;  
        }

        if(this.tempo > respawn)
        {
            this.MudaEstado();
            this.tempo=0;
        }
        this.passo(this.dt);
        this.desenhar();
        this.checarColisão();
        this.removerSprites();
        this.t0 = t;
        if(this.rodando){
        this.iniciar();
        }
    }
    iniciar()
    {
        this.rodando = true;
        this.idAnim = requestAnimationFrame((t)=>{this.quadro(t)});
    }
    parar(){
        this.rodando=false;
        cancelAnimationFrame(this.idAnim);
        this.t0=null;
        this.dy=0;
    }
    checarColisão()
    {
        for (let i = 0; i < this.sprites.length - 1; i++) 
        {
            const sprA = this.sprites[i];
            for (let j = i+1; j < this.sprites.length; j++)
            {
                const sprB = this.sprites[j];
                if(sprA.colidiuCom(sprB))
                {
                    this.quandoColidir(sprA,sprB)
                }               
            }
        }
    }
    quandoColidir(a,b)
    {
        if(!this.aRemover.includes(a))
        {
            this.aRemover.push(a);
        }
        if(!this.aRemover.includes(b))
        {
            this.aRemover.push(b);
        }
        this.assets.play("boom");

    }
    removerSprites()
    {
        for (let i = 0; i < this.aRemover.length; i++) {
            const alvo = this.aRemover[i];
            const idx = this.sprites.indexOf(alvo);
            if(idx >=0)
            {
                this.sprites.splice(idx,1);
            }
        }
        this.aRemover = [];
    }
    configuraMapa(mapa)
    {
        this.mapa = mapa;
        this.mapa.cena=this;
    }
    preparar()
    {
        this.sprites=[];
        this.aRemover=[];
        this.t0=null;
        this.dt=0;
        this.idAnim = null;
        this.tempo =0;
        this.rodando =true;
    }
}