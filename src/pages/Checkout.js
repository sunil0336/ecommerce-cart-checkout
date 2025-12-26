import { Formik, Form, Field, ErrorMessage } from "formik";
import { checkoutSchema } from "../validations/checkoutSchema";

const Checkout = ({ onSubmit }) => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-xl p-6 md:p-8">

        <h2 className="text-2xl font-bold mb-1">Checkout</h2>
        <p className="text-gray-500 mb-6">
          Enter your delivery details to complete your order
        </p>

        <Formik
          initialValues={{
            fullName: "",
            address: "",
            city: "",
            pincode: "",
            paymentMethod: "",
          }}
          validationSchema={checkoutSchema}
          onSubmit={onSubmit}
        >
          <Form className="space-y-6">

            {/* Personal Section */}
            <div className="bg-gray-50 rounded-xl p-4 border">
              <h3 className="font-semibold mb-3 text-gray-700">
                Personal Details
              </h3>

              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium">Full Name</label>
                  <Field
                    name="fullName"
                    className="w-full mt-1 border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="Enter your name"
                  />
                  <ErrorMessage name="fullName" component="p" className="text-red-500 text-sm" />
                </div>
              </div>
            </div>

            {/* Address Section */}
            <div className="bg-gray-50 rounded-xl p-4 border">
              <h3 className="font-semibold mb-3 text-gray-700">
                Address Details
              </h3>

              <div className="space-y-3">

                <div>
                  <label className="block text-sm font-medium">Address</label>
                  <Field
                    as="textarea"
                    rows="3"
                    name="address"
                    className="w-full mt-1 border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="House / Street / Area"
                  />
                  <ErrorMessage name="address" component="p" className="text-red-500 text-sm" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium">City</label>
                    <Field
                      name="city"
                      className="w-full mt-1 border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                      placeholder="City name"
                    />
                    <ErrorMessage name="city" component="p" className="text-red-500 text-sm" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium">Pincode</label>
                    <Field
                      name="pincode"
                      className="w-full mt-1 border rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                      placeholder="6-digit pincode"
                    />
                    <ErrorMessage name="pincode" component="p" className="text-red-500 text-sm" />
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Section */}
            <div className="bg-gray-50 rounded-xl p-4 border">
              <h3 className="font-semibold mb-3 text-gray-700">
                Payment Method
              </h3>

              <div className="space-y-2">

                <label className="flex items-center gap-3 p-2 border rounded-lg hover:bg-gray-100 cursor-pointer">
                  <Field type="radio" name="paymentMethod" value="COD" />
                  Cash on Delivery
                </label>

                <label className="flex items-center gap-3 p-2 border rounded-lg hover:bg-gray-100 cursor-pointer">
                  <Field type="radio" name="paymentMethod" value="CARD" />
                  Credit / Debit Card
                </label>

                <label className="flex items-center gap-3 p-2 border rounded-lg hover:bg-gray-100 cursor-pointer">
                  <Field type="radio" name="paymentMethod" value="UPI" />
                  UPI Payment
                </label>

                <ErrorMessage name="paymentMethod" component="p" className="text-red-500 text-sm" />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-3 rounded-xl text-lg font-semibold hover:bg-green-700 transition"
            >
              Continue to Order Summary →
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default Checkout;
