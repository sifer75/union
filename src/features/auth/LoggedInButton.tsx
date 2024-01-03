"use client";

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";

export const LoggedInButton = () => {
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => {
        signIn();
      }}
    >
      Login
    </Button>
  );
};
