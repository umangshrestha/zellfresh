import React from 'react';
import { Link } from 'react-router-dom';

type TextInputFieldProps = {
  id: string;
  name: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  required?: boolean;
  type?: string;
};

export const TextInputField: React.FC<TextInputFieldProps> = ({
  id,
  name,
  label,
  value,
  onChange,
  error,
  required = false,
  type = "text",
}) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        className="mt-1 block w-full px-2 py-[6px] border border-gray-300 rounded-xl"
        required={required}
      />
      {error && <span className="text-red-500 text-[12px]">{error}</span>}
    </div>
  );
};

type ButtonProps = {
  type?: any;
  label: string;
  onClick?: () => void;
  className?: string;
  to?: string;
};

export const Button: React.FC<ButtonProps> = ({
  type = "button",
  label,
  onClick,
  className = "py-2 px-4 rounded-md ",
  to,
}) => {
  let buttonClassName = "";

  switch (type) {
    case "button":
      buttonClassName = "bg-blue-500 text-white hover:bg-blue-600";
      break;
    case "submit":
      buttonClassName = "bg-green-500 text-white hover:bg-green-600";
      break;
    case "reset":
      buttonClassName = "bg-gray-500 text-white hover:bg-gray-600";
      break;
    case "link":
      buttonClassName = "text-blue-500 hover:text-blue-600";
      break;
    case "theme":
      buttonClassName = "bg-orange-500 text-white hover:bg-orange-600";
      break;
    default:
      buttonClassName = "bg-blue-500 text-white hover:bg-blue-600";
  }

  const finalClassName = `${buttonClassName} ${className}`;
  if (type === "link" && to) {
    return (
      <Link to={to} className={finalClassName}>
        {label}
      </Link>
    );
  }

  // Otherwise, render a regular button
  return (
    <button type={type} onClick={onClick} className={finalClassName}>
      {label}
    </button>
  );
};