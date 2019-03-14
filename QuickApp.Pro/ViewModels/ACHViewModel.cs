using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QuickApp.Pro.ViewModels
{
    public class ACHviewModel
    {
        public long ACHId { get; set; }
        public string ABA { get; set; }
        public string AccountNumber { get; set; }
        public string BankName { get; set; }
        public string BeneficiaryBankName { get; set; }
        public string IntermediateBankName { get; set; }
        public string SwiftCode { get; set; }
        public Nullable<long> BankAddressId { get; set; }
        public int MasterCompanyId { get; set; }
        public string CreatedBy { get; set; }
        public string UpdatedBy { get; set; }
        public System.DateTime CreatedDate { get; set; }
        public System.DateTime UpdatedDate { get; set; }
        public Nullable<bool> IsActive { get; set; }
    }
}
