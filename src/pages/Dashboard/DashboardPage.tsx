"use client";

import { observer } from "mobx-react-lite";
import { useState } from "react";

import { aFetch } from "@/shared/api/aFetch";
import { userStore } from "@/shared/store";
import { Button } from "@/shared/ui";

import { AuthModal } from "@/features/auth-modal";

export const DashboardPage = observer(() => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleRefresh = async () => {
    const response = await aFetch("/api/auth/refresh");
    const responseJson: Response = await response.json();

    if (!response.ok) {
      return null;
    }

    console.log(responseJson);
  };

  return (
    <div>
      <h1>Your Habits</h1>

      <Button onClick={handleOpen}>Login</Button>

      <Button onClick={handleRefresh}>Refresh</Button>

      <AuthModal isOpen={isOpen} onClose={handleClose} />

      {userStore.user?.email ?? "Not logged in"}
    </div>
  );
});
