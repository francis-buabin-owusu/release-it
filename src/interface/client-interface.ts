export interface ClientsArgs {
  data: {
    id: number;
    client_name: string;
    description: string;
    parent_id: number;
    currency: string;
    time_zone: string;
    client_phone: string;
    client_email: string;
    website: string;
    logo: string;
    isOrganization: boolean;
    archive: boolean;
    created_by: number;
    update_by: number;
    country: string;
    state_region: string;
    city: string;
    street_address: string;
    zip_code: string;
    bank_name: string;
    account_name: string;
    account_number: string;
    branch: string;
    swift_key: string;
    name: string;
    phone: string;
    email: string;
    contact_person: [];
    skip: number;
    take: number;
    //multiple clients
    client_ids: number[];
  };
}
