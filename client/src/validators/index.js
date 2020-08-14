import * as Yup from "yup";

export const profileSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  lastName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  street: Yup.string()
    .min(3, "Too Short!")
    .max(60, "Too Long!")
    .required("Required"),
  city: Yup.string()
    .min(2, "Too Short!")
    .max(60, "Too Long!")
    .required("Required"),
  country: Yup.string().required("Required"),
  state: Yup.string(),
  postcode: Yup.string().required("Required"),
  phone: Yup.string()
    .min(8, "Too Short!")
    .max(15, "Too Long!")
    .matches(/^\d+$/)
    .required("Required"),
});
export const shippingSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  lastName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  street: Yup.string()
    .min(3, "Too Short!")
    .max(60, "Too Long!")
    .required("Required"),
  city: Yup.string()
    .min(2, "Too Short!")
    .max(60, "Too Long!")
    .required("Required"),
  country: Yup.string().required("Required"),
  state: Yup.string(),
  postcode: Yup.string().required("Required"),
  phone: Yup.string()
    .min(8, "Too Short!")
    .max(15, "Too Long!")
    .matches(/^\d+$/),
});
export const signupSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  password: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
});
export const loginSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  password: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
});
