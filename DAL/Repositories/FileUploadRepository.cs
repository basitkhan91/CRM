using DAL.Common;
using DAL.Repositories.Interfaces;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http.Headers;

namespace DAL.Repositories
{
    public class FileUploadRepository : Repository<Attachment>, IFileUploadRepository
    {
        private AppSettings AppSettings { get; set; }
        public FileUploadRepository(ApplicationDbContext context, IOptions<AppSettings> settings) : base(context)
        {
             AppSettings = settings.Value;
        }

        public void UploadFiles(IFormFileCollection files,  long? referenceId, int moduleId, string moduleName, string uploadedBy,int? masterCompanyId)
        {
            int count = 0;
            try
            {
                if (files != null && files.Count > 0)
                {
                    Attachment attachment = new Attachment();
                    attachment.ModuleId = moduleId;
                    attachment.MasterCompanyId = masterCompanyId;
                    attachment.IsActive = true;
                    attachment.IsDeleted = false;
                    attachment.ReferenceId = referenceId;
                    attachment.UpdatedDate=attachment.CreatedDate = DateTime.Now;
                    attachment.UpdatedBy = attachment.CreatedBy = uploadedBy;

                    foreach (var file in files)
                    {
                        long? fileSize = ContentDispositionHeaderValue.Parse(file.ContentDisposition).Size;
                        if (Math.Round(Convert.ToDecimal(fileSize / (1024 * 1024)), 2)<= AppSettings.UploadFileSize)
                        {

                            AttachmentDetails attachmentDetails = new AttachmentDetails();
                            string fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"') ;
                            string filePath = Path.Combine(AppSettings.UploadFilePath,moduleName,referenceId.ToString());

                            if (!Directory.Exists(filePath))
                            {
                                Directory.CreateDirectory(filePath);
                            }

                            string fullPath = Path.Combine(filePath, fileName);
                            using (var stream = new FileStream(fullPath, FileMode.Create))
                            {
                                file.CopyTo(stream);
                            }

                            attachmentDetails.Code = "";
                            attachmentDetails.Description = "";
                            attachmentDetails.FileFormat = "";
                            attachmentDetails.Memo = "";

                            attachmentDetails.FileSize = Math.Round(Convert.ToDecimal(fileSize / (1024 * 1024)), 2);
                            attachmentDetails.FileName = fileName;
                            attachmentDetails.Link = fullPath;
                            attachmentDetails.FileType = file.ContentType;
                            attachmentDetails.IsActive = true;
                            attachmentDetails.IsDeleted = false;
                            attachmentDetails.UpdatedBy= attachmentDetails.CreatedBy = uploadedBy;
                            attachmentDetails.UpdatedDate = attachmentDetails.CreatedDate = DateTime.Now;

                            attachment.AttachmentDetails.Add(attachmentDetails);
                            count++;
                        }
                        
                    }

                    _appContext.Attachment.Add(attachment);
                    _appContext.SaveChanges();
                }
            }
            catch (Exception)
            {
                throw;
            }

        }

        public List<AttachmentDetails> GetAttachmentDetails(long attachmentId, long? referenceId, int moduleId)
        {
            try
            {
                string filePath = string.Empty;
                List<AttachmentDetails> attachmentDetails = new List<AttachmentDetails>();

                var result = _appContext.Attachment
                    .Join(_appContext.AttachmentDetails,
                           a => a.AttachmentId,
                           ad => ad.AttachmentId,
                           (a, ad) => new { a, ad })
                    .Where(p => p.ad.IsDeleted == false && p.a.AttachmentId == attachmentId && p.a.ModuleId == moduleId && p.a.ReferenceId == referenceId)
                    .Select(p => new
                    {
                        attachmentDetails = p.ad
                    })
                    .ToList();

                return attachmentDetails;
            }
            catch (Exception)
            {

                throw;
            }
        }


        public void DeleteAttachement(List<long> attachmentDetailIds, string deletedBy )
        {
            try
            {
                foreach (var item in attachmentDetailIds)
                {
                    AttachmentDetails attachmentDetails = new AttachmentDetails();
                    attachmentDetails.AttachmentDetailId = item;
                    attachmentDetails.IsDeleted = true;
                    attachmentDetails.UpdatedBy = deletedBy;
                    attachmentDetails.UpdatedDate = DateTime.Now;

                    _appContext.AttachmentDetails.Attach(attachmentDetails);

                    _appContext.Entry(attachmentDetails).Property(x => x.IsDeleted).IsModified = true;
                    _appContext.Entry(attachmentDetails).Property(x => x.UpdatedDate).IsModified = true;
                    _appContext.Entry(attachmentDetails).Property(x => x.UpdatedBy).IsModified = true;
                    _appContext.SaveChanges();
                }
                

            }
            catch (Exception)
            {

                throw;
            }
            

        }

        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;
    }
}
