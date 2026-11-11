"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

type Question = {
  id: string;
  title: string;
  type: "string" | "int" | "float" | "boolean" | "dropdown" | "file";
  options?: string[];
};

type Form = {
  id: string;
  title: string;
  description?: string;
  questions: Question[];
};

type AnswerMap = { [key: string]: string | string[] | File };

const PublicFormPage = () => {
  const { formId } = useParams();
  const [form, setForm] = useState<Form | null>(null);
  const [answers, setAnswers] = useState<AnswerMap>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const getSafeValue = (value: string | string[] | File | undefined): string => {
    return typeof value === "string" ? value : "";
  };

  useEffect(() => {
    const fetchForm = async () => {
      try {
        const res = await fetch(`http://localhost:3000/forms/${formId}`);
        const data = await res.json();
        setForm(data);
      } catch (err) {
        console.error("Failed to load form", err);
      }
    };
    fetchForm();
  }, [formId]);

  const handleChange = (qid: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [qid]: value }));
  };

  const handleSubmit = async () => {
    setStatus("submitting");
    try {
      const formData = new FormData();
      formData.append("formId", formId?.toString() ?? "");

      const answersArr = Object.entries(answers).map(([questionId, answer]) => {
        if (answer instanceof File) {
          formData.append(`file_${questionId}`, answer);
          return { questionId, answer:` __file__${questionId}` };
        } else if (Array.isArray(answer)) {
          return { questionId, answer: answer.join(",") };
        } else {
          return { questionId, answer };
        }
      });

      formData.append("answers", JSON.stringify(answersArr));

      const res = await fetch(`http://localhost:3000/forms/${formId}/submit`, {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        setStatus("success");
        setAnswers({});
      } else {
        throw new Error("Submission failed");
      }
    } catch {
      setStatus("error");
    }
  };

  if (!form) return <div className="p-6">Loading form...</div>;

  return (
    <div
      className="min-h-screen w-full flex flex-col items-center justify-start"
      style={{
        background: "linear-gradient(120deg, #f8e1ff 0%, #e0c3fc 100%)", // light purple gradient
      }}
    >
      <div className="bg-white/70 backdrop-blur-lg rounded-xl shadow-lg p-8 mt-8 w-full max-w-lg">
        <h1 className="text-3xl font-bold mb-2 text-gray-800">{form.title}</h1>
        <p className="text-gray-500 mb-6">{form.description}</p>
        {form.questions.map((q) => (
          <div key={q.id} className="mb-5">
            <label className="block font-semibold mb-2 text-gray-700">{q.title}</label>
            {q.type === "boolean" && Array.isArray(q.options) ? (
              q.options.map((option, idx) => (
                <label key={idx} className="flex items-center mb-1 text-gray-600">
                  <input
                    type="checkbox"
                    className="mr-2 accent-purple-400"
                    checked={
                      Array.isArray(answers[q.id]) &&
                      (answers[q.id] as string[]).includes(option)
                    }
                    onChange={(e) => {
                      setAnswers((prev) => {
                        const prevArr = Array.isArray(prev[q.id])
                          ? [...(prev[q.id] as string[])]
                          : [];
                        if (e.target.checked) {
                          return { ...prev, [q.id]: [...prevArr, option] };
                        } else {
                          return {
                            ...prev,
                            [q.id]: prevArr.filter((o) => o !== option),
                          };
                        }
                      });
                    }}
                  />
                  {option}
                </label>
              ))
            ) : q.type === "string" && Array.isArray(q.options) ? (
              q.options.map((option, idx) => (
                <label key={idx} className="flex items-center mb-1 text-gray-600">
                  <input
                    type="radio"
                    className="mr-2 accent-purple-400"
                    name={q.id}
                    checked={answers[q.id] === option}
                    onChange={() => handleChange(q.id, option)}
                  />
                  {option}
                </label>
              ))
            ) : q.type === "dropdown" && Array.isArray(q.options) ? (
              <select
                className="w-full border border-purple-200 p-2 rounded-lg bg-white/80 focus:border-purple-400 focus:outline-none"
                value={getSafeValue(answers[q.id])}
                onChange={(e) => handleChange(q.id, e.target.value)}
              >
                <option value="" disabled>
                  Select an option
                </option>
                {q.options.map((option, idx) => (
                  <option key={idx} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            ) : q.type === "file" ? (
              <input
                type="file"
                className="w-full border border-purple-200 p-2 rounded-lg bg-white/80"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setAnswers((prev) => ({ ...prev, [q.id]: file }));
                  }
                }}
              />
            ) : q.type === "int" || q.type === "float" ? (
              <input
                type="text"
                className="w-full border border-purple-200 p-2 rounded-lg bg-white/80"
                value={getSafeValue(answers[q.id])}
                onChange={(e) => handleChange(q.id, e.target.value)}
              />
            ) : (
              <input
                type="text"
                className="w-full border border-purple-200 p-2 rounded-lg bg-white/80"
                value={getSafeValue(answers[q.id])}
                onChange={(e) => handleChange(q.id, e.target.value)}
              />
            )}
          </div>
        ))}
        {}
        <button
          onClick={handleSubmit}
          className="w-full py-2 rounded-xl text-white font-semibold transition
            bg-gradient-to-r from-[#c9a7f7] to-[#8ec5fc] border-none shadow-none"
          disabled={status === "submitting"}
        >
          Submit
        </button>
        {status === "success" && (
          <p className="text-green-600 mt-4 text-center">Submitted successfully!</p>
        )}
        {status === "error" && (
          <p className="text-red-600 mt-4 text-center">Failed to submit. Try again.</p>
        )}
      </div>
    </div>
  );
};

export default PublicFormPage;