export class UserByEmailNotFound extends Error {
  constructor(email: string) {
    super(`No user with email: "${email}" wasn't found`);

    this.name = 'UserByEmailNotFound';
  }
}

export class UserByIdNotFound extends Error {
  constructor(id: string) {
    super(`No user with id: "${id}" wasn't found`);

    this.name = 'UserByIdNotFound';
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

export class AdminUserAlreadyExists extends Error {
  constructor() {
    super('Attempted to create an "admin" user, but such user already exists');

    this.name = 'AdminUserAlreadyExists';
  }
}

export class InvalidUserDTO extends Error {
  constructor() {
    super('An invalid User DTO were provided');

    this.name = 'InvalidUserDTO';
  }
}
