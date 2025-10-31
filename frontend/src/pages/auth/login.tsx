import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { signIn } from "@/lib/auth-client";
import { Link } from "react-router";
import toast from "react-hot-toast";
import { useForm } from "@tanstack/react-form";
import * as z from "zod";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const formSchema = z.object({
    email: z.email(),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters.")
      .max(100, "password must be at most 100 characters."),
  });

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      await signIn.email(
        {
          email: value.email,
          password: value.password,
        },
        {
          onRequest: () => {
            setLoading(true);
          },
          onResponse: () => {
            setLoading(false);
          },
          onError: (ctx) => {
            toast.error(ctx.error.message);
          },
        },
      );
    },
  });

  return (
    <Card className="max-w-md mx-auto my-20">
      <CardHeader>
        <CardTitle className="text-lg md:text-xl">Sign In</CardTitle>
        <CardDescription className="text-xs md:text-sm">
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <form
            id="login-form"
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
          >
            <FieldGroup>
              <form.Field
                name="email"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        className="input-bordered input"
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={isInvalid}
                        placeholder="example@gmail.com"
                        autoComplete="off"
                        type="email"
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              />

              <form.Field
                name="password"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;

                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="******"
                        type="password"
                        aria-invalid={isInvalid}
                      />
                      {isInvalid && (
                        <FieldError
                          className="text-red-500"
                          errors={field.state.meta.errors}
                        />
                      )}
                    </Field>
                  );
                }}
              />
            </FieldGroup>

            <div className="form-control  w-full mt-6 gap-2">
              <Field orientation="horizontal">
                <Button
                  type="submit"
                  form="login-form"
                  className="w-full"
                  disabled={loading}
                >
                  {loading ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : (
                    "Login"
                  )}
                </Button>
              </Field>
            </div>
          </form>
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex justify-center w-full border-t py-4">
          <p className="text-center text-xs text-neutral-500">
            Don't have an account?{" "}
            <Link to="/sign-up" className="underline">
              <span className="dark:text-white/70 cursor-pointer">Sign up</span>
            </Link>
          </p>
        </div>
      </CardFooter>
    </Card>
  );
}
