"use client";

import React, { useState } from 'react';
import Header from '@/components/Header';
import FormSettings from '@/components/FormSettings';
import FormFields from '@/components/FormFields';
import SubmitButton from '@/components/SubmitButton';
import type { Field } from '@/components/FormFields';
import { useAuth } from '@/context/auth-context';
import { useRouter } from 'next/navigation';

const CreatePage = () => {
  const [formTitle, setFormTitle] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [visibility, setVisibility] = useState<'Public' | 'Private'>("Public");
  const [responseLimit, setResponseLimit] = useState<number>(100);
  const [deadline, setDeadline] = useState<string>("");
  const [fields, setFields] = useState<Field[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<string | null>(null);

  const { user } = useAuth();
  const router = useRouter();

  const mapTypeToBackend = (type: string) => {
    switch (type) {
      case "number": return "int";
      case "text": return "string";
      case "textarea": return "string";
      case "checkbox": return "boolean";
      case "radio": return "string";
      case "dropdown": return "string";
      case "date": return "string";
      default: return "string";
    }
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setSubmitResult(null);

    try {
      const questions = fields.map((f: any) => ({
        title: f.question,
        type: mapTypeToBackend(f.type),
        options: ["checkbox", "radio", "dropdown"].includes(f.type) ? f.options : undefined,
      }));

      const payload: any = {
        title: formTitle,
        questions,
        visibility,
      };

      if (formDescription) payload.description = formDescription;
      if (responseLimit) payload.responseLimit = responseLimit;
      if (deadline) payload.deadline = deadline;
      const creatorId = user?.id || user?.sub;
      if (creatorId) payload.creatorId = creatorId;

      const res = await fetch("http://localhost:3000/forms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setSubmitResult("Form created successfully!");
        setFields([]);
        setFormTitle("");
        setFormDescription("");
        setVisibility("Public");
        setResponseLimit(100);
        setDeadline("");

        setTimeout(() => {
          router.push("/dashboard/your-forms");
        }, 1500);
      } else {
        setSubmitResult("Failed to create form.");
      }
    } catch (e) {
      setSubmitResult("Error submitting form.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-purple-200 p-6">
      <Header />
      <FormSettings
        formTitle={formTitle}
        setFormTitle={setFormTitle}
        formDescription={formDescription}
        setFormDescription={setFormDescription}
        visibility={visibility}
        setVisibility={setVisibility}
        responseLimit={responseLimit}
        setResponseLimit={setResponseLimit}
        deadline={deadline}
        setDeadline={setDeadline}
      />
      <FormFields fields={fields} setFields={setFields} />
      <div className="mt-6">
        <SubmitButton onClick={handleSubmit} disabled={submitting || !formTitle || fields.length === 0} />
        {submitResult && (
          <div className={`mt-2 text-sm ${submitResult.includes("success") ? "text-green-600" : "text-red-600"}`}>
            {submitResult}
          </div>
        )}
      </div>
    </div>
  );
};

export default CreatePage;
  