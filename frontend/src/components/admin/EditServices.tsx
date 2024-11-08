"use client"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import ServicesEditimages from "./ServiceEditimages"
// import {
//     Sheet,
//     SheetClose,
//     SheetContent,
//     SheetDescription,
//     SheetFooter,
//     SheetHeader,
//     SheetTitle,
//     SheetTrigger,
// } from "@/components/ui/sheet"
// import { useEffect, useState } from "react"
// import { useEditServiceMutation, useGetAllServicesQuery } from "@/redux/admin/adminApi"

// interface ServiceData {
//     [key: string]: any;
//     imageFiles?: (string | Blob)[];
//     _id: string
//     name: string;
//     category: string;
//     description: string;
//     duration: string;
//     cost: string;
//     images: File[];
// }

// interface EditServicesProps {
//     isOpen: boolean;
//     onClose: () => void;
//     serviceData: {
//         data: ServiceData;
//     };
// }



// export function EditServices({ isOpen, onClose, serviceData }: EditServicesProps) {



//     const { refetch } = useGetAllServicesQuery({});

//     const [editService, { isLoading, isError, error }] = useEditServiceMutation();


//     const [backendError, setBackendError] = useState(null);

//     const [formData, setFormData] = useState<ServiceData>(serviceData.data);

//     const [images, setImages] = useState<string[]>(formData.images);



//     const handleChange = (field: keyof ServiceData, value: string) => {
//         console.log("handle change form data", formData);
//         setFormData((prevData) => ({ ...prevData, [field]: value }));

//     };

//     const handleDeleteImage = (imageUrl: string) => {

//         setImages((prevImages) => prevImages.filter((img) => img !== imageUrl));
//         setFormData((prevData) => ({ ...prevData, images: images.filter((img) => img !== imageUrl) }));

//     };


//     const handleUploadImage = (files: File[]) => {

//         const newImageUrls = files.map((file) => URL.createObjectURL(file));

//         console.log('Uploading newImageUrls:', newImageUrls);

//         const updatedImages = [...images, ...newImageUrls];

//         console.log('Uploading updatedImages:', updatedImages);

//         setImages(updatedImages);

//         setFormData((prevData) => ({ ...prevData, images:[...(prevData.imageFiles || []), ...files] }));

//         console.log(formData, "formData   formData   formData");

//     };


//     const handleSaveChanges = async (e: any) => {



//         console.log("images filesss", )


//         e.preventDefault();
//         setBackendError(null);



//         try {
//             const formDataToSend = new FormData();


//             for (const key in formData) {

//                 if (key !== 'imageFiles') {
//                     formDataToSend.append(key, formData[key]);
//                 }

//             }

//             if (formData.imageFiles && formData.imageFiles.length > 0) {
//                 formData.imageFiles.forEach((file: string | Blob) => {

//                     if (file instanceof File) {

//                         formDataToSend.append('images', file);

//                     }
//                 });

//             }


//             let response = await editService({ id: serviceData.data._id, service: formDataToSend }).unwrap();

//             if (response.success) {
//                 console.log('Service updated successfully', response);
//                 refetch()
//                 onClose()

//             } else {
//                 setBackendError(response.message || 'An unexpected error occurred.');
//             }

//         } catch (error) {
//             console.error('Error updating service:', error);
//         }
//     };



//     return (
//         <Sheet open={isOpen} onOpenChange={onClose}>
//             <SheetTrigger asChild>
//                 <Button variant="outline">Open Edit Services</Button>
//             </SheetTrigger>
//             <SheetContent side="bottom" style={{ height: 'auto' }}>
//                 <SheetHeader className="mb-10 p-5">

//                     <SheetTitle className="text-center">Edit Service Details</SheetTitle>
//                     <SheetDescription className="text-center mb-5">
//                         Update the information for your services to ensure accurate representation. Make any necessary changes and click "Save Changes" to apply your updates.
//                     </SheetDescription>
//                 </SheetHeader>

//                 <div className="  grid grid-cols-2  gap-4 p-5">
//                     <div className="grid grid-cols-1 gap-4 items-center">

//                         <div className="grid grid-cols-2 md:grid-cols-[25%_75%]  items-center ">

//                             <Label htmlFor="name" className="text-left font-medium">
//                                 Service Name
//                             </Label>

//                             <Input
//                                 id="name"
//                                 value={formData.name}
//                                 onChange={(e) => handleChange('name', e.target.value)}
//                                 className="w-full border border-gray-300 rounded-md shadow-sm  focus:ring-blue-500 "
//                             />

//                         </div>


//                         <div className="grid grid-cols-1 md:grid-cols-[25%_75%] items-center">
//                             <Label htmlFor="Category" className="text-left">
//                                 Service Category
//                             </Label>
//                             <Input id="Category" value={formData.category} onChange={(e) => handleChange('category', e.target.value)} className="col-span-1" />
//                         </div>


//                         <div className="grid grid-cols-1 md:grid-cols-[25%_75%] items-center">
//                             <Label htmlFor="description" className="text-left">
//                                 Service Description
//                             </Label>
//                             <Input id="description" value={formData.description} onChange={(e) => handleChange('description', e.target.value)} className="col-span-1" />
//                         </div>

//                         <div className="grid grid-cols-1 md:grid-cols-[25%_75%] items-center">
//                             <Label htmlFor="duration" className="text-left">
//                                 Estimated Duration
//                             </Label>
//                             <Input id="duration" value={formData.duration} onChange={(e) => handleChange('duration', e.target.value)} className="col-span-1" />
//                         </div>

//                         <div className="grid grid-cols-1 md:grid-cols-[25%_75%] items-center">
//                             <Label htmlFor="cost" className="text-left">
//                                 Estimated Cost
//                             </Label>
//                             <Input id="cost" value={formData.cost} onChange={(e) => handleChange('cost', e.target.value)} className="col-span-1" />
//                         </div>
//                     </div>

//                     <div>
//                         <div className="grid grid-cols-1  gap-4 items-center ">
//                             <ServicesEditimages imagedata={formData} onDeleteImage={handleDeleteImage} onUploadImage={handleUploadImage} />
//                         </div>
//                     </div>
//                 </div>

//                 <SheetFooter className="p-5">
//                     <SheetClose asChild>
//                         <Button onClick={handleSaveChanges}>Save Changes</Button>
//                     </SheetClose>
//                 </SheetFooter>
//             </SheetContent>
//         </Sheet>
//     )
// }



// "use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ServicesEditimages from "./ServiceEditimages";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { useEffect, useState } from "react";
import {
    useEditServiceMutation,
    useGetAllServicesQuery,
} from "@/redux/admin/adminApi";

interface ServiceData {
    [key: string]: any;
    images?: (File | Blob)[]; // Array of File or Blob objects (image files).
    imageFiles?: string[]; // Array of image URLs as strings.
    _id: string;
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
    const { refetch } = useGetAllServicesQuery({});
    const [editService, { isLoading, isError, error }] = useEditServiceMutation();
    const [backendError, setBackendError] = useState<string | null>(null);

    // Initialize formData with serviceData and separate images (files) and imageFiles (URLs).
    const [formData, setFormData] = useState<ServiceData>(serviceData.data);

    // Update formData's images and imageFiles
    const [images, setImages] = useState<(File | Blob)[]>(formData.images || []);
    const [imageFiles, setImageFiles] = useState<string[]>(
        formData.imageFiles || []
    );

    // Handle form field changes
    const handleChange = (field: keyof ServiceData, value: string) => {
        setFormData((prevData) => ({ ...prevData, [field]: value }));
    };

    // Handle image file upload and store both files and URLs

    const handleUploadImage = (files: File[]) => {

      

        const newImageFiles = files.map((file) => URL.createObjectURL(file)); // Generate URLs for display

        setFormData((prevData) => ({
            ...prevData,
            images: [...(prevData.images || []), ...files], // Add files to images array.
            imageFiles: [...(prevData.imageFiles || []), ...newImageFiles], // Add URLs to imageFiles array.
        }));

        // Update local state for rendering
        setImages((prevImages) => [...prevImages, ...files]);
        setImageFiles((prevImageFiles) => [...prevImageFiles, ...newImageFiles]);
    };

    // Handle image deletion (both from the formData and state)
    const handleDeleteImage = (imageUrl: string) => {

        const updatedImageFiles = imageFiles.filter((img) => img !== imageUrl);
        const imageIndex = imageFiles.indexOf(imageUrl);
        const updatedImages = images.filter((_, index) => index !== imageIndex);

        setFormData((prevData) => ({
            ...prevData,
            images: updatedImages, // Remove file from images array.
            imageFiles: updatedImageFiles, // Remove URL from imageFiles array.
        }));

        // Update local state for rendering
        setImages(updatedImages);
        setImageFiles(updatedImageFiles);
    };

    // Handle saving changes (sending updated service data to the server)
    const handleSaveChanges = async (e: React.FormEvent) => {

        console.log(formData.images,"{{{{{{{}}}}}}}}}}{{{{{{{}}}}}}")

        e.preventDefault();
        setBackendError(null);

        try {
            const formDataToSend = new FormData();

            // Append form data except imageFiles
            for (const key in formData) {
                if (key !== "images" && key !== "imageFiles") {
                    formDataToSend.append(key, formData[key]);
                }
            }

   

            // Append image files to the FormData object
            if (images.length > 0) {
                images.forEach((file) => {
                    formDataToSend.append("images", file); // Only append actual files
                });
            }

        
              // Append existing image URLs if necessary (if you also want to keep track of existing URLs)
              formData.imageFiles?.forEach((imageUrl) => {
                formDataToSend.append("imageFiles", imageUrl); // Append existing image URLs.
              });

              

            // Send the data via the API call
            let response = await editService({
                id: serviceData.data._id,
                service: formDataToSend,
            }).unwrap();

            if (response.success) {
                refetch(); // Refetch services after success
                onClose(); // Close modal after success
            } else {
                setBackendError(response.message || "An unexpected error occurred.");
            }
        } catch (error) {
            console.error("Error updating service:", error);
            setBackendError("Failed to update service.");
        }
    };

    return (
        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetTrigger asChild>
                <Button variant="outline">Open Edit Services</Button>
            </SheetTrigger>
            <SheetContent side="bottom" style={{ height: "auto" }}>
                <SheetHeader className="mb-10 p-5">
                    <SheetTitle className="text-center">Edit Service Details</SheetTitle>
                    <SheetDescription className="text-center mb-5">
                        Update the information for your services to ensure accurate
                        representation. Make any necessary changes and click "Save Changes"
                        to apply your updates.
                    </SheetDescription>
                </SheetHeader>

                <div className="grid grid-cols-2 gap-4 p-5">
                    <div className="grid grid-cols-1 gap-4 items-center">
                        <div className="grid grid-cols-2 md:grid-cols-[25%_75%] items-center">
                            <Label htmlFor="name" className="text-left font-medium">
                                Service Name
                            </Label>
                            <Input
                                id="name"
                                value={formData.name}
                                onChange={(e) => handleChange("name", e.target.value)}
                                className="w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 "
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-[25%_75%] items-center">
                            <Label htmlFor="Category" className="text-left">
                                Service Category
                            </Label>
                            <Input
                                id="Category"
                                value={formData.category}
                                onChange={(e) => handleChange("category", e.target.value)}
                                className="col-span-1"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-[25%_75%] items-center">
                            <Label htmlFor="description" className="text-left">
                                Service Description
                            </Label>
                            <Input
                                id="description"
                                value={formData.description}
                                onChange={(e) => handleChange("description", e.target.value)}
                                className="col-span-1"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-[25%_75%] items-center">
                            <Label htmlFor="duration" className="text-left">
                                Estimated Duration
                            </Label>
                            <Input
                                id="duration"
                                value={formData.duration}
                                onChange={(e) => handleChange("duration", e.target.value)}
                                className="col-span-1"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-[25%_75%] items-center">
                            <Label htmlFor="cost" className="text-left">
                                Estimated Cost
                            </Label>
                            <Input
                                id="cost"
                                value={formData.cost}
                                onChange={(e) => handleChange("cost", e.target.value)}
                                className="col-span-1"
                            />
                        </div>
                    </div>

                    <div>
                        <div className="grid grid-cols-1 gap-4 items-center">
                            <ServicesEditimages
                                imagedata={formData}
                                onDeleteImage={handleDeleteImage}
                                onUploadImage={handleUploadImage}
                            />
                        </div>
                    </div>
                </div>

                <SheetFooter className="p-5">
                    <SheetClose asChild>
                        <Button onClick={handleSaveChanges} isLoading={isLoading}>
                            Save Changes
                        </Button>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
}
