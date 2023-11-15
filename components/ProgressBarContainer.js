import { Component } from '../core';
export class ProgressBarContainer extends Component {
  constructor({ tagName, className, children, events, textContent, ...attrs }) {
    super({ tagName, className, children, events, textContent, ...attrs });
    this.setTagName('div');
    this.setClassName('progress__bar--container');
  }
}
