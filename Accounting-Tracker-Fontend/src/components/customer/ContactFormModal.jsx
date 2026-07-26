import { useState } from "react";

import Modal from "../common/Modal";
import Button from "../common/Button";

export default function ContactFormModal({
  open,
  mode = "create",
  initialData = null,
  onClose,
  onSubmit,
}) {
  const [form, setForm] = useState(() => ({
    name: initialData?.name || "",
    position: initialData?.position || "",
    phone: initialData?.phone || "",
    email: initialData?.email || "",
  }));

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);

    try {
      await onSubmit?.(form);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      open={open}
      title={mode === "edit" ? "Edit Contact" : "Add Contact"}
      onClose={onClose}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2 text-sm font-medium">
            Name
          </label>

          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full border rounded-xl px-4 py-3"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium">
            Position
          </label>

          <input
            name="position"
            value={form.position}
            onChange={handleChange}
            className="w-full border rounded-xl px-4 py-3"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-2 text-sm font-medium">
              Phone
            </label>

            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-3"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-3"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
          >
            Cancel
          </Button>

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
