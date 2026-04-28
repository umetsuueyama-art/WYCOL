const perguntas = [ 
    { pergunta: "Você gosta de bebidas alcoólicas?",
        alternativa:[
            {resposta: "Sim", lane: "top"},
            {resposta: "Não", lane: "jg"},
            {resposta: "Nunca provei", lane: "sup"},
            {resposta: "Meio termo", lane: "mid"},
            {resposta: "Prefiro não comentar",lane: "adc"}] },

    { pergunta: "Qual estilo de roupa você usaria",
    alternativa: [ 
        {resposta: "Mandrake", lane: "top"},
        {resposta: "Gotigo", lane: "mid"},
        {resposta: "Social", lane: "sup"},
        {resposta: "Alternativo", lane: "adc"},
        {resposta: "Skatista", lane: "jg"} ] },

    { pergunta: "Qual tipo de comida você prefere",
    alternativa: [ 
        {resposta: "Picante", lane: "top"},
        {resposta: "Salgada", lane: "adc"},
        {resposta: "Doce", lane: "sup"},
        {resposta: "Azedo", lane: "mid"},
        {resposta: "Amargo", lane: "jg"} ] },

    { pergunta: "Você é um policial e um desconhecido é refém de um marginal. O que você faz?",
    alternativa: [ 
        {resposta: "Atiro sem pensar", lane: "top"},
        {resposta: "Negocio", lane: "mid"},
        {resposta: "Chamo reforços", lane: "adc"},
        {resposta: "Entrego o que o marginal quer", lane: "sup"},
        {resposta: "Penso em outra alternativa", lane: "jg"} ] },

    { pergunta: "Quem você mais ama na sua casa?",
    alternativa: [ 
        {resposta: "Sua mãe", lane: "sup"},
        {resposta: "Seu pai", lane: "top"},
        {resposta: "Sua irmã", lane: "mid"},
        {resposta: "Seu irmão", lane: "adc"},
        {resposta: "Seu pet", lane: "jg"} ] }, 

    {pergunta: "Seu amigo precisa de dinheiro. O que você faz?",
    alternativa: [
        {resposta: "Dou", lane: "sup"},
        {resposta: "Empresto", lane: "mid"},
        {resposta: "Nego", lane: "top"},
        {resposta: "Dou uma desculpa", lane: "adc"},
        {resposta: "Ignoro ele", lane: "jg"} ] },

    { pergunta: "Se você fosse o protagonista de um mundo ficticio como você se comportaria",
    alternativa: [
        {resposta: "Egocentrico", lane: "adc"},
        {resposta: "Humilde", lane: "top"},
        {resposta: "Autoritario", lane: "jg"},
        {resposta: "Reservado", lane: "mid"},
        {resposta: "Amigavel", lane: "sup"} ] },

    { pergunta: "Escolha um das alternativas:",
    alternativa: [
        {resposta: "Pedra", lane: "top"},
        {resposta: "Água", lane: "sup"},
        {resposta: "Arco e flecha", lane: "adc"},
        {resposta: "Alcool", lane: "jg"},
        {resposta: "Binoculos", lane: "mid"} ] },

    { pergunta: "Escolha um beneficio e um maleficio",
    alternativa: [
        {resposta: "Sou forte, porem grande e pesado", lane: "top"},
        {resposta: "Sou muito furtivo no nivel que as pessoas não me notam mesmo eu querendo", lane: "jg"},
        {resposta: "Sempre consigo estar no controle, mas me acham isurpotavel", lane: "adc"},
        {resposta: "Posso entrar em qualquer lugar sem pagar, porém nunca gosto desses lugares", lane: "mid"},
        {resposta: "Sou tecnico de infermagem", lane: "sup"} ] },

    { pergunta: "Quando estou triste...",
    alternativa: [ {resposta: "Me isolo", lane: "mid"},
        {resposta: "Finjo estar feliz", lane: "top"},
        {resposta: "Choro", lane: "sup"},
        {resposta: "Pratico um hooby", lane: "jg"},
        {resposta: "Desabafo", lane: "adc"} ] },

    { pergunta: "Qual estilo de musica você mais gosta?",
    alternativa: [
        {resposta: "Rock", lane: "mid"},
        {resposta: "Funk", lane: "top"},
        {resposta: "Trap", lane: "jg"},
        {resposta: "Sertanejo", lane: "adc"},
        {resposta: "Pop", lane: "sup"} ] } 
];

const perguntaElemento = document.querySelector(".pergunta");

const botoes = [
    document.querySelector("#alternativa-a"),
    document.querySelector("#alternativa-b"),
    document.querySelector("#alternativa-c"),
    document.querySelector("#alternativa-d"),
    document.querySelector("#alternativa-e")
];

let perguntaAtual = 0;

let pontos = {
    top: 0,
    jg: 0,
    mid: 0,
    adc: 0,
    sup: 0
};

function mostrarPergunta() {
    const p = perguntas[perguntaAtual];

    perguntaElemento.textContent = p.pergunta;

    botoes.forEach((botao, index) => {
        botao.textContent = p.alternativa[index].resposta;
    });
}

botoes.forEach((botao, index) => {
    botao.addEventListener("click", () => {
        const escolha = perguntas[perguntaAtual].alternativa[index];
        pontos[escolha.lane]++;

        perguntaAtual++;

        if (perguntaAtual < perguntas.length) {
            mostrarPergunta();
        } else {
            mostrarResultadoFinal();
        }
    });
});

function mostrarResultadoFinal() {
    const total = Object.values(pontos).reduce((a, b) => a + b, 0);

    let maiorLane = "";
    let maiorValor = 0;

    let resultadoTexto = "";

    for (let lane in pontos) {
        let porcentagem = (pontos[lane] / total) * 100;

        resultadoTexto += `${lane.toUpperCase()}: ${porcentagem.toFixed(1)}%\n`;

        if (pontos[lane] > maiorValor) {
            maiorValor = pontos[lane];
            maiorLane = lane;
        }
    }

    const textoFinal = `🎉 Você é ${maiorLane.toUpperCase()}!\n\n${resultadoTexto}`;

    abrirModal(textoFinal);
}

function abrirModal(texto) {
    document.getElementById("resultado-texto").innerText = texto;
    document.getElementById("resultado-modal").style.display = "flex";
    soltarConfete();
}

function fecharModal() {
    document.getElementById("resultado-modal").style.display = "none";
}

function soltarConfete() {
    const canvas = document.getElementById("confetti");
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let confetes = [];

    for (let i = 0; i < 150; i++) {
        confetes.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height - canvas.height,
            size: Math.random() * 5 + 2,
            speed: Math.random() * 3 + 2
        });
    }

    function animar() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        confetes.forEach(c => {
            c.y += c.speed;
            ctx.fillStyle = `hsl(${Math.random()*360},100%,50%)`;
            ctx.fillRect(c.x, c.y, c.size, c.size);
        });

        requestAnimationFrame(animar);
    }

    animar();
}

mostrarPergunta();