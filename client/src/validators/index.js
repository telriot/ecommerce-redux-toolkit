import * as Yup from "yup";

const stringReq = (min, max) =>
  Yup.string()
    .min(min, `Please enter at least ${min} characters`)
    .max(max, `Please enter at most ${max} characters`)
    .required("Required");

const emailReq = Yup.string().email("Invalid email").required("Required");
const phoneReq = Yup.string()
  .min(6, "Too Short!")
  .max(20, "Too Long!")
  .matches(/^\d+$/)
  .required("Required");

export const profileSchema = Yup.object().shape({
  firstName: stringReq(2, 30),
  lastName: stringReq(2, 30),
  email: emailReq,
  street: stringReq(2, 60),
  city: stringReq(2, 60),
  country: stringReq(2, 40),
  state: stringReq(2, 30),
  postcode: stringReq(4, 15),
  phone: phoneReq,
});

export const signupSchema = Yup.object().shape({
  username: stringReq(2, 30),
  password: stringReq(2, 30),
  email: emailReq,
});
export const loginSchema = Yup.object().shape({
  username: stringReq(2, 30),
  password: stringReq(2, 30),
});
