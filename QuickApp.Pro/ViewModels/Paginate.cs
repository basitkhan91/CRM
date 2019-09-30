using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DAL.Models;


namespace QuickApp.Pro.ViewModels
{


    #region Individual items
    public class ColumHeader
    {
        public string field { get; set; }
        public string header { get; set; }
    }

    //public class ColumnData
    //{
    //    List<dynamic> DynamicRows { get; set; }
    //}

    //public class DynamicGridData
    //{
    //    public List<ColumHeader>  columHeaders { get; set; }
    //    public IEnumerable<UnitOfMeasureModel> ColumnData { get; set; }
    //}

    public class DynamicGridData<T> where T : class
    {
        public List<ColumHeader> columHeaders { get; set; }
        public IEnumerable<T> ColumnData { get; set; }

		public int TotalRecords { get; set;  }

	} 
    #endregion

    public class PaginateViewModel
    {
        public int first { get; set; }
        public int page { get; set; }
        public int pageCount { get; set; }
        public int rows { get; set; }
        public int limit { get; set; }
    }

    public interface IPaginateViewModel
    {
        int first { get; set; }
        int page { get; set; }
        int pageCount { get; set; }
        int rows { get; set; }
        int limit { get; set; }
    }

    public interface ISortedViewModel
    {
        int sortOrder { get; set; }
        string sortField { get; set;}
    }

    #region Customer List
    public class CustomerSearchViewModel : CustomerModel, IPaginateViewModel,ISortedViewModel
    {
        public int first { get; set; }
        public int page { get; set; }
        public int pageCount { get; set; }
        public int rows { get; set; }
        public int limit { get; set; }
        public string sortField { get; set; }
        public int sortOrder { get; set; }
        public int totalRecords { get; set; }
    }

    public class CustomerModel
    {
        public string CustomerCode { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string PrimarySalesPersonFirstName { get; set; }
        public string City { get; set; }
        public string StateOrProvince { get; set; }
        public string CustomerType { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string CreatedBy { get; set; }
        public DateTime? UpdatedDate { get; set; }
        public string UpdatedBy { get; set; }
        public long CustomerId { get; internal set; }
        public bool? IsActive { get; internal set; }

		public string CustomerPhone { get; set; }
        public string CustomerPhoneExt { get; set; }

        public string CustomerClarifiacationName { get; set; }
    }
    #endregion

    #region unitOfMeasure
    public class UnitOfMeasureSearchViewModel : UnitOfMeasureModel, IPaginateViewModel
    {
        public int first { get; set; }
        public int page { get; set; }
        public int pageCount { get; set; }
        public int rows { get; set; }
        public int limit { get; set; }
    }
    public class UnitOfMeasureModel
    {
        public long UnitOfMeasureId { get; set; }
        public string Description { get; set; }
        public string ShortName { get; set; }
        public string Memo { get; set; }
        public string Standard { get; set; }
        public string CreatedBy { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime? UpdatedDate { get; set; }
        public DateTime CreatedDate { get; set; }
        public bool? IsActive { get; set; }
    }
    public class UnitOfMeasureSPModel
    {
        public string Description { get; set; }
        public string ShortName { get; set; }
        public string Memo { get; set; }
        public string Standard { get; set; }
    }
    #endregion

    #region Itemgroup
    public class ItemGroupViewModel : Itemgroup, IPaginateViewModel
    {
        public int first { get; set; }
        public int page { get; set; }
        public int pageCount { get; set; }
        public int rows { get; set; }
        public int limit { get; set; }
    }
    public class ItemgroupModel
    {

        public long ItemGroupId { get; set; }

        public string ItemGroupCode { get; set; }
        public string Memo { get; set; }

        public string Description { get; set; }

        public Int32 MasterCompanyId { get; set; }

        public string CreatedBy { get; set; }

        public string UpdatedBy { get; set; }

        public DateTime CreatedDate { get; set; }

        public DateTime UpdatedDate { get; set; }

    }
    #endregion

    #region itemClassification
    public class ItemClassificationViewModel : ItemClassfication, IPaginateViewModel
    {
        public int first { get; set; }
        public int page { get; set; }
        public int pageCount { get; set; }
        public int rows { get; set; }
        public int limit { get; set; }
    }
    #endregion

    #region itemClassification
    public class ManufacturerPaginationViewModel : Manufacturer, IPaginateViewModel
    {
        public int first { get; set; }
        public int page { get; set; }
        public int pageCount { get; set; }
        public int rows { get; set; }
        public int limit { get; set; }
    }
    public class ManufacturerModel
    {
        public long ManufacturerId { get; set; }
        public string Name { get; set; }
        public Int32 MasterCompanyId { get; set; }
        public string Comments { get; set; }
        public string CreatedBy { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime UpdatedDate { get; set; }
    }
    public class ItemClassficationModel
    {
        public long ItemClassificationId { get; set; }
        public string ItemClassificationCode { get; set; }
        public string Description { get; set; }
        public string ItemType { get; set; }
        public string Memo { get; set; }
        public Int32 MasterCompanyId { get; set; }
        public string CreatedBy { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime UpdatedDate { get; set; }
       // public bool? IsActive { get; set; }
    }
    #endregion

    #region charge
    public class ChargePaginationViewModel : Charge, IPaginateViewModel
    {
        public int first { get; set; }
        public int page { get; set; }
        public int pageCount { get; set; }
        public int rows { get; set; }
        public int limit { get; set; }
    }
    #endregion

    #region Reason
    public class ReasonPaginationViewModel : Reason, IPaginateViewModel
    {
        public int first { get; set; }
        public int page { get; set; }
        public int pageCount { get; set; }
        public int rows { get; set; }
        public int limit { get; set; }
    }


    public class ReasonModel
    {
        public long ReasonId { get; set; }
        public string ReasonCode { get; set; }
        public string ReasonForRemoval { get; set; }
        public string Memo { get; set; }
        //public bool? IsActive { get; set; }
        public string CreatedBy { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime? UpdatedDate { get; set; }
    }
    #endregion

    #region Currency
    public class CurrencyPaginationViewModel : Currency, IPaginateViewModel
    {
        public int first { get; set; }
        public int page { get; set; }
        public int pageCount { get; set; }
        public int rows { get; set; }
        public int limit { get; set; }
    }

    public class CurrencyModel 
    {
        public Int32 CurrencyId { get; set; }

        public string Code { get; set; }

        public string Memo { get; set; }

        public string Symbol { get; set; }

        public string DisplayName { get; set; }
        public string CreatedBy { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime? UpdatedDate { get; set; }
        //public bool? IsActive { get; set; }
        //public bool? IsDelete { get; set; }
    }

    #endregion

    #region Currency
    public class GlAccountClassPaginationViewModel : GLAccountClass, IPaginateViewModel
    {
        public int first { get; set; }
        public int page { get; set; }
        public int pageCount { get; set; }
        public int rows { get; set; }
        public int limit { get; set; }
        public int totalNoRecords { get; set; }
    }


    public class GLAccountClassModel
    {
        public long GLAccountClassId { get; set; }

        public long GLCID { get; set; }

        public string GLAccountClassName { get; set; }

        public string CreatedBy { get; set; }

        public string UpdatedBy { get; set; }

        public DateTime CreatedDate { get; set; }

        public DateTime? UpdatedDate { get; set; }

        //public bool? IsActive { get; set; }

        //public bool? IsDelete { get; set; }
    }
    #endregion

    #region Currency - GLAccount
    public class GLAccountModel
    {
        public long? GLAccountTypeId { get; set; }
        public string Name { get; set; }
        public string CreatedBy { get; set; }

        public string UpdatedBy { get; set; }

        public DateTime CreatedDate { get; set; }

        public DateTime? UpdatedDate { get; set; }
    }
    #endregion


    #region Currency
    public class GlClassFlowClassificationPaginationViewModel : GlClassFlowClassification, IPaginateViewModel
    {
        public int first { get; set; }
        public int page { get; set; }
        public int pageCount { get; set; }
        public int rows { get; set; }
        public int limit { get; set; }
    }
    #endregion

    #region Currency
    public class TaxRatePaginationViewModel : TaxRates, IPaginateViewModel
    {
        public int first { get; set; }
        public int page { get; set; }
        public int pageCount { get; set; }
        public int rows { get; set; }
        public int limit { get; set; }
    }
    #endregion

    #region Currency
    public class TaxtypePaginationViewModel : TaxType, IPaginateViewModel
    {
        public int first { get; set; }
        public int page { get; set; }
        public int pageCount { get; set; }
        public int rows { get; set; }
        public int limit { get; set; }
    }
    #endregion

    #region Global Search
    public class GlobalSearchModel : IPaginateViewModel
    {
        public int first { get; set; }
        public int page { get; set; }
        public int pageCount { get; set; }
        public int rows { get; set; }
        public int limit { get; set; }
        //public 
        public string GlobalSearchString { get; set; }
    }
    #endregion

    #region TaxType
    public class TaxTypePaginationViewModel : TaxType, IPaginateViewModel
    {
        public int first { get; set; }
        public int page { get; set; }
        public int pageCount { get; set; }
        public int rows { get; set; }
        public int limit { get; set; }
    }
    #endregion

    #region Document
    public class DocumentPaginationViewModel : Document, IPaginateViewModel
    {
        public int first { get; set; }
        public int page { get; set; }
        public int pageCount { get; set; }
        public int rows { get; set; }
        public int limit { get; set; }

		public string Memo { get; set; }
		public string Link { get; set; }
	}
    #endregion

    #region DefaultMessage
    public class DefaultMessagePaginationViewModel : DefaultMessage, IPaginateViewModel
    {
        public int first { get; set; }
        public int page { get; set; }
        public int pageCount { get; set; }
        public int rows { get; set; }
        public int limit { get; set; }
    }
    #endregion

    #region AircraftType
    public class AircraftTypePaginationViewModel : AircraftType, IPaginateViewModel
    {
        public int first { get; set; }
        public int page { get; set; }
        public int pageCount { get; set; }
        public int rows { get; set; }
        public int limit { get; set; }
    }
    #endregion

    #region AircraftModel
    public class AircraftModelPaginationViewModel : AircraftModel, IPaginateViewModel
    {
        public int first { get; set; }
        public int page { get; set; }
        public int pageCount { get; set; }
        public int rows { get; set; }
        public int limit { get; set; }
    }
    #endregion

    #region AircraftDashNumber
    public class AircraftDashNumberPaginationViewModel : AircraftDashNumber, IPaginateViewModel
    {
        public int first { get; set; }
        public int page { get; set; }
        public int pageCount { get; set; }
        public int rows { get; set; }
        public int limit { get; set; }
    }
    #endregion

    #region AssetDepreciationMethod
    public class AssetDepreciationMethodModel : PasBase
    {
       public long? AssetDepreciationMethodId { get; set; }
        public string AssetDepreciationMethodName { get; set; }

        public string AssetDepreciationMethodCode { get; set; }
        public string AssetDepreciationMethodBasis { get; set; }
        public string AssetDepreciationMemo { get; set; }
        public Int32 MasterCompanyId { get; set; }
        public bool? IsActive { get; set; }
    }
    #endregion

    #region ATAChapter
    public class ATAChapterPaginationViewModel : ATAChapter, IPaginateViewModel
    {
        public int first { get; set; }
        public int page { get; set; }
        public int pageCount { get; set; }
        public int rows { get; set; }
        public int limit { get; set; }
    }
    #endregion

    #region AssetIntangibleAttributeType
    public class AssetIntangibleAttributeTypeModel 
    {
        public long AssetIntangibleAttributeTypeId { get; set; }
        public int IntangibleLife { get; set; }
        public string AmortizationFrequency { get; set; }
    }
    #endregion

    #region AssetDepreciationInterval
    public class AssetDepreciationIntervalModel
    {
        public long AssetDepreciationIntervalId { get; set; }
        public string AssetDepreciationIntervalCode { get; set; }
        public string AssetDepreciationIntervalName { get; set; }
        public string AssetDepreciationIntervalMemo { get; set; }
    }
    #endregion
    #region Credit Terms
    public class CreditTermsModel
    {
        public string Name { get; set; }
        public string Memo { get; set; }
        public byte? Percentage { get; set; }
        public byte? Days { get; set; }
        public byte? NetDays { get; set; }
    }
    #endregion

    #region Findings model
    public class FindingModel
    {
        public long FindingId { get; set; }
        public string FindingCode { get; set; }
        public string Memo { get; set; }
        public string Description { get; set; }
    }
    #endregion

    #region Work Performed
    public class WorkPerformedModel 
    {
        public string Description { get; set; }
        public string WorkPerformedCode { get; set; }
        public string Memo { get; set; }
    }
    #endregion

    #region Gate codes
    public class GateCodeModel
    {
        public string GateCode { get; set; }
        public string Description { get; set; }
        public string Sequence { get; set; }
        public string Memo { get; set; }
    }
    #endregion
    #region Expenditure Category
    public class ExpenditureCategoryModel 
    {
        public long ExpenditureCategoryId { get; set; }
        public string Description { get; set; }
        public string Memo { get; set; }
    }
    #endregion
}