import { IPriority } from "./IPriority";
import { ISalesQuoteType } from "./ISalesQuoteType";
import { ICustomerType } from "./ICustomerType";
import { ICreditTerm } from "./ICreditTerm";
import { ISalesProbablity } from "./ISalesProbablity";
import { ILeadSource } from "./ILeadSource";

export interface ISalesQuote {
  salesOrderQuoteId: number;
  quoteTypeId: number;

  openDate: Date;

  customerRequestDate: Date;

  customerPromisedDate: Date;

  estimatedShipDate: Date;

  validForDays: number;

  quoteExpiryDate: Date;

  priorityId: number;

  accountTypeId: number;

  customerId: number;

  customerName: string;

  customerCode: string;

  customerContactId: number;

  customerContactName: string;

  customerReferenceId: number;

  customerReferenceName: string;

  contractReferenceId: number;

  contractReferenceName: string;

  salesPersonId: number;

  salesPersonName: string;

  agentId: number;

  agentName: string;

  customerServiceRepId: number;

  customerServiceRepName: string;

  probabilityId: number;

  leadSourceId: number;

  creditLimit: number;

  creditLimitTermsId: number;

  employeeId: number;

  employeeName: string;

  restrictPMA: boolean;

  restrictDER: boolean;

  quoteApprovedById: number;

  quoteApprovedByName: string;

  approvedDate: Date;

  currencyId: number;

  warningId: number;

  warningName: string;

  memo: string;

  notes: string;

  priorities: IPriority[];

  salesQuoteTypes: ISalesQuoteType[];

  customerTypes: ICustomerType[];

  creditTerms: ICreditTerm[];

  salesProbablity: ISalesProbablity[];

  leadSources: ILeadSource[];
}
