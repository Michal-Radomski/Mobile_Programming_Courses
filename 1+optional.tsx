// useForm.ts //* "Invalid Date"
import { useState } from "react";

interface FormValues {
  [key: string]: any; // Allows any key with any value type
}

interface UseFormReturn<T> {
  values: T;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (callback: (values: T) => void) => (e: React.FormEvent<HTMLFormElement>) => void;
  errors: Partial<Record<keyof T, string>>;
}

const useForm = <T extends FormValues>(initialValues: T, validate: (values: T) => Partial<Record<keyof T, string>>) => {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleSubmit = (callback: (values: T) => void) => (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validate(values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      callback(values);
    }
  };

  return { values, handleChange, handleSubmit, errors };
};

export default useForm;
