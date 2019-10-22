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
    public class AssetIntangibleTypeRepository : Repository<AssetIntangibleType>, IAssetIntangibleTypeRepository
    {
        private AppSettings AppSettings { get; set; }

        public AssetIntangibleTypeRepository(ApplicationDbContext context, IOptions<AppSettings> settings) : base(context)
        {
            AppSettings = settings.Value;
        }

        public IEnumerable<AssetIntangibleType> GetAllItems()
        {
            var data = _appContext.AssetIntangibleType.Where(c => !c.IsDelete).OrderByDescending(c => c.AssetIntangibleTypeId).ToList();
            return data;
        }

        public IEnumerable<AssetIntangibleType> BulkUpload(IFormFile file)
        {
            IEnumerable<AssetIntangibleType> items;

            var dataExtractor = new AssetIntangibleTypeDataExtractor(AppSettings);
            items = dataExtractor.Extract(file, ModuleEnum.AssetIntangibleType);

            items = TagItems(items);
            foreach (var item in items.Where(item => item.UploadTag == UploadTag.Unique))
            {
                try
                {
                    _appContext.AssetIntangibleType.Add(item);
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

        private IEnumerable<AssetIntangibleType> TagItems(IEnumerable<AssetIntangibleType> items)
        {
            IEnumerable<AssetIntangibleType> existingItems = GetAllItems();
            bool isItemUnique = false;
            bool isItemValid = false;

            foreach (var item in items)
            {
                isItemValid = IsValid(item);
                if (isItemValid)
                {
                    isItemUnique = existingItems.Any(existingItem =>
                                                                    existingItem.AssetIntangibleName == item.AssetIntangibleName ||
                                                                    existingItem.AssetIntangibleMemo == item.AssetIntangibleMemo
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

        private bool IsValid(AssetIntangibleType item)
        {
            return
                string.IsNullOrWhiteSpace(item.AssetIntangibleName) &&
                string.IsNullOrWhiteSpace(item.AssetIntangibleMemo);
        }

        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;

    }
}
