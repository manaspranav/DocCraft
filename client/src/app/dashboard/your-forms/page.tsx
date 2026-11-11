"use client";

import React, { useEffect, useState } from "react";
import FormsTable from "@/components/forms/FormsTable";
import { useAuth } from '@/context/auth-context';

function YourFormsPage() {
  const { user } = useAuth();
  const userId = user?.id || user?.sub;
  const [forms, setForms] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchForms = async (userId: string) => {
    setError(null);
    try {
      const res = await fetch(`http://localhost:3000/forms/user/${userId}`);
      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData?.message || "Failed to fetch forms");
      }

      const data = await res.json();
      const mapped = data.map((form: any) => ({
        id: form.id,
        title: form.title,
        desc: form.description || "",
        responses: form.responses ? form.responses.length : 0,
        created: form.createdAt ? new Date(form.createdAt).toLocaleDateString() : "",
        status: form.status || "enabled",
        shareUrl: `http://localhost:3001/forms/${form.id}` // Adjust domain if needed
      }));

      setForms(mapped);
    } catch (e: any) {
      setError(e.message || "Unknown error");
    }
  };

  useEffect(() => {
    if (!userId) {
      setForms([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    fetchForms(userId).finally(() => setLoading(false));
    const interval = setInterval(() => fetchForms(userId), 5000);
    return () => clearInterval(interval);
  }, [userId]);

  const handleShareForm = (formUrl: string) => {
    navigator.clipboard.writeText(formUrl)
      .then(() => alert("Shareable link copied to clipboard!"))
      .catch(() => alert("Failed to copy link."));
  };

  if (!userId) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-100 via-purple-200 to-purple-300 flex items-center justify-center">
        <div className="text-center text-lg font-semibold text-black mt-10">Please log in to view your forms.</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-purple-200 to-purple-300 py-10 px-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-black mb-6">My Forms</h2>
        {loading ? (
          <div className="text-center text-lg font-semibold text-black">Loading...</div>
        ) : error ? (
          <div className="text-center text-lg font-semibold text-black">{error}</div>
        ) : (
          <FormsTable
            forms={forms}
            onShare={handleShareForm}
          />
        )}
      </div>
    </div>
  );
}

export default YourFormsPage;