export type Credentials = {
  username: string;
  password: string;
};

export class BasicAuthError extends Error {
  constructor(message: string) {
    super(message);

    this.name = 'BasicAuthError';
    this.message = message;
  }
}

const HTTP_BASIC = /^ *(?:Basic) +([A-Za-z0-9._~+/-]+=*) *$/;

export default function basicAuth(credentials: string): Credentials {
  const parts = HTTP_BASIC.exec(credentials);

  if (!parts || parts.length !== 2) {
    throw new BasicAuthError('Inavlid "Authorization" header value provided');
  }

  const [schema, token] = parts;

  if (schema && token) {
    const buff = Buffer.from(token, 'base64').toString();
    const [username, password] = buff.split(':');

    return {
      username,
      password,
    };
  }

  throw new BasicAuthError('Inavlid "Authorization" header value provided');
}
