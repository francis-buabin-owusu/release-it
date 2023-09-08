enum Project_Confirmation_Status {
  Confirmed = 'Confirmed',
  Tentative = 'Tentative',
}

enum Project_Status {
  Not_Started = 'Not_Started',
  In_Progress = 'In_Progress',
  Completed = 'Completed',
  Suspended = 'Suspended',
  Terminated = 'Terminated',
}

enum Billability_Status {
  Billable = 'Billable',
  Not_Billable = 'Not_Billable',
}

enum Confirmation_Status {
  Confirmed = 'Confirmed',
  Unconfirmed = 'Unconfirmed',
}

enum Role {
  Team_Lead = 'Team_Lead',
  Member = 'Member',
  Backup = 'Backup',
}

enum Project_Staffing_Status {
  Not_Started = 'Not_Started',
  Awaiting_Confirmation = 'Awaiting_Confirmation',
  Completed = 'Completed',
}

interface ProjectArgs {
  data: {
    id: number;
    name: string;
    description: string;
    client_id: number;
    business_manager_id: number;
    technical_manager_id: number;
    // project_confirmation_status: Project_Confirmation_Status
    project_confirmation_status: boolean;
    project_status: Project_Status;
    project_staffing_status: Project_Staffing_Status;
    requirements: [requirement];
    staffs: [staff];
    start_date: string;
    end_date: string;
    archive: boolean;
    created_by: number;
    updated_by: number;
    suspensionReason: string;
    terminationReason: string;
    //multiple projects
    project_ids: number[];
    // pagination
    skip: number;
    take: number;
  };
}

interface staff {
  user_id: number;
}

interface requirement {
  specialization_id: number;
  position_id: number;
  skill_ids: [number];
  employees_required: number;
}

interface staffConfirmationArgs {
  data: {
    id: number;
    billability_status: Billability_Status;
    confirmation_status: Confirmation_Status;
    role: Role;
    project_hours: number;
    project_start_date: string;
    project_end_date: string;
    employee_email: string;
    employee_name: string;
    technical_manager_name: string;
    business_manager_name: string;
  };
}

interface bulkStaffConfirmationArgs {
  data: {
    confirmationDetails: [
      {
        id: number;
        billability_status: Billability_Status;
        confirmation_status: Confirmation_Status;
        role: Role;
        project_start_date: string;
        project_end_date: string;
        project_hours: number;
        employee_email: string;
        employee_name: string;
        technical_manager_name: string;
        business_manager_name: string;
      },
    ];
  };
}

interface removeStaffArgs {
  data: {
    id: number;
    employee_name: string;
    employee_email: string;
  };
}

interface addMoreStaffArgs {
  data: {
    project_id: number;
    staff_id: number;
  };
}

interface filterProjectArgs {
  data: {
    project_id: number | string;
    billability_status: Billability_Status;
    confirmation_status: Confirmation_Status;
    staffing_status: Project_Staffing_Status;
    project_status: Project_Status;
    project_confirmation_status: Project_Confirmation_Status;
    name: string;
    archive: boolean;
    role: Role;
    active: boolean;
    skip: number;
    take: number;
  };
}

interface filterProjectDetails {
  data: {
    project_id: number | string;
    billability_status: Billability_Status;
    confirmation_status: boolean;
    staffing_status: Project_Staffing_Status;
    project_status: Project_Status;
    project_confirmation_status: Project_Confirmation_Status;
    name: string;
    archive: boolean;
    role: Role;
    active: boolean;
    skip: number;
    take: number;
    client_id: number;
  };
}

export {
  ProjectArgs,
  removeStaffArgs,
  addMoreStaffArgs,
  bulkStaffConfirmationArgs,
  filterProjectArgs,
  filterProjectDetails,
  staffConfirmationArgs,
};
