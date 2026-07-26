import fs from "fs";
import path from "path";
import multer from "multer";

export const UPLOADS_ROOT = path.resolve("uploads", "customers");

const BLOCKED_EXTENSIONS = [
  ".exe",
  ".sh",
  ".bat",
  ".cmd",
  ".msi",
  ".js",
  ".php",
];

const sanitizeFileName = (originalName) => {
  return path.basename(originalName).replace(/[^a-zA-Z0-9.\-_ ]/g, "_");
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const customerId = Number(req.params.customerId);

    if (!Number.isInteger(customerId) || customerId <= 0) {
      return cb(new Error("Invalid customer ID"));
    }

    const dir = path.join(UPLOADS_ROOT, String(customerId));

    fs.mkdirSync(dir, { recursive: true });

    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const safeName = sanitizeFileName(file.originalname);

    cb(null, `${Date.now()}-${safeName}`);
  },
});

const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();

  if (BLOCKED_EXTENSIONS.includes(ext)) {
    return cb(new Error("File type not allowed"));
  }

  cb(null, true);
};

export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 20 * 1024 * 1024,
  },
});
