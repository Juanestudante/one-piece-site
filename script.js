// ---------- DADOS ----------
// Só texto. Se quiser imagens, use desenhos SEUS e coloque em /img
const crew = [
  { id: "luffy",   nome: "Luffy",   funcao: "Capitão",       cor: "#d9483b", sonho: "Se tornar o Rei dos Piratas", sobre: "Otimista e impulsivo, é o que puxa todo mundo pra aventura." },
  { id: "zoro",    nome: "Zoro",    funcao: "Espadachim",    cor: "#2e7d4f", sonho: "Ser o maior espadachim do mundo", sobre: "Focado e leal. Vive treinando e tem péssimo senso de direção." },
  { id: "nami",    nome: "Nami",    funcao: "Navegadora",    cor: "#e07a1f", sonho: "Desenhar o mapa do mundo inteiro", sobre: "Lê o clima como ninguém e cuida do dinheiro do grupo." },
  { id: "usopp",   nome: "Usopp",   funcao: "Atirador",      cor: "#8a6a2b", sonho: "Ser um bravo guerreiro do mar", sobre: "Criativo, inventa gadgets e conta histórias exageradas." },
  { id: "sanji",   nome: "Sanji",   funcao: "Cozinheiro",    cor: "#2b5fa8", sonho: "Encontrar o All Blue", sobre: "Cozinha pra todo mundo e luta usando só os chutes." },
  { id: "chopper", nome: "Chopper", funcao: "Médico",        cor: "#c2578a", sonho: "Curar qualquer doença", sobre: "Estudioso e fofo, é o cara que cuida de toda a tripulação." },
  { id: "robin",   nome: "Robin",   funcao: "Arqueóloga",    cor: "#5b3f8f", sonho: "Descobrir a história verdadeira do mundo", sobre: "Calma e curiosa, vive atrás de ruínas e livros antigos." },
  { id: "franky",  nome: "Franky",  funcao: "Carpinteiro",   cor: "#1f9bb8", sonho: "Levar o navio até o fim do mundo", sobre: "Construtor barulhento, transforma qualquer ideia em máquina." },
  { id: "brook",   nome: "Brook",   funcao: "Músico",        cor: "#444b57", sonho: "Reencontrar a baleia Laboon", sobre: "Toca violino, faz piada de si mesmo e é bem experiente." },
  { id: "jinbe",   nome: "Jinbe",   funcao: "Timoneiro",     cor: "#3a7ca5", sonho: "Unir humanos e povo-peixe", sobre: "Sério e sábio, mestre do caratê dos homens-peixe." }
];

// ---------- TRIPULAÇÃO ----------
const grid = document.getElementById("grid");
const filters = document.getElementById("filters");
const modal = document.getElementById("modal");
const modalBody = document.getElementById("modal-body");

const funcoes = ["Todos", ...new Set(crew.map(c => c.funcao))];
let filtro = "Todos";

function renderFiltros() {
  filters.innerHTML = "";
  funcoes.forEach(f => {
    const b = document.createElement("button");
    b.textContent = f;
    b.setAttribute("aria-pressed", f === filtro);
    b.onclick = () => { filtro = f; renderFiltros(); renderCards(); };
    filters.appendChild(b);
  });
}

function renderCards() {
  grid.innerHTML = "";
  crew.filter(c => filtro === "Todos" || c.funcao === filtro).forEach(c => {
    const card = document.createElement("button");
    card.className = "card";
    card.innerHTML = `
      <div class="avatar" style="background:${c.cor}">${c.nome[0]}</div>
      <h3>${c.nome}</h3>
      <span>${c.funcao}</span>`;
    card.onclick = () => abrirModal(c);
    grid.appendChild(card);
  });
}

function abrirModal(c) {
  modalBody.innerHTML = `
    <h3>${c.nome}</h3>
    <dl>
      <dt>Função</dt><dd>${c.funcao}</dd>
      <dt>Sonho</dt><dd>${c.sonho}</dd>
      <dt>Sobre</dt><dd>${c.sobre}</dd>
    </dl>`;
  modal.showModal();
}

document.getElementById("close").onclick = () => modal.close();
modal.addEventListener("click", e => { if (e.target === modal) modal.close(); });

renderFiltros();
renderCards();

// ---------- QUIZ ----------
const perguntas = [
  { q: "Sexta à noite, você prefere:", o: [
    ["Sair pra aventura sem plano", "luffy"], ["Treinar até cansar", "zoro"],
    ["Organizar o rolê e a grana", "nami"], ["Contar uma história exagerada", "usopp"] ] },
  { q: "No projeto de grupo da faculdade, você é quem:", o: [
    ["Puxa a galera na bagunça", "luffy"], ["Entrega quieto, sem reclamar", "zoro"],
    ["Cuida do cronograma", "nami"], ["Cuida de todo mundo", "chopper"] ] },
  { q: "Sua maior qualidade:", o: [
    ["Coragem", "luffy"], ["Foco", "zoro"], ["Esperteza", "nami"], ["Criatividade", "usopp"] ] },
  { q: "No rolê, você é quem:", o: [
    ["Cozinha pra todo mundo", "sanji"], ["Dorme em qualquer lugar", "zoro"],
    ["Vira o médico do grupo", "chopper"], ["Conta vantagem", "usopp"] ] }
];

const box = document.getElementById("quiz-box");
let passo = 0;
let pontos = {};

function mostrarPergunta() {
  const p = perguntas[passo];
  box.innerHTML = `
    <div class="progress"><i style="width:${(passo / perguntas.length) * 100}%"></i></div>
    <p class="q-title">${p.q}</p>
    <div class="opts"></div>`;
  const opts = box.querySelector(".opts");
  p.o.forEach(([texto, id]) => {
    const b = document.createElement("button");
    b.textContent = texto;
    b.onclick = () => {
      pontos[id] = (pontos[id] || 0) + 1;
      passo++;
      passo < perguntas.length ? mostrarPergunta() : mostrarResultado();
    };
    opts.appendChild(b);
  });
}

function mostrarResultado() {
  const vencedor = Object.entries(pontos).sort((a, b) => b[1] - a[1])[0][0];
  const c = crew.find(x => x.id === vencedor);
  box.innerHTML = `
    <div class="result">
      <p>Você seria:</p>
      <h3>${c.nome}</h3>
      <p><strong>${c.funcao}</strong>. ${c.sobre}</p>
      <p>Sonho: ${c.sonho}</p>
      <br><button class="again">Fazer de novo</button>
    </div>`;
  box.querySelector(".again").onclick = () => { passo = 0; pontos = {}; mostrarPergunta(); };
}

mostrarPergunta();