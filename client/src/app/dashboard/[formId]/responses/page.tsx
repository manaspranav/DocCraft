"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const ResponsesPage = () => {
  const { formId } = useParams();
  const [responses, setResponses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResponses = async () => {
      try {
        const res = await fetch(`http://localhost:3000/forms/${formId}/responses`);
        const data = await res.json();
        setResponses(data);
      } catch (e) {
        console.error("Error fetching responses", e);
      } finally {
        setLoading(false);
      }
    };
    fetchResponses();
  }, [formId]);

  if (loading) return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-purple-200 to-purple-300 flex items-center justify-center">
      <div className="p-6 text-lg font-semibold text-black">Loading responses...</div>
    </div>
  );
  if (!responses.length) return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-purple-200 to-purple-300 flex items-center justify-center">
      <div className="p-6 text-lg font-semibold text-black">No responses yet.</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-purple-200 to-purple-300 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-black">Responses</h1>
        {responses.map((response, i) => (
          <div
            key={response.id}
            className="border border-purple-300 rounded-lg mb-4 p-6 bg-white bg-opacity-90 shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <p className="text-sm font-medium text-black mb-3">
              Submitted on: {new Date(response.createdAt).toLocaleString()}
            </p>
            <ul className="list-disc pl-5 space-y-2">
              {response.answers.map((ans: any) => (
                <li key={ans.id} className="text-black">
                  <strong className="font-semibold">{ans.question.title}:</strong> {ans.answer}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResponsesPage;