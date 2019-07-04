using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;
namespace DAL.Models
{
    public class Measurement : BaseClass
    {
        public string PN { get; set; }

        public string Sequence { get; set; }
        public string Stage { get; set; }
        public string Min { get; set; }
        public string Max { get; set; }
        public string Expected { get; set; }
        public string Diagram { get; set; }
        public string Memo { get; set; }
       
        //public virtual Action ActionObject { get; set; }

        public long ActionId { get; set; }
        [ForeignKey("WorkFlowId")]
        public virtual Workflow WorkFlow { get; set; }
        public long WorkFlowId { get; set; }
    }
}