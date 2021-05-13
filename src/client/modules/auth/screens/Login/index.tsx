import React from 'react';
import Card from '../../../../components/Card';

import styles from './login.module.css';

export default function LoginScreen(): JSX.Element {
  return (
    <section className={styles.login}>
      <Card className={styles.form_wrapper}>
        <h2>Welcome back</h2>
        <p>Let us know who you are before proceeding!</p>
        <form>
          <fieldset>
            <label htmlFor="email">Email</label>
            <input type="email" name="email" placeholder="john@appleseed.com" />
          </fieldset>
          <fieldset>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Your most valuable secret"
            />
          </fieldset>
          <button type="submit">Log in</button>
        </form>
      </Card>
    </section>
  );
}
