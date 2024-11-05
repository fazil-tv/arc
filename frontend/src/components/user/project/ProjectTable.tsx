"use client";
import React from 'react';
import { useGetUserProjectsQuery } from '@/redux/user/userApi';
import Link from 'next/link';



function UserProjectDetails() {
    const { data: projects, error, isLoading } = useGetUserProjectsQuery({});

    console.log(projects)
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading projects</div>;

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg m-36 h-fit  ">
            <div className='flex items-center justify-center '>
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-7">Project id</th>
                            <th scope="col" className="px-6 py-7">project Name</th>
                            <th scope="col" className="px-6 py-7">Service type</th>
                            <th scope="col" className="px-6 py-7">Action</th>

                            <th scope="col" className="px-6 py-7">Created Date</th>
                            <th scope="col" className="px-6 py-7">Status</th>
                            <th scope="col" className="px-6 py-7">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {projects.projects.length > 0 ? (
                            projects.projects.map((project: any, index: number) => (
                                <tr key={project._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 h-44">
                                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                        #{index + 1}
                                    </td>
                                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                        {project.projectName}
                                    </td>
                                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                        {new Date(project.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                        {new Date(project.createdAt).toLocaleDateString()}
                                    </td>

                                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                        {new Date(project.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                        {project.status}
                                    </td>
                                    <td className="px-6 py-7">
                                        <Link href={`projects/${project._id}`} className="font-medium text-blue-600 hover:text-blue-800 dark:text-red-500 hover:underline">View Details</Link>
                                        <a href="#" className="font-medium text-red-600 dark:text-red-500 hover:underline">Remove</a>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td className="py-3 px-6 text-center">No projects found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default UserProjectDetails;
