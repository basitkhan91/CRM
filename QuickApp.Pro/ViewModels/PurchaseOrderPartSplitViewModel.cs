using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QuickApp.Pro.ViewModels
{
    public class PurchaseOrderPartSplitBase
    {

        public long PurchaseOrderPartRecordId { get; set; }
        public long AssetId { get; set; }
        public long PartNumberId { get; set; }
        public long PurchaseOrderId { get; set; }
        public long ItemMasterId { get; set; }
        //public string SerialNumber { get; set; }
        public DateTime? NeedByDate { get; set; }
        public Nullable<long> UOMId { get; set; }
        public Nullable<short> QuantityOrdered { get; set; }
        public Nullable<long> ManagementStructureId { get; set; }

        public Nullable<short> POPartSplitUserTypeId { get; set; }
        public long? POPartSplitUserId { get; set; }
               
        
        public Nullable<long> POPartSplitAddressId { get; set; }

    }
    public class PurchaseOrderPartSplit: PurchaseOrderPartSplitBase
    {
        public string POPartSplitAddress1 { get; set; }
        public string POPartSplitAddress2 { get; set; }
        public string POPartSplitAddress3 { get; set; }
        public string POPartSplitCity { get; set; }
        public string POPartSplitState { get; set; }
        public string POPartSplitPostalCode { get; set; }
        public string POPartSplitCountry { get; set; }
    }
}
