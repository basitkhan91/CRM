import { ISalesOrderQuote } from './ISalesOrderQuote';
import { ISalesOrderQuoteApproverList } from './ISalesOrderQuoteApproverList';
import { ISalesOrderQuotePart } from './ISalesOrderQuotePart';
import { IPriority } from './IPriority';
import { ISalesQuoteType } from './ISalesQuoteType';
import { ICustomerType } from './ICustomerType';
import { ICreditTerm } from './ICreditTerm';
import { ISalesProbablity } from './ISalesProbablity';
import { ILeadSource } from './ILeadSource';


export interface ISalesQuoteView {
    salesOrderQuote: ISalesOrderQuote;
    approverList: ISalesOrderQuoteApproverList[];
    parts: ISalesOrderQuotePart[];
    priorities: IPriority[];
    salesQuoteTypes: ISalesQuoteType[];
    customerTypes: ICustomerType[];
    creditTerms: ICreditTerm[];
    salesProbablity: ISalesProbablity[];
    leadSources: ILeadSource[];
}