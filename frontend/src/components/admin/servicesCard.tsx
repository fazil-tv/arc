import { useGetAllServicesQuery } from '@/redux/admin/adminApi'
import React from 'react'
import { CardActions } from './cardActionsbutton';


function servicesCard() {

    const { data: services, error, isLoading } = useGetAllServicesQuery({});

    if (isLoading) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>Failed to load services</div>;
    }

    return (
        <>


            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                {services?.map((service: any) => (
                    <div
                        key={service.id}
                        className="relative max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 hover:shadow-lg transition-shadow"
                    >
                        <div className="absolute inset-0 flex items-start justify-end opacity-0 hover:opacity-100 transition-opacity">
                           <CardActions data={service} />
                        </div>
                        <a href="#">
                            <img className="rounded-t-lg" src={`/uplodedImages/${service.images[0]}`} alt={service.name} />
                        </a>
                        <div className="p-5">
                            <a href="#">
                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                    {service.name}
                                </h5>
                            </a>
                            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                                {service.description}
                            </p>

                        </div>


                    </div>
                ))}
            </div>
        </>
    )
}

export default servicesCard