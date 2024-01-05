"use client";

import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";

export const LoginButton = () => {
  const mutation = useMutation({
    mutationFn: async () => {
      signIn();
    },
    onSuccess: () => {
      console.log("Connexion réussie !");
    },
    onError: (error) => {
      console.error("Erreur lors de la connexion", error);
    },
  });
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => {
        mutation.mutate();
      }}
      disabled={mutation.isPending}
    >
      {mutation.isPending ? "Connection en cours..." : "Login"}
    </Button>
  );
};
