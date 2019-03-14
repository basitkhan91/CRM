using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QuickApp.Pro.ViewModels
{
  

    public class AuditHistoryViewModel
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
