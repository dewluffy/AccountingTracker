import {
  getMonthlyTaxByCustomerService,
  getMonthlyTaxGridService,
  updateMonthlyTaxService,
} from "../services/monthlyTax.service.js";

export const getMonthlyTaxGridController = async (req, res, next) => {
  try {
    const { year, month } = req.validatedQuery;

    const grid = await getMonthlyTaxGridService(year, month);

    return res.status(200).json({
      success: true,
      message: "Get monthly tax grid success",
      data: {
        year,
        month,
        grid,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getMonthlyTaxByCustomerController = async (req, res, next) => {
  try {
    const { customerId } = req.params;
    const { year, month } = req.validatedQuery;

    const result = await getMonthlyTaxByCustomerService(customerId, year, month);

    return res.status(200).json({
      success: true,
      message: "Get monthly tax detail success",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const updateMonthlyTaxController = async (req, res, next) => {
  try {
    const { customerId } = req.params;
    const { year, month } = req.validatedQuery;
    const { items } = req.body;

    const result = await updateMonthlyTaxService(
      customerId,
      year,
      month,
      items,
      req.user.id,
    );

    return res.status(200).json({
      success: true,
      message: "Update monthly tax success",
      data: {
        items: result,
      },
    });
  } catch (error) {
    next(error);
  }
};
