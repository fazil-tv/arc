import "./globals.css";
import dynamic from 'next/dynamic';
const AdminLayout = dynamic(() => import('../../components/admin/adminLayout'));



function page() {
    return (
        <>
            <AdminLayout />
        </>
    )
}

export default page