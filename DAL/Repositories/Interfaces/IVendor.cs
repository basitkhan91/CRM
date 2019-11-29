﻿using DAL.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Repositories.Interfaces
{


    public interface IVendor : IRepository<Vendor>
    {
        IEnumerable<Vendor> GetVendors();
        IEnumerable<Vendor> GetVendorsLite();


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

        long CreateVendorBillingAddress(VendorBillingAddress billingAddress);
        void UpdateVendorBillingAddress(VendorBillingAddress billingAddress);
        void DeleteVendorBillingAddress(long billingAddressId, string updatedBy);
        void DeleteVendorShippingAddress(long shippingAddressId, string updatedBy);
        bool DeleteVendorShippingViaAddress(long vendorShippingId, string updatedBy);
        void VendorBillingAddressStatus(long billingAddressId, bool status, string updatedBy);
        IEnumerable<object> GetVendorBillingAddress();
        object VendorBillingAddressById(long billingAddressId);

        //  void CreateAction(DAL.Models.Action action);

        IEnumerable<object> GetVendorBillingSiteNames(long vendorId);
        IEnumerable<Vendor> getVendorsForDropdown();

        IEnumerable<object> GetVendorBillingAddressAudit(long vendorId, long vendorBillingaddressId);

        IEnumerable<object> GetVendorPOMemoList(long vendorId);
        IEnumerable<object> GetVendorROMemoList(long vendorId);
        void UpdateVendorMemoText(long id, string type, string memoText, string updatedBy);
        VendorDocumentDetails GetVendorDocumentDetailById(long id);
    }
}
