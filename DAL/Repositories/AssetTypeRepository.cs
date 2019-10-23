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
    public class AssetTypeRepository : Repository<AssetType>, IAssetTypeRepository
    {
        private AppSettings AppSettings { get; set; }

        public AssetTypeRepository(ApplicationDbContext context, IOptions<AppSettings> settings) : base(context)
        {
            AppSettings = settings.Value;
        }

        public IEnumerable<AssetType> GetAllItems()
        {
            var data = _appContext.AssetType.Where(c => !c.IsDelete).OrderByDescending(c => c.AssetTypeId).ToList();
            return data;
        }

        public IEnumerable<AssetType> BulkUpload(IFormFile file)
        {
            IEnumerable<AssetType> items;

            var dataExtractor = new AssetTypeDataExtractor(AppSettings);
            items = dataExtractor.Extract(file, ModuleEnum.AssetType);

            items = TagItems(items);
            foreach (var item in items.Where(item => item.UploadTag == UploadTag.Unique))
            {
                try
                {
                    _appContext.AssetType.Add(item);
                    _appContext.SaveChanges();
                    item.UploadTag = UploadTag.Success;
                }
                catch (Exception ex)
                {
                    item.UploadTag = UploadTag.Failed;
                    //log exception
                }
            }

            return items;
        }

        private IEnumerable<AssetType> TagItems(IEnumerable<AssetType> items)
        {
            IEnumerable<AssetType> existingItems = GetAllItems();
            bool isItemUnique = false;
            bool isItemValid = false;

            foreach (var item in items)
            {
                isItemValid = IsValid(item);
                if (isItemValid)
                {
                    isItemUnique = existingItems.Any(existingItem =>
                                                                    existingItem.AssetTypeName == item.AssetTypeName ||
                                                                    existingItem.AssetTypeMemo == item.AssetTypeMemo
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

        private bool IsValid(AssetType item)
        {
            return
                !string.IsNullOrWhiteSpace(item.AssetTypeName) &&
                !string.IsNullOrWhiteSpace(item.AssetTypeMemo);
        }

        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;

    }
}
