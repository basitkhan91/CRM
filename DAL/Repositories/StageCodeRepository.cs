using DAL.Common;
using DAL.Core;
using DAL.Core.DataExtractors;
using DAL.Models;
using DAL.Repositories.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;

namespace DAL.Repositories
{
    public class StageCodeRepository : Repository<StageCode>, IStageCodeRepository
    {
        private AppSettings AppSettings { get; set; }

        public StageCodeRepository(ApplicationDbContext context, IOptions<AppSettings> settings) : base(context)
        {
            AppSettings = settings.Value;
        }

        public IEnumerable<StageCode> BulkUpload(IFormFile file)
        {
            IEnumerable<StageCode> items;

            var dataExtractor = new StageCodeDataExtractor(AppSettings);
            items = dataExtractor.Extract(file, ModuleEnum.StageCode);

            items = TagItems(items);
            foreach (var item in items.Where(item => item.UploadTag == UploadTag.Unique))
            {
                try
                {
                    _appContext.StageCode.Add(item);
                    _appContext.SaveChanges();
                    item.UploadTag = UploadTag.Success;
                }
                catch (Exception)
                {
                    item.UploadTag = UploadTag.Failed;
                    //log exception
                }
            }

            return items;
        }

        public IEnumerable<StageCode> GetAllItems()
        {
            var data = _appContext.StageCode.Where(c => !(c.IsDelete ?? false)).OrderByDescending(c => c.StageCodeId).ToList();
            return data;
        }

        public bool IsDuplicate(StageCode item, IEnumerable<StageCode> existingItems = null)
        {
            if (existingItems == null || !existingItems.Any())
            {
                existingItems = GetAllItems();
            }
            return existingItems.Any(existingItem => existingItem.StageCodeId != item.StageCodeId &&
                                            existingItem.GateCode == item.GateCode &&
                                            existingItem.Description == item.Description &&
                                            existingItem.Sequence == item.Sequence &&
                                            existingItem.Memo == item.Memo);
        }

        public bool IsValid(StageCode item)
        {
            return
                !string.IsNullOrWhiteSpace(item.GateCode) &&
                !string.IsNullOrWhiteSpace(item.Description) &&
                !string.IsNullOrWhiteSpace(item.Sequence) &&
                !string.IsNullOrWhiteSpace(item.Memo);
        }

        private IEnumerable<StageCode> TagItems(IEnumerable<StageCode> items)
        {
            IEnumerable<StageCode> existingItems = GetAllItems();
            bool isItemUnique = false;
            bool isItemValid = false;

            foreach (var item in items)
            {
                isItemValid = IsValid(item);
                if (isItemValid)
                {
                    isItemUnique = existingItems.Any(existingItem =>
                                                                    existingItem.GateCode == item.GateCode &&
                                                                    existingItem.Description == item.Description &&
                                                                    existingItem.Sequence == item.Sequence &&
                                                                    existingItem.Memo == item.Memo
                                                                    );
                    item.UploadTag = isItemUnique ? UploadTag.Unique : UploadTag.Duplicate;
                }
                else
                {
                    item.UploadTag = UploadTag.Invalid;
                }
            }
            return items;
        }


        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;

    }
}
