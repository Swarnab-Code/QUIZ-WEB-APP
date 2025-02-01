const question = document.getElementById('question');
const choices = Array.from(document.getElementsByClassName('choice-text'));
const progressText = document.getElementById('progressText');
const scoreText = document.getElementById('score');
const streakText = document.getElementById('streak');
const progressBarFull = document.getElementById('progressBarFull');
const timerText = document.getElementById('timer');
const loader = document.getElementById('loader');
const game = document.getElementById('game');

const correctSound = new Audio('../sounds/correct.mp3');
const incorrectSound = new Audio('../sounds/incorrect.mp3');

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];
let timer;
let streak = 0;
let longestStreak = localStorage.getItem('longestStreak') || 0;

fetch(
	'https://api.allorigins.win/get?url=' +
		encodeURIComponent('https://api.jsonserve.com/Uw5CrX')
)
	.then((res) => res.json())
	.then((data) => {
		const loadedData = JSON.parse(data.contents);
		console.log('Loaded Data:', loadedData);

		questions = loadedData.questions || [];
		console.log('Questions Array:', questions);

		if (questions.length > 0) {
			startGame();
		} else {
			console.error('No questions available to start the game!');
			alert('No questions available. Please try again later.');
		}
	})
	.catch((err) => {
		console.error('Error fetching the questions: ', err);
		alert('Failed to load questions. Please try again later.');
	});

const CORRECT_BONUS = 4;
const NEGATIVE_MARKS = -1;
const MAX_QUESTIONS = 10;

const startGame = () => {
	questionCounter = 0;
	score = 0;
	streak = 0;
	longestStreak = localStorage.getItem('longestStreak') || 0;
	availableQuestions = [...questions];
	getNewQuestion();
	game.classList.remove('hidden');
	loader.classList.add('hidden');
	updateStreakUI();
};

const getNewQuestion = () => {
	if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
		localStorage.setItem('mostRecentScore', score);
		localStorage.setItem('longestStreak', longestStreak);
		return window.location.assign('../html/end.html');
	}

	questionCounter++;
	progressText.innerText = `Questions ${questionCounter}/${MAX_QUESTIONS}`;
	progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

	const questionIndex = Math.floor(Math.random() * availableQuestions.length);
	currentQuestion = availableQuestions[questionIndex];

	console.log('Current Question:', currentQuestion);

	question.innerText = currentQuestion.description;

	choices.forEach((choice) => {
		const number = choice.dataset['number'];
		choice.innerText = currentQuestion.options[number - 1].description; // Access the correct option
	});

	availableQuestions.splice(questionIndex, 1);
	acceptingAnswers = true;

	startTimer(15);
};

const startTimer = (time) => {
	let remainingTime = time;
	timerText.innerText = remainingTime;

	timer = setInterval(() => {
		remainingTime--;
		timerText.innerText = remainingTime;

		if (remainingTime <= 0) {
			clearInterval(timer);
			streak = 0; // Reset the streak if the timer runs out
			updateStreakUI();
			getNewQuestion();
		}
	}, 1000);
};

choices.forEach((choice) => {
	choice.addEventListener('click', (e) => {
		if (!acceptingAnswers) return;
		acceptingAnswers = false;
		clearInterval(timer);

		const selectedChoice = e.target;
		const selectedAnswer = selectedChoice.dataset['number'];
		const isCorrect =
			currentQuestion.options[selectedAnswer - 1].is_correct;

		// ✅ Find the correct choice element
		const correctChoice = choices.find(
			(choice, idx) => currentQuestion.options[idx].is_correct
		);

		if (isCorrect) {
			correctSound.play();
			incrementScore(CORRECT_BONUS);
			streak++;

			if (streak > longestStreak) {
				longestStreak = streak;
				localStorage.setItem('longestStreak', longestStreak);
			}

			selectedChoice.parentElement.classList.add('correct');
		} else {
			incorrectSound.play();
			streak = 0;
			incrementScore(NEGATIVE_MARKS);

			selectedChoice.parentElement.classList.add('incorrect');
			correctChoice.parentElement.classList.add('correct');
		}

		updateStreakUI();

		setTimeout(() => {
			selectedChoice.parentElement.classList.remove(
				'correct',
				'incorrect'
			);
			correctChoice.parentElement.classList.remove('correct');
			getNewQuestion();
		}, 2000);
	});

	choice.addEventListener('mousedown', () => {
		choice.classList.add('clicked');
	});

	choice.addEventListener('mouseup', () => {
		setTimeout(() => choice.classList.remove('clicked'), 200);
	});
});

const incrementScore = (num) => {
	score += num;
	scoreText.innerText = score;
};

const updateStreakUI = () => {
	streakText.innerText = streak;
};
