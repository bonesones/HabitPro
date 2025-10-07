"use client";

import { useState } from "react";

import { Logo } from "@/shared/icons";
import { Button } from "@/shared/ui";

import { HabitModal } from "@/features/habit-modal";

export const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div className="py-3 px-4 flex justify-between bg-white shadow">
      <div className="flex items-center gap-2">
        <span className="text-3xl">
          <Logo />
        </span>

        <span className="font-bold">HabitPro</span>
      </div>

      <Button type="button" onClick={handleOpen}>
        + Add Habit
      </Button>

      <HabitModal isOpen={isOpen} onClose={handleClose} />
    </div>
  );
};
