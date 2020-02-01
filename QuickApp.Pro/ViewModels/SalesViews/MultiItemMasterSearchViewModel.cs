using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QuickApp.Pro.ViewModels
{
    public class MultiItemMasterSearchViewModel : IPaginateViewModel, ISortedViewModel
    {
        public int first { get; set; }
        public int page { get; set; }
        public int pageCount { get; set; }
        public int rows { get; set; }
        public int limit { get; set; }
        public int sortOrder { get; set; }
        public string sortField { get; set; }

        public PartSearchParamters[] multiPartSearchParamters { get; set; }
    }
}
