export class ModuleHierarchyMaster {
    id: number;
    name: string;
    parentId: number;
    isPage: boolean;
    displayOrder: number;
    level: number;
    hasChildren: boolean;
    visible: boolean;
    //children: ModuleHierarchyMaster[];
    rolePermission: RolePermission;
}

export class UserRole {
    id: number;
    name: string;
    memo: string;
    rolePermissions: RolePermission[];
}

export class RolePermission {
    id: number;
    userRoleId: number;
    moduleHierarchyMasterId: number;
    canAdd: boolean;
    canView: boolean;
    canUpdate: boolean;
    canDelete: boolean;
    reports: boolean;
    canUpload: boolean;
    canDownload: boolean;
}