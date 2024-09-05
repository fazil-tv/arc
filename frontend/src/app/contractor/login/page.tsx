"use client"
import { useLoginMutation } from '@/redux/contractor/contractorApi';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';
import { z } from 'zod';


const contractorLoginSchema = z.object({
  email: z.string().nonempty({ message: 'Email is required' }).email({ message: 'Invalid email format' }),
  password: z.string().nonempty({ message: 'Password is required' }).min(6, { message: 'Password must be at least 6 characters long' }),
});



function Page() {

  const router = useRouter();



  const { Contractor_Token, Contractor_refreshToken } = useSelector((state: RootState) => state.contractor);

  // useEffect(() => {
  //   if (Contractor_Token) {
  //     router.push('/contractor');
  //   }
  // }, [router,Contractor_Token]);

  const [errors, setErrors] = useState<Record<string, string>>({});




  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',

  });

  // const [errors, setErrors] = useState({});

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };


  const [login, { isLoading: isLoginLoading }] = useLoginMutation();


  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {

      contractorLoginSchema.parse(formData);

      console.log(formData, "formDatas")

      const loginresponse = await login({
        email: formData.email,
        password: formData.password
      }).unwrap();

      console.log("login loginresponse loginresponse", loginresponse.user.token);


      if (loginresponse.success) {
        console.log("okkk")

        localStorage.setItem('Contractor_Token', loginresponse.user.refreshtoken);
        localStorage.setItem('Contractor_refreshToken', loginresponse.user.token);

        router.push('/contractor');


      } else {
        console.log(loginresponse.message)
      }
    } catch (error: any) {

      if (error instanceof z.ZodError) {
        const zodErrors = error.errors.reduce((acc: Record<string, string>, currError) => {
          acc[currError.path[0] as string] = currError.message;
          return acc;
        }, {});
        setErrors(zodErrors);
      } else {
        console.error('An unexpected error occurred:', error);
      }

    }


  }


  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          <img
            className="w-8 h-8 mr-2"
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
            alt="logo"
          />
          F-arc
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>
            <form className="space-y-4 md:spzzzace-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  
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
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                      
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">
                      Remember me ?
                    </label>
                  </div>
                </div>
                {/* <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">
                  Forgot password?
                </a> */}
              </div>
              <button
                type="submit"
                className="w-full text-black bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Sign in
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet?{' '}
                <a href="/contractor/signup" className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                  Sign up
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Page;
