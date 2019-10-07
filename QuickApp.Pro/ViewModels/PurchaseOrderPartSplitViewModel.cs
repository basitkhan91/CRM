using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QuickApp.Pro.ViewModels
{
    public class PurchaseOrderPartSplit
    {

        public long PurchaseOrderPartRecordId { get; set; }
        public long PurchaseOrderId { get; set; }
        public long ItemMasterId { get; set; }
        public string SerialNumber { get; set; }

        public Nullable<long> UOMId { get; set; }
        public Nullable<short> QuantityOrdered { get; set; }
        public Nullable<long> ManagementStructureId { get; set; }

        public Nullable<short> POPartSplitUserTypeId { get; set; }
        public long? POPartSplitUserId { get; set; }
        public string POPartSplitAddress1 { get; set; }
        public string POPartSplitAddress2 { get; set; }
        public string POPartSplitAddress3 { get; set; }
        public string POPartSplitCity { get; set; }
        public string POPartSplitState { get; set; }
        public string POPartSplitPostalCode { get; set; }
        public string POPartSplitCountry { get; set; }
        
        public Nullable<System.DateTime> NeedByDate { get; set; }
        public Nullable<long> POPartSplitAddressId { get; set; }

    }
}
