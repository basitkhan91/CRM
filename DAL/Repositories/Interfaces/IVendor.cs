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
        IEnumerable<object> GetvendorPurchaseOrderList(long id);
        IEnumerable<object> Getvendorrepairunit(long vendorId);

        IEnumerable<object> GetVendorWithid(long vendorId);

        IEnumerable<object> GetPayments();
        IEnumerable<object> GetVendorListByName(string vendorname);
        IEnumerable<object> GetmanagementSiteList(long id);

        IEnumerable<object> vendorCapabilityTypeGet(long id);
        IEnumerable<object> vendorAircraftManufacturerGet(long id);
        IEnumerable<object> vendorAircraftManufacturerModelGet(long id);
        IEnumerable<object>  getVendorCapabilityData(long id);
        IEnumerable<object> getVendorByID(long vendorid, bool isDContact);

        //  void CreateAction(DAL.Models.Action action);

    }
}
