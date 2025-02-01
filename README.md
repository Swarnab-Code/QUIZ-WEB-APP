# 📌 Quiz Web App

_A feature-rich quiz application built using **HTML, CSS, and JavaScript** with a focus on smooth animations, sound effects, and leaderboard tracking._

🔗 **Live Demo**: [Your Deployed Link Here](#)  
🎥 **Video Demo**: [![Watch the demo](./assets/index%20page.png)](https://drive.google.com/file/d/11UBfDRtcecrR1BJOeGJI3Cxey22SXAnc/view?usp=drive_link)

---

## 🚀 Features

✅ **Multiple Choice Questions** with a countdown timer.  
✅ **Show Correct Answer** while choosing incorrect option.  
✅ **Score & Longest Streak Tracking** (Stored in Local Storage).  
✅ **Leaderboard System** to save top scores.  
✅ **Sound Effects** for correct and incorrect answers.
✅ **Progress Bar** to indicate quiz completion.

---

## 📸 Screenshots

### **Quiz Page**

![Quiz Page](./assets/quiz%20page.png)

### **Quiz Complete Page**

![Quiz Complete Page](./assets/quiz%20complete%20page.png)

### **Leaderboard**

![Leaderboard Page](./assets/leaderboard%20page.png)

---

## 🛠 Tech Stack

🔹 **HTML** – Structuring the app layout  
🔹 **CSS3** – Styling with animations and responsiveness  
🔹 **JavaScript** – Logic, interactivity, and API integration

---

## ⚡ Setup & Installation

### 1️⃣ Clone the Repository

```sh
git clone https://github.com/Swarnab-Code/quiz-web-app.git
cd quiz-web-app
```

### 2️⃣ Open the Project in a Browser

Simply open `index.html` in any modern browser.

---

## 📜 File Structure

```
📦 quiz-web-app
 ┣ 📂 assets
 ┃ ┣ 📷 index page.png
 ┃ ┣ 📷 leaderboard page.png
 ┃ ┣ 📷 quiz complete page.png
 ┃ ┣ 📷 quiz page.png
 ┃ ┣ 📽️ quiz web app video.mp4
 ┣ 📂 css
 ┃ ┣ 📄 style.css
 ┃ ┣ 📄 game.css
 ┃ ┗ 📄 leaderboard.css
 ┣ 📂 html
 ┃ ┣ 📄 index.html
 ┃ ┣ 📄 game.html
 ┃ ┣ 📄 leaderboard.html
 ┃ ┣ 📄 end.html
 ┃ ┣ 📄 favicon.ico
 ┃ ┗ 📄 favicon.png
 ┣ 📂 js
 ┃ ┣ 📄 game.js
 ┃ ┣ 📄 leaderboard.js
 ┃ ┗ 📄 end.js
 ┣ 📂 sounds
 ┃ ┣ 📄 correct.mp3
 ┃ ┗ 📄 incorrect.mp3
 ┣ 📄 README.md
```

---

## 📡 API Integration

The app fetches questions from a JSON API using `fetch()`.  


### Replace API Endpoint in `game.js`

```js
fetch(
	'https://api.allorigins.win/get?url=' +
		encodeURIComponent('https://api.jsonserve.com/Uw5CrX') // Replace if needed
)
	.then((res) => res.json())
	.then((data) => {
		const loadedData = JSON.parse(data.contents);

		questions = loadedData.questions || [];

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
```

---

## 💾 Leaderboard & High Score Storage

The app stores high scores and longest streaks using `localStorage`:

```js
localStorage.setItem('mostRecentScore', score);
localStorage.setItem('longestStreak', longestStreak);
```

---

## 🎯 Future Enhancements

🚀 **Multiplayer mode** for real-time quizzes.  
📱 **PWA Support** to make the app installable.  
🌍 **Language support** for multi-lingual quizzes.

---

## 💡 Contributing

1️⃣ **Fork the repository**  
2️⃣ **Create a feature branch**  
3️⃣ **Commit and push changes**  
4️⃣ **Submit a pull request**

---
