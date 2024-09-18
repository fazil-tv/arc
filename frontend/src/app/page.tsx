import React from 'react';
import dynamic from 'next/dynamic';
import '../styles/user.css'
import UserHeader from "@/components/user/usernavbar/usernavbar";
const BannerSection = dynamic(() => import('@/components/user/bannerSection'), {
  loading: () => <p>Loading...</p>, 
  ssr: true 
});


const Page = () => {
  return (
    <>
      <UserHeader />
      <BannerSection />
    </>
  );
};

export default Page;