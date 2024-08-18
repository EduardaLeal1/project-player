//------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Seleciona elementos do DOM para atualizar a interface da música:
// Esses elementos são usados para exibir a capa da música, o nome da música e o nome do artista na interface do usuário.
const capaMusica = document.getElementById('capa-musica');
const nomeMusica = document.getElementById('nome-musica');
const artistaMusica = document.getElementById('artista-musica');

// Seleciona botões de controle da reprodução:
// Esses botões permitem ao usuário controlar a reprodução da música: play, pause, próximo e anterior.
const buttonPlay = document.querySelector('#play');
const buttonPause = document.querySelector('#pause');
const buttonNext = document.querySelector('#next');
const buttonPrevious = document.querySelector('#previous');

// Seleciona elementos da barra de progresso e tempo da música:
// Esses elementos são usados para mostrar o progresso da música, o tempo atual e o tempo total da música na interface do usuário.
const progressBar = document.getElementById("progressBar");
const tempoAtual = document.getElementById("tempoAtual");
const tempoTotal = document.getElementById("tempoTotal");
//--------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// Define um array com os dados das músicas (nome, artista, capa e caminho do arquivo de áudio)
//Array: é uma estrutura de dados que armazena uma coleção de elementos, geralmente do mesmo tipo, em uma sequência ordenada. 
// O array 'musicas' contém objetos com as informações de cada música, incluindo o nome, o artista, o caminho da imagem da capa e o caminho do arquivo de áudio.
const musicas = [
  {
    nome: 'Computadores fazem arte',
    artista: 'Chico Science, Nação Zumbi',
    capaPath: 'fundo-musica1.png',
    musicaPath: 'Computadores-Fazem-Arte.mp3'
  },
  {
    nome: 'Dorival',
    artista: 'Academia da Berlinda',
    capaPath: 'fundo-musica2.png',
    musicaPath: 'Dorival.mp3'
  },
  {
    nome: 'Um sonho',
    artista: 'Nação Zumbi',
    capaPath: 'um-sonho.jpg',
    musicaPath: 'Um-Sonho.mp3'
  }
]//Criei um array "musicas" que contém três objetos.
//Cada objeto representa uma música e possui quatro propriedades: nome, artista, capaPath e musicaPath.
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// Variável que armazena a instância do objeto Audio e índice da música atual
let music;

//Variável criada para definir a primeira música a ser inicializada no array
let indexMusicaAtual = 0; 

//variável que armazenará um identificador de intervalo de tempo
let interval;

//inicializa a música que será reproduzida assim que o player é carregado
setMusic(indexMusicaAtual)
//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

//função resposável por configurar a música que será reproduzida com base no índice fornecido
function setMusic(index) {

// Verifica se o índice é menor que 0
  if (index < 0) {
// Se for menor que 0, define indexMusicaAtual como o último índice do array
    indexMusicaAtualaAtual = --musicas.length;
  }
// Verifica se o índice é maior ou igual ao comprimento do array  
  if (index >= musicas.length) {
// Se for maior ou igual ao comprimento do array, redefine indexMusicaAtual para 0
    indexMusicaAtual = 0;
  }

// Atualiza o elemento HTML responsável por exibir o artista da música com o nome do artista da música atual no array 'musicas'
  artistaMusica.innerHTML = musicas[indexMusicaAtual].artista
// Atualiza o elemento HTML responsável por exibir o nome da música com o nome da música atual no array 'musicas'
  nomeMusica.innerHTML = musicas[indexMusicaAtual].nome
// Atualiza o atributo 'src' do elemento HTML de imagem responsável por exibir a capa da música com o caminho da capa da música atual no array 'musicas'
  capaMusica.setAttribute('src', musicas[indexMusicaAtual].capaPath)

//Instancia criada para a variável music. Esta instância será usada para controlar a reprodução da música (tocar, pausar, etc.)
  music = new Audio(musicas[indexMusicaAtual].musicaPath);
}

//função para calcular e indicar o tempo de cada musica em min e seg
function formatarTempo(segundos) {
  const min = Math.floor(segundos / 60);
  const seg = Math.floor(segundos % 60);
  return `${min.toString().padStart(2, '0')}:${seg.toString().padStart(2, '0')}`;
}

//função para atualizar o tempo de musica percorrido crescentemente e regressivamente
function updateMusicTime() {

//Calcula o tempo decorrido progressivamente
    const progresso = (music.currentTime / music.duration) * 100;
    progressBar.value = progresso;
    tempoAtual.textContent = formatarTempo(music.currentTime);
  
//Calcula o tempo decorrido regressivamente
  const tempoDecorridoRegressivo = music.duration - music.currentTime;
  tempoTotal.textContent = formatarTempo(tempoDecorridoRegressivo);
  }

//função para troca de botões play e pause
  function play() {
//Oculta o botão de reprodução
    buttonPlay.classList.add('hide');
// Exibe o botão de pausa
    buttonPause.classList.remove('hide');
// Define um intervalo para atualizar o tempo decorrido da música
    music.play();
    interval = setInterval(updateMusicTime, 1000);
  }
  
// Evento para a proxima musica reproduzir automaticamente assim que a atual encerrar. 
//Adiciona um ouvinte de evento para a música
  music.addEventListener('ended', () => {
// Pausa a música atual
    pause();
    // Avança para a próxima música no array de músicas
    setMusic(++indexMusicaAtual);
    // Inicia a reprodução da nova música
    play();
  });
  
  function pause() {
// Exibe o botão de reprodução
    buttonPlay.classList.remove('hide');
// Oculta o botão de pausa
    buttonPause.classList.add('hide');
// Pausa a reprodução da música
    music.pause();
  }

//----------------------------------------------------------------------------------------------------------------------------------------------------------------------

//Adiciona um evento de clique ao botão de reprodução
buttonPlay.addEventListener('click', play);

//Adiciona um evento de clique ao botão de pausa
buttonPause.addEventListener('click', pause);

//Eventos de clique nos botões "Próximo" e "Anterior"
buttonNext.addEventListener('click', () => {

// Pausa a reprodução atual da música
  pause();
// Avança para a próxima música no array de músicas
  setMusic(++indexMusicaAtual);
// Inicia a reprodução da nova música
  play();
});

buttonPrevious.addEventListener('click', () => {
//pausa a musica atual
  pause();
// Retrocede para a música anterior no array de músicas
  setMusic(--indexMusicaAtual); 
//reproduz a nova musica
  play();
});

//Evento que mostra o tempo total da música assim que os metadados da música são carregados
music.addEventListener('loadedmetadata', function () {
  tempoTotal.textContent = formatarTempo(music.duration);
});
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------
