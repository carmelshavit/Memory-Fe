/** @format */
import './assets/imges/cmps/CardList.scss';
import React from 'react';
import GameBoard from './cmps/GameBoard';

function App() {


	return (
		<div className="App">
			<GameBoard />
		</div>
	);
}

export default App;

// modal option menu- able to chooce number of cards, how many only cards to add, timer for every turn (useEffect to switch player)
// css
// delete requiremt for names, numbers of cards... defult cards by enter button
// reset turn button
