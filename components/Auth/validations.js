import * as yup from "yup";

export const loginValidationSchema = yup.object().shape({
  email: yup.string().required("ელ-ფოსტის შეყვანა სავალდებულოა"),
  password: yup
    .string()
    .min(8, ({ min }) => `პაროლი უნდა შეიცავდეს მინიმუმ ${min} სიმბოლოს`)
    .required("პაროლის შეყვანა სავალდებულოა"),
});

export const registerValidationSchema = yup.object().shape({
  email: yup.string().required("ელ-ფოსტის შეყვანა სავალდებულოა"),
  password: yup
    .string()
    .required("პაროლი სავალდებულოა")
    .oneOf(
      [yup.ref("repeatPassword"), null],
      "პაროლები უნდა ემთხვეოდეს ერთმანეთს"
    ),
  repeatPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "პაროლები უნდა ემთხვეოდეს ერთმანეთს"),
  answer: yup.string().required("პასუხის შეყვანა სავალდებულოა"),
});
