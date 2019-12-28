using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Models
{
    public class NhaAltEquFilters
    {
        public long ItemMasterId { get; set; }
        public long? MappingItemMasterId { get; set; }
        public string Description { get; set; }
        public long? ManufacturerId { get; set; }
        public int MappingType { get; set; }
    }
}
