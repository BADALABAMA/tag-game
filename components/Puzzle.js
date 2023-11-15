import { Component } from '../core';

export class Puzzle extends Component {
  constructor({ tagName, className, children, events, textContent, ...attrs }) {
    super({ tagName, className, children, events, textContent, ...attrs });
    this.puzzleContainer = null;
    this.puzzle = [];
  }
  createEmptyPuzzle(size) {
    const puzzle = new Array(size);
    for (let i = 0; i < size; i++) {
      puzzle[i] = new Array(size);
      for (let j = 0; j < size; j++) {
        puzzle[i][j] = -1; // described no color for puzzle
      }
    }
    return puzzle;
  }

  shufflePuzzle(puzzle, size) {
    let numbers = [];

    for (let i = 0; i < size * size; i++) {
      numbers.push(i);
    }
    for (let i = size - 1; i >= 0; i--) {
      for (let j = size - 1; j >= 0; j--) {
        const randomIndex = Math.floor(Math.random() * numbers.length);
        puzzle[i][j] = numbers[randomIndex];
        numbers.splice(randomIndex, 1);
      }
    }
  }

  // giveColor(puzzle) {
  //   const colors = ['red', 'green', 'yellow', 'blue'];
  //   const puzzlePieces = document.querySelectorAll('.puzzle-piece');

  //   puzzlePieces.forEach((piece, index) => {
  //     const colorIndex = Math.floor(index / 4) % colors.length;
  //     piece.classList.add(`${colors[colorIndex]}__field`);
  //   });
  //   puzzlePieces.filter((piece) => {
  //     piece.textContent === '';
  //     piece.classList.add(`empty__field`);
  //   });
  // }

  createPuzzle(puzzle, puzzleContainer, size, node) {
    puzzleContainer = document.querySelector('.game__board');
    puzzleContainer.innerHTML = '';
    const colorMapping = {
      1: 'yellow__field',
      2: 'yellow__field',
      3: 'yellow__field',
      4: 'yellow__field',
      5: 'blue__field',
      6: 'blue__field',
      7: 'blue__field',
      8: 'blue__field',
      9: 'red__field',
      10: 'red__field',
      11: 'red__field',
      12: 'red__field',
      13: 'green__field',
      14: 'green__field',
      15: 'green__field',
    };

    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        const piece = document.createElement('div');
        piece.classList.add('puzzle-piece');
        piece.textContent = puzzle[i][j] === 0 ? '' : puzzle[i][j];

        if (piece.textContent === '') {
          piece.classList.add('empty__field');
        } else {
          piece.classList.add(colorMapping[piece.textContent]);
        }

        puzzleContainer.appendChild(piece);
        piece.addEventListener('click', () => {
          if (puzzle[i][j] !== 0) {
            this.movePiece(i, j, puzzle, size, node);

            console.log(puzzle);
          }
        });
      }
    }
  }
  renderPuzzle(puzzle, puzzleContainer, size, node) {
    this.createPuzzle(puzzle, puzzleContainer, size, node);
  }

  checkWin(puzzle, node) {
    node = document.querySelector('.progress__bar');

    const firstResult =
      puzzle[0][0] === 1 &&
      puzzle[1][0] === 2 &&
      puzzle[2][0] === 3 &&
      puzzle[3][0] === 4;

    const secondResult =
      puzzle[0][1] === 5 &&
      puzzle[1][1] === 6 &&
      puzzle[2][1] === 7 &&
      puzzle[3][1] === 8;
    const thirdResult =
      puzzle[0][2] === 9 &&
      puzzle[0][2] === 10 &&
      puzzle[0][2] === 11 &&
      puzzle[0][2] === 12;

    if (firstResult) {
      node.classList.add('quater__bar');
      node.textContent = '35%';
      isFristResultCorrect = true;
    }

    if (secondResult) {
      node.classList.remove('quater__bar');
      node.classList.add('half__bar');
      node.textContent = '75%';
      isSecondResultCorrect = true;
    }

    if (thirdResult && firstResult && secondResult) {
      node.classList.remove('half__bar');
      node.classList.add('full__bar');
      node.textContent = '100%';
      return true;
    } else {
      return false;
    }
  }

  movePiece(row, col, puzzle, size, node) {
    if (row > 0 && puzzle[row - 1][col] === 0) {
      [puzzle[row][col], puzzle[row - 1][col]] = [
        puzzle[row - 1][col],
        puzzle[row][col],
      ];
    } else if (row < size - 1 && puzzle[row + 1][col] === 0) {
      [puzzle[row][col], puzzle[row + 1][col]] = [
        puzzle[row + 1][col],
        puzzle[row][col],
      ];
    } else if (col > 0 && puzzle[row][col - 1] === 0) {
      [puzzle[row][col], puzzle[row][col - 1]] = [
        puzzle[row][col - 1],
        puzzle[row][col],
      ];
    } else if (col < size - 1 && puzzle[row][col + 1] === 0) {
      [puzzle[row][col], puzzle[row][col + 1]] = [
        puzzle[row][col + 1],
        puzzle[row][col],
      ];
    }

    this.renderPuzzle(puzzle, this.puzzleContainer, size);

    if (this.checkWin(puzzle, node)) {
      return alert('congrats you are win!');
    }
  }
  init(size, puzzleContainer, node) {
    this.puzzle = this.createEmptyPuzzle(size);

    this.shufflePuzzle(this.puzzle, size);

    this.renderPuzzle(this.puzzle, puzzleContainer, size, node);
  }
}
