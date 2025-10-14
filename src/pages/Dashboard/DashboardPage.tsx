"use client";

import { observer } from "mobx-react-lite";

import { useSession } from "@/shared/lib";
import { habitsStore } from "@/shared/store";
import { Spinner } from "@/shared/ui";

import { Habits } from "./Habits";

export const DashboardPage = observer(() => {
  const { data, isPending } = useSession();

  const user = data?.user;

  if (!isPending && !user) {
    return <div>Unauthorized</div>;
  }

  if (isPending || habitsStore.loading) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-64px)]">
        <Spinner className="bg-blue-500 " />
      </div>
    );
  }

  return (
    <div className="px-5 h-[calc(100vh-64px)]">
      <h1 className="font-semibold text-2xl mt-7">Your Habits</h1>

      <h2 className="mt-2">
        Track your daily progress and build lasting habits
      </h2>

      <Habits />
    </div>
  );
});
