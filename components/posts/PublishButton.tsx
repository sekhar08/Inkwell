import React from "react";

type PublishButtonProps = {
  onClick: () => void;
  disabled?: boolean;
};

export default function PublishButton({ onClick, disabled }: PublishButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition disabled:opacity-50"
    >
      Publish
    </button>
  );
}
