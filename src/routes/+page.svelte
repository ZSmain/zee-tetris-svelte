<script lang="ts">
	import { onMount } from 'svelte';
	import { tetrominoes } from '$lib/tetrominoes';

	let board = $state(
		Array(20)
			.fill(0)
			.map(() => Array(10).fill({ filled: false, color: 0 }))
	);
	let colors = ['', 'red', 'green', 'blue', 'purple', 'orange'];

<h1 class="text-3xl font-bold underline">Hello world!</h1>

<style lang="postcss">
	:global(html) {
		background-color: theme(colors.gray.100);
	}
</style>
	let currentPosition = 4;
	let currentRotation = 0;

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
        return !currentTetromino.some(index => {
            let x = Math.floor((currentPosition + index + 10) / 10);
            let y = (currentPosition + index + 10) % 10;
            return x >= board.length || (board[x] && board[x][y].filled);
        });
    }

    function freeze() {
        currentTetromino.forEach(index => {
            let x = Math.floor((currentPosition + index) / 10);
            let y = (currentPosition + index) % 10;
            board[x][y] = { filled: true, color: randomTetromino + 1 };
        });

        randomTetromino = Math.floor(Math.random() * tetrominoes.length);
        currentTetromino = tetrominoes[randomTetromino][currentRotation];
        currentPosition = 4;
    }

    function moveLeft() {
        undraw();
        if (!currentTetromino.some(index => (currentPosition + index) % 10 === 0)) {
            currentPosition -= 1;
        }

        if (currentTetromino.some(index => {
            let x = Math.floor((currentPosition + index) / 10);
            let y = (currentPosition + index) % 10;
            return board[x][y].filled;
        })) {
            currentPosition += 1;
        }

        draw();
    }

    function moveRight() {
        undraw();
        if (!currentTetromino.some(index => (currentPosition + index) % 10 === 9)) {
            currentPosition += 1;
        }

        if (currentTetromino.some(index => {
            let x = Math.floor((currentPosition + index) / 10);
            let y = (currentPosition + index) % 10;
            return board[x][y].filled;
        })) {
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

	onMount(() => {
		// Make the tetromino move down every second
		setInterval(moveDown, 1000);

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


<div class="flex flex-wrap w-[200px] h-[400px] bg-yellow-300">
	{#each board as row}
		{#each row as cell}
			<div class="w-5 h-5" style="background-color: {colors[cell.color]};"></div>
		{/each}
	{/each}
</div>
