import {
  App,
  Header,
  Main,
  Footer,
  Container,
  Board,
  Puzzle,
  ProgressBar,
  ProgressBarContainer,
} from './components';
import { toHTML } from './core';

import './public/style.scss';

const puzzle = new Puzzle({});
const board = new Board({}).toHTML();
const BoardContainer = new Container({ children: [board] }).toHTML();

const main = new Main({ children: [BoardContainer] }).toHTML();
const footer = new Footer({}).toHTML();
const progressBar = new ProgressBar({}).toHTML();
const progressBarContainer = new ProgressBarContainer({
  children: [progressBar],
}).toHTML();
const header = new Header({ children: [progressBarContainer] }).toHTML();

const app = new App({
  children: [header, main, footer],
}).toHTML();

const puzzleSize = 4;
document.body.append(app);
puzzle.init(puzzleSize, board, progressBar);
