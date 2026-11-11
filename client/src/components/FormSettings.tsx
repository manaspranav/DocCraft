import React from 'react';

const FormSettings = ({
  formTitle,
  setFormTitle,
  formDescription,
  setFormDescription,
  visibility,
  setVisibility,
  responseLimit,
  setResponseLimit,
  deadline,
  setDeadline,
}: {
  formTitle: string;
  setFormTitle: (title: string) => void;
  formDescription: string;
  setFormDescription: (desc: string) => void;
  visibility: 'Public' | 'Private';
  setVisibility: (v: 'Public' | 'Private') => void;
  responseLimit: number;
  setResponseLimit: (n: number) => void;
  deadline: string;
  setDeadline: (d: string) => void;
}) => {
  return (
    <div className="bg-white shadow-lg p-6 rounded-lg mb-6 border border-gray-200">
      <h2 className="text-xl font-semibold text-gray-700 mb-6 font-roboto">Form Settings</h2>
      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-gray-600 font-roboto mb-2">Form Title</label>
          <input
            type="text"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200 hover:border-indigo-200 transition duration-200 font-roboto bg-white shadow-sm border-gray-300"
            placeholder="Enter form title"
            value={formTitle}
            onChange={e => setFormTitle(e.target.value)}
          />
        </div>
        <div className="col-span-2">
          <label className="block text-gray-600 font-roboto mb-2">Description</label>
          <textarea
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200 hover:border-indigo-200 transition duration-200 font-roboto bg-white shadow-sm border-gray-300"
            placeholder="Enter form description"
            rows={4}
            value={formDescription}
            onChange={e => setFormDescription(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-gray-600 font-roboto mb-2">Visibility</label>
          <select
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200 hover:border-indigo-200 transition duration-200 font-roboto bg-white shadow-sm border-gray-300"
            value={visibility}
            onChange={e => setVisibility(e.target.value as 'Public' | 'Private')}
          >
            <option value="Public">Public</option>
            <option value="Private">Private</option>
          </select>
        </div>
        <div>
          <label className="block text-gray-600 font-roboto mb-2">Response Limit</label>
          <input
            type="number"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200 hover:border-indigo-200 transition duration-200 font-roboto bg-white shadow-sm border-gray-300"
            placeholder="Enter response limit"
            value={responseLimit}
            min={1}
            onChange={e => setResponseLimit(Number(e.target.value))}
          />
        </div>
        <div>
          <label className="block text-gray-600 font-roboto mb-2">Deadline</label>
          <input
            type="date"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200 hover:border-indigo-200 transition duration-200 font-roboto bg-white shadow-sm border-gray-300"
            value={deadline}
            onChange={e => setDeadline(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default FormSettings;