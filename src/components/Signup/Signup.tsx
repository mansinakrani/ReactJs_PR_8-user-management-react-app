import "./Signup.css";
import Image from "../image/signup.png";

import { Button } from "@material-ui/core";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as yup from "yup";
import "yup-phone";
import Label from "../styles/Label";
import { addUser } from "../redux/actions/UserProfileData";
import { useDispatch} from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

interface FormValues {
  image: Blob | MediaSource | string | null;
  name: string;
  email: string;
  phoneno: string | number;
  password: string | number;
  cnfpassword: string | number;
}

// the Formik component supports yup validation out-of-the-box via the `validationSchema` prop
const validationSchema = yup.object().shape({
  image: yup.mixed()
  .nullable()
  .test(
    "fileSize",
    "File size is too large",
    values => values.image.size > 2000000) // This is 2MB written in bytes
    .required('Required *'),
  name: yup
    .string()
    .max(15, "Name is too larg it must be in between 15 characters")
    .min(3, "Name is too short it must be greater than 3 characters")
    .required("Name required*"),
  email: yup
    .string()
    .email()
    .required("Email required*"),
  phoneno: yup
    .string()
    .phone("IN", true)
    .min(10, "Phone Number must be 10 digits")
    .max(10, "Phone Number must be 10 digits")
    .required("Phone Number required*"),
  password: yup
    .string()
    .min(6, "Password is too short - should be 6 characters minimum")
    .matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()]).{8,20}\S$/)
    .required('Please enter valid password. One uppercase, one lowercase, one special character and no spaces'),
  cnfpassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Password doesn't match")
    .required("Password required*"),
});

const Signup = () => {
  const dispatch = useDispatch();
  const [photoPath, setPhotoPath] = useState<any | null>(null);
  const navigate = useNavigate();
  const initialValues: FormValues = {
    image: " ",
    name: '',
    email: '',
    phoneno: '',
    password: '',
    cnfpassword: '',
  }; 

  const submitForm = (
    values: FormValues,
    formik: FormikHelpers<FormValues>
  ) => {
    let imgBlob = URL.createObjectURL(values.image as Blob | MediaSource);
    values.image = imgBlob;
    dispatch(addUser(values));
    alert('You have successfully signed up.');
    navigate('/Home');
    formik.resetForm();
  }  
  return (
    <>
    <div id='header'>
      <h1>User Management App</h1>
    </div>
    <div className="container">
      
      <div className="form-wrapper">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={submitForm}
        >
        {({setFieldValue}) => (
          <Form noValidate autoComplete="off">
  
            <h2 className="heading">Sign Up</h2>
            <div className="upload_img">
              <input type='file' name="image" id="image" accept=".jpg, .png" hidden onChange={(e : React.ChangeEvent<HTMLInputElement>) => {
                if (!e.target.files) return;
                setFieldValue('image', e.target.files[0]);
                setPhotoPath(URL.createObjectURL(e.target.files![0]));
              }} />
              <label htmlFor='image' id="upload-option">photo +</label>
              <br />
              <span className="error_text"><ErrorMessage name="image" /></span>  
              { photoPath ? (<img id="insertedPhoto" src={photoPath} alt='' />) : null}
            </div>

            <Label>Name</Label> <br />
            <Field
              name="name"
              label="Name"
              size="small"
              className="input_style"
              placeholder="Enter Name" /><br />
            <span className="error_text"> <ErrorMessage name="name" /></span><br />

            <Label>E-mail</Label> <br />
            <Field
              name="email"
              label="E-mail"
              size="small"
              className="input_style"
              placeholder="Enter email" /><br />
            <span className="error_text"> <ErrorMessage name="email" /></span><br />

            <Label>Phone no</Label> <br />
            <Field
              name="phoneno"
              label="Phone no"
              size="small"
              type="text"
              className="input_style"
              placeholder="Enter Phone number" /><br />
            <span className="error_text"> <ErrorMessage name="phoneno" /></span><br />

            <Label>Password</Label> <br />
            <Field
              name="password"
              label="password"
              size="small"
              type="password"
              className="input_style"
              placeholder="Enter password" /><br />
            <span className="error_text"> <ErrorMessage name="password" /></span><br />


            <Label>Confirm Password</Label> <br />
            <Field
              name="cnfpassword"
              label="confirm password"
              size="small"
              type="password"
              className="input_style"
              placeholder="Confirm password" /><br />
            <span className="error_text"> <ErrorMessage name="cnfpassword" /></span><br />

            <span className="submitButton">
              <Button
                type="submit"
                variant="contained"
                size="large"
                color="primary"
              >
                Submit
              </Button>
            </span>
            <Button
              type="reset"
              variant="contained"
              size="large"
              color="inherit"
            >
              Reset
            </Button>
          </Form>
        )}
        </Formik>
      </div>
      <div className="image">
        <img src={Image} alt="signup" />
      </div>
    </div>
    </>
  );
};

export default Signup;