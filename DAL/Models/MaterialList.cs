using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace DAL.Models
{
    public class MaterialList : BaseClass
    {
        public string PN { get; set; }
        public string Description { get; set; }
        public string Condition { get; set; }
        public string MandatoryOrSupplemental { get; set; }
        public string ItemClassification { get; set; }
        public string Quantity { get; set; }
        public string UOM { get; set; }
        public string UnitCost { get; set; }
        public string ExtraCost { get; set; }
        public string Price { get; set; }
        public string Memo { get; set; }
        public bool Deffered { get; set; }


        //public virtual Action ActionObject { get; set; }

        public long ActionId { get; set; }
        [ForeignKey("WorkFlowId")]
        public virtual Workflow WorkFlow { get; set; }
        public long WorkFlowId { get; set; }
    }
}