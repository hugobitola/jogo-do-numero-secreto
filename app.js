let minimo = parseInt(document.querySelector('input').min);
let maximo = parseInt(document.querySelector('input').max);
let numeroSecreto = NaN;
let tentativas = NaN;
let numerosSorteados = [];
const titulo = 'Jogo do Número Secreto';
const texto = `Escolha um número entre ${minimo} e ${maximo}`;
const botaoReiniciar = document.getElementById('reiniciar');

function verificarChute()
{
  tentativas++;
  let chute = parseInt(document.querySelector('input').value);
  console.log(`chute: ${chute}`);
  console.log(numeroSecreto == chute);

  if(chute == numeroSecreto)
  {
    let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
    let textoInformativo = `Você descobriu o número secreto em ${tentativas} ${palavraTentativa}!`;
    exibeTextoNaTag('h1','Parabéns!');
    exibeTextoNaTag('p', textoInformativo);
    botaoReiniciar.removeAttribute('disabled');
  } else {
    if(chute > numeroSecreto)
    {
      exibeTextoNaTag('p', `O número secreto é menor que ${chute}`);
    } else {
      exibeTextoNaTag('p', `O número secreto é maior que ${chute}`);
    }
    limparCampo('input');
  }
}

function reiniciarJogo()
{
  console.clear();
  console.log('Reiniciar jogo');

  if(numerosSorteados.length >= maximo - minimo + 1) {
    console.log('numerosSorteados lotou! Zera tudo!');
    numerosSorteados = [];
  }

  numeroSecreto = gerarNumeroAleatorioUnico(minimo, maximo, numerosSorteados);
  numerosSorteados.push(parseInt(numeroSecreto));
  numerosSorteados.sort(function(a,b) {return a-b});
  limparCampo('input');
  tentativas = 0;
  exibeTextoNaTag('h1', titulo);
  exibeTextoNaTag('p', texto);
  botaoReiniciar.setAttribute('disabled', true);
  console.log(`Número secreto: ${numeroSecreto}`);
  console.log(`Números já sorteados = [${numerosSorteados}]`);
}

function exibeTextoNaTag(tag, texto)
{
  let campo = document.querySelector(tag);
  campo.innerHTML = texto;
  responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

function limparCampo(campo)
{
  document.querySelector(campo).value = '';
}

function gerarNumeroAleatorio(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function gerarNumeroAleatorioUnico(min, max, lista)
{
  if(lista.length >= max - min + 1)
  {
    console.log('Lista lotada! Zerando...');
    lista = [];
  }

  let candidato = gerarNumeroAleatorio(min, max);
  if(lista.includes(candidato))
  {
    console.log(`candidato: ${candidato} já existe!`);
    return gerarNumeroAleatorioUnico(min, max, lista);
  }

  console.log(`novo número: ${candidato}`);
  return candidato;
}

reiniciarJogo();