export const Position = async ({ position_id }) => {
  return { id: position_id };
};

export const User = async ({ user_id }) => {
  return { id: user_id };
};

export const EmployeeInfo = async ({ user_id }) => {
  return { user_id: user_id };
};

export const Business_manager = async ({ business_manager_id }) => {
  return { id: business_manager_id };
};

export const Technical_manager = async ({ technical_manager_id }) => {
  return { id: technical_manager_id };
};

//This function is to resolve a User ID for the  Created by on the Employee Status
export const CreatedBy = async ({ created_by }) => {
  return { id: created_by };
};

//This function is to resolve a User ID for the  Created by on the Employee Status
export const UpdatedBy = async ({ updated_by }) => {
  return { id: updated_by };
};

export const Validator = async ({ validator_id }) => {
  return { id: validator_id };
};
