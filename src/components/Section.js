export class Section {
  constructor({ data, renderer }, containerSelector) {
    this._renderedItems = data;
    this._renderer = renderer;
    this._container = containerSelector;
  }

  setItem(element) {
    this._container.append(element);
  }

  renderItems() {
    console.log('render');
    this._renderedItems.forEach(item => {
      this._renderer(item);
    });
  }
}
