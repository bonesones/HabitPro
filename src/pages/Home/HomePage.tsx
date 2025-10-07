"use client";

import { useState } from "react";

import { Button } from "@/shared/ui";

import { AuthModal } from "@/features/auth-modal";

export const HomePage = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <Button onClick={handleOpen}>Login</Button>

      <AuthModal isOpen={isOpen} onClose={handleClose} />
    </div>
  );
};
