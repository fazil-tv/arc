"use client"

import * as React from "react"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useDeleteServiceMutation, useGetAllServicesQuery } from "@/redux/admin/adminApi";

export function DeleteServices({ isOpen, onClose, serviceId }: { isOpen: boolean; onClose: () => void; serviceId: string }) {

    const { refetch} = useGetAllServicesQuery({});
    const [deleteService, { isLoading, isError, error }] = useDeleteServiceMutation();
    const [backendError, setBackendError] = React.useState(null);



    const handleDelete = async (e: any) => {
        e.preventDefault();
        setBackendError(null);
        try {


            let response = await deleteService({ id: serviceId }).unwrap();

            if (response.success) {
                
                console.log('Service deleted successfully', response);
                refetch()
                onClose()

            } else {

                setBackendError(response.message || 'An unexpected error occurred.');

            }



        } catch (err) {
            console.error("Failed to delete the service:", err);
        }
    };

    return (


        <AlertDialog open={isOpen} onOpenChange={onClose}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete the service.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={onClose}>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={handleDelete}
                        disabled={isLoading}
                    >
                        {isLoading ? "Deleting..." : "Delete"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
