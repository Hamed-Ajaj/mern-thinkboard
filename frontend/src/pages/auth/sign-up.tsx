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
import { Loader2 } from "lucide-react";
import { signUp } from "@/lib/auth-client";
import { Link } from "react-router";
import { useForm } from "@tanstack/react-form";
import toast from "react-hot-toast";
import * as z from "zod";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { useState } from "react";

export default function SignUp() {
  const [loading, setLoading] = useState(false);

  const formSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.email("Enter a valid email address"),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .max(100, "Password must be at most 100 characters"),
  });

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      await signUp.email(
        {
          name: value.name,
          email: value.email,
          password: value.password,
        },
        {
          onRequest: () => setLoading(true),
          onResponse: () => setLoading(false),
          onError: (ctx) => {
            toast.error(ctx.error.message ?? "Failed to sign up");
          },
        },
      );
    },
  });

  return (
    <Card className="max-w-md mx-auto my-20">
      <CardHeader>
        <CardTitle className="text-lg md:text-xl">Create Account</CardTitle>
        <CardDescription className="text-xs md:text-sm">
          Fill the fields below to create your account
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form
          id="signup-form"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup>
            <form.Field
              name="name"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                    <Input
                      id={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="Your Name"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />

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
                      type="email"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="m@example.com"
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
                      type="password"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="******"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />
          </FieldGroup>

          <Button
            type="submit"
            className="w-full mt-6"
            disabled={loading}
            form="signup-form"
          >
            {loading ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              "Create account"
            )}
          </Button>
        </form>
      </CardContent>

      <CardFooter>
        <div className="flex justify-center w-full border-t py-4">
          <p className="text-center text-xs text-neutral-500">
            Already have an account?{" "}
            <Link to="/login" className="underline">
              <span className="dark:text-white/70 cursor-pointer">Login</span>
            </Link>
          </p>
        </div>
      </CardFooter>
    </Card>
  );
}
