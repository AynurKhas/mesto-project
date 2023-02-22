export class UserInfo {
    constructor(data) {
        this._selectorName = data.name;
        this._selectorProf = data.prof;
        this._selectorAvatar = data.avatar;
        
        this._inputName = document.querySelector(this._selectorName);
        this._inputProf = document.querySelector(this._selectorProf);
        this._inputAvatar = document.querySelector(this._selectorAvatar);

        this._name;
        this._prof;
        this._avatar;
        this._id;
    }
    
    getUserInfo() {
      return {
        name: this._name,
        profession: this._prof,
        avatar: this._avatar,
        id: this._id
      }
    }

    initUserInfo(name, prof, avatar, id) {
      this._name = name;
      this._prof = prof;
      this._avatar = avatar;
      this._id = id;
    }

    setUserInfo(name, prof) {
      this._inputName.textContent = name;
      this._inputProf.textContent = prof;
    }

    setAvatar(avatar) {
      this._inputAvatar.src = avatar;
    }
}