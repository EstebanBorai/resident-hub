import React, { useState } from 'react';
import Card from '../../../../components/Card';
import useUser from '../../../../hooks/use-user';

import styles from './login.module.css';

export default function LoginScreen(): JSX.Element {
  const { login } = useUser();
  const [form, setForm] = useState<{ email: string; password: string }>({
    email: '',
    password: '',
  });

  const handleSubmit = async (event): Promise<void> => {
    event.preventDefault();
    await login(form.email, form.password);
  };

  return (
    <section className={styles.login}>
      <Card className={styles.form_wrapper}>
        <h2>Welcome back</h2>
        <p>Let us know who you are before proceeding!</p>
        <form onSubmit={handleSubmit}>
          <fieldset>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              placeholder="john@appleseed.com"
              onChange={(event) =>
                setForm({ ...form, email: event.target.value })
              }
            />
          </fieldset>
          <fieldset>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Your most valuable secret"
              onChange={(event) =>
                setForm({ ...form, password: event.target.value })
              }
            />
          </fieldset>
          <button type="submit">Log in</button>
        </form>
      </Card>
    </section>
  );
}
