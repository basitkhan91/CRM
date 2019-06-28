using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace QuickApp.Pro.ViewModels
{
    public class PaginateViewModel
    {
        public int first { get; set;}
        public int page { get; set;}
        public int pageCount { get; set;}
        public int rows { get; set;}
    }
}