import React from 'react';

const SubmitButton = ({ onClick, disabled }: { onClick?: () => void; disabled?: boolean }) => {
  return (
    <div className="text-center">
      <button className="px-6 py-2 bg-gradient-to-br from-purple-300 via-purple-400 to-purple-500 text-white rounded-lg hover:from-purple-400 hover:via-purple-500 hover:to-purple-600 disabled:bg-gray-200" onClick={onClick} disabled={disabled}>
        Submit
      </button>
    </div>
  );
};

export default SubmitButton;