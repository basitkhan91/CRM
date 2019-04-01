export class GLAccountNodeSetup {
    GLAccountNodeId: number;
    LedgerName: string;
    NodeCode: string;
    NodeName: string;
    ParentNodeId: number;
    LeafNodeCheck: boolean;
    GLAccountTypeId: number;
    FSType: boolean;
    Description: string;
    createdBy: string;
    updatedBy: string;
    createdDate: Date;
    updatedDate: Date;
    IsActive: boolean;
    IsDelete: boolean;
    LedgerNameMgmStructureId: number;
    assetsStatusList: GLAccountNodeSetup[];

}