"use client";
import React, { useState } from "react";
import { useRouter } from 'next/navigation';



import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";


interface OtpModalProps {
    isOpen: boolean;
    onClose: () => void;
    onVerify: (otp: string) => void;
}

const OtpModal: React.FC<OtpModalProps> = ({ isOpen, onClose, onVerify }) => {
    const [otp, setOtp] = useState("");
    const router = useRouter();

    const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setOtp(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onVerify(otp);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
            <div
                className="relative bg-cover bg-center rounded-lg shadow-lg w-1/3 h-[300px] p-8 flex flex-col justify-center"
                style={{
                    backgroundImage: "url('/images/otp-bg.jpg')",
                    backgroundSize: "cover",
                }}
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-5 text-white hover:text-gray-200 "
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
                    Verify OTP
                </h2>
                <Form >
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <FormField
                            name="otp"
                            render={() => (
                                <FormItem>
                                    <FormLabel>OTP</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            placeholder="Enter OTP"
                                            value={otp}
                                            onChange={handleOtpChange}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit">Verify</Button>
                    </form>
                </Form>
            </div>
        </div>
    );
};

export default OtpModal;
