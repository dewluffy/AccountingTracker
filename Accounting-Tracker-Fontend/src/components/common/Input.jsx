export default function Input({
  label,
  error,
  ...props
}) {
  return (
    <div className="space-y-1">
      <label className="font-medium">
        {label}
      </label>

      <input
        {...props}
        className="
          w-full
          rounded-lg
          border
          px-4
          py-2
          focus:outline-none
          focus:ring-2
          focus:ring-blue-500
        "
      />

      {error && (
        <p className="text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}