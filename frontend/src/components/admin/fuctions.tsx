
    // const handleSaveChanges = async (e: any) => {

    //     e.preventDefault();
    //     setBackendError(null);

    //     try {

    //         console.log(formData, "formData*************************************");

    //         const formDataToSend = new FormData();

    //         for (const key in formData) {
    //             if (key !== 'imageFiles') {
    //                 formDataToSend.append(key, formData[key]);
    //             }
    //         }

    //         // Append existing images if any
    //         if (serviceData.data.images && serviceData.data.images.length > 0) {
    //             serviceData.data.images.forEach((image: string) => {
    //                 formDataToSend.append('images', image);
    //             });
    //         }

    //         if (formData.imageFiles) {
    //             formData.imageFiles.forEach((file) => formDataToSend.append('images', file));
    //         }


    //         let response = await editService({ id: serviceData.data._id, service: formDataToSend }).unwrap();
    //         if (response.success) {
    //             console.log('Service updated successfully', response);
    //             refetch()
    //             onClose()

    //         } else {

    //             setBackendError(response.message || 'An unexpected error occurred.');

    //         }

    //     } catch (error) {
    //         console.error('Error updating service:', error);

    //     }
    // };



    // const handleSaveChanges = async (e: any) => {
    //     e.preventDefault();
    //     setBackendError(null);

    //     try {


    //         console.log("save changes form Data", formData)

    //         const formDataToSend = new FormData();

    //         console.log("save changes formDataTosend", formDataToSend)

          
            

    //             for (const key in formData) {
    //                 if (key !== 'imageFiles' && key !== 'images') {
    //                     formDataToSend.append(key, formData[key]);
    //                 }
    //             }
    
            


    //         console.log("save changes formDataTosend bfore uplode")



    //         console.log(formData.imageFiles,"imagesfileeeeeeeeeeeees")

 
            
    //         if (formData.imageFiles && formData.imageFiles.length > 0) {
    //           formData.imageFiles.forEach((file: string | Blob) => {
    //               if (file instanceof File) {
    //                   formDataToSend.append('images', file.name);
    //               }
    //           });
    //       }

        
       



    //         formDataToSend.forEach((value, key) => {
    //             console.log("console.log okkkkkk");
    //             console.log(key, value);
    //         });


          



    
    //         // // // Handle existing images (formData.images) - Keep them in the form
    //         // if (formData.images && formData.images.length > 0) {
    //         //     formData.images.forEach((existingImage: string) => {
    //         //         formDataToSend.append('existingImages', existingImage);
    //         //     });
    //         // }

          


    //         console.log("save changes formDataTosend", formDataToSend)

    //         // Send the updated data to the backend
    //         let response = await editService({ id: serviceData.data._id, service: formDataToSend }).unwrap();

    //         if (response.success) {
    //             console.log('Service updated successfully', response);
    //             refetch();
    //             onClose();
    //         } else {
    //             setBackendError(response.message || 'An unexpected error occurred.');
    //         }
    //     } catch (error) {
    //         console.error('Error updating service:', error);
    //     }
    // };


    // useEffect(() => {
    //     console.log('FormData Updated:', formData);
    // }, [formData]);




    
    // const handleSaveChanges = async (e: any) => {


    //     e.preventDefault();
    //     setBackendError(null);

    //     try {


    //         console.log(formData, "formData*************************************");

    //         const formDataToSend = new FormData();

    //         for (const key in formData) {
    //             if (key !== 'imageFiles') {
    //                 formDataToSend.append(key, formData[key]);
    //             }
    //         }

    //         // Append existing images if any
    //         if (serviceData.data.images && serviceData.data.images.length > 0) {
    //             serviceData.data.images.forEach((image: string) => {
    //                 formDataToSend.append('images', image);
    //             });
    //         }

    //         if (formData.imageFiles) {
    //             formData.imageFiles.forEach((file) => formDataToSend.append('images', file));
    //         }




    //         let response = await editService({ id: serviceData.data._id, service: formDataToSend }).unwrap();
    //         if (response.success) {
    //             console.log('Service updated successfully', response);
    //             refetch()
    //             onClose()

    //         } else {

    //             setBackendError(response.message || 'An unexpected error occurred.');

    //         }

    //     } catch (error) {
    //         console.error('Error updating service:', error);

    //     }
    // };

    // const handleSaveChanges = async (e: any) => {
    //     e.preventDefault();
    //     setBackendError(null);

    //     console.log("hmmmmmmmmmmmm", formData.imageFiles);


    //     try {
    //         const formDataToSend = new FormData();


    //         for (const key in formData) {

    //             if (key !== 'imageFiles' && key !== 'images') {
    //                 formDataToSend.append(key, formData[key]);
    //             }

    //         }

    //         console.log("okkkkkkkkkkkkkk", formData.images);



    //         if (formData.imageFiles && formData.imageFiles.length > 0) {
    //             formData.imageFiles.forEach((file: string | Blob) => {
    //                 // Check if the file is an instance of File
    //                 if (file instanceof File) {
    //                     // Append the file itself
    //                     formDataToSend.append('images', file);

    //                     // Optionally, append the file name separately if needed
    //                     formDataToSend.append('imageFileNames', file.name);
    //                 }
    //             });
    //         }


    //         // if (formData.imageFiles) {
    //         //     formData.imageFiles.forEach((file) => formDataToSend.append('images', file));
    //         // }


    //         let response = await editService({ id: serviceData.data._id, service: formDataToSend }).unwrap();
    //         if (response.success) {
    //             console.log('Service updated successfully', response);
    //             refetch()
    //             onClose()

    //         } else {
    //             setBackendError(response.message || 'An unexpected error occurred.');
    //         }

    //     } catch (error) {
    //         console.error('Error updating service:', error);
    //     }
    // };












    "use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import ServicesEditimages from "./ServiceEditimages"
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
    [key: string]: any;
    imageFiles?: (string | Blob)[];
    _id: string
    name: string;
    category: string;
    description: string;
    duration: string;
    cost: string;
    images: string[];
}

interface EditServicesProps {
    isOpen: boolean;
    onClose: () => void;
    serviceData: {
        data: ServiceData;
    };
}



export function EditServices({ isOpen, onClose, serviceData }: EditServicesProps) {



    const { refetch } = useGetAllServicesQuery({});

    const [editService, { isLoading, isError, error }] = useEditServiceMutation();


    const [backendError, setBackendError] = useState(null);

    const [formData, setFormData] = useState<ServiceData>(serviceData.data);

    const [images, setImages] = useState<string[]>(formData.images);



    const handleChange = (field: keyof ServiceData, value: string) => {
        console.log("handle change form data", formData);
        setFormData((prevData) => ({ ...prevData, [field]: value }));

    };

    const handleDeleteImage = (imageUrl: string) => {

        setImages((prevImages) => prevImages.filter((img) => img !== imageUrl));
        setFormData((prevData) => ({ ...prevData, images: images.filter((img) => img !== imageUrl) }));

    };


    const handleUploadImage = (files: File[]) => {

        const newImageUrls = files.map((file) => URL.createObjectURL(file));

        console.log('Uploading newImageUrls:', newImageUrls);

        const updatedImages = [...images, ...newImageUrls];

        console.log('Uploading updatedImages:', updatedImages);

        setImages(updatedImages);

        setFormData((prevData) => ({ ...prevData, images: updatedImages, imageFiles: [...(prevData.imageFiles || []), ...files] }));


        console.log(formData, "formData   formData   formData");

    };

    
    const handleSaveChanges = async (e: any) => {
        e.preventDefault();
        setBackendError(null);

        console.log("hmmmmmmmmmmmm", formData.imageFiles);


        try {
            const formDataToSend = new FormData();


            for (const key in formData) {

                if (key !== 'imageFiles') {
                    formDataToSend.append(key, formData[key]);
                }

            }

            console.log("okkkkkkkkkkkkkk", formData.images);

            if (formData.imageFiles && formData.imageFiles.length > 0) {
                formData.imageFiles.forEach((file: string | Blob) => {
                  
                    if (file instanceof File) {
                    
                        formDataToSend.append('images', file);

                    }
                });

            }


            let response = await editService({ id: serviceData.data._id, service: formDataToSend }).unwrap();
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



    return (
        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetTrigger asChild>
                <Button variant="outline">Open Edit Services</Button>
            </SheetTrigger>
            <SheetContent side="bottom" style={{ height: 'auto' }}>
                <SheetHeader className="mb-10 p-5">

                    <SheetTitle className="text-center">Edit Service Details</SheetTitle>
                    <SheetDescription className="text-center mb-5">
                        Update the information for your services to ensure accurate representation. Make any necessary changes and click "Save Changes" to apply your updates.
                    </SheetDescription>
                </SheetHeader>

                <div className="  grid grid-cols-2  gap-4 p-5">
                    <div className="grid grid-cols-1 gap-4 items-center">

                        <div className="grid grid-cols-2 md:grid-cols-[25%_75%]  items-center ">

                            <Label htmlFor="name" className="text-left font-medium">
                                Service Name
                            </Label>

                            <Input
                                id="name"
                                value={formData.name}
                                onChange={(e) => handleChange('name', e.target.value)}
                                className="w-full border border-gray-300 rounded-md shadow-sm  focus:ring-blue-500 "
                            />

                        </div>


                        <div className="grid grid-cols-1 md:grid-cols-[25%_75%] items-center">
                            <Label htmlFor="Category" className="text-left">
                                Service Category
                            </Label>
                            <Input id="Category" value={formData.category} onChange={(e) => handleChange('category', e.target.value)} className="col-span-1" />
                        </div>


                        <div className="grid grid-cols-1 md:grid-cols-[25%_75%] items-center">
                            <Label htmlFor="description" className="text-left">
                                Service Description
                            </Label>
                            <Input id="description" value={formData.description} onChange={(e) => handleChange('description', e.target.value)} className="col-span-1" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-[25%_75%] items-center">
                            <Label htmlFor="duration" className="text-left">
                                Estimated Duration
                            </Label>
                            <Input id="duration" value={formData.duration} onChange={(e) => handleChange('duration', e.target.value)} className="col-span-1" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-[25%_75%] items-center">
                            <Label htmlFor="cost" className="text-left">
                                Estimated Cost
                            </Label>
                            <Input id="cost" value={formData.cost} onChange={(e) => handleChange('cost', e.target.value)} className="col-span-1" />
                        </div>
                    </div>

                    <div>
                        <div className="grid grid-cols-1  gap-4 items-center ">
                            <ServicesEditimages imagedata={formData} onDeleteImage={handleDeleteImage} onUploadImage={handleUploadImage} />
                        </div>
                    </div>
                </div>

                <SheetFooter className="p-5">
                    <SheetClose asChild>
                        <Button onClick={handleSaveChanges}>Save Changes</Button>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}