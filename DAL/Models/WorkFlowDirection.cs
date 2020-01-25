using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace DAL.Models
{
   public class WorkFlowDirection
    {
        public long WorkflowDirectionId { get; set; }
        public long WorkflowId { get; set; }

        [Required(ErrorMessage ="Action is required.")]
        [MaxLength(20,ErrorMessage = "Action should be maximum 20 characters long.")]
        public string Action { get; set; }
        [MaxLength(40, ErrorMessage = "Description should be maximum 40 characters long.")]
        public string Description { get; set; }

        [MaxLength(5, ErrorMessage = "Sequence should be maximum 5 characters long.")]
        public string Sequence { get; set; }
        public string Memo { get; set; }

        [ForeignKey("TaskId")]
        public Nullable<long> TaskId { get; set; }
        public int? MasterCompanyId { get; set; }
        public string CreatedBy { get; set; }
        public string UpdatedBy { get; set; }
        public Nullable<System.DateTime> CreatedDate { get; set; }
        public Nullable<System.DateTime> UpdaedDate { get; set; }
        public Nullable<bool> IsActive { get; set; }
        public Nullable<bool> IsDelete { get; set; }
        public int? Order { get; set; }
    }
}
