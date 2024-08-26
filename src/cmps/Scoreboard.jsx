/** @format */

import { React, useState } from 'react';

export default function Scoreboard({ scoreOne, scoreTwo }) {
	return (
		<>
			<h2>Scoreboard</h2>
			<p>Player 1 Score: {scoreOne}</p>
			<p>Player 2 Score: {scoreTwo}</p>
		</>
	);
}
