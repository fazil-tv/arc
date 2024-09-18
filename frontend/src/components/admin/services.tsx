'use client'
import React from 'react'
import { AddServicesForm } from './AddServices'
import ServicesCard from './servicesCard'

function services() {
    return (
        <>
            <AddServicesForm />
            <ServicesCard />
        </>
    )
}

export default services