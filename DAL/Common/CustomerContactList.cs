namespace DAL.Common
{
    public class CustomerContactList
    {
        public long? ContactId { get; set; }
        public long? CustomerContactId { get; set; }
        public string WorkPhone { get; set; }
        public string CustomerCode { get; set; }
        public string ContractReference { get; set; }
        public string CustomerReference { get; set; }
        public decimal? CreditLimt { get; set; }
        public short? CreditTermId { get; set; }
        public string CSR { get; set; }
        public bool? IsDefaultContact { get; set; }

        public string Email { get; set; }
        public string ContactName { get; set; }
    }
}
