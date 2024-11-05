"use client";
import { useRouter } from 'next/navigation';
import "./login.css";
import React, { useState, ChangeEvent } from 'react';
import { useAdminloginMutation } from '@/redux/admin/adminApi';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store'; 
import { z } from 'zod';
import { AlertDestructive } from '@/components/admin/erroralert';




const adminLoginSchema = z.object({
  email: z.string().nonempty({ message: 'Email is required' }).email({ message: 'Invalid email format' }),
  password: z.string().nonempty({ message: 'Password is required' }).min(6, { message: 'Password must be at least 6 characters long' }),
});

function Page() {

  const router = useRouter();

  const { Admin_Token, Admin_refreshToken } = useSelector((state: RootState) => state.admin);
  const [backendError, setBackendError] = useState<string>('');


  // useEffect(() => {
  //   if (Admin_Token) {
  //     router.push('/admin');
  //   }
  // }, [router]);


  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
    setBackendError('');
  };

  const [login, { isLoading: isLoginLoading }] = useAdminloginMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {

      adminLoginSchema.parse(formData);


      const loginresponse = await login({
        email: formData.email,
        password: formData.password,
      }).unwrap();

      if (loginresponse.success) {
        localStorage.setItem('Admin_Token', loginresponse.tokens.accessToken);
        localStorage.setItem('Admin_refreshToken', loginresponse.tokens.refreshToken);

        router.push('/admin');
      } else {
        setBackendError(loginresponse.message);
        console.log(loginresponse.message);
      }
    } catch (error: any) {

      if (error instanceof z.ZodError) {
        const zodErrors = error.errors.reduce((acc: Record<string, string>, currError) => {
          acc[currError.path[0] as string] = currError.message;
          return acc;
        }, {});
        setErrors(zodErrors);
      } else {
        setBackendError('Invalid email or password.');
        console.error('An unexpected error occurred:', error);
      }
    }
  };

  return (
    <>
      <section className="">
        <span className='flex justify-end pt-5 pr-5 absolute float-right error-msg'>

          {backendError && <AlertDestructive error={backendError} />}

        </span>

        <div className="admin-dash-sec-1 p-2 flex  items-center justify-center px-16 py-16 mx-auto md:h-screen lg:py-0 ">

          {/* <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
            <img
              className="w-8 h-8 mr-2"
              src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
              alt="logo"
            />
            F-arc
          </a> */}


          <div className="min-w-fit bg-black rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700 admin-login-sec flex  ">
            <div className="space-y-4 md:space-y-6 sm:p-24 mt-12 mb-12">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-white md:text-2xl dark:text-white pb-8">
                Sign in to your account
              </h1>
              <form className="space-y-4 md:space-y-6 mt-5" onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-white dark:text-white"
                  >
                    Your email
                  </label>

                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-black rounded-lg focus:outline-none block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                    placeholder="name@company.com"
                    value={formData.email}
                    onChange={handleChange}
                  />


                  {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-white dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50  text-black  focus:outline-none  border-gray-300  rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"

                    value={formData.password}
                    onChange={handleChange}
                  />
                  {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="remember"
                        aria-describedby="remember"
                        type="checkbox"
                        className="w-4 h-4 border text-black border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"

                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">
                        Remember me
                      </label>
                    </div>
                  </div>
                </div>
                <button
                  type="submit"
                  className="admin-signin-button w-full bg-custom-purple  text-white bg-primary-600 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Sign in
                </button>
              </form>
            </div>
            <div className="space-y-4 md:space-y-6 sm:p-24 login-back-img w-32 mx-9">
              <div>

              </div>

            </div>

          </div>
        </div>

      </section>
    </>
  );
}

export default Page;
