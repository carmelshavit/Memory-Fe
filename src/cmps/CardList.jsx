/** @format */

import React from 'react';
import CardPreview from './CardPreview';

export default function CardList({ cards, flipCard }) {
	console.log(cards);

	return (
		<>
			<div className="card-list">
				{cards.map((card, index) => (
					<React.Fragment key={index}>
						<CardPreview card={card} key={card.id} flipCard={flipCard} />
					</React.Fragment>
				))}
			</div>
		</>
	);
}
