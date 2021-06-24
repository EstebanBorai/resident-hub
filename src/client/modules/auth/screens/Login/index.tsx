import React, { useEffect } from 'react';
import { useFormik } from 'formik';

import * as F from '../../../../components/Form';
import Button from '../../../../components/Button';
import Card from '../../../../components/Card';
import useUser from '../../../../hooks/use-user';

import styles from './login.module.css';

type LoginForm = {
  email: string;
  password: string;
};

export default function LoginScreen(): JSX.Element {
  const { login, resumeSession } = useUser();
  const formik = useFormik<LoginForm>({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: async (values: LoginForm) => {
      await login(values.email, values.password);
    },
  });

  useEffect(() => {
    (async () => {
      await resumeSession();
    })();
  }, []);

  return (
    <section className={styles.login}>
      <Card className={styles.form_wrapper}>
        <form onSubmit={formik.handleSubmit}>
          <F.Fieldset>
            <F.Label text="Email" htmlFor="email" />
            <F.Input
              type="email"
              name="email"
              placeholder="john@appleseed.com"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              onFocus={formik.handleBlur}
            />
            <F.Feedback text={formik.errors.email} />
          </F.Fieldset>
          <F.Fieldset>
            <F.Label text="Password" htmlFor="password" />
            <F.Input
              type="password"
              name="password"
              placeholder="Your most valuable secret"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              onFocus={formik.handleBlur}
            />
            <F.Feedback text={formik.errors.password} />
          </F.Fieldset>
          <div className="flex items-center justify-between">
            <Button type="submit">Sign In</Button>
          </div>
        </form>
      </Card>
      <p className="text-center text-gray-500 text-xs">
        <a href="https://github.com/EstebanBorai/resident-hub" target="_blank">
          Thruway Parking Source
        </a>
      </p>
    </section>
  );
}
