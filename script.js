const questions = [
  {
      question: "x + 7 = 10",
      options: ["7", "3", "-3", "10"],
      answer: "3"
  },
  {
      question: "x + 28 = 11",
      options: ["39", "17", "-17", "28"],
      answer: "-17"
  },
    {
          question: "2x - 4 = 6",
          options: ["-5", "+5", "-4", "+6"],
          answer: "+5"
      },
    {
          question: "9x  + 2 = 10 + 5x",
          options: ["-2", "+5", "+9", "+2"],
          answer: "+2"
      },
    {
          question: "3x - 4 = 2x + 8",
          options: ["-12", "+3", "+12", "+2"],
          answer: "+12"
      },
    {
          question: "6x =2x +  16",
          options: ["2", "+4", "-4", "-2"],
          answer: "+4"
      },
    {
          question: "4x + 7 = 7x - 2",
          options: ["+3", "-3", "-9", "+9"],
          answer: "+3"
      },
    {
          question: "3x – 2 = 4x + 9",
          options: ["+11", "-11", "+7", "-7"],
          answer: "-11"
      },
    {
          question: "5x + 4 = 3x – 2x + 4",
          options: ["+3", "-8", "0", "+8"],
          answer: "0"
      },
    {
          question: "3x -2x -8 = 0",
          options: ["+8", "-8", "+4", "-4"],
          answer: "+8"
      }
];

let currentQuestionIndex = 0;
let score = 0;

const questionElement = document.getElementById('question');
const optionsElement = document.getElementById('options');
const nextButton = document.getElementById('next-btn');
const scoreElement = document.getElementById('score');

// Adicionando os áudios com fallback
const clickSound = new Audio();
clickSound.src = 'rastreador 1.mp3';
clickSound.onerror = () => {
  clickSound.src = 'click.ogg';
};

const score8000Sound = new Audio();
score8000Sound.src = 'é de mais de 8 mil 2.mp3';
score8000Sound.onerror = () => {
  score8000Sound.src = 'score8000.ogg';
};

const maxScoreSound = new Audio();
maxScoreSound.src = 'O miserável é um genio final.mp3';
maxScoreSound.onerror = () => {
  maxScoreSound.src = 'maxscore.ogg';
};

function showQuestion() {
  const currentQuestion = questions[currentQuestionIndex];
  questionElement.textContent = currentQuestion.question;
  optionsElement.innerHTML = '';
  currentQuestion.options.forEach(option => {
      const button = document.createElement('button');
      button.textContent = option;
      button.addEventListener('click', selectAnswer);
      optionsElement.appendChild(button);
  });
}

function selectAnswer(event) {
  const selectedOption = event.target.textContent;
  const correctAnswer = questions[currentQuestionIndex].answer;
  if (selectedOption === correctAnswer) {
      score += 1000;
  }
  scoreElement.textContent = `${score}`;
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
      showQuestion();
  } else {
      questionElement.textContent = 'Quiz finalizado!';
      optionsElement.innerHTML = '';
      nextButton.style.display = 'none';
  }

  // Tocar som de clique
  clickSound.play();

  // Verificar pontuação para tocar sons específicos
  if (score === 8000) {
      score8000Sound.play();
  } else if (score >= 10000) { // Supondo que 10000 seja a pontuação máxima
      maxScoreSound.play();
  }
}

nextButton.addEventListener('click', showQuestion);

showQuestion();
