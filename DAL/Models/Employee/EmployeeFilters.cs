using System;

namespace DAL.Models
{
    public class EmployeeFilters
    {
        public int EmployeeId { get; set; }

        public string EmployeeCode { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Jobtitle { get; set; }
        public string EmployeeExpertise { get; set; }
        public DateTime StartDate { get; set; }
        public string Company { get; set; }
        public string Paytype { get; set; }
        public string Status { get; set; }
      
    }
}
