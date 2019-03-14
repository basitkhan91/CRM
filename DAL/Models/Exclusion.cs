using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace DAL.Models
{
    public class Exclusion : BaseClass
    {
        public string EPN { get; set; }
        public string EPNDescription { get; set; }
        public string UnitCost { get; set; }
        public string Quantity { get; set; }
        public string Extended { get; set; }
        public string EstimatedPercentOccurance { get; set; }
        public string Memo { get; set; }
       
        //public virtual Action ActionObject { get; set; }

        public long ActionId { get; set; }
        [ForeignKey("WorkFlowId")]
        public virtual Workflow WorkFlow { get; set; }
        public long WorkFlowId { get; set; }
    }
}