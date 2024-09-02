/** @format */

import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function ModalMenu({ onSubmitSettings }) {
	const [open, setOpen] = useState(true);
	const [settings, setSettings] = useState({
		numberOfCards: 4,
		timer: 5,
		firstPlayerName: 'A',
		secondPlayerName: 'B',
	});

	// const handleClickOpen = () => {
	// 	setOpen(true);
	// };

	const handleClose = () => {
		setOpen(false);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		onSubmitSettings(settings);
		handleClose();
	};

	const handleChange = (event) => {
		const { name, value } = event.target;
		setSettings((prevSettings) => ({
			...prevSettings,
			[name]: value,
		}));
	};

	return (
		<React.Fragment>
			<Dialog
				open={open}
				onClose={handleClose}
				PaperProps={{
					component: 'form',
					onSubmit: handleSubmit,
				}}>
				<DialogTitle>Game Settings</DialogTitle>
				<DialogContent>
					<TextField
						autoFocus
						required
						margin="dense"
						name="numberOfCards"
						label="Number of Cards"
						type="number"
						fullWidth
						variant="standard"
						value={settings.numberOfCards}
						onChange={handleChange}
					/>
					<TextField
						required
						margin="dense"
						name="timer"
						label="Timer (seconds)"
						type="number"
						fullWidth
						variant="standard"
						value={settings.timer}
						onChange={handleChange}
					/>
					<TextField
						required
						margin="dense"
						name="playerName"
						label="player 1"
						type="text"
						fullWidth
						variant="standard"
						value={settings.firstPlayerName}
						onChange={handleChange}
					/>
					<TextField
						required
						margin="dense"
						name="secondPlayerName"
						label="player 2"
						type="text"
						fullWidth
						variant="standard"
						value={settings.secondPlayerName}
						onChange={handleChange}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Cancel</Button>
					<Button type="submit">Start Game</Button>
				</DialogActions>
			</Dialog>
		</React.Fragment>
	);
}
