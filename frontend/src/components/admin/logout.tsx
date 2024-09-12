import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"

interface ChildComponentProps {
    handleLogout: () => void;
  }
  const LogoutAdmin : React.FC<ChildComponentProps> =({handleLogout}) =>{
    return (
        <AlertDialog >

            <AlertDialogTrigger asChild >

            <Button 
  variant="outline" 
  className="border-none bg-custom-blue hover:bg-custom-blue hover:text-white focus:bg-custom-blue focus:text-white">
  <svg 
    className="mr-3 flex-shrink-0 w-5 h-5 text-white transition duration-75 dark:text-gray-400 dark:group-hover:text-white" 
    aria-hidden="true" 
    xmlns="http://www.w3.org/2000/svg" 
    fill="none" 
    viewBox="0 0 18 16"
  >
    <path 
      stroke="currentColor" 
      stroke-linecap="round" 
      stroke-linejoin="round" 
      stroke-width="2" 
      d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3" 
    />
  </svg>
  Log Out
</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                    You will need to log back in to access your account.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleLogout} >Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default LogoutAdmin