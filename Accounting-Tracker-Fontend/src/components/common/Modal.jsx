import { FaTimes } from "react-icons/fa";

export default function Modal({
  open,
  title,
  children,
  onClose,
  footer,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">

      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />

      <div className="absolute inset-0 flex items-center justify-center p-4">

        <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg">

          <div className="p-6 border-b flex justify-between items-center">

            <h2 className="font-semibold text-lg">
              {title}
            </h2>

            <button onClick={onClose}>
              <FaTimes />
            </button>

          </div>

          <div className="p-6">
            {children}
          </div>

          {footer && (
            <div className="p-6 border-t">
              {footer}
            </div>
          )}

        </div>

      </div>

    </div>
  );
}