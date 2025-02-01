const username = document.getElementById('username');
const saveScoreBtn = document.getElementById('saveScoreBtn');
const finalScore = document.getElementById('finalScore');
const longestStreakDisplay = document.getElementById('longestStreak');

const mostRecentScore = localStorage.getItem('mostRecentScore');
const longestStreak = localStorage.getItem('longestStreak');

const leaderBoard = JSON.parse(localStorage.getItem('leaderBoard')) || [];
const MAX_HIGH_SCORES = 5;

finalScore.innerText = mostRecentScore;
longestStreakDisplay.innerText = longestStreak;

username.addEventListener('input', () => {
	saveScoreBtn.disabled = !username.value;
});

const saveHighScore = (e) => {
	e.preventDefault();

	const score = {
		score: parseInt(mostRecentScore) || 0,
		streak: parseInt(longestStreak) || 0,
		name: username.value.trim(),
	};

	leaderBoard.push(score);
	leaderBoard.sort((a, b) => b.score - a.score);
	leaderBoard.splice(MAX_HIGH_SCORES);

	localStorage.setItem('leaderBoard', JSON.stringify(leaderBoard));
	localStorage.removeItem('longestStreak');
	localStorage.removeItem('mostRecentScore');

	window.location.assign('../index.html');
};
