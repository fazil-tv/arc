import dynamic from 'next/dynamic';
const ServicesDetile = dynamic(() => import('@/components/user/services/servicesDetile'), {
  ssr: true,
});


const Page: React.FC<{ params: { id: string } }> = ({ params }) => {

  return (
    <>
      <ServicesDetile />
    </>
  );
};

export default Page;
