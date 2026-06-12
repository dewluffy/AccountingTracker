import Modal from "./Modal";

export default function ConfirmModal({
  open,
  title = "Confirm",
  message = "Are you sure?",
  onClose,
  onConfirm,
}) {
  return (
    <Modal
      open={open}
      title={title}
      onClose={onClose}
      footer={
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="
              px-4 py-2 rounded-xl border
            "
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="
              px-4 py-2 rounded-xl
              bg-red-600 text-white
            "
          >
            Delete
          </button>
        </div>
      }
    >
      <p className="text-slate-600">
        {message}
      </p>
    </Modal>
  );
}