// Importar las librerías que vamos a utilizar
const axios = require('axios');
const readline = require('readline');

// Definir algunas constantes para nuestro juego
const BASE_URL = 'https://opentdb.com/api.php?lang=es';
const QUIZ_LENGTH = 10;
const TIMEOUT_SECONDS = 7;

// Función para mezclar un array
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];// Intercambiar elementos de manera aleatoria
  }
  return array;
};

// Función para obtener preguntas desde una API
const getQuestions = async () => {
  const params = {
    amount: QUIZ_LENGTH,
    category: 17,
    difficulty: 'easy',
    type: 'multiple',
  };
  const response = await axios.get(BASE_URL, { params });// Hacer una solicitud HTTP con axios
  return response.data.results;// Devolver los resultados obtenidos
};

// Función para hacer una pregunta y esperar por una respuesta
const askQuestion = async (question) => {
  console.log(`\n${question.question}`);// Mostrar la pregunta
  const choices = shuffleArray([...question.incorrect_answers, question.correct_answer]);
  for (let i = 0; i < choices.length; i++) {
    console.log(`${i + 1}. ${choices[i]}`);// Mostrar las respuestas mezcladas
  }

  let answer = null;
  const timer = setTimeout(() => {
    console.log(`\nTime's up! The correct answer is ${question.correct_answer}.`);
    answer = 0;
  }, TIMEOUT_SECONDS * 1000);// Establecer un temporizador para la pregunta

  answer = await ask('Your answer: ');// Esperar por una respuesta

  clearTimeout(timer);// Limpiar el temporizador

  if (choices[answer - 1] === question.correct_answer) {// Verificar si la respuesta es correcta
    console.log('\x1b[32m%s\x1b[0m', 'Correct!');
    return true; // Devolver verdadero para indicar que la respuesta fue correcta
  } else {
    console.log('\x1b[31m%s\x1b[0m', `Incorrect. The correct answer is ${question.correct_answer}`);
    return false;// Devolver falso para indicar que la respuesta fue incorrecta
  }
};
// Función para hacer una pregunta y devolver la respuesta como una promesa
const ask = (question) => {
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer);
    });
  });
};
// Función para comenzar el juego
const startGame = async () => {
  console.log('Welcome to the trivia game!');
  console.log(`You will be asked ${QUIZ_LENGTH} questions. Good luck!\n`);
  let score = 0;
  const questions = await getQuestions();
  for (let i = 0; i < questions.length; i++) {
    const isCorrect = await askQuestion(questions[i]);
    if (isCorrect) {
      score++;
    }

    if (i === QUIZ_LENGTH - 1) {
      console.log(`\nYou scored ${score} out of ${QUIZ_LENGTH} questions.`);
      return;
    }
  }
};

startGame();