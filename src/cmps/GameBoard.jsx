/** @format */

import React, { useState, useEffect } from 'react';
import CardList from './CardList';
import Scoreboard from './Scoreboard';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ModalMenu from './ModalMenu';

export default function GameBoard() {
	const [cards, setCards] = useState([]);
	const [choiceOne, setChoiceOne] = useState(null);
	const [choiceTwo, setChoiceTwo] = useState(null);
	const [player, setPlayer] = useState(1);
	const [scoreOne, setScoreOne] = useState(0);
	const [scoreTwo, setScoreTwo] = useState(0);
	const [settings, setSettings] = useState({
		numberOfCards: 4,
		timer: 5,
		firstPlayerName: 'X',
		secondPlayerName: 'Y',
		singleCards: 1,
	});
	const [timmer, setTimmer] = useState(5);

	// Function to start the game and initialize the card array
	const startGame = () => {
		const cardsArr = getCardsArr();
		setChoiceOne(null);
		setChoiceTwo(null);
		setCards(cardsArr);
		setScoreOne(0);
		setScoreTwo(0);
		starterPlayer();
	};

	const onSubmitSettings = (settings) => {
		setSettings(settings);
		startInterval();
	};
	// Function to restart the game
	const restartGame = () => {
		startGame();
		setTimmer(settings.timer);
		toast('Game has been restarted!');
	};

	const incrementScore = (player) => {
		if (player === 1) {
			setScoreOne((prevScore) => prevScore + 1);
		} else {
			setScoreTwo((prevScore) => prevScore + 1);
		}
	};

	const starterPlayer = () => {
		const randomTurn = Math.random() < 0.5 ? 1 : 2;
		setPlayer(randomTurn);
	};

	useEffect(() => {
		startGame();
	}, []);

	let intervalId;
	const switchPlayer = () => {
		setPlayer((prevTurn) => (prevTurn === 1 ? 2 : 1));
		console.log('switch turn');
		setTimmer(settings.timer);
	};

	const startInterval = () => {
		intervalId = setInterval(() => {
			console.log('weeeeeeeeeeee');
			setTimmer((prevTimer) => prevTimer - 1);
		}, 1000);
	};

	useEffect(() => {
		if (timmer <= 0) {
			resetTurn();
			switchPlayer();
		}
	}, [timmer]);

	useEffect(() => {
		if (choiceOne && choiceTwo) {
			if (choiceOne.imgId === choiceTwo.imgId) {
				incrementScore(player);
				resetTurn();
			} else {
				setTimeout(() => {
					flippedCardUnmatched();
					switchPlayer();
					resetTurn();
				}, 1000);
			}
		}
	}, [choiceOne, choiceTwo]);

	const flippedCardUnmatched = () => {
		setCards((prevCards) =>
			prevCards.map((card) => {
				if (card.id === choiceOne?.id || card.id === choiceTwo?.id) {
					return { ...card, isVisible: false };
				}
				return card;
			})
		);
	};

	const resetTurn = () => {
		setChoiceOne(null);
		setChoiceTwo(null);
		flippedCardUnmatched();
	};

	useEffect(() => {
		if (cards.length > 0) {
			checkWinner();
		}
	}, [scoreOne, scoreTwo]);

	const checkWinner = () => {
		const unmatchedCards = cards.filter(
			(card) => !card.isVisible && !card.hasMatched
		);
		// sub settings.numberCardsToAdd from cards
		if (unmatchedCards.length === 0) {
			if (scoreOne > scoreTwo) {
				toast(`Player 1 won the game with ${scoreOne} points!`);
			} else if (scoreTwo > scoreOne) {
				toast(`Player 2 won the game with ${scoreTwo} points!`);
			} else {
				toast('The game is a tie!');
			}
		}
		clearInterval(intervalId);
	};

	//add settings.numberCardsToAdd
	const getCardsArr = () => {
		const arrCards = [];
		let counterId = 0;
		let numImgId = 1;
		for (let i = 0; i < settings.numberOfCards / 2; i++) {
			counterId++;
			arrCards.push({
				id: counterId,
				imgId: numImgId,
				isVisible: false,
				hasMatched: true,
			});
			counterId++;
			arrCards.push({
				id: counterId,
				imgId: numImgId,
				isVisible: false,
				hasMatched: true,
			});
			numImgId++;
		}

		for (let i = 0; i < settings.singleCards; i++) {
			counterId++;
			arrCards.push({
				id: counterId,
				imgId: numImgId,
				isVisible: false,
				hasMatched: false,
			});
			numImgId++;
		}
		const unsortedArr = arrCards.sort(() => Math.random() - 0.5);
		console.log(settings.singleCards);
		console.log(unsortedArr);
		return unsortedArr;
	};

	const flipCard = (flippedCard) => {
		if (flippedCard.isVisible) return;
		if (choiceOne && choiceTwo) return;
		setCards((prevCards) => {
			return prevCards.map((card) => {
				if (card.id === flippedCard.id) {
					if (choiceOne && !choiceTwo) {
						setChoiceTwo(card);
					} else if (!choiceOne && choiceTwo) {
						setChoiceOne(card);
					} else if (!choiceOne && !choiceTwo) {
						setChoiceOne(card);
					} else {
						return card;
					}

					return { ...card, isVisible: true };
				} else {
					return card;
				}
			});
		});
	};

	return (
		<div className="game-board">
			<ToastContainer />
			<ModalMenu onSubmitSettings={onSubmitSettings} />
			{player && (
				<p>
					Current Turn: Player
					{player === 1 ? settings.firstPlayerName : settings.secondPlayerName}
				</p>
			)}
			<p>Time Left: {timmer}</p>
			<button onClick={restartGame}>Restart Game</button>
			<Scoreboard scoreOne={scoreOne} scoreTwo={scoreTwo} />
			<CardList cards={cards} flipCard={flipCard} />
		</div>
	);
}
