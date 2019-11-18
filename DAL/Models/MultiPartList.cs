using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Models
{
    public class MultiPartList
    {
        public string PartNumber { get; set; }
        public long? PartAlternatePartId { get; set; }
        public string PartDescription { get; set; }
        public long? ManufacturerId { get; set; }
        public string Manufacturer { get; set; }
        public int? ReorderQuantiy { get; set; }
        public int? ItemTypeId { get; set; }
        public long? ItemMasterId { get; set; }
        public bool? IsHazardousMaterial { get; set; }
        public long? PriorityId { get; set; }
        public int AircraftTypeId { get; set; }
        public string NSN { get; set; }
        public string Priority { get; set; }
        public string AircraftType { get; set; }
    }

    public class PartsNotFound
    {
        public string PartNumber { get; set; }
    }

    public class MultiPart
    {
        public List<MultiPartList> MultiParts { get; set; }
        public List<PartsNotFound> PartsNotFound { get; set; }
    }

}
