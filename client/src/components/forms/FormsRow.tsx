import React from "react";
import { Eye, BarChart2, Download, Edit2 } from "lucide-react";

type FormRowProps = {
  form: {
    id: number;
    title: string;
    desc: string;
    responses: number;
    created: string;
    status: string;
  };
};

const FormRow: React.FC<FormRowProps> = ({ form }) => (
  <tr className="border-t">
    <td className="py-3 font-semibold text-black">{form.title}</td>
    <td className="py-3 text-sm text-black">{form.desc}</td>
    <td className="py-3 text-black">{form.responses}</td>
    <td className="py-3 text-black">{form.created}</td>
    <td className="py-3">
      <span
        className={`px-2 py-1 rounded text-xs font-medium ${
          form.status === "enabled"
            ? "bg-purple-200 text-purple-800"
            : "bg-gray-200 text-gray-700"
        }`}
      >
        {form.status === "enabled" ? "Enabled" : "Disabled"}
      </span>
    </td>
    <td className="py-3 flex gap-3">
      <button title="View" className="bg-gradient-to-br from-purple-200 via-purple-300 to-purple-400 text-black px-2 py-1 rounded hover:from-purple-300 hover:via-purple-400 hover:to-purple-500">
        <Eye size={18} />
      </button>
      <button title="Analytics" className="bg-gradient-to-br from-purple-200 via-purple-300 to-purple-400 text-black px-2 py-1 rounded hover:from-purple-300 hover:via-purple-400 hover:to-purple-500">
        <BarChart2 size={18} />
      </button>
      <button title="Download" className="bg-gradient-to-br from-purple-200 via-purple-300 to-purple-400 text-black px-2 py-1 rounded hover:from-purple-300 hover:via-purple-400 hover:to-purple-500">
        <Download size={18} />
      </button>
      <button title="Edit" className="bg-gradient-to-br from-purple-200 via-purple-300 to-purple-400 text-black px-2 py-1 rounded hover:from-purple-300 hover:via-purple-400 hover:to-purple-500">
        <Edit2 size={18} />
      </button>
    </td>
  </tr>
);

export default FormRow;