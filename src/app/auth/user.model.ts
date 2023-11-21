export class UserModel {
  constructor(
    public email: string,
    public id: string,
    private _token: string,
    private _tokenExpirationDate: Date
  ) {
  }

  public get token() {
    if (this._tokenExpirationDate === undefined || new Date() > this._tokenExpirationDate) {
      return '';
    }
    return this._token;
  }
}
