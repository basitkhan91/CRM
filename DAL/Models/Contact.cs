using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Models
{
 public  class Contact
    {
        public long? ContactId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string MiddleName { get; set; }
        public string ContactTitle { get; set; }
        public string WorkPhone { get; set; }
        public string MobilePhone { get; set; }
        public string Prefix { get; set; }
        public string Suffix { get; set; }
        public string AlternatePhone { get; set; }
        //public bool IsDefaultContact { get; set; }
        public string Fax { get; set; }
        public string Email { get; set; }
        public string WebsiteURL { get; set; }
        public string Notes { get; set; }
        public int MasterCompanyId { get; set; }
        public string CreatedBy { get; set; }
        public string UpdatedBy { get; set; }
        public System.DateTime CreatedDate { get; set; }
        public System.DateTime UpdatedDate { get; set; }
        public Nullable<bool> IsActive { get; set; }

        public virtual MasterCompany MasterCompany { get; set; }
    }
}
