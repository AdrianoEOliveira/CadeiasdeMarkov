export default class Sprite
{
    //E responsável por modelar algo que se move na tela
    constructor({x=100,y=100,w=20,h=20,color="white",vx=0,vy=0,controlar = ()=>{}}={})
    {
        this.x=x;
        this.y=y;
        this.vx=vx;
        this.vy=vy;
        this.w=w;
        this.h=h;
        this.color=color;
        this.cena=null;
        this.mx=0;
        this.my=0;
        this.controlar = controlar;
        this.tags = new Set();
    }
    desenhar(ctx)
    {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x- this.w/2,this.y-this.h/2,this.w,this.h);
        ctx.strokeStyle = "yellow";
        ctx.strokeRect(this.mx*this.cena.mapa.TAMANHO,
            this.my*this.cena.mapa.TAMANHO,
            this.cena.mapa.TAMANHO,
            this.cena.mapa.TAMANHO);
    }
    controlar(dt)
    {

    }
    mover(dt)
    {        
        this.x = this.x + this.vx*dt;
        this.y = this.y + this.vy*dt;
        this.mx=Math.floor(this.x/this.cena.mapa.TAMANHO);
        this.my=Math.floor(this.y/this.cena.mapa.TAMANHO);

    }
    passo(dt)
    {
        this.controlar(dt);
        this.mover(dt);

    }
    colidiuCom(outro)
    {
        return !((this.x-this.w/2>outro.x+outro.w/2)
            ||(this.x+this.w/2<outro.x-outro.w/2)
            ||(this.y-this.h/2>outro.y+outro.h/2)
            ||(this.y+this.h/2<outro.y-outro.h/2))
    }
    AplicaRestrições()
    {
        this.AplicaRestriçõesDireita(this.mx+1,this.my-1);
        this.AplicaRestriçõesDireita(this.mx+1,this.my);
        this.AplicaRestriçõesDireita(this.mx+1,this.my+1);

        this.AplicaRestriçõesEsquerda(this.mx-1,this.my+1)
        this.AplicaRestriçõesEsquerda(this.mx-1,this.my)
        this.AplicaRestriçõesEsquerda(this.mx-1,this.my-1)

        this.AplicaRestriçõesBaixo(this.mx+1,this.my+1);
        this.AplicaRestriçõesBaixo(this.mx,this.my+1);
        this.AplicaRestriçõesBaixo(this.mx-1,this.my+1);

        this.AplicaRestriçõesCima(this.mx+1,this.my-1);
        this.AplicaRestriçõesCima(this.mx,this.my-1);
        this.AplicaRestriçõesCima(this.mx-1,this.my-1);
    }
    AplicaRestriçõesDireita(pmx,pmy)
    {
        const size = this.cena.mapa.TAMANHO;
        if(this.vx>0)
        {

            if(this.cena.mapa.tiles[pmy][pmx]==1)
            {
                const tile = {x:(pmx*size)+(size/2),
                y:(pmy*size)+(size/2),
                w:size,
                h:size}
                if(this.colidiuCom(tile))
                {
                this.vx = 0;
                this.x=tile.x-tile.w/2-this.w/2-1;
                if(this.tags.has("pc"))
                {
                this.cena.assets.play("hurt");
                }
                }
            }
            if(this.cena.mapa.tiles[pmy][pmx]==3)
            {
                const tile = {x:(pmx*size)+(size/2),
                y:(pmy*size)+(size/2),
                w:size,
                h:size}
                if(this.colidiuCom(tile))
                {
                this.vx = 0;
                this.x=tile.x-tile.w/2-this.w/2-1;
                if(this.tags.has("pc"))
                {
                this.cena.assets.play("hurt");
                }
                }
            }
                else
                {
                    if(this.tags.has("pc"))
                    {
                    if(this.cena.mapa.tiles[pmy][pmx]==2)
                    {
                        const tile = {x:(pmx*size)+(size/2),
                            y:(pmy*size)+(size/2),
                            w:size,
                            h:size}
                            if(this.colidiuCom(tile))
                            {
                                this.cena.mapa.tiles[pmy][pmx]=0;
                                this.cena.game.pontuacao++;
                                this.cena.game.chests++;
                            }
                        }
                    }
                    if(this.cena.mapa.tiles[pmy][pmx]==5)
                    {
                        const tile = {x:(pmx*size)+(size/2),
                        y:(pmy*size)+(size/2),
                        w:size,
                        h:size}
                        if(this.colidiuCom(tile))
                        {
                            this.cena.game.pontuacao = this.cena.game.pontuacao +2;
                            this.cena.game.stars++;
                        }
                    }
                }
            }
        }
    AplicaRestriçõesEsquerda(pmx,pmy)
    {
        const size = this.cena.mapa.TAMANHO;
        if(this.vx<0)
        {

            if(this.cena.mapa.tiles[pmy][pmx]==1)
            {
                const tile = {x:(pmx*size)+(size/2),
                y:(pmy*size)+(size/2),
                w:size,
                h:size}
                if(this.colidiuCom(tile))
                {
                this.vx = 0;
                this.x=tile.x+tile.w/2+this.w/2+1;
                if(this.tags.has("pc"))
                {
                this.cena.assets.play("hurt");
                }
                }
            }
            if(this.cena.mapa.tiles[pmy][pmx]==3)
            {
                const tile = {x:(pmx*size)+(size/2),
                y:(pmy*size)+(size/2),
                w:size,
                h:size}
                if(this.colidiuCom(tile))
                {
                this.vx = 0;
                this.x=tile.x+tile.w/2+this.w/2+1;
                if(this.tags.has("pc"))
                {
                this.cena.assets.play("hurt");
                }
                }
            }
                else
                {
                    if(this.tags.has("pc"))
                    {
                    if(this.cena.mapa.tiles[pmy][pmx]==2)
                    {
                        const tile = {x:(pmx*size)+(size/2),
                            y:(pmy*size)+(size/2),
                            w:size,
                            h:size}
                            if(this.colidiuCom(tile))
                            {
                                this.cena.mapa.tiles[pmy][pmx]=0;
                                this.cena.game.pontuacao++;
                                this.cena.game.chests++;
                            }
                        }
                        if(this.cena.mapa.tiles[pmy][pmx]==5)
                        {
                            const tile = {x:(pmx*size)+(size/2),
                            y:(pmy*size)+(size/2),
                            w:size,
                            h:size}
                            if(this.colidiuCom(tile))
                            {
                                this.cena.game.pontuacao = this.cena.game.pontuacao +2;
                                this.cena.game.stars++

                            }
                        }
                    }
                }
            }
        }
    AplicaRestriçõesBaixo(pmx,pmy)
    {
        const size = this.cena.mapa.TAMANHO;
        if(this.vy>0)
        {

            if(this.cena.mapa.tiles[pmy][pmx]==1)
            {
                const tile = {x:(pmx*size)+(size/2),
                y:(pmy*size)+(size/2),
                w:size,
                h:size}
                if(this.colidiuCom(tile))
                {
                this.vy = 0;
                this.y=tile.y-tile.h/2-this.h/2-1;
                if(this.tags.has("pc"))
                {
                this.cena.assets.play("hurt");
                }
                }
            }
            if(this.cena.mapa.tiles[pmy][pmx]==3)
            {
                const tile = {x:(pmx*size)+(size/2),
                y:(pmy*size)+(size/2),
                w:size,
                h:size}
                if(this.colidiuCom(tile))
                {
                this.vy = 0;
                this.y=tile.y-tile.h/2-this.h/2-1;
                if(this.tags.has("pc"))
                {
                this.cena.assets.play("hurt");
                }
                }
            }
            else
                {
                    {
                    if(this.tags.has("pc"))
                    {
                        if(this.cena.mapa.tiles[pmy][pmx]==2)
                        {
                            const tile = {x:(pmx*size)+(size/2),
                            y:(pmy*size)+(size/2),
                            w:size,
                            h:size}
                            if(this.colidiuCom(tile))
                            {
                                this.cena.mapa.tiles[pmy][pmx]=0;
                                this.cena.game.pontuacao++;
                                this.cena.game.chests++;
                            }
                        }
                        if(this.cena.mapa.tiles[pmy][pmx]==5)
                        {
                            const tile = {x:(pmx*size)+(size/2),
                            y:(pmy*size)+(size/2),
                            w:size,
                            h:size}
                            if(this.colidiuCom(tile))
                            {
                                this.cena.game.pontuacao = this.cena.game.pontuacao +2;
                                this.cena.game.stars++
                            }
                        }
                    }
                }
            }
        }
    }
    AplicaRestriçõesCima(pmx,pmy)
    {
        const size = this.cena.mapa.TAMANHO;
        if(this.vy<0)
        {

            if(this.cena.mapa.tiles[pmy][pmx]==1)
            {
                const tile = {x:(pmx*size)+(size/2),
                y:(pmy*size)+(size/2),
                w:size,
                h:size}
                if(this.colidiuCom(tile))
                {
                this.vy = 0;
                this.y=tile.y+tile.h/2+this.h/2+1;
                if(this.tags.has("pc"))
                {
                this.cena.assets.play("hurt");
                }
                }
            }
            if(this.cena.mapa.tiles[pmy][pmx]==3)
            {
                const tile = {x:(pmx*size)+(size/2),
                y:(pmy*size)+(size/2),
                w:size,
                h:size}
                if(this.colidiuCom(tile))
                {
                this.vy = 0;
                this.y=tile.y+tile.h/2+this.h/2+1;
                if(this.tags.has("pc"))
                {
                this.cena.assets.play("hurt");
                }
                }
            }
            
            else
            {
                if(this.tags.has("pc"))
                {
                    if(this.cena.mapa.tiles[pmy][pmx]==2)
                    {
                        const tile = {x:(pmx*size)+(size/2),
                            y:(pmy*size)+(size/2),
                            w:size,
                            h:size}
                            if(this.colidiuCom(tile))
                            {
                                this.cena.mapa.tiles[pmy][pmx]=0;
                                this.cena.game.pontuacao++;
                                this.cena.game.chests++;
                            }
                    }
                    if(this.cena.mapa.tiles[pmy][pmx]==5)
                    {
                        const tile = {x:(pmx*size)+(size/2),
                        y:(pmy*size)+(size/2),
                        w:size,
                        h:size}
                        if(this.colidiuCom(tile))
                        {
                            this.cena.game.pontuacao = this.cena.game.pontuacao +2;
                            this.cena.game.stars++
                            
                        }
                    }
                }
            }
            }
        }
    reposicionar()
    {        //Reposiciona sprite em uma posição aleatoria valida e Muda velocidades
        let Invalido = 1;
        let xa ,ya;
        while(Invalido ===1)
        {
        xa = Math.floor(Math.random() * 11*32) + 64 ;
        let mx=Math.floor(xa/this.cena.mapa.TAMANHO);
        ya = Math.floor(Math.random() * 11*32) + 64 ;
        let my=Math.floor(ya/this.cena.mapa.TAMANHO);
            if(mx<15 && my <15)
            {
                if(this.cena.mapa.tiles[my][mx]!=1)
                {
                    Invalido = 0;
                }
            }
        }
        this.x = xa;
        this.y = ya;

        let vxa = Math.floor(Math.random() * 11);
        let positivoOuNegativo =Math.floor(Math.random() * 10) +1;
        vxa = vxa * Math.pow(-1,positivoOuNegativo);
        let vya = Math.floor(Math.random() * 11);
        positivoOuNegativo =Math.floor(Math.random() * 10) +1;
        vya = vya * Math.pow(-1,positivoOuNegativo);
        this.vx=vxa;
        this.vy = vya;
    }
}