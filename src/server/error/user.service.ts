export class UserByEmailNotFound extends Error {
  constructor(email: string) {
    super(`No user with ${email} wasn't found`);

    this.name = 'UserByEmailNotFound';
  }
}

export class InvalidCreadentials extends Error {
  constructor() {
    super('Invalid credentials where provided');

    this.name = 'InvalidCreadentials';
  }
}

export class InvalidUserRole extends Error {
  constructor() {
    super('The "role" value should be one of: "admin", "manager", or "user"');

    this.name = 'InvalidUserRole';
  }
}
