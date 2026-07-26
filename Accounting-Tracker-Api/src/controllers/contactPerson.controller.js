import {
  createContactService,
  deleteContactService,
  getContactsByCustomerService,
  updateContactService,
} from "../services/contactPerson.service.js";

export const getContactsController = async (req, res, next) => {
  try {
    const { customerId } = req.params;

    const contacts = await getContactsByCustomerService(customerId);

    return res.status(200).json({
      success: true,
      message: "Get contacts success",
      data: {
        contacts,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const createContactController = async (req, res, next) => {
  try {
    const { customerId } = req.params;

    const contact = await createContactService(customerId, req.body, req.user.id);

    return res.status(201).json({
      success: true,
      message: "Create contact success",
      data: {
        contact,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const updateContactController = async (req, res, next) => {
  try {
    const { customerId, contactId } = req.params;

    const contact = await updateContactService(
      customerId,
      contactId,
      req.body,
      req.user.id,
    );

    return res.status(200).json({
      success: true,
      message: "Update contact success",
      data: {
        contact,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const deleteContactController = async (req, res, next) => {
  try {
    const { customerId, contactId } = req.params;

    const contact = await deleteContactService(customerId, contactId, req.user.id);

    return res.status(200).json({
      success: true,
      message: "Delete contact success",
      data: {
        contact,
      },
    });
  } catch (error) {
    next(error);
  }
};
