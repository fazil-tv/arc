"use client";
import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from 'zod';
import { useRegisterUserMutation, useLoginUserMutation, useVerifyOtpMutation } from "../../redux/user/userApi";
import { useRouter } from 'next/navigation';
import { validateUserLogin, UserLoginValues, ValidationErrors } from "@/app/shared/validation";
import { GoogleLogin } from '@react-oauth/google';
import GoogleSignInButton from "./googlesignin";
import { Button } from "@/components/ui/button";

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp";



const LoginSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(6, {
        message: "Password must be at least 6 characters.",
    }),
});

const SignUpSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
  confirmPassword: z.string().min(6, {
    message: "Confirm Password must be at least 6 characters.",
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});



interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
    value: string;
    index: number;
    onChange: (e: React.ChangeEvent<HTMLInputElement>, index: number) => void;
    style?: React.CSSProperties;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, value, onChange, index, style }) => {





    const router = useRouter();
    const [isLogin, setIsLogin] = useState(true);
    const [showOtp, setShowOtp] = useState(false);

    

    const form = useForm({
        resolver: zodResolver(isLogin ? LoginSchema : SignUpSchema),
        defaultValues: isLogin
            ? { email: "", password: "" }
            : { username: "", email: "", password: "", confirmPassword: "" },
    });


    const { handleSubmit: formHandleSubmit, formState, register } = form;

    const { errors } = formState;

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',

    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {

        setFormData({ ...formData, [e.target.name]: e.target.value });
    };


    const [otpValue, setOtpValue] = useState('');



    const handleOtpChange = (newValue: string) => {
        console.log(newValue);
        setOtpValue(newValue);

    };

    useEffect(() => {
        console.log(otpValue, "Updated otpValue");
    }, [otpValue]);







    const [signup, { isLoading: isSignupLoading }] = useRegisterUserMutation();
    const [login, { isLoading: isLoginLoading }] = useLoginUserMutation();
    const [Verifyotp, { isLoading: isVerifyLoading }] = useVerifyOtpMutation();


    const onSubmit = async (data: any) => {

        if (isLogin) {
            try {

                const loginresponse = await login({
                    email: formData.email,
                    password: formData.password,
                });
                console.log("loginresponse", loginresponse);

                console.log("loginresponse refreshtoken", loginresponse.data.user.refreshtoken);
                console.log("loginresponse tokens", loginresponse.data.user.token);


                localStorage.setItem('Token', loginresponse.data.user.token);
                localStorage.setItem('refreshToken', loginresponse.data.user.refreshtoken);

                console.log("Tokens stored successfully");

                if (loginresponse.data.success) {
                    onClose();
                    router.push('/');
                } else {
                    console.error(loginresponse.data.message);
                }
            } catch (error) {
                console.error('Login failed:', error);
            }
        } else {
            try {

                console.log(formData);

                const signupresponse = await signup({
                    username: formData.username,
                    email: formData.email,
                    password: formData.password,
                    confirmPassword: formData.confirmPassword,
                });
                console.log("signupresponse", signupresponse);

                if (signupresponse.data.success) {
                    setShowOtp(true);
                } else {
                    console.error(signupresponse.data.message);
                }
            } catch (error) {
                console.error('Signup failed:', error);
            }
        }
    };



    const handleOtpVerify = async () => {

        const verificationData = {
            otp: otpValue,
            email: formData.email,
        };
        console.log(otpValue);

        try {

            const Verifyotpresponse = await Verifyotp(verificationData);

            console.log('Verifyotpresponse:', Verifyotpresponse);


            localStorage.setItem('Token', Verifyotpresponse.data.token);
            localStorage.setItem('refreshToken', Verifyotpresponse.data.refreshToken);

            console.log("Tokens stored successfully");



            if (Verifyotpresponse.data.success) {
                setShowOtp(false);
                onClose();
                router.push('/');
            } else {
                console.log(Verifyotpresponse.data.message)
            }
        } catch (error) {
            console.log(error);

        }

    };


    const responseMessage = (response: any) => {
        console.log(response);
    };
    const errorMessage = (error: any) => {
        console.log(error);
    };


    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
            <div
                className="relative bg-cover bg-center rounded-lg shadow-lg w-1/3 h-[550px] p-8 flex flex-col justify-center"
                style={{
                    backgroundImage: "url('/images/signupimg.jpg')",
                    backgroundSize: "cover",
                }}
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-5 text-white hover:text-gray-200"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 float-right"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>
                <h2 className="text-2xl font-bold mb-4 text-center text-white">
                    {showOtp ? "Verify OTP" : isLogin ? "Login" : "Sign Up"}
                </h2>
                {!showOtp ? (
                    <Form {...form}>
                        <form onSubmit={formHandleSubmit(onSubmit)} className="space-y-1">
                            {!isLogin && (
                                <FormField
                                    control={form.control}
                                    name="username"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Username</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Enter your username"
                                                    type="text"
                                                    {...register("username")}
                                                    value={formData.username}
                                                    onChange={handleChange}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            )}

                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="email"
                                                placeholder="Enter your email"
                                                {...field}
                                                value={formData.email}
                                                {...register("email")}
                                                onChange={handleChange}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="password"
                                                placeholder="Enter your password"
                                                {...field}
                                                value={formData.password}
                                                {...register("password")}
                                                onChange={handleChange}

                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            {!isLogin && (
                                <FormField
                                control={form.control}
                                name="confirmPassword"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Confirm Password</FormLabel>
                                    <FormControl>
                                      <Input
                                        type="password"
                                        placeholder="Confirm your confirmPassword"
                                        {...field}
                                        value={formData.confirmPassword}
                                        {...register("confirmPassword")}
                                        onChange={handleChange}
                                      />
                                    </FormControl>
                                    {errors.confirmPassword && <FormMessage>{errors.confirmPassword.message}</FormMessage>}
                                  </FormItem>
                                )}
                              />
                            )}

                            <Button type="submit" className="pt-5 mt-52">
                                {isLogin ? "Login" : "Sign Up"}
                            </Button>
                        </form>
                        <GoogleSignInButton onClose={onClose} />
                    </Form>
                ) : (
                    <div className="text-center text-white">
                        <p className="text-lg">Please enter the OTP sent to your email:</p>

                        <div className="flex justify-center">
                            <InputOTP maxLength={6} onChange={(value) => handleOtpChange(value)}>
                                <InputOTPGroup>
                                    {Array(6).fill("").map((_, index) => (
                                        <InputOTPSlot
                                            key={index}
                                            index={index}
                                            style={{ outline: 'none', boxShadow: 'none' }}

                                        />
                                    ))}
                                </InputOTPGroup>
                            </InputOTP>
                        </div>
                        <Button onClick={handleOtpVerify}>Verify OTP</Button>
                    </div>
                )}
                {!showOtp && (
                    <p className="mt-4 text-center text-white">
                        {isLogin
                            ? "Don't have an account? "
                            : "Already have an account? "}
                        <button
                            onClick={() => setIsLogin(!isLogin)}
                            className="text-blue-200 hover:text-blue-300"
                        >
                            {isLogin ? "Sign Up" : "Login"}
                        </button>
                    </p>
                )}
            </div>
        </div>
    );
};

export default AuthModal;
