import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useAddServiceMutation } from '@/redux/admin/adminApi';

export function AddServicesForm() {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    description: '',
    duration: '',
    cost: '',
    images: []
  });

  const handleInputChange = (e: any) => {
    const { id, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [id]: value
    }));
  };


  const [addService] = useAddServiceMutation();

  const handleFileChange = (e: any) => {
    const files = e.target.files;
    if (files) {
      setFormData(prevData => ({
        ...prevData,
        images: Array.from(files)
      }));
    }
  };




  const handleSubmit = async (e: any) => {

    e.preventDefault();
    console.log(formData, "formData");
    
    const form = new FormData();
    form.append('name', formData.name);
    form.append('category', formData.category);
    form.append('description', formData.description);
    form.append('duration', formData.duration);
    form.append('cost', formData.cost);

    formData.images.forEach((file) => {
      form.append('images', file);
    });



    try {
      const response = await addService(form).unwrap();
      console.log('Service added:', response);
    } catch (error) {
      console.error('Failed to submit the form:', error);
    }

  };

  return (
    <Dialog>
      <DialogTrigger asChild className="float-end">
        <Button variant="outline">Add Services</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[650px]">
        <DialogHeader>
          <DialogTitle>Add a New Construction Service</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">Service Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category" className="text-right">Service Category</Label>
              <Input
                id="category"
                value={formData.category}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">Service Description</Label>
              <Input
                id="description"
                value={formData.description}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="duration" className="text-right">Estimated Duration</Label>
              <Input
                id="duration"
                value={formData.duration}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="cost" className="text-right">Estimated Cost</Label>
              <Input
                id="cost"
                value={formData.cost}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-5">
              <Label htmlFor="images" className="text-right">Upload Images</Label>
              <Input
                id="images"
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileChange}
                className="col-span-2"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
