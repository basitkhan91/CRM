export interface IExpertise
{
    Id : string;
    ExpertiseType : string;
    EstimatedHours : string;
    LabourDirectRate : string;
    LabourDirectCost : string;
    OHeadBurden : string;
    OHCost : string;
    LabourAndOHCost : string;
    actionId:string;
    workflowId:string;
    AllowEdit:boolean;
    IsDeleted:boolean;
}