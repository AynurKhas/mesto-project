export class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._container = containerSelector;
  }

  setItem(element) {
    this._container.prepend(element);
  }

  renderItems(items) {
    items.reverse().forEach(item => {
      this._renderer(item);
    });
  }
}
