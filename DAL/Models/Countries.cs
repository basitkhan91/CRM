using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace DAL.Models
{
    public class Countries
    {
        [Key]
        public Int16 countries_id { get; set; }
        public string countries_name { get; set; }
        public string nice_name { get; set; }
        public string countries_iso_code { get; set; }

        public string countries_iso3 { get; set; }
        public string countries_numcode { get; set; }
        public string countries_isd_code { get; set; }

        public string CreatedBy { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime UpdatedDate { get; set; }
        public bool? IsActive { get; set; }





    }
}
