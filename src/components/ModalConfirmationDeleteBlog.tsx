import { FC } from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";

interface ModalConfirmationDeleteBlogProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  onDeleteBlog: () => void;
  isLoadingDelete: boolean;
}

const ModalConfirmationDeleteBlog: FC<ModalConfirmationDeleteBlogProps> = ({
  open,
  isLoadingDelete,
  setOpen,
  onDeleteBlog,
}) => {
  return (
    <AlertDialog open={open}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are You absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be iundone. This will permanently delete your
            account and remove your data from our servers
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onDeleteBlog} disabled={isLoadingDelete}>
            {isLoadingDelete ? "Loading" : "Continue"}
          </AlertDialogCancel>
          <AlertDialogCancel onClick={() => setOpen(false)}>
            Cancel
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
export default ModalConfirmationDeleteBlog;
