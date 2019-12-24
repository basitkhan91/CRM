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
    public class ATAChapterRepository : Repository<DAL.Models.ATAChapter>, IATAChapter
    {

        private AppSettings AppSettings { get; set; }
        public ATAChapterRepository(ApplicationDbContext context, IOptions<AppSettings> settings) : base(context)
        {
            AppSettings = settings.Value;
        }

        public IEnumerable<DAL.Models.ATAChapter> GetATAChapterData()
        {
            return _appContext.ATAChapter.OrderByDescending(c => c.ATAChapterId).ToList();
        }


        //Task<Tuple<bool, string[]>> CreateRoleAsync(ApplicationRole role, IEnumerable<string> claims);

        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;
        public IEnumerable<object> GetATASUBS(long ChID)
        {
            //from c in _appContext.CheckPayment
            //join ad in _appContext.Address on c.AddressId equals ad.AddressId
            var data = (from iM in _appContext.ATASubChapter
                        join Mc in _appContext.ATAChapter on iM.ATAChapterId equals Mc.ATAChapterId
                        where iM.ATAChapterId == ChID
                        select new
                        {
                            iM.ATASubChapterId,
                            iM.ATASubChapterCode,
                            iM.Description,
                            iM.Memo,
                            iM.ATAChapterId,
                            iM.MasterCompanyId,
                            Mc.ATAChapterName,
                            Mc.ATAChapterCategory,
                            Mc.ATAChapterCode
                        }).ToList();
            return data;
            throw new NotImplementedException();
        }
        public IEnumerable<object> GetMultiATASUBS(string ChapterID)
        {
            var myATAIds = ChapterID.Split(',').Select(n => Convert.ToInt64(n)).ToArray();
            var data = (from iM in _appContext.ATASubChapter
                        join Mc in _appContext.ATAChapter on iM.ATAChapterId equals Mc.ATAChapterId
                        where myATAIds.Contains(iM.ATAChapterId)
                        select new
                        {
                            iM.ATASubChapterId,
                            iM.ATASubChapterCode,
                            iM.Description,
                            iM.Memo,
                            iM.ATAChapterId,
                            iM.MasterCompanyId,
                            Mc.ATAChapterName,
                            Mc.ATAChapterCategory,
                            Mc.ATAChapterCode
                        }).ToList();
            return data;
            throw new NotImplementedException();
        }

        public IEnumerable<ATAChapterAudit> GetATAChapterHistory(long ataChapterId)
        {
            try
            {
                return _appContext.ATAChapterAudit.Where(p => p.ATAChapterId == ataChapterId).OrderByDescending(p => p.UpdatedDate).ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }



        public IEnumerable<DAL.Models.ATAChapter> UploadCustomData(IFormFile file)
        {
            string atachapterName = string.Empty;
            string ataachaaaptercategory = string.Empty;
            string memo = string.Empty;
            int? atachaptercode;

            List<DAL.Models.ATAChapter> ATAChapters = new List<DAL.Models.ATAChapter>();
            int count = 0;
            try
            {
                DAL.Models.ATAChapter ataChapter;

                string fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                string filePath = Path.Combine(AppSettings.CustomUploadFilePath, Convert.ToString(ModuleEnum.ATAMainChapter), DateTime.Now.ToString("yyyy-MM-dd hh-mm-ss"));

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
                                    if (count > 0 && reader.GetValue(0) != null && reader.GetValue(1) != null && reader.GetValue(3) != null)
                                    {
                                        var flag = _appContext.ATAChapter.Any(p => p.IsDelete == false && (p.ATAChapterCode == Convert.ToInt32(reader.GetValue(0))));
                                        if (!flag)
                                        {
                                            ataChapter = new DAL.Models.ATAChapter();
                                            if (reader.GetValue(0) != null)
                                                atachaptercode = ataChapter.ATAChapterCode = Convert.ToInt32(reader.GetValue(0));

                                            if (reader.GetValue(1) != null)
                                                atachapterName = ataChapter.ATAChapterName = Convert.ToString(reader.GetValue(1));

                                            if (reader.GetValue(2) != null)
                                                ataachaaaptercategory = ataChapter.ATAChapterCategory = Convert.ToString(reader.GetValue(2));

                                            if (reader.GetValue(3) != null)
                                                memo = ataChapter.Memo = Convert.ToString(reader.GetValue(3));
                                            ataChapter.MasterCompanyId = 1;
                                            ataChapter.IsActive = true;
                                            ataChapter.IsDelete = false;
                                            ataChapter.CreatedBy = ataChapter.UpdatedBy = "System";
                                            ataChapter.UpdatedDate = ataChapter.CreatedDate = DateTime.Now;

                                            _appContext.ATAChapter.Add(ataChapter);
                                            _appContext.SaveChanges();
                                            ataChapter.UploadStatus = "Success";
                                            ATAChapters.Add(ataChapter);
                                        }
                                        else
                                        {
                                            ataChapter = new DAL.Models.ATAChapter();
                                            if (reader.GetValue(0) != null)
                                                ataChapter.ATAChapterCode = Convert.ToInt32(reader.GetValue(0));

                                            if (reader.GetValue(1) != null)
                                                ataChapter.ATAChapterName = Convert.ToString(reader.GetValue(1));

                                            if (reader.GetValue(2) != null)
                                                ataChapter.ATAChapterCategory = Convert.ToString(reader.GetValue(2));

                                            if (reader.GetValue(3) != null)
                                                ataChapter.Memo = Convert.ToString(reader.GetValue(3));
                                            ataChapter.UploadStatus = "Duplicate";
                                            ATAChapters.Add(ataChapter);
                                        }
                                    }
                                    count++;
                                }
                            } while (reader.NextResult());

                        }
                    }
                }
            }
            catch (Exception)
            {
                DAL.Models.ATAChapter aTAChapter = new DAL.Models.ATAChapter();               
                aTAChapter.ATAChapterName = atachapterName;
                aTAChapter.Memo = memo;
                aTAChapter.UploadStatus = "Failed";
                ATAChapters.Add(aTAChapter);
            }
            return ATAChapters;
        }
    }
}
