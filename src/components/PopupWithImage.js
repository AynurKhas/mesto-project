import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(data, elementInDom, selectorInputs) {
    super(elementInDom);
    this._link = data.link;
    this._name = data.name;
    this._inputSelectorImage = selectorInputs.image,
    this._inputSelectorCaption = selectorInputs.caption
  }

  open() {
    this._inputSelectorImage.src = this._link;
    this._inputSelectorImage.alt = this._name;
    this._inputSelectorCaption.textContent = this._name;
    super.open();
  }
}
