using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DAL.Models;
namespace QuickApp.Pro.ViewModels
{
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

    #region Customer List
    public class CustomerSearchViewModel : CustomerModel, IPaginateViewModel
    {
        public int first { get; set; }
        public int page { get; set; }
        public int pageCount { get; set; }
        public int rows { get; set; }
        public int limit { get; set; }
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
    #endregion

    #region unitOfMeasure
    public class ItemGroupViewModel : Itemgroup, IPaginateViewModel
    {
        public int first { get; set; }
        public int page { get; set; }
        public int pageCount { get; set; }
        public int rows { get; set; }
        public int limit { get; set; }
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
    #region GlClassFlowClassification
    public class GlClassFlowClassificationPaginationViewModel : GlClassFlowClassification, IPaginateViewModel
    {
        public int first { get; set; }
        public int page { get; set; }
        public int pageCount { get; set; }
        public int rows { get; set; }
        public int limit { get; set; }
    }
    #endregion

    
    #region TaxRate
    public class GlAccountClassPaginationViewModel : GLAccountClass, IPaginateViewModel
    {
        public int first { get; set; }
        public int page { get; set; }
        public int pageCount { get; set; }
        public int rows { get; set; }
        public int limit { get; set; }
    }
    #endregion
    #region TaxRate
    public class TaxRatePaginationViewModel : TaxRates, IPaginateViewModel
    {
        public int first { get; set; }
        public int page { get; set; }
        public int pageCount { get; set; }
        public int rows { get; set; }
        public int limit { get; set; }
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
}