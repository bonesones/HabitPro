"use client";

import { useSession } from "@/shared/lib";
import { Spinner } from "@/shared/ui";

import { Habits } from "./Habits";

export const DashboardPage = () => {
  const { data, isPending } = useSession();

  const user = data?.user;

  if (isPending) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }

  if (!user) {
    return <div>Unauthorized</div>;
  }

  return (
    <div>
      <h1>Your Habits</h1>
      <h2>User: {user.email}</h2>

      <Habits />
    </div>
  );
};
