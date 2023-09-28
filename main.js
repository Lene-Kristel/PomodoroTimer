const html = document.querySelector('html');
const focoBt = document.querySelector('.app__card-button--foco');
const curtoBt = document.querySelector('.app__card-button--curto');
const longoBt = document.querySelector('.app__card-button--longo');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const botoes = document.querySelectorAll('.app__card-button');
const startPauseBt = document.querySelector('#start-pause'); 
const musicaFocoInput = document.querySelector('#alternar-musica');
const iniciarOuPausarBt = document.querySelector('#start-pause span');
const tempoNaTela = document.querySelector('#timer');
var tempoDecorridoEmSegundos = 1500;
var intervaloId = null;
const musica = new Audio('/sons/luna-rise-part-one.mp3');
const audioTempoFinalizado = new Audio('/sons/beep.mp3');
const audioPlay = new Audio('sons/play.wav');
const audioPause = new Audio ('sons/pause.mp3');
musica.loop = true;




focoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 1500;
    alterarContexto('foco');
    focoBt.classList.add('active');
});

curtoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 300;
   alterarContexto('descanso-curto');
   curtoBt.classList.add('active');
});

longoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 900;
    alterarContexto('descanso-longo');
    longoBt.classList.add('active');
});

function alterarContexto(contexto){
    mostrarTempo();
    botoes.forEach(function(contexto){
        contexto.classList.remove('active')
    })
    html.setAttribute('data-contexto', contexto);
    banner.setAttribute('src', `/imagens/${contexto}.png`);
    
    switch(contexto){
        case 'foco':
            titulo.innerHTML = `<h1 class="app__title">Otimize sua produtividade,<br><strong class="app__title-strong">mergulhe no que importa.</strong></h1>`
            break;
        case 'descanso-curto':
            titulo.innerHTML = `<h1 class="app__title">Que tal dar uma respirada? <strong class="app__title-strong">Faça uma pausa curta!</strong></h1>`
            break;
        case 'descanso-longo':
            titulo.innerHTML = `<h1 class="app__title">Hora de voltar à superfície. <strong class="app__title-strong">Faça uma pausa longa.</strong></h1>`
            break;
        default:
            break;
    }

}

musicaFocoInput.addEventListener('change', () => {
    if(musica.paused){
        musica.play();
    } else {
        musica.pause();
    }
})

const contagemRegressiva = () => {
   if(tempoDecorridoEmSegundos <=0){
        audioTempoFinalizado.play();
        alert('Tempo finalizado')
        zerar();
        return
   }
   tempoDecorridoEmSegundos -= 1;
   mostrarTempo();
};

function iniciarOuPausar(){
    if(intervaloId){
        audioPause.play();
        zerar()
        return
    }
    audioPlay.play();
    intervaloId = setInterval(contagemRegressiva,1000);
    iniciarOuPausarBt.textContent = "Pausar"
}

function zerar(){
    audioPause.play();
    clearInterval(intervaloId);
    iniciarOuPausarBt.textContent = "Começar"
    intervaloId = null;
}

startPauseBt.addEventListener('click',iniciarOuPausar);

function mostrarTempo(){
    const tempo = new Date(tempoDecorridoEmSegundos * 1000);
    const tempoFormatado = tempo.toLocaleTimeString('pt-br',{minute: '2-digit', second: '2-digit'});
    tempoNaTela.innerHTML = `${tempoFormatado}`;
}

mostrarTempo();