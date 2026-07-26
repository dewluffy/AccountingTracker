import {
  createAssignmentService,
  deleteAssignmentService,
  getAssignmentsByCustomerService,
  updateAssignmentService,
} from "../services/customerAssignment.service.js";

export const getAssignmentsController = async (req, res, next) => {
  try {
    const { customerId } = req.params;

    const assignments = await getAssignmentsByCustomerService(customerId);

    return res.status(200).json({
      success: true,
      message: "Get customer assignments success",
      data: {
        assignments,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const createAssignmentController = async (req, res, next) => {
  try {
    const { customerId } = req.params;

    const assignment = await createAssignmentService(
      customerId,
      req.body,
      req.user.id,
    );

    return res.status(201).json({
      success: true,
      message: "Assign staff success",
      data: {
        assignment,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const updateAssignmentController = async (req, res, next) => {
  try {
    const { customerId, assignmentId } = req.params;

    const assignment = await updateAssignmentService(
      customerId,
      assignmentId,
      req.body,
      req.user.id,
    );

    return res.status(200).json({
      success: true,
      message: "Update assignment success",
      data: {
        assignment,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const deleteAssignmentController = async (req, res, next) => {
  try {
    const { customerId, assignmentId } = req.params;

    const assignment = await deleteAssignmentService(
      customerId,
      assignmentId,
      req.user.id,
    );

    return res.status(200).json({
      success: true,
      message: "Unassign staff success",
      data: {
        assignment,
      },
    });
  } catch (error) {
    next(error);
  }
};
