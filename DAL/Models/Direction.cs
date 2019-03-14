using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace DAL.Models
{
    public class Direction : BaseClass
    {

        public string Action { get; set; }
        public string Description { get; set; }
        public string Sequence { get; set; }
        public string Memo { get; set; }

        //public virtual Action ActionObject { get; set; }

        public long ActionId { get; set; }
        [ForeignKey("WorkFlowId")]
        public virtual Workflow WorkFlow { get; set; }
        public long WorkFlowId { get; set; }
    }
}
