import UserModel, { Role } from '../../../src/server/models/user';

describe('UserModel', (): void => {
  test('validate "UserModel" instance to have all required fields', (): void => {
    const user = new UserModel({
      email: 'user@thruway.com',
      password: '12345',
      role: Role.Admin,
      refreshToken: undefined,
    });

    const result = user.validateSync();

    expect(result).toBeUndefined();
  });

  test('validate "UserModel" instance to have all required fields', (): void => {
    const user = new UserModel({
      email: 'user@thruway.com',
      password: '12345',
      role: 'invalidrole',
      refreshToken: undefined,
    });

    const { errors } = user.validateSync();

    expect(Object.keys(errors)).toHaveLength(1);
    expect(errors.role).not.toBeUndefined();
    expect(errors.role.message).toBe(
      '"invalidrole" is not a valid "UserModel.role" value',
    );
  });
});

describe('UserModel.role', (): void => {
  test(`checks if User's role is allowed`, (): void => {
    const user = new UserModel({
      email: 'user@thruway.com',
      password: '12345',
      role: 'manager',
      refreshToken: undefined,
    });

    expect(user.isAllowed([Role.Manager, Role.Admin])).toBe(true);
  });

  test(`checks if User's role is not allowed`, (): void => {
    const user = new UserModel({
      email: 'user@thruway.com',
      password: '12345',
      role: 'user',
      refreshToken: undefined,
    });

    expect(user.isAllowed([Role.Manager, Role.Admin])).toBe(false);
  });

  test('invalidates "UserModel.role" to be a valid role', (): void => {
    const user = new UserModel({
      email: 'user@thruway.com',
      password: '12345',
      role: 'invalidrole',
      refreshToken: undefined,
    });

    const { errors } = user.validateSync();

    expect(Object.keys(errors)).toHaveLength(1);
    expect(errors.role).not.toBeUndefined();
    expect(errors.role.message).toBe(
      '"invalidrole" is not a valid "UserModel.role" value',
    );
  });
});
