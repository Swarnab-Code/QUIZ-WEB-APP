const leaderBoardList = document.getElementById('leaderBoardList');
const leaderBoard = JSON.parse(localStorage.getItem('leaderBoard')) || [];

leaderBoardList.innerHTML = leaderBoard
	.map((score) => {
		return `<li class="leaderboard">${score.name} - ${score.score} (Streak: ${score.streak})</li>`;
	})
	.join('');
