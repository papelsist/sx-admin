export class User {

  constructor(
    public username: string,
    private roles: Array<string>
  ) {
    this.roles = [];
  }

  hasRole(role: string): boolean {
    return this.roles.find( r => r === role) !== null;
  }


}
