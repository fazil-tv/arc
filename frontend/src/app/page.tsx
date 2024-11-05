import React from 'react';
import dynamic from 'next/dynamic';
import '../styles/user.css'
import UserHeader from "@/components/user/usernavbar/usernavbar";

const ServicesDetiles = dynamic(() => import('@/components/user/services/Services'), {
  loading: () => <p>Loading...</p>,
  ssr: true 
});



const BannerSection = dynamic(() => import('@/components/user/bannerSection'), {
  loading: () => <p>Loading...</p>,
  ssr: true
});


const Page = () => {
  return (
    <>
    <UserHeader />
      <div className="banner-section">
        <BannerSection />
      </div>
     
      <div style={{ position: 'relative'  }} id='services-section' >
        <ServicesDetiles />
      </div>
    </>
  );
};

export default Page;