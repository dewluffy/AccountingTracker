import {
  createDocumentService,
  deleteDocumentService,
  getDocumentForDownloadService,
  getDocumentsByCustomerService,
} from "../services/customerDocument.service.js";

export const getDocumentsController = async (req, res, next) => {
  try {
    const { customerId } = req.params;

    const documents = await getDocumentsByCustomerService(customerId);

    return res.status(200).json({
      success: true,
      message: "Get documents success",
      data: {
        documents,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const uploadDocumentController = async (req, res, next) => {
  try {
    const { customerId } = req.params;
    const { documentType } = req.body;

    const document = await createDocumentService(
      customerId,
      req.file,
      documentType,
      req.user.id,
    );

    return res.status(201).json({
      success: true,
      message: "Upload document success",
      data: {
        document,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const downloadDocumentController = async (req, res, next) => {
  try {
    const { customerId, documentId } = req.params;

    const { document, absolutePath } = await getDocumentForDownloadService(
      customerId,
      documentId,
    );

    res.download(absolutePath, document.fileName, (err) => {
      if (err) {
        next(err);
      }
    });
  } catch (error) {
    next(error);
  }
};

export const deleteDocumentController = async (req, res, next) => {
  try {
    const { customerId, documentId } = req.params;

    const document = await deleteDocumentService(
      customerId,
      documentId,
      req.user.id,
    );

    return res.status(200).json({
      success: true,
      message: "Delete document success",
      data: {
        document,
      },
    });
  } catch (error) {
    next(error);
  }
};
