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
  renderPuzzle(puzzle, puzzleContainer, size) {
    puzzleContainer = document.querySelector('.game__board');
    puzzleContainer.innerHTML = '';

    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        const piece = document.createElement('div');
        piece.classList.add('puzzle-piece');
        piece.textContent = puzzle[i][j] === 0 ? '' : puzzle[i][j];

        if (piece.textContent === '') {
          piece.classList.add('empty__field');
        }
        if (piece.textContent === '1') {
          piece.classList.add('red__field');
        }
        if (piece.textContent === '2') {
          piece.classList.add('red__field');
        }
        if (piece.textContent === '3') {
          piece.classList.add('red__field');
        }
        if (piece.textContent === '4') {
          piece.classList.add('red__field');
        }
        if (piece.textContent === '5') {
          piece.classList.add('green__field');
        }
        if (piece.textContent === '6') {
          piece.classList.add('green__field');
        }
        if (piece.textContent === '7') {
          piece.classList.add('green__field');
        }
        if (piece.textContent === '8') {
          piece.classList.add('yellow__field');
        }

        if (piece.textContent === '9') {
          piece.classList.add('yellow__field');
        }
        if (piece.textContent === '10') {
          piece.classList.add('yellow__field');
        }
        if (piece.textContent === '11') {
          piece.classList.add('yellow__field');
        }
        if (piece.textContent === '12') {
          piece.classList.add('blue__field');
        }
        if (piece.textContent === '13') {
          piece.classList.add('blue__field');
        }
        if (piece.textContent === '14') {
          piece.classList.add('blue__field');
        }
        if (piece.textContent === '15') {
          piece.classList.add('blue__field');
        }

        puzzleContainer.appendChild(piece);
        piece.addEventListener('click', () => {
          if (puzzle[i][j] !== 0) {
            this.movePiece(i, j, puzzle, size);

            console.log(puzzle);
          }
        });
      }
    }
  }

  checkWin(puzzle) {
    const firstResult =
      puzzle[0][1] === 5 && puzzle[0][2] === 6 && puzzle[0][3] === 7;
    const secondResult =
      puzzle[0][0] === 1 &&
      puzzle[1][0] === 2 &&
      puzzle[2][0] === 3 &&
      puzzle[3][0] === 4;

    const thirdResult =
      puzzle[0][3] === 8 &&
      puzzle[1][2] === 9 &&
      puzzle[2][2] === 10 &&
      puzzle[3][2] === 11;
    if (firstResult) {
      return true;
    } else if (secondResult) {
      return true;
    } else if (thirdResult) {
      return true;
    } else {
      return false;
    }
  }

  movePiece(row, col, puzzle, size) {
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

    if (this.checkWin(puzzle, row, col)) {
      alert('congrats you are win!');
    }
  }
  init(size, puzzleContainer) {
    this.puzzle = this.createEmptyPuzzle(size);

    this.shufflePuzzle(this.puzzle, size);

    this.renderPuzzle(this.puzzle, puzzleContainer, size);
  }
}
