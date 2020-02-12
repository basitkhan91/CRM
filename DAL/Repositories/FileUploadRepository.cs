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
using System.Reflection;

namespace DAL.Repositories
{
    public class FileUploadRepository : Repository<Attachment>, IFileUploadRepository
    {
        private AppSettings AppSettings { get; set; }
        public FileUploadRepository(ApplicationDbContext context, IOptions<AppSettings> settings) : base(context)
        {
            AppSettings = settings.Value;
        }

        public long UploadFiles(IFormFileCollection files, long? referenceId, int moduleId, string moduleName, string uploadedBy, int? masterCompanyId)
        {
            int count = 0;
            long attachmentId = 0;
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
                    attachment.UpdatedDate = attachment.CreatedDate = DateTime.Now;
                    attachment.UpdatedBy = attachment.CreatedBy = uploadedBy;

                    foreach (var file in files)
                    {
                        //Commented By Vijay on 10-Feb-2020 here we are not getting file size.
                        //long? fileSize = ContentDispositionHeaderValue.Parse(file.ContentDisposition).Size;

                        decimal? fileSize= file.Length;
                      

                        if (Math.Round(Convert.ToDecimal(fileSize / (1024 * 1024)), 2) <= AppSettings.UploadFileSize)
                        {

                            AttachmentDetails attachmentDetails = new AttachmentDetails();
                            string fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                            string filePath = Path.Combine(AppSettings.UploadFilePath, moduleName, referenceId.ToString());

                            if (!Directory.Exists(filePath))
                            {
                                Directory.CreateDirectory(filePath);
                            }

                            string fullPath = Path.Combine(filePath, fileName);
                            using (var stream = new FileStream(fullPath, FileMode.Create))
                            {
                                file.CopyTo(stream);
                            }

                            //attachmentDetails.Code = "";
                            attachmentDetails.Description = file.Name;
                            attachmentDetails.FileFormat = "";
                            //attachmentDetails.Memo = "";

                            attachmentDetails.FileSize = Math.Round(Convert.ToDecimal(fileSize / (1024 * 1024)), 2);
                            attachmentDetails.FileName = fileName;
                            attachmentDetails.Link = fullPath;
                            attachmentDetails.FileType = file.ContentType;
                            attachmentDetails.IsActive = true;
                            attachmentDetails.IsDeleted = false;
                            attachmentDetails.UpdatedBy = attachmentDetails.CreatedBy = uploadedBy;
                            attachmentDetails.UpdatedDate = attachmentDetails.CreatedDate = DateTime.Now;

                            attachment.AttachmentDetails.Add(attachmentDetails);
                            count++;
                        }

                    }

                    _appContext.Attachment.Add(attachment);
                    _appContext.SaveChanges();

                    return attachment.AttachmentId;
                }
                return attachmentId;
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }

        public long UploadFiles(IFormFileCollection files, long? referenceId, int moduleId, string moduleName, string uploadedBy, int? masterCompanyId,long attachmentId)
        {
            int count = 0;
            //long attachmentId = 0;
            try
            {
                if (files != null && files.Count > 0)
                {                 

                    foreach (var file in files)
                    {
                        //Commented By Vijay on 10-Feb-2020 here we are not getting file size.
                        //long? fileSize = ContentDispositionHeaderValue.Parse(file.ContentDisposition).Size;

                        decimal? fileSize = file.Length;
                      
                        if (Math.Round(Convert.ToDecimal(fileSize / (1024 * 1024)), 2) <= AppSettings.UploadFileSize)
                        {

                            AttachmentDetails attachmentDetails = new AttachmentDetails();
                            string fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                            string filePath = Path.Combine(AppSettings.UploadFilePath, moduleName, referenceId.ToString());

                            if (!Directory.Exists(filePath))
                            {
                                Directory.CreateDirectory(filePath);
                            }

                            string fullPath = Path.Combine(filePath, fileName);
                            using (var stream = new FileStream(fullPath, FileMode.Create))
                            {
                                file.CopyTo(stream);
                            }
                            attachmentDetails.AttachmentId = attachmentId;
                            //attachmentDetails.Code = "";
                            attachmentDetails.Description = file.Name;
                            attachmentDetails.FileFormat = "";
                            //attachmentDetails.Memo = "";

                            attachmentDetails.FileSize = Math.Round(Convert.ToDecimal(fileSize / (1024 * 1024)), 2);
                            attachmentDetails.FileName = fileName;
                            attachmentDetails.Link = fullPath;
                            attachmentDetails.FileType = file.ContentType;
                            attachmentDetails.IsActive = true;
                            attachmentDetails.IsDeleted = false;
                            attachmentDetails.UpdatedBy = attachmentDetails.CreatedBy = uploadedBy;
                            attachmentDetails.UpdatedDate = attachmentDetails.CreatedDate = DateTime.Now;

                            _appContext.AttachmentDetails.Add(attachmentDetails);
                            count++;
                        }

                    }                   
                    _appContext.SaveChanges();

                    return attachmentId;
                }
                return attachmentId;
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }

        public List<AttachmentDetails> GetAttachmentDetails(long attachmentId, long? referenceId, int moduleId)
        {
            try
            {
                string filePath = string.Empty;
                List<AttachmentDetails> attachmentDetails = new List<AttachmentDetails>();

                 attachmentDetails = (from at in _appContext.Attachment
                              join atd in _appContext.AttachmentDetails on at.AttachmentId equals atd.AttachmentId
                              where atd.IsActive == true && at.AttachmentId == attachmentId && at.ModuleId == moduleId && at.ReferenceId == referenceId
                              select atd).ToList();

                //var result = _appContext.Attachment
                //    .Join(_appContext.AttachmentDetails,
                //           a => a.AttachmentId,
                //           ad => ad.AttachmentId,
                //           (a, ad) => new { a, ad })
                //    .Where(p => p.ad.IsDeleted == false && p.a.AttachmentId == attachmentId && p.a.ModuleId == moduleId && p.a.ReferenceId == referenceId)
                //    .Select(p => new
                //    {
                //        attachmentDetails = p.ad
                //    })
                //    .ToList();

                return attachmentDetails;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public void DeleteAttachement(List<long> attachmentDetailIds, string deletedBy)
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
            catch (Exception ex)
            {
                throw ex;
            }


        }

        public void UploadCustomFile(string moduleName, IFormFile file)
        {

            switch (moduleName)
            {
                case "UnitOfMeasure":
                    UploadUnitOfMeasure(BindCustomData<UnitOfMeasure>(file, "UnitOfMeasureId", moduleName));
                    break;

                case "Manufacturer":
                    UploadManufacturer(BindCustomData<Manufacturer>(file, "ManufacturerId", moduleName));
                    break;

                case "ItemClassification":
                    UploadItemClassfication(BindCustomData<ItemClassfication>(file, "ItemClassificationId", moduleName));
                    break;

                case "Priority":
                    UploadPriority(BindCustomData<Priority>(file, "PriorityId", moduleName));
                    break;

                case "TaxType":
                    UploadTaxType(BindCustomData<TaxType>(file, "TaxTypeId", moduleName));
                    break;

                case "CreditTerms":
                    UploadCreditTerms(BindCustomData<CreditTerms>(file, "CreditTermsId", moduleName));
                    break;


                case "Provision":
                    UploadProvision(BindCustomData<Provision>(file, "ProvisionId", moduleName));
                    break;

                case "Publication":
                    UploadPublication(BindCustomData<Publication>(file, "PublicationRecordId", moduleName));
                    break;

                case "JobTitle":
                    UploadJobTitle(BindCustomData<JobTitle>(file, "JobTitleId", moduleName));
                    break;

                case "ItemGroup":
                    UploadItemGroup(BindCustomData<Itemgroup>(file, "ItemGroupId", moduleName));
                    break;

                case "EmployeeExpertise":
                    UploadEmployeeExpertise(BindCustomData<EmployeeExpertise>(file, "EmployeeExpertiseId", moduleName));
                    break;

                case "WorkScope":
                    UploadWorkScope(BindCustomData<WorkScope>(file, "WorkScopeId", moduleName));
                    break;

                case "Currency":
                    UploadCurrency(BindCustomData<Currency>(file, "CurrencyId", moduleName));
                    break;

                case "PublicationType":
                    UploadPublicationType(BindCustomData<PublicationType>(file, "PublicationTypeId", moduleName));
                    break;

                case "WorkPerformed":
                    UploadWorkPerformed(BindCustomData<WorkPerformed>(file, "WorkPerformedId", moduleName));
                    break;

                case "AircraftModel":
                    UploadAircraftModel(BindCustomData<AircraftModel>(file, "AircraftModelId,AircraftTypeId", moduleName));
                    break;

                case "ATAChapter":
                    UploadATAChapter(BindCustomData<ATAChapter>(file, "ATAChapterId", moduleName));
                    break;

                case "DisposalType":
                    UploadDisposalType(BindCustomData<AssetDisposalType>(file, "AssetDisposalTypeId", moduleName));
                    break;

                case "DepreciationMethod":
                    UploadDepreciationMethod(BindCustomData<AssetDepreciationMethod>(file, "AssetDepreciationMethodId", moduleName));
                    break;

                case "AssetStatus":
                    UploadAssetStatus(BindCustomData<AssetStatus>(file, "AssetStatusId", moduleName));
                    break;

                case "AssetLocation":
                    UploadAssetLocation(BindCustomData<AssetLocation>(file, "AssetLocationId", moduleName));
                    break;

                case "AssetAcquisitionType":
                    UploadAssetAcquisitionType(BindCustomData<AssetAcquisitionType>(file, "AssetAcquisitionTypeId", moduleName));
                    break;

                case "DepreciationConvention":
                    UploadAssetDepConv(BindCustomData<AssetDepConvention>(file, "AssetDepConventionId", moduleName));
                    break;

                case "DepreciationInterval":
                    UploadDepInterval(BindCustomData<AssetDepreciationInterval>(file, "AssetDepreciationIntervalId", moduleName));
                    break;

                case "GLAccountClass":
                    UploadGLAccountClass(BindCustomData<GLAccountClass>(file, "GLAccountClassId", moduleName));
                    break;

                case "JobType":
                    UploadJobType(BindCustomData<JobType>(file, "JobTypeId", moduleName));
                    break;

                case "StocklineAdjustmentReason":
                    UploadStockAdjustmentReason(BindCustomData<StocklineAdjustmentReason>(file, "AdjustmentReasonId", moduleName));
                    break;

                case "Condition":
                    UploadCondition(BindCustomData<Condition>(file, "ConditionId", moduleName));
                    break;

                case "Integration":
                    UploadIntegration(BindCustomData<IntegrationPortal>(file, "IntegrationPortalId", moduleName));
                    break;
                case "Master1099":
                    UploadMaster1099(BindCustomData<Master1099>(file, "Master1099Id", moduleName));
                    break;
                case "CustomerClassification":
                    UploadCustomerClassification(BindCustomData<CustomerClassification>(file, "CustomerClassificationId", moduleName));
                    break;
                case "VendorClassification":
                    UploadVendorClassification(BindCustomData<VendorClassification>(file, "VendorClassificationId", moduleName));
                    break;
                case "CapabilityType":
                    UploadCapabilityType(BindCustomData<CapabilityType>(file, "CapabilityTypeId", moduleName));
                    break;
                case "AircraftType":
                    UploadAircraftType(BindCustomData<AircraftType>(file, "AircraftTypeId", moduleName));
                    break;
              

                default:
                    break;
            }
        }


        public IEnumerable<object> GetDocumentDetailById(long id, int moduleId)
        {
            var result = (from at in _appContext.Attachment
                          join atd in _appContext.AttachmentDetails on at.AttachmentId equals atd.AttachmentId
                          where at.ReferenceId == id && at.ModuleId == moduleId && atd.IsActive == true && atd.IsDeleted == false
                          select atd).ToList();

            return result;

        }
        public bool GetDocumentDelete(long id, string updatedBy)
        {
            bool result = false;
            try
            {
                AttachmentDetails attachmentDetails = new AttachmentDetails();
                attachmentDetails.AttachmentDetailId = id;
                attachmentDetails.UpdatedDate = DateTime.Now;
                attachmentDetails.UpdatedBy = updatedBy;
                attachmentDetails.IsDeleted = true;

                _appContext.AttachmentDetails.Attach(attachmentDetails);
                _appContext.Entry(attachmentDetails).Property(x => x.IsDeleted).IsModified = true;
                _appContext.Entry(attachmentDetails).Property(x => x.UpdatedDate).IsModified = true;
                _appContext.Entry(attachmentDetails).Property(x => x.UpdatedBy).IsModified = true;
                _appContext.SaveChanges();
                result = true;
            }
            catch (Exception)
            {
                throw;
            }

            return result;

        }



        public List<T> BindCustomData<T>(IFormFile file, string primaryKeyColumn, string moduleName) where T : class
        {
            List<T> result = new List<T>();
            int count = 0;
            int propCount = 0;
            try
            {
                T model = (T)Activator.CreateInstance(typeof(T));

                string fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                string filePath = Path.Combine(AppSettings.CustomUploadFilePath, moduleName, DateTime.Now.ToString("yyyy-MM-dd hh-mm-ss"));

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
                                    propCount = 0;
                                    if (count > 0 && reader.GetValue(0) != null && reader.GetValue(1) != null)
                                    {
                                        model = (T)Activator.CreateInstance(typeof(T));

                                        PropertyInfo[] properties = GetProperties(model);

                                        foreach (var property in properties)
                                        {

                                            if (!property.PropertyType.FullName.StartsWith("DAL.Models"))
                                            {
                                                if (property.Name.Equals("MasterCompanyId"))
                                                {
                                                    property.SetValue(model, 1);
                                                }
                                                else if (property.Name.Equals("IsActive"))
                                                {
                                                    property.SetValue(model, true);
                                                }
                                                else if (property.Name.Equals("IsDeleted")
                                                        || property.Name.Equals("IsDelete"))
                                                {
                                                    property.SetValue(model, false);
                                                }
                                                else if (property.Name.Equals("CreatedBy")
                                                         || property.Name.Equals("UpdatedBy"))
                                                {
                                                    property.SetValue(model, "System");
                                                }
                                                else if (property.Name.Equals("UpdatedDate")
                                                         || property.Name.Equals("CreatedDate"))
                                                {
                                                    property.SetValue(model, DateTime.Now);
                                                }
                                                else if (!primaryKeyColumn.Contains(property.Name)
                                                         && !property.Name.Equals("UploadStatus")
                                                         && reader.GetValue(propCount) != null)
                                                {
                                                    if (reader.GetValue(propCount).GetType().Name == "Double" && property.PropertyType.Name == "Int64")
                                                    {
                                                        property.SetValue(model, Convert.ToInt64(reader.GetValue(propCount)));
                                                    }
                                                    if (reader.GetValue(propCount).GetType().Name == "Double" && property.PropertyType.Name == "String")
                                                    {
                                                        property.SetValue(model, Convert.ToString(reader.GetValue(propCount)));
                                                    }
                                                    else if(property.Name.Equals("SequenceNo") && property.PropertyType.Name == "Int32")
                                                    {
                                                        var sequenceData = reader.GetValue(propCount);
                                                        if(sequenceData != null)
                                                        {
                                                            property.SetValue(model, Convert.ToInt32(sequenceData));
                                                        }
                                                        else
                                                        {
                                                            property.SetValue(model, 1);
                                                        }
                                                       
                                                    }
                                                    else
                                                    if (property.PropertyType.Name == "Decimal")
                                                    {
                                                        property.SetValue(model, Convert.ToDecimal(reader.GetValue(propCount)));

                                                    }
                                                    else if (property.PropertyType.Name == "Byte")
                                                    {
                                                        property.SetValue(model, Convert.ToByte(reader.GetValue(propCount)));

                                                    }
                                                    else
                                                    {
                                                        property.SetValue(model, reader.GetValue(propCount));

                                                    }
                                                    //else
                                                    //   property.SetValue(model, reader.GetValue(propCount));
                                                    propCount++;
                                                }
                                            }
                                        }
                                        result.Add(model);
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
                throw ex;
            }
            return result;
        }

        private void UploadUnitOfMeasure(List<UnitOfMeasure> unitOfMeasureList)
        {

            foreach (var item in unitOfMeasureList)
            {
                var flag = _appContext.UnitOfMeasure.Any(p => p.IsDeleted == false
                                                        && (p.Description.ToLower() == item.Description.Trim().ToLower()
                                                        || p.ShortName.ToLower() == item.ShortName.Trim().ToLower()));
                if (!flag)
                {
                    _appContext.UnitOfMeasure.Add(item);
                    _appContext.SaveChanges();
                }
            }
        }

        private void UploadManufacturer(List<Manufacturer> manufacturers)
        {
            foreach (var item in manufacturers)
            {
                var flag = _appContext.Manufacturer.Any(p => p.IsDeleted == false
                                                        && (p.Name.ToLower() == item.Name.Trim().ToLower()));
                if (!flag)
                {
                    _appContext.Manufacturer.Add(item);
                    _appContext.SaveChanges();
                }
            }
        }

        private void UploadItemClassfication(List<ItemClassfication> itemclasifications)
        {
            foreach (var item in itemclasifications)
            {
                var flag = _appContext.ItemClassification.Any(p => p.IsDeleted == false
                                                        && (p.ItemClassificationCode.ToLower() == item.ItemClassificationCode.Trim().ToLower()));
                if (!flag)
                {
                    _appContext.ItemClassification.Add(item);
                    _appContext.SaveChanges();
                }
            }
        }

        private void UploadPriority(List<Priority> priorityList)
        {
            foreach (var item in priorityList)
            {
                var flag = _appContext.Priority.Any(p => p.IsDeleted == false
                                                    && (p.Description.ToLower() == item.Description.Trim().ToLower()));
                if (!flag)
                {
                    _appContext.Priority.Add(item);
                    _appContext.SaveChanges();
                }
            }
        }

        private void UploadTaxType(List<TaxType> taxTypeList)
        {
            foreach (var item in taxTypeList)
            {
                var flag = _appContext.TaxType.Any(p => p.IsDeleted == false
                                                    && (p.Description.ToLower() == item.Description.Trim().ToLower()));
                if (!flag)
                {
                    _appContext.TaxType.Add(item);
                    _appContext.SaveChanges();
                }
            }
        }

        private void UploadCreditTerms(List<CreditTerms> credittermsList)
        {
            foreach (var item in credittermsList)
            {
                var flag = _appContext.CreditTerms.Any(p => p.IsDeleted == false
                                                    && (p.Name.ToLower() == item.Name.Trim().ToLower()));
                if (!flag)
                {
                    _appContext.CreditTerms.Add(item);
                    _appContext.SaveChanges();
                }
            }
        }

        private void UploadProvision(List<Provision> provisionList)
        {
            foreach (var item in provisionList)
            {
                var flag = _appContext.Provision.Any(p => p.IsDelete == false
                                                    && (p.Description.ToLower() == item.Description.Trim().ToLower()));
                if (!flag)
                {
                    _appContext.Provision.Add(item);
                    _appContext.SaveChanges();
                }
            }
        }

        private void UploadPublication(List<Publication> publicationList)
        {
            foreach (var item in publicationList)
            {
                var flag = _appContext.Publication.Any(p => p.IsDeleted == false
                                                    && (p.PublicationId.ToLower() == item.PublicationId.Trim().ToLower()));
                if (!flag)
                {
                    _appContext.Publication.Add(item);
                    _appContext.SaveChanges();
                }
            }
        }

        private void UploadJobTitle(List<JobTitle> jobTitleList)
        {
            foreach (var item in jobTitleList)
            {
                var flag = _appContext.JobTitle.Any(p => p.IsDeleted == false
                                                    && (p.Description.ToLower() == item.Description.Trim().ToLower()));
                if (!flag)
                {
                    _appContext.JobTitle.Add(item);
                    _appContext.SaveChanges();
                }
            }
        }

        private void UploadItemGroup(List<Itemgroup> itemgroupList)
        {
            foreach (var item in itemgroupList)
            {
                var flag = _appContext.Itemgroup.Any(p => p.IsDelete == false
                                                    && (p.ItemGroupCode.ToLower() == item.ItemGroupCode.Trim().ToLower()));
                if (!flag)
                {
                    _appContext.Itemgroup.Add(item);
                    _appContext.SaveChanges();
                }
            }
        }

        private void UploadEmployeeExpertise(List<EmployeeExpertise> employeeExpertiseList)
        {
            foreach (var item in employeeExpertiseList)
            {
                var flag = _appContext.EmployeeExpertise.Any(p => p.IsDelete == false
                                                    && (p.Description.ToLower() == item.Description.Trim().ToLower()));
                if (!flag)
                {
                    _appContext.EmployeeExpertise.Add(item);
                    _appContext.SaveChanges();
                }
            }
        }

        private void UploadWorkScope(List<WorkScope> workScopeList)
        {
            foreach (var item in workScopeList)
            {
                var flag = _appContext.WorkScope.Any(p => p.IsDelete == false
                                                    && (p.WorkScopeCode.ToLower() == item.WorkScopeCode.Trim().ToLower()));
                if (!flag)
                {
                    _appContext.WorkScope.Add(item);
                    _appContext.SaveChanges();
                }
            }
        }

        private void UploadCurrency(List<Currency> currencyList)
        {
            foreach (var item in currencyList)
            {
                var flag = _appContext.Currency.Any(p => p.IsDeleted == false
                                                    && (p.Code.ToLower() == item.Code.Trim().ToLower()
                                                    && p.Symbol.ToLower() == item.Symbol
                                                    && p.DisplayName.ToLower() == item.DisplayName.Trim().ToLower()));
                if (!flag)
                {
                    _appContext.Currency.Add(item);
                    _appContext.SaveChanges();
                }
            }
        }

        private void UploadPublicationType(List<PublicationType> publicationTypeList)
        {
            foreach (var item in publicationTypeList)
            {
                var flag = _appContext.PublicationType.Any(p => p.IsDeleted == false && p.Name.ToLower() == item.Name.Trim().ToLower());
                if (!flag)
                {
                    _appContext.PublicationType.Add(item);
                    _appContext.SaveChanges();
                }
            }
        }

        private void UploadWorkPerformed(List<WorkPerformed> workPerformedList)
        {
            foreach (var item in workPerformedList)
            {
                var flag = _appContext.WorkPerformed.Any(p => p.IsDelete == false && p.WorkPerformedCode.ToLower() == item.WorkPerformedCode.Trim().ToLower());
                if (!flag)
                {
                    _appContext.WorkPerformed.Add(item);
                    _appContext.SaveChanges();
                }
            }
        }

        private void UploadAircraftModel(List<AircraftModel> aircraftModelList)
        {
            var aircraftTypes = _appContext.AircraftType.Where(p => p.IsDeleted == false).ToList();
            foreach (var item in aircraftModelList)
            {
                var aircraftType = aircraftTypes.Where(p => p.Description.ToLower() == item.AircraftTypeName.ToLower()).FirstOrDefault();
                if (aircraftType != null && aircraftType.AircraftTypeId > 0)
                {
                    item.AircraftTypeId = Convert.ToInt32(aircraftType.AircraftTypeId);
                    var flag = _appContext.AircraftModel.Any(p => p.IsDeleted == false && p.ModelName.ToLower() == item.ModelName.Trim().ToLower() && p.AircraftTypeId == item.AircraftTypeId);
                    if (!flag)
                    {
                        _appContext.AircraftModel.Add(item);
                        _appContext.SaveChanges();
                    }
                }
            }
        }
       
        private void UploadATAChapter(List<ATAChapter> ataChapterList)
        {

            foreach (var item in ataChapterList)
            {

                var flag = _appContext.ATAChapter.Any(p => p.IsDeleted == false && p.ATAChapterName.ToLower() == item.ATAChapterName.Trim().ToLower());
                if (!flag)
                {
                    _appContext.ATAChapter.Add(item);
                    _appContext.SaveChanges();
                }
            }
        }
        private void UploadDisposalType(List<AssetDisposalType> assetDispTypeList)
        {

            foreach (var item in assetDispTypeList)
            {

                var flag = _appContext.AssetDisposalType.Any(p => p.IsDeleted == false && !string.IsNullOrEmpty(p.AssetDisposalCode)
                && !string.IsNullOrEmpty(p.AssetDisposalCode) &&
                p.AssetDisposalCode.ToLower() == item.AssetDisposalCode.Trim().ToLower());
                if (!flag)
                {
                    _appContext.AssetDisposalType.Add(item);
                    _appContext.SaveChanges();
                }
            }
        }

        private void UploadDepreciationMethod(List<AssetDepreciationMethod> assetDepMethodList)
        {

            foreach (var item in assetDepMethodList)
            {

                var flag = _appContext.AssetDepreciationMethod.Any(p => p.IsDeleted == false && !string.IsNullOrEmpty(p.AssetDepreciationMethodCode)
                && !string.IsNullOrEmpty(p.AssetDepreciationMethodCode) &&
                p.AssetDepreciationMethodCode.ToLower() == item.AssetDepreciationMethodCode.Trim().ToLower());
                if (!flag)
                {
                    _appContext.AssetDepreciationMethod.Add(item);
                    _appContext.SaveChanges();
                }
            }
        }

        private void UploadAssetStatus(List<AssetStatus> assetStatusList)
        {

            foreach (var item in assetStatusList)
            {

                var flag = _appContext.AssetStatus.Any(p => p.IsDelete == false && !string.IsNullOrEmpty(p.Code)
                && !string.IsNullOrEmpty(p.Code) &&
                p.Code.ToLower() == item.Code.Trim().ToLower());
                if (!flag)
                {
                    _appContext.AssetStatus.Add(item);
                    _appContext.SaveChanges();
                }
            }
        }

        private void UploadAssetAcquisitionType(List<AssetAcquisitionType> AssetAcquisitionTypeList)
        {

            foreach (var item in AssetAcquisitionTypeList)
            {

                var flag = _appContext.AssetAcquisitionType.Any(p => p.IsDeleted == false && !string.IsNullOrEmpty(p.Code)
                && !string.IsNullOrEmpty(p.Code) &&
                p.Code.ToLower() == item.Code.Trim().ToLower());
                if (!flag)
                {
                    _appContext.AssetAcquisitionType.Add(item);
                    _appContext.SaveChanges();
                }
            }
        }

        private void UploadAssetLocation(List<AssetLocation> AssetLocationList)
        {

            foreach (var item in AssetLocationList)
            {

                var flag = _appContext.AssetLocation.Any(p => p.IsDeleted == false && !string.IsNullOrEmpty(p.Code)
                && !string.IsNullOrEmpty(p.Code) &&
                p.Code.ToLower() == item.Code.Trim().ToLower());
                if (!flag)
                {
                    _appContext.AssetLocation.Add(item);
                    _appContext.SaveChanges();
                }
            }
        }

        private void UploadAssetDepConv(List<AssetDepConvention> assetDepConvList)
        {

            foreach (var item in assetDepConvList)
            {

                var flag = _appContext.AssetDepConvention.Any(p => p.IsDeleted == false && !string.IsNullOrEmpty(p.AssetDepConventionCode)
                && !string.IsNullOrEmpty(p.AssetDepConventionCode) &&
                p.AssetDepConventionCode.ToLower() == item.AssetDepConventionCode.Trim().ToLower());
                if (!flag)
                {
                    _appContext.AssetDepConvention.Add(item);
                    _appContext.SaveChanges();
                }
            }
        }

        private void UploadDepInterval(List<AssetDepreciationInterval> assetDepIntList)
        {

            foreach (var item in assetDepIntList)
            {

                var flag = _appContext.AssetDepreciationInterval.Any(p => p.IsDeleted == false && !string.IsNullOrEmpty(p.AssetDepreciationIntervalCode)
                && !string.IsNullOrEmpty(p.AssetDepreciationIntervalCode) &&
                p.AssetDepreciationIntervalCode.ToLower() == item.AssetDepreciationIntervalCode.Trim().ToLower());
                if (!flag)
                {
                    _appContext.AssetDepreciationInterval.Add(item);
                    _appContext.SaveChanges();
                }
            }
        }

        private void UploadGLAccountClass(List<GLAccountClass> glAccountCLassList)
        {

            foreach (var item in glAccountCLassList)
            {

                var flag = _appContext.GLAccountClass.Any(p => p.IsDeleted == false && !string.IsNullOrEmpty(p.GLAccountClassName)
                && !string.IsNullOrEmpty(p.GLAccountClassName) &&
                p.GLAccountClassName.ToLower() == item.GLAccountClassName.Trim().ToLower());
                if (!flag)
                {
                    _appContext.GLAccountClass.Add(item);
                    _appContext.SaveChanges();
                }
            }
        }
        private void UploadStockAdjustmentReason(List<StocklineAdjustmentReason> stocklineAdjustmentReasonList)
        {

            foreach (var item in stocklineAdjustmentReasonList)
            {

                var flag = _appContext.stocklineAdjustmentReason.Any(p => p.IsDeleted == false && !string.IsNullOrEmpty(p.Description)
                && !string.IsNullOrEmpty(p.Description) &&
                p.Description.ToLower() == item.Description.Trim().ToLower());
                if (!flag)
                {
                    _appContext.stocklineAdjustmentReason.Add(item);
                    _appContext.SaveChanges();
                }
            }
        }

        private void UploadCondition(List<Condition> ConditionList)
        {

            foreach (var item in ConditionList)
            {

                var flag = _appContext.Condition.Any(p => p.IsDeleted == false && !string.IsNullOrEmpty(p.Description)
                && !string.IsNullOrEmpty(p.Description) &&
                p.Description.ToLower() == item.Description.Trim().ToLower());
                if (!flag)
                {
                    _appContext.Condition.Add(item);
                    _appContext.SaveChanges();
                }
            }
        }

        private void UploadIntegration(List<IntegrationPortal> IntegrationList)
        {

            foreach (var item in IntegrationList)
            {

                var flag = _appContext.IntegrationPortal.Any(p => p.IsDeleted == false && !string.IsNullOrEmpty(p.Description)
                && !string.IsNullOrEmpty(p.Description) &&
                p.Description.ToLower() == item.Description.Trim().ToLower());
                if (!flag)
                {
                    _appContext.IntegrationPortal.Add(item);
                    _appContext.SaveChanges();
                }
            }
        }

        private void UploadItemClass(List<ItemClassfication> ItemClassficationList)
        {

            foreach (var item in ItemClassficationList)
            {

                var flag = _appContext.ItemClassification.Any(p => p.IsDeleted == false && !string.IsNullOrEmpty(p.ItemClassificationCode)
                && !string.IsNullOrEmpty(p.Description) &&
                p.Description.ToLower() == item.ItemClassificationCode.Trim().ToLower());
                if (!flag)
                {
                    _appContext.ItemClassification.Add(item);
                    _appContext.SaveChanges();
                }
            }
        }

        private void UploadJobType(List<JobType> jobTypeList)
        {

            foreach (var item in jobTypeList)
            {

                var flag = _appContext.JobType.Any(p => p.IsDeleted == false && !string.IsNullOrEmpty(p.JobTypeName)
                && p.JobTypeName.ToLower() == item.JobTypeName.Trim().ToLower());
                if (!flag)
                {
                    _appContext.JobType.Add(item);
                    _appContext.SaveChanges();
                }
            }
        }

        private void UploadMaster1099(List<Master1099> master1099List)
        {

            foreach (var item in master1099List)
            {

                var flag = _appContext.Master1099.Any(p => p.IsDeleted == false && !string.IsNullOrEmpty(p.Description)
                && p.Description.ToLower() == item.Description.Trim().ToLower());
                if (!flag)
                {
                    _appContext.Master1099.Add(item);
                    _appContext.SaveChanges();
                }
            }
        }

        private void UploadCustomerClassification(List<CustomerClassification> classificationList)
        {

            foreach (var item in classificationList)
            {

                var flag = _appContext.CustomerClassification.Any(p => p.IsDeleted == false && !string.IsNullOrEmpty(p.Description)
                && p.Description.ToLower() == item.Description.Trim().ToLower());
                if (!flag)
                {
                    _appContext.CustomerClassification.Add(item);
                    _appContext.SaveChanges();
                }
            }
        }
        private void UploadVendorClassification(List<VendorClassification> classificationList)
        {

            foreach (var item in classificationList)
            {

                var flag = _appContext.VendorClassification.Any(p => p.IsDeleted == false && !string.IsNullOrEmpty(p.ClassificationName)
                && p.ClassificationName.ToLower() == item.ClassificationName.Trim().ToLower());
                if (!flag)
                {
                    _appContext.VendorClassification.Add(item);
                    _appContext.SaveChanges();
                }
            }
        }

        private void UploadCapabilityType(List<CapabilityType> capabilityList)
        {

            foreach (var item in capabilityList)
            {

                var flag = _appContext.capabilityType.Any(p => p.IsDeleted == false && (!string.IsNullOrEmpty(p.Description)
                && p.Description.ToLower() == item.Description.Trim().ToLower())||p.SequenceNo==item.SequenceNo);
              
                if (!flag)
                {
                    _appContext.capabilityType.Add(item);
                    _appContext.SaveChanges();
                }
            }
        }

        private void UploadAircraftType(List<AircraftType> aircraftList)
        {

            foreach (var item in aircraftList)
            {

                var flag = _appContext.AircraftType.Any(p => p.IsDeleted == false && (!string.IsNullOrEmpty(p.Description)
                && p.Description.ToLower() == item.Description.Trim().ToLower()));

                if (!flag)
                {
                    _appContext.AircraftType.Add(item);
                    _appContext.SaveChanges();
                }
            }
        }
        public void UploadDashNumberCustomData(IFormFile file)
        {
            string modelname = string.Empty;
            string aircrafttypename = string.Empty;
           
            List<object> obj = new List<object>();

            int count = 0;
            try
            {

                AircraftDashNumber air;

                string fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                string filePath = Path.Combine(AppSettings.CustomUploadFilePath, Convert.ToString(ModuleEnum.CustomerInternationalShippingAddress), DateTime.Now.ToString("yyyy-MM-dd hh-mm-ss"));

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
                                    if (count > 0 && reader.GetValue(0) != null && reader.GetValue(1) != null && reader.GetValue(2) != null)
                                    {

                                        air = new AircraftDashNumber();
                                        if (reader.GetValue(3) != null)
                                        {
                                            air.Memo = Convert.ToString(reader.GetValue(3));
                                        }
                                        if (reader.GetValue(0) != null)
                                        {
                                            aircrafttypename = Convert.ToString(reader.GetValue(0));

                                            var aircraftType = _appContext.AircraftType.Where(p => p.Description.ToLower() == aircrafttypename.Trim().ToLower()).FirstOrDefault();


                                            if (aircraftType != null && aircraftType.AircraftTypeId > 0)
                                            {
                                                var aircraftModels = _appContext.AircraftModel.Where(p => p.IsDeleted == false && p.AircraftTypeId == aircraftType.AircraftTypeId).ToList();
                                                if (reader.GetValue(1) != null)
                                                {
                                                    modelname = Convert.ToString(reader.GetValue(1));


                                                    var aircraftModel = aircraftModels.Where(p => p.ModelName.ToLower() == modelname.Trim().ToLower()).FirstOrDefault();
                                                    if (aircraftModel != null && aircraftModel.AircraftModelId > 0)
                                                    {
                                                        air.AircraftTypeId = Convert.ToInt32(aircraftType.AircraftTypeId);
                                                        air.AircraftModelId = Convert.ToInt64(aircraftModel.AircraftModelId);
                                                        if (reader.GetValue(2) != null)
                                                        {
                                                            air.DashNumber = Convert.ToString(reader.GetValue(2));
                                                            var flag = _appContext.AircraftDashNumber.Any(p => p.IsDeleted == false && p.DashNumber.ToLower() == air.DashNumber.Trim().ToLower() && p.AircraftTypeId == air.AircraftTypeId && p.AircraftModelId == air.AircraftModelId);
                                                            air.MasterCompanyId = 1;
                                                            air.IsActive = true;
                                                            air.IsDeleted = false;

                                                            air.CreatedBy = air.UpdatedBy = "System";
                                                            air.UpdatedDate = air.CreatedDate = DateTime.Now;


                                                            if (!flag)
                                                            {
                                                                _appContext.AircraftDashNumber.Add(air);
                                                                _appContext.SaveChanges();
                                                            }
                                                        }
                                                    }
                                                }
                                            }
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

            }

        }

        private static PropertyInfo[] GetProperties(object obj)
        {
            return obj.GetType().GetProperties();
        }

        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;
    }
}
