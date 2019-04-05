using System;
using System.Collections.Generic;
using System.Text;


namespace DAL.Models
{
    public class AssetCapes
    {
        public long AssetCapesId { get; set; }
        public long AssetRecordId { get; set; }
        public long CapabilityId { get; set; }
        public int MasterCompanyId { get; set; }
        public string CreatedBy { get; set; }
        public string UpdatedBy { get; set; }
        public System.DateTime CreatedDate { get; set; }
        public System.DateTime UpdatedDate { get; set; }
        public Nullable<bool> IsActive { get; set; }
        public Nullable<bool> IsDelete { get; set; }

        public virtual Asset Asset { get; set; }
    }
}