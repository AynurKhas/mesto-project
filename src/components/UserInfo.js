export class UserInfo {
    constructor(data,setUserInfoCallBack,setAvatarCallBack) {
        this._selectorName = data.name;
        this._selectorProf = data.prof;
        this._selectorAvatar = data.avatar;
        this._setUserInfoCallBack = setUserInfoCallBack;
        this._setAvatarCallBack = setAvatarCallBack;
        
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

    putUserInfo(name, prof) {
/*       document.querySelector(this._selectorName).textContent = name;
      document.querySelector(this._selectorProf).textContent = prof; */
      this._inputName.textContent = name;
      this._inputProf.textContent = prof;
    }

    putAvatar(avatar) {
      this._inputAvatar.src = avatar;
    }
    
    setUserInfo(name,prof) {
      this._name = name;
      this._prof = prof;
      return this._setUserInfoCallBack(name,prof);
    }

    setAvatar(avatar) {
      this._avatar = avatar;
      return this._setAvatarCallBack(avatar);
    }
}