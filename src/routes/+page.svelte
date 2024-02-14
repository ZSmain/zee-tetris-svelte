<script lang="ts">
	import { tetrominoes, upNextTetrominoes } from '$lib/tetrominoes';

	let board = $state(
		Array(20)
			.fill(0)
			.map(() => Array(10).fill({ filled: false, color: 0 }))
	);
	let upNextBoard = $state(
		Array(4)
			.fill(0)
			.map(() => Array(4).fill({ filled: false, color: 0 }))
	);

	let colors = ['', 'red', 'green', 'blue', 'purple', 'orange'];

	let currentPosition = 4;
	let currentRotation = 0;
	let nextTetromino = 0;
	let timerId: number | null = null;

	let randomTetromino = Math.floor(Math.random() * tetrominoes.length);
	let currentTetromino = tetrominoes[randomTetromino][currentRotation];

	function draw() {
		currentTetromino.forEach((index) => {
			let x = Math.floor((currentPosition + index) / 10);
			let y = (currentPosition + index) % 10;
			board[x][y] = { filled: true, color: randomTetromino + 1 };
		});
	}

	function undraw() {
		currentTetromino.forEach((index) => {
			let x = Math.floor((currentPosition + index) / 10);
			let y = (currentPosition + index) % 10;
			board[x][y] = { filled: false, color: 0 };
		});
	}

	function canMoveDown() {
		return !currentTetromino.some((index) => {
			let x = Math.floor((currentPosition + index + 10) / 10);
			let y = (currentPosition + index + 10) % 10;
			return x >= board.length || (board[x] && board[x][y].filled);
		});
	}

	function updateUpNextBoard() {
		for (let i = 0; i < upNextBoard.length; i++) {
			for (let j = 0; j < upNextBoard[i].length; j++) {
				upNextBoard[i][j] = { filled: false, color: 0 };
			}
		}

		upNextTetrominoes[nextTetromino].forEach((index) => {
			let x = Math.floor(index / 4);
			let y = index % 4;
			if (upNextBoard[x]) {
				upNextBoard[x][y] = { filled: true, color: nextTetromino + 1 };
			}
		});
	}

	function freeze() {
		currentTetromino.forEach((index) => {
			let x = Math.floor((currentPosition + index) / 10);
			let y = (currentPosition + index) % 10;
			board[x][y] = { filled: true, color: randomTetromino + 1 };
		});

		randomTetromino = nextTetromino;
		nextTetromino = Math.floor(Math.random() * tetrominoes.length);
		updateUpNextBoard();
		currentTetromino = tetrominoes[randomTetromino][currentRotation];
		currentPosition = 4;
	}

	function moveLeft() {
		undraw();
		if (!currentTetromino.some((index) => (currentPosition + index) % 10 === 0)) {
			currentPosition -= 1;
		}

		if (
			currentTetromino.some((index) => {
				let x = Math.floor((currentPosition + index) / 10);
				let y = (currentPosition + index) % 10;
				return board[x][y].filled;
			})
		) {
			currentPosition += 1;
		}

		draw();
	}

	function moveRight() {
		undraw();
		if (!currentTetromino.some((index) => (currentPosition + index) % 10 === 9)) {
			currentPosition += 1;
		}

		if (
			currentTetromino.some((index) => {
				let x = Math.floor((currentPosition + index) / 10);
				let y = (currentPosition + index) % 10;
				return board[x][y].filled;
			})
		) {
			currentPosition -= 1;
		}

		draw();
	}

	function rotate() {
		undraw();
		currentRotation = (currentRotation + 1) % tetrominoes[randomTetromino].length;
		currentTetromino = tetrominoes[randomTetromino][currentRotation];
		draw();
	}

	function moveDown() {
		undraw();
		if (canMoveDown()) {
			currentPosition += 10;
			draw();
		} else {
			freeze();
			draw();
		}
	}

	function startPause() {
		if (timerId) {
			clearInterval(timerId);
			timerId = null;
		} else {
			// Make the tetromino move down every second
			draw();
			timerId = setInterval(moveDown, 1000);
			nextTetromino = Math.floor(Math.random() * tetrominoes.length);
			updateUpNextBoard();
		}
	}

	$effect(() => {
		window.addEventListener('keydown', (e) => {
			if (e.key === 'ArrowLeft') {
				moveLeft();
			} else if (e.key === 'ArrowRight') {
				moveRight();
			} else if (e.key === 'ArrowDown') {
				moveDown();
			} else if (e.key === 'ArrowUp') {
				rotate();
			}
		});

		return () => {
			window.removeEventListener('keydown', (e) => {
				if (e.key === 'ArrowLeft') {
					moveLeft();
				} else if (e.key === 'ArrowRight') {
					moveRight();
				}
			});
		};
	});
</script>

<button on:click={startPause}>Start/Pause</button>

<!-- Display the game board -->
<div class="flex flex-wrap w-[200px] h-[400px] bg-yellow-300">
	{#each board as row}
		{#each row as cell}
			<div class="w-5 h-5" style="background-color: {colors[cell.color]};"></div>
		{/each}
	{/each}
</div>

<!-- Display the next tetromino -->
<div class="flex flex-wrap w-20 h-20 bg-yellow-300">
	{#each upNextBoard as row}
		{#each row as cell}
			<div class="w-5 h-5" style="background-color: {colors[cell.color]};"></div>
		{/each}
	{/each}
</div>
