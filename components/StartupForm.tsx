"use client";

import { useActionState, useState } from "react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

import MDEditor from "@uiw/react-md-editor";
import { Send } from "lucide-react";
import { Button } from "./ui/button";
import { FormSchema } from "@/lib/validations";

import {z} from "zod";
import { useToast } from "@/hooks/use-toast";


const StartupForm = () => {
  const [error, setErrors] = useState<Record<string, string>>({});
  const [pitch, setPitch] = useState("");

  const {toast}  = useToast();

  const handleFormSubmit = async (prevState: any, formData: FormData) => {
    try {
        const formValues = {
            title: formData.get('title') as string,
            description: formData.get('description') as string,
            category: formData.get('category') as string,
            link: formData.get('link') as string,
            pitch
        }

        await FormSchema.parseAsync(formValues);

        console.log(formValues);


    } catch (error) {
        if(error instanceof z.ZodError) {
            const fieldErrors = error.flatten().fieldErrors;

            setErrors(fieldErrors as unknown as Record<string, string>);

            toast ({
                title: "Error",
                description: "Please check the input fields and try again",
                variant: "destructive"
            })

            return {...prevState, error: "Validation error", status: "ERROR"};
        }

        toast ({
            title: "Error",
            description: "An unexpected error has occured",
            variant: "destructive"
        })

        return {...prevState, error: "An unexpected error has occured", status: "ERROR"};
    }
    finally {

    }
  };

  const [state, formAction, isPending] = useActionState(handleFormSubmit, {error: "", status: "INITIAL"});

  return (
    <form action={formAction} className="startup-form">
      <div>
        <label htmlFor="title" className="startup-form_label">
          Title
        </label>

        <Input
          id="title"
          name="title"
          className="startup-form_input"
          required
          placeholder="Startup Title"
        />

        {error.title && <p className="startup-form_error">{error.title}</p>}
      </div>

      <div>
        <label htmlFor="description" className="startup-form_label">
          Description
        </label>

        <Textarea
          id="description"
          name="description"
          className="startup-form_textarea"
          required
          placeholder="Startup Description"
        />

        {error.description && (
          <p className="startup-form_error">{error.description}</p>
        )}
      </div>

      <div>
        <label htmlFor="category" className="startup-form_label">
          Category
        </label>

        <Input
          id="category"
          name="category"
          className="startup-form_input"
          required
          placeholder="Startup Category (Tech, Health, Education...)"
        />

        {error.category && (
          <p className="startup-form_error">{error.category}</p>
        )}
      </div>

      <div>
        <label htmlFor="link" className="startup-form_label">
          Image URL
        </label>

        <Input
          id="link"
          name="link"
          className="startup-form_input"
          required
          placeholder="Startup Image URL"
        />

        {error.link && <p className="startup-form_error">{error.link}</p>}
      </div>

      <div>
        <label htmlFor="pitch" className="startup-form_label">
          Pitch
        </label>

        <MDEditor
          value={pitch}
          onChange={(value) => setPitch(value as string)}
          height={300}
          id="pitch"
          data-color-mode="light"
          preview="edit"
          style={{
            borderRadius: "20px",
            overflow: "hidden",
            marginTop: "15px",
          }}
          textareaProps={{
            placeholder:
              "Briefly explain your startup idea and how it solves a problem",
          }}
          previewOptions={{
            disallowedElements: ["style"],
          }}
        />

        {error.pitch && <p className="startup-form_error">{error.pitch}</p>}
      </div>

      <Button
        type="submit"
        className="startup-form_btn text-white"
        disabled={isPending}
      >
        {isPending ? "Submitting..." : "Submit Your Pitch"}
        <Send size={5} className="ml-2" />
      </Button>
    </form>
  );
};

export default StartupForm;
