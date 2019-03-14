export interface IMeasurement {
    Id:string,
    PN: string;
    Sequence: string;
    Stage: string;
    Min: string;
    Max: string;
    Expected: string;
    Diagram: string;
    Memo: string;
    actionId:string;
    workflowId:string;
    AllowEdit:boolean;
    IsDeleted:boolean;
}