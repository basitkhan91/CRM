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
    public class GLAccountCategoryRepository : Repository<GLAccountCategory>, IGLAccountCategoryRepository
    {
        private AppSettings AppSettings { get; set; }

        public GLAccountCategoryRepository(ApplicationDbContext context, IOptions<AppSettings> settings) : base(context)
        {
            AppSettings = settings.Value;
        }

        public IEnumerable<GLAccountCategory> BulkUpload(IFormFile file)
        {
            IEnumerable<GLAccountCategory> items;

            var dataExtractor = new GLAccountCategoryDataExtractor(AppSettings);
            items = dataExtractor.Extract(file, ModuleEnum.GLAccountCategory);

            items = TagItems(items);
            foreach (var item in items.Where(item => item.UploadTag == UploadTag.Unique))
            {
                try
                {
                    _appContext.GLAccountCategory.Add(item);
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

        public IEnumerable<GLAccountCategory> GetAllItems()
        {
            var data = _appContext.GLAccountCategory.Where(c => !c.IsDelete).OrderByDescending(c => c.GLAccountCategoryId).ToList();
            return data;
        }

        public bool IsDuplicate(GLAccountCategory item, IEnumerable<GLAccountCategory> existingItems = null)
        {
            if (existingItems == null || !existingItems.Any())
            {
                existingItems = GetAllItems();
            }
            return existingItems.Any(existingItem =>
                                            existingItem.GLCID == item.GLCID &&
                                            existingItem.GLAccountCategoryName == item.GLAccountCategoryName);
        }

        public bool IsValid(GLAccountCategory item)
        {
            return
                item.GLCID > 0 &&
                !string.IsNullOrWhiteSpace(item.GLAccountCategoryName);
        }

        private IEnumerable<GLAccountCategory> TagItems(IEnumerable<GLAccountCategory> items)
        {
            IEnumerable<GLAccountCategory> existingItems = GetAllItems();
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
