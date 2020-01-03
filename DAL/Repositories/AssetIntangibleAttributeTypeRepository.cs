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
   public class AssetIntangibleAttributeTypeRepository : Repository<AssetIntangibleAttributeType>, IAssetIntangibleAttributeTypeRepository
    {
        private AppSettings AppSettings { get; set; }

        public AssetIntangibleAttributeTypeRepository(ApplicationDbContext context, IOptions<AppSettings> settings) : base(context)
        {
            AppSettings = settings.Value;
        }

        public IEnumerable<AssetIntangibleAttributeType> BulkUpload(IFormFile file)
        {
            IEnumerable<AssetIntangibleAttributeType> items;

            var dataExtractor = new AssetIntangibleAttributeTypeDataExtractor(AppSettings);
            items = dataExtractor.Extract(file, ModuleEnum.AssetIntangibleAttributeType);

            items = TagItems(items);
            foreach (var item in items.Where(item => item.UploadTag == UploadTag.Unique))
            {
                try
                {
                    _appContext.AssetIntangibleAttributeType.Add(item);
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

        public IEnumerable<AssetIntangibleAttributeType> GetAllItems()
        {
            var data = _appContext.AssetIntangibleAttributeType.Where(c => !(bool) c.IsDeleted).OrderByDescending(c => c.AssetIntangibleAttributeTypeId).ToList();
            return data;
        }

        public bool IsDuplicate(AssetIntangibleAttributeType item, IEnumerable<AssetIntangibleAttributeType> existingItems = null)
        {
            if (existingItems == null || !existingItems.Any())
            {
                existingItems = GetAllItems();
            }
            return existingItems.Any(existingItem =>
                                            existingItem.AssetIntangibleTypeId == item.AssetIntangibleTypeId &&
                                            existingItem.AssetDepreciationMethodId == item.AssetDepreciationMethodId);
        }

        public bool IsValid(AssetIntangibleAttributeType item)
        {
            return
                (item?.AssetIntangibleTypeId ?? 0) > 0 &&
                (item?.IntangibleGLAccountId ?? 0) > 0;
        }

        private IEnumerable<AssetIntangibleAttributeType> TagItems(IEnumerable<AssetIntangibleAttributeType> items)
        {
            IEnumerable<AssetIntangibleAttributeType> existingItems = GetAllItems();
            bool isItemUnique = false;
            bool isItemValid = false;

            foreach (var item in items)
            {
                isItemValid = IsValid(item);
                if (isItemValid)
                {
                    isItemUnique = existingItems.Any(existingItem =>
                                                                    existingItem.AssetIntangibleTypeId == item.AssetIntangibleTypeId 
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
