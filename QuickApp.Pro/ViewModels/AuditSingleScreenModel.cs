using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QuickApp.Pro.ViewModels
{
    public class AuditSingleScreenModel
    {
        public long Id { get; set; }

        public long Version { get; set; }

        public string FieldName { get; set; }

        public string NewValue { get; set; }

        public string oldValue { get; set; }
    }
}
