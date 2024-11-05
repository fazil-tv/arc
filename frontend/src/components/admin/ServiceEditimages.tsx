"use client"
import { Key, useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Maximize2, Plus, Trash } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface ServicesEditImagesProps {
    imagedata: {
        images: string[];

    };
    onDeleteImage: (imageUrl: string) => void;
    onUploadImage: (files: File[]) => void;
}

export default function servicesEditimages({ imagedata, onDeleteImage, onUploadImage }: ServicesEditImagesProps) {


    const [selectedImageUrl, setSelectedImageUrl] = useState<string | null>(null);
    // const [images, setImages] = useState<string[]>(imagedata.images);
    const [images, setImages] = useState([]);



    // useEffect(() => {
    //     setImages(imagedata.images);
    // }, [imagedata]);


    const handleDeleteImage = (imageUrl: string) => {
        onDeleteImage(imageUrl);
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files) return;

        const currentImageCount = imagedata.images.length
       
        const fileArray = Array.from(files);

        const newImageUrls = fileArray.map(file => URL.createObjectURL(file));

        setImages(prevImages => [...prevImages, ...newImageUrls]);
        
        onUploadImage(fileArray);

        // const file = e.target.files
        // if (file) {
        //   const reader = new FileReader();
        //   reader.onloadend = () => {
        //     setImages([...images, reader.result]);
        //   };
        //   reader.readAsDataURL(file);
        // }

    
    };


    return (
        <div className="container mx-auto px-4 py-2">

            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-2 gap-2 justify-center">
                {images.map((imageUrl: string, index: Key) => (
                    <Card key={index} className="break-inside-avoid mb-2 overflow-hidden">
                        <CardContent className="p-0 relative group">
                            <img

                                src={imageUrl.startsWith('blob:') ? imageUrl : `/uplodedImages/${imageUrl}`}
                                className="w-full h-32 object-cover"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center">
                                <div className="flex space-x-2">
                                    <Button size="sm" variant="secondary" onClick={() => handleDeleteImage(imageUrl)}>
                                        <Trash className="mr-2 h-4 w-4" />
                                        Delete
                                    </Button>
                                    <Button size="sm" variant="secondary" onClick={() => setSelectedImageUrl(imageUrl)}>
                                        <Maximize2 className="mr-2 h-4 w-4" />
                                        View
                                    </Button>

                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}

                {imagedata.images.length + images.length <= 6&& (
                    <div className="flex flex-col items-center justify-center h-32 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 cursor-pointer">

                        <label
                            htmlFor="file-upload"
                            className="flex items-center justify-center px-4 py-2  cursor-pointer"
                        >
                            <Plus className="h-7 w-7 rounded mr-2 cursor-pointer" />
                            Select and Upload Image
                        </label>
                        <input
                            id="file-upload"
                            type="file"
                            onChange={handleFileChange}
                            className="hidden"
                        />
                    </div>
                )}
            </div>
           
            <Dialog open={!!selectedImageUrl} onOpenChange={() => setSelectedImageUrl(null)}>
                <DialogContent>
                    <img
                        src={selectedImageUrl ? (selectedImageUrl.startsWith('blob:') ? selectedImageUrl : `/uplodedImages/${selectedImageUrl}`) : ''}
                        alt="Selected Design"
                        className="w-full h-auto object-cover rounded-md"
                    />
                </DialogContent>
            </Dialog>
        </div>
    )
}
