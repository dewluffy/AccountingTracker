export default function TaxChecklist({
  title,
  items,
}) {
  return (
    <div className="border rounded-2xl p-5">

      <h3 className="font-semibold text-lg mb-4">
        {title}
      </h3>

      <div className="space-y-3">

        {items.map((item) => (
          <label
            key={item}
            className="flex items-center gap-3"
          >
            <input
              type="checkbox"
              className="w-4 h-4"
            />

            <span>{item}</span>
          </label>
        ))}

      </div>

    </div>
  );
}