import Cena from "./Cena.js";

export default class CenaFim extends Cena
{
    desenhar()
    {
        this.ctx.fillStyle = "black";
        this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height);
        this.ctx.font ="20px Impact"
        this.ctx.fillStyle = "red";
        this.ctx.textAlign = "center";
        this.ctx.fillText("Fim de Jogo",this.canvas.width/2,this.canvas.height/2-40);
        this.ctx.fillStyle = "yellow";
        this.ctx.fillText(`Pontuação :${(this.game.pontuacao)}`,this.canvas.width/2,this.canvas.height/2);
        this.ctx.fillText(`Baus :${(this.game.chests)}`,this.canvas.width/2,this.canvas.height/2+40);
        this.ctx.fillText(`Moedas :${(this.game.stars)}`,this.canvas.width/2,this.canvas.height/2+80);
        this.ctx.fillText(`Eliminações :${(this.game.eliminacoes)}`,this.canvas.width/2,this.canvas.height/2+120);
        if(this.assets.acabou())
        {
            this.ctx.fillText("Aperte espaço para jogar novamente",this.canvas.width/2,this.canvas.height/2+160);
        }
    }

    quadro(t)
    {
        this.t0 = this.t0 ?? t;
        this.dt = (t-this.t0)/1000;

        if(this.assets.acabou())
        {
            if(this.input.comandos.get("PROXIMA_CENA"))
            {
                this.game.pontuacao = 0;
                this.game.chests = 0;
                this.game.stars = 0;
                this.game.selecionaCena("jogo");
                return;
            }
        }
        this.desenhar();

        this.t0 = t;
        this.iniciar();
    }
}