import { Logo } from "@/shared/icons";
import { Button } from "@/shared/ui";

export const Header: React.FC = () => (
  <div className="py-3 px-4 flex justify-between bg-white shadow">
    <div className="flex items-center gap-2">
      <span className="text-3xl">
        <Logo />
      </span>

      <span className="font-bold">HabitPro</span>
    </div>

    <Button type="button">+ Add Habit</Button>
  </div>
);
