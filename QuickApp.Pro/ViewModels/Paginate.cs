using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DAL.Models;
namespace QuickApp.Pro.ViewModels
{
    public class PaginateViewModel
    {
        public int first { get; set;}
        public int page { get; set;}
        public int pageCount { get; set;}
        public int rows { get; set;}
        public int limit { get; set; }
    }

    public interface IPaginateViewModel
    {
        int first { get; set; }
        int page { get; set; }
        int pageCount { get; set; }
        int rows { get; set; }
        int limit { get; set; }
    }

    public class CustomerSearchViewModel : CustomerModel, IPaginateViewModel
    {
        public int first { get; set; }
        public int page { get; set; }
        public int pageCount { get; set; }
        public int rows { get; set; }
        public int limit { get; set; }
        public bool condition { get; set; }
        public string GlobalSearchString { get; set; }
    }

    public class CustomerModel
    {
        public string CustomerCode { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string PrimarySalesPersonFirstName { get; set; }
    }
}