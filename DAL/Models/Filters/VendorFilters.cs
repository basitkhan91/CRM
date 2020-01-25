using System;

namespace DAL.Models
{
    public class VendorFilters
    {
        public long vendorId { get; set; }
        public string vendorName { get; set; }
        public string vendorCode { get; set; }
        public string description { get; set; }
        public string classificationName { get; set; }
        public string vendorCapabilityName { get; set; }
        public string vendorEmail { get; set; }
        public string city { get; set; }
        public string stateOrProvince { get; set; }        
        public string vendorPhoneContact { get; set; }
        public string status { get; set; }
        public DateTime createdDate { get; set; }
        public bool? isActive { get; set; }
        public int totalRecords { get; set; }

}
}
