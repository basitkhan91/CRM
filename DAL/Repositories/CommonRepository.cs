using DAL.Common;
using DAL.Models;
using DAL.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;

namespace DAL.Repositories
{
    public class CommonRepository : Repository<Contact>, ICommonRepository
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
                         CSR = z.con.FirstName + " " +z.con.LastName,
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

        public void MasterPartsStatus(long masterPartId,bool status, string updatedBy)
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

        public void CreateRestrictedParts(List<RestrictedParts> restrictedParts, long? referenceId)
        {
            try
            {
                if (restrictedParts != null && restrictedParts.Count > 0)
                {
                    restrictedParts.ForEach(p => p.ReferenceId = referenceId);
                    _appContext.RestrictedParts.AddRange(restrictedParts);
                    _appContext.SaveChanges();
                }
            }
            catch (Exception)
            {

                throw;
            }
        }

        public void UpdateRestrictedParts(List<RestrictedParts> restrictedParts, long? referenceId)
        {
            try
            {
                if (restrictedParts != null && restrictedParts.Count > 0)
                {
                    foreach (var item in restrictedParts)
                    {
                        if (item.RestrictedPartId > 0)
                        {
                            _appContext.RestrictedParts.Update(item);
                        }
                        else
                        {
                            item.ReferenceId = referenceId;
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

        public void CreateClassificationMappings(List<ClassificationMapping> classificationMappings, long referenceId)
        {
            try
            {
                if (classificationMappings != null && classificationMappings.Count > 0)
                {
                    classificationMappings.ForEach(p => p.ReferenceId = referenceId);
                    _appContext.ClassificationMapping.AddRange(classificationMappings);
                    _appContext.SaveChanges();
                }
            }
            catch (Exception)
            {

                throw;
            }
        }

        public void UpdateClassificationMappings(List<ClassificationMapping> classificationMappings, long referenceId)
        {
            try
            {
                if (classificationMappings != null && classificationMappings.Count > 0)
                {
                    foreach (var item in classificationMappings)
                    {
                        if (item.ClassificationMappingId > 0)
                        {
                            _appContext.ClassificationMapping.Update(item);
                        }
                        else
                        {
                            item.ReferenceId = referenceId;
                            _appContext.ClassificationMapping.Add(item);
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

        public List<ClassificationMapping> GetCustomerClassificationMappings(int moduleId, int referenceId)
        {
            List<ClassificationMapping> ClassificationMappingList = new List<ClassificationMapping>();
            ClassificationMapping classificationMapping;
            try
            {
                var result = _appContext.ClassificationMapping
                             .Join(_appContext.CustomerClassification,
                             cm => cm.ClasificationId,
                             cc => cc.CustomerClassificationId,
                             (cm, cc) => new { cm, cc })
                             .Where(p => p.cm.IsDeleted == false && p.cm.ModuleId == moduleId && p.cm.ReferenceId == referenceId)
                             .Select(p => new
                             {
                                 ClassificationMappingId = p.cm.ClassificationMappingId,
                                 ClasificationId = p.cm.ClasificationId,
                                 Description = p.cc.Description
                             })
                             .ToList();

                if (result != null && result.Count > 0)
                {
                    foreach (var item in result)
                    {
                        classificationMapping = new ClassificationMapping();
                        classificationMapping.ClassificationMappingId = item.ClassificationMappingId;
                        classificationMapping.ClasificationId = item.ClasificationId;
                        classificationMapping.Description = item.Description;
                        ClassificationMappingList.Add(classificationMapping);
                    }
                }

                return ClassificationMappingList;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public List<ClassificationMapping> GetVendorClassificationMappings(int moduleId, int referenceId)
        {
            List<ClassificationMapping> ClassificationMappingList = new List<ClassificationMapping>();
            ClassificationMapping classificationMapping;
            try
            {
                var result = _appContext.ClassificationMapping
                             .Join(_appContext.VendorClassification,
                             cm => cm.ClasificationId,
                             vc => vc.VendorClassificationId,
                             (cm, vc) => new { cm, vc })
                             .Where(p => p.cm.IsDeleted == false && p.cm.ModuleId == moduleId && p.cm.ReferenceId == referenceId)
                             .Select(p => new
                             {
                                 ClassificationMappingId = p.cm.ClassificationMappingId,
                                 ClasificationId = p.cm.ClasificationId,
                                 Description = p.vc.ClassificationName
                             })
                             .ToList();

                if (result != null && result.Count > 0)
                {
                    foreach (var item in result)
                    {
                        classificationMapping = new ClassificationMapping();
                        classificationMapping.ClassificationMappingId = item.ClassificationMappingId;
                        classificationMapping.ClasificationId = item.ClasificationId;
                        classificationMapping.Description = item.Description;
                        ClassificationMappingList.Add(classificationMapping);
                    }
                }

                return ClassificationMappingList;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public dynamic UpdateEntity(dynamic uiModel, dynamic dbModel,ref IDictionary<string, object> keyValuePairs)
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


        public IEnumerable<object> BindDropdowns(string tableName,string primaryColumn,string textColumn)
        {
            try
            {
               var result= _appContext.Dropdowns.FromSql("BindDropdowns @p0,@p1,@p2", tableName, primaryColumn, textColumn).ToList();
                return result;
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

        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;
    }
}
