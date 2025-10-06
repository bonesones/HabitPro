import { SubmitHandler, useForm } from "react-hook-form";

import { signIn } from "@/shared/lib";
import { Button, Input } from "@/shared/ui";

export const LoginForm: React.FC<{
  onChangeMode: (mode: "login" | "signup") => void;
  onSuccess: () => void;
}> = ({ onChangeMode, onSuccess }) => {
  const { register, handleSubmit } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const result = await signIn.email({
      email: data.email,
      password: data.password,
    });

    if (result.data) {
      onSuccess();
    }
  };

  const handleChangeMode = (mode: "login" | "signup") => {
    onChangeMode(mode);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-2 mt-5"
    >
      <Input
        type="email"
        placeholder="Email"
        label="Email"
        {...register("email", {
          required: true,
        })}
      />

      <Input
        type="password"
        placeholder="Password"
        label="Password"
        {...register("password", {
          required: true,
        })}
      />

      <Button type="submit" className="mt-4">
        Login
      </Button>

      <Button>Sign in with Google</Button>

      <span className="flex gap-2 text-center">
        Don&apos;t have an account?
        <button
          type="button"
          className="text-blue-500"
          onClick={() => handleChangeMode("signup")}
        >
          Sign up
        </button>
      </span>
    </form>
  );
};

type FormValues = {
  email: string;
  password: string;
};
