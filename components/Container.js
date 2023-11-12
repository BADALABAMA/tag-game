import { Component } from '../core';

export class Container extends Component {
  constructor({ tagName, className, children, events, textContent, ...attrs }) {
    super({ tagName, className, children, events, textContent, ...attrs });
    this.setTagName('div');
    this.setClassName('game__board--container');
  }
}
