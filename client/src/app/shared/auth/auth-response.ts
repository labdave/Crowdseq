export class AuthResponse {
  token: string;
  user: any;

  constructor(token: string, user: any, refresh = '', sig_request = '') {
    this.token = token;
    this.user = user;
  }
}
