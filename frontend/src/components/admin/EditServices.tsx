"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { useEffect, useState } from "react"

import { useEditServiceMutation, useGetAllServicesQuery } from "@/redux/admin/adminApi"



interface ServiceData {
    _id: string
    name: string;
    category: string;
    description: string;
    duration: string;
    cost: string;
}

interface EditServicesProps {
    isOpen: boolean;
    onClose: () => void;
    serviceData: {
        data: ServiceData;
    };
}



export function EditServices({ isOpen, onClose, serviceData }: EditServicesProps) {
    const { refetch} = useGetAllServicesQuery({});

    const [editService, { isLoading, isError, error }] = useEditServiceMutation();
    const [backendError, setBackendError] = useState(null);

    const [formData, setFormData] = useState<ServiceData>(serviceData.data);

    const handleChange = (field: keyof ServiceData, value: string) => {

        setFormData((prevData) => ({ ...prevData, [field]: value }));

    };


    const handleSaveChanges = async (e: any) => {
        e.preventDefault();
        setBackendError(null);

        try {
            let response = await editService({ id: serviceData.data._id, service: formData }).unwrap();
      

            if (response.success) {
                
                console.log('Service updated successfully', response);
                refetch()
                onClose()

            } else {

                setBackendError(response.message || 'An unexpected error occurred.');

            }



        } catch (error) {
            console.error('Error updating service:', error);

        }

    };

    useEffect(() => {
        console.log('FormData Updated:', formData);
    }, [formData]);


    return (
        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetTrigger asChild>
                <Button variant="outline">Open Edit Services</Button>
            </SheetTrigger>
            <SheetContent side="bottom" style={{ height: '600px' }}>
                <SheetHeader className="mb-2">
                    <SheetTitle>Edit Service Details</SheetTitle>

                    <SheetDescription className="">
                        Update the information for your services to ensure accurate representation. Make any necessary changes and click "Save Changes" to apply your updates.
                    </SheetDescription>
                </SheetHeader>
                <div className="grid gap-4 py-9">


                    <div className="grid grid-cols-3 items-center gap-3 ">
                        <Label htmlFor="name" className="text-right">
                            Service Name
                        </Label>
                        <Input id="name" value={formData.name} onChange={(e) => handleChange('name', e.target.value)} className="col-span-1" />
                    </div>


                    <div className="grid grid-cols-3 items-center gap-3 ">
                        <Label htmlFor="Category" className="text-right">
                            Service Category
                        </Label>
                        <Input id="Category" value={formData.category} onChange={(e) => handleChange('category', e.target.value)} className="col-span-1" />
                    </div>


                    <div className="grid grid-cols-3 items-center gap-3 ">
                        <Label htmlFor="description" className="text-right">
                            Service Description
                        </Label>
                        <Input id="description" value={formData.description} onChange={(e) => handleChange('description', e.target.value)} className="col-span-1" />
                    </div>

                    <div className="grid grid-cols-3 items-center gap-3 ">
                        <Label htmlFor="duration" className="text-right">
                            Estimated Duration
                        </Label>
                        <Input id="duration" value={formData.duration} onChange={(e) => handleChange('duration', e.target.value)} className="col-span-1" />
                    </div>

                    <div className="grid grid-cols-3 items-center gap-3 ">
                        <Label htmlFor="cost" className="text-right">
                            Estimated Cost
                        </Label>
                        <Input id="cost" value={formData.cost} onChange={(e) => handleChange('cost', e.target.value)} className="col-span-1" />
                    </div>

                </div>

                <SheetFooter>
                    <SheetClose asChild>
                        <Button onClick={handleSaveChanges}>Save Changes</Button>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}
