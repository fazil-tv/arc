import { BackgroundBeams } from '@/components/ui/background-beams'
import ProjectDetails from '@/components/user/project/ProjectDetails'
import React from 'react'

function page() {
    return (
        <>
            <div className="bg-gray-900 ">
                <BackgroundBeams className="fixed inset-0 z-0 w-full h-full top-24" />
                <ProjectDetails />
            </div>
        </>
    )
}

export default page