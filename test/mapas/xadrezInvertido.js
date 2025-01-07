
const Piso = 0;
const Pedra = 1;
const Parede = 2;
const Bau = 3;
const Vazio = 10;

const xadrezInvertido = [
[Pedra, Pedra, Pedra, Pedra, Pedra, Pedra, Pedra, Pedra, Pedra],
[Pedra, Parede, Parede, Parede, Parede, Parede, Parede, Parede, Pedra],
[Pedra, Parede, Piso, Parede, Piso, Parede, Piso, Parede, Pedra],
[Pedra, Parede, Parede, Piso, Parede, Piso, Parede, Parede, Pedra],
[Pedra, Parede, Piso, Parede, Piso, Parede, Piso, Parede, Pedra],
[Pedra, Parede, Parede, Piso, Parede, Piso, Parede, Parede, Pedra],
[Pedra, Parede, Piso, Parede, Piso, Parede, Piso, Parede, Pedra],
[Pedra, Parede, Parede, Parede, Parede, Parede, Parede, Parede, Pedra],
[Pedra, Pedra, Pedra, Pedra, Pedra, Pedra, Pedra, Pedra, Pedra]
];
export default xadrezInvertido;
