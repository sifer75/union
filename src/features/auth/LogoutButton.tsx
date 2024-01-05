"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
} from "@/components/ui/alert-dialog";
import { Session } from "next-auth";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface LoggedIn {
  user: Session["user"];
}

export const LogoutButton: React.FC<LoggedIn> = ({ user }) => {
  const mutation = useMutation({
    mutationFn: async () => {
      signOut();
    },
    onSuccess: () => {
      console.log("la déconnection est valide");
    },
    onError: (error) => {
      console.log("la déconnection n'a pas aboutie:", error);
    },
  });
  return (
    <>
      <DropdownMenu>
        <AlertDialog>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <Avatar>
                <AvatarFallback>{user?.name?.[0]}</AvatarFallback>
                {user.image && (
                  <AvatarImage
                    className="mx-10"
                    src={user.image}
                    alt={user.name ?? "user picture"}
                  />
                )}
              </Avatar>
              <p>{user.name}</p>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <AlertDialogTrigger asChild>
              <DropdownMenuItem>
                <Button variant="outline">Logout</Button>
              </DropdownMenuItem>
            </AlertDialogTrigger>
          </DropdownMenuContent>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Are you sure you want to logout?
              </AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel asChild>
                <Button variant="secondary">Cancel</Button>
              </AlertDialogCancel>
              <Button
                variant="destructive"
                onClick={() => {
                  mutation.mutate();
                }}
                disabled={mutation.isPending}
              >
                Logout
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </DropdownMenu>
    </>
  );
};
