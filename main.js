import {
  App,
  Header,
  Main,
  Footer,
  Container,
  Board,
  Puzzle,
} from './components';

import './public/style.scss';

const puzzle = new Puzzle({});
const board = new Board({}).toHTML();
const BoardContainer = new Container({ children: [board] }).toHTML();
const header = new Header({}).toHTML();
const main = new Main({ children: [BoardContainer] }).toHTML();
const footer = new Footer({}).toHTML();

const app = new App({
  children: [header, main, footer],
}).toHTML();
const puzzleSize = 4;
document.body.append(app);
puzzle.init(puzzleSize, board);
