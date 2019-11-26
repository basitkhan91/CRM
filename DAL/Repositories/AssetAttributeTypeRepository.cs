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
    public class AssetAttributeTypeRepository : Repository<AssetAttributeType>, IAssetAttributeTypeRepository
    {
        private AppSettings AppSettings { get; set; }

        public AssetAttributeTypeRepository(ApplicationDbContext context, IOptions<AppSettings> settings) : base(context)
        {
            AppSettings = settings.Value;
        }

        public IEnumerable<AssetAttributeType> BulkUpload(IFormFile file)
        {
            IEnumerable<AssetAttributeType> items;

            var dataExtractor = new AssetAttributeTypeDataExtractor(AppSettings);
            items = dataExtractor.Extract(file, ModuleEnum.AssetAttributeType);

            items = TagItems(items);
            foreach (var item in items.Where(item => item.UploadTag == UploadTag.Unique))
            {
                try
                {
                    _appContext.AssetAttributeType.Add(item);
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

        public IEnumerable<AssetAttributeType> GetAllItems()
        {
            var data = _appContext.AssetAttributeType.Where(c => !(c.IsDelete ?? true)).OrderByDescending(c => c.AssetAttributeTypeId).ToList();
            return data;
        }

        public bool IsDuplicate(AssetAttributeType item, IEnumerable<AssetAttributeType> existingItems = null)
        {
            if (existingItems == null || !existingItems.Any())
            {
                existingItems = GetAllItems();
            }
            return existingItems.Any(existingItem =>
                                            existingItem.AssetTypeId == item.AssetTypeId &&
                                            existingItem.AssetAttributeTypeName == item.AssetAttributeTypeName &&
                                            existingItem.Description == item.Description &&
                                            existingItem.ConventionType == item.ConventionType &&
                                            existingItem.DepreciationMethod == item.DepreciationMethod &&
                                            existingItem.ResidualPercentage == item.ResidualPercentage &&
                                            existingItem.ResidualValue == item.ResidualValue &&
                                            existingItem.AssetLife == item.AssetLife &&
                                            existingItem.DepreciationFrequencyId == item.DepreciationFrequencyId &&
                                            existingItem.AcquiredGLAccountId == item.AcquiredGLAccountId &&
                                            existingItem.DeprExpenseGLAccountId == item.DeprExpenseGLAccountId &&
                                            existingItem.AdDepsGLAccountId == item.AdDepsGLAccountId &&
                                            existingItem.AssetSale == item.AssetSale &&
                                            existingItem.AssetWriteOff == item.AssetWriteOff &&
                                            existingItem.AssetWriteDown == item.AssetWriteDown);
        }

        public bool IsValid(AssetAttributeType item)
        {
            return
                (item?.AssetTypeId ?? 0) > 0 &&
                !string.IsNullOrWhiteSpace(item?.AssetAttributeTypeName) &&
                !string.IsNullOrWhiteSpace(item.Description) &&
                (item?.ConventionType ?? 0) > 0 &&
                (item?.DepreciationMethod ?? 0) > 0 &&
                (item?.ResidualPercentage ?? 0) > 0 &&
                (item?.ResidualValue ?? 0) > 0 &&
                (item?.AssetLife ?? 0) > 0 &&
                (item?.DepreciationFrequencyId ?? 0) > 0 &&
                (item?.AcquiredGLAccountId ?? 0) > 0 &&
                (item?.DeprExpenseGLAccountId ?? 0) > 0 &&
                (item?.AdDepsGLAccountId ?? 0) > 0 &&
                (item?.AssetSale ?? 0) > 0 &&
                (item?.AssetWriteOff ?? 0) > 0 &&
                (item?.AssetWriteDown ?? 0) > 0;
        }

        private IEnumerable<AssetAttributeType> TagItems(IEnumerable<AssetAttributeType> items)
        {
            IEnumerable<AssetAttributeType> existingItems = GetAllItems();
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
