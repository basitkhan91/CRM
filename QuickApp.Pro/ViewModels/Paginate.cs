using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DAL.Models;
namespace QuickApp.Pro.ViewModels
{
    public class PaginateViewModel
    {
        public int first { get; set; }
        public int page { get; set; }
        public int pageCount { get; set; }
        public int rows { get; set; }
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

    #region Customer List
    public class CustomerSearchViewModel : CustomerModel, IPaginateViewModel
    {
        public int first { get; set; }
        public int page { get; set; }
        public int pageCount { get; set; }
        public int rows { get; set; }
        public int limit { get; set; }
    }

    public class CustomerModel
    {
        public string CustomerCode { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string PrimarySalesPersonFirstName { get; set; }
        public string City { get; set; }
        public string StateOrProvince { get; set; }
        public string CustomerType { get; set; }
        public DateTime CreatedDate { get; set; }
        public string CreatedBy { get; set; }
        public DateTime? UpdatedDate { get; set; }
        public string UpdatedBy { get; set; }
        public long CustomerId { get; internal set; }
        public bool? IsActive { get; internal set; }
    }
    #endregion

    #region Global Search
    public class GlobalSearchModel : IPaginateViewModel
    {
        public int first { get; set; }
        public int page { get; set; }
        public int pageCount { get; set; }
        public int rows { get; set; }
        public int limit { get; set; }
        //public 
        public string GlobalSearchString { get; set; }
    }
    #endregion
}