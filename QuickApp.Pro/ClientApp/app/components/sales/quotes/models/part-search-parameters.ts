
import { ItemSearchType } from './item-search-type';

export class PartSearchParamters {

    public partId: number;

    public partNumber: string;

    public partDescription: string;

    public conditionId: number;

    public quantityRequired: number;

    public quantityToQuote: number;

    public itemSearchType: ItemSearchType;

    public includeAlternatePartNumber: boolean;

    constructor() {
        this.itemSearchType = ItemSearchType.ItemMaster;
    }


}