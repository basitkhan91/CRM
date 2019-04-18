using System.Collections.Generic;

namespace QuickApp.Pro.ViewModels
{
    public class AuditResult<T> where T : class
    {
        public List<T> Result { get; set; }
    }
}
