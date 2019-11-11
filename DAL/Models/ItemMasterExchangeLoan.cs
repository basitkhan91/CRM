using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace DAL.Models
{
    public class ItemMasterExchangeLoan:PasBase
    {
        [Key]
        public long ItemMasterLoanExchId { get; set; }
        public long ItemMasterId { get; set; }
        public bool IsLoan { get; set; }
        public bool IsExchange { get; set; }
        public long? ExchangeCurrencyId { get; set; }
        public long? LoanCurrencyId { get; set; }
        public decimal? ExchangeListPrice { get; set; }
        public decimal? ExchangeCorePrice { get; set; }
        public decimal? ExchangeOverhaulPrice { get; set; }
        public decimal? ExchangeOutrightPrice { get; set; }
        public decimal? ExchangeCoreCost { get; set; }
        public decimal? LoanCorePrice { get; set; }
        public decimal? LoanOutrightPrice { get; set; }
        public decimal? LoanFees { get; set; }
        public int MasterCompanyId { get; set; }
        public bool? IsActive { get; set; }
        public bool? IsDeleted { get; set; }


    }
}


