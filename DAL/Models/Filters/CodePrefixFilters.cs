using System;

namespace DAL.Models
{
    public class CodePrefixFilters
    {
        public long CodePrefixId { get; set; }
        public string codeType { get; set; }
        public string prefix { get; set; }
        public string sufix { get; set; }
        public string startsFrom { get; set; }
        public DateTime createdDate { get; set; }
        public bool isActive { get; set; }
        public int totalRecords { get; set; }
        public long codeTypeId { get; set; }

    }
}
