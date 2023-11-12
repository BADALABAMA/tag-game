import { Component } from '../core';

export class Board extends Component {
  constructor({ tagName, className, children, events, textContent, ...attrs }) {
    super({ tagName, className, children, events, textContent, ...attrs });
    this.setTagName('div');
    this.setClassName('game__board');
  }
}
