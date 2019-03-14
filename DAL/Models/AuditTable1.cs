using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Models
{
   public class AuditTable1
    {

        public long ID { get; set; }
        public long KeyFieldID { get; set; }
        public System.DateTime DateTimeStamp { get; set; }
        public string DataModel { get; set; }
        public string ValueBefore { get; set; }
        public string ValueAfter { get; set; }
        public string Changes { get; set; }
        public int AuditActionTypeENUM { get; set; }
    }
}
