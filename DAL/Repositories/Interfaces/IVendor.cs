using DAL.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Repositories.Interfaces
{


    public interface IVendor : IRepository<Vendor>
    {
        IEnumerable<Vendor> GetVendors();

        IEnumerable<object> GetVendorListDetails();
        IEnumerable<object> Getvendorunit(long id);
        IEnumerable<object> Getvendorrepairunit(long vendorId);

        IEnumerable<object> GetVendorWithid(long vendorId);

        IEnumerable<object> GetPayments();
        IEnumerable<object> GetVendorListByName(string vendorname);
        IEnumerable<object> GetmanagementSiteList(long id);

        //  void CreateAction(DAL.Models.Action action);

    }
}
