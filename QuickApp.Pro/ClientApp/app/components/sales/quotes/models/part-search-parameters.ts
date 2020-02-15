
import { ItemSearchType } from './item-search-type';

export class PartSearchParamters {

    public partId: number;

    public partNumber: string;

    public partDescription: string;

    public partNumberObj:{};

    public conditionId: number;

    public quantityRequired: number;

    public quantityRequested: number;

    public quantityToQuote: number;

    public quantityAlreadyQuoted: number;

    public itemSearchType: ItemSearchType;

    public includeAlternatePartNumber: boolean;

    public includeEquivalentPartNumber: boolean;

    public includeMultiplePartNumber:boolean;

    public qtyAvailable:number;
    
    public qtyOnHand:number;

    constructor() {
        this.itemSearchType = ItemSearchType.ItemMaster;
    }


}