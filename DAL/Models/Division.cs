using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace DAL.Models
{
  public  class Division
    {
        public int DivisionId { get; set; }
        public int BusinessUnitId { get; set; }

        public int CompanyId { get; set; }

        [ForeignKey("MasterCompanyId")]
        public Int32 MasterCompanyId { get; set; }

        public string DivisionCode { get; set; }
        public string DivisionName { get; set; }

        public int? ContactId { get; set; }
        public DateTime RecordCreateDate { get; set; }

        public DateTime RecordModifiedDate { get; set; }

        public int LastModifiedBy { get; set; }
        


    }
}
