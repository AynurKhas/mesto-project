export class UserInfo {
    constructor(data,setUserInfoCallBack,setAvatarCallBack) {
        this._selectorName = data.name;
        this._selectorProf = data.prof;
        this._selectorAvatar = data.avatar;
        this._setUserInfoCallBack = setUserInfoCallBack;
        this._setAvatarCallBack = setAvatarCallBack;

        this.name;
        this.prof;
        this.avatar;
        this.id;
    }

    getUserInfo(name, prof, avatar, id) {
      this.putUserInfo(name,prof);
      this.avatar = avatar;
      this.id = id;
      document.querySelector(this._selectorAvatar).src = this.avatar;
    }

    putUserInfo(name, prof) {
      this.name = name;
      this.prof = prof;
      document.querySelector(this._selectorName).textContent = name;
      document.querySelector(this._selectorProf).textContent = prof;
    }

    putAvatar(avatar) {
      this.avatar = avatar;
      document.querySelector(this._selectorAvatar).src = this.avatar;
    }
    
    setUserInfo(name,prof) {
      return this._setUserInfoCallBack(name,prof);
    }

    setAvatar(avatar) {
      return this._setAvatarCallBack(avatar);
    }
}