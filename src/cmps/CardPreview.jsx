/** @format */

import { React } from 'react';

export default function CardPreview({ card, flipCard }) {
	const onCardFlip = () => {
		flipCard(card);
	};

	return (
		<div onClick={onCardFlip} className="card-preview w-full">
			<div className="card-header">
				{card.isVisible ? (
					<img
						width="100%"
						height="100%"
						src={`src/assets/imges/img${card.imgId}.gif`}
						alt=""
					/>
				) : (
					<img
						width="100%"
						height="100%"
						src={`src/assets/imges/initialCard.gif`}
						alt=""
					/>
				)}
			</div>
		</div>
	);
}
