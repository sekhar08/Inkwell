import React from "react";

type PublishButtonProps = {
  onClick: () => void;
  disabled?: boolean;
};

export default function PublishButton({ onClick, disabled }: PublishButtonProps) {
  return (
    <button
      id="publish-btn"
      onClick={onClick}
      disabled={disabled}
      className="btn btn-primary"
    >
      ✦ Publish
    </button>
  );
}
