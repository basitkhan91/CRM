using System.Collections.Generic;

namespace QuickApp.Pro.ViewModels
{
    public class AuditResult<T> where T : class
    {
        public string AreaName { get; set; }
        public string Memo { get; set; }
        public List<T> Result { get; set; }
    }
}
