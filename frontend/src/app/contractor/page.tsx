"use client"
import SideNav from '@/components/contractor/contaractornav/sidenav'
import "./globals.css";

import ContractorDashboard from '@/components/contractor/contractorDashboard';

function Page() {
    
    return (
        <div>
            <SideNav />
            <ContractorDashboard />
        </div>
    )
}

export default Page