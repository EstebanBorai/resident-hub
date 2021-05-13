export class UserNotFound extends Error {
  constructor(criteria: string, value: string) {
    super(`No user with "${criteria}": ${value}, found`);

    this.name = 'UserNotFound';
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
