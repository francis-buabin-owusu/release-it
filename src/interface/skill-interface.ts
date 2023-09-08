export interface SkillsArgs {
  data: {
    id: number;
    name: string;
    validator_id: number;
    created_by: number;
    updated_by: number;
    specialization_ids: [number];
    archive: boolean;
    skip: number;
    take: number;
  };
}

export interface AddSkillargs {
  data: {
    id: number;
    name: string;
    validator_id: number;
    created_by: number;
    specialization_ids: number[];
  };
}
