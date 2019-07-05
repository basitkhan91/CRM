using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace DAL.Models
{
    public class ExpertiseType : BaseEntity
    {
        public Int16 ExpertiseTypeId { get; set; }
        public string Description { get; set; }
        public string Memo { get; set; }
        public int MasterCompanyId { get; set; }
    }
}
