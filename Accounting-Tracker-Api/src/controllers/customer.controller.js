import { createCustomerService, deleteCustomerService, getCustomerByIdService, getCustomersService, updateCustomerService } from "../services/customer.service.js";


export const createCustomerController = async (req, res, next) => {
  try {
    const customer = await createCustomerService(req.body, req.user.id);

    return res.status(201).json({
      success: true,
      message: "Create customer success",
      data: {
        customer,
      },
    });
  } catch (error) {
    next(error);
  }
};
export const getCustomersController = async (req, res, next) => {
  try {
    const customers = await getCustomersService();

    return res.status(200).json({
      success: true,
      message: "Get customers success",
      data: {
        customers,
      },
    });
  } catch (error) {
    next(error);
  }
};
export const getCustomerByIdController = async (req, res, next) => {
  try {
    const { customerId } = req.params;

    const customer = await getCustomerByIdService(customerId);

    return res.status(200).json({
      success: true,
      message: "Get customer success",
      data: {
        customer,
      },
    });
  } catch (error) {
    next(error);
  }
};
export const updateCustomerController = async (req, res, next) => {
  try {
    const { customerId } = req.params;

    const customer = await updateCustomerService(customerId, req.body, req.user.id);

    return res.status(200).json({
      success: true,
      message: "Update customer success",
      data: {
        customer,
      },
    });
  } catch (error) {
    next(error);
  }
};
export const deleteCustomerController = async (req, res, next) => {
  try {
    const { customerId } = req.params;

    const customer = await deleteCustomerService(customerId, req.user.id);

    return res.status(200).json({
      success: true,
      message: "Delete customer success",
      data: {
        customer,
      },
    });
  } catch (error) {
    next(error);
  }
};