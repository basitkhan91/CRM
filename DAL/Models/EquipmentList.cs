using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace DAL.Models
{
    public class EquipmentList : BaseClass
    {
        public string AssetId { get; set; }
        public string AssetType { get; set; }
        public string AssetDescription { get; set; }
        public string Quantity { get; set; }

        //public virtual Action ActionObject { get; set; }

        public long ActionId { get; set; }
        [ForeignKey("WorkFlowId")]
        public virtual Workflow WorkFlow { get; set; }
        public long WorkFlowId { get; set; }
    }
}