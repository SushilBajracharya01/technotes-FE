export default function Input({
  id,
  type = "text",
  value,
  onChange,
  isRequired,
  autoComplete,
  inputRef,
  className,
  label,
}) {
  return (
    <div>
      <label className="block text-gray-700 text-sm font-bold mb-2" for={id}>
        {label}
      </label>
      <input
        id={id}
        ref={inputRef}
        type={type}
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
        required={isRequired}
        className={`${className} appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
      />
    </div>
  );
}
