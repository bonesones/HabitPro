"use client";

import { useContext, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

import { CategoriesContext } from "@/app/providers";

import { aFetch } from "@/shared/api";
import { habitsStore } from "@/shared/store";
import { Habit } from "@/shared/types";
import { Button, Input, Modal, Select } from "@/shared/ui";

export const HabitModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const categories = useContext(CategoriesContext);
  const [loading, setLoading] = useState(false);

  const options = categories.map((category) => ({
    label: category.name,
    value: category.id,
  }));

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setLoading(true);

    const { name, category, goal } = data;

    const nextData = {
      name,
      goal: Number(goal),
      category,
    };

    const response = await aFetch<Habit>("/api/habits/create", {
      method: "POST",
      body: JSON.stringify(nextData),
    });

    if (response.success) {
      habitsStore.addHabit(response.data);

      onClose();
    }

    setLoading(false);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-xl font-bold">New Habit</h2>
      {loading && "loading...."}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-2 mt-5"
      >
        <Input
          type="text"
          label="Habit name"
          {...register("name", { required: true })}
        />

        {errors.name && (
          <span className="text-red-500">{errors.name.message}</span>
        )}
        <Controller
          name="category"
          control={control}
          rules={{ required: "Category is required" }}
          render={({ field, fieldState }) => (
            <>
              <Select
                options={options}
                onChange={(option) => field.onChange(option.value)}
                onClear={() => field.onChange(null)}
                value={options.find((option) => option.value === field.value)}
              />

              {fieldState.error && (
                <span className="text-red-500">{fieldState.error.message}</span>
              )}
            </>
          )}
        />

        <Input
          type="number"
          label="Goal (times per week)"
          min={1}
          max={7}
          {...register("goal", { required: true, min: 1, max: 7 })}
        />

        {errors.goal && (
          <span className="text-red-500">{errors.goal.message}</span>
        )}

        <Button className="mt-4">Create Habit</Button>
      </form>
    </Modal>
  );
};

type FormValues = {
  name: string;
  category: number;
  goal: number;
};
