public class ItemMasterSaleViewModel
    {
        public long ItemMasterPurchaseSaleId { get; set; }
        public long ItemMasterId { get; set; }
        public string Condition { get; set; }
        public long UomId { get; set; }
        public int CurrencyId { get; set; }
        public decimal FxRate { get; set; }
        public decimal? BaseSalePrice { get; set; }
        public decimal? DiscountPercentage { get; set; }
        public decimal? DiscountAmount { get; set; }
        public decimal? UnitSalePrice { get; set; }
    }