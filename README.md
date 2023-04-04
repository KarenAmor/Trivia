# Trivia
Un juego de línea de comandos que interroga al usuario con un conjunto de preguntas.

# Bibliotecas
«Axios
'readline

# Constantes
«BASE_URL
«QUIZ_LENGTH
«TIMEOUT_SECONDS

# Funciones
shuffleArray(matriz)
Baraja los elementos de una matriz en un orden aleatorio.

getQuestions()
Realiza una solicitud a la API de Open Trivia Database para obtener un conjunto de preguntas. Devuelve una matriz de objetos, donde cada objeto representa una pregunta.

askQuestion(pregunta)
Muestra una pregunta y sus posibles respuestas al usuario, espera a que el usuario escriba su respuesta y, a continuación, comprueba si la respuesta es correcta. Devuelve true Si la respuesta es correcta, false si es incorrecto.

preguntar(pregunta)
Obtiene la entrada del usuario y devuelve la entrada como una promesa.

startGame()
Inicia el juego de trivia, mostrando el mensaje de bienvenida y el número de preguntas que se harán. Llamadas 'getQuestions

# Uso
Para iniciar el juego, ejecute 'node trivia-game.js

# Posibles mejoras
Permite al usuario seleccionar el nivel de dificultad y la categoría de preguntas.
Agregue más opciones de personalización, como la duración del cuestionario o el límite de tiempo para cada pregunta.
Use una API diferente o agregue más fuentes para preguntas.
Mejorar la interfaz de usuario con colores o gráficos.
