"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import FormSettings from "@/components/FormSettings";
import FormFields, { Field } from "@/components/FormFields";
import SubmitButton from "@/components/SubmitButton";

const EditFormPage = () => {
  const { formId } = useParams();
  const router = useRouter();
  const [formTitle, setFormTitle] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [visibility, setVisibility] = useState<'Public' | 'Private'>("Public");
  const [responseLimit, setResponseLimit] = useState<number>(100);
  const [deadline, setDeadline] = useState<string>("");
  const [fields, setFields] = useState<Field[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [submitResult, setSubmitResult] = useState<string | null>(null);

  useEffect(() => {
    const fetchForm = async () => {
      try {
        const res = await fetch(`http://localhost:3000/forms/${formId}`);
        const data = await res.json();

        setFormTitle(data.title || "");
        setFormDescription(data.description || "");
        setVisibility(data.visibility || "Public");
        setResponseLimit(data.responseLimit || 100);
        setDeadline(data.deadline || "");

        const mappedFields = data.questions.map((q: any) => ({
          id: q.id,
          question: q.title,
          type: mapBackendTypeToUI(q.type),
        }));
        setFields(mappedFields);
      } catch (e) {
        console.error("Failed to load form", e);
      } finally {
        setLoading(false);
      }
    };
    fetchForm();
  }, [formId]);

  const mapBackendTypeToUI = (type: string) => {
    switch (type) {
      case "int": return "number";
      case "float": return "number";
      case "boolean": return "checkbox";
      case "string": return "text";
      default: return "text";
    }
  };

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

  const handleUpdate = async () => {
    setUpdating(true);
    setSubmitResult(null);

    try {
      const payload = {
        title: formTitle,
        description: formDescription,
        visibility,
        responseLimit,
        deadline,
        questions: fields.map(f => ({
          id: f.id, // Optional: use this to match existing questions
          title: f.question,
          type: mapTypeToBackend(f.type),
        })),
      };

      const res = await fetch(`http://localhost:3000/forms/${formId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setSubmitResult("Form updated successfully!");
        router.refresh(); // Optional: reload page state
      } else {
        const err = await res.json();
        throw new Error(err.message || "Failed to update");
      }
    } catch (e) {
      setSubmitResult("Error updating form.");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <div className="p-6">Loading editor...</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-200 p-6">
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
        <SubmitButton
          onClick={handleUpdate}
          disabled={updating || !formTitle || fields.length === 0}
          label="Update Form"
        />
        {submitResult && (
          <div className={`mt-2 text-sm ${submitResult.includes("success") ? "text-green-600" : "text-red-600"}`}>
            {submitResult}
          </div>
        )}
      </div>
    </div>
  );
};

export default EditFormPage; 