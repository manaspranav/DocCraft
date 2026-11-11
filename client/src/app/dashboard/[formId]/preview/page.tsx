"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const PreviewPage = () => {
  const { formId } = useParams();
  const [form, setForm] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchForm = async () => {
      try {
        const res = await fetch(`http://localhost:3000/forms/${formId}`);
        const data = await res.json();
        setForm(data);
      } catch (e) {
        console.error("Failed to load form", e);
      } finally {
        setLoading(false);
      }
    };
    fetchForm();
  }, [formId]);

  if (loading) return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-purple-200 to-purple-300 flex items-center justify-center">
      <div className="p-6 text-lg font-semibold text-black">Loading preview...</div>
    </div>
  );
  if (!form) return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-purple-200 to-purple-300 flex items-center justify-center">
      <div className="p-6 text-lg font-semibold text-black">Form not found</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-purple-200 to-purple-300 p-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-black">{form.title}</h1>
        <p className="text-lg mb-6 text-black">{form.description}</p>
        <ul className="space-y-4">
          {form.questions.map((q: any, index: number) => (
            <li key={q.id} className="border border-purple-300 p-4 rounded-lg shadow-lg bg-white bg-opacity-90 hover:shadow-xl transition-shadow duration-300">
              <p className="text-xl font-semibold text-black">
                {index + 1}. {q.title}
              </p>
              <p className="text-base text-black">Type: {q.type}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PreviewPage;