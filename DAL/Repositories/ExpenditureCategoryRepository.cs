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
    public class ExpenditureCategoryRepository : Repository<ExpenditureCategory>, IExpenditureCategoryRepository
    {
        private AppSettings AppSettings { get; set; }

        public ExpenditureCategoryRepository(ApplicationDbContext context, IOptions<AppSettings> settings) : base(context)
        {
            AppSettings = settings.Value;
        }

        public IEnumerable<ExpenditureCategory> BulkUpload(IFormFile file)
        {
            IEnumerable<ExpenditureCategory> items;

            var dataExtractor = new ExpenditureCategoryDataExtractor(AppSettings);
            items = dataExtractor.Extract(file, ModuleEnum.ExpenditureCategory);

            items = TagItems(items);
            foreach (var item in items.Where(item => item.UploadTag == UploadTag.Unique))
            {
                try
                {
                    _appContext.ExpenditureCategory.Add(item);
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

        public IEnumerable<ExpenditureCategory> GetAllItems()
        {
            var data = _appContext.ExpenditureCategory.Where(c => !(c.IsDelete ?? true)).OrderByDescending(c => c.ExpenditureCategoryId).ToList();
            return data;
        }

        public bool IsDuplicate(ExpenditureCategory item, IEnumerable<ExpenditureCategory> existingItems = null)
        {
            if (existingItems == null || !existingItems.Any())
            {
                existingItems = GetAllItems();
            }
            return existingItems.Any(existingItem =>
                                            existingItem.Description == item.Description &&
                                            existingItem.Memo == item.Memo);
        }

        public bool IsValid(ExpenditureCategory item)
        {
            return
                !string.IsNullOrWhiteSpace(item.Description) &&
                !string.IsNullOrWhiteSpace(item.Memo);
        }

        private IEnumerable<ExpenditureCategory> TagItems(IEnumerable<ExpenditureCategory> items)
        {
            IEnumerable<ExpenditureCategory> existingItems = GetAllItems();
            bool isDuplicate = false;
            bool isItemValid = false;

            foreach (var item in items)
            {
                isItemValid = IsValid(item);
                if (IsValid(item))
                {
                    isDuplicate = IsDuplicate(item, existingItems);
                    item.UploadTag = IsDuplicate(item, existingItems) ? UploadTag.Duplicate : UploadTag.Unique;
                }
                else
                {
                    item.UploadTag = UploadTag.Invalid;
                }
                item.UploadTag = IsValid(item) ? (IsDuplicate(item, existingItems) ? UploadTag.Duplicate : UploadTag.Unique) : UploadTag.Invalid;
            }
            return items;
        }


        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;

    }
}
