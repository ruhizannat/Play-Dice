(() => {
	const imgElm = document.querySelector('.dice-img');

	const playerOneScoreElm = document.querySelector('.playerOneScore');
	const playerTwoScoreElm = document.querySelector('.playerTwoScore');
	const playBtnElm = document.querySelector('.click-button');
	const resetBtnElm = document.getElementById('reset');
	const submitBtnElm = document.getElementById('submit');
	const editBtnElm = document.getElementById('edit');
	const winnerElm = document.querySelector('.winner');
	const formElm = document.querySelector('form');
	const inputElm = document.querySelector('#input');
	const inputPlayElm = document.querySelector('#input-player');
	const player1Elm = document.querySelector('.player1');
	const player2Elm = document.querySelector('.player2');
	const hideElm = document.querySelector('.hide-pattern');

	let p1Score = 0;
	let p2Score = 0;
	let player1 = 'Player One';
	let player2 = 'Player Two';

	const moveFunc = () => {
		setTimeout(() => {
			const random = Math.floor(Math.random() * 6) + 1;

			if (random >= 1 && random <= 6) {
				randomDice(random);
			}
			dicePlayer1(random);
		}, 1000);
	};
	const playConfetti = () => {
		const jsConfetti = new JSConfetti();
		setTimeout(() => {
			jsConfetti.addConfetti();
		}, 1000);
	};

	const dicePlayer1 = (random) => {
		let audio = new Audio('src/win.mp3');
		if (random === p1Score) {
			// player one winner
			winnerElm.textContent = `${player1}  won!!`;

			audio.play();
			playBtnElm.setAttribute('disabled', 'disabled');
			editBtnElm.setAttribute('disabled', 'disabled');
			playConfetti();
		}
		if (random === p2Score) {
			// player two winner
			winnerElm.textContent = `${player2}  won!!`;

			audio.play();
			playBtnElm.setAttribute('disabled', 'disabled');
			editBtnElm.setAttribute('disabled', 'disabled');

			playConfetti();
		}
		if (random === p1Score && random === p2Score) {
			// draw
			winnerElm.textContent = 'draw';
			let audio = new Audio('src/killed.mp3');
			audio.play();
			playBtnElm.setAttribute('disabled', 'disabled');
			editBtnElm.setAttribute('disabled', 'disabled');
		}
	};
	const playSound = () => {
		let audio = new Audio('src/rolling-dice.mp3');
		audio.loop = false;
		audio.play();
	};
	const randomDice = (random) => {
		imgElm.style.animation = 'rolling 4s';

		setTimeout(() => {
			switch (random) {
				case 1:
					imgElm.style.transform = 'rotateX(0deg) rotateY(0deg)';

					break;

				case 6:
					imgElm.style.transform = 'rotateX(180deg) rotateY(0deg)';

					break;

				case 2:
					imgElm.style.transform = 'rotateX(-90deg) rotateY(0deg)';

					break;

				case 5:
					imgElm.style.transform = 'rotateX(90deg) rotateY(0deg)';

					break;

				case 3:
					imgElm.style.transform = 'rotateX(0deg) rotateY(90deg)';

					break;

				case 4:
					imgElm.style.transform = 'rotateX(0deg) rotateY(-90deg)';

					break;

				default:
					break;
			}
		}, 0);
		playSound();
	};

	const showResult = () => {
		const randomPlayer1 = Math.floor(Math.random() * 6) + 1;
		const randomPlayer2 = Math.floor(Math.random() * 6) + 1;
		// data memory update
		p1Score = randomPlayer1;

		p2Score = randomPlayer2;

		//DOM update
		playerOneScoreElm.textContent = p1Score;

		playerTwoScoreElm.textContent = p2Score;
	};
	const resetInput = () => {
		inputElm.value = '';
		inputPlayElm.value = '';
	};
	const validateInput = (inputValOne, inputValTwo) => {
		let isInvalid = false;
		if (!inputValOne) {
			isInvalid = true;
			alert('please fill the input');
		}

		if (!inputValTwo) {
			isInvalid = true;
			alert('please fill the input');
		}
		return isInvalid;
	};
	const setInitialDOM = () => {
		player1Elm.textContent = player1;
		player2Elm.textContent = player2;
	};
	setInitialDOM();

	formElm.addEventListener('submit', (e) => {
		e.preventDefault();
		const inputValOne = inputElm.value;
		const inputValTwo = inputPlayElm.value;
		console.log(inputValOne, inputValTwo);
		// check validation
		const isInvalid = validateInput(inputValOne, inputValTwo);
		if (isInvalid) return;

		// setting on player name
		player1Elm.textContent = inputValOne;
		player2Elm.textContent = inputValTwo;

		// reset the input
		resetInput();

		// memory update data
		player1 = inputValOne;
		player2 = inputValTwo;
	});
	playBtnElm.addEventListener('click', () => {
		moveFunc();

		showResult();
	});
	resetBtnElm.addEventListener('click', () => {
		p1Score = 0;
		p2Score = 0;
		player1 = 'Player One';
		player2 = 'Player Two';
		playerOneScoreElm.textContent = p1Score;
		imgElm.style.transform = 'rotateX(0deg) rotateY(0deg)';
		playerTwoScoreElm.textContent = p2Score;
		winnerElm.textContent = '';
		playBtnElm.removeAttribute('disabled');
		editBtnElm.removeAttribute('disabled');
		setInitialDOM();
	});
	editBtnElm.addEventListener('click', () => {
		hideElm.classList.remove('hide-pattern');
	});
	submitBtnElm.addEventListener('click', () => {
		hideElm.classList.add('hide-pattern');
	});
})();
