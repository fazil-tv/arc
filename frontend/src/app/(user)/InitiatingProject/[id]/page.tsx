import FormComponent from '@/components/user/project/ProjectInitiation'
import InitiatingProjectbanner from '@/components/user/project/ProjectBanner'
import React from 'react'


function page() {


    return (
        <>
            <div>
                <InitiatingProjectbanner />
                
            </div>
            <div>
                < FormComponent />
            </div>

        </>
    )
}

export default page