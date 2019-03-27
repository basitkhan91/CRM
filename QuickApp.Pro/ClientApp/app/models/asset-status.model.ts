export class AssetStatus {
	id: number;
    identification: string;
    name: string;
    memo: string;
    createdBy: string;
    updatedBy: string;
    createdDate: Date;
    updatedDate: Date;
    isDeleted: boolean;
    assetsStatusList: AssetStatus[];

}