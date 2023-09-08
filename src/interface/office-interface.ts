export interface OfficeArgs {
  data: {
    id: number;
    organization_id: number;
    office_name: string;
    city: string;
    website: string;
    phone_number: string;
    archive: boolean;
    created_by: number;
    update_by: number;
    skip: number;
    take: number;
  };
}
