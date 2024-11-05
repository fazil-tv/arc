import React from 'react';
import { IProject } from '@/interfaces';

interface ProjectInformationProps {
    project: IProject;
}

const ProjectInformations: React.FC<ProjectInformationProps> = ({ project }) => {

    return (
        <div className="container mx-auto p-8 rounded-xl pt-20 relative ">
        <div className="  shadow-xl rounded-xl p-8 flex flex-col md:flex-row uppercase  text-white  bg-transparent shadow-lg backdrop-blur-sm rounded-lg border border-white/20">
            <div className="flex-initial w-full md:w-1/2 p-4">
                <h2 className="text-3xl font-bold mb-4  border-b-2 border-gray-300 pb-2 tracking-wide">Project Details</h2>
                <ul className="space-y-4">
                    <li className="text-lg font-medium "><span className="font-semibold">Project Name:</span>{project.projectName}</li>
                    <li className="text-lg font-medium "><span className="font-semibold">Client:</span>{project.userId.username}</li>
                    {/* <li className="text-lg font-medium "><span className="font-semibold">Budget:</span>{project.totalBudget ? project.totalBudget : 'Not specified'}</li>   */}
                    <li className="text-lg font-medium "><span className="font-semibold">Category:</span>{project.serviceId.category}</li>               
                    {/* <li className="text-lg font-medium "><span className="font-semibold">Start Date:</span>{project.startDate ? project.startDate : 'Not specified'}</li> */}
                    {/* <li className="text-lg font-medium "><span className="font-semibold">End Date:</span>{project.endDate ? project.endDate : 'Not specified'}</li> */}
                </ul>
            </div>
            <div className="flex-initial w-full md:w-1/2 p-4 mt-6 md:mt-0">
                <h2 className="text-3xl font-bold mb-4  border-b-2 border-gray-300 pb-2 tracking-wide">Location</h2>
                <p className="text-lg font-medium mb-4">
                    <span className="font-semibold">Address:</span> {project.location.street}, {project.location.city}, {project.location.state}, {project.location.zip},{project.location.country}
                </p>
            </div>
        </div>
    </div>
    
    
    );
};

export default ProjectInformations;
