import { ISalesOrderQuote } from './ISalesOrderQuote';
import { ISalesOrderQuoteApproverList } from './ISalesOrderQuoteApproverList';
import { ISalesQuoteView } from './ISalesQuoteView';
import { ISalesOrderQuotePart } from './ISalesOrderQuotePart';


export class SalesQuoteView implements ISalesQuoteView {
    salesOrderQuote: ISalesOrderQuote;
    approverList: ISalesOrderQuoteApproverList[];
    parts: ISalesOrderQuotePart
}