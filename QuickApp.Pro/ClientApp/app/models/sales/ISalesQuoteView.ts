import { ISalesOrderQuote } from './ISalesOrderQuote';
import { ISalesOrderQuoteApproverList } from './ISalesOrderQuoteApproverList';
import { ISalesOrderQuotePart } from './ISalesOrderQuotePart';


export interface ISalesQuoteView {
    salesOrderQuote: ISalesOrderQuote;
    approverList: ISalesOrderQuoteApproverList;
    parts: ISalesOrderQuotePart
}