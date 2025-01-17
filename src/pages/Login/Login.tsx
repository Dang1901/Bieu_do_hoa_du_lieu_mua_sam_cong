import Button from "@/components/common/Button";
import FormInput from "@/components/form/FormInput";
import { useArchive } from "@/hooks/useArchive";
import { EFetchStatus } from "@/shared/enums/fetchStatus";
import { IAuthInitialState, resetStatus } from "@/services/store/auth/auth.slice";
import { Formik } from "formik";
import { Link } from "react-router-dom";
import { object, string } from "yup";
import { login } from "@/services/store/auth/auth.thunk";
import useFetchStatus from "@/hooks/useFetchStatus";

interface ILoginFormData {
  email: string;
  password: string;
}

const Login = () => {
  const { state, dispatch } = useArchive<IAuthInitialState>("auth");

  const handleLogin = (data: ILoginFormData) => {
    dispatch(
      login({
        body: data,
      }),
    );
  };

  useFetchStatus({
    module: "auth",
    reset: resetStatus,
    actions: {
      success: {
        message: "Logged in successfully",
        navigate: "/dashboard",
      },
      error: {
        message: state.message,
      },
    },
  });

  const loginFormInitialValues: ILoginFormData = { email: "", password: "" };

  const validateSchema = object().shape({
    email: string().email("Invalid email!").required("Please enter your email!"),
    password: string().required("Please enter your password"),
  });

  return (
    <section className="bg-gray-50">
      <div className="mx-auto flex h-screen flex-col items-center justify-center px-6 py-8 lg:py-0">
        <a href="#" className="text-gray-900 display-m-semibold mb-6 flex items-center text-2xl">
          <img className="mr-2 h-8 w-8" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" />
          Septenary Solution
        </a>
        <div className="w-full rounded-lg bg-white shadow sm:max-w-md md:mt-0 xl:p-0">
          <div className="flex flex-col gap-5 p-8">
            <h1 className="text-gray-900 display-m-bold md:text-xl-semibold">Login to your account</h1>
            <Formik
              validationSchema={validateSchema}
              initialValues={loginFormInitialValues}
              validateOnBlur
              onSubmit={(data) => {
                handleLogin(data);
              }}
            >
              {({ handleSubmit, values, setFieldValue, errors, touched, handleBlur }) => {
                return (
                  <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
                    <FormInput
                      type="text"
                      autoFocus
                      value={values.email}
                      error={touched.email ? errors.email : ""}
                      isDisabled={state.status === EFetchStatus.PENDING}
                      name="email"
                      onChange={(value) => {
                        setFieldValue("email", value);
                      }}
                      onBlur={handleBlur}
                      placeholder="Enter your email..."
                    />
                    <FormInput
                      type="password"
                      name="password"
                      value={values.password}
                      error={touched.password ? errors.password : ""}
                      isDisabled={state.status === EFetchStatus.PENDING}
                      onBlur={handleBlur}
                      onChange={(value) => {
                        setFieldValue("password", value);
                      }}
                      placeholder="Enter your password..."
                    />
                    <Button text="Login" isLoading={state.status === EFetchStatus.PENDING} className="mt-3" />
                    <Link
                      to="/forgot-password"
                      className="text-m-regular cursor-pointer text-end text-primary-700 transition-colors hover:text-primary-500"
                    >
                      Forgot password?
                    </Link>
                  </form>
                );
              }}
            </Formik>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
