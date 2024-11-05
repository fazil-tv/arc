"use client"
import React from 'react'
import { useSearchParams } from 'next/navigation';

export default function InitiatingProjectbanner() {

    const searchParams = useSearchParams();
    const serviceName = searchParams.get('serviceName');


    return (

        <>
            <div>
                <div className="relative w-full h-[400px]">
                    <div
                        className="relative w-full h-[300px] bg-cover bg-center bg-no-repeat flex justify-center items-center"
                        style={{ backgroundImage: "url('/images/planbanner.jpeg')" }}
                    >
                        <p className='text-black  text-3xl font-medium tracking-wide'>{serviceName}</p>
                    </div>
                </div>
                <div>
                    <div>
                        <h1 className='text-center text-2xl font-medium tracking-wider pb-5'>Initiate Your Construction Project</h1>
                        <p className='text-center'>To ensure a seamless commencement of your construction project, we require detailed information to tailor our services precisely to your needs.<br /> Please complete the form below with the relevant project details.</p>
                    </div>
                </div>
            </div>
        </>
    )
}
