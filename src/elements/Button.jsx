/**
 *
 */
export default function Button({
  label,
  icon,
  variant = "primary",
  className,
  onClick,
  disabled,
}) {
  let classes = "";
  switch (variant) {
    case "primary":
      classes += "text-white bg-blue-600 hover:bg-blue-700 focus:ring-blue-500";
      break;
    case "outline-primary":
      classes +=
        "border text-blue-600 bg-white border-blue-600 hover:bg-blue-700 hover:text-white focus:ring-blue-500";
      break;
    case "secondary":
      classes +=
        "text-slate-50 bg-pink-600 hover:bg-pink-500 focus:ring-pink-300";
      break;
    case "danger":
      classes += "text-slate-50 bg-red-600 hover:bg-red-500 focus:ring-red-300";
      break;
    case "danger-outline":
      classes +=
        "border text-red-600 bg-white border-red-600 hover:bg-red-700 hover:text-white focus:ring-red-500";
      break;

    default:
      break;
  }

  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 ${classes} ${className} ${
        disabled ? "bg-gray-500 text-gray-900 hover:bg-gray-300" : ""
      }`}
      disabled={disabled}
    >
      {icon}
      {label}
    </button>
  );
}
