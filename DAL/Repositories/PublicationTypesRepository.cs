using DAL.Common;
using DAL.Models;
using DAL.Repositories.Interfaces;
using ExcelDataReader;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http.Headers;

namespace DAL.Repositories
{
    public class PublicationTypesRepository : Repository<PublicationType>, IPublicationTypesRepository
    {
        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;
        private AppSettings AppSettings { get; set; }
        public PublicationTypesRepository(ApplicationDbContext context, IOptions<AppSettings> settings) : base(context)
        {
            AppSettings = settings.Value;
        }

        public GetData<PublicationType> GetPublicationTypesList(string name,string description,string memo, int pageNumber, int pageSize)
        {
            try
            {
                GetData<PublicationType> getData = new GetData<PublicationType>();
                PublicationType publicationType;
                getData.PaginationList = new List<PublicationType>();

                pageNumber = pageNumber + 1;
                var take = pageSize;
                var skip = take * (pageNumber - 1);

                getData.TotalRecordsCount = (from pt in _appContext.PublicationType
                                             where pt.IsDeleted == false
                                                   && pt.Name.Contains(!String.IsNullOrEmpty(name) ? name : pt.Name)
                                                   && pt.Description.Contains(!String.IsNullOrEmpty(description) ? description : pt.Description)
                                                   && pt.Memo.Contains(!String.IsNullOrEmpty(memo) ? memo : pt.Memo)
                                             select new
                                             {
                                                 pt.PublicationTypeId
                                             }
                                             ).Count();



                var result = (from pt in _appContext.PublicationType
                              where pt.IsDeleted == false
                                    && pt.Name.Contains(!String.IsNullOrEmpty(name) ? name : pt.Name)
                                    && pt.Name.Contains(!String.IsNullOrEmpty(name) ? name : pt.Name)
                                    && pt.Description.Contains(!String.IsNullOrEmpty(description) ? description : pt.Description)
                                    && pt.Memo.Contains(!String.IsNullOrEmpty(memo) ? memo : pt.Memo)
                              select new
                              {
                                  pt.PublicationTypeId,
                                  pt.Name,
                                  pt.Description,
                                  pt.Memo,
                                  pt.IsActive,
                                  pt.CreatedDate,
                                  pt.CreatedBy,
                                  pt.UpdatedDate
                              })
                             .OrderByDescending(p => p.UpdatedDate)
                             .Skip(skip)
                             .Take(take)
                             .ToList();

                if (result != null && result.Count > 0)
                {

                    foreach (var item in result)
                    {
                        publicationType = new PublicationType();
                        publicationType.PublicationTypeId = item.PublicationTypeId;
                        publicationType.Name = item.Name;
                        publicationType.Description = item.Description;
                        publicationType.Memo = item.Memo;
                        publicationType.IsActive = item.IsActive;
                        publicationType.CreatedDate = item.CreatedDate;
                        publicationType.CreatedBy = item.CreatedBy;
                        getData.PaginationList.Add(publicationType);
                    }
                }

                return getData;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public long CreatePublicationType(PublicationType publicationType)
        {
            try
            {
                publicationType.CreatedDate = publicationType.UpdatedDate = DateTime.Now;
                publicationType.IsDeleted = false;
                publicationType.IsActive = true;
                _appContext.PublicationType.Add(publicationType);
                _appContext.SaveChanges();
                return publicationType.PublicationTypeId;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public object GetPublicationTypeById(long publicationTypeId)
        {
            try
            {
                var result = (from pt in _appContext.PublicationType
                              where pt.PublicationTypeId == publicationTypeId
                              select new
                              {
                                  pt
                              })
                              .FirstOrDefault();
                return result;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public void DeletePublicationType(long publicationTypeId, string updatedBy)
        {
            try
            {
                PublicationType publicationType = new PublicationType();
                publicationType.PublicationTypeId = publicationTypeId;
                publicationType.UpdatedDate = DateTime.Now;
                publicationType.UpdatedBy = updatedBy;
                publicationType.IsDeleted = true;

                _appContext.PublicationType.Attach(publicationType);

                _context.Entry(publicationType).Property(x => x.IsDeleted).IsModified = true;
                _context.Entry(publicationType).Property(x => x.UpdatedDate).IsModified = true;
                _context.Entry(publicationType).Property(x => x.UpdatedBy).IsModified = true;

                _context.SaveChanges();
            }
            catch (Exception)
            {

                throw;
            }
        }

        public void PublicationTypeStatus(long publicationTypeId, bool status, string updatedBy)
        {
            try
            {
                PublicationType publicationType = new PublicationType();
                publicationType.PublicationTypeId = publicationTypeId;
                publicationType.UpdatedDate = DateTime.Now;
                publicationType.UpdatedBy = updatedBy;
                publicationType.IsActive = status;

                _appContext.PublicationType.Attach(publicationType);

                _context.Entry(publicationType).Property(x => x.IsActive).IsModified = true;
                _context.Entry(publicationType).Property(x => x.UpdatedDate).IsModified = true;
                _context.Entry(publicationType).Property(x => x.UpdatedBy).IsModified = true;

                _context.SaveChanges();
            }
            catch (Exception)
            {

                throw;
            }
        }

        public IEnumerable<PublicationTypeAudit> PublicationTypeHistory(long publicationTypeId)
        {
            try
            {
                return _appContext.PublicationTypeAudit.Where(c => c.PublicationTypeId == publicationTypeId).OrderByDescending(p => p.UpdatedDate).ToList();
            }
            catch (Exception)
            {

                throw;
            }
        }

        public IEnumerable<PublicationType> UploadCustomData(IFormFile file)
        {
            string name = string.Empty;
            string description = string.Empty;
            string memo = string.Empty;

            List<PublicationType> publicationTypes = new List<PublicationType>();
            int count = 0;
            try
            {
                PublicationType publicationType;

                string fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                string filePath = Path.Combine(AppSettings.CustomUploadFilePath, Convert.ToString(ModuleEnum.UnitOfMeasure), DateTime.Now.ToString("yyyy-MM-dd hh-mm-ss"));

                if (!Directory.Exists(filePath))
                {
                    Directory.CreateDirectory(filePath);
                }

                string fullPath = Path.Combine(filePath, fileName);

                using (var stream = new FileStream(fullPath, FileMode.Create))
                {
                    file.CopyTo(stream);
                    {
                        using (var reader = ExcelReaderFactory.CreateReader(stream))
                        {
                            do
                            {
                                while (reader.Read())
                                {
                                    if (count > 0 && !string.IsNullOrEmpty(reader.GetString(0)))
                                    {
                                        var flag = _appContext.PublicationType.Any(p => p.Name == reader.GetString(0).Trim() && p.IsDeleted == false);
                                        if (!flag)
                                        {
                                            publicationType = new PublicationType();
                                            if (!string.IsNullOrEmpty(reader.GetString(0)))
                                                name = publicationType.Name = reader.GetString(0).Trim();
                                            if (!string.IsNullOrEmpty(reader.GetString(1)))
                                                description = publicationType.Description = reader.GetString(1).Trim();
                                            if (!string.IsNullOrEmpty(reader.GetString(2)))
                                                memo = publicationType.Memo = reader.GetString(2).Trim();
                                            publicationType.MasterCompanyId = 1;
                                            publicationType.IsActive = true;
                                            publicationType.IsDeleted = false;
                                            publicationType.CreatedBy = publicationType.UpdatedBy = "System";
                                            publicationType.UpdatedDate = publicationType.CreatedDate = DateTime.Now;

                                            _appContext.PublicationType.Add(publicationType);
                                            _appContext.SaveChanges();
                                            publicationType.UploadStatus = "Success";
                                            publicationTypes.Add(publicationType);
                                        }
                                        else
                                        {
                                            publicationType = new PublicationType();
                                            if (!string.IsNullOrEmpty(reader.GetString(0)))
                                                publicationType.Name = reader.GetString(0).Trim();
                                            if (!string.IsNullOrEmpty(reader.GetString(1)))
                                                publicationType.Description = reader.GetString(1).Trim();
                                            if (!string.IsNullOrEmpty(reader.GetString(2)))
                                                publicationType.Memo = reader.GetString(2).Trim();
                                            publicationType.UploadStatus = "Duplicate";
                                            publicationTypes.Add(publicationType);
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
                PublicationType publicationType = new PublicationType();
                publicationType.Name = name;
                publicationType.Description = description;
                publicationType.Memo = memo;
                publicationType.UploadStatus = "Failed";
                publicationTypes.Add(publicationType);
            }
            return publicationTypes;
        }

    }
}
