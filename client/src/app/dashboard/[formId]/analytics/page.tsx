"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const AnalyticsPage = () => {
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
        console.error("Analytics fetch failed", e);
      } finally {
        setLoading(false);
      }
    };
    fetchForm();
  }, [formId]);

  if (loading) return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-purple-200 to-purple-300 flex items-center justify-center">
      <div className="p-6 text-lg font-semibold text-black">Loading analytics...</div>
    </div>
  );
  if (!form) return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-purple-200 to-purple-300 flex items-center justify-center">
      <div className="p-6 text-lg font-semibold text-black">Form not found</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-purple-200 to-purple-300 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-black">Analytics for: {form.title}</h1>
        <p className="mb-4 text-lg text-black">Total responses: {form.responses?.length || 0}</p>
        <ul className="divide-y divide-purple-300">
          {form.questions.map((q: any) => (
            <li key={q.id} className="py-4">
              <p className="text-xl font-semibold text-black">{q.title}</p>
              <p className="text-base text-black">Type: {q.type}</p>
              {/* You can later add charts/stats here */}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AnalyticsPage;