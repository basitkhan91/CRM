using DAL.Common;
using DAL.Models;
using DAL.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Dynamic.Core;
using System.Reflection;
using Microsoft.EntityFrameworkCore.Query.Expressions;

namespace DAL.Repositories
{
    public class CommonRepository : Repository<RestrictedParts>, ICommonRepository
    {
        public CommonRepository(ApplicationDbContext context) : base(context)
        {
        }
        public IEnumerable<VendorContactList> GetVendorContactsList(long vendorId)
        {
            try
            {
                List<VendorContactList> vendorContacts = new List<VendorContactList>();
                VendorContactList objContact;
                var contacts = _appContext.Vendor
                     .Join(_appContext.VendorContact,
                           v => v.VendorId,
                           vc => vc.VendorId,
                           (v, vc) => new { v, vc })
                     .Join(_appContext.Contact,
                           vc1 => vc1.vc.ContactId,
                           con => con.ContactId,
                           (vc1, con) => new { vc1, con })
                     .Where(z => z.vc1.v.VendorId == vendorId)
                     .Select(z => new
                     {
                         ContactId = z.con.ContactId,
                         VendorContactId = z.vc1.vc.VendorContactId,
                         WorkPhone = z.con.WorkPhone,
                         CustomerCode = z.vc1.v.VendorCode,
                         ContractReference = z.vc1.v.VendorContractReference,
                         Reference = string.Empty,
                         CreditLimt = z.vc1.v.CreditLimit,
                         CreditTermId = z.vc1.v.CreditTermsId,
                         CSR = z.con.FirstName + " " + z.con.LastName,
                         Email = z.vc1.v.VendorEmail,
                         IsDefaultContact = z.vc1.vc.IsDefaultContact,
                         ContactName = z.con.FirstName + " " + z.con.LastName
                     }).ToList();

                if (contacts != null && contacts.Count > 0)
                {
                    foreach (var item in contacts)
                    {
                        objContact = new VendorContactList();
                        objContact.ContactId = item.ContactId;
                        objContact.VendorContactId = item.VendorContactId;
                        objContact.ContractReference = item.ContractReference;
                        objContact.CreditLimt = item.CreditLimt;
                        objContact.CreditTermId = item.CreditTermId;
                        objContact.CSRName = item.CSR;
                        objContact.VendorCode = item.CustomerCode;
                        objContact.VendorReference = item.Reference;
                        objContact.WorkPhone = item.WorkPhone;
                        objContact.Email = item.Email;
                        objContact.IsDefaultContact = item.IsDefaultContact;
                        vendorContacts.Add(objContact);
                    }
                }
                //     .Select(z => new
                //     {
                //         ContactId = z.con.ContactId,
                //         WorkPhone = z.con.WorkPhone,
                //     }).ToList();

                //if (contacts != null && contacts.Count > 0)
                //{
                //    foreach (var item in contacts)
                //    {
                //        objContact = new ContactList();
                //        objContact.Contact = item.WorkPhone;
                //        objContact.ContactId = item.ContactId;
                //        vendorContacts.Add(objContact);
                //    }
                //}
                return vendorContacts;
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }

        public IEnumerable<CustomerContactList> GetCustomerContactsList(long customerId)
        {
            try
            {
                List<CustomerContactList> customerContacts = new List<CustomerContactList>();
                CustomerContactList objContact;
                var contacts = _appContext.Customer
                     .Join(_appContext.CustomerContact,
                           cust => cust.CustomerId,
                           cc => cc.CustomerId,
                           (cust, cc) => new { cust, cc })
                     .Join(_appContext.Contact,
                           cc1 => cc1.cc.ContactId,
                           con => con.ContactId,
                           (cc1, con) => new { cc1, con })
                     .Where(z => z.cc1.cust.CustomerId == customerId)
                     .Select(z => new
                     {
                         ContactId = z.con.ContactId,
                         CustomerContactId = z.cc1.cc.CustomerContactId,
                         WorkPhone = z.con.WorkPhone,
                         CustomerCode = z.cc1.cust.CustomerCode,
                         ContractReference = z.cc1.cust.ContractReference,
                         Reference = string.Empty,
                         CreditLimt = z.cc1.cust.CreditLimit,
                         CreditTermId = z.cc1.cust.CreditTermsId,
                         CSR = z.cc1.cust.CSRName,
                         IsDefaultContact = z.cc1.cc.IsDefaultContact,
                         Email = z.cc1.cust.Email,
                         ContactName = z.con.FirstName + " " + z.con.LastName
                     }).ToList();

                if (contacts != null && contacts.Count > 0)
                {
                    foreach (var item in contacts)
                    {
                        objContact = new CustomerContactList();
                        objContact.ContactId = item.ContactId;
                        objContact.CustomerContactId = item.CustomerContactId;
                        objContact.ContractReference = item.ContractReference;
                        objContact.CreditLimt = item.CreditLimt;
                        objContact.CreditTermId = item.CreditTermId;
                        objContact.CSR = item.CSR;
                        objContact.CustomerCode = item.CustomerCode;
                        objContact.CustomerReference = item.Reference;
                        objContact.WorkPhone = item.WorkPhone;
                        objContact.Email = item.Email;
                        objContact.IsDefaultContact = item.IsDefaultContact;
                        objContact.ContactName = item.ContactName;
                        customerContacts.Add(objContact);
                    }
                }
                return customerContacts;
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }

        public long CreateMasterParts(MasterParts masterPart)
        {
            try
            {
                _appContext.MasterParts.Add(masterPart);
                _appContext.SaveChanges();
                return masterPart.MasterPartId;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public void UpdateMasterParts(MasterParts masterPart)
        {
            try
            {
                masterPart.UpdatedDate = DateTime.Now;
                _appContext.MasterParts.Update(masterPart);
                _appContext.SaveChanges();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public void DeleteMasterParts(long masterPartId, string updatedBy)
        {
            try
            {
                MasterParts masterPart = new MasterParts();

                masterPart.MasterPartId = masterPartId;
                masterPart.IsDeleted = true;
                masterPart.UpdatedBy = updatedBy;
                masterPart.UpdatedDate = DateTime.Now;

                _appContext.MasterParts.Attach(masterPart);
                _appContext.Entry(masterPart).Property(x => x.IsDeleted).IsModified = true;
                _appContext.Entry(masterPart).Property(x => x.UpdatedDate).IsModified = true;
                _appContext.Entry(masterPart).Property(x => x.UpdatedBy).IsModified = true;
                _appContext.SaveChanges();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public void MasterPartsStatus(long masterPartId, bool status, string updatedBy)
        {
            try
            {
                MasterParts masterPart = new MasterParts();
                masterPart.MasterPartId = masterPartId;
                masterPart.IsActive = status;
                masterPart.UpdatedBy = updatedBy;
                masterPart.UpdatedDate = DateTime.Now;

                _appContext.MasterParts.Attach(masterPart);
                _appContext.Entry(masterPart).Property(x => x.IsActive).IsModified = true;
                _appContext.Entry(masterPart).Property(x => x.UpdatedDate).IsModified = true;
                _appContext.Entry(masterPart).Property(x => x.UpdatedBy).IsModified = true;
                _appContext.SaveChanges();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<MasterParts> GetMasterParts()
        {
            try
            {
                return _appContext.MasterParts.Where(p => p.IsDeleted == false).ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public void CreateRestrictedParts(List<RestrictedParts> restrictedParts, long referenceId, int moduleId)
        {
            try
            {
                if (restrictedParts != null && restrictedParts.Count > 0)
                {

                    restrictedParts.ForEach(p =>
                    {
                        p.ReferenceId = referenceId;
                        //  p.PartNumber = GetRestrictedPartName(p.MasterPartId, moduleId);
                        p.ModuleId = moduleId;
                        p.IsDeleted = false;
                        p.IsActive = true;
                        p.CreatedDate = p.UpdatedDate = DateTime.Now;
                    });

                    _appContext.RestrictedParts.AddRange(restrictedParts);
                    _appContext.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public void CreateCustomerTaxTypeRateMapping(List<CustomerTaxTypeRateMapping> customerTaxTypeRateMappings, long referenceId)
        {
            try
            {
                if (customerTaxTypeRateMappings != null && customerTaxTypeRateMappings.Count > 0)
                {

                    customerTaxTypeRateMappings
                        .ForEach(p =>
                        {
                            p.CustomerId = referenceId;
                            p.IsDeleted = false;
                            p.CreatedDate = DateTime.Now;
                            p.MasterCompanyId = 1;
                            p.CreatedBy = p.CreatedBy ?? "admin";
                            p.UpdatedBy = p.UpdatedBy ?? "admin";
                            p.UpdatedDate = System.DateTime.Now;
                        });
                    _appContext.CustomerTaxTypeRateMapping.AddRange(customerTaxTypeRateMappings);
                    _appContext.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public void UpdateRestrictedParts(List<RestrictedParts> restrictedParts, long referenceId, int moduleId, string partType = "")
        {
            try
            {

                if (restrictedParts != null && restrictedParts.Count > 0)
                {
                    var existingrestrictedParts = _appContext.RestrictedParts.Where(p => p.ReferenceId == referenceId && p.ModuleId == moduleId && p.PartType == restrictedParts[0].PartType).ToList();

                    if (existingrestrictedParts.Count > 0)
                    {
                        for (var i = 0; i < existingrestrictedParts.Count; i++)
                        {
                            _appContext.RestrictedParts.Remove(existingrestrictedParts[i]);
                            _appContext.SaveChanges();
                        }

                    }

                    foreach (var item in restrictedParts)
                    {
                        // item.PartNumber = GetRestrictedPartName(item.MasterPartId, moduleId);
                        //if (item.RestrictedPartId > 0)
                        //{

                        //    _appContext.RestrictedParts.Update(item);
                        //}
                        //else
                        //{
                        item.RestrictedPartId = 0;
                        item.ReferenceId = referenceId;
                        item.ModuleId = moduleId;
                        item.IsActive = true;
                        item.IsDeleted = false;
                        item.CreatedDate = item.UpdatedDate = DateTime.Now;

                        _appContext.RestrictedParts.Add(item);
                        //}
                        _appContext.SaveChanges();
                    }
                }
                else
                {
                    if (partType != "")
                    {

                        var existingrestrictedParts = _appContext.RestrictedParts.Where(p => p.ReferenceId == referenceId && p.ModuleId == moduleId && p.PartType == partType).ToList();

                        if (existingrestrictedParts.Count > 0)
                        {
                            for (var i = 0; i < existingrestrictedParts.Count; i++)
                            {
                                _appContext.RestrictedParts.Remove(existingrestrictedParts[i]);
                                _appContext.SaveChanges();
                            }

                        }
                    }




                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<RestrictedParts> GetRestrictedParts(long moduleId, long? referenceId, string partType)
        {
            try
            {
                return _appContext.RestrictedParts.Where(p => p.IsDeleted == false && p.ModuleId == moduleId && p.ReferenceId == referenceId && p.PartType == partType && p.PartNumber != null)
                                                   .OrderBy(p => p.RestrictedPartId)
                                                   .ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public IEnumerable<object> GetRestrictedPartsWithDescription(long moduleId, long? referenceId, string partType)
        {
            try
            {


                var data = (from t in _appContext.ItemMaster

                            join atd in _appContext.Manufacturer on t.ManufacturerId equals atd.ManufacturerId

                            join rp in _appContext.RestrictedParts on t.ItemMasterId equals rp.ItemMasterId

                            where rp.IsDeleted == false && rp.ModuleId == moduleId && rp.ReferenceId == referenceId && rp.PartType == partType && rp.PartNumber != null
                            // select new { t, ad, vt }).ToList();
                            select new
                            {
                                rp.RestrictedPartId,
                                rp.ModuleId,
                                rp.ReferenceId,
                                MasterPartId = rp.ItemMasterId,
                                rp.Memo,
                                rp.PartNumber,
                                rp.PartType,
                                rp.CreatedDate,
                                rp.CreatedBy,
                                rp.UpdatedDate,
                                rp.UpdatedBy,
                                rp.IsActive,
                                rp.IsDeleted,
                                t.PartDescription,
                                ManufacturerName = atd.Name
                            }).ToList();

                return data;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }




        #region RestrictsPMAList

        public void CreateRestrictPmaList(List<RestrictsPMAList> restrictedPmaLists, long customerId)
        {
            try
            {
                if (restrictedPmaLists != null && restrictedPmaLists.Count > 0)
                {
                    restrictedPmaLists.ForEach(p => p.CustomerId = customerId);
                    _appContext.RestrictsPMAList.AddRange(restrictedPmaLists);
                    _appContext.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public void UpdateRestrictPmaList(List<RestrictsPMAList> restrictedPmaLists, long customerId)
        {
            try
            {
                if (restrictedPmaLists != null && restrictedPmaLists.Count > 0)
                {
                    foreach (var item in restrictedPmaLists)
                    {
                        if (item.RestrictedPMAId > 0)
                        {
                            _appContext.RestrictsPMAList.Update(item);
                        }
                        else
                        {
                            item.CustomerId = customerId;
                            _appContext.RestrictsPMAList.Add(item);
                        }
                        _appContext.SaveChanges();
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<RestrictsPMAList> GetRestrictPmaList(int itemMasterId, long? customerId)
        {
            try
            {
                return _appContext.RestrictsPMAList.Where(p => p.IsDeleted == false && p.ItemMasterId == itemMasterId && p.CustomerId == customerId)
                                                   .OrderBy(p => p.RestrictedPMAId)
                                                   .ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        #endregion

        #region RestrictsBERList

        public void CreateRestrictDerList(List<RestrictsBERList> restrictedBerLists, long customerId)
        {
            try
            {
                if (restrictedBerLists != null && restrictedBerLists.Count > 0)
                {
                    restrictedBerLists.ForEach(p => p.CustomerId = customerId);
                    _appContext.RestrictsBERList.AddRange(restrictedBerLists);
                    _appContext.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public void UpdateRestrictDerList(List<RestrictsBERList> restrictedBerLists, long customerId)
        {
            try
            {
                if (restrictedBerLists != null && restrictedBerLists.Count > 0)
                {
                    foreach (var item in restrictedBerLists)
                    {
                        if (item.RestrictedBERId > 0)
                        {
                            _appContext.RestrictsBERList.Update(item);
                        }
                        else
                        {
                            item.CustomerId = customerId;
                            _appContext.RestrictsBERList.Add(item);
                        }
                        _appContext.SaveChanges();
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<RestrictsBERList> GetRestrictDerList(int itemMasterId, long? customerId)
        {
            try
            {
                return _appContext.RestrictsBERList.Where(p => p.IsDeleted == false && p.ItemMasterId == itemMasterId && p.CustomerId == customerId)
                                                   .OrderBy(p => p.RestrictedBERId)
                                                   .ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        #endregion

        public void CreateClassificationMappings(List<ClassificationMapping> classificationMappings, int moduleId, long referenceId, string createdBy)
        {
            try
            {
                if (classificationMappings != null && classificationMappings.Count > 0)
                {
                    // classificationMappings.ForEach(p => { p.ModuleId = moduleId; p.ReferenceId = referenceId; p.IsActive = true; p.IsDeleted = false; p.CreatedDate = DateTime.Now; p.UpdatedDate = DateTime.Now; p.CreatedBy = createdBy; p.UpdatedBy = createdBy; });
                    foreach (var item in classificationMappings)
                    {
                        item.ModuleId = moduleId;
                        item.ReferenceId = referenceId;
                        item.IsActive = true;
                        item.IsDeleted = false;
                        item.CreatedDate = item.UpdatedDate = DateTime.Now;
                        item.CreatedBy = item.UpdatedBy = createdBy;
                    }
                    _appContext.ClassificationMapping.AddRange(classificationMappings);
                    _appContext.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public void UpdateClassificationMappings(List<ClassificationMapping> classificationMappings, int moduleId, long referenceId, string createdBy)
        {
            try
            {
                var existingList = _appContext.ClassificationMapping.Where(p => p.ModuleId == moduleId && p.ReferenceId == referenceId).ToList();

                if (existingList != null && existingList.Count > 0)
                {
                    _appContext.ClassificationMapping.RemoveRange(existingList);
                    _appContext.SaveChanges();
                }

                if (classificationMappings != null && classificationMappings.Count > 0)
                {
                    classificationMappings.ForEach(p => { p.ModuleId = moduleId; p.ReferenceId = referenceId; p.IsActive = true; p.IsDeleted = false; p.CreatedDate = DateTime.Now; p.UpdatedDate = DateTime.Now; p.CreatedBy = createdBy; p.UpdatedBy = createdBy; });
                    _appContext.ClassificationMapping.AddRange(classificationMappings);
                    _appContext.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public IEnumerable<object> GetCustomerClassificationMappings(int moduleId, long referenceId)
        {
            try
            {
                var ClassificationMappingList = (from cm in _appContext.ClassificationMapping
                                                 join cc in _appContext.CustomerClassification on cm.ClasificationId equals cc.CustomerClassificationId
                                                 where cm.IsDeleted == false && cm.ModuleId == moduleId && cm.ReferenceId == referenceId
                                                 select new
                                                 {
                                                     cm.ClassificationMappingId,
                                                     cm.ClasificationId,
                                                     cc.Description,
                                                     cc.CustomerClassificationId
                                                 })
                            .Distinct()
                            .ToList();



                return ClassificationMappingList;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public IEnumerable<object> GetVendorClassificationMappings(int moduleId, long referenceId)
        {
            try
            {

                var ClassificationMappingList = (from cm in _appContext.ClassificationMapping
                                                 join vc in _appContext.VendorClassification on cm.ClasificationId equals vc.VendorClassificationId
                                                 where cm.IsDeleted == false && cm.ModuleId == moduleId && cm.ReferenceId == referenceId
                                                 select new
                                                 {
                                                     cm.ClassificationMappingId,
                                                     cm.ClasificationId,
                                                     vc.ClassificationName,
                                                     vc.VendorClassificationId
                                                 })
                           .Distinct()
                           .ToList();


                return ClassificationMappingList;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public dynamic UpdateEntity(dynamic uiModel, dynamic dbModel, ref IDictionary<string, object> keyValuePairs)
        {

            uiModel.MasterCompanyId = dbModel.MasterCompanyId;
            uiModel.CreatedDate = dbModel.CreatedDate;
            uiModel.CreatedBy = dbModel.CreatedBy;
            uiModel.UpdatedBy = dbModel.UpdatedBy;
            uiModel.UpdatedDate = dbModel.UpdatedDate;

            PropertyInfo[] uiProperties = GetProperties(uiModel);
            PropertyInfo[] dbProperties = GetProperties(dbModel);

            foreach (var uip in uiProperties)
            {
                dynamic uiValue = uip.GetValue(uiModel, null);
                foreach (var dbp in dbProperties)
                {
                    if (!uip.PropertyType.FullName.StartsWith("DAL.Models"))
                    {
                        if (uip.Name == dbp.Name)
                        {
                            dynamic dbValue = dbp.GetValue(dbModel, null);
                            if (uiValue != dbValue)
                            {
                                dbp.SetValue(dbModel, uiValue);
                                keyValuePairs.Add(uip.Name, uiValue);
                            }
                            break;
                        }
                    }
                    else
                    {
                        break;
                    }

                }
            }

            return dbModel;
        }


        public IEnumerable<object> BindDropdowns(string tableName, string primaryColumn, string textColumn, long count)
        {
            try
            {
                var result = _appContext.Dropdowns.FromSql("BindDropdowns @p0,@p1,@p2,@p3", tableName, primaryColumn, textColumn, count).ToList();
                return result;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public long CreateShippingVia(ShippingVia shippingVia)
        {
            try
            {
                if (shippingVia.UserType==1)
                {
                    CustomerShipping shipping = new CustomerShipping();
                    shipping.CreatedBy =  shippingVia.CreatedBy;
                    shipping.CustomerId = shippingVia.ReferenceId;
                    shipping.CustomerShippingAddressId = shippingVia.AddressId;
                    shipping.CustomerShippingId = shippingVia.ShippingViaId;
                    shipping.IsActive =true;
                    shipping.IsDeleted = false;
                    shipping.IsPrimary=false;
                    shipping.MasterCompanyId = shippingVia.MasterCompanyId;
                    shipping.Memo = shippingVia.Memo;
                    shipping.ShippingAccountinfo = shippingVia.ShippingAccountInfo;
                    shipping.ShippingId = shippingVia.ShippingId;
                    shipping.ShippingURL = shippingVia.ShippingURL;
                    shipping.ShipVia = shippingVia.Name;
                    shipping.UpdatedBy = shippingVia.UpdatedBy;
                    shipping.UpdatedDate = DateTime.Now;

                    if(shipping.CustomerShippingId>0)
                    {
                        _appContext.CustomerShipping.Update(shipping);
                    }
                    else
                    {
                        shipping.CreatedDate = DateTime.Now;
                        _appContext.CustomerShipping.Add(shipping);
                    }
                    
                    _appContext.SaveChanges();
                    return shipping.CustomerShippingId;
                }
                if (shippingVia.UserType == 2)
                {
                    VendorShipping shipping = new VendorShipping();
                    shipping.CreatedBy = shippingVia.CreatedBy;
                    shipping.VendorId = shippingVia.ReferenceId;
                    shipping.VendorShippingAddressId = shippingVia.AddressId;
                    shipping.VendorShippingId = shippingVia.ShippingViaId;
                    shipping.IsActive = true;
                    shipping.IsDeleted = false;
                    shipping.MasterCompanyId = shippingVia.MasterCompanyId;
                    shipping.Memo = shippingVia.Memo;
                    shipping.ShippingAccountinfo = shippingVia.ShippingAccountInfo;
                    shipping.ShippingId = shippingVia.ShippingId;
                    shipping.ShippingURL = shippingVia.ShippingURL;
                    shipping.ShipVia = shippingVia.Name;
                    shipping.UpdatedBy = shippingVia.UpdatedBy;
                    shipping.UpdatedDate = DateTime.Now;

                    if (shipping.VendorShippingId > 0)
                    {
                        _appContext.VendorShipping.Update(shipping);
                    }
                    else
                    {
                        shipping.CreatedDate = DateTime.Now;
                        _appContext.VendorShipping.Add(shipping);
                    }

                    _appContext.SaveChanges();
                    return shipping.VendorShippingId;
                }
                else
                {
                    LegalEntityShipping shipping = new LegalEntityShipping();
                    shipping.CreatedBy = shippingVia.CreatedBy;
                    shipping.LegalEntityShippingId = shippingVia.ReferenceId;
                    shipping.LegalEntityShippingAddressId = shippingVia.AddressId;
                    shipping.LegalEntityShippingId = shippingVia.ShippingViaId;
                    shipping.IsActive = true;
                    shipping.IsDeleted = false;
                    shipping.MasterCompanyId = shippingVia.MasterCompanyId;
                    shipping.Memo = shippingVia.Memo;
                    shipping.ShippingAccountinfo = shippingVia.ShippingAccountInfo;
                    shipping.ShippingId = shippingVia.ShippingId;
                    shipping.ShippingURL = shippingVia.ShippingURL;
                    shipping.ShipVia = shippingVia.Name;
                    shipping.UpdatedBy = shippingVia.UpdatedBy;
                    shipping.UpdatedDate = DateTime.Now;
                    if (shipping.LegalEntityShippingId > 0)
                    {
                        _appContext.LegalEntityShipping.Update(shipping);
                    }
                    else
                    {
                        shipping.CreatedDate = DateTime.Now;
                        _appContext.LegalEntityShipping.Add(shipping);
                    }
                    _appContext.SaveChanges();
                    return shipping.LegalEntityShippingId;
                }

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public void UpdateShippingVia(ShippingVia shippingVia)
        {
            try
            {
                shippingVia.UpdatedDate = DateTime.Now;
                _appContext.ShippingVia.Update(shippingVia);
                _appContext.SaveChanges();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public object GetShippingViaDetails(long shippingViaId, int userType)
        {
            try
            {
                if (userType == 1) // Customer
                {
                    var data = (from sv in _appContext.CustomerShipping
                                where sv.CustomerShippingId == shippingViaId
                                select new
                                {
                                    ShippingId = sv.CustomerShippingId,
                                    sv.ShipVia,
                                    ShippingAccountInfo = sv.ShippingAccountinfo,
                                    sv.ShippingURL,
                                    sv.Memo
                                }).FirstOrDefault();
                    return data;
                }
                else if (userType == 2) // Vendor
                {
                    var data = (from sv in _appContext.VendorShipping
                                where sv.VendorShippingId == shippingViaId
                                select new
                                {
                                    ShippingId = sv.VendorShippingId,
                                    sv.ShipVia,
                                    ShippingAccountInfo = sv.ShippingAccountinfo,
                                    sv.ShippingURL,
                                    sv.Memo
                                }).FirstOrDefault();
                    return data;
                }
                else // Company
                {
                    var data = (from sv in _appContext.LegalEntityShipping
                                where sv.LegalEntityShippingId == shippingViaId
                                select new
                                {
                                    ShippingId = sv.LegalEntityShippingId,
                                    sv.ShipVia,
                                    ShippingAccountInfo = sv.ShippingAccountinfo,
                                    sv.ShippingURL,
                                    sv.Memo
                                }).FirstOrDefault();
                    return data;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public IEnumerable<object> BindShipViaDetails(int userType, long referenceId)
        {
            try
            {
                if (userType == 1) // Customer
                {
                    var list = (from sv in _appContext.CustomerShipping
                                where (sv.IsDeleted == null || sv.IsDeleted == false) &&sv.IsActive==true && sv.CustomerId == referenceId
                                select new
                                {
                                    ShippingViaId = sv.CustomerShippingId,
                                    Name = sv.ShipVia,
                                    ShippingAccountInfo = sv.ShippingAccountinfo,
                                    sv.ShippingURL,
                                    sv.ShippingId,
                                    sv.Memo
                                }).OrderBy(p => p.Name).ToList();
                    return list;
                }
                else if(userType==2) // Vendor
                {
                    var list = (from sv in _appContext.VendorShipping
                                where sv.IsDeleted == false && sv.IsActive == true && sv.VendorId == referenceId
                                select new
                                {
                                    ShippingViaId = sv.VendorShippingId,
                                    Name = sv.ShipVia,
                                    ShippingAccountInfo = sv.ShippingAccountinfo,
                                    sv.ShippingURL,
                                    sv.ShippingId,
                                    sv.Memo
                                }).OrderBy(p => p.Name).ToList();
                    return list;
                }
                else // Company
                {
                    var list = (from sv in _appContext.LegalEntityShipping
                                where (sv.IsDeleted == null || sv.IsDeleted == false) && sv.IsActive == true  && sv.LegalEntityId == referenceId
                                select new
                                {
                                    ShippingViaId = sv.LegalEntityShippingId,
                                    Name = sv.ShipVia,
                                    ShippingAccountInfo = sv.ShippingAccountinfo,
                                    sv.ShippingURL,
                                    sv.ShippingId,
                                    sv.Memo
                                }).OrderBy(p => p.Name).ToList();
                    return list;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        private static PropertyInfo[] GetProperties(object obj)
        {
            return obj.GetType().GetProperties();
        }

        public long? CreateAddress(Address address)
        {
            try
            {
                address.CreatedDate = address.UpdatedDate = DateTime.Now;
                address.IsActive = true;
                _appContext.Address.Add(address);
                _appContext.SaveChanges();
                return address.AddressId;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public void UpdateAddress(Address address)
        {
            try
            {
                address.UpdatedDate = DateTime.Now;
                _appContext.Address.Update(address);
                _appContext.SaveChanges();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public object GetAddressDetails(long addressId)
        {
            try
            {
                var data = (from ad in _appContext.Address
                            where ad.AddressId == addressId
                            select new
                            {
                                ad.City,
                                ad.Country,
                                ad.Line1,
                                ad.Line2,
                                ad.Line3,
                                ad.PoBox,
                                ad.PostalCode,
                                ad.StateOrProvince
                            }).FirstOrDefault();
                return data;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public string GetRestrictedPartName(long masterPartId, long masterCompanyId)
        {
            try
            {
                var data = (from im in _appContext.ItemMaster
                            join mp in _appContext.MasterParts on im.MasterPartId equals mp.MasterPartId
                            where (im.MasterCompanyId == masterCompanyId)
                            select new
                            {
                                mp.PartNumber,
                                mp.MasterPartId
                            }).Where(m => m.MasterPartId == masterPartId).Select(p => p.PartNumber).SingleOrDefault();
                if (!String.IsNullOrWhiteSpace(data))
                    return data;
                else return null;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public Dictionary<string, long> GetManagementStructure(long manmgStrucId)
        {
            Dictionary<string, long> keyValuePairs = new Dictionary<string, long>();
            ManagementStructure level4 = null;
            ManagementStructure level3 = null;
            ManagementStructure level2 = null;
            ManagementStructure level1 = null;
            try
            {
                level4 = _appContext.ManagementStructure.Where(p => p.IsDelete != true && p.ManagementStructureId == manmgStrucId).FirstOrDefault();
                if (level4 != null && level4.ParentId > 0)
                {
                    level3 = _appContext.ManagementStructure.Where(p => p.IsDelete != true && p.ManagementStructureId == level4.ParentId).FirstOrDefault();
                }
                if (level3 != null && level3.ParentId > 0)
                {
                    level2 = _appContext.ManagementStructure.Where(p => p.IsDelete != true && p.ManagementStructureId == level3.ParentId).FirstOrDefault();
                }
                if (level2 != null && level2.ParentId > 0)
                {
                    level1 = _appContext.ManagementStructure.Where(p => p.IsDelete != true && p.ManagementStructureId == level2.ParentId).FirstOrDefault();
                }


                if (level4 != null && level3 != null && level2 != null && level1 != null)
                {
                    keyValuePairs.Add("Level4", level4.ManagementStructureId);
                    keyValuePairs.Add("Level3", level3.ManagementStructureId);
                    keyValuePairs.Add("Level2", level2.ManagementStructureId);
                    keyValuePairs.Add("Level1", level1.ManagementStructureId);
                }
                else if (level4 != null && level2 != null && level3 != null)
                {
                    keyValuePairs.Add("Level3", level4.ManagementStructureId);
                    keyValuePairs.Add("Level2", level3.ManagementStructureId);
                    keyValuePairs.Add("Level1", level2.ManagementStructureId);
                }
                else if (level4 != null && level3 != null)
                {
                    keyValuePairs.Add("Level2", level4.ManagementStructureId);
                    keyValuePairs.Add("Level1", level3.ManagementStructureId);
                }
                else if (level4 != null)
                {
                    keyValuePairs.Add("Level1", level4.ManagementStructureId);
                }
                return keyValuePairs;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public Dictionary<string, string> GetManagementStructureCodes(long manmgStrucId)
        {
            Dictionary<string, string> keyValuePairs = new Dictionary<string, string>();
            ManagementStructure level4 = null;
            ManagementStructure level3 = null;
            ManagementStructure level2 = null;
            ManagementStructure level1 = null;
            try
            {
                level4 = _appContext.ManagementStructure.Where(p => p.IsDelete != null && p.IsDelete != true && p.ManagementStructureId == manmgStrucId).FirstOrDefault();
                if (level4 != null && level4.ParentId > 0)
                {
                    level3 = _appContext.ManagementStructure.Where(p => p.IsDelete != null && p.IsDelete != true && p.ManagementStructureId == level4.ParentId).FirstOrDefault();
                }
                if (level3 != null && level3.ParentId > 0)
                {
                    level2 = _appContext.ManagementStructure.Where(p => p.IsDelete != null && p.IsDelete != true && p.ManagementStructureId == level3.ParentId).FirstOrDefault();
                }
                if (level2 != null && level2.ParentId > 0)
                {
                    level1 = _appContext.ManagementStructure.Where(p => p.IsDelete != null && p.IsDelete != true && p.ManagementStructureId == level2.ParentId).FirstOrDefault();
                }


                if (level4 != null && level3 != null && level2 != null && level1 != null)
                {
                    keyValuePairs.Add("Level4", level4.Code);
                    keyValuePairs.Add("Level3", level3.Code);
                    keyValuePairs.Add("Level2", level2.Code);
                    keyValuePairs.Add("Level1", level1.Code);
                }
                else if (level4 != null && level2 != null && level3 != null)
                {
                    keyValuePairs.Add("Level3", level4.Code);
                    keyValuePairs.Add("Level2", level3.Code);
                    keyValuePairs.Add("Level1", level2.Code);
                }
                else if (level4 != null && level3 != null)
                {
                    keyValuePairs.Add("Level2", level4.Code);
                    keyValuePairs.Add("Level1", level3.Code);
                }
                else if (level4 != null)
                {
                    keyValuePairs.Add("Level1", level4.Code);
                }
                return keyValuePairs;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public object GetDefaultCurrency(long legalEntityId)
        {
            try
            {

                var defaultCurrency = (from le in _appContext.LegalEntity
                                       join c in _appContext.Currency on le.FunctionalCurrencyId equals c.CurrencyId
                                       where le.LegalEntityId == legalEntityId && c.IsActive == true && (c.IsDeleted == false || c.IsDeleted == null)
                                       select new
                                       {
                                           currencyId = le.FunctionalCurrencyId,
                                           currencyName = c.DisplayName
                                       }).FirstOrDefault();


                if (defaultCurrency == null)
                {
                    defaultCurrency = (from le in _appContext.LegalEntity
                                       join c in _appContext.Currency on le.FunctionalCurrencyId equals c.CurrencyId
                                       where c.IsActive == true && (c.IsDeleted == false || c.IsDeleted == null)
                                       select new
                                       {
                                           currencyId = le.FunctionalCurrencyId,
                                           currencyName = c.DisplayName
                                       }).FirstOrDefault();
                }

                return defaultCurrency;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public void CreateIntegrationMappings(List<IntegrationPortalMapping> integrationMappings, int moduleId, long referenceId, string createdBy)
        {
            try
            {
                if (integrationMappings != null && integrationMappings.Count > 0)
                {
                    foreach (var item in integrationMappings)
                    {
                        item.ModuleId = moduleId;
                        item.ReferenceId = referenceId;
                        item.IsActive = true;
                        item.IsDeleted = false;
                        item.CreatedDate = item.UpdatedDate = DateTime.Now;
                        item.CreatedBy = item.UpdatedBy = createdBy;
                    }
                    _appContext.IntegrationPortalMapping.AddRange(integrationMappings);
                    _appContext.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public IEnumerable<object> GetIntegrationMappings(long referenceId, int moduleId)
        {
            var integrationnMappingList = (from im in _appContext.IntegrationPortalMapping
                                           join vc in _appContext.IntegrationPortal on im.IntegrationPortalId equals Convert.ToInt64(vc.IntegrationPortalId)
                                           where im.IsDeleted == false && im.ModuleId == moduleId && im.ReferenceId == referenceId
                                           select new
                                           {
                                               im.IntegrationPortalMappingId,
                                               im.IntegrationPortalId,
                                               vc.Description
                                           })
                         .Distinct()
                         .ToList();


            return integrationnMappingList;
        }

        public IEnumerable<object> ManagementStructureLevelOneData()
        {
            var list = (from ms in _appContext.ManagementStructure
                        where ms.IsDelete == false && ms.IsActive == true && ms.ParentId == null
                        select new
                        {
                            label = ms.Code,
                            value = ms.ManagementStructureId
                        }).Distinct().ToList().OrderBy(p => p.label);
            return list;
        }

        public IEnumerable<object> ManagementStructureLevelTwoData(long parentId)
        {
            var list = (from ms in _appContext.ManagementStructure
                        where ms.IsDelete == false && ms.IsActive == true
                        && ms.ParentId == parentId
                        select new
                        {
                            label = ms.Code,
                            value = ms.ManagementStructureId
                        }).Distinct().ToList().OrderBy(p => p.label);
            return list;
        }

        public IEnumerable<object> ManagementStructureLevelThreeData(long parentId)
        {
            var list = (from ms in _appContext.ManagementStructure
                        where ms.IsDelete == false && ms.IsActive == true
                        && ms.ParentId == parentId
                        select new
                        {
                            label = ms.Code,
                            value = ms.ManagementStructureId
                        }).Distinct().ToList().OrderBy(p => p.label);
            return list;
        }


        public IEnumerable<object> ManagementStructureLevelFourData(long parentId)
        {
            var list = (from ms in _appContext.ManagementStructure
                        where ms.IsDelete == false && ms.IsActive == true
                        && ms.ParentId == parentId
                        select new
                        {
                            label = ms.Code,
                            value = ms.ManagementStructureId
                        }).Distinct().ToList().OrderBy(p => p.label);
            return list;
        }

        public void CreateHistory(dynamic obj, int moduleId, long referenceId, long addressId, int addressType, bool isFromGenInfo, bool status = false)
        {
            ShippingBillingAddressAudit objShipping = new ShippingBillingAddressAudit();
            objShipping.ModuleId = moduleId;
            objShipping.ReferenceId = referenceId;
            objShipping.AddressId = addressId;
            objShipping.AddressType = addressType;
            if (isFromGenInfo)
            {
                objShipping.SiteName = obj.CustomerCode;
                objShipping.IsPrimary = true;


            }
            else
            {
                objShipping.SiteName = obj.SiteName;
                objShipping.IsPrimary = obj.IsPrimary;

            }
            if (status)
            {
                objShipping.Line1 = obj.Line1;
                objShipping.Line2 = obj.Line2;

            }
            else
            {

                objShipping.Line1 = obj.Address1;
                objShipping.Line2 = obj.Address2;

            }
            objShipping.City = obj.City;
            objShipping.StateOrProvince = obj.StateOrProvince;
            objShipping.Country = obj.Country;

            objShipping.PostalCode = obj.PostalCode;
            objShipping.MasterCompanyId = obj.MasterCompanyId;
            objShipping.CreatedDate = DateTime.Now;
            objShipping.UpdatedDate = DateTime.Now;
            objShipping.CreatedBy = obj.CreatedBy;
            objShipping.UpdatedBy = obj.UpdatedBy;
            objShipping.IsActive = obj.IsActive;

            _appContext.ShippingBillingAddressAudit.Add(objShipping);
            _appContext.SaveChanges();


        }
        public IEnumerable<object> GetShippingBillingAddressAudit(long referenceId, long addressId, long addressType, int moduleId)
        {

            var list = (from vba in _appContext.ShippingBillingAddressAudit
                        join c in _appContext.Countries on Convert.ToInt16(vba.Country) equals c.countries_id into conttt
                        from c in conttt.DefaultIfEmpty()
                        where vba.ReferenceId == referenceId && vba.AddressId == addressId && vba.AddressType == addressType && vba.ModuleId == moduleId


                        select new
                        {
                            vba.SiteName,
                            vba.SBAId,
                            Address1 = vba.Line1,
                            Address2 = vba.Line2,
                            vba.City,
                            vba.StateOrProvince,
                            vba.PostalCode,
                            Country = c.countries_name,
                            vba.CreatedDate,
                            vba.UpdatedBy,
                            vba.UpdatedDate,
                            vba.CreatedBy,
                            vba.IsPrimary,
                            vba.IsActive
                        }).OrderByDescending(p => p.UpdatedDate).ToList();
            return list;
        }
        public void CreateContactHistory(dynamic obj, int moduleId, long referenceId, long contactId)
        {
            ContactAudit objShipping = new ContactAudit();
            objShipping.ModuleId = moduleId;
            objShipping.ReferenceId = referenceId;
            objShipping.ContactId = contactId;
            objShipping.IsDefaultContact = obj.IsDefaultContact;
            objShipping.FirstName = obj.FirstName;
            objShipping.LastName = obj.LastName;
            objShipping.MiddleName = obj.MiddleName;
            objShipping.ContactTitle = obj.ContactTitle;
            objShipping.WorkPhone = obj.WorkPhone;
            objShipping.MobilePhone = obj.MobilePhone;
            objShipping.Prefix = obj.Prefix;
            objShipping.Suffix = obj.Suffix;
            objShipping.AlternatePhone = obj.AlternatePhone;
            objShipping.WorkPhoneExtn = obj.WorkPhoneExtn;
            objShipping.Fax = obj.Fax;
            objShipping.Email = obj.Email;
            objShipping.WebsiteURL = obj.WebsiteURL;
            objShipping.MasterCompanyId = obj.MasterCompanyId;
            objShipping.CreatedDate = DateTime.Now;
            objShipping.UpdatedDate = DateTime.Now;
            objShipping.CreatedBy = obj.CreatedBy;
            objShipping.UpdatedBy = obj.UpdatedBy;
            objShipping.IsActive = obj.IsActive;
            objShipping.Notes = obj.Notes;
            objShipping.Tag = obj.Tag;
            _appContext.ContactAudit.Add(objShipping);
            _appContext.SaveChanges();


        }
        public IEnumerable<object> GetContactAudit(long referenceId, int moduleId, long contactId)
        {

            var list = (from vba in _appContext.ContactAudit
                        where vba.ReferenceId == referenceId && vba.ModuleId == moduleId && vba.ContactId == contactId


                        select new
                        {
                            ContactId = vba.ContactId,
                            Notes = vba.Notes,
                            LastName = vba.LastName,
                            FirstName = vba.FirstName,
                            Tag = vba.Tag,
                            MiddleName = vba.MiddleName,
                            ContactTitle = vba.ContactTitle,
                            WorkPhone = vba.WorkPhone,
                            MobilePhone = vba.MobilePhone,
                            Prefix = vba.Prefix,
                            Suffix = vba.Suffix,
                            AlternatePhone = vba.AlternatePhone,
                            WorkPhoneExtn = vba.WorkPhoneExtn,
                            Fax = vba.Fax,
                            Email = vba.Email,
                            WebsiteURL = vba.WebsiteURL,
                            MasterCompanyId = vba.MasterCompanyId,
                            CreatedDate = vba.CreatedDate,
                            UpdatedDate = vba.UpdatedDate,
                            CreatedBy = vba.CreatedBy,
                            UpdatedBy = vba.UpdatedBy,
                            IsActive = vba.IsActive,
                            FullContact = vba.WorkPhone + " - " + vba.WorkPhoneExtn,

                            IsDefaultContact = vba.IsDefaultContact
                        }).OrderByDescending(p => p.UpdatedDate).ToList();
            return list;
        }
        public void ShippingBillingAddressHistory(long referenceId, int moduleId, long billingShippingId, int addressType, string updatedBy)
        {
            ShippingBillingAddressAudit audit = new ShippingBillingAddressAudit();
            long? addressId = 0;

            if (moduleId == Convert.ToInt32(ModuleEnum.Customer))
            {
                if (addressType == Convert.ToInt32(AddressTypeEnum.ShippingAddress))
                {

                    var shippingAddress = _appContext.CustomerShippingAddress.Where(p => p.CustomerShippingAddressId == billingShippingId).AsNoTracking().FirstOrDefault();
                    audit.AddressId = Convert.ToInt64(shippingAddress.CustomerShippingAddressId);
                    audit.AddressType = Convert.ToInt32(AddressTypeEnum.ShippingAddress);
                    audit.IsPrimary = Convert.ToBoolean(shippingAddress.IsPrimary);
                    audit.IsActive = Convert.ToBoolean(shippingAddress.IsActive);
                    audit.MasterCompanyId = Convert.ToInt32(shippingAddress.MasterCompanyId);
                    audit.ModuleId = moduleId;
                    audit.ReferenceId = referenceId;
                    audit.SiteName = shippingAddress.SiteName;
                    audit.CreatedBy = audit.UpdatedBy = updatedBy;
                    audit.CreatedDate = audit.UpdatedDate = DateTime.Now;
                    addressId = shippingAddress.AddressId;

                }
                else
                {
                    var billingAddress = _appContext.CustomerBillingAddress.AsNoTracking().Where(p => p.CustomerBillingAddressId == billingShippingId).FirstOrDefault();
                    audit.AddressId = Convert.ToInt64(billingAddress.CustomerBillingAddressId);
                    audit.AddressType = Convert.ToInt32(AddressTypeEnum.BillingAddress);
                    audit.IsPrimary = Convert.ToBoolean(billingAddress.IsPrimary);
                    audit.IsActive = Convert.ToBoolean(billingAddress.IsActive);
                    audit.MasterCompanyId = Convert.ToInt32(billingAddress.MasterCompanyId);
                    audit.ModuleId = moduleId;
                    audit.ReferenceId = referenceId;
                    audit.SiteName = billingAddress.SiteName;
                    audit.CreatedBy = audit.UpdatedBy = updatedBy;
                    audit.CreatedDate = audit.UpdatedDate = DateTime.Now;
                    addressId = billingAddress.AddressId;
                }
            }
            else
            {
                if (addressType == Convert.ToInt32(AddressTypeEnum.ShippingAddress))
                {

                    var shippingAddress = _appContext.VendorShippingAddress.Where(p => p.VendorShippingAddressId == billingShippingId).AsNoTracking().FirstOrDefault();
                    audit.AddressId = Convert.ToInt64(shippingAddress.VendorShippingAddressId);
                    audit.AddressType = Convert.ToInt32(AddressTypeEnum.ShippingAddress);
                    audit.IsPrimary = Convert.ToBoolean(shippingAddress.IsPrimary);
                    audit.IsActive = Convert.ToBoolean(shippingAddress.IsActive);
                    audit.MasterCompanyId = Convert.ToInt32(shippingAddress.MasterCompanyId);
                    audit.ModuleId = moduleId;
                    audit.ReferenceId = referenceId;
                    audit.SiteName = shippingAddress.SiteName;
                    audit.CreatedBy = audit.UpdatedBy = updatedBy;
                    audit.CreatedDate = audit.UpdatedDate = DateTime.Now;
                    addressId = shippingAddress.AddressId;

                }
                else if ((addressType == Convert.ToInt32(AddressTypeEnum.BillingAddress)))
                {
                    var billingAddress = _appContext.VendorBillingAddress.AsNoTracking().Where(p => p.VendorBillingAddressId == billingShippingId).FirstOrDefault();
                    audit.AddressId = Convert.ToInt64(billingAddress.VendorBillingAddressId);
                    audit.AddressType = Convert.ToInt32(AddressTypeEnum.BillingAddress);
                    audit.IsPrimary = Convert.ToBoolean(billingAddress.IsPrimary);
                    audit.IsActive = Convert.ToBoolean(billingAddress.IsActive);
                    audit.MasterCompanyId = Convert.ToInt32(billingAddress.MasterCompanyId);
                    audit.ModuleId = moduleId;
                    audit.ReferenceId = referenceId;
                    audit.SiteName = billingAddress.SiteName;
                    audit.CreatedBy = audit.UpdatedBy = updatedBy;
                    audit.CreatedDate = audit.UpdatedDate = DateTime.Now;
                    addressId = billingAddress.AddressId;
                }
                else
                {
                    var billingAddress = _appContext.CheckPayment.AsNoTracking().Where(p => p.CheckPaymentId == billingShippingId).FirstOrDefault();

                    var checkpayment = _appContext.VendorCheckPayment.AsNoTracking().Where(p => p.CheckPaymentId == billingShippingId).FirstOrDefault();


                    audit.AddressId = Convert.ToInt64(billingAddress.CheckPaymentId);
                    audit.AddressType = Convert.ToInt32(AddressTypeEnum.CheckPayment);
                    audit.IsPrimary = Convert.ToBoolean(billingAddress.IsPrimayPayment);
                    if (checkpayment != null)
                    {
                        audit.IsActive = Convert.ToBoolean(checkpayment.IsActive);
                    }
                    else
                    {
                        audit.IsActive = Convert.ToBoolean(billingAddress.IsActive);
                    }
                    audit.MasterCompanyId = Convert.ToInt32(billingAddress.MasterCompanyId);
                    audit.ModuleId = moduleId;
                    audit.ReferenceId = referenceId;
                    audit.SiteName = billingAddress.SiteName;
                    audit.CreatedBy = audit.UpdatedBy = updatedBy;
                    audit.CreatedDate = audit.UpdatedDate = DateTime.Now;
                    addressId = billingAddress.AddressId;

                }
            }

            var addr = _appContext.Address.AsNoTracking().Where(p => p.AddressId == addressId).FirstOrDefault();

            audit.Line1 = addr.Line1;
            audit.Line2 = addr.Line2;
            audit.City = addr.City;
            audit.StateOrProvince = addr.StateOrProvince;
            audit.Country = addr.Country;
            audit.PostalCode = addr.PostalCode;

            _appContext.ShippingBillingAddressAudit.Add(audit);
            _appContext.SaveChanges();
        }
        public void ContactsHistory(long referenceId, int moduleId, long contactId, string updatedBy)
        {
            ContactAudit audit = new ContactAudit();
            long? contId = 0;

            if (moduleId == Convert.ToInt32(ModuleEnum.Customer))
            {

                var cont = _appContext.CustomerContact.AsNoTracking().Where(p => p.CustomerContactId == contactId).FirstOrDefault();
                audit.ContactId = Convert.ToInt64(cont.CustomerContactId);
                audit.IsDefaultContact = Convert.ToBoolean(cont.IsDefaultContact);
                audit.IsActive = Convert.ToBoolean(cont.IsActive);
                audit.MasterCompanyId = Convert.ToInt32(cont.MasterCompanyId);
                audit.ModuleId = moduleId;
                audit.ReferenceId = referenceId;

                audit.CreatedBy = audit.UpdatedBy = updatedBy;
                audit.CreatedDate = audit.UpdatedDate = DateTime.Now;
                contId = Convert.ToInt64(cont.ContactId);

            }
            else
            {
                var cont = _appContext.VendorContact.AsNoTracking().Where(p => p.VendorContactId == contactId).FirstOrDefault();
                var contVendor = _appContext.Contact.AsNoTracking().Where(p => p.ContactId == cont.ContactId).FirstOrDefault();

                audit.ContactId = Convert.ToInt64(cont.VendorContactId);
                audit.IsDefaultContact = Convert.ToBoolean(cont.IsDefaultContact);
                if (contVendor != null)
                {
                    audit.IsActive = Convert.ToBoolean(contVendor.IsActive);
                }
                else
                {
                    audit.IsActive = Convert.ToBoolean(cont.IsActive);
                }
                audit.MasterCompanyId = Convert.ToInt32(cont.MasterCompanyId);
                audit.ModuleId = moduleId;
                audit.ReferenceId = referenceId;

                audit.CreatedBy = audit.UpdatedBy = updatedBy;
                audit.CreatedDate = audit.UpdatedDate = DateTime.Now;
                contId = Convert.ToInt64(cont.ContactId);
            }

            var con = _appContext.Contact.AsNoTracking().Where(p => p.ContactId == contId).FirstOrDefault();

            audit.FirstName = con.FirstName;
            audit.LastName = con.LastName;
            audit.MiddleName = con.MiddleName;
            audit.ContactTitle = con.ContactTitle;
            audit.WorkPhone = con.WorkPhone;
            audit.MobilePhone = con.MobilePhone;
            audit.Prefix = con.Prefix;
            audit.Suffix = con.Suffix;
            audit.AlternatePhone = con.AlternatePhone;
            audit.WorkPhoneExtn = con.WorkPhoneExtn;
            audit.Fax = con.Fax;
            audit.Email = con.Email;
            audit.WebsiteURL = con.WebsiteURL;
            audit.Notes = con.Notes;
            audit.Tag = con.Tag;
            _appContext.ContactAudit.Add(audit);
            _appContext.SaveChanges();
        }


        public object GetPartPurchaseSaleDetails(long itemMasterId, string condition)
        {
            try
            {
                var data = (from ips in _appContext.ItemMasterPurchaseSale
                            where ips.IsDeleted == false && ips.IsActive == true
                            && ips.ItemMasterId == itemMasterId && ips.Condition == condition
                            select new
                            {
                                ips.PP_UnitPurchasePrice,
                                ips.SP_FSP_FlatPriceAmount,
                                ips.SP_CalSPByPP_MarkUpPercOnListPrice,
                                ips.SP_CalSPByPP_MarkUpAmount

                            }).FirstOrDefault();
                return data;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public IEnumerable<object> GetEmployeesByJobTitle(long jobTitleId)
        {
            try
            {
                var list = (from emp in _appContext.Employee
                            where (emp.IsDeleted == false || emp.IsDeleted == null) && emp.IsActive == true && emp.JobTitleId == jobTitleId
                            select new
                            {
                                emp.EmployeeId,
                                emp.EmployeeCode,
                                Name = emp.FirstName + " " + emp.LastName
                            }
                          ).Distinct().ToList();
                return list;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public IEnumerable<object> GetEmployeesByExpertise(long expertiseId)
        {
            try
            {
                var list = (from emp in _appContext.Employee
                            where (emp.IsDeleted == false || emp.IsDeleted == null) && emp.IsActive == true && emp.EmployeeExpertiseId == expertiseId
                            select new
                            {
                                emp.EmployeeId,
                                emp.EmployeeCode,
                                Name = emp.FirstName + " " + emp.LastName
                            }
                          ).Distinct().ToList();
                return list;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public IEnumerable<object> GetEmployeeStation(long employeeId)
        {
            try
            {
                var list = (from emp in _appContext.Employee
                            join st in _appContext.EmployeeStation on emp.StationId equals st.EmployeeStationId
                            where emp.EmployeeId == employeeId
                            select new
                            {
                                emp.EmployeeId,
                                emp.EmployeeCode,
                                Name = emp.FirstName + " " + emp.LastName,
                                emp.StationId,
                                st.StationName
                            }
                          ).Distinct().ToList();
                return list;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public IEnumerable<object> GetJobTitleTypes(long masterCompanyId)
        {
            try
            {
                var list = (from jt in _appContext.JobTitle
                            where jt.MasterCompanyId == masterCompanyId
                            select new
                            {
                                jt.JobTitleId,
                                JobTitle = jt.Description
                            }).Distinct().ToList();
                return list;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public IEnumerable<object> GetExpertiseTypes(long masterCompanyId)
        {
            try
            {
                var list = (from et in _appContext.EmployeeExpertise
                            where et.MasterCompanyId == masterCompanyId
                            select new
                            {
                                et.EmployeeExpertiseId,
                                ExpertiseType = et.Description
                            }).Distinct().ToList();
                return list;
            }
            catch (Exception)
            {

                throw;
            }
        }
        public bool GetDelete(long id, string updatedBy)
        {
            bool result = false;
            try
            {
                AttachmentDetails attachmentDetails = new AttachmentDetails();
                attachmentDetails.AttachmentDetailId = id;
                attachmentDetails.UpdatedDate = DateTime.Now;
                attachmentDetails.UpdatedBy = updatedBy;
                attachmentDetails.IsDeleted = true;

                _appContext.AttachmentDetails.Attach(attachmentDetails);
                _appContext.Entry(attachmentDetails).Property(x => x.IsDeleted).IsModified = true;
                _appContext.Entry(attachmentDetails).Property(x => x.UpdatedDate).IsModified = true;
                _appContext.Entry(attachmentDetails).Property(x => x.UpdatedBy).IsModified = true;
                _appContext.SaveChanges();
                result = true;
            }
            catch (Exception)
            {
                throw;
            }

            return result;

        }

        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;
    }
}
