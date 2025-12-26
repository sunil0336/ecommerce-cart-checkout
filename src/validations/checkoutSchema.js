import * as Yup from "yup";

export const checkoutSchema = Yup.object({
  fullName: Yup.string().required("Full name is required"),
  address: Yup.string().required("Address is required"),
  city: Yup.string().required("City is required"),
  pincode: Yup.string()
    .matches(/^[0-9]{6}$/, "Invalid pincode")
    .required("Pincode is required"),
  paymentMethod: Yup.string().required("Select payment method"),
});
