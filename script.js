const puzzleContainer = document.getElementById('puzzle-container');
const shuffleButton = document.getElementById('shuffle-button');
const message = document.getElementById('message');
let tiles = [];
let emptyTileIndex = 8; // Index of the empty tile (0-8)

// Initialize the puzzle
function initializePuzzle() {
  tiles = [1, 2, 3, 4, 5, 6, 7, 8, null]; // null represents the empty tile
  renderPuzzle();
}

// Render the puzzle tiles
function renderPuzzle() {
  puzzleContainer.innerHTML = '';
  tiles.forEach((tile, index) => {
    const tileElement = document.createElement('div');
    tileElement.classList.add('tile');
    if (tile === null) {
      tileElement.classList.add('empty');
      tileElement.textContent = '';
    } else {
      tileElement.textContent = tile;
    }
    tileElement.addEventListener('click', () => moveTile(index));
    puzzleContainer.appendChild(tileElement);
  });
  checkWin();
}

// Move a tile
function moveTile(index) {
  if (isAdjacent(index, emptyTileIndex)) {
    // Swap the clicked tile with the empty tile
    [tiles[index], tiles[emptyTileIndex]] = [tiles[emptyTileIndex], tiles[index]];
    emptyTileIndex = index;
    renderPuzzle();
  }
}

// Check if two tiles are adjacent
function isAdjacent(index1, index2) {
  const row1 = Math.floor(index1 / 3);
  const col1 = index1 % 3;
  const row2 = Math.floor(index2 / 3);
  const col2 = index2 % 3;
  return Math.abs(row1 - row2) + Math.abs(col1 - col2) === 1;
}

// Shuffle the puzzle
function shufflePuzzle() {
  for (let i = 0; i < 1000; i++) {
    const adjacentTiles = [];
    tiles.forEach((tile, index) => {
      if (isAdjacent(index, emptyTileIndex)) {
        adjacentTiles.push(index);
      }
    });
    const randomIndex = adjacentTiles[Math.floor(Math.random() * adjacentTiles.length)];
    [tiles[randomIndex], tiles[emptyTileIndex]] = [tiles[emptyTileIndex], tiles[randomIndex]];
    emptyTileIndex = randomIndex;
  }
  renderPuzzle();
}

// Check if the puzzle is solved
function checkWin() {
  const isSolved = tiles.slice(0, 8).every((tile, index) => tile === index + 1);
  if (isSolved) {
    message.textContent = 'Congratulations! You solved the puzzle!';
  } else {
    message.textContent = '';
  }
}

// Event listeners
shuffleButton.addEventListener('click', shufflePuzzle);

// Initialize the game
initializePuzzle();