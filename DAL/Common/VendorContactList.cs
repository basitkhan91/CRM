using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Common
{
    public class VendorContactList
    {
        public long? ContactId { get; set; }
        public string WorkPhone { get; set; }
        public string VendorCode { get; set; }
        public string ContractReference { get; set; }
        public string VendorReference { get; set; }
        public decimal? CreditLimt { get; set; }
        public short? CreditTermId { get; set; }
        public string CSR { get; set; }

        public string Email { get; set; }
    }
}
