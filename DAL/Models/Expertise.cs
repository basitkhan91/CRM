using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace DAL.Models
{
    public class Expertise : BaseClass
    {
        public string ExpertiseType { get; set; }
        public string EstimatedHours { get; set; }
        public string LabourDirectRate { get; set; }
        public string LabourDirectCost { get; set; }
        public string OHeadBurden { get; set; }
        public string OHCost { get; set; }
        public string LabourAndOHCost { get; set; }
      

        //public virtual Action ActionObject { get; set; }

        public long ActionId { get; set; }
        [ForeignKey("WorkFlowId")]
        public virtual Workflow WorkFlow { get; set; }
        public long WorkFlowId { get; set; }
    }
}