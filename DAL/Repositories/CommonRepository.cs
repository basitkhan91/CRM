﻿using DAL.Common;
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
                         IsDefaultContact = z.vc1.vc.IsDefaultContact
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
            catch (System.Exception)
            {
                throw;
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
                         Email = z.cc1.cust.Email
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
                        customerContacts.Add(objContact);
                    }
                }
                return customerContacts;
            }
            catch (System.Exception)
            {
                throw;
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
            catch (System.Exception)
            {

                throw;
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
            catch (System.Exception)
            {

                throw;
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
            catch (System.Exception)
            {

                throw;
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
            catch (System.Exception)
            {

                throw;
            }
        }

        public List<MasterParts> GetMasterParts()
        {
            try
            {
                return _appContext.MasterParts.Where(p => p.IsDeleted == false).ToList();
            }
            catch (System.Exception)
            {

                throw;
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
                        p.PartNumber = GetRestrictedPartName(p.MasterPartId, moduleId);
                        p.ModuleId = moduleId;
                        p.IsDeleted = false;
                        p.IsActive = true;
                        p.CreatedDate = p.UpdatedDate = DateTime.Now;
                    });

                    _appContext.RestrictedParts.AddRange(restrictedParts);
                    _appContext.SaveChanges();
                }
            }
            catch (Exception)
            {

                throw;
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
            catch (Exception)
            {

                throw;
            }
        }

        public void UpdateRestrictedParts(List<RestrictedParts> restrictedParts, long referenceId, int moduleId)
        {
            try
            {

                if (restrictedParts != null && restrictedParts.Count > 0)
                {
                    foreach (var item in restrictedParts)
                    {
                        item.PartNumber = GetRestrictedPartName(item.MasterPartId, moduleId);
                        if (item.RestrictedPartId > 0)
                        {

                            _appContext.RestrictedParts.Update(item);
                        }
                        else
                        {
                            item.ReferenceId = referenceId;
                            item.ModuleId = moduleId;
                            item.IsActive = true;
                            item.IsDeleted = false;
                            item.CreatedDate = item.UpdatedDate = DateTime.Now;
                            _appContext.RestrictedParts.Add(item);
                        }
                        _appContext.SaveChanges();
                    }
                }
            }
            catch (Exception)
            {

                throw;
            }
        }

        public List<RestrictedParts> GetRestrictedParts(int moduleId, long? referenceId, string partType)
        {
            try
            {
                return _appContext.RestrictedParts.Where(p => p.IsDeleted == false && p.ModuleId == moduleId && p.ReferenceId == referenceId && p.PartType == partType)
                                                   .OrderBy(p => p.RestrictedPartId)
                                                   .ToList();
            }
            catch (Exception)
            {

                throw;
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
            catch (Exception)
            {

                throw;
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
            catch (Exception)
            {

                throw;
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
            catch (Exception)
            {

                throw;
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
            catch (Exception)
            {

                throw;
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
            catch (Exception)
            {

                throw;
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
            catch (Exception)
            {

                throw;
            }
        }

        #endregion

        public void CreateClassificationMappings(List<ClassificationMapping> classificationMappings, int moduleId, long referenceId, string createdBy)
        {
            try
            {
                if (classificationMappings != null && classificationMappings.Count > 0)
                {
                    classificationMappings.ForEach(p => { p.ModuleId = moduleId; p.ReferenceId = referenceId; p.IsActive = true; p.IsDeleted = false; p.CreatedDate = DateTime.Now; p.UpdatedDate = DateTime.Now; p.CreatedBy = createdBy; p.UpdatedBy = createdBy; });
                    _appContext.ClassificationMapping.AddRange(classificationMappings);
                    _appContext.SaveChanges();
                }
            }
            catch (Exception)
            {

                throw;
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
            catch (Exception)
            {

                throw;
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
            catch (Exception)
            {

                throw;
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
                                                     vc.ClassificationName
                                                 })
                           .Distinct()
                           .ToList();


                return ClassificationMappingList;
            }
            catch (Exception)
            {

                throw;
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
            catch (Exception)
            {

                throw;
            }
        }


        public long CreateShippingVia(ShippingVia shippingVia)
        {
            try
            {
                shippingVia.CreatedDate = shippingVia.UpdatedDate = DateTime.Now;
                shippingVia.IsActive = true;
                shippingVia.IsDeleted = false;
                _appContext.ShippingVia.Add(shippingVia);
                _appContext.SaveChanges();
                return shippingVia.ShippingViaId;
            }
            catch (Exception)
            {

                throw;
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
            catch (Exception)
            {

                throw;
            }
        }

        public object GetShippingViaDetails(long shippingViaId)
        {
            var data = (from sv in _appContext.ShippingVia
                        where sv.IsDeleted == false && sv.ShippingViaId == shippingViaId
                        select new
                        {
                            ShipVia = sv.Name,
                            sv.ShippingAccountInfo,
                            sv.ShippingURL,
                            sv.ShippingId,
                            sv.Memo
                        }).FirstOrDefault();
            return data;
        }


        public IEnumerable<object> BindShipViaDetails(int userType, long referenceId)
        {
            try
            {
                var list = (from sv in _appContext.ShippingVia
                            where sv.IsDeleted == false && sv.UserType == userType && sv.ReferenceId == referenceId
                            select new
                            {
                                sv.ShippingViaId,
                                sv.Name,
                                sv.ShippingAccountInfo,
                                sv.ShippingURL,
                                sv.ShippingId,
                                sv.Memo
                            }).OrderBy(p => p.Name).ToList();
                return list;
            }
            catch (Exception)
            {

                throw;
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
            catch (Exception)
            {

                throw;
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
            catch (Exception)
            {

                throw;
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
            catch (Exception)
            {

                throw;
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
            catch (Exception)
            {

                throw;
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
                level4 = _appContext.ManagementStructure.Where(p => p.IsDelete == false && p.ManagementStructureId == manmgStrucId).FirstOrDefault();
                if (level4 != null && level4.ParentId > 0)
                {
                    level3 = _appContext.ManagementStructure.Where(p => p.IsDelete == false && p.ManagementStructureId == level4.ParentId).FirstOrDefault();
                }
                if (level3 != null && level3.ParentId > 0)
                {
                    level2 = _appContext.ManagementStructure.Where(p => p.IsDelete == false && p.ManagementStructureId == level3.ParentId).FirstOrDefault();
                }
                if (level2 != null && level2.ParentId > 0)
                {
                    level1 = _appContext.ManagementStructure.Where(p => p.IsDelete == false && p.ManagementStructureId == level2.ParentId).FirstOrDefault();
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
            catch (Exception)
            {

                throw;
            }
        }

        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;
    }
}
