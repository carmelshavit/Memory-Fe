/** @format */
import './assets/imges/cmps/CardList.scss';
import React, { useState, useEffect } from 'react';
// import GameBoard from './cmps/GameBoard';
// import Scoreboard from './cmps/Scoreboard'; // optional
// import ResetButton from './cmps/ResetButton'; // optional
// import GameOver from './cmps/GameOver'; // optional
// import images from './assets/imges/imageImports'; // Adjust the path as needed
import GameBoard from './cmps/GameBoard';

function App() {
	const [cards, setCards] = useState([]);
	const [score, setScore] = useState(0); // Optional
	const [gameOver, setGameOver] = useState(false);

	useEffect(() => {
		initializeCards();
	}, []);

	function initializeCards() {
		// Initialize and shuffle cards
		// Set cards state
		// const cardImages = Object.values(images);
	}

	function handleCardClick(cardId) {
		// Handle card flipping and match checking
		// Update game state
	}

	function checkForMatch() {
		// Check if two flipped cards match
	}

	function updateScore() {
		// Update the score
	}

	function resetGame() {
		// Reset the game state
		initializeCards();
	}

	function checkGameOver() {
		// Check if the game is over
		// Set gameOver state
	}

	useEffect(() => {
		if (checkGameOver()) {
			setGameOver(true);
		}
	}, [cards]);

	return (
		<div className="App">
			{/* <GameBoard cards={cards} onCardClick={handleCardClick} />
			{gameOver && <GameOver />}
			<Scoreboard score={score} /> {/* optional */}
			{/* <ResetButton onClick={resetGame} /> optional  */}
			<GameBoard />
		</div>
	);
}

export default App;
