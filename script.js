// Seleciona o canvas e obtém o contexto 2D para desenhar
const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');

// Define o tamanho de cada bloco da cobra e da comida
const box = 20;

// Inicializa a cobra com uma única posição
let snake = [
  { x: 9 * box, y: 10 * box }, // Posição inicial da cabeça
];

// Define a direção inicial da cobra
let direction = 'RIGHT';

// Gera a primeira comida em uma posição aleatória
let food = {
  x: Math.floor(Math.random() * 19 + 1) * box,
  y: Math.floor(Math.random() * 19 + 1) * box,
};

// Inicializa a pontuação
let score = 0;

// Seleciona o elemento de pontuação no HTML
const scoreElement = document.getElementById('score');

// Seleciona o botão de reiniciar
const restartButton = document.getElementById('restart-button');

// Adiciona um listener para capturar as teclas pressionadas
document.addEventListener('keydown', directionControl);

// Função para controlar a direção da cobra com base nas teclas
function directionControl(event) {
  const key = event.keyCode;
  if (key === 37 && direction !== 'RIGHT') {
    direction = 'LEFT';
  } else if (key === 38 && direction !== 'DOWN') {
    direction = 'UP';
  } else if (key === 39 && direction !== 'LEFT') {
    direction = 'RIGHT';
  } else if (key === 40 && direction !== 'UP') {
    direction = 'DOWN';
  }
}

// Função para verificar colisões da cabeça com o corpo
function collision(head, array) {
  // Inicia a verificação a partir do índice 1 para ignorar a cabeça
  for (let i = 1; i < array.length; i++) {
    if (head.x === array[i].x && head.y === array[i].y) {
      return true;
    }
  }
  return false;
}

// Função principal que desenha e atualiza o jogo
function draw() {
  // Limpa o canvas a cada quadro
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Desenha a cobra
  for (let i = 0; i < snake.length; i++) {
    // Define a cor da cabeça e do corpo
    ctx.fillStyle = i === 0 ? '#32CD32' : '#32CD32';
    ctx.fillRect(snake[i].x, snake[i].y, box, box);

    // Define a cor da borda
    ctx.strokeStyle = '#2a5298';
    ctx.strokeRect(snake[i].x, snake[i].y, box, box);
  }

  // Desenha a comida
  ctx.fillStyle = '#FF0000';
  ctx.fillRect(food.x, food.y, box, box);

  // Cria a nova cabeça com base na direção
  let head = { ...snake[0] };

  if (direction === 'LEFT') head.x -= box;
  if (direction === 'UP') head.y -= box;
  if (direction === 'RIGHT') head.x += box;
  if (direction === 'DOWN') head.y += box;

  // Verifica se a cobra comeu a comida
  if (head.x === food.x && head.y === food.y) {
    score++; // Incrementa a pontuação
    scoreElement.textContent = score; // Atualiza a pontuação no HTML

    // Gera uma nova comida em uma posição aleatória
    food = {
      x: Math.floor(Math.random() * 19 + 1) * box,
      y: Math.floor(Math.random() * 19 + 1) * box,
    };
  } else {
    // Remove a última parte da cobra se não comeu a comida
    snake.pop();
  }

  // Adiciona a nova cabeça ao início da cobra
  snake.unshift(head);

  // Verifica colisões com as paredes ou consigo mesma
  if (
    head.x < 0 ||
    head.x >= canvas.width ||
    head.y < 0 ||
    head.y >= canvas.height ||
    collision(head, snake)
  ) {
    clearInterval(game); // Para o jogo
  }
}

// Inicia o jogo com um intervalo de 100ms para atualizar a tela
let game = setInterval(draw, 100);

// Adiciona um listener para o botão de reiniciar
restartButton.addEventListener('click', () => {
  // Reinicia as variáveis do jogo
  snake = [{ x: 9 * box, y: 10 * box }];
  direction = 'RIGHT';
  food = {
    x: Math.floor(Math.random() * 19 + 1) * box,
    y: Math.floor(Math.random() * 19 + 1) * box,
  };
  score = 0;
  scoreElement.textContent = score;

  // Reinicia o intervalo do jogo
  clearInterval(game);
  game = setInterval(draw, 100);
});
