import {
  getAnnualTaxByCustomerService,
  getAnnualTaxGridService,
  updateAnnualTaxService,
} from "../services/annualTax.service.js";

export const getAnnualTaxGridController = async (req, res, next) => {
  try {
    const { year } = req.validatedQuery;

    const grid = await getAnnualTaxGridService(year);

    return res.status(200).json({
      success: true,
      message: "Get annual tax grid success",
      data: {
        year,
        grid,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getAnnualTaxByCustomerController = async (req, res, next) => {
  try {
    const { customerId } = req.params;
    const { year } = req.validatedQuery;

    const result = await getAnnualTaxByCustomerService(customerId, year);

    return res.status(200).json({
      success: true,
      message: "Get annual tax detail success",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const updateAnnualTaxController = async (req, res, next) => {
  try {
    const { customerId } = req.params;
    const { year } = req.validatedQuery;
    const { items } = req.body;

    const result = await updateAnnualTaxService(
      customerId,
      year,
      items,
      req.user.id,
    );

    return res.status(200).json({
      success: true,
      message: "Update annual tax success",
      data: {
        items: result,
      },
    });
  } catch (error) {
    next(error);
  }
};
