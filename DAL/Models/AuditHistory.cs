using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Models
{
   public class AuditHistory
    {
        public long AuditHistoryId { get; set; }

        public long TableRecordId { get; set; }

        public string TableName { get; set; }

        public string ColumnName { get; set; }

        public string PreviousValue { get; set; }

        public string NewValue { get; set; }

        public DateTime UpdatedDate { get; set; }

        public string UpdatedBy { get; set; }

        public int MasterCompanyId { get; set; }
    }
}
