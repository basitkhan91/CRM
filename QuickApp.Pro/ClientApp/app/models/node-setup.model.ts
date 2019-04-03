export class GLAccountNodeSetup {
    glAccountNodeId: number;
    ledgerName: string;
    nodeCode: string;
    nodeName: string;
    parentNodeId: number;
    leafNodeCheck: boolean;
    glAccountTypeId: number;
    fsType: boolean;
    description: string;
    createdBy: string;
    updatedBy: string;
    createdDate: Date;
    updatedDate: Date;
    isActive: boolean;
    isDelete: boolean;
    ledgerNameMgmStructureId: number;
    nodeSetupList: GLAccountNodeSetup[];
    comapnycodes: string;
    selectedCompanysData: any[] = [];
}