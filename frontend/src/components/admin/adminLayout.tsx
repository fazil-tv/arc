"use client"
import './adminLayout.css'
import { useState } from 'react';
import Dashboard from './Dashboard';
import dynamic from 'next/dynamic';
import UserDetiles from './User';


const AdminSideNav = dynamic(() => import('@/components/admin/adminnavbar/adminsidenavbar'));

import ContractorDetails from './contractor';
// import Settings from '@/components/admin/Settings';

const AdminLayout = () => {
    const [selectedSection, setSelectedSection] = useState('dashboard');

    const renderSection = () => {

        switch (selectedSection) {
            case 'dashboard':
                return <Dashboard />;
              case 'user':
                return <UserDetiles />;
              case 'contractor':
                return <ContractorDetails />;
            default:
                return <Dashboard />;
        }

    };

    return (
        <>
            <AdminSideNav onSelect={setSelectedSection} />
            <div className="p-7 sm:ml-64 admin-main-layer">
                <div className=" p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 admin-dashboard backdrop-blur-sm">
                    {renderSection()}
                </div>
            </div>
        </>

    );
};

export default AdminLayout;



