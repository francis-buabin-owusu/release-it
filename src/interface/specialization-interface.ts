export interface SpecializationArgs {
  data: {
    id: number | string;
    name: string;
    created_by: number;
    updated_by: number;
    archive: boolean;
    skip: number;
    take: number;
  };
}
