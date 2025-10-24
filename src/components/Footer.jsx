import { Button } from "./ui/button";
import { AlertDialog,AlertDialogTrigger,AlertDialogContent,AlertDialogTitle,AlertDialogDescription,AlertDialogCancel,AlertDialogAction,AlertDialogHeader,AlertDialogFooter } from "@/components/ui/alert-dialog";
export default function Footer({todos, clearAll}){
    console.log("Footer Rendered");
    return(
        <div className="mt-4 flex justify-between items-center text-md text-center">
          <span>Total Tasks: {todos.length}</span>
          <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:underline"
          >
            Clear All
          </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete All todos?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. All todos will be permanently deleted.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={clearAll}>
               Confirm
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
          </AlertDialog>
        </div>
    )
}