"use client"
import { useGetServiceByIdQuery } from '@/redux/user/userApi';
import { useParams } from 'next/navigation';
import { ServicesCarosil } from '@/components/user/services/ServicesCarosil';
import Link from 'next/link';

function servicesDetile() {
    const { id } = useParams();
    const { data: service, error, isLoading } = useGetServiceByIdQuery(id as string);
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading service</div>;

    return (

        <>
                <div className='container-fluid m-[20px_0px] flex text-3xl w-full px-20'>
                    <div className="servicesimages w-1/2 flex justify-between items-center">
                        {service && (
                            <div className="container mx-auto py-10 px-4 flex justify-center">
                                <div className="space-y-6 ">
                                <h1 className=" mb-6 text-gray-800 servicetitle tracking-[-0.07rem] text-4xl font-semibold leading-[128%]">{service.service.name}</h1>
                                    <div>
                                        <p className="mt-2 text-gray-600 opacity-80 text-[var(--dark-green--300)] text-xl leading-[148%]">
                                            {service.service.description}
                                        </p>
                                    </div>
                                    <div className='flex '>

                                        <div className='flex me-16'>
                                            <h2 className=" text-gray-600 text-lg pr-6">Price</h2>
                                            <p className=" text-gray-700 text-lg font-bold">
                                                {service.service.cost}
                                            </p>

                                        </div>

                                        <div className='flex'>
                                            <h2 className="text-gray-600 text-lg pr-6">Duration</h2>
                                            <p className=" text-gray-700 text-lg font-bold">
                                                {service.service.duration} hours
                                            </p>
                                        </div>

                                    </div>

                                     <div className='w-60'>
                                     <Link href={`/InitiatingProject/${service.service._id}?serviceName=${service.service.name}`}>
                                        <button className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600 transition ease-in-out duration-200 text-lg ">
                                            Create a New Project
                                        </button>
                                    </Link>
                                    </div>

                                </div>
                            </div>
                        )}
                    </div>
                    <div className="p-32 w-1/2">
                        <ServicesCarosil servicesimg={service.service.images} />
                    </div>
                </div>

        </>
    )
}

export default servicesDetile