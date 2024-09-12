"use client"
import React, { useState } from 'react'
import AuthModal from '../auth/userauth';

function BannerSection() {


    



  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };


    return (
        <>
            <div className="content-wrapper">
                <div className="content">
                    <div className="banner-section">
                        <h1 className="banner-head">Quality construction begins with a quality relationship</h1>
                        <div className="flex justify-center w-full mt-3">
                            <h1 className="banner-para w-7/12">
                                "Quality construction begins with a quality relationship. We believe that trust and communication are the foundation of every successful project. By working closely with our clients and understanding their unique needs, we ensure that every detail is crafted to perfection. Our commitment to excellence starts with building strong partnerships that last beyond the project’s completion."
                            </h1>
                        </div>
                    </div>
                </div>
                <div className="fixed-image-container w-full h-screen">
                    <img src="/images/mainbannerhd.png" alt="banner" className="fixed-image w-full h-full object-cover" />
                </div>
                <div className="flex items-center justify-center min-h-screen bg-gray-100">
                    <AuthModal isOpen={isModalOpen} onClose={closeModal} value={''} index={0} onChange={function (e: React.ChangeEvent<HTMLInputElement>, index: number): void {
                        throw new Error('Function not implemented.');
                    }} />
                </div>
            </div>
        </>
    )
}

export default BannerSection