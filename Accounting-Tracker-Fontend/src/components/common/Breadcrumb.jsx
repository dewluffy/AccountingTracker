import { Link } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa";

export default function Breadcrumb({ items = [] }) {
  return (
    <div className="flex items-center gap-2 text-sm text-slate-500">
      {items.map((item, index) => (
        <div
          key={index}
          className="flex items-center gap-2"
        >
          {index !== 0 && (
            <FaChevronRight className="text-xs" />
          )}

          {item.to ? (
            <Link
              to={item.to}
              className="
                hover:text-blue-600
                transition
              "
            >
              {item.label}
            </Link>
          ) : (
            <span className="font-medium text-slate-800">
              {item.label}
            </span>
          )}
        </div>
      ))}
    </div>
  );
}