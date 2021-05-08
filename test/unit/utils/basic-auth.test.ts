import basicAuth, {
  BasicAuthError,
} from '../../../src/server/utils/basic-auth';

test('extract credentials from basic auth token', (): void => {
  const httpHeader = 'Basic YWxhZGRpbjpvcGVuc2VzYW1l';
  const credentials = basicAuth(httpHeader);

  expect(credentials).toEqual({
    username: 'aladdin',
    password: 'opensesame',
  });
});

test('throws on invalid http header value', (): void => {
  const httpHeader = 'This isnothttpauthbasicok';
  const extractCredentails = () => basicAuth(httpHeader);

  expect(extractCredentails).toThrow(BasicAuthError);
});
