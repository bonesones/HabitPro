"use client";

import { useState } from "react";

import { Modal } from "@/shared/ui";

import { LoginForm } from "./LoginForm";
import { RegisterForm } from "./RegisterForm";

export const AuthModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  const [mode, setMode] = useState<"login" | "signup">("login");

  const handleChangeMode = (mode: "login" | "signup") => {
    setMode(mode);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-xl font-bold">
        {mode === "login" ? "Login" : "Sign up"}
      </h2>

      {mode === "login" ? (
        <LoginForm onChangeMode={handleChangeMode} onSuccess={onClose} />
      ) : (
        <RegisterForm onChangeMode={handleChangeMode} onSuccess={onClose} />
      )}
    </Modal>
  );
};
