using System.Collections.Generic;  

namespace QuickApp.Pro.ViewModels.SalesViews
{
    public class MultiPartSearchParameters
    { 
        public List<string> Parts { get;set;}
        public bool RestrictDER { get; set;}
        public bool RestrictPMA { get; set;}

        public long? CustomerId { get;set;}
    }
}