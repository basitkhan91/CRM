using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Common
{
    public class VendorContactList
    {
        public long? ContactId { get; set; }
        public long? VendorContactId { get; set; }
        public string WorkPhone { get; set; }
        public string VendorCode { get; set; }
        public string ContractReference { get; set; }
        public string VendorReference { get; set; }
        public decimal? CreditLimt { get; set; }
        public short? CreditTermId { get; set; }
        public string CSRName { get; set; }
        public bool IsDefaultContact { get; set; }
         
        public string Email { get; set; }
        public string ContactName { get; set; }
    }
}
