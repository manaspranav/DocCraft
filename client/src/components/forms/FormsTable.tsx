import React from 'react';
import { useRouter } from 'next/navigation';

type Props = {
  forms: {
    id: string;
    title: string;
    desc: string;
    responses: number;
    created: string;
    status: string;
    shareUrl: string;
  }[];
  onShare: (url: string) => void;
};

const FormsTable: React.FC<Props> = ({ forms, onShare }) => {
  const router = useRouter();

  return (
    <div className="overflow-x-auto rounded-xl">
      <table className="min-w-full table-auto border-collapse bg-white rounded-xl text-sm">
        <thead>
          <tr className="bg-white text-left text-black">
            <th className="px-4 py-2">Title</th>
            <th className="px-4 py-2">Responses</th>
            <th className="px-4 py-2">Created</th>
            <th className="px-4 py-2 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {forms.map(form => (
            <tr key={form.id} className="border-t border-purple-200 hover:bg-purple-50">
              <td className="px-4 py-2 font-medium text-black">{form.title}</td>
              <td className="px-4 py-2 text-black">{form.responses}</td>
              <td className="px-4 py-2 text-black">{form.created}</td>
              <td className="px-4 py-2 flex flex-wrap gap-2 justify-center">
                <button
                  className="bg-purple-300 text-black px-3 py-1 rounded hover:bg-purple-400"
                  onClick={() => router.push(`/dashboard/${form.id}/preview`)}
                >
                  Preview
                </button>
                <button
                  className="bg-purple-300 text-black px-3 py-1 rounded hover:bg-purple-400"
                  onClick={() => router.push(`/dashboard/${form.id}/responses`)}
                >
                  Responses
                </button>
                <button
                  className="bg-purple-300 text-black px-3 py-1 rounded hover:bg-purple-400"
                  onClick={() => router.push(`/dashboard/${form.id}/analytics`)}
                >
                  Analytics
                </button>
                <button
                  className="bg-purple-300 text-black px-3 py-1 rounded hover:bg-purple-400"
                  onClick={() => router.push(`/dashboard/${form.id}/settings`)}
                >
                  Settings
                </button>
                <button
                  className="bg-purple-300 text-black px-3 py-1 rounded hover:bg-purple-400"
                  onClick={() => router.push(`/dashboard/${form.id}/edit`)}
                >
                  Edit
                </button>
                <button
                  className="bg-purple-300 text-black px-3 py-1 rounded hover:bg-purple-400"
                  onClick={() => onShare(form.shareUrl)}
                >
                  Share
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FormsTable;