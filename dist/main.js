(()=>{"use strict";function e(e){e.classList.add("popup_opened"),document.addEventListener("keydown",n),e.addEventListener("click",r)}function t(){var e=document.querySelector(".popup_opened");e.classList.remove("popup_opened"),document.removeEventListener("keydown",n),e.removeEventListener("click",r)}function r(e){(e.target.classList.contains("popup")||e.target.classList.contains("popup__close"))&&t()}function n(e){"Escape"===e.key&&t()}var o=document.querySelector(".popup_card"),c=document.querySelector(".popup__card-caption"),i=document.querySelector(".elements__list"),s=document.querySelector("#card-template").content,a=document.querySelector(".popup__card-image");function l(t,r){var n=s.querySelector(".elements__list-item").cloneNode(!0),i=n.querySelector(".elements__item-image");return n.querySelector(".elements__group-title").textContent=t,i.setAttribute("src",r),i.setAttribute("alt",t),n.querySelector(".elements__button").addEventListener("click",(function(e){e.target.classList.toggle("elements__button_active")})),n.querySelector(".elements__trash").addEventListener("click",(function(){n.remove()})),n.querySelector(".elements__item-image").addEventListener("click",(function(){e(o),a.src=r,a.alt=t,c.textContent=t})),n}function u(e){i.prepend(e)}var d,p=function(e,t,r){var n=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(r.inputErrorClass),n.classList.remove(r.errorClass),n.textContent="",v(e,n,r)},m=function(e,t,r){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?p(e,t,r):function(e,t,r,n){var o=e.querySelector(".".concat(t.id,"-error"));t.classList.add(n.inputErrorClass),o.textContent=r,o.classList.add(n.errorClass),v(e,o,n)}(e,t,t.validationMessage,r)},f=function(e,t,r){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.disabled=!1,t.classList.remove(r.inactiveButtonClass)):(t.disabled=!0,t.classList.add(r.inactiveButtonClass))},_=function(e,t){var r=Array.from(e.querySelectorAll(t.inputSelector)),n=e.querySelector(".form__button");r.forEach((function(o){""===o.value?(m(e,o,t),p(e,o,t)):(p(e,o,t),m(e,o,t)),f(r,n,t)}))},v=function(e,t,r){Array.from(e.querySelectorAll(r.inputSelector)).forEach((function(e){t.offsetHeight>30?e.style.marginBottom="".concat(t.offsetHeight,"px"):e.removeAttribute("style")}))},y=document.querySelector(".popup_profileAdd"),S=document.querySelector(".popup_cardAdd"),q=document.querySelector(".profile__edit-link"),k=document.querySelector(".form__name"),L=document.querySelector(".form__profession"),E=document.querySelector(".profile__name"),g=document.querySelector(".profile__profession"),h=document.querySelector(".profile__add-link"),C=document.querySelector(".form__place"),b=document.querySelector(".form__link-place"),x=document.querySelector(".form_add-profile"),A=document.querySelector(".form_add-place"),j={formSelector:".form",inputSelector:".form__item",submitButtonSelector:".form__button",inactiveButtonClass:"form__button_inactive",inputErrorClass:"form__item_type_error",errorClass:"form__input-error_active"};q.addEventListener("click",(function(){e(y),k.value=E.textContent,L.value=g.textContent,_(x,j)})),h.addEventListener("click",(function(){e(S),_(A,j)})),x.addEventListener("submit",(function(e){e.preventDefault(),E.textContent=k.value,g.textContent=L.value,t()})),A.addEventListener("submit",(function(e){e.preventDefault(),u(l(C.value,b.value)),A.reset(),t()})),[{name:"Архыз",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg"},{name:"Челябинская область",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg"},{name:"Иваново",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg"},{name:"Камчатка",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg"},{name:"Холмогорский район",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg"},{name:"Байкал",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg"}].forEach((function(e){u(l(e.name,e.link))})),d=j,Array.from(document.querySelectorAll(d.formSelector)).forEach((function(e){e.addEventListener("submit",(function(e){e.preventDefault()})),function(e,t){var r=Array.from(e.querySelectorAll(t.inputSelector)),n=e.querySelector(t.submitButtonSelector);f(r,n,t),r.forEach((function(o){o.addEventListener("input",(function(){m(e,o,t),f(r,n,t)}))}))}(e,d)}))})();