const width = 10;

const lTetromino = [
    [1, width+1, width*2+1, 2],
    [width, width+1, width+2, width*2+2],
    [1, width+1, width*2+1, width*2],
    [width, width*2, width*2+1, width*2+2]
];

const zTetromino = [
    [0, width, width+1, width*2+1],
    [width+1, width+2, width*2, width*2+1],
    [0, width, width+1, width*2+1],
    [width+1, width+2, width*2, width*2+1]
];

const tTetromino = [
    [1, width, width+1, width+2],
    [1, width+1, width+2, width*2+1],
    [width, width+1, width+2, width*2+1],
    [1, width, width+1, width*2+1]
];

const oTetromino = [
    [0, 1, width, width+1],
    [0, 1, width, width+1],
    [0, 1, width, width+1],
    [0, 1, width, width+1]
];

const iTetromino = [
    [1, width+1, width*2+1, width*3+1],
    [width, width+1, width+2, width+3],
    [1, width+1, width*2+1, width*3+1],
    [width, width+1, width+2, width+3]
];

const tetrominoes = [lTetromino, zTetromino, tTetromino, oTetromino, iTetromino];

const upNextDisplayWidth = 4;
const upNextTetrominoes = [
    [1, upNextDisplayWidth+1, upNextDisplayWidth*2+1, 2],
    [0, upNextDisplayWidth, upNextDisplayWidth+1, upNextDisplayWidth*2+1],
    [1, upNextDisplayWidth, upNextDisplayWidth+1, upNextDisplayWidth+2],
    [0, 1, upNextDisplayWidth, upNextDisplayWidth+1],
    [1, upNextDisplayWidth+1, upNextDisplayWidth*2+1, upNextDisplayWidth*3+1]
];

export { tetrominoes, upNextTetrominoes};