export class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._container = containerSelector;
  }

  setItem(element) {
    this._container.append(element);
  }

  renderItems(items) {
    items.forEach(item => {
      this._renderer(item);
    });
  }
}
