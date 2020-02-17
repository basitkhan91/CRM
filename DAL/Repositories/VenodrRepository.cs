
using DAL.Common;
using DAL.Models;
using DAL.Repositories.Interfaces;
using EntityFrameworkPaginate;
using ExcelDataReader;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http.Headers;

namespace DAL.Repositories
{

    public class VenodrRepository : Repository<Vendor>, IVendor
    {
        List<Vendor> iList = new List<Vendor>();
        private AppSettings AppSettings { get; set; }
        public VenodrRepository(ApplicationDbContext context, IOptions<AppSettings> settings) : base(context)
        {
            AppSettings = settings.Value;
        }



        public IEnumerable<object> GetVendorsList(Common.Filters<VendorFilters> vendorFilters)
        {
            if (vendorFilters.filters == null)
                vendorFilters.filters = new VendorFilters();
            var pageNumber = vendorFilters.first + 1;
            var pageSize = vendorFilters.rows;
            string sortColumn = string.Empty;

            short statusId = 2;
            var sorts = new Sorts<VendorFilters>();
            var filters = new EntityFrameworkPaginate.Filters<VendorFilters>();



            if (string.IsNullOrEmpty(vendorFilters.SortField))
            {
                sortColumn = "createdDate";
                vendorFilters.SortOrder = -1;
                sorts.Add(sortColumn == "createdDate", x => x.createdDate, true);
            }
            else
            {
                sortColumn = vendorFilters.SortField;
            }

            var propertyInfo = typeof(VendorFilters).GetProperty(sortColumn);

            if (vendorFilters.SortOrder == -1)
            {
                sorts.Add(true, x => propertyInfo.GetValue(x, null), true);
            }
            else
            {
                sorts.Add(true, x => propertyInfo.GetValue(x, null));
            }

            if (!string.IsNullOrEmpty(vendorFilters.filters.status))
            {
                if (vendorFilters.filters.status.ToLower() == "inactive")
                {
                    statusId = 0;
                }
                else if (vendorFilters.filters.status.ToLower() == "active")
                {
                    statusId = 1;
                }
                else
                {
                    statusId = 2;
                }

            }


            filters.Add(!string.IsNullOrEmpty(vendorFilters.filters.vendorName), x => x.vendorName.ToLower().Contains(vendorFilters.filters.vendorName.ToLower()));
            filters.Add(!string.IsNullOrEmpty(vendorFilters.filters.vendorCode), x => x.vendorCode.ToLower().Contains(vendorFilters.filters.vendorCode.ToLower()));
            filters.Add(!string.IsNullOrEmpty(vendorFilters.filters.vendorEmail), x => x.vendorEmail.ToLower().Contains(vendorFilters.filters.vendorEmail.ToLower()));
            filters.Add(!string.IsNullOrEmpty(vendorFilters.filters.city), x => x.city.ToLower().Contains(vendorFilters.filters.city.ToLower()));
            filters.Add(!string.IsNullOrEmpty(vendorFilters.filters.stateOrProvince), x => x.stateOrProvince.ToLower().Contains(vendorFilters.filters.stateOrProvince.ToLower()));
            filters.Add(!string.IsNullOrEmpty(vendorFilters.filters.classificationName), x => x.classificationName.ToLower().Contains(vendorFilters.filters.classificationName.ToLower()));
            filters.Add(!string.IsNullOrEmpty(vendorFilters.filters.vendorCapabilityName), x => x.vendorCapabilityName.ToLower().Contains(vendorFilters.filters.vendorCapabilityName.ToLower()));
            filters.Add(!string.IsNullOrEmpty(vendorFilters.filters.vendorPhoneContact), x => x.vendorPhoneContact.ToLower().Contains(vendorFilters.filters.vendorPhoneContact.ToLower()));
            filters.Add(!string.IsNullOrEmpty(vendorFilters.filters.description), x => x.description.ToLower().Contains(vendorFilters.filters.description.ToLower()));
            filters.Add(statusId == 2, x => x.isActive == x.isActive);
            filters.Add(statusId == 1, x => x.isActive == true);
            filters.Add(statusId == 0, x => x.isActive == false);

            var totalRecords = (from t in _appContext.Vendor
                                join ad in _appContext.Address on t.AddressId equals ad.AddressId
                                join vt in _appContext.VendorType on t.VendorTypeId equals vt.VendorTypeId into vtt
                                from vt in vtt.DefaultIfEmpty()
                                    //join vc in _appContext.VendorClassification on t.VendorClassificationId equals vc.VendorClassificationId into vcd
                                    //from vc in vcd.DefaultIfEmpty()
                                join cc in _appContext.VendorContact.Where(p => p.IsDefaultContact == true) on t.VendorId equals cc.VendorId into vendorinfo
                                from venContacts in vendorinfo.DefaultIfEmpty()
                                join con in _appContext.Contact on venContacts.ContactId equals con.ContactId into contactInfo
                                from con in contactInfo.DefaultIfEmpty()
                                join vca in _appContext.VendorCapabiliy on t.capabilityId equals vca.VendorCapabilityId into vcad
                                from vca in vcad.DefaultIfEmpty()
                                where (t.IsDeleted == false || t.IsDeleted == null)

                                select new VendorFilters()

                                {
                                    vendorId = t.VendorId,
                                    vendorName = t.VendorName,
                                    vendorCode = t.VendorCode,
                                    vendorEmail = t.VendorEmail,
                                    isActive = t.IsActive,
                                    description = vt.Description,
                                    city = ad.City,
                                    stateOrProvince = ad.StateOrProvince,
                                    //classificationName = vc.ClassificationName,
                                    classificationName = string.Join(",", _appContext.Vendor
                                .Join(_appContext.ClassificationMapping,
                                v => v.VendorId,
                                mp => mp.ReferenceId,
                                (v, mp) => new { v, mp })
                                 .Join(_appContext.VendorClassification,
                                  mp1 => mp1.mp.ClasificationId,
                                  vc => vc.VendorClassificationId,
                                (mp1, vc) => new { mp1, vc })
                                .Where(p => p.mp1.v.VendorId == t.VendorId && p.mp1.mp.ModuleId == Convert.ToInt32(ModuleEnum.Vendor))
                                .Select(p => p.vc.ClassificationName)),
                                    vendorCapabilityName = vca.capabilityDescription,
                                   // vendorPhoneContact = t.VendorPhone + " - " + t.VendorPhoneExt,
                                    vendorPhoneContact = con.FirstName + " " + con.LastName,

                                    createdDate = t.CreatedDate
                                }
                         ).Distinct().Paginate(pageNumber, pageSize, sorts, filters).RecordCount;

            var list = (from t in _appContext.Vendor
                        join ad in _appContext.Address on t.AddressId equals ad.AddressId
                        join vt in _appContext.VendorType on t.VendorTypeId equals vt.VendorTypeId into vtt
                        from vt in vtt.DefaultIfEmpty()
                            //join vc in _appContext.VendorClassification on t.VendorClassificationId equals vc.VendorClassificationId into vcd
                            //from vc in vcd.DefaultIfEmpty()
                        join cc in _appContext.VendorContact.Where(p => p.IsDefaultContact == true) on t.VendorId equals cc.VendorId into vendorinfo
                        from venContacts in vendorinfo.DefaultIfEmpty()
                        join con in _appContext.Contact on venContacts.ContactId equals con.ContactId into contactInfo
                        from con in contactInfo.DefaultIfEmpty()
                        join vca in _appContext.VendorCapabiliy on t.capabilityId equals vca.VendorCapabilityId into vcad
                        from vca in vcad.DefaultIfEmpty()
                        where (t.IsDeleted == false || t.IsDeleted == null)

                        select new VendorFilters()

                        {
                            vendorId = t.VendorId,
                            vendorName = t.VendorName,
                            vendorCode = t.VendorCode,
                            vendorEmail = t.VendorEmail,
                            isActive = t.IsActive,
                            description = vt.Description,
                            city = ad.City,
                            stateOrProvince = ad.StateOrProvince,
                            //classificationName = vc.ClassificationName,
                            vendorCapabilityName = vca.capabilityDescription,
                           // vendorPhoneContact = t.VendorPhone + " - " + t.VendorPhoneExt,
                            vendorPhoneContact = con.FirstName + " " + con.LastName,
                            createdDate = t.CreatedDate,
                            classificationName = string.Join(",", _appContext.Vendor
                                .Join(_appContext.ClassificationMapping,
                                v => v.VendorId,
                                mp => mp.ReferenceId,
                                (v, mp) => new { v, mp })
                                 .Join(_appContext.VendorClassification,
                                  mp1 => mp1.mp.ClasificationId,
                                  vc => vc.VendorClassificationId,
                                (mp1, vc) => new { mp1, vc })
                                .Where(p => p.mp1.v.VendorId == t.VendorId && p.mp1.mp.ModuleId == Convert.ToInt32(ModuleEnum.Vendor))
                                .Select(p => p.vc.ClassificationName)),
                            totalRecords = totalRecords,

                        }).Distinct()
                           .Paginate(pageNumber, pageSize, sorts, filters).Results;

            return list;


        }

        public IEnumerable<object> VendorGlobalSearch(string filterText, int pageNumber, int pageSize, bool isActive)
        {
            var take = pageSize;
            var skip = take * (pageNumber);

            //isActive is True, Request form PO or RO
            if (isActive)
            {
                if (!string.IsNullOrEmpty(filterText))
                {
                    filterText = filterText.ToLower();
                    var totalRecords = (from t in _appContext.Vendor
                                        join ad in _appContext.Address on t.AddressId equals ad.AddressId
                                        join vt in _appContext.VendorType on t.VendorTypeId equals vt.VendorTypeId into vtt
                                        from vt in vtt.DefaultIfEmpty()
                                            //join vc in _appContext.VendorClassification on t.VendorClassificationId equals vc.VendorClassificationId into vcd
                                            //from vc in vcd.DefaultIfEmpty()
                                        join cc in _appContext.VendorContact.Where(p => p.IsDefaultContact == true) on t.VendorId equals cc.VendorId into vendorinfo
                                        from venContacts in vendorinfo.DefaultIfEmpty()
                                        join con in _appContext.Contact on venContacts.ContactId equals con.ContactId into contactInfo
                                        from con in contactInfo.DefaultIfEmpty()
                                        join vca in _appContext.VendorCapabiliy on t.capabilityId equals vca.VendorCapabilityId into vcad
                                        from vca in vcad.DefaultIfEmpty()
                                        where (t.IsDeleted == false || t.IsDeleted == null) && t.IsActive == true
                                          && (t.VendorName.ToLower().Contains(filterText)
                                          || t.VendorCode.ToLower().Contains(filterText)
                                          || t.VendorEmail.ToLower().Contains(filterText)
                                          //|| t.IsActive == (statusId == 2 ? t.IsActive : (statusId == 0 ? false : true))
                                          || ad.City.ToLower().Contains(filterText)
                                          || ad.StateOrProvince.ToLower().Contains(filterText)
                                          //|| vc.ClassificationName.Contains(filterText)
                                          || string.Join(",", _appContext.Vendor
                                .Join(_appContext.ClassificationMapping,
                                v => v.VendorId,
                                mp => mp.ReferenceId,
                                (v, mp) => new { v, mp })
                                 .Join(_appContext.VendorClassification,
                                  mp1 => mp1.mp.ClasificationId,
                                  vc => vc.VendorClassificationId,
                                (mp1, vc) => new { mp1, vc })
                                .Where(p => p.mp1.v.VendorId == t.VendorId && p.mp1.mp.ModuleId == Convert.ToInt32(ModuleEnum.Vendor))
                                .Select(p => p.vc.ClassificationName)).ToLower().Contains(filterText)
                                          || vca.capabilityDescription.ToLower().Contains(filterText)
                                          || (con.FirstName + " " + con.LastName).ToLower().Contains(filterText)
                                          || vt.Description.ToLower().Contains(filterText))
                                        select new
                                        {
                                            t.VendorId,

                                        }
                            ).Distinct().Count();

                    var list = (from t in _appContext.Vendor
                                join ad in _appContext.Address on t.AddressId equals ad.AddressId
                                join vt in _appContext.VendorType on t.VendorTypeId equals vt.VendorTypeId into vtt
                                from vt in vtt.DefaultIfEmpty()
                                    //join vc in _appContext.VendorClassification on t.VendorClassificationId equals vc.VendorClassificationId into vcd
                                    //from vc in vcd.DefaultIfEmpty()
                                join cc in _appContext.VendorContact.Where(p => p.IsDefaultContact == true) on t.VendorId equals cc.VendorId into vendorinfo
                                from venContacts in vendorinfo.DefaultIfEmpty()
                                join con in _appContext.Contact on venContacts.ContactId equals con.ContactId into contactInfo
                                from con in contactInfo.DefaultIfEmpty()
                                join vca in _appContext.VendorCapabiliy on t.capabilityId equals vca.VendorCapabilityId into vcad
                                from vca in vcad.DefaultIfEmpty()
                                where (t.IsDeleted == false || t.IsDeleted == null) && t.IsActive == true
                                        && (t.VendorName.ToLower().Contains(filterText)
                                        || t.VendorCode.ToLower().Contains(filterText)
                                        || t.VendorEmail.ToLower().Contains(filterText)
                                        //|| t.IsActive == (statusId == 2 ? t.IsActive : (statusId == 0 ? false : true))
                                        || ad.City.ToLower().Contains(filterText)
                                        || ad.StateOrProvince.ToLower().Contains(filterText)
                                        //|| vc.ClassificationName.Contains(filterText)                                        
                                        || string.Join(",", _appContext.Vendor
                                .Join(_appContext.ClassificationMapping,
                                v => v.VendorId,
                                mp => mp.ReferenceId,
                                (v, mp) => new { v, mp })
                                 .Join(_appContext.VendorClassification,
                                  mp1 => mp1.mp.ClasificationId,
                                  vc => vc.VendorClassificationId,
                                (mp1, vc) => new { mp1, vc })
                                .Where(p => p.mp1.v.VendorId == t.VendorId && p.mp1.mp.ModuleId == Convert.ToInt32(ModuleEnum.Vendor))
                                .Select(p => p.vc.ClassificationName)).ToLower().Contains(filterText)
                                        || vca.capabilityDescription.ToLower().Contains(filterText)
                                        || (con.FirstName + " " + con.LastName).ToLower().Contains(filterText)
                                        || vt.Description.ToLower().Contains(filterText))
                                select new
                                {
                                    t.VendorId,
                                    t.VendorName,
                                    t.VendorCode,
                                    t.VendorEmail,
                                    t.IsActive,
                                    vt.Description,
                                    ad.City,
                                    ad.StateOrProvince,
                                    //vc.ClassificationName,
                                    ClassificationName = string.Join(",", _appContext.Vendor
                                .Join(_appContext.ClassificationMapping,
                                v => v.VendorId,
                                mp => mp.ReferenceId,
                                (v, mp) => new { v, mp })
                                 .Join(_appContext.VendorClassification,
                                  mp1 => mp1.mp.ClasificationId,
                                  vc => vc.VendorClassificationId,
                                (mp1, vc) => new { mp1, vc })
                                .Where(p => p.mp1.v.VendorId == t.VendorId && p.mp1.mp.ModuleId == Convert.ToInt32(ModuleEnum.Vendor))
                                .Select(p => p.vc.ClassificationName)),
                                    VendorCapabilityName = vca.capabilityDescription,
                                    //VendorPhoneContact = t.VendorPhone + " - " + t.VendorPhoneExt,
                                    vendorPhoneContact = con.FirstName + " " + con.LastName,
                                    t.CreatedDate,
                                    TotalRecords = totalRecords,
                                }).Distinct()
                                  .OrderByDescending(p => p.CreatedDate)
                                  .Skip(skip)
                                  .Take(take)
                                  .ToList();

                    return list;

                }
                else
                {
                    var totalRecords = (from t in _appContext.Vendor
                                        join ad in _appContext.Address on t.AddressId equals ad.AddressId
                                        join vt in _appContext.VendorType on t.VendorTypeId equals vt.VendorTypeId into vtt
                                        from vt in vtt.DefaultIfEmpty()
                                        join cc in _appContext.VendorContact.Where(p => p.IsDefaultContact == true) on t.VendorId equals cc.VendorId into vendorinfo
                                        from venContacts in vendorinfo.DefaultIfEmpty()
                                        join con in _appContext.Contact on venContacts.ContactId equals con.ContactId into contactInfo
                                        from con in contactInfo.DefaultIfEmpty()

                                            //join vc in _appContext.VendorClassification on t.VendorClassificationId equals vc.VendorClassificationId into vcd
                                            //from vc in vcd.DefaultIfEmpty()
                                        join vca in _appContext.VendorCapabiliy on t.capabilityId equals vca.VendorCapabilityId into vcad
                                        from vca in vcad.DefaultIfEmpty()
                                        where (t.IsDeleted == false || t.IsDeleted == null)
                                        select new
                                        {
                                            t.VendorId,

                                        }
                           ).Distinct().Count();

                    var list = (from t in _appContext.Vendor
                                join ad in _appContext.Address on t.AddressId equals ad.AddressId
                                join vt in _appContext.VendorType on t.VendorTypeId equals vt.VendorTypeId into vtt
                                from vt in vtt.DefaultIfEmpty()
                                    //join vc in _appContext.VendorClassification on t.VendorClassificationId equals vc.VendorClassificationId into vcd
                                    //from vc in vcd.DefaultIfEmpty()
                                join cc in _appContext.VendorContact.Where(p => p.IsDefaultContact == true) on t.VendorId equals cc.VendorId into vendorinfo
                                from venContacts in vendorinfo.DefaultIfEmpty()
                                join con in _appContext.Contact on venContacts.ContactId equals con.ContactId into contactInfo
                                from con in contactInfo.DefaultIfEmpty()

                                join vca in _appContext.VendorCapabiliy on t.capabilityId equals vca.VendorCapabilityId into vcad
                                from vca in vcad.DefaultIfEmpty()
                                where (t.IsDeleted == false || t.IsDeleted == null)
                                select new
                                {
                                    t.VendorId,
                                    t.VendorName,
                                    t.VendorCode,
                                    t.VendorEmail,
                                    t.IsActive,
                                    vt.Description,
                                    ad.City,
                                    ad.StateOrProvince,
                                    //vc.ClassificationName,
                                    classificationName = string.Join(",", _appContext.Vendor
                                .Join(_appContext.ClassificationMapping,
                                v => v.VendorId,
                                mp => mp.ReferenceId,
                                (v, mp) => new { v, mp })
                                 .Join(_appContext.VendorClassification,
                                  mp1 => mp1.mp.ClasificationId,
                                  vc => vc.VendorClassificationId,
                                (mp1, vc) => new { mp1, vc })
                                .Where(p => p.mp1.v.VendorId == t.VendorId && p.mp1.mp.ModuleId == Convert.ToInt32(ModuleEnum.Vendor))
                                .Select(p => p.vc.ClassificationName)),
                                    VendorCapabilityName = vca.capabilityDescription,
                                    //VendorPhoneContact = t.VendorPhone + " - " + t.VendorPhoneExt,
                                    VendorPhoneContact = con.FirstName + " " + con.LastName,

                                    t.CreatedDate,
                                    TotalRecords = totalRecords,
                                }).Distinct()
                                  .OrderByDescending(p => p.CreatedDate)
                                  .Skip(skip)
                                  .Take(take)
                                  .ToList();
                    return list;
                }
            }
            else
            {
                if (!string.IsNullOrEmpty(filterText))
                {

                    var totalRecords = (from t in _appContext.Vendor
                                        join ad in _appContext.Address on t.AddressId equals ad.AddressId
                                        join vt in _appContext.VendorType on t.VendorTypeId equals vt.VendorTypeId into vtt
                                        from vt in vtt.DefaultIfEmpty()
                                            //join vc in _appContext.VendorClassification on t.VendorClassificationId equals vc.VendorClassificationId into vcd
                                            //from vc in vcd.DefaultIfEmpty()
                                        join cc in _appContext.VendorContact.Where(p => p.IsDefaultContact == true) on t.VendorId equals cc.VendorId into vendorinfo
                                        from venContacts in vendorinfo.DefaultIfEmpty()
                                        join con in _appContext.Contact on venContacts.ContactId equals con.ContactId into contactInfo
                                        from con in contactInfo.DefaultIfEmpty()

                                        join vca in _appContext.VendorCapabiliy on t.capabilityId equals vca.VendorCapabilityId into vcad
                                        from vca in vcad.DefaultIfEmpty()
                                        where (t.IsDeleted == false || t.IsDeleted == null)
                                          && (t.VendorName.ToLower().Contains(filterText)
                                          || t.VendorCode.ToLower().Contains(filterText)
                                          || t.VendorEmail.ToLower().Contains(filterText)
                                          //|| t.IsActive == (statusId == 2 ? t.IsActive : (statusId == 0 ? false : true))
                                          || ad.City.ToLower().Contains(filterText)
                                          || ad.StateOrProvince.ToLower().Contains(filterText)
                                          //|| vc.ClassificationName.Contains(filterText)
                                          || string.Join(",", _appContext.Vendor
                                .Join(_appContext.ClassificationMapping,
                                v => v.VendorId,
                                mp => mp.ReferenceId,
                                (v, mp) => new { v, mp })
                                 .Join(_appContext.VendorClassification,
                                  mp1 => mp1.mp.ClasificationId,
                                  vc => vc.VendorClassificationId,
                                (mp1, vc) => new { mp1, vc })
                                .Where(p => p.mp1.v.VendorId == t.VendorId && p.mp1.mp.ModuleId == Convert.ToInt32(ModuleEnum.Vendor))
                                .Select(p => p.vc.ClassificationName)).ToLower().Contains(filterText)
                                          || vca.capabilityDescription.ToLower().Contains(filterText)
                                          || (con.FirstName + " " + con.LastName).ToLower().Contains(filterText)
                                          || vt.Description.ToLower().Contains(filterText))
                                        select new
                                        {
                                            t.VendorId,

                                        }
                            ).Distinct().Count();

                    var list = (from t in _appContext.Vendor
                                join ad in _appContext.Address on t.AddressId equals ad.AddressId
                                join vt in _appContext.VendorType on t.VendorTypeId equals vt.VendorTypeId into vtt
                                from vt in vtt.DefaultIfEmpty()
                                    //join vc in _appContext.VendorClassification on t.VendorClassificationId equals vc.VendorClassificationId into vcd
                                    //from vc in vcd.DefaultIfEmpty()
                                join cc in _appContext.VendorContact.Where(p => p.IsDefaultContact == true) on t.VendorId equals cc.VendorId into vendorinfo
                                from venContacts in vendorinfo.DefaultIfEmpty()
                                join con in _appContext.Contact on venContacts.ContactId equals con.ContactId into contactInfo
                                from con in contactInfo.DefaultIfEmpty()

                                join vca in _appContext.VendorCapabiliy on t.capabilityId equals vca.VendorCapabilityId into vcad
                                from vca in vcad.DefaultIfEmpty()
                                where (t.IsDeleted == false || t.IsDeleted == null)
                                        && (t.VendorName.ToLower().Contains(filterText)
                                        || t.VendorCode.ToLower().Contains(filterText)
                                        || t.VendorEmail.ToLower().Contains(filterText)
                                        //|| t.IsActive == (statusId == 2 ? t.IsActive : (statusId == 0 ? false : true))
                                        || ad.City.ToLower().Contains(filterText)
                                        || ad.StateOrProvince.ToLower().Contains(filterText)
                                        //|| vc.ClassificationName.Contains(filterText)
                                        || string.Join(",", _appContext.Vendor
                                .Join(_appContext.ClassificationMapping,
                                v => v.VendorId,
                                mp => mp.ReferenceId,
                                (v, mp) => new { v, mp })
                                 .Join(_appContext.VendorClassification,
                                  mp1 => mp1.mp.ClasificationId,
                                  vc => vc.VendorClassificationId,
                                (mp1, vc) => new { mp1, vc })
                                .Where(p => p.mp1.v.VendorId == t.VendorId && p.mp1.mp.ModuleId == Convert.ToInt32(ModuleEnum.Vendor))
                                .Select(p => p.vc.ClassificationName)).ToLower().Contains(filterText)
                                        || vca.capabilityDescription.ToLower().Contains(filterText)
                                        || (con.FirstName + " " + con.LastName).ToLower().Contains(filterText)
                                        || vt.Description.ToLower().Contains(filterText))
                                select new
                                {
                                    t.VendorId,
                                    t.VendorName,
                                    t.VendorCode,
                                    t.VendorEmail,
                                    t.IsActive,
                                    vt.Description,
                                    ad.City,
                                    ad.StateOrProvince,
                                    //vc.ClassificationName,
                                    ClassificationName = string.Join(",", _appContext.Vendor
                                .Join(_appContext.ClassificationMapping,
                                v => v.VendorId,
                                mp => mp.ReferenceId,
                                (v, mp) => new { v, mp })
                                 .Join(_appContext.VendorClassification,
                                  mp1 => mp1.mp.ClasificationId,
                                  vc => vc.VendorClassificationId,
                                (mp1, vc) => new { mp1, vc })
                                .Where(p => p.mp1.v.VendorId == t.VendorId && p.mp1.mp.ModuleId == Convert.ToInt32(ModuleEnum.Vendor))
                                .Select(p => p.vc.ClassificationName)),
                                    VendorCapabilityName = vca.capabilityDescription,
                                    // VendorPhoneContact = t.VendorPhone + " - " + t.VendorPhoneExt,
                                    VendorPhoneContact = con.FirstName + " " + con.LastName,

                                    t.CreatedDate,
                                    TotalRecords = totalRecords,
                                }).Distinct()
                                  .OrderByDescending(p => p.CreatedDate)
                                  .Skip(skip)
                                  .Take(take)
                                  .ToList();

                    return list;

                }
                else
                {
                    var totalRecords = (from t in _appContext.Vendor
                                        join ad in _appContext.Address on t.AddressId equals ad.AddressId
                                        join vt in _appContext.VendorType on t.VendorTypeId equals vt.VendorTypeId into vtt
                                        from vt in vtt.DefaultIfEmpty()
                                            //join vc in _appContext.VendorClassification on t.VendorClassificationId equals vc.VendorClassificationId into vcd
                                            //from vc in vcd.DefaultIfEmpty()
                                        join cc in _appContext.VendorContact.Where(p => p.IsDefaultContact == true) on t.VendorId equals cc.VendorId into vendorinfo
                                        from venContacts in vendorinfo.DefaultIfEmpty()
                                        join con in _appContext.Contact on venContacts.ContactId equals con.ContactId into contactInfo
                                        from con in contactInfo.DefaultIfEmpty()

                                        join vca in _appContext.VendorCapabiliy on t.capabilityId equals vca.VendorCapabilityId into vcad
                                        from vca in vcad.DefaultIfEmpty()
                                        where (t.IsDeleted == false || t.IsDeleted == null)
                                        select new
                                        {
                                            t.VendorId,

                                        }
                           ).Distinct().Count();

                    var list = (from t in _appContext.Vendor
                                join ad in _appContext.Address on t.AddressId equals ad.AddressId
                                join vt in _appContext.VendorType on t.VendorTypeId equals vt.VendorTypeId into vtt
                                from vt in vtt.DefaultIfEmpty()
                                    //join vc in _appContext.VendorClassification on t.VendorClassificationId equals vc.VendorClassificationId into vcd
                                    //from vc in vcd.DefaultIfEmpty()
                                join cc in _appContext.VendorContact.Where(p => p.IsDefaultContact == true) on t.VendorId equals cc.VendorId into vendorinfo
                                from venContacts in vendorinfo.DefaultIfEmpty()
                                join con in _appContext.Contact on venContacts.ContactId equals con.ContactId into contactInfo
                                from con in contactInfo.DefaultIfEmpty()

                                join vca in _appContext.VendorCapabiliy on t.capabilityId equals vca.VendorCapabilityId into vcad
                                from vca in vcad.DefaultIfEmpty()
                                where (t.IsDeleted == false || t.IsDeleted == null)
                                select new
                                {
                                    t.VendorId,
                                    t.VendorName,
                                    t.VendorCode,
                                    t.VendorEmail,
                                    t.IsActive,
                                    vt.Description,
                                    ad.City,
                                    ad.StateOrProvince,
                                    //vc.ClassificationName,
                                    ClassificationName = string.Join(",", _appContext.Vendor
                                .Join(_appContext.ClassificationMapping,
                                v => v.VendorId,
                                mp => mp.ReferenceId,
                                (v, mp) => new { v, mp })
                                 .Join(_appContext.VendorClassification,
                                  mp1 => mp1.mp.ClasificationId,
                                  vc => vc.VendorClassificationId,
                                (mp1, vc) => new { mp1, vc })
                                .Where(p => p.mp1.v.VendorId == t.VendorId && p.mp1.mp.ModuleId == Convert.ToInt32(ModuleEnum.Vendor))
                                .Select(p => p.vc.ClassificationName)),
                                    VendorCapabilityName = vca.capabilityDescription,
                                    // VendorPhoneContact = t.VendorPhone + " - " + t.VendorPhoneExt,
                                    VendorPhoneContact = con.FirstName + " " + con.LastName,

                                    t.CreatedDate,
                                    TotalRecords = totalRecords,
                                }).Distinct()
                                  .OrderByDescending(p => p.CreatedDate)
                                  .Skip(skip)
                                  .Take(take)
                                  .ToList();
                    return list;
                }
            }



        }

        public object GetVendorDataById(long vendorId)
        {
            var result = (from t in _appContext.Vendor
                          join ad in _appContext.Address on t.AddressId equals ad.AddressId
                          join cont in _appContext.Countries on Convert.ToInt32(ad.Country) equals cont.countries_id into country
                          from cont in country.DefaultIfEmpty()
                          join vt in _appContext.VendorType on t.VendorTypeId equals vt.VendorTypeId into vtt
                          from vt in vtt.DefaultIfEmpty()
                              //join vc in _appContext.VendorClassification on t.VendorClassificationId equals vc.VendorClassificationId into vcd
                              //from vc in vcd.DefaultIfEmpty()
                          join vca in _appContext.VendorCapabiliy on t.capabilityId equals vca.VendorCapabilityId into vcad
                          from vca in vcad.DefaultIfEmpty()
                          join cr in _appContext.CreditTerms on t.CreditTermsId equals cr.CreditTermsId into crr
                          from cr in crr.DefaultIfEmpty()
                          join cu in _appContext.Currency on t.CurrencyId equals cu.CurrencyId into cuu
                          from cu in cuu.DefaultIfEmpty()                         
						  join d in _appContext.Discount on t.DiscountId equals d.DiscountId into dg
                          from d in dg.DefaultIfEmpty()
                          join vp1 in _appContext.Vendor on t.VendorParentId equals vp1.VendorId into vpp1
                          from vp1 in vpp1.DefaultIfEmpty()

                              //join inte in _appContext.IntegrationPortalMapping on t.VendorId equals inte.ReferenceId into intee 
                              //from inte in intee.DefaultIfEmpty()


                          where (t.IsDeleted == false || t.IsDeleted == null) && t.VendorId == vendorId
                          select new
                          {
                              t.VendorId,
                              t.VendorName,
                              t.VendorCode,
                              t.VendorTypeId,
                              t.DoingBusinessAsName,
                              t.VendorClassificationId,
                              t.Parent,
                              ParentName = vp1.VendorName,
                              t.VendorContractReference,
                              t.AddressId,
                              t.IsVendorAlsoCustomer,
                              t.RelatedCustomerId,
                              t.VendorEmail,
                              t.IsPreferredVendor,
                              t.LicenseNumber,
                              t.VendorURL,
                              t.IsCertified,
                              t.CertificationFile,
                              t.VendorAudit,
                              t.VendorAuditFile,
                              t.EDI,
                              t.EDIDescription,
                              t.AeroExchange,
                              t.AeroExchangeDescription,
                              t.CreditLimit,
                              t.CurrencyId,
                              t.DiscountLevel,                            
                              DiscontValue =  d == null?0: d.DiscontValue,
							  t.Is1099Required,
                              t.CreditTermsId,
                              t.MasterCompanyId,
                              t.CreatedBy,
                              t.UpdatedBy,
                              t.CreatedDate,
                              t.UpdatedDate,
                              t.IsActive,
                              t.VendorPhone,
                              t.IsDeleted,
                              t.DiscountId ,
                              t.capabilityId,
                              VendorParentName= vp1.VendorName,
                              t.ManagementStructureId,
                              t.DefaultPaymentTypeId,
                              t.VendorPhoneExt,
                              t.IsAddressForBilling,
                              t.IsAddressForShipping,
                              t.IsAllowNettingAPAR,
                              vt.Description,
                              Address1 = ad.Line1,
                              Address2 = ad.Line2,
                              ad.City,
                              ad.StateOrProvince,
                              ad.PostalCode,
                              Country = cont.countries_name,
                              CountryId = cont.countries_id,
                              CreditTerms = cr.Name,
                              currency = cu.Symbol,
                              t.VendorParentId,


                              //vc.ClassificationName,
                              VendorCapabilityName = vca.capabilityDescription,
                              VendorClassifications = (_appContext.Vendor
                                .Join(_appContext.ClassificationMapping,
                                v => v.VendorId,
                                mp => mp.ReferenceId,
                                (v, mp) => new { v, mp })
                                 .Join(_appContext.VendorClassification,
                                  mp1 => mp1.mp.ClasificationId,
                                  vc => vc.VendorClassificationId,
                                (mp1, vc) => new { mp1, vc })
                                .Where(p => p.mp1.v.VendorId == t.VendorId && p.mp1.mp.ModuleId == Convert.ToInt32(ModuleEnum.Vendor))
                                .Select(p => p.vc.VendorClassificationId)),
                              VendorClassificationName = string.Join(",", _appContext.Vendor
                                .Join(_appContext.ClassificationMapping,
                                v => v.VendorId,
                                mp => mp.ReferenceId,
                                (v, mp) => new { v, mp })
                                 .Join(_appContext.VendorClassification,
                                  mp1 => mp1.mp.ClasificationId,
                                  vc => vc.VendorClassificationId,
                                (mp1, vc) => new { mp1, vc })
                                .Where(p => p.mp1.v.VendorId == t.VendorId && p.mp1.mp.ModuleId == Convert.ToInt32(ModuleEnum.Vendor))
                                .Select(p => p.vc.ClassificationName)),

                              IntegrationPortalIds = _appContext.Vendor
                                .Join(_appContext.IntegrationPortalMapping,
                                v => v.VendorId,
                                mp => mp.ReferenceId,
                                (v, mp) => new { v, mp })
                               .Join(_appContext.IntegrationPortal,
                                mp1 => mp1.mp.IntegrationPortalId,
                                inte => Convert.ToInt64(inte.IntegrationPortalId),
                              (mp1, inte) => new { mp1, inte })
                              .Where(p => p.mp1.v.VendorId == t.VendorId && p.mp1.mp.ModuleId == Convert.ToInt32(ModuleEnum.Vendor))
                               .Select(p => p.inte.IntegrationPortalId),
                              IntegrationPortalNames = string.Join(",", _appContext.Vendor
                                .Join(_appContext.IntegrationPortalMapping,
                                v => v.VendorId,
                                mp => mp.ReferenceId,
                                (v, mp) => new { v, mp })
                               .Join(_appContext.IntegrationPortal,
                                mp1 => mp1.mp.IntegrationPortalId,
                                inte => Convert.ToInt64(inte.IntegrationPortalId),
                              (mp1, inte) => new { mp1, inte })
                              .Where(p => p.mp1.v.VendorId == t.VendorId && p.mp1.mp.ModuleId == Convert.ToInt32(ModuleEnum.Vendor))
                               .Select(p => p.inte.Description)),

                          }).FirstOrDefault();
            return result;
        }


        public IEnumerable<Vendor> GetVendors()
        {
            return _appContext.Vendor.Where(c => (c.IsDeleted == false || c.IsDeleted == null) && (c.IsActive == true)).OrderByDescending(c => c.VendorId).ToList();
        }

        public IEnumerable<object> GetVendorsAuditHistory(long vendorId)
        {
            var retData = (from t in _appContext.VendorAudit
                           join ad in _appContext.Address on t.AddressId equals ad.AddressId
                           join vt in _appContext.VendorType on t.VendorTypeId equals vt.VendorTypeId into vtt
                           from vt in vtt.DefaultIfEmpty()
                           join ct in _appContext.CreditTerms on t.CreditTermsId equals ct.CreditTermsId into crd
                           from ct in crd.DefaultIfEmpty()
                           join cu in _appContext.Currency on t.CurrencyId equals cu.CurrencyId into curr
                           from cu in curr.DefaultIfEmpty()
                           join di in _appContext.Discount on t.DiscountId equals di.DiscountId into dis
                           from di in dis.DefaultIfEmpty()
                           join vc in _appContext.VendorClassification on t.VendorClassificationId equals vc.VendorClassificationId into vcd
                           from vc in vcd.DefaultIfEmpty()
                           join vca in _appContext.VendorCapabiliy on t.capabilityId equals vca.VendorCapabilityId into vcad
                           from vca in vcad.DefaultIfEmpty()
                           where t.VendorId == vendorId
                           select new
                           {
                               t.AuditVendorId,
                               t.VendorId,
                               t,
                               t.VendorEmail,
                               t.IsActive,
                               Address1 = ad.Line1,
                               Address2 = ad.Line2,
                               Address3 = ad.Line3,
                               t.VendorCode,
                               t.VendorName,
                               ad.City,
                               ad.StateOrProvince,
                               vt.Description,
                               t.CreatedDate,
                               t.CreatedBy,
                               t.UpdatedBy,
                               t.UpdatedDate,
                               ad.AddressId,
                               ad.Country,
                               ad.PostalCode,
                               t.EDI,
                               t.EDIDescription,
                               t.CreditLimit,
                               CurrencyId = cu.Code,
                               CreditTermsId = ct.Name,
                               DiscountLevel = di == null ? 0 : di.DiscontValue,
                               vc.ClassificationName,
                               VendorCapabilityName = vca.capabilityDescription,
                               VendorPhoneContact = t.VendorPhone + " - " + t.VendorPhoneExt
                           }).OrderByDescending(c => c.AuditVendorId).ToList();

            return retData;


        }
        public IEnumerable<Vendor> GetVendorsLite()
        {
            return _appContext.Vendor.Where(v => v.IsActive == true && v.IsDeleted == false).Select(v => new Vendor { VendorId = v.VendorId, VendorName = v.VendorName }).OrderBy(c => c.VendorName).ToList();
        }

        public IEnumerable<object> GetVendorListDetails(bool isActive)
        {

            {
                var data = (from t in _appContext.Vendor
                            join ad in _appContext.Address on t.AddressId equals ad.AddressId
                            join cont in _appContext.Countries on Convert.ToInt32(ad.Country) equals cont.countries_id into contr
                            from cont in contr.DefaultIfEmpty()
                            join vt in _appContext.VendorType on t.VendorTypeId equals vt.VendorTypeId into vtt
                            from vt in vtt.DefaultIfEmpty()
                            join ct in _appContext.CreditTerms on t.CreditTermsId equals ct.CreditTermsId into crd
                            from ct in crd.DefaultIfEmpty()
                            join cu in _appContext.Currency on t.CurrencyId equals cu.CurrencyId into curr
                            from cu in curr.DefaultIfEmpty()
                            join di in _appContext.Discount on t.DiscountId equals di.DiscountId into dis
                            from di in dis.DefaultIfEmpty()
                            join vc in _appContext.VendorClassification on t.VendorClassificationId equals vc.VendorClassificationId into vcd
                            from vc in vcd.DefaultIfEmpty()
                            join vca in _appContext.VendorCapabiliy on t.capabilityId equals vca.VendorCapabilityId into vcad
                            from vca in vcad.DefaultIfEmpty()
                            where t.IsDeleted != true
                            && t.IsActive == (isActive == true ? true : t.IsActive)
                            select new
                            {
                                t.VendorId,
                                t,
                                t.VendorEmail,
                                t.IsActive,
                                Address1 = ad.Line1,
                                Address2 = ad.Line2,
                                Address3 = ad.Line3,
                                t.VendorCode,
                                t.VendorName,
                                ad.City,
                                ad.StateOrProvince,
                                vt.Description,
                                t.CreatedDate,
                                t.CreatedBy,
                                t.UpdatedBy,
                                t.UpdatedDate,
                                ad.AddressId,
                                ad.Country,
                                CountryName = cont.countries_name,
                                ad.PostalCode,
                                t.EDI,
                                t.EDIDescription,
                                t.CreditLimit,
                                CurrencyId = cu.Code,
                                CreditTermsId = ct.Name,
                                DiscountLevel = di == null ? 0 : di.DiscontValue,
                                vc.ClassificationName,
                                VendorCapabilityName = vca.capabilityDescription,
                                VendorPhoneContact = t.VendorPhone + " - " + t.VendorPhoneExt,
                                VendorClassifications = string.Join(",", _appContext.Vendor
                                .Join(_appContext.ClassificationMapping,
                                v => v.VendorId,
                                mp => mp.ReferenceId,
                                (v, mp) => new { v, mp })
                                 .Join(_appContext.VendorClassification,
                                  mp1 => mp1.mp.ClasificationId,
                                  vc => vc.VendorClassificationId,
                                (mp1, vc) => new { mp1, vc })
                                .Where(p => p.mp1.v.VendorId == t.VendorId)
                                .Select(p => p.vc.ClassificationName)),
                                IntegrationPortalNames = string.Join(",", _appContext.Vendor
                                .Join(_appContext.IntegrationPortalMapping,
                                v => v.VendorId,
                                mp => mp.ReferenceId,
                                (v, mp) => new { v, mp })
                               .Join(_appContext.IntegrationPortal,
                                mp1 => mp1.mp.ReferenceId,
                                inte => Convert.ToInt64(inte.IntegrationPortalId),
                              (mp1, inte) => new { mp1, inte })
                              .Where(p => p.mp1.v.VendorId == t.VendorId)
                               .Select(p => p.inte.Description)),

                            })/*.Where(t => t.IsActive == true)*/.OrderByDescending(c => c.CreatedDate).ToList();
                return data;

                //old query
                /*
                 var data = (from t in _appContext.Vendor
                                  join ad in _appContext.Address on t.AddressId equals ad.AddressId
                                  join vt in _appContext.VendorType on t.VendorTypeId equals vt.VendorTypeId
                                  join currency in _appContext.Currency on t.CurrencyId equals currency.CurrencyId into curr
                            from currency in curr.DefaultIfEmpty()
                            join creditterms in _appContext .CreditTerms on t.CreditTermsId equals creditterms.CreditTermsId into cred
                            from creditterms in cred.DefaultIfEmpty()
                            join vendorclassification in _appContext.VendorClassification on t.VendorClassificationId equals vendorclassification.VendorClassificationId into venclass
                            from vendorclassification in venclass.DefaultIfEmpty()
                            where t.IsDelete==true || t.IsDelete==null
                                 // select new { t, ad, vt }).ToList();
                            select new { t.CreditTermsId,t.VendorId,t,t.VendorEmail,t.IsActive,
                                creditterms,
                                currency,
                                vendorclassification,
                                vendorclassification.ClassificationName,
                                Address1 =ad.Line1, Address2=ad.Line2, Address3=ad.Line3,t.VendorCode, t.VendorName, ad.City, ad.StateOrProvince,vt.Description ,t.CreatedDate,t.CreatedBy,t.UpdatedBy,t.UpdatedDate,ad.AddressId,ad.Country,ad.PostalCode}).ToList();
                return data;
                 */

            }

        }

        public IEnumerable<object> GetVendorListByName(string Vendorname)
        {

            {
                var data = (from t in _appContext.Vendor
                            join ad in _appContext.Address on t.AddressId equals ad.AddressId
                            join vt in _appContext.VendorType on t.VendorTypeId equals vt.VendorTypeId
                            where t.IsActive == true && t.VendorName == Vendorname
                            // select new { t, ad, vt }).ToList();
                            select new
                            {
                                t.VendorId,
                                t,
                                t.VendorEmail,
                                t.IsActive,
                                Address1 = ad.Line1,
                                Address2 = ad.Line2,
                                Address3 = ad.Line3,
                                t.VendorCode,
                                t.VendorName,
                                ad.City,
                                ad.StateOrProvince,
                                t.VendorPhone,
                                //ad.PostalCode,
                                t.VendorClassificationId,
                                t.VendorContractReference,
                                t.IsPreferredVendor,
                                t.LicenseNumber,
                                t.VendorURL,
                                t.Parent,
                                t.CreatedDate,
                                postal = ad.PostalCode,
                                t.CreatedBy,
                                t.UpdatedBy,
                                t.UpdatedDate,
                                ad.AddressId,
                                ad.Country,
                                ad.PostalCode,

                            }).ToList();
                return data;

            }

        }
        public IEnumerable<object> GetVendorWithid(long vendorId)
        {

            {
                var data = (from t in _appContext.Vendor
                            join ad in _appContext.Address on t.AddressId equals ad.AddressId
                            join vt in _appContext.VendorType on t.VendorTypeId equals vt.VendorTypeId

                            where t.VendorId == vendorId
                            // select new { t, ad, vt }).ToList();
                            select new
                            {
                                t.VendorId,
                                t,
                                t.VendorEmail,
                                Address1 = ad.Line1,
                                Address2 = ad.Line2,
                                Address3 = ad.Line3,
                                t.VendorCode,
                                t.VendorName,
                                ad.City,
                                ad.StateOrProvince,
                                vt.Description,
                                t.CreatedDate,
                                t.CreatedBy,
                                t.UpdatedBy,
                                t.UpdatedDate,
                                ad.AddressId,
                                ad.Country,
                                ad.PostalCode
                            }).ToList();
                return data;

            }

        }

        public IEnumerable<object> GetvendorPurchaseOrderList(long id)
        {

            {

                var data = (from po in _appContext.PurchaseOrder
                            join pop in _appContext.PurchaseOrderPart on po.PurchaseOrderId equals pop.PurchaseOrderId into purpart
                            from pop in purpart.DefaultIfEmpty()
                            join v in _appContext.Vendor on po.VendorId equals v.VendorId into ve
                            from v in ve.DefaultIfEmpty()
                            join im in _appContext.ItemMaster on pop.ItemMasterId equals im.ItemMasterId into item
                            from im in item.DefaultIfEmpty()
                                //join p in _appContext.Part on im.PartId equals p.PartId into part
                                //from p in part.DefaultIfEmpty()
                            join mf in _appContext.Manufacturer on im.ManufacturerId equals mf.ManufacturerId into gj
                            from x in gj.DefaultIfEmpty()

                            join uom in _appContext.UnitOfMeasure on im.PurchaseUnitOfMeasureId equals uom.UnitOfMeasureId into um
                            from uom in um.DefaultIfEmpty()

                            join sto in _appContext.StockLine on pop.PurchaseOrderId equals sto.PurchaseOrderId into sto
                            from st in sto.DefaultIfEmpty()

                            join mf in _appContext.Manufacturer on im.ManufacturerId equals mf.ManufacturerId
                            where po.PurchaseOrderId == id

                            select new
                            {
                                v.VendorName,
                                v.VendorCode,
                                po.CreditLimit,
                                po.Terms,
                                po.BillToAddressId,
                                po.ShipToAddressId,
                                po.PurchaseOrderId,
                                po.PurchaseOrderNumber,
                                po.ReferenceId,
                                po.PriorityId,
                                po.RequestedBy,
                                po.OpenDate,
                                po.ApproverId,
                                po.DeferredReceiver,
                                po.Resale,
                                po.DateApproved,
                                po.NeedByDate,
                                pop.NonInventory,
                                pop.POPartSplitAddress1,
                                pop.POPartSplitAddress2,
                                pop.POPartSplitAddress3,
                                pop.POPartSplitCity,
                                pop.POPartSplitPostalCode,
                                pop.POPartSplitState,
                                pop.POPartSplitUserTypeId,
                                pop.QuantityOrdered,
                                po.MasterCompanyId,
                                po.StatusId,
                                po.EmployeeId,
                                po.VendorId,
                                po.VendorContactId,
                                po.ShipToCompanyId,
                                po.ShipViaAccountId,
                                pop,
                                im.ItemMasterId,
                                im.PartNumber,
                                im.PartDescription,
                                im.ItemTypeId,
                                im.ManufacturerId,
                                x.Name,
                                im.GLAccountId,
                                //im.SerialNumber,
                                //pop.ConditionCode,
                                //pop.UOMId,
                                pop.UnitCost,
                                pop.PurchaseOrderPartRecordId,
                                po.ShipToUserType,
                                po.ShipToUserId,
                                po.ShipToContactId,
                                po.ShipToMemo,
                                po.BillToUserType,
                                po.BillToUserId,
                                po.BillToContactName,
                                po.BillToMemo,
                                uom.ShortName,
                                v.VendorContact,
                                v.VendorContractReference,
                                im.Manufacturer,
                                im.PMA,
                                im.DER,
                                im.SalesDiscountPercent,
                                purchaseOrderPartPurchaseOrderId = pop.PurchaseOrderId
                                // sto

                            }).ToList();

                return data;

            }

        }



        public IEnumerable<object> GetPayments()
        {
            return _appContext.InternationalWirePayment.OrderByDescending(c => c.InternationalWirePaymentId);
        }

        public IEnumerable<object> Getvendorrepairunit(long vendorId)
        {

            {


                var data = (from po in _appContext.RepairOrder
                            join pop in _appContext.RepairOrderPart on po.RepairOrderId equals pop.RepairOrderId into purpart
                            from pop in purpart.DefaultIfEmpty()
                            join v in _appContext.Vendor on po.VendorId equals v.VendorId into ve
                            from v in ve.DefaultIfEmpty()
                            join im in _appContext.ItemMaster on pop.ItemMasterId equals im.ItemMasterId into item
                            from im in item.DefaultIfEmpty()
                                //join p in _appContext.Part on im.PartId equals p.PartId into part
                                //from p in part.DefaultIfEmpty()

                            join mf in _appContext.Manufacturer on im.ManufacturerId equals mf.ManufacturerId into gj
                            from x in gj.DefaultIfEmpty()

                            join uom in _appContext.UnitOfMeasure on im.PurchaseUnitOfMeasureId equals uom.UnitOfMeasureId into um
                            from uom in um.DefaultIfEmpty()
                                //join mf in _appContext.Manufacturer on im.ManufacturerId equals mf.ManufacturerId
                            where po.RepairOrderId == vendorId

                            select new
                            {
                                v.VendorName,
                                v.VendorCode,
                                po.CreditLimit,
                                //po.Terms,
                                po.BillToAddressId,
                                po.ShipToAddressId,
                                po.RepairOrderId,
                                po.RepairOrderNumber,
                                //po.ReferenceId,
                                po.PriorityId,
                                //po.RequestedBy,
                                //po.DateRequested,
                                //po.Approver,
                                po.DeferredReceiver,
                                po.Resale,
                                //po.DateApprovied,
                                po.NeedByDate,
                                //pop.NeedByDate,
                                //pop.NonInventory,
                                //pop.POPartSplitAddress1,
                                //pop.POPartSplitAddress2,
                                //pop.POPartSplitAddress3,
                                //pop.POPartSplitCity,
                                //pop.POPartSplitPostalCode,
                                //pop.POPartSplitState,
                                //pop.POPartSplitUserName,
                                //pop.POPartSplitUserTypeId,
                                //pop.QuantityOrdered,
                                //po.MasterCompanyId,
                                po.StatusId,
                                //po.EmployeeId,
                                po.VendorId,
                                po.VendorContactId,
                                //po.ShipToCompanyId,
                                //po.ShipViaAccountId,
                                pop,
                                im.ItemMasterId,
                                im.PartNumber,
                                im.PartDescription,
                                im.ItemTypeId,
                                im.ManufacturerId,
                                x.Name,
                                im.GLAccountId,
                                //pop.ConditionCode,
                                //pop.UOMId,
                                pop.UnitCost,
                                pop.RepairOrderPartRecordId,
                                //po.ShipToUserType,
                                //po.ShipToUserName,
                                //po.ShipToContactName,
                                po.ShipToMemo,
                                //po.BillToUserType,
                                //po.BillToUserName,
                                //po.BillToContactName,
                                po.BillToMemo,
                                uom.ShortName



                            }).ToList();
                return data;

            }

        }


        public IEnumerable<object> GetmanagementSiteList(long companyId)
        {
            {


                var data = (from ms in _appContext.ManagementStructure
                            join msite in _appContext.ManagementSite on ms.ManagementStructureId equals msite.ManagementStructureId
                            join site in _appContext.Site on msite.SiteId equals site.SiteId
                            join ad in _appContext.Address on site.AddressId equals ad.AddressId

                            where ms.ManagementStructureId == companyId

                            select new
                            {
                                siteName = site.Name,
                                site.SiteId,
                                ms.ManagementStructureId,
                                msite.ManagementSiteId,
                                ad.AddressId,

                                ad.City,
                                ad.Country,
                                ad.Line1,
                                ad.Line2,
                                ad.Line3,
                                ad.PostalCode,


                            }).ToList();
                return data;

            }


        }

        public IEnumerable<object> vendorCapabilityTypeGet(long id)
        {

            {
                var data = (from vc in _appContext.vendorCapabilityType
                            where vc.VendorCapabilityId == id

                            select new
                            {
                                vc.VendorCapabilityId,
                                vc.VendorCapabilityTypeId,
                                vc.CapabilityTypeId

                            }).ToList();
                return data;
            }
        }

        public IEnumerable<object> getVendorCapabilityData(long id)
        {

            {
                var data = (from vc in _appContext.ATASubChapter
                            where vc.ATAChapterId == id

                            select new
                            {
                                vc.ATASubChapterCode,
                                vc.Description,
                                vc.ATASubChapterId,
                                vc.ATAChapterId

                            }).ToList();
                return data;
            }
        }

        public IEnumerable<object> vendorAircraftManufacturerGet(long id)
        {

            {
                var data = (from vc in _appContext.vendorCapabilityAircraftType
                            where vc.VendorCapabilityId == id

                            select new
                            {
                                vc.VendorCapabilityId,
                                vc.VendorCapabilityAircraftTypeId,
                                vc.AircraftTypeId,

                            }).ToList();
                return data;
            }
        }

        public IEnumerable<object> vendorAircraftManufacturerModelGet(long id)
        {

            {
                var data = (from vc in _appContext.vendorCapabiltiyAircraftModel
                            where vc.VendorCapabilityId == id

                            select new
                            {
                                vc.VendorCapabilityId,
                                vc.VendorCapabilityAircraftModelId,
                                vc.AircraftModelId,
                                vc.DashNumber,
                                vc.isSelected

                            }).ToList();
                return data;
            }
        }

        public long CreateVendorBillingAddress(VendorBillingAddress billingAddress)
        {
            try
            {
                CommonRepository commonRepository = new CommonRepository(_appContext);

                Address address = new Address();

                address.City = billingAddress.City;
                address.Country = billingAddress.Country;



                address.Line1 = billingAddress.Address1;
                address.Line2 = billingAddress.Address2;
                address.Line3 = billingAddress.Address3;
                address.MasterCompanyId = billingAddress.MasterCompanyId;
                address.PostalCode = billingAddress.PostalCode;
                address.StateOrProvince = billingAddress.StateOrProvince;

                address.IsActive = true;
                address.UpdatedDate = address.CreatedDate = DateTime.Now;
                address.CreatedBy = billingAddress.CreatedBy;
                address.UpdatedBy = billingAddress.UpdatedBy;

                if (billingAddress.AddressId > 0)
                {
                    address.CreatedDate = billingAddress.CreatedDate;
                    address.AddressId = billingAddress.AddressId;
                    _appContext.Address.Update(address);
                }
                else
                {
                    address.CreatedDate = DateTime.Now;
                    _appContext.Address.Add(address);
                }

                _appContext.SaveChanges();


                billingAddress.AddressId = Convert.ToInt64(address.AddressId);

                billingAddress.UpdatedDate = DateTime.Now;
                billingAddress.IsActive = true;
                billingAddress.IsDeleted = false;
                //billingAddress.IsPrimary = false;
                if (billingAddress.IsPrimary == null)
                {
                    billingAddress.IsPrimary = false;
                }
                else
                {
                    billingAddress.IsPrimary = billingAddress.IsPrimary;
                }


                if (billingAddress.IsPrimary == true)
                {
                    var vendorConcatData = _appContext.VendorBillingAddress.Where(p => p.VendorId == billingAddress.VendorId).ToList();

                    foreach (var objContactdata in vendorConcatData)
                    {
                        objContactdata.IsPrimary = false;
                        _appContext.VendorBillingAddress.Update(objContactdata);

                        _appContext.SaveChanges();
                        commonRepository.ShippingBillingAddressHistory(Convert.ToInt64(objContactdata.VendorId), Convert.ToInt32(ModuleEnum.Vendor), Convert.ToInt64(objContactdata.VendorBillingAddressId), Convert.ToInt32(AddressTypeEnum.BillingAddress), objContactdata.UpdatedBy);
                    }
                }

                if (billingAddress.VendorBillingAddressId > 0)
                {
                    _appContext.VendorBillingAddress.Update(billingAddress);
                    _appContext.SaveChanges();

                }
                else
                {
                    billingAddress.CreatedDate = DateTime.Now;
                    _appContext.VendorBillingAddress.Add(billingAddress);
                    _appContext.SaveChanges();


                    commonRepository.ShippingBillingAddressHistory(Convert.ToInt64(billingAddress.VendorId), Convert.ToInt32(ModuleEnum.Vendor), Convert.ToInt64(billingAddress.VendorBillingAddressId), Convert.ToInt32(AddressTypeEnum.BillingAddress), billingAddress.UpdatedBy);
                }

                return billingAddress.VendorBillingAddressId;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public void UpdateVendorBillingAddress(VendorBillingAddress billingAddress)
        {
            try
            {
                billingAddress.UpdatedDate = DateTime.Now;
                _appContext.VendorBillingAddress.Update(billingAddress);
                _appContext.SaveChanges();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public void DeleteVendorBillingAddress(long billingAddressId, string updatedBy)
        {
            try
            {
                VendorBillingAddress billingAddress = new VendorBillingAddress();
                billingAddress.VendorBillingAddressId = billingAddressId;
                billingAddress.IsDeleted = true;
                billingAddress.UpdatedDate = DateTime.Now;
                billingAddress.UpdatedBy = updatedBy;

                _appContext.VendorBillingAddress.Attach(billingAddress);

                _appContext.Entry(billingAddress).Property(p => p.IsDeleted).IsModified = true;
                _appContext.Entry(billingAddress).Property(p => p.UpdatedDate).IsModified = true;
                _appContext.Entry(billingAddress).Property(p => p.UpdatedBy).IsModified = true;

                _appContext.SaveChanges();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public void DeleteVendorShippingAddress(long shippingAddressId, string updatedBy)
        {
            try
            {
                //var vsha = _appContext.VendorShippingAddress.Where(x => x.VendorShippingAddressId == shippingAddressId).FirstOrDefault();
                //if (vsha != null)
                //{
                //    _appContext.VendorShippingAddress.Remove(vsha);
                //    _appContext.SaveChanges();
                //}
                VendorShippingAddress shippingAddress = new VendorShippingAddress();
                shippingAddress.VendorShippingAddressId = shippingAddressId;
                shippingAddress.UpdatedDate = DateTime.Now;
                shippingAddress.UpdatedBy = updatedBy;
                shippingAddress.IsDeleted = true;

                _appContext.VendorShippingAddress.Attach(shippingAddress);

                _appContext.Entry(shippingAddress).Property(p => p.IsDeleted).IsModified = true;
                _appContext.Entry(shippingAddress).Property(p => p.UpdatedDate).IsModified = true;
                _appContext.Entry(shippingAddress).Property(p => p.UpdatedBy).IsModified = true;

                _appContext.SaveChanges();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public bool DeleteVendorShippingViaAddress(long vendorShippingId, string updatedBy)
        {
            bool result = false;
            try
            {

                var vendorShippingDetails = _appContext.VendorShipping.Where(x => x.VendorShippingId == vendorShippingId).FirstOrDefault();
                if (vendorShippingDetails != null)
                {
                    vendorShippingDetails.UpdatedBy = updatedBy;
                    vendorShippingDetails.UpdatedDate = DateTime.Now;
                    vendorShippingDetails.IsDeleted = true;
                    _appContext.VendorShipping.Update(vendorShippingDetails);
                    _appContext.SaveChanges();
                    result = true;
                }
                return result;
            }
            catch (Exception)
            {

                throw;
            }

        }

        public void VendorBillingAddressStatus(long billingAddressId, bool status, string updatedBy)
        {
            try
            {
                CommonRepository commonRepository = new CommonRepository(_appContext);

                VendorBillingAddress billingAddress = new VendorBillingAddress();
                billingAddress.VendorBillingAddressId = billingAddressId;
                billingAddress.IsActive = status;
                billingAddress.UpdatedDate = DateTime.Now;
                billingAddress.UpdatedBy = updatedBy;

                _appContext.VendorBillingAddress.Attach(billingAddress);

                _appContext.Entry(billingAddress).Property(p => p.IsActive).IsModified = true;
                _appContext.Entry(billingAddress).Property(p => p.UpdatedDate).IsModified = true;
                _appContext.Entry(billingAddress).Property(p => p.UpdatedBy).IsModified = true;

                _appContext.SaveChanges();
                var data = (from vba in _appContext.VendorBillingAddress

                            where vba.VendorBillingAddressId == billingAddressId
                            select new
                            {
                                vba.VendorId
                            }
                            ).FirstOrDefault();
                commonRepository.ShippingBillingAddressHistory(Convert.ToInt64(data.VendorId), Convert.ToInt32(ModuleEnum.Vendor), Convert.ToInt64(billingAddress.VendorBillingAddressId), Convert.ToInt32(AddressTypeEnum.BillingAddress), billingAddress.UpdatedBy);

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public IEnumerable<object> GetVendorBillingAddress()
        {
            try
            {
                var list = (from vba in _appContext.VendorBillingAddress
                            join ad in _appContext.Address on vba.AddressId equals ad.AddressId
                            where vba.IsDeleted == false
                            select new
                            {
                                vba.SiteName,
                                ad.Line1,
                                ad.Line2,
                                ad.Line3,
                                ad.City,
                                ad.StateOrProvince,
                                ad.PostalCode,
                                ad.Country,
                                vba.CreatedDate
                            }).OrderByDescending(p => p.CreatedDate).ToList();
                return list;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public IEnumerable<object> GetVendorBillingSiteNames(long vendorId)
        {
            try
            {
                var list = (from vba in _appContext.VendorBillingAddress
                            where vba.IsDeleted == false && vba.VendorId == vendorId
                            select new
                            {
                                vba.VendorBillingAddressId,
                                vba.SiteName
                            }).ToList();
                return list;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public object VendorBillingAddressById(long billingAddressId)
        {
            try
            {
                var data = (from vba in _appContext.VendorBillingAddress
                            join ad in _appContext.Address on vba.AddressId equals ad.AddressId
                            where vba.VendorBillingAddressId == billingAddressId
                            select new
                            {
                                vba,
                                ad.City,
                                ad.Country,
                                ad.Line1,
                                ad.Line2,
                                ad.Line3,
                                ad.PostalCode,
                                ad.StateOrProvince
                            }
                          ).FirstOrDefault();
                return data;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        //get Vendor Capability List



        //Task<Tuple<bool, string[]>> CreateRoleAsync(ApplicationRole role, IEnumerable<string> claims);

        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;
        public IEnumerable<object> getVendorByID(long vendorId, bool isDefaultContact)
        {
            var data = (from it in _appContext.VendorContact
                        where it.VendorId == vendorId && it.IsActive == true && it.IsDefaultContact == isDefaultContact
                        select new
                        {
                            it.VendorContactId,
                            it.VendorId,
                            it.ContactId,
                            it.IsDefaultContact,
                            it.MasterCompanyId,
                            it.CreatedDate,
                            it.CreatedBy,
                            it.UpdatedDate,
                            it.UpdatedBy,
                            it.IsActive
                        }).ToList();
            return data;
        }

        public IEnumerable<Vendor> getVendorsForDropdown()
        {
            return _appContext.Vendor.Where(x =>
            (x.IsActive != null && x.IsActive == true) &&
            (x.IsDeleted == null || x.IsDeleted == false));
        }

        public IEnumerable<object> GetVendorBillingAddressAudit(long vendorId, long vendorBillingaddressId)
        {
            try
            {
                var list = (from vba in _appContext.VendorBillingAddressAudit
                            join ad in _appContext.Address on vba.AddressId equals ad.AddressId
                            join cont in _appContext.Countries on Convert.ToInt32(ad.Country) equals cont.countries_id into country
                            from cont in country.DefaultIfEmpty()
                            where vba.VendorId == vendorId && vba.VendorBillingAddressId == vendorBillingaddressId
                            select new
                            {
                                vba.SiteName,
                                vba.AuditVendorBillingAddressId,
                                vba.VendorBillingAddressId,
                                ad.Line1,
                                ad.Line2,
                                ad.Line3,
                                ad.City,
                                ad.StateOrProvince,
                                ad.PostalCode,
                                ad.Country,
                                CountryName = cont.countries_name,
                                vba.CreatedDate,
                                vba.UpdatedBy,
                                vba.UpdatedDate,
                                vba.CreatedBy,
                                vba.IsActive
                            }).OrderByDescending(p => p.AuditVendorBillingAddressId).ToList();
                return list;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public IEnumerable<object> GetVendorPOMemoList(long vendorId)
        {
            try
            {
                var list = (from po in _appContext.PurchaseOrder
                            where po.IsDeleted == false && po.IsActive == true && po.VendorId == vendorId
                            select new
                            {
                                Module = "PO",
                                OrderNumberId = po.PurchaseOrderId,
                                OrderNumber = po.PurchaseOrderNumber,
                                po.Notes
                            }).Distinct().ToList();
                return list;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public IEnumerable<object> GetVendorROMemoList(long vendorId)
        {
            try
            {
                var list = (from ro in _appContext.RepairOrder
                            where ro.IsDeleted == false && ro.IsActive == true && ro.VendorId == vendorId
                            select new
                            {
                                Module = "RO",
                                OrderNumberId = ro.RepairOrderId,
                                OrderNumber = ro.RepairOrderNumber,
                                Notes = ro.RoMemo
                            }).Distinct().ToList();
                return list;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public void UpdateVendorMemoText(long id, string type, string memoText, string updatedBy)
        {
            if (type == "PO")
            {
                PurchaseOrder purchaseOrder = new PurchaseOrder();
                purchaseOrder.PurchaseOrderId = id;
                purchaseOrder.UpdatedDate = DateTime.Now;
                purchaseOrder.UpdatedBy = updatedBy;
                purchaseOrder.Notes = memoText;

                _appContext.PurchaseOrder.Attach(purchaseOrder);
                _appContext.Entry(purchaseOrder).Property(x => x.Notes).IsModified = true;
                _appContext.Entry(purchaseOrder).Property(x => x.UpdatedDate).IsModified = true;
                _appContext.Entry(purchaseOrder).Property(x => x.UpdatedBy).IsModified = true;
                _appContext.SaveChanges();
            }
            else if (type == "RO")
            {
                RepairOrder repairOrder = new RepairOrder();
                repairOrder.RepairOrderId = id;
                repairOrder.UpdatedDate = DateTime.Now;
                repairOrder.UpdatedBy = updatedBy;
                repairOrder.RoMemo = memoText;

                _appContext.RepairOrder.Attach(repairOrder);
                _appContext.Entry(repairOrder).Property(x => x.RoMemo).IsModified = true;
                _appContext.Entry(repairOrder).Property(x => x.UpdatedDate).IsModified = true;
                _appContext.Entry(repairOrder).Property(x => x.UpdatedBy).IsModified = true;
                _appContext.SaveChanges();
            }
        }

        public VendorDocumentDetails GetVendorDocumentDetailById(long id)
        {
            try
            {
                return _appContext.VendorDocumentDetails.Where(p => p.IsActive == true && p.VendorDocumentDetailId == id).FirstOrDefault();

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public IEnumerable<object> GetVendorProcessList(int companyId)
        {
            var list = (from m in _appContext.Master1099
                        where m.MasterCompanyId == companyId && m.IsDeleted != true
                        select m).Distinct().ToList();
            return list;

        }

        public List<VendorDocumentDetailsAudit> GetVendorDocumentDetailsAudit(long id)
        {
            try
            {
                return _appContext.VendorDocumentDetailsAudit.Where(p => p.IsActive == true && p.VendorDocumentDetailId == id).OrderByDescending(p => p.CreatedDate).ToList();

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public IEnumerable<object> GetVendorCapabilityAudit(long VendorCapabilityId, long VendorId)
        {
            try
            {
                var list = (from vca in _appContext.VendorCapabiliyAudit
                            join v in _appContext.Vendor on vca.VendorId equals v.VendorId
                            into vcc
                            from v in vcc.DefaultIfEmpty()
                            join vct in _appContext.vendorCapabilityType on vca.VendorCapabilityId equals vct.VendorCapabilityId
                            into vctt
                            from vct in vctt.DefaultIfEmpty()
                            join vcat in _appContext.capabilityType on Convert.ToInt32(vca.CapabilityId) equals vcat.CapabilityTypeId
                            into vcatt
                            from vcat in vcatt.DefaultIfEmpty()

                            join itm in _appContext.ItemMaster on vca.ItemMasterId equals itm.ItemMasterId into itmm
                            from itm in itmm.DefaultIfEmpty()
                            where vca.VendorCapabilityId == VendorCapabilityId && vca.VendorId == VendorId
                            select new
                            {
                                vca.AuditVendorCapabilityId,
                                v.VendorName,
                                v.VendorCode,
                                vca.VendorCapabilityId,
                                vca.VendorId,
                                vca.VendorRanking,
                                vca.PMA_DER,
                                vca.ItemMasterId,
                                vca.TAT,
                                vca.Cost,
                                vca.AlternatePartId,
                                vca.ATAChapterId,
                                vca.ATASubchapterId,
                                vca.Memo,
                                vca.CreatedDate,
                                vca.UpdatedDate,
                                vca.CreatedBy,
                                vca.UpdatedBy,
                                vca.capabilityDescription,
                                vca.IsActive,
                                CapabilityType = vcat.Description,
                                itm.PartNumber,
                                itm.PartDescription

                            }).OrderByDescending(p => p.AuditVendorCapabilityId).ToList();
                return list;
            }
            catch (Exception)
            {

                throw;
            }
        }
        public IEnumerable<object> GetAllBillingAddressDetails(long id)
        {
            var data = (from v in _appContext.VendorBillingAddress
                        join ad in _appContext.Address on v.AddressId equals ad.AddressId
                        join cont in _appContext.Countries on Convert.ToInt32(ad.Country) equals cont.countries_id into country
                        from cont in country.DefaultIfEmpty()
                        where (v.IsDeleted == false && (v.VendorId == id))
                        select new
                        {
                            Address1 = ad.Line1,
                            Address2 = ad.Line2,
                            Address3 = ad.Line3,
                            ad.AddressId,
                            ad.Country,
                            CountryName = cont.countries_name,
                            ad.PostalCode,
                            ad.City,
                            ad.StateOrProvince,
                            v.SiteName,
                            v.VendorBillingAddressId,
                            v.CreatedDate,
                            v.UpdatedDate,
                            v.VendorId,
                            v.IsActive,
                            v.IsPrimary

                        }).ToList();
            return data;
        }

        public void VendorProcess1099Save(Master1099 vendorProcess1099)
        {
            vendorProcess1099.CreatedDate = DateTime.Now;
            vendorProcess1099.UpdatedDate = DateTime.Now;
            vendorProcess1099.IsDeleted = false;
            if (vendorProcess1099.Master1099Id > 0)
            {
                _appContext.Master1099.Attach(vendorProcess1099);
                _appContext.Entry(vendorProcess1099).Property(x => x.Description).IsModified = true;
                _appContext.Entry(vendorProcess1099).Property(x => x.Memo).IsModified = true;
                _appContext.Entry(vendorProcess1099).Property(x => x.UpdatedDate).IsModified = true;
                _appContext.Entry(vendorProcess1099).Property(x => x.UpdatedBy).IsModified = true;
                _appContext.Entry(vendorProcess1099).Property(x => x.IsActive).IsModified = true;

            }
            else
            {
                _appContext.Master1099.Add(vendorProcess1099);
            }
            _appContext.SaveChanges();
        }
        public void VendorProcess1099StatusUpdate(long id, bool status, string updatedBy)
        {
            Master1099 vMaster1099 = new Master1099();
            vMaster1099.Master1099Id = id;
            vMaster1099.UpdatedDate = DateTime.Now;
            vMaster1099.UpdatedBy = updatedBy;
            vMaster1099.IsActive = status;

            _appContext.Master1099.Attach(vMaster1099);
            _appContext.Entry(vMaster1099).Property(x => x.IsActive).IsModified = true;
            _appContext.Entry(vMaster1099).Property(x => x.UpdatedDate).IsModified = true;
            _appContext.Entry(vMaster1099).Property(x => x.UpdatedBy).IsModified = true;
            _appContext.SaveChanges();
        }

        public void VendorShippingStatus(long id, bool status, string updatedBy)
        {
            VendorShipping vendorShipping = new VendorShipping();
            vendorShipping.VendorShippingId = id;
            vendorShipping.UpdatedDate = DateTime.Now;
            vendorShipping.UpdatedBy = updatedBy;
            vendorShipping.IsActive = status;

            _appContext.VendorShipping.Attach(vendorShipping);
            _appContext.Entry(vendorShipping).Property(x => x.IsActive).IsModified = true;
            _appContext.Entry(vendorShipping).Property(x => x.UpdatedDate).IsModified = true;
            _appContext.Entry(vendorShipping).Property(x => x.UpdatedBy).IsModified = true;
            _appContext.SaveChanges();
        }

        public void VendorProcess1099Delete(long id, string updatedBy)
        {
            Master1099 vMaster1099 = new Master1099();
            vMaster1099.Master1099Id = id;
            vMaster1099.UpdatedDate = DateTime.Now;
            vMaster1099.UpdatedBy = updatedBy;
            vMaster1099.IsDeleted = true;

            _appContext.Master1099.Attach(vMaster1099);
            _appContext.Entry(vMaster1099).Property(x => x.IsDeleted).IsModified = true;
            _appContext.Entry(vMaster1099).Property(x => x.UpdatedDate).IsModified = true;
            _appContext.Entry(vMaster1099).Property(x => x.UpdatedBy).IsModified = true;
            _appContext.SaveChanges();
        }

        public IEnumerable<object> GetVendorGeneralDocumentDetailById(long id, int moduleId)
        {
            var result = (from at in _appContext.Attachment
                          join atd in _appContext.AttachmentDetails on at.AttachmentId equals atd.AttachmentId
                          where at.ReferenceId == id && at.ModuleId == moduleId && atd.IsActive == true && atd.IsDeleted == false
                          select atd).ToList();

            return result;

        }
        public bool GetVendorGeneralDocumentDelete(long id, string updatedBy)
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


        public List<Master1099Audit> GetVendorProcess1099Audit(long id)
        {
            try
            {
                return _appContext.Master1099Audit.Where(p => p.Master1099Id == id).OrderByDescending(p => p.CreatedDate).ToList();

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public IEnumerable<object> GetVendorProcessListForFinance(int companyId)
        {
            var list = (from m in _appContext.Master1099
                        where m.MasterCompanyId == companyId && m.IsDeleted != true && m.IsActive == true
                        select m).Distinct().ToList();
            return list;

        }
        public IEnumerable<object> GetVendorProcessListFromTransaction(long vendorId)
        {
            var list = (from mst in _appContext.Master1099
                        join m in _appContext.VendorProcess1099 on mst.Master1099Id equals m.Master1099Id
                          into master
                        from m in master.DefaultIfEmpty()

                        where m.VendorId == vendorId && m.IsDeleted != true && m.IsActive == true
                        select new
                        {
                            m.VendorProcess1099Id,
                            m.Master1099Id,
                            m.IsDefaultCheck,
                            m.IsDefaultRadio,
                            mst.Description
                        }).Distinct().ToList();


            return list;

        }
        public VendorCapabilityAircraft VendorAircraft(VendorCapabilityAircraft vendorAircraftMapping)
        {
            vendorAircraftMapping.CreatedDate = DateTime.Now;
            vendorAircraftMapping.UpdatedDate = DateTime.Now;
            vendorAircraftMapping.IsActive = true;
            vendorAircraftMapping.IsDeleted = false;
            _appContext.VendorCapabilityAircraft.Add(vendorAircraftMapping);
            _appContext.SaveChanges();
            return vendorAircraftMapping;

        }

        public IEnumerable<object> VendorAircraftDataByCapsId(long vendorCapabilityId)
        {
            var data = (from vc in _appContext.VendorCapabilityAircraft
                            //join cy in _appContext.capabilityType on vc.CapabilityId equals cy.CapabilityTypeId into cyt
                            //from cy in cyt.DefaultIfEmpty()
                        join art in _appContext.AircraftType on vc.AircraftTypeId equals art.AircraftTypeId into artt
                        from art in artt.DefaultIfEmpty()
                        join arm in _appContext.AircraftModel on vc.AircraftModelId equals arm.AircraftModelId into armd
                        from arm in armd.DefaultIfEmpty()
                        join ard in _appContext.AircraftDashNumber on vc.DashNumberId equals ard.DashNumberId into ardd
                        from ard in ardd.DefaultIfEmpty()
                        where vc.VendorCapabilityId == vendorCapabilityId && vc.IsActive == true && vc.IsDeleted == false
                        select new
                        {
                            vc.VendorCapabilityAirCraftId,
                            vc.VendorCapabilityId,
                            vc.AircraftTypeId,
                            AircraftType = art.Description,
                            vc.AircraftModelId,
                            vc.DashNumberId,
                            AircraftModel = (arm.ModelName == null || arm.ModelName == "") ? "Unknown" : arm.ModelName,
                            DashNumber = (ard.DashNumber == null || ard.DashNumber == "") ? "Unknown" : ard.DashNumber,
                            //vc.PartNumber,                           
                            //vc.AircraftModel,
                            vc.Memo
                        }).ToList();
            return data;
        }

        public bool EditVendorAircraft(long id, string memo, string updatedBy)
        {
            bool result = false;
            try
            {
                VendorCapabilityAircraft airCraftDetails = new VendorCapabilityAircraft();
                airCraftDetails.VendorCapabilityAirCraftId = id;
                airCraftDetails.UpdatedDate = DateTime.Now;
                airCraftDetails.UpdatedBy = updatedBy;
                airCraftDetails.Memo = memo;

                _appContext.VendorCapabilityAircraft.Attach(airCraftDetails);
                _appContext.Entry(airCraftDetails).Property(x => x.Memo).IsModified = true;
                _appContext.Entry(airCraftDetails).Property(x => x.UpdatedDate).IsModified = true;
                _appContext.Entry(airCraftDetails).Property(x => x.UpdatedBy).IsModified = true;
                _appContext.SaveChanges();
                result = true;
            }
            catch (Exception)
            {
                throw;
            }

            return result;

        }
        public bool DeleteVendorAircraft(long id, string updatedBy)
        {
            bool result = false;
            try
            {
                VendorCapabilityAircraft airCraftDetails = new VendorCapabilityAircraft();
                airCraftDetails.VendorCapabilityAirCraftId = id;
                airCraftDetails.UpdatedDate = DateTime.Now;
                airCraftDetails.UpdatedBy = updatedBy;
                airCraftDetails.IsDeleted = true;

                _appContext.VendorCapabilityAircraft.Attach(airCraftDetails);
                _appContext.Entry(airCraftDetails).Property(x => x.IsDeleted).IsModified = true;
                _appContext.Entry(airCraftDetails).Property(x => x.UpdatedDate).IsModified = true;
                _appContext.Entry(airCraftDetails).Property(x => x.UpdatedBy).IsModified = true;
                _appContext.SaveChanges();
                result = true;
            }
            catch (Exception)
            {
                throw;
            }

            return result;

        }

        public IEnumerable<object> searchItemAircraftMappingDataByMultiTypeIdModelIDDashID(long VendorCapabilityId, string AircraftTypeId, string AircraftModelId, string DashNumberId, string memo)
        {
            long[] myAircraftTypeId = null;
            long[] myAircraftModelId = null;
            long[] myDashNumberId = null;
            if (AircraftTypeId != null && AircraftTypeId != "")
                myAircraftTypeId = AircraftTypeId.Split(',').Select(n => Convert.ToInt64(n)).ToArray();
            if (AircraftModelId != null && AircraftModelId != "")
                myAircraftModelId = AircraftModelId.Split(',').Select(y => Convert.ToInt64(y)).ToArray();
            if (DashNumberId != null && DashNumberId != "")
                myDashNumberId = DashNumberId.Split(',').Select(x => Convert.ToInt64(x)).ToArray();

            if (memo == null)
            {
                memo = string.Empty;
            }

            if (AircraftTypeId != null && AircraftModelId != null && myDashNumberId != null)
            {
                var data = (from it in _appContext.VendorCapabilityAircraft
                            join acy in _appContext.AircraftType on it.AircraftTypeId equals acy.AircraftTypeId into acyt
                            from acy in acyt.DefaultIfEmpty()
                            join acm in _appContext.AircraftModel on it.AircraftModelId equals acm.AircraftModelId into acmt
                            from acm in acmt.DefaultIfEmpty()
                            join acd in _appContext.AircraftDashNumber on it.DashNumberId equals acd.DashNumberId into acdt
                            from acd in acdt.DefaultIfEmpty()

                            where it.IsActive == true && it.VendorCapabilityId == VendorCapabilityId && myAircraftTypeId.Contains(it.AircraftTypeId) && myAircraftModelId.Contains(it.AircraftModelId) && myDashNumberId.Contains(it.DashNumberId) && it.Memo.Contains(memo) && it.IsDeleted != true
                            select new { it.ItemMasterId, it.PartNumber, it.AircraftTypeId, it.AircraftModelId, it.DashNumberId, DashNumber = (acd.DashNumber == null || acd.DashNumber == "") ? "Unknown" : acd.DashNumber, AircraftType = acy.Description, AircraftModel = (acm.ModelName == null || acm.ModelName == "") ? "Unknown" : acm.ModelName, it.Memo, it.MasterCompanyId, it.IsActive, it.IsDeleted }).ToList();
                var uniquedata = data.GroupBy(item => new { item.AircraftTypeId, item.AircraftModelId, item.DashNumberId }).Select(group => group.First()).ToList();
                return uniquedata;
            }
            else if (AircraftTypeId != null && AircraftModelId != null && myDashNumberId == null)
            {
                var data = (from it in _appContext.VendorCapabilityAircraft
                            join acy in _appContext.AircraftType on it.AircraftTypeId equals acy.AircraftTypeId into acyt
                            from acy in acyt.DefaultIfEmpty()
                            join acm in _appContext.AircraftModel on it.AircraftModelId equals acm.AircraftModelId into acmt
                            from acm in acmt.DefaultIfEmpty()
                            join acd in _appContext.AircraftDashNumber on it.DashNumberId equals acd.DashNumberId into acdt
                            from acd in acdt.DefaultIfEmpty()
                            where it.IsActive == true && it.VendorCapabilityId == VendorCapabilityId && myAircraftTypeId.Contains(it.AircraftTypeId) && myAircraftModelId.Contains(it.AircraftModelId) && it.Memo.Contains(memo) && it.IsDeleted != true
                            select new { it.ItemMasterId, it.PartNumber, it.AircraftTypeId, it.AircraftModelId, it.DashNumberId, DashNumber = (acd.DashNumber == null || acd.DashNumber == "") ? "Unknown" : acd.DashNumber, AircraftType = acy.Description, AircraftModel = (acm.ModelName == null || acm.ModelName == "") ? "Unknown" : acm.ModelName, it.Memo, it.MasterCompanyId, it.IsActive, it.IsDeleted }).ToList();
                var uniquedata = data.GroupBy(item => new { item.AircraftTypeId, item.AircraftModelId, item.DashNumberId }).Select(group => group.First()).ToList();
                return uniquedata;
            }
            else if (AircraftTypeId != null && myAircraftModelId == null && myDashNumberId == null)
            {
                var data = (from it in _appContext.VendorCapabilityAircraft
                            join acy in _appContext.AircraftType on it.AircraftTypeId equals acy.AircraftTypeId into acyt
                            from acy in acyt.DefaultIfEmpty()
                            join acm in _appContext.AircraftModel on it.AircraftModelId equals acm.AircraftModelId into acmt
                            from acm in acmt.DefaultIfEmpty()
                            join acd in _appContext.AircraftDashNumber on it.DashNumberId equals acd.DashNumberId into acdt
                            from acd in acdt.DefaultIfEmpty()
                            where it.IsActive == true && it.VendorCapabilityId == VendorCapabilityId && myAircraftTypeId.Contains(it.AircraftTypeId) && it.Memo.Contains(memo) && it.IsDeleted != true
                            select new { it.ItemMasterId, it.PartNumber, it.AircraftTypeId, it.AircraftModelId, it.DashNumberId, DashNumber = (acd.DashNumber == null || acd.DashNumber == "") ? "Unknown" : acd.DashNumber, AircraftType = acy.Description, AircraftModel = (acm.ModelName == null || acm.ModelName == "") ? "Unknown" : acm.ModelName, it.Memo, it.MasterCompanyId, it.IsActive, it.IsDeleted }).ToList();
                var uniquedata = data.GroupBy(item => new { item.AircraftTypeId, item.AircraftModelId, item.DashNumberId }).Select(group => group.First()).ToList();
                return uniquedata;
            }
            else if (AircraftTypeId != null && myAircraftModelId == null && myDashNumberId != null)
            {
                var data = (from it in _appContext.VendorCapabilityAircraft
                            join acy in _appContext.AircraftType on it.AircraftTypeId equals acy.AircraftTypeId into acyt
                            from acy in acyt.DefaultIfEmpty()
                            join acm in _appContext.AircraftModel on it.AircraftModelId equals acm.AircraftModelId into acmt
                            from acm in acmt.DefaultIfEmpty()
                            join acd in _appContext.AircraftDashNumber on it.DashNumberId equals acd.DashNumberId into acdt
                            from acd in acdt.DefaultIfEmpty()
                            where it.IsActive == true && it.VendorCapabilityId == VendorCapabilityId && myAircraftTypeId.Contains(it.AircraftTypeId) && myDashNumberId.Contains(it.DashNumberId) && it.Memo.Contains(memo) && it.IsDeleted != true
                            select new { it.ItemMasterId, it.PartNumber, it.AircraftTypeId, it.AircraftModelId, it.DashNumberId, DashNumber = (acd.DashNumber == null || acd.DashNumber == "") ? "Unknown" : acd.DashNumber, AircraftType = acy.Description, AircraftModel = (acm.ModelName == null || acm.ModelName == "") ? "Unknown" : acm.ModelName, it.Memo, it.MasterCompanyId, it.IsActive, it.IsDeleted }).ToList();
                var uniquedata = data.GroupBy(item => new { item.AircraftTypeId, item.AircraftModelId, item.DashNumberId }).Select(group => group.First()).ToList();
                return uniquedata;
            }
            else if (AircraftTypeId == null && AircraftModelId != null && myDashNumberId != null)
            {
                var data = (from it in _appContext.VendorCapabilityAircraft
                            join acy in _appContext.AircraftType on it.AircraftTypeId equals acy.AircraftTypeId into acyt
                            from acy in acyt.DefaultIfEmpty()
                            join acm in _appContext.AircraftModel on it.AircraftModelId equals acm.AircraftModelId into acmt
                            from acm in acmt.DefaultIfEmpty()
                            join acd in _appContext.AircraftDashNumber on it.DashNumberId equals acd.DashNumberId into acdt
                            from acd in acdt.DefaultIfEmpty()
                            where it.IsActive == true && it.VendorCapabilityId == VendorCapabilityId && myAircraftModelId.Contains(it.AircraftModelId) && myDashNumberId.Contains(it.DashNumberId) && it.Memo.Contains(memo) && it.IsDeleted != true
                            select new { it.ItemMasterId, it.PartNumber, it.AircraftTypeId, it.AircraftModelId, it.DashNumberId, DashNumber = (acd.DashNumber == null || acd.DashNumber == "") ? "Unknown" : acd.DashNumber, AircraftType = acy.Description, AircraftModel = (acm.ModelName == null || acm.ModelName == "") ? "Unknown" : acm.ModelName, it.Memo, it.MasterCompanyId, it.IsActive, it.IsDeleted }).ToList();
                var uniquedata = data.GroupBy(item => new { item.AircraftTypeId, item.AircraftModelId, item.DashNumberId }).Select(group => group.First()).ToList();
                return uniquedata;
            }
            else if (AircraftTypeId == null && AircraftModelId != null && myDashNumberId == null)
            {
                var data = (from it in _appContext.VendorCapabilityAircraft
                            join acy in _appContext.AircraftType on it.AircraftTypeId equals acy.AircraftTypeId into acyt
                            from acy in acyt.DefaultIfEmpty()
                            join acm in _appContext.AircraftModel on it.AircraftModelId equals acm.AircraftModelId into acmt
                            from acm in acmt.DefaultIfEmpty()
                            join acd in _appContext.AircraftDashNumber on it.DashNumberId equals acd.DashNumberId into acdt
                            from acd in acdt.DefaultIfEmpty()
                            where it.IsActive == true && it.VendorCapabilityId == VendorCapabilityId && myAircraftModelId.Contains(it.AircraftModelId) && it.Memo.Contains(memo) && it.IsDeleted != true
                            select new { it.ItemMasterId, it.PartNumber, it.AircraftTypeId, it.AircraftModelId, it.DashNumberId, DashNumber = (acd.DashNumber == null || acd.DashNumber == "") ? "Unknown" : acd.DashNumber, AircraftType = acy.Description, AircraftModel = (acm.ModelName == null || acm.ModelName == "") ? "Unknown" : acm.ModelName, it.Memo, it.MasterCompanyId, it.IsActive, it.IsDeleted }).ToList();
                var uniquedata = data.GroupBy(item => new { item.AircraftTypeId, item.AircraftModelId, item.DashNumberId }).Select(group => group.First()).ToList();
                return uniquedata;
            }
            else if (AircraftTypeId == null && myAircraftModelId == null && myDashNumberId != null)
            {
                var data = (from it in _appContext.VendorCapabilityAircraft
                            join acy in _appContext.AircraftType on it.AircraftTypeId equals acy.AircraftTypeId into acyt
                            from acy in acyt.DefaultIfEmpty()
                            join acm in _appContext.AircraftModel on it.AircraftModelId equals acm.AircraftModelId into acmt
                            from acm in acmt.DefaultIfEmpty()
                            join acd in _appContext.AircraftDashNumber on it.DashNumberId equals acd.DashNumberId into acdt
                            from acd in acdt.DefaultIfEmpty()
                            where it.IsActive == true && it.VendorCapabilityId == VendorCapabilityId && myDashNumberId.Contains(it.DashNumberId) && it.Memo.Contains(memo) && it.IsDeleted != true
                            select new { it.ItemMasterId, it.PartNumber, it.AircraftTypeId, it.AircraftModelId, it.DashNumberId, DashNumber = (acd.DashNumber == null || acd.DashNumber == "") ? "Unknown" : acd.DashNumber, AircraftType = acy.Description, AircraftModel = (acm.ModelName == null || acm.ModelName == "") ? "Unknown" : acm.ModelName, it.Memo, it.MasterCompanyId, it.IsActive, it.IsDeleted }).ToList();
                var uniquedata = data.GroupBy(item => new { item.AircraftTypeId, item.AircraftModelId, item.DashNumberId }).Select(group => group.First()).ToList();
                return uniquedata;
            }
            else
            {
                var data = (from it in _appContext.VendorCapabilityAircraft
                            join acy in _appContext.AircraftType on it.AircraftTypeId equals acy.AircraftTypeId into acyt
                            from acy in acyt.DefaultIfEmpty()
                            join acm in _appContext.AircraftModel on it.AircraftModelId equals acm.AircraftModelId into acmt
                            from acm in acmt.DefaultIfEmpty()
                            join acd in _appContext.AircraftDashNumber on it.DashNumberId equals acd.DashNumberId into acdt
                            from acd in acdt.DefaultIfEmpty()
                            where it.IsActive == true && it.VendorCapabilityId == VendorCapabilityId && it.Memo.Contains(memo) && it.IsDeleted != true
                            select new { it.ItemMasterId, it.PartNumber, it.AircraftTypeId, it.AircraftModelId, it.DashNumberId, DashNumber = (acd.DashNumber == null || acd.DashNumber == "") ? "Unknown" : acd.DashNumber, AircraftType = acy.Description, AircraftModel = (acm.ModelName == null || acm.ModelName == "") ? "Unknown" : acm.ModelName, it.Memo, it.MasterCompanyId, it.IsActive, it.IsDeleted }).ToList();
                var uniquedata = data.GroupBy(item => new { item.AircraftTypeId, item.AircraftModelId, item.DashNumberId }).Select(group => group.First()).ToList();
                return uniquedata;
            }
        }


        public IEnumerable<object> GetVendorsCheckAuditHistory(long id)
        {
            var retData = (from t in _appContext.CheckPaymentAudit
                           join ad in _appContext.Address on t.AddressId equals ad.AddressId
                           where t.CheckPaymentId == id
                           select new
                           {
                               t.AuditCheckPaymentId,
                               t.CheckPaymentId,
                               t.AddressId,
                               t.MasterCompanyId,
                               t.SiteName,
                               t.IsActive,
                               t.AccountNumber,
                               t.RoutingNumber,
                               Address1 = ad.Line1,
                               Address2 = ad.Line2,
                               Address3 = ad.Line3,
                               ad.City,
                               ad.StateOrProvince,
                               ad.PostalCode,
                               ad.Country,
                               t.CreatedBy,
                               t.UpdatedBy,
                               t.CreatedDate,
                               t.UpdatedDate

                           }).OrderByDescending(c => c.AuditCheckPaymentId).ToList();

            return retData;


        }

        public IEnumerable<object> UploadVendorBillingAddressCustomData(IFormFile file, long vendorId)
        {
            string countryName = string.Empty;
            //For Future purpose Added object to retun faild records, present we are returning empty object
            List<object> obj = new List<object>();
            CommonRepository commonRepository = new CommonRepository(_appContext);

            int count = 0;
            try
            {
                Address addr;
                VendorBillingAddress bill;

                string fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                string filePath = Path.Combine(AppSettings.CustomUploadFilePath, Convert.ToString(ModuleEnum.VendorBillingAddress), DateTime.Now.ToString("yyyy-MM-dd hh-mm-ss"));

                if (!Directory.Exists(filePath))
                {
                    Directory.CreateDirectory(filePath);
                }

                string fullPath = Path.Combine(filePath, fileName);


                using (var stream = File.Open(fullPath, FileMode.Create))
                {
                    file.CopyTo(stream);
                    {
                        using (var reader = ExcelReaderFactory.CreateReader(stream))
                        {
                            do
                            {
                                while (reader.Read())
                                {
                                    if (count > 0 && reader.GetValue(0) != null && reader.GetValue(3) != null && reader.GetValue(2) != null && reader.GetValue(4) != null && reader.GetValue(5) != null && reader.GetValue(6) != null)
                                    {

                                        addr = new Address();
                                        bill = new VendorBillingAddress();
                                        if (reader.GetValue(0) != null)
                                            addr.Line1 = Convert.ToString(reader.GetValue(0));
                                        if (reader.GetValue(1) != null)
                                            addr.Line2 = Convert.ToString(reader.GetValue(1));
                                        if (reader.GetValue(2) != null)
                                            addr.City = Convert.ToString(reader.GetValue(2));
                                        if (reader.GetValue(3) != null)
                                            addr.StateOrProvince = Convert.ToString(reader.GetValue(3));
                                        if (reader.GetValue(4) != null)
                                            addr.PostalCode = Convert.ToString(reader.GetValue(4));

                                        if (reader.GetValue(5) != null)
                                            countryName = Convert.ToString(reader.GetValue(5));
                                        var country = _appContext.Countries.Where(p => p.countries_name == countryName).FirstOrDefault();
                                        if (country != null)
                                        {
                                            addr.Country = country.countries_id.ToString();



                                            addr.MasterCompanyId = 1;
                                            addr.IsActive = true;

                                            addr.CreatedBy = addr.UpdatedBy = "System";
                                            addr.UpdatedDate = addr.CreatedDate = DateTime.Now;

                                            _appContext.Address.Add(addr);
                                            _appContext.SaveChanges();


                                            if (reader.GetValue(6) != null)
                                                bill.SiteName = Convert.ToString(reader.GetValue(6));
                                            var vendShipping = _appContext.VendorBillingAddress.AsNoTracking().Where(p => p.IsPrimary == true && p.VendorId == vendorId).FirstOrDefault();


                                            if (vendShipping != null)
                                            {
                                                if (reader.GetValue(7) != null)
                                                {
                                                    if (reader.GetValue(7).ToString().ToLower() == "yes")
                                                    {
                                                        bill.IsPrimary = true;

                                                        vendShipping.IsPrimary = false;

                                                        VendorBillingAddress ba = new VendorBillingAddress();

                                                        ba.VendorBillingAddressId = Convert.ToInt64(vendShipping.VendorBillingAddressId);
                                                        ba.UpdatedDate = DateTime.Now;
                                                        ba.UpdatedBy = "System";
                                                        ba.IsPrimary = false;


                                                        _appContext.Entry(ba).State = EntityState.Detached;
                                                        _appContext.VendorBillingAddress.Attach(ba);
                                                        _appContext.Entry(ba).Property(x => x.IsPrimary).IsModified = true;
                                                        _appContext.Entry(ba).Property(x => x.UpdatedDate).IsModified = true;
                                                        _appContext.Entry(ba).Property(x => x.UpdatedBy).IsModified = true;
                                                        _appContext.SaveChanges();

                                                        //Audit History
                                                        commonRepository.ShippingBillingAddressHistory(Convert.ToInt64(vendorId), Convert.ToInt32(ModuleEnum.Vendor), Convert.ToInt64(vendShipping.VendorBillingAddressId), Convert.ToInt32(AddressTypeEnum.BillingAddress), "System");
                                                        _appContext.Entry(ba).State = EntityState.Detached;

                                                    }
                                                    else
                                                    {
                                                        bill.IsPrimary = false;
                                                    }
                                                }
                                                else
                                                {
                                                    bill.IsPrimary = false;
                                                }

                                            }
                                            else
                                            {
                                                bill.IsPrimary = true;
                                            }
                                            bill.MasterCompanyId = 1;
                                            bill.VendorId = vendorId;
                                            bill.IsActive = true;
                                            bill.IsDeleted = false;

                                            bill.AddressId = Convert.ToInt64(addr.AddressId);
                                            bill.CreatedBy = bill.UpdatedBy = "System";
                                            bill.UpdatedDate = bill.CreatedDate = DateTime.Now;

                                            _appContext.Entry(bill).State = EntityState.Detached;

                                            _appContext.VendorBillingAddress.Add(bill);
                                            _appContext.SaveChanges();
                                            //Audit History
                                             commonRepository.ShippingBillingAddressHistory(Convert.ToInt64(vendorId), Convert.ToInt32(ModuleEnum.Vendor), Convert.ToInt64(bill.VendorBillingAddressId), Convert.ToInt32(AddressTypeEnum.BillingAddress), "System");
                                            _appContext.Entry(bill).State = EntityState.Detached;
                                        }


                                    }


                                    count++;
                                }
                            } while (reader.NextResult());

                        }
                    }
                }
                return obj;
            }
            catch (Exception ex)
            {

            }
            return obj;
        }

        public IEnumerable<object> UploadVendorShippingAddressCustomData(IFormFile file, long vendorId)
        {
            string countryName = string.Empty;
            //For Future purpose Added object to retun faild records, present we are returning empty object

            List<object> obj = new List<object>();
            CommonRepository commonRepository = new CommonRepository(_appContext);

            int count = 0;
            try
            {
                Address addr;
                VendorShippingAddress ship;

                string fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                string filePath = Path.Combine(AppSettings.CustomUploadFilePath, Convert.ToString(ModuleEnum.VendorShippingAddress), DateTime.Now.ToString("yyyy-MM-dd hh-mm-ss"));

                if (!Directory.Exists(filePath))
                {
                    Directory.CreateDirectory(filePath);
                }

                string fullPath = Path.Combine(filePath, fileName);


                using (var stream = File.Open(fullPath, FileMode.Create))
                {
                    file.CopyTo(stream);
                    {
                        using (var reader = ExcelReaderFactory.CreateReader(stream))
                        {
                            do
                            {
                                while (reader.Read())
                                {
                                    if (count > 0 && reader.GetValue(0) != null && reader.GetValue(3) != null && reader.GetValue(2) != null && reader.GetValue(4) != null && reader.GetValue(5) != null && reader.GetValue(6) != null)
                                    {

                                        addr = new Address();
                                        ship = new VendorShippingAddress();
                                        if (reader.GetValue(0) != null)
                                            addr.Line1 = Convert.ToString(reader.GetValue(0));
                                        if (reader.GetValue(1) != null)
                                            addr.Line2 = Convert.ToString(reader.GetValue(1));
                                        if (reader.GetValue(2) != null)
                                            addr.City = Convert.ToString(reader.GetValue(2));
                                        if (reader.GetValue(3) != null)
                                            addr.StateOrProvince = Convert.ToString(reader.GetValue(3));
                                        if (reader.GetValue(4) != null)
                                            addr.PostalCode = Convert.ToString(reader.GetValue(4));

                                        if (reader.GetValue(5) != null)
                                            countryName = Convert.ToString(reader.GetValue(5));
                                        var country = _appContext.Countries.Where(p => p.countries_name == countryName).FirstOrDefault();
                                        if (country != null)
                                        {
                                            addr.Country = country.countries_id.ToString();



                                            addr.MasterCompanyId = 1;
                                            addr.IsActive = true;

                                            addr.CreatedBy = addr.UpdatedBy = "System";
                                            addr.UpdatedDate = addr.CreatedDate = DateTime.Now;

                                            _appContext.Address.Add(addr);
                                            _appContext.SaveChanges();


                                            if (reader.GetValue(6) != null)
                                                ship.SiteName = Convert.ToString(reader.GetValue(6));
                                            var vendShipping = _appContext.VendorShippingAddress.AsNoTracking().Where(p => p.IsPrimary == true && p.VendorId == vendorId).FirstOrDefault();


                                            if (vendShipping != null)
                                            {
                                                if (reader.GetValue(7) != null)
                                                {
                                                    if (reader.GetValue(7).ToString().ToLower() == "yes")
                                                    {
                                                        ship.IsPrimary = true;

                                                        vendShipping.IsPrimary = false;

                                                        VendorShippingAddress ba = new VendorShippingAddress();

                                                        ba.VendorShippingAddressId = vendShipping.VendorShippingAddressId;
                                                        ba.UpdatedDate = DateTime.Now;
                                                        ba.UpdatedBy = "System";
                                                        ba.IsPrimary = false;


                                                        _appContext.Entry(ba).State = EntityState.Detached;
                                                        _appContext.VendorShippingAddress.Attach(ba);
                                                        _appContext.Entry(ba).Property(x => x.IsPrimary).IsModified = true;
                                                        _appContext.Entry(ba).Property(x => x.UpdatedDate).IsModified = true;
                                                        _appContext.Entry(ba).Property(x => x.UpdatedBy).IsModified = true;
                                                        _appContext.SaveChanges();

                                                        //Audit History
                                                        commonRepository.ShippingBillingAddressHistory(Convert.ToInt64(vendorId), Convert.ToInt32(ModuleEnum.Vendor), Convert.ToInt64(vendShipping.VendorShippingAddressId), Convert.ToInt32(AddressTypeEnum.ShippingAddress), "System");
                                                        _appContext.Entry(ba).State = EntityState.Detached;

                                                    }
                                                    else
                                                    {
                                                        ship.IsPrimary = false;
                                                    }
                                                }
                                                else
                                                {
                                                    ship.IsPrimary = false;
                                                }

                                            }
                                            else
                                            {
                                                ship.IsPrimary = true;
                                            }
                                            ship.MasterCompanyId = 1;
                                            ship.VendorId = vendorId;
                                            ship.IsActive = true;
                                            ship.IsDeleted = false;

                                            ship.AddressId = addr.AddressId;
                                            ship.CreatedBy = ship.UpdatedBy = "System";
                                            ship.UpdatedDate = ship.CreatedDate = DateTime.Now;
                                            _appContext.Entry(ship).State = EntityState.Detached;

                                            _appContext.VendorShippingAddress.Add(ship);
                                            _appContext.SaveChanges();

                                            //Audit History
                                            commonRepository.ShippingBillingAddressHistory(Convert.ToInt64(vendorId), Convert.ToInt32(ModuleEnum.Vendor), Convert.ToInt64(ship.VendorShippingAddressId), Convert.ToInt32(AddressTypeEnum.ShippingAddress), "System");
                                            _appContext.Entry(ship).State = EntityState.Detached;

                                        }

                                    }


                                    count++;
                                }
                            } while (reader.NextResult());

                        }
                    }
                }
                return obj;
            }
            catch (Exception ex)
            {

            }
            return obj;
        }


        public IEnumerable<object> UploadVendorContactsCustomData(IFormFile file, long vendorId)
        {
            string countryName = string.Empty;
            //For Future purpose Added object to retun faild records, present we are returning empty object
            List<object> obj = new List<object>();
            CommonRepository commonRepository = new CommonRepository(_appContext);

            int count = 0;
            try
            {
                Contact cont;
                VendorContact cCont;

                string fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                string filePath = Path.Combine(AppSettings.CustomUploadFilePath, Convert.ToString(ModuleEnum.VendorContact), DateTime.Now.ToString("yyyy-MM-dd hh-mm-ss"));

                if (!Directory.Exists(filePath))
                {
                    Directory.CreateDirectory(filePath);
                }

                string fullPath = Path.Combine(filePath, fileName);


                using (var stream = File.Open(fullPath, FileMode.Create))
                {
                    file.CopyTo(stream);
                    {
                        using (var reader = ExcelReaderFactory.CreateReader(stream))
                        {
                            do
                            {
                                while (reader.Read())
                                {
                                    if (count > 0 && reader.GetValue(1) != null && reader.GetValue(3) != null && reader.GetValue(6) != null && reader.GetValue(7) != null)
                                    {

                                        cont = new Contact();
                                        cCont = new VendorContact();
                                        //if (reader.GetValue(0) != null)
                                        //    cont.Tag = Convert.ToString(reader.GetValue(0));
                                        if (reader.GetValue(0) != null)
                                            cont.Prefix = Convert.ToString(reader.GetValue(0));
                                        if (reader.GetValue(1) != null)
                                            cont.FirstName = Convert.ToString(reader.GetValue(1));
                                        if (reader.GetValue(2) != null)
                                            cont.MiddleName = Convert.ToString(reader.GetValue(2));
                                        if (reader.GetValue(3) != null)
                                            cont.LastName = Convert.ToString(reader.GetValue(3));
                                        if (reader.GetValue(4) != null)
                                            cont.Suffix = Convert.ToString(reader.GetValue(4));

                                        if (reader.GetValue(5) != null)
                                            cont.ContactTitle = Convert.ToString(reader.GetValue(5));

                                        if (reader.GetValue(6) != null)
                                            cont.Email = Convert.ToString(reader.GetValue(6));
                                        if (reader.GetValue(7) != null)
                                            cont.WorkPhone = Convert.ToString(reader.GetValue(7));
                                        if (reader.GetValue(8) != null)
                                            cont.WorkPhoneExtn = Convert.ToString(reader.GetValue(8));
                                        if (reader.GetValue(9) != null)
                                            cont.MobilePhone = Convert.ToString(reader.GetValue(9));
                                        if (reader.GetValue(10) != null)
                                            cont.AlternatePhone = Convert.ToString(reader.GetValue(10));
                                        if (reader.GetValue(11) != null)
                                            cont.Fax = Convert.ToString(reader.GetValue(11));
                                        if (reader.GetValue(12) != null)
                                            cont.Notes = Convert.ToString(reader.GetValue(12));
                                        if (reader.GetValue(13) != null)
                                            cont.WebsiteURL = Convert.ToString(reader.GetValue(13));


                                        cont.IsActive = true;
                                        cont.MasterCompanyId = 1;
                                        cont.CreatedBy = cont.UpdatedBy = "System";
                                        cont.UpdatedDate = cont.CreatedDate = DateTime.Now;

                                        _appContext.Contact.Add(cont);
                                        _appContext.SaveChanges();
                                        var vendContact = _appContext.VendorContact.AsNoTracking().Where(p => p.IsDefaultContact == true && p.VendorId == vendorId).FirstOrDefault();


                                        if (vendContact != null)
                                        {
                                            if (reader.GetValue(14) != null)
                                            {
                                                if (reader.GetValue(14).ToString().ToLower() == "yes")
                                                {
                                                    cCont.IsDefaultContact = true;

                                                    vendContact.IsDefaultContact = false;

                                                    VendorContact ba = new VendorContact();

                                                    ba.VendorContactId = vendContact.VendorContactId;
                                                    ba.UpdatedDate = DateTime.Now;
                                                    ba.UpdatedBy = "System";
                                                    ba.IsDefaultContact = false;


                                                    _appContext.Entry(ba).State = EntityState.Detached;
                                                    _appContext.VendorContact.Attach(ba);
                                                    _appContext.Entry(ba).Property(x => x.IsDefaultContact).IsModified = true;
                                                    _appContext.Entry(ba).Property(x => x.UpdatedDate).IsModified = true;
                                                    _appContext.Entry(ba).Property(x => x.UpdatedBy).IsModified = true;

                                                    _appContext.SaveChanges();
                                                    //For Contact Audit History
                                                    commonRepository.ContactsHistory(Convert.ToInt64(vendorId), Convert.ToInt32(ModuleEnum.Vendor), Convert.ToInt64(vendContact.VendorContactId), "System");

                                                    _appContext.Entry(ba).State = EntityState.Detached;

                                                }
                                                else
                                                {
                                                    cCont.IsDefaultContact = false;
                                                }
                                            }
                                            else
                                            {
                                                cCont.IsDefaultContact = false;
                                            }

                                        }
                                        else
                                        {
                                            cCont.IsDefaultContact = true;
                                        }


                                        cCont.MasterCompanyId = 1;
                                        cCont.VendorId = vendorId;
                                        cCont.IsActive = true;
                                        //cCont.IsDeleted = false;
                                        //cCont.IsDefaultContact = false;
                                        cCont.ContactId = cont.ContactId;
                                        cCont.CreatedBy = cCont.UpdatedBy = "System";
                                        cCont.UpdatedDate = cCont.CreatedDate = DateTime.Now;
                                        _appContext.Entry(cCont).State = EntityState.Detached;
                                        _appContext.VendorContact.Add(cCont);
                                        _appContext.SaveChanges();
                                        //Audit History
                                        commonRepository.ContactsHistory(Convert.ToInt64(vendorId), Convert.ToInt32(ModuleEnum.Vendor), Convert.ToInt64(cCont.VendorContactId), "System");

                                        _appContext.Entry(cCont).State = EntityState.Detached;
                                    }


                                    count++;
                                }
                            } while (reader.NextResult());

                        }
                    }
                }

            }
            catch (Exception ex)
            {

            }
            return obj;

        }

        public IEnumerable<object> UploadVendorPaymentAddressCustomData(IFormFile file, long vendorId)
        {
            string countryName = string.Empty;
            //For Future purpose Added object to retun faild records, present we are returning empty object
            List<object> obj = new List<object>();
            CommonRepository commonRepository = new CommonRepository(_appContext);

            int count = 0;
            try
            {
                Address addr;
                CheckPayment chkPayment;
                VendorCheckPayment vchkPayment;

                string fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                string filePath = Path.Combine(AppSettings.CustomUploadFilePath, Convert.ToString(ModuleEnum.VendorCheckAddress), DateTime.Now.ToString("yyyy-MM-dd hh-mm-ss"));

                if (!Directory.Exists(filePath))
                {
                    Directory.CreateDirectory(filePath);
                }

                string fullPath = Path.Combine(filePath, fileName);


                using (var stream = File.Open(fullPath, FileMode.Create))
                {
                    file.CopyTo(stream);
                    {
                        using (var reader = ExcelReaderFactory.CreateReader(stream))
                        {
                            do
                            {
                                while (reader.Read())
                                {
                                    if (count > 0 && reader.GetValue(0) != null && reader.GetValue(1) != null && reader.GetValue(3) != null && reader.GetValue(4) != null && reader.GetValue(5) != null && reader.GetValue(6) != null)
                                    {                                        
                                         
                                        addr = new Address();
                                        chkPayment = new CheckPayment();
                                        vchkPayment = new VendorCheckPayment();
                                        if (reader.GetValue(0) != null)
                                            chkPayment.SiteName = Convert.ToString(reader.GetValue(0));

                                        if (reader.GetValue(1) != null)
                                            addr.Line1 = Convert.ToString(reader.GetValue(1));
                                        if (reader.GetValue(2) != null)
                                            addr.Line2 = Convert.ToString(reader.GetValue(2));
                                        if (reader.GetValue(3) != null)
                                            addr.City = Convert.ToString(reader.GetValue(3));
                                        if (reader.GetValue(4) != null)
                                            addr.StateOrProvince = Convert.ToString(reader.GetValue(4));
                                        if (reader.GetValue(5) != null)
                                            addr.PostalCode = Convert.ToString(reader.GetValue(5));

                                        if (reader.GetValue(6) != null)
                                            countryName = Convert.ToString(reader.GetValue(6));
                                        var country = _appContext.Countries.Where(p => p.countries_name == countryName).FirstOrDefault();
                                        if (country != null)
                                        {
                                            addr.Country = country.countries_id.ToString();
                                                                                       
                                            addr.MasterCompanyId = 1;
                                            addr.IsActive = true;

                                            addr.CreatedBy = addr.UpdatedBy = "System";
                                            addr.UpdatedDate = addr.CreatedDate = DateTime.Now;

                                            _appContext.Address.Add(addr);
                                            _appContext.SaveChanges();


                                            var vendorConcatData = (from cp in _appContext.CheckPayment
                                                                    join vcp in _appContext.VendorCheckPayment on cp.CheckPaymentId equals vcp.CheckPaymentId
                                                                    where cp.IsPrimayPayment == true && vcp.VendorId == vendorId
                                                                    select cp).AsNoTracking().FirstOrDefault();

                                           
                                            if (vendorConcatData != null)
                                            {
                                                if (reader.GetValue(7) != null)
                                                {
                                                    if (reader.GetValue(7).ToString().ToLower() == "yes")
                                                    {
                                                        chkPayment.IsPrimayPayment = true;

                                                        vendorConcatData.IsPrimayPayment = false;

                                                        CheckPayment ba = new CheckPayment();

                                                        ba.CheckPaymentId = Convert.ToInt64(vendorConcatData.CheckPaymentId);
                                                        ba.UpdatedDate = DateTime.Now;
                                                        ba.UpdatedBy = "System";
                                                        ba.IsPrimayPayment = false;
                                                        
                                                        _appContext.Entry(ba).State = EntityState.Detached;
                                                        _appContext.CheckPayment.Attach(ba);
                                                        _appContext.Entry(ba).Property(x => x.IsPrimayPayment).IsModified = true;
                                                        _appContext.Entry(ba).Property(x => x.UpdatedDate).IsModified = true;
                                                        _appContext.Entry(ba).Property(x => x.UpdatedBy).IsModified = true;
                                                        _appContext.SaveChanges();

                                                        //Audit History
                                                        commonRepository.ShippingBillingAddressHistory(Convert.ToInt64(vendorId), Convert.ToInt32(ModuleEnum.Vendor), Convert.ToInt64(vendorConcatData.CheckPaymentId), Convert.ToInt32(AddressTypeEnum.CheckPayment), "System");

                                                        _appContext.Entry(ba).State = EntityState.Detached;

                                                    }
                                                    else
                                                    {
                                                        chkPayment.IsPrimayPayment= false;
                                                    }
                                                }
                                                else
                                                {
                                                    chkPayment.IsPrimayPayment = false;
                                                }

                                            }
                                            else
                                            {
                                                chkPayment.IsPrimayPayment = true;
                                            }
                                            chkPayment.MasterCompanyId = 1;                                           
                                            chkPayment.IsActive = true;                                  
                                            chkPayment.AddressId = Convert.ToInt64(addr.AddressId);
                                            chkPayment.CreatedBy = chkPayment.UpdatedBy = "System";
                                            chkPayment.UpdatedDate = chkPayment.CreatedDate = DateTime.Now;

                                            _appContext.Entry(chkPayment).State = EntityState.Detached;

                                            _appContext.CheckPayment.Add(chkPayment);
                                            _appContext.SaveChanges();

                                            vchkPayment.VendorId = vendorId;
                                            vchkPayment.IsActive = true;
                                            vchkPayment.IsDeleted = false;
                                            vchkPayment.CreatedBy = vchkPayment.UpdatedBy = "System";
                                            vchkPayment.UpdatedDate = vchkPayment.CreatedDate = DateTime.Now;
                                            vchkPayment.MasterCompanyId = 1;
                                            vchkPayment.CheckPaymentId = Convert.ToInt64(chkPayment.CheckPaymentId);

                                            _appContext.Entry(vchkPayment).State = EntityState.Detached;

                                            _appContext.VendorCheckPayment.Add(vchkPayment);
                                            _appContext.SaveChanges();
                                            //Audit History
                                            commonRepository.ShippingBillingAddressHistory(Convert.ToInt64(vendorId), Convert.ToInt32(ModuleEnum.Vendor), Convert.ToInt64(chkPayment.CheckPaymentId), Convert.ToInt32(AddressTypeEnum.CheckPayment), "System");
                                            _appContext.Entry(chkPayment).State = EntityState.Detached;
                                        }


                                    }


                                    count++;
                                }
                            } while (reader.NextResult());

                        }
                    }
                }
                return obj;
            }
            catch (Exception ex)
            {

            }
            return obj;
        }

        public IEnumerable<object> UploadVendorInternationalCustomData(IFormFile file, long vendorId)
        {
            string countryName = string.Empty;
            List<object> obj = new List<object>();

            int count = 0;
            try
            {

               VendorInternationalShipping ship;

                string fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                string filePath = Path.Combine(AppSettings.CustomUploadFilePath, Convert.ToString(ModuleEnum.VendorInternationalShippingAddress), DateTime.Now.ToString("yyyy-MM-dd hh-mm-ss"));

                if (!Directory.Exists(filePath))
                {
                    Directory.CreateDirectory(filePath);
                }

                string fullPath = Path.Combine(filePath, fileName);


                using (var stream = File.Open(fullPath, FileMode.Create))
                {
                    file.CopyTo(stream);
                    {
                        using (var reader = ExcelReaderFactory.CreateReader(stream))
                        {
                            do
                            {
                                while (reader.Read())
                                {
                                    if (count > 0 && reader.GetValue(4) != null)
                                    {

                                        ship = new VendorInternationalShipping();
                                        if (reader.GetValue(0) != null)
                                            ship.ExportLicense = Convert.ToString(reader.GetValue(0));
                                        if (reader.GetValue(1) != null && reader.GetValue(1).GetType().Name == "DateTime")
                                            ship.StartDate = Convert.ToDateTime(reader.GetValue(1));
                                        if (reader.GetValue(2) != null)
                                            ship.Description = Convert.ToString(reader.GetValue(2));
                                        if (reader.GetValue(3) != null && reader.GetValue(3).GetType().Name == "DateTime")
                                            ship.ExpirationDate = Convert.ToDateTime(reader.GetValue(3));
                                        if (reader.GetValue(5) != null && reader.GetValue(5).GetType().Name == "Double")
                                            ship.Amount = Convert.ToDecimal(reader.GetValue(5));

                                        if (reader.GetValue(4) != null)
                                            countryName = Convert.ToString(reader.GetValue(4));
                                        var country = _appContext.Countries.Where(p => p.countries_name == countryName).FirstOrDefault();
                                        if (country != null)
                                        {
                                            ship.ShipToCountryId = country.countries_id;

                                            var custShipping = _appContext.VendorInternationalShipping.AsNoTracking().Where(p => p.IsPrimary == true && p.VendorId == vendorId).FirstOrDefault();


                                            if (custShipping != null)
                                            {
                                                if (reader.GetValue(6) != null)
                                                {
                                                    if (reader.GetValue(6).ToString().ToLower() == "yes")
                                                    {
                                                        ship.IsPrimary = true;

                                                        custShipping.IsPrimary = false;

                                                        VendorInternationalShipping ba = new VendorInternationalShipping();

                                                        ba.VendorInternationalShippingId = custShipping.VendorInternationalShippingId;
                                                        ba.UpdatedDate = DateTime.Now;
                                                        ba.UpdatedBy = "System";
                                                        ba.IsPrimary = false;


                                                        _appContext.Entry(ba).State = EntityState.Detached;
                                                        _appContext.VendorInternationalShipping.Attach(ba);
                                                        _appContext.Entry(ba).Property(x => x.IsPrimary).IsModified = true;
                                                        _appContext.Entry(ba).Property(x => x.UpdatedDate).IsModified = true;
                                                        _appContext.Entry(ba).Property(x => x.UpdatedBy).IsModified = true;                                                       
                                                        _appContext.SaveChanges();
                                                        _appContext.Entry(ba).State = EntityState.Detached;

                                                    }
                                                    else
                                                    {
                                                        ship.IsPrimary = false;
                                                    }
                                                }
                                                else
                                                {
                                                    ship.IsPrimary = false;
                                                }

                                            }
                                            else
                                            {
                                                ship.IsPrimary = true;
                                            }

                                            ship.MasterCompanyId = 1;
                                            ship.IsActive = true;
                                            ship.IsDeleted = false;                                            
                                            ship.VendorId = vendorId;
                                            ship.CreatedBy = ship.UpdatedBy = "System";
                                            ship.UpdatedDate = ship.CreatedDate = DateTime.Now;
                                            _appContext.Entry(ship).State = EntityState.Detached;
                                            _appContext.VendorInternationalShipping.Add(ship);
                                            _appContext.SaveChanges();
                                            _appContext.Entry(ship).State = EntityState.Detached;

                                        }



                                    }


                                    count++;
                                }
                            } while (reader.NextResult());

                        }
                    }
                }

            }
            catch (Exception ex)
            {

            }

            return obj;

        }

   

        public IEnumerable<object> getVendorShipVia(long id)
        {
            var data = (from c in _appContext.VendorShippingAudit
                        where c.VendorShippingId == id
                        select new
                        {

                            c.CreatedBy,
                            c.UpdatedBy,
                            c.UpdatedDate,
                            c.CreatedDate,
                            c.Memo,
                            c.ShipVia,
                            c.ShippingId,
                            c.ShippingAccountinfo,
                            c.ShippingURL,
                            c.MasterCompanyId,
                            c.IsActive,
                            c.IsPrimary
                        }).OrderByDescending(c => c.UpdatedDate).ToList();
            return data;
        }

        #region Vendor Internation shipping
        public VendorInternationalShipping CreateVendorInternationalShippingDetails(VendorInternationalShipping model)
        {
            try
            {
                if (model.VendorInternationalShippingId > 0)
                {
                    if (model.IsPrimary == true)
                    {
                        var vendorShipping = _appContext.VendorInternationalShipping.Where(p => p.VendorId == model.VendorId && p.IsPrimary == true).ToList();

                        if (vendorShipping != null)
                        {
                            foreach (var item in vendorShipping)
                            {
                                item.IsPrimary = false;
                                item.UpdatedDate = DateTime.Now;
                                _appContext.VendorInternationalShipping.Update(item);
                                _appContext.SaveChanges();
                            }
                        }
                    }
                    model.UpdatedDate = DateTime.Now;
                    model.UpdatedBy = model.UpdatedBy;
                    model.IsPrimary = model.IsPrimary;

                    _appContext.VendorInternationalShipping.Update(model);
                    _appContext.SaveChanges();
                }
                else
                {
                    model.CreatedDate = model.UpdatedDate = DateTime.Now;
                    model.IsActive = true;
                    model.IsDeleted = false;
                    if (model.IsPrimary == true)
                    {
                        var vendorShipping = _appContext.VendorInternationalShipping.Where(p => p.VendorId == model.VendorId && p.IsPrimary == true).ToList();

                        if (vendorShipping != null)
                        {
                            foreach (var item in vendorShipping)
                            {
                                item.IsPrimary = false;
                                item.UpdatedDate = DateTime.Now;
                                _appContext.VendorInternationalShipping.Update(item);
                                _appContext.SaveChanges();
                            }
                        }
                    }
                    model.IsPrimary = model.IsPrimary;

                    _appContext.VendorInternationalShipping.Add(model);
                    _appContext.SaveChanges();
                }
                return model;


            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public object VendorInternationalShippingDetailsById(long id)
        {
            var result = (from vsi in _appContext.VendorInternationalShipping
                          join co in _appContext.Countries on vsi.ShipToCountryId equals co.countries_id into coo
                          from co in coo.DefaultIfEmpty()
                          where vsi.IsDeleted == false && vsi.VendorInternationalShippingId == id
                          select new
                          {
                              vsi.VendorInternationalShippingId,
                              vsi.VendorId,
                              vsi.ExportLicense,
                              vsi.StartDate,
                              vsi.Amount,
                              vsi.IsPrimary,
                              vsi.Description,
                              vsi.ExpirationDate,
                              vsi.ShipToCountryId,
                              vsi.MasterCompanyId,
                              ShipToCountry = co.countries_name,
                              vsi.IsActive,
                              vsi.IsDeleted,
                              vsi.UpdatedDate,
                              vsi.CreatedBy,
                              vsi.UpdatedBy,
                              vsi.CreatedDate,
                          }).FirstOrDefault();

            return result;
        }

        public void VendorInternationalShippingDetailsStatus(long id, bool status, string updatedBy)
        {
            VendorInternationalShipping model = new VendorInternationalShipping();
            model.VendorInternationalShippingId = id;
            model.UpdatedDate = DateTime.Now;
            model.IsActive = status;
            model.UpdatedBy = updatedBy;

            _appContext.VendorInternationalShipping.Attach(model);

            _appContext.Entry(model).Property(x => x.IsActive).IsModified = true;
            _appContext.Entry(model).Property(x => x.UpdatedDate).IsModified = true;
            _appContext.Entry(model).Property(x => x.UpdatedBy).IsModified = true;

            _appContext.SaveChanges();
        }

        public void DeleteVendorInternationalShippingDetails(long id, string updatedBy)
        {
            try
            {
                VendorInternationalShipping model = new VendorInternationalShipping();
                model.VendorInternationalShippingId = id;
                model.UpdatedDate = DateTime.Now;
                model.IsDeleted = true;
                model.UpdatedBy = updatedBy;

                _appContext.VendorInternationalShipping.Attach(model);

                _appContext.Entry(model).Property(x => x.IsDeleted).IsModified = true;
                _appContext.Entry(model).Property(x => x.UpdatedDate).IsModified = true;
                _appContext.Entry(model).Property(x => x.UpdatedBy).IsModified = true;

                _appContext.SaveChanges();

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public IEnumerable<object> GetVendorInternationalShippingDetails(long VendorId)
        {
            var result = (from vsi in _appContext.VendorInternationalShipping
                          join co in _appContext.Countries on vsi.ShipToCountryId equals co.countries_id into coo
                          from co in coo.DefaultIfEmpty()
                          where vsi.IsDeleted == false && vsi.VendorId == VendorId
                          select new
                          {
                              vsi.VendorInternationalShippingId,
                              vsi.VendorId,
                              vsi.ExportLicense,
                              vsi.StartDate,
                              vsi.Amount,
                              vsi.IsPrimary,
                              vsi.Description,
                              vsi.ExpirationDate,
                              vsi.ShipToCountryId,
                              ShipToCountry = co.countries_name,
                              vsi.IsActive,
                              vsi.IsDeleted,
                              vsi.UpdatedDate,
                              vsi.UpdatedBy,
                              vsi.CreatedBy,
                              vsi.CreatedDate,
                          }).OrderByDescending(p => p.CreatedDate).ToList();

            return result;
        }

        public IEnumerable<object> GetVendorInternationalShippingDetailsAudit(long VendorInternationalShippingId)
        {
            var result = (from vsi in _appContext.VendorInternationalShippingAudit
                          join co in _appContext.Countries on vsi.ShipToCountryId equals co.countries_id into coo
                          from co in coo.DefaultIfEmpty()
                          where vsi.VendorInternationalShippingId == VendorInternationalShippingId
                          select new
                          {
                              vsi.AuditVendorInternationalShippingId,
                              vsi.VendorInternationalShippingId,
                              vsi.VendorId,
                              vsi.ExportLicense,
                              vsi.StartDate,
                              vsi.Amount,
                              vsi.IsPrimary,
                              vsi.Description,
                              vsi.ExpirationDate,
                              vsi.ShipToCountryId,
                              ShipToCountry = co.countries_name,
                              vsi.IsActive,
                              vsi.IsDeleted,
                              vsi.UpdatedDate,
                              vsi.CreatedBy,
                              vsi.UpdatedBy,
                              vsi.CreatedDate,
                          }).OrderByDescending(p => p.AuditVendorInternationalShippingId).ToList();

            return result;
        }

        #endregion

        #region Vendor international Ship Via

        public VendorInternationalShipViaDetails CreateVendorInternationalShipViaDetails(VendorInternationalShipViaDetails model)
        {
            try
            {
                if (model.VendorInternationalShipViaDetailsId > 0)
                {
                    if (model.IsPrimary == true)
                    {
                        var vendorShipVia = _appContext.VendorInternationalShipViaDetails.AsNoTracking().Where(p => p.VendorInternationalShippingId == model.VendorInternationalShippingId && p.IsPrimary == true).FirstOrDefault();

                        if (vendorShipVia != null && vendorShipVia.VendorInternationalShipViaDetailsId != model.VendorInternationalShipViaDetailsId)
                        {

                            vendorShipVia.IsPrimary = false;
                            vendorShipVia.UpdatedDate = DateTime.Now;
                            vendorShipVia.UpdatedBy = model.UpdatedBy;
                                _appContext.VendorInternationalShipViaDetails.Update(vendorShipVia);
                                _appContext.SaveChanges();
                            
                        }
                    }
                    model.UpdatedDate = DateTime.Now;
                    model.UpdatedBy = model.UpdatedBy;
                    model.IsPrimary = model.IsPrimary;

                    _appContext.VendorInternationalShipViaDetails.Update(model);
                    _appContext.SaveChanges();
                }
                else
                {
                    model.CreatedDate = model.UpdatedDate = DateTime.Now;
                    model.IsActive = true;
                    model.IsDeleted = false;
                    if (model.IsPrimary == true)
                    {
                        var vendorShipVia = _appContext.VendorInternationalShipViaDetails.Where(p => p.VendorInternationalShippingId == model.VendorInternationalShippingId && p.IsPrimary == true).ToList();

                        if (vendorShipVia != null)
                        {
                            foreach (var item in vendorShipVia)
                            {
                                item.IsPrimary = false;
                                item.UpdatedDate = DateTime.Now;
                                _appContext.VendorInternationalShipViaDetails.Update(item);
                                _appContext.SaveChanges();
                            }
                        }
                    }
                    model.IsPrimary = model.IsPrimary;

                    _appContext.VendorInternationalShipViaDetails.Add(model);
                    _appContext.SaveChanges();
                }
                return model;


            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public object VendorInternationalShipViaDetailsById(long id)
        {
            var result = (from vsi in _appContext.VendorInternationalShipViaDetails
                          where vsi.IsDeleted == false && vsi.VendorInternationalShippingId == id
                          select new
                          {
                              vsi.VendorInternationalShipViaDetailsId,
                              vsi.VendorInternationalShippingId,
                              vsi.IsPrimary,
                              vsi.ShipVia,
                              vsi.ShippingAccountInfo,
                              vsi.Memo,
                              vsi.MasterCompanyId,
                              vsi.CreatedBy,
                              vsi.UpdatedBy,
                              vsi.CreatedDate,
                              vsi.UpdatedDate,
                              vsi.IsActive,
                              vsi.IsDeleted,
                          }).FirstOrDefault();

            return result;
        }
        public void VendorInternationalShipViaDetailsStatus(long id, bool status, string updatedBy)
        {
            try
            {
                VendorInternationalShipViaDetails model = new VendorInternationalShipViaDetails();
                model.VendorInternationalShipViaDetailsId = id;
                model.UpdatedDate = DateTime.Now;
                model.IsActive = status;
                model.UpdatedBy = updatedBy;

                _appContext.VendorInternationalShipViaDetails.Attach(model);

                _appContext.Entry(model).Property(x => x.IsActive).IsModified = true;
                _appContext.Entry(model).Property(x => x.UpdatedDate).IsModified = true;
                _appContext.Entry(model).Property(x => x.UpdatedBy).IsModified = true;

                _appContext.SaveChanges();
            }
            catch (Exception)
            {
                throw;
            }
           
        }
        public void DeleteVendorInternationalShipViaDetails(long id, string updatedBy)
        {
            try
            {
                VendorInternationalShipViaDetails model = new VendorInternationalShipViaDetails();
                model.VendorInternationalShipViaDetailsId = id;
                model.UpdatedDate = DateTime.Now;
                model.IsDeleted = true;
                model.UpdatedBy = updatedBy;

                _appContext.VendorInternationalShipViaDetails.Attach(model);

                _appContext.Entry(model).Property(x => x.IsDeleted).IsModified = true;
                _appContext.Entry(model).Property(x => x.UpdatedDate).IsModified = true;
                _appContext.Entry(model).Property(x => x.UpdatedBy).IsModified = true;

                _appContext.SaveChanges();

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public IEnumerable<object> GetVendorInternationalShipViaDetails(long VendorInternationalShippingId)
        {
            var result = (from vsi in _appContext.VendorInternationalShipViaDetails
                          where vsi.IsDeleted == false && vsi.VendorInternationalShippingId == VendorInternationalShippingId
                          select new
                          {
                              vsi.VendorInternationalShipViaDetailsId,
                              vsi.VendorInternationalShippingId,
                              vsi.IsPrimary,
                              vsi.ShipVia,
                              vsi.ShippingAccountInfo,
                              vsi.Memo,
                              vsi.MasterCompanyId,
                              vsi.CreatedBy,
                              vsi.UpdatedBy,
                              vsi.CreatedDate,
                              vsi.UpdatedDate,
                              vsi.IsActive,
                              vsi.IsDeleted,
                          }).OrderByDescending(p=>p.CreatedDate).ToList();

            return result;
        }
        public IEnumerable<object> GetVendorInternationalShipViaDetailsAudit(long VendorInternationalShipViaDetailsId)
        {
            var result = (from vsi in _appContext.VendorInternationalShipViaDetailsAudit
                          where vsi.IsDeleted == false && vsi.VendorInternationalShipViaDetailsId == VendorInternationalShipViaDetailsId
                          select new
                          {
                              vsi.AuditVendorInternationalShipViaDetailsId,
                              vsi.VendorInternationalShipViaDetailsId,
                              vsi.VendorInternationalShippingId,
                              vsi.IsPrimary,
                              vsi.ShipVia,
                              vsi.ShippingAccountInfo,
                              vsi.Memo,
                              vsi.MasterCompanyId,
                              vsi.CreatedBy,
                              vsi.UpdatedBy,
                              vsi.CreatedDate,
                              vsi.UpdatedDate,
                              vsi.IsActive,
                              vsi.IsDeleted,
                          }).OrderByDescending(p => p.AuditVendorInternationalShipViaDetailsId).ToList();

            return result;
        }


        #endregion

        #region Vendor Contact ATA Mapping
        public IEnumerable<object> GetATAContactMapped(long contactId)
        {            
                var data = (from ca in _appContext.VendorContactATAMapping
                            join ataca in _appContext.ATAChapter on ca.ATASubChapterId equals ataca.ATAChapterId into atacag
                            from ataca in atacag.DefaultIfEmpty()
                            join atasub in _appContext.ATASubChapter on ca.ATASubChapterId equals atasub.ATASubChapterId into atasubg
                            from atasub in atasubg.DefaultIfEmpty()
                            where ca.VendorContactId == contactId && ca.IsDeleted == false
                            select new
                            {
                                ca.VendorContactATAMappingId,
                                ca.VendorId,
                                ca.ATAChapterId,
                                ataca.ATAChapterCode,
                                ataca.ATAChapterName,
                                ca.ATASubChapterId,
                                atasub.ATASubChapterCode,
                                ATASubChapterDescription = atasub.Description,
                                ca.CreatedBy,
                                ca.UpdatedBy,
                                ca.IsActive,
                                ca.IsDeleted

                            }).ToList();
                return data;
            
        }

        public IEnumerable<object> GetATAContactMappedAudit(long VendorContactATAMappingId)
        {
            var data = (from ca in _appContext.VendorContactATAMappingAudit
                        join ataca in _appContext.ATAChapter on ca.ATASubChapterId equals ataca.ATAChapterId into atacag
                        from ataca in atacag.DefaultIfEmpty()
                        join atasub in _appContext.ATASubChapter on ca.ATASubChapterId equals atasub.ATASubChapterId into atasubg
                        from atasub in atasubg.DefaultIfEmpty()
                        where ca.VendorContactATAMappingId == VendorContactATAMappingId && ca.IsDeleted == false
                        select new
                        {
                            ca.AuditVendorContactATAMappingId,
                            ca.VendorContactATAMappingId,
                            ca.VendorId,
                            ca.ATAChapterId,
                            ataca.ATAChapterCode,
                            ataca.ATAChapterName,
                            ca.ATASubChapterId,
                            atasub.ATASubChapterCode,
                            ATASubChapterDescription = atasub.Description,
                            ca.CreatedBy,
                            ca.UpdatedBy,
                            ca.IsActive,
                            ca.IsDeleted

                        }).ToList();
            return data;
        }

        #endregion

    }
}
