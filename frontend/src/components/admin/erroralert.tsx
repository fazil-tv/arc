import { AlertCircle } from "lucide-react"

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"

interface AlertDestructiveProps {
    error: string;
  }
  
  export function AlertDestructive({ error }: { error: string }) {
    if (!error) return null; 
  
    return (
      <Alert variant="destructive" className="w-96 ">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription> 
      </Alert>
    );
  }
  