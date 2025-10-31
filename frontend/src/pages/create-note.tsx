import { ArrowLeftIcon } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";
import { useForm } from "@tanstack/react-form";
import { Link } from "react-router";
import * as z from "zod";
import api from "../lib/axios";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import { Button } from "@/components/ui/button";

const CreateNotePage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const formSchema = z.object({
    title: z
      .string()
      .min(5, "Bug title must be at least 5 characters.")
      .max(32, "Bug title must be at most 32 characters."),
    content: z
      .string()
      .min(10, "Description must be at least 10 characters.")
      .max(100, "Description must be at most 100 characters."),
  });

  const form = useForm({
    defaultValues: {
      title: "",
      content: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        setLoading(true);
        const res = await api.post("/notes", {
          title: value.title,
          content: value.content,
        });
        if (res.status === 201) {
          toast.success("Note Created Successfully");
        }
        setLoading(false);
        navigate("/");
      } catch (error) {
        if (error.status === 401) {
          toast.error("You need be to be logged in!");
        } else if (error.status === 429) {
          toast.error("To many requests");
        } else {
          toast.error("Failed To create Note!");
        }
        setLoading(false);
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Link to={"/"} className="btn btn-ghost mb-6">
            <ArrowLeftIcon className="size-5" />
            Back to Notes
          </Link>

          <div className="card bg-base-100">
            <div className="card-body">
              <h2 className="card-title text-2xl mb-4">Create New Note</h2>
              <form
                id="create-note-form"
                onSubmit={(e) => {
                  e.preventDefault();
                  form.handleSubmit();
                }}
              >
                <FieldGroup>
                  <form.Field
                    name="title"
                    children={(field) => {
                      const isInvalid =
                        field.state.meta.isTouched && !field.state.meta.isValid;
                      return (
                        <Field data-invalid={isInvalid}>
                          <FieldLabel htmlFor={field.name}>
                            Note Title
                          </FieldLabel>
                          <Input
                            id={field.name}
                            name={field.name}
                            className="input-bordered input"
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) => field.handleChange(e.target.value)}
                            aria-invalid={isInvalid}
                            placeholder="Note title"
                            autoComplete="off"
                          />
                          {isInvalid && (
                            <FieldError errors={field.state.meta.errors} />
                          )}
                        </Field>
                      );
                    }}
                  />

                  <form.Field
                    name="content"
                    children={(field) => {
                      const isInvalid =
                        field.state.meta.isTouched && !field.state.meta.isValid;

                      return (
                        <Field data-invalid={isInvalid}>
                          <FieldLabel htmlFor={field.name}>
                            Description
                          </FieldLabel>
                          <InputGroup>
                            <InputGroupTextarea
                              id={field.name}
                              name={field.name}
                              value={field.state.value}
                              onBlur={field.handleBlur}
                              onChange={(e) =>
                                field.handleChange(e.target.value)
                              }
                              placeholder="Note description"
                              rows={6}
                              className="min-h-24 resize-none"
                              aria-invalid={isInvalid}
                            />
                            <InputGroupAddon align="block-end">
                              <InputGroupText className="tabular-nums">
                                {field.state.value.length}/100 characters
                              </InputGroupText>
                            </InputGroupAddon>
                          </InputGroup>
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

                <div className="form-control flex flex-col w-full mt-4 gap-2">
                  <Field orientation="horizontal">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => form.reset()}
                    >
                      Reset
                    </Button>
                    <Button type="submit" form="create-note-form">
                      {loading ? "creating..." : "Create note"}
                    </Button>
                  </Field>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateNotePage;
