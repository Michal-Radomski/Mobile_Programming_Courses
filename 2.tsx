// LoginForm.tsx (context reduder redux) + window in native
import React from "react";
import useForm from "./useForm";

interface LoginFormValues {
  username: string;
  password: string;
}

const validate = (values: LoginFormValues) => {
  const errors: Partial<Record<keyof LoginFormValues, string>> = {};
  if (!values.username) {
    errors.username = "Username is required";
  }
  if (!values.password) {
    errors.password = "Password is required";
  }
  return errors;
};

const LoginForm: React.FC = () => {
  const { values, handleChange, handleSubmit, errors } = useForm<LoginFormValues>({ username: "", password: "" }, validate);

  const onSubmit = (values: LoginFormValues) => {
    console.log("Form submitted:", values);
    // Handle form submission (e.g., API call)
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>
          Username:
          <input type="text" name="username" value={values.username} onChange={handleChange} />
        </label>
        {errors.username && <p style={{ color: "red" }}>{errors.username}</p>}
      </div>
      <div>
        <label>
          Password:
          <input type="password" name="password" value={values.password} onChange={handleChange} />
        </label>
        {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}
      </div>
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
