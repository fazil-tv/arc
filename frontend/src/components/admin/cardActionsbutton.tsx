"use client"

import * as React from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"


import { DeleteServices } from "./DeleteServices";
import { EditServices } from "./EditServices";


export function CardActions(data:any) {
  
 
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = React.useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = React.useState(false)


  const handleEditClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsEditDialogOpen(true);
  };

  
  const handleCloseEditClick = () => {
    setIsEditDialogOpen(false);
  };


  const handleDeleteClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
  };




  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <FontAwesomeIcon icon={faEllipsisVertical} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-28 relative right-12">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleEditClick} >
          Edite Service
        </DropdownMenuItem>
       


        <DropdownMenuItem onClick={handleDeleteClick}>
          Delete Service
        </DropdownMenuItem>
      </DropdownMenuContent>

      {isDeleteDialogOpen && (
        <DeleteServices
          isOpen={isDeleteDialogOpen}
          onClose={handleCloseDeleteDialog}
          serviceId={data.data._id}
        />
      )}

      {isEditDialogOpen && (
        <EditServices isOpen={isEditDialogOpen} onClose={handleCloseEditClick} serviceData={data} />
      )}
    </DropdownMenu>
  )
}
