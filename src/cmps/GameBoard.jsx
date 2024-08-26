/** @format */

import { React, useState, useEffect } from 'react';

import CardList from './CardList';
import Scoreboard from './Scoreboard';

export default function GameBoard() {
	const [cards, setCards] = useState([]);
	const [choiceOne, setChoiceOne] = useState(null);
	const [choiceTwo, setChoiceTwo] = useState(null);
	const [player, setPlayer] = useState(1);
	const [scoreOne, setScoreOne] = useState(0);
	const [scoreTwo, setScoreTwo] = useState(0);

	const incrementScore = (player) => {
		if (player) {
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
		starterPlayer();
	});

	const switchPlayer = () => {
		setPlayer((prevTurn) => (prevTurn === 1 ? 2 : 1));
	};

	useEffect(() => {
		if (choiceOne && choiceTwo) {
			if (choiceOne.imgId === choiceTwo.imgId) {
				incrementScore(player);
				resetTurn();
			} else {
				setTimeout(() => {
					setCards((prevCards) =>
						prevCards.map((card) => {
							if (card.id === choiceOne.id || card.id === choiceTwo.id) {
								return { ...card, isVisible: false };
							}
							return card;
						})
					);
					resetTurn();
				}, 1000);
			}
		}
		switchPlayer();
	}, [choiceOne, choiceTwo]);

	const resetTurn = () => {
		setChoiceOne(null);
		setChoiceTwo(null);
	};

	useEffect(() => {
		const cardsArr = getCardsArr();
		console.log(cardsArr);
		setChoiceOne(null);
		setChoiceTwo(null);
		setCards(cardsArr);
	}, []);

	const getCardsArr = () => {
		const arrCards = [];
		let counterId = 0;
		for (let i = 0; i < 16; i++) {
			counterId++;
			arrCards.push({
				id: counterId,
				imgId: i + 1,
				isVisible: false,
			});
			counterId++;
			arrCards.push({
				id: counterId,
				imgId: i + 1,
				isVisible: false,
			});
		}
		const unsortedArr = arrCards.sort(() => Math.random() - 0.5);

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
			<p>Current Turn: Player {player}</p>
			{/* <button onClick={Restart}>Restart Game</button> */}
			<Scoreboard scoreOne={scoreOne} scoreTwo={scoreTwo} />
			<CardList cards={cards} flipCard={flipCard} />
		</div>
	);
}
