"use client";

import { observer } from "mobx-react-lite";
import { getSession, signIn, signOut } from "next-auth/react";
import { SubmitHandler, useForm } from "react-hook-form";

import { userStore } from "@/shared/store";

type FormValues = {
  email: string;
  password: string;
};

export const DashboardPage = observer(() => {
  const { register, handleSubmit } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const result = await signIn("credentials", {
      redirect: false,
      ...data,
    });

    if (result?.ok) {
      const session = await getSession();

      if (!session) {
        return null;
      }

      userStore.setUser(session.user);
    }
  };

  const handleLogout = () => {
    signOut();
  };

  return (
    <div>
      <h1>Your Habits</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="email" {...register("email")} placeholder="Email" />

        <input
          type="password"
          {...register("password")}
          placeholder="Password"
        />

        <button type="submit">Login</button>
      </form>

      <p>ID: {userStore.user?.id}</p>
      <p>Email: {userStore.user?.email}</p>

      <button type="button" onClick={handleLogout}>
        Log out
      </button>
    </div>
  );
});
