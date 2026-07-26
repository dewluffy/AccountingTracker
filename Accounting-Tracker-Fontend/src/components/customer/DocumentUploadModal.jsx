import { useState } from "react";

import Modal from "../common/Modal";
import Button from "../common/Button";

export default function DocumentUploadModal({
  open,
  onClose,
  onSubmit,
}) {
  const [file, setFile] = useState(null);
  const [documentType, setDocumentType] = useState("OTHER");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) return;

    setIsSubmitting(true);

    try {
      await onSubmit?.(file, documentType);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      open={open}
      title="Upload Document"
      onClose={onClose}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2 text-sm font-medium">
            File
          </label>

          <input
            type="file"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            required
            className="w-full border rounded-xl px-4 py-3"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium">
            Document Type
          </label>

          <select
            value={documentType}
            onChange={(e) => setDocumentType(e.target.value)}
            className="w-full border rounded-xl px-4 py-3"
          >
            <option value="TAX">Tax</option>
            <option value="FINANCIAL">Financial</option>
            <option value="CONTRACT">Contract</option>
            <option value="OTHER">Other</option>
          </select>
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
          >
            Cancel
          </Button>

          <Button type="submit" disabled={isSubmitting || !file}>
            {isSubmitting ? "Uploading..." : "Upload"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
