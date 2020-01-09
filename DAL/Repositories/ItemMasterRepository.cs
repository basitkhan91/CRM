using DAL.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using Microsoft.EntityFrameworkCore;

using System.Threading.Tasks;
using DAL.Core;
using DAL.Models;
using DAL.Common;
using System.Linq.Expressions;
using EntityFrameworkPaginate;

namespace DAL.Repositories
{
    public class ItemMasterRepository : Repository<DAL.Models.ItemMaster>, IItemMaster
    {
        public ItemMasterRepository(ApplicationDbContext context) : base(context)
        { }
        public IEnumerable<object> getByID(long itemMasterId)
        {
            try
            {

                var data = (from iM in _appContext.ItemMaster
                            join iPortal in _appContext.ItemMasterIntegrationPortal on iM.ItemMasterId equals iPortal.ItemMasterId into iPortalIds
                            join country in _appContext.Countries on iM.ExportCountryId equals country.countries_id into countryID
                            from ct in countryID.DefaultIfEmpty()
                            join mfg in _appContext.Manufacturer on iM.ManufacturerId equals mfg.ManufacturerId into mfgID
                            from mfgs in mfgID.DefaultIfEmpty()
                            join site in _appContext.Site on iM.SiteId equals site.SiteId into siteID
                            from sites in siteID.DefaultIfEmpty()
                            join warehouse in _appContext.Warehouse on iM.WarehouseId equals warehouse.WarehouseId into warehouseID
                            from warehouses in warehouseID.DefaultIfEmpty()
                            join location in _appContext.Location on iM.LocationId equals location.LocationId into locationID
                            from locations in locationID.DefaultIfEmpty()
                            join shelf in _appContext.Shelf on iM.ShelfId equals shelf.ShelfId into shelfID
                            from shelfs in shelfID.DefaultIfEmpty()
                            join bin in _appContext.Bin on iM.BinId equals bin.BinId into binID
                            from bins in binID.DefaultIfEmpty()
                            join imst in _appContext.ItemMaster on iM.oemPNId equals imst.ItemMasterId into Imast
                            from oemid in Imast.DefaultIfEmpty()
                            where iM.ItemMasterId == itemMasterId

                            select new
                            {
                                iM.PartNumber,
                                iM.ItemTypeId,
                                iM.PartDescription,
                                iM.ExchangeListPrice,
                                iM.OverheadCost,
                                iM.IsAlternatePartChecked,
                                iM.TurnTimeOverhaulHours,
                                iM.TurnTimeRepairHours,
                                iM.IsSerialized,
                                iM.ItemGroupId,
                                iM.ItemClassificationId,
                                iM.IsAcquiredMethodBuy,
                                iM.IsHazardousMaterial,
                                iM.IsExpirationDateAvailable,
                                iM.ExpirationDate,
                                iM.IsReceivedDateAvailable,
                                iM.DaysReceived,
                                iM.IsManufacturingDateAvailable,
                                iM.ManufacturingDays,
                                iM.IsTagDateAvailable,
                                iM.TagDays,
                                iM.IsOpenDateAvailable,
                                iM.OpenDays,
                                iM.IsShippedDateAvailable,
                                iM.ShippedDays,
                                iM.IsOtherDateAvailable,
                                iM.OtherDays,
                                iM.ShelfLife,
                                iM.ProvisionId,
                                iM.ManufacturerId,
                                iM.PurchaseLastListPriceDate,
                                iM.SalesLastSalePriceDate,
                                iM.PurchaseLastDiscountPercentDate,
                                iM.PurchaseLastListPriceAfterDiscountDate,
                                iM.SalesLastMarkUpPercentOnListPriceDate,
                                iM.SalesLastMakUpPercentOnListPriceAfterDiscDate,
                                iM.SalesLastBaselineSalesPriceDate,
                                iM.SalesLastSalesDiscountPercentDate,
                                iM.PMA,
                                iM.DER,
                                iM.ATAChapterId,
                                iM.ATASubChapterId,
                                iM.NationalStockNumber,
                                iM.IsSchematic,
                                iM.SalesIsFixedPrice,
                                iM.OverhaulHours,
                                iM.RPHours,
                                iM.SalesPrice,
                                iM.SalesCurrencyId,
                                iM.TestHours,
                                iM.CSE,
                                iM.RFQTracking,
                                iM.GLAccountId,
                                iM.PurchaseUnitOfMeasureId,
                                iM.ExportUomId,
                                iM.StockUnitOfMeasureId,
                                iM.ConsumeUnitOfMeasureId,
                                iM.SoldUnitOfMeasureId,
                                iM.LeadTimeDays,
                                iM.LeadTimeHours,
                                iM.ReorderQuantiy,
                                iM.ReorderPoint,
                                iM.MinimumOrderQuantity,
                                iM.IsExchangeInfoAvailable,
                                iM.CoreValue,
                                iM.PartListPrice,
                                iM.POCoreCharge,
                                iM.SOCoreCharge,
                                iM.PriorityId,
                                iM.WarningId,
                                iM.Memo,
                                iM.ExportECCN,
                                iM.ITARNumber,
                                iM.ExportCountryId,
                                iM.ExportValue,
                                iM.ExportCurrencyId,
                                iM.ExportWeight,
                                iM.ExportWeightUnit,
                                iM.ExportSizeLength,
                                iM.ExportSizeWidth,
                                iM.ExportSizeHeight,
                                iM.ExportSizeUnit,
                                iM.ExportClassificationId,
                                iM.PurchaseDiscountOffListPrice,
                                iM.PurchaseListPriceAfterDiscount,
                                iM.PurchaseCurrencyId,
                                iM.SalesMarkUpOnPurchaseListPriceActive,
                                iM.SalesMarkUpOnListPrice,
                                iM.SalesDiscountPercent,
                                iM.SalesMarkUpOnListPriceAfterDisc,
                                iM.SalesBaselineSalesPrice,
                                iM.StandAloneEquipment,
                                iM.ComponentEquipment,
                                iM.MasterCompanyId,
                                iM.IsTimeLife,
                                iM.ListPrice,
                                iM.PriceDate,
                                iM.UnitCost,
                                iM.DiscountPurchasePercent,
                                iM.ItemNonStockClassificationId,
                                iM.StockLevel,
                                iM.ShelfLifeAvailable,
                                iM.isPma,
                                iM.mfgHours,
                                iM.turnTimeMfg,
                                iM.turnTimeBenchTest,
                                iM.IsExportUnspecified,
                                iM.IsExportNONMilitary,
                                iM.IsExportMilitary,
                                iM.IsExportDual,
                                iM.RevisedPartId,
                                iM.SiteId,
                                iM.WarehouseId,
                                iM.LocationId,
                                iM.ShelfId,
                                iM.BinId,

                                ManufacturerName = mfgs == null ? "" : mfgs.Name,
                                SiteName = sites == null ? "" : sites.Name,
                                WarehouseName = warehouses == null ? "" : warehouses.Name,
                                LocationName = locations == null ? "" : locations.Name,
                                ShelfName = shelfs == null ? "" : shelfs.Name,
                                BinName = bins == null ? "" : bins.Name,
                                CountryData = countryID.ToList(),
                                //CountryName = ct == null ? "" : ct.countries_name,
                                //IPortalIDS = iPortalIds.Select(e => e.IntegrationPortalId).ToList(),
                                IntegrationPortalIds = iPortalIds.Select(e => e.IntegrationPortalId).ToList(),
                                //IntegrationPortalIds = iPortalIds.ToList(),
                                oemPNData = Imast.ToList(),


                            }).ToList();

                return data;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public IEnumerable<DAL.Models.ItemMaster> getAlldata()
        {
            return null;

        }
        public IEnumerable<object> Getdescriptionbypart(string partNumber)
        {
            {
                var data = (from t in _appContext.ItemMaster
                            join gl in _appContext.GLAccount on t.GLAccountId equals gl.GLAccountId
                            where t.PartNumber == partNumber
                            select new
                            {
                                t,
                                t.PartDescription,
                                t.IsSerialized,
                                t.TagDays,
                                t.PMA,
                                t.DER,
                                t.IsTimeLife,
                                t.ItemMasterId,
                                t.GLAccountId,
                                t.ManufacturerId,
                                t.Manufacturer,
                                t.NHA,
                                gl.AccountName,
                                t.ShelfLife
                            }).ToList();
                return data;
            }
        }

        public IEnumerable<object> getItemMasterData(long id)
        {
            try
            {
                var data = (from iM in _appContext.ItemMaster
                            join iPortal in _appContext.ItemMasterIntegrationPortal on iM.ItemMasterId equals iPortal.ItemMasterId into iPortalIds
                            join country in _appContext.Countries on iM.ExportCountryId equals country.countries_id
                            where iM.ItemMasterId == id

                            select new
                            {
                                iM,
                                iM.PartDescription,
                                iM.IsSerialized,
                                iM.TagDays,
                                iM.PMA,
                                iM.DER,
                                iM.IsTimeLife,
                                iM.ItemMasterId,
                                iM.GLAccountId,
                                iM.ManufacturerId,
                                iM.Manufacturer,
                                iM.ShelfLifeAvailable,
                                country.countries_name,
                                iM.isPma,
                                iM.mfgHours,
                                iM.turnTimeMfg,
                                iM.turnTimeBenchTest,
                                iM.IsExportUnspecified,
                                iM.IsExportNONMilitary,
                                iM.IsExportMilitary,
                                iM.IsExportDual,
                                iM.oemPNId,
                                IPortalIDS = iPortalIds.Select(e => e.IntegrationPortalId).ToList()
                            }).ToList();
                return data;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public IEnumerable<object> GetSelectedAircraftModeldata(long id)
        {

            {
                var data = (from iM in _appContext.ItemMasterAircraftModel
                            where iM.ItemMasterId == id

                            select new
                            {
                                iM.ItemMasterAircraftModelId,
                                iM.ItemMasterId,
                                iM.DashNumber,
                                iM.AircraftModelId,
                                iM.IsActive


                            }).ToList();
                return data;
            }
        }


        public IEnumerable<object> aircraftManufacturerData(long id)
        {

            {
                var data = (from iM in _appContext.ItemMasterAircraftMapping
                            where iM.ItemMasterId == id

                            select new
                            {
                                iM.ItemMasterAircraftMappingId,
                                iM.ItemMasterId,
                                iM.AircraftTypeId,
                                iM.IsActive


                            }).ToList();
                return data;
            }
        }

        public IEnumerable<object> getAllItemMasterdata()
        {
            var data = (from IM in _appContext.ItemMaster

                        join MF in _appContext.Manufacturer on IM.ManufacturerId equals MF.ManufacturerId into mfg

                        from MF in mfg.DefaultIfEmpty()

                        join PS in _appContext.Provision on IM.ProvisionId equals PS.ProvisionId into pro

                        from PS in pro.DefaultIfEmpty()

                        join PR in _appContext.Priority on IM.PriorityId equals PR.PriorityId into pri

                        from PR in pri.DefaultIfEmpty()

                        where

                        (IM.ItemTypeId == 1 && IM.IsActive == true)
                        select new
                        {
                            IM,
                            MF,
                            PS,
                            PR,
                            IM.PartNumber,
                            Manufacturerdesc = MF.Name,
                            MF.Comments,
                            MF.ManufacturerId,
                            IM.PartDescription,
                            PS.ProvisionId,
                            Provisiondesc = PS.Description,
                            PR.PriorityId,
                            Prioritydesc = PR.Description,
                            IM.NationalStockNumber,
                            IM.IsHazardousMaterial,
                            IM.ItemMasterId,
                            IM.isPma,
                            IM.mfgHours,
                            IM.turnTimeMfg,
                            IM.turnTimeBenchTest,
                            IM.IsExportUnspecified,
                            IM.IsExportNONMilitary,
                            IM.IsExportMilitary,
                            IM.IsExportDual
                        }).ToList();
            return data;

        }


        public IEnumerable<object> getRolesData()
        {
            var data = (from IM in _appContext.UserRoleLevelEntity



                        join PT in _appContext.UserRoleLevel on IM.UserRoleLevelId equals PT.UserRoleLevelId into pt

                        from PT in pt.DefaultIfEmpty()
                        join PS in _appContext.UIRoleEntity on IM.UIRoleEntityId equals PS.UIRoleEntityId into pro

                        from PS in pro.DefaultIfEmpty()
                        join MF in _appContext.PermittedEditAction on IM.PermittedEditActionId equals MF.PermittedEditActionId into mfg

                        from MF in mfg.DefaultIfEmpty()

                        select new
                        {
                            IM.UserRoleLevelEntityId,
                            PT.UserRoleLevelId,
                            UserRoleLevelDescription = PT.Description,
                            PS.EntityName,
                            PS.ModuleName,
                            PS.ScreenName,
                            PS.TableName,
                            PS.FieldName,
                            MF.PermittedEditActionId,
                            PermittedEditActionDescription = MF.Description
                        }).ToList();
            return data;

        }

        public IEnumerable<object> getRolesDatayRoleId(long value)
        {
            var data = (from IM in _appContext.UserRoleLevelEntity



                        join PT in _appContext.UserRoleLevel on IM.UserRoleLevelId equals PT.UserRoleLevelId into pt

                        from PT in pt.DefaultIfEmpty()
                        join PS in _appContext.UIRoleEntity on IM.UIRoleEntityId equals PS.UIRoleEntityId into pro

                        from PS in pro.DefaultIfEmpty()
                        join MF in _appContext.PermittedEditAction on IM.PermittedEditActionId equals MF.PermittedEditActionId into mfg
                        from MF in mfg.DefaultIfEmpty()
                        where PT.UserRoleLevelId == value

                        select new
                        {
                            IM.UserRoleLevelEntityId,
                            PT.UserRoleLevelId,
                            UserRoleLevelDescription = PT.Description,
                            PS.EntityName,
                            PS.ModuleName,
                            PS.ScreenName,
                            PS.TableName,
                            PS.FieldName,
                            MF.PermittedEditActionId,
                            PermittedEditActionDescription = MF.Description,
                            PS.UIRoleEntityId

                        }).ToList();
            return data;

        }

        public IEnumerable<object> getLegalEntityAccountsData(long value)
        {
            var data = (from e in _appContext.LegalEntity
                        join dw in _appContext.DomesticWirePayment on e.DomesticWirePaymentId equals dw.DomesticWirePaymentId into domesticwire
                        from domeswire in domesticwire.DefaultIfEmpty()
                        join iw in _appContext.InternationalWirePayment on e.InternationalWirePaymentId equals iw.InternationalWirePaymentId into interwire
                        from internalwire in interwire.DefaultIfEmpty()
                        join ach in _appContext.ACH on e.ACHId equals ach.ACHId into achdetails
                        from achdata in achdetails.DefaultIfEmpty()

                        where e.LegalEntityId == value


                        select new
                        {
                            e.LegalEntityId,
                            domeswire.AccountNumber,
                            internalwire.BeneficiaryBankAccount,
                            achAccountNumber = achdata.AccountNumber

                        }).ToList();

            return data;
        }

        public IEnumerable<object> getAllItemMasterStockdata()
        {
            var data = _appContext.ItemMaster.Include("Manufacturer").Include("Provision").Include("GLAccount").
                Include("Priority").Include("ItemClassification").Include("Currency").Include("ExportClassification")

                   .Where(a => a.ItemTypeId == 1 && (a.IsDeleted == false || a.IsDeleted == null)).OrderByDescending(a => a.ItemMasterId).ToList();


            return data;
        }


        public IEnumerable<object> getLegalEntityData()
        {
            var leftOuterJoin = from e in _appContext.LegalEntity
                                join d in _appContext.Address on e.AddressId equals d.AddressId into dept
                                from department in dept.DefaultIfEmpty()
                                join dw in _appContext.DomesticWirePayment on e.DomesticWirePaymentId equals dw.DomesticWirePaymentId into domesticwire
                                from domeswire in domesticwire.DefaultIfEmpty()
                                join iw in _appContext.InternationalWirePayment on e.InternationalWirePaymentId equals iw.InternationalWirePaymentId into interwire
                                from internalwire in interwire.DefaultIfEmpty()
                                join lbad in _appContext.Address on e.LockBoxAddressId equals lbad.AddressId into lockboxaddress
                                from lockboxaddressdetails in lockboxaddress.DefaultIfEmpty()
                                join ach in _appContext.ACH on e.ACHId equals ach.ACHId into achdetails
                                from achdata in achdetails.DefaultIfEmpty()

                                where e.IsDeleted == false || e.IsDeleted == null


                                select new
                                {
                                    Name = e.Name,
                                    Description = e.Description,
                                    DoingLegalAs = e.DoingLegalAs,
                                    Address1 = department.Line1,
                                    Address2 = department.Line2,
                                    City = department.City,
                                    StateOrProvince = department.StateOrProvince,
                                    PostalCode = department.PostalCode,
                                    Country = department.Country,
                                    FunctionalCurrencyId = e.FunctionalCurrencyId,
                                    ReportingCurrencyId = e.ReportingCurrencyId,
                                    IsBalancingEntity = e.IsBalancingEntity,
                                    CageCode = e.CageCode,
                                    e.LegalEntityId,
                                    LockboxAddressid = lockboxaddressdetails.AddressId,
                                    DomesticIntermediateBank = domeswire.IntermediaryBankName,
                                    department.AddressId,
                                    BankStreetaddress1 = lockboxaddressdetails.Line1,
                                    BankStreetaddress2 = lockboxaddressdetails.Line2,
                                    BankCity = lockboxaddressdetails.City,
                                    BankProvince = lockboxaddressdetails.StateOrProvince,
                                    Bankcountry = lockboxaddressdetails.Country,
                                    BankpostalCode = lockboxaddressdetails.PostalCode,
                                    DomesticBankName = domeswire.BankName,
                                    DomesticBenficiaryBankName = domeswire.BenificiaryBankName,
                                    DomesticBankAccountNumber = domeswire.AccountNumber,
                                    DomesticABANumber = domeswire.ABA,
                                    InternationalBankName = internalwire.BeneficiaryBank,
                                    InternationalIntermediateBank = internalwire.BeneficiaryBank,
                                    InternationalBenficiaryBankName = internalwire.BeneficiaryBank,
                                    InternationalBankAccountNumber = internalwire.BeneficiaryBankAccount,
                                    InternationalSWIFTID = internalwire.SwiftCode,
                                    e.ParentId,
                                    e.CreatedBy,
                                    e.CreatedDate,
                                    e.UpdatedBy,
                                    e.UpdatedDate,
                                    e.FAALicense,
                                    e.FaxNumber,
                                    e.PhoneNumber1,
                                    e.TaxId,
                                    e.IsLastLevel,
                                    e.DomesticWirePaymentId,
                                    e.InternationalWirePaymentId,
                                    e.LockBoxAddressId,
                                    e.ACHId,
                                    achdata,
                                    achBankName = achdata.BankName,
                                    achIntermediateBank = achdata.IntermediateBankName,
                                    achBenficiaryBankName = achdata.BeneficiaryBankName,
                                    achBankAccountNumber = achdata.AccountNumber,
                                    achABANumber = achdata.ABA,
                                    achSWIFTID = achdata.SwiftCode,
                                    IsBankingInfo = e.IsBankingInfo,

                                };

            return leftOuterJoin.OrderByDescending(a => a.LegalEntityId).ToList();
        }



        public IEnumerable<object> getAllItemMasterNonstockdata()
        {

            var data = _appContext.ItemMaster.Include("Manufacturer").Include("ItemClassification").Include("Currency")
                .Where(a => a.ItemTypeId == 2 && (a.IsDeleted == false || a.IsDeleted == null)).OrderByDescending(a => a.ItemMasterId).ToList();
            return data;
        }

        public IEnumerable<object> getAllItemMasterequipmentdata()
        {
            var data = _appContext.ItemMaster.Include("Equipment").Include("EquipmentValidationType").Include("Manufacturer")

                 .Where(a => a.ItemTypeId == 3 && (a.IsDeleted == false || a.IsDeleted == null)).OrderByDescending(a => a.ItemMasterId).ToList();
            return data;

        }


        public IEnumerable<object> Getdescriptionbypart(long partNumber)
        {
            var data = (from IM in _appContext.ItemMaster

                        where (
                        IM.ItemTypeId == 1 && IM.IsActive == true)

                        select new
                        {
                            IM,
                            IM.PartDescription,
                        }).ToList();
            return data;

        }


        public IEnumerable<object> getIntegrationData(long id)
        {

            {
                var data = (from iM in _appContext.ItemMasterIntegrationPortal
                            where iM.ItemMasterId == id

                            select new
                            {
                                iM.ItemMasterIntegrationPortalId,
                                iM.ItemMasterId,
                                iM.IntegrationPortalId,
                                iM.IsActive


                            }).ToList();
                return data;
            }
        }


        public IEnumerable<object> getCapabilityData(long id)
        {

            {
                var data = (from iM in _appContext.Capability
                            where iM.ItemMasterId == id

                            select new
                            {
                                iM.CapabilityId,
                                iM.CapabilityTypeId,
                                iM.Description,
                                iM.AircraftTypeId,
                                iM.AircraftModelId,
                                iM.AircraftManufacturer,
                                iM.ItemMasterId,
                                iM.IsCMMExist,
                                iM.IsVerified,
                                iM.Memo,
                                iM.ATAChapterId,
                                iM.ManufacturerId,
                                iM.ManagementStructureId,
                                iM.IsDelete

                            }).ToList();
                return data;
            }
        }

        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;
        public IEnumerable<object> GetAircraftMapped(long ItemmasterId)
        {
            {
                //int[] myMids = Mid.Split(',').Select(n => Convert.ToInt32(n)).ToArray();

                var data = (from iM in _appContext.ItemMasterAircraftMapping
                            where iM.ItemMasterId == ItemmasterId && iM.IsActive == true && iM.IsDeleted == false
                            select new
                            {
                                iM.ItemMasterAircraftMappingId,
                                iM.ItemMasterId,
                                iM.AircraftTypeId,
                                iM.AircraftType,
                                iM.AircraftModelId,
                                iM.DashNumberId,
                                iM.PartNumber,
                                iM.DashNumber,
                                iM.AircraftModel,
                                iM.Memo

                            }).ToList();
                return data;
            }
        }
        public IEnumerable<object> GetATAMapped(long ItemMasterid)
        {
            {
                //int[] myMids = Mid.Split(',').Select(n => Convert.ToInt32(n)).ToArray();

                var data = (from iM in _appContext.ItemMasterATAMapping
                            where iM.ItemMasterId == ItemMasterid && iM.IsActive == true && iM.IsDeleted == false
                            select new
                            {
                                iM.ItemMasterATAMappingId,
                                iM.ItemMasterId,
                                iM.ATAChapterId,
                                iM.ATAChapterCode,
                                iM.ATAChapterName,
                                iM.PartNumber,
                                iM.ATASubChapterId,
                                iM.ATASubChapterDescription


                            }).ToList();
                return data;
            }
        }

        public IEnumerable<object> getItemAircraftMappingDataByMultiTypeIdModelIDDashID(long ItemmasterId, string AircraftTypeId, string AirModelId, string DashNumberId)
        {
            var myAircraftTypeId = AircraftTypeId.Split(',').Select(n => Convert.ToInt64(n)).ToArray();
            var myAircraftModelId = AirModelId.Split(',').Select(y => Convert.ToInt64(y)).ToArray();
            var myDashNumberId = DashNumberId.Split(',').Select(x => Convert.ToInt64(x)).ToArray();
            var data = (from it in _appContext.ItemMasterAircraftMapping
                        where it.AircraftModelId != null && it.DashNumberId != null && it.IsActive == true && it.ItemMasterId == ItemmasterId && myAircraftTypeId.Contains(it.AircraftTypeId) && myAircraftModelId.Contains(it.AircraftModelId.Value) && myDashNumberId.Contains(it.DashNumberId.Value)

                        select new
                        {
                            it.ItemMasterId,
                            it.PartNumber,
                            it.AircraftTypeId,
                            it.AircraftModelId,
                            it.DashNumberId,
                            it.DashNumber,
                            it.AircraftType,
                            it.AircraftModel,
                            it.Memo,
                            it.MasterCompanyId,
                            it.IsActive,
                            it.IsDeleted
                        }).ToList();
            return data;
        }

        public IEnumerable<object> getItemATAMappingDataByMultiTypeIdATAIDATASUBID(long ItemMasterid, string ATAID, string ATASubID)
        {
            long[] myATAID = ATAID.Split(',').Select(n => Convert.ToInt64(n)).ToArray();
            long[] myATASubID = ATASubID.Split(',').Select(x => Convert.ToInt64(x)).ToArray();
            var data = (from iM in _appContext.ItemMasterATAMapping
                        where iM.ItemMasterId == ItemMasterid && myATAID.Contains(iM.ATAChapterId) && myATASubID.Contains(iM.ATASubChapterId) && iM.IsActive == true && iM.IsDeleted == false
                        select new
                        {
                            iM.ItemMasterATAMappingId,
                            iM.ItemMasterId,
                            iM.ATAChapterId,
                            iM.ATAChapterCode,
                            iM.ATAChapterName,
                            iM.PartNumber,
                            iM.ATASubChapterId,
                            iM.ATASubChapterDescription
                        }).ToList();
            return data;
        }

        public IEnumerable<object> searchItemAircraftMappingDataByMultiTypeIdModelIDDashID(long ItemmasterId, string AircraftTypeId, string AircraftModelId, string DashNumberId)
        {
            long[] myAircraftTypeId = null;
            long[] myAircraftModelId = null;
            long[] myDashNumberId = null;
            if (AircraftTypeId != null && AircraftTypeId != "")
                myAircraftTypeId = AircraftTypeId.Split(',').Select(n => Convert.ToInt64(n)).ToArray();
            if (AircraftModelId != null && AircraftModelId != "")
                myAircraftModelId = AircraftModelId.Split(',').Select(y => Convert.ToInt64(y)).ToArray();
            if (DashNumberId != null && DashNumberId != "")
                myDashNumberId = DashNumberId.Split(',').Select(x => Convert.ToInt64(x)).ToArray();
            if (AircraftTypeId != null && AircraftModelId != null && myDashNumberId != null)
            {
                var data = (from it in _appContext.ItemMasterAircraftMapping
                            where it.IsActive == true && it.ItemMasterId == ItemmasterId && myAircraftTypeId.Contains(it.AircraftTypeId) && myAircraftModelId.Contains(it.AircraftModelId.Value) && myDashNumberId.Contains(it.DashNumberId.Value) && it.IsDeleted != true
                            select new { it.ItemMasterId, it.PartNumber, it.AircraftTypeId, it.AircraftModelId, it.DashNumberId, it.DashNumber, it.AircraftType, it.AircraftModel, it.Memo, it.MasterCompanyId, it.IsActive, it.IsDeleted }).ToList();
                var uniquedata = data.GroupBy(item => new { item.AircraftTypeId, item.AircraftModelId, item.DashNumberId }).Select(group => group.First()).ToList();
                return uniquedata;
            }
            else if (AircraftTypeId != null && AircraftModelId != null && myDashNumberId == null)
            {
                var data = (from it in _appContext.ItemMasterAircraftMapping
                            where it.IsActive == true && it.ItemMasterId == ItemmasterId && myAircraftTypeId.Contains(it.AircraftTypeId) && myAircraftModelId.Contains(it.AircraftModelId.Value) && it.IsDeleted != true
                            select new { it.ItemMasterId, it.PartNumber, it.AircraftTypeId, it.AircraftModelId, it.DashNumberId, it.DashNumber, it.AircraftType, it.AircraftModel, it.Memo, it.MasterCompanyId, it.IsActive, it.IsDeleted }).ToList();
                var uniquedata = data.GroupBy(item => new { item.AircraftTypeId, item.AircraftModelId, item.DashNumberId }).Select(group => group.First()).ToList();
                return uniquedata;
            }
            else if (AircraftTypeId != null && myAircraftModelId == null && myDashNumberId == null)
            {
                var data = (from it in _appContext.ItemMasterAircraftMapping
                            where it.IsActive == true && it.ItemMasterId == ItemmasterId && myAircraftTypeId.Contains(it.AircraftTypeId) && it.IsDeleted != true
                            select new { it.ItemMasterId, it.PartNumber, it.AircraftTypeId, it.AircraftModelId, it.DashNumberId, it.DashNumber, it.AircraftType, it.AircraftModel, it.Memo, it.MasterCompanyId, it.IsActive, it.IsDeleted }).ToList();
                var uniquedata = data.GroupBy(item => new { item.AircraftTypeId, item.AircraftModelId, item.DashNumberId }).Select(group => group.First()).ToList();
                return uniquedata;
            }
            else if (AircraftTypeId != null && myAircraftModelId == null && myDashNumberId != null)
            {
                var data = (from it in _appContext.ItemMasterAircraftMapping
                            where it.IsActive == true && it.ItemMasterId == ItemmasterId && myAircraftTypeId.Contains(it.AircraftTypeId) && myDashNumberId.Contains(it.DashNumberId.Value) && it.IsDeleted != true
                            select new { it.ItemMasterId, it.PartNumber, it.AircraftTypeId, it.AircraftModelId, it.DashNumberId, it.DashNumber, it.AircraftType, it.AircraftModel, it.Memo, it.MasterCompanyId, it.IsActive, it.IsDeleted }).ToList();
                var uniquedata = data.GroupBy(item => new { item.AircraftTypeId, item.AircraftModelId, item.DashNumberId }).Select(group => group.First()).ToList();
                return uniquedata;
            }
            else if (AircraftTypeId == null && AircraftModelId != null && myDashNumberId != null)
            {
                var data = (from it in _appContext.ItemMasterAircraftMapping
                            where it.IsActive == true && it.ItemMasterId == ItemmasterId && myAircraftModelId.Contains(it.AircraftModelId.Value) && myDashNumberId.Contains(it.DashNumberId.Value) && it.IsDeleted != true
                            select new { it.ItemMasterId, it.PartNumber, it.AircraftTypeId, it.AircraftModelId, it.DashNumberId, it.DashNumber, it.AircraftType, it.AircraftModel, it.Memo, it.MasterCompanyId, it.IsActive, it.IsDeleted }).ToList();
                var uniquedata = data.GroupBy(item => new { item.AircraftTypeId, item.AircraftModelId, item.DashNumberId }).Select(group => group.First()).ToList();
                return uniquedata;
            }
            else if (AircraftTypeId == null && AircraftModelId != null && myDashNumberId == null)
            {
                var data = (from it in _appContext.ItemMasterAircraftMapping
                            where it.IsActive == true && it.ItemMasterId == ItemmasterId && myAircraftModelId.Contains(it.AircraftModelId.Value) && it.IsDeleted != true
                            select new { it.ItemMasterId, it.PartNumber, it.AircraftTypeId, it.AircraftModelId, it.DashNumberId, it.DashNumber, it.AircraftType, it.AircraftModel, it.Memo, it.MasterCompanyId, it.IsActive, it.IsDeleted }).ToList();
                var uniquedata = data.GroupBy(item => new { item.AircraftTypeId, item.AircraftModelId, item.DashNumberId }).Select(group => group.First()).ToList();
                return uniquedata;
            }
            else if (AircraftTypeId == null && myAircraftModelId == null && myDashNumberId != null)
            {
                var data = (from it in _appContext.ItemMasterAircraftMapping
                            where it.IsActive == true && it.ItemMasterId == ItemmasterId && myDashNumberId.Contains(it.DashNumberId.Value) && it.IsDeleted != true
                            select new { it.ItemMasterId, it.PartNumber, it.AircraftTypeId, it.AircraftModelId, it.DashNumberId, it.DashNumber, it.AircraftType, it.AircraftModel, it.Memo, it.MasterCompanyId, it.IsActive, it.IsDeleted }).ToList();
                var uniquedata = data.GroupBy(item => new { item.AircraftTypeId, item.AircraftModelId, item.DashNumberId }).Select(group => group.First()).ToList();
                return uniquedata;
            }
            else
            {
                var data = (from it in _appContext.ItemMasterAircraftMapping
                            where it.IsActive == true && it.ItemMasterId == ItemmasterId && it.IsDeleted != true
                            select new { it.ItemMasterId, it.PartNumber, it.AircraftTypeId, it.AircraftModelId, it.DashNumberId, it.DashNumber, it.AircraftType, it.AircraftModel, it.Memo, it.MasterCompanyId, it.IsActive, it.IsDeleted }).ToList();
                var uniquedata = data.GroupBy(item => new { item.AircraftTypeId, item.AircraftModelId, item.DashNumberId }).Select(group => group.First()).ToList();
                return uniquedata;
            }
        }

        public IEnumerable<object> searchgetItemATAMappingDataByMultiTypeIdATAIDATASUBID(long ItemMasterid, string ATAChapterId, string ATASubChapterID)
        {
            long[] myATAChapterId = null;
            long[] myATASubChapterID = null;
            if (ATAChapterId != null && ATAChapterId != "")
                myATAChapterId = ATAChapterId.Split(',').Select(n => Convert.ToInt64(n)).ToArray();
            if (ATASubChapterID != null && ATASubChapterID != "")
                myATASubChapterID = ATASubChapterID.Split(',').Select(y => Convert.ToInt64(y)).ToArray();
            if (ATAChapterId != null && ATASubChapterID != null)
            {
                var data = (from iM in _appContext.ItemMasterATAMapping
                            where iM.ItemMasterId == ItemMasterid && myATAChapterId.Contains(iM.ATAChapterId) && myATASubChapterID.Contains(iM.ATASubChapterId) && iM.IsActive == true && iM.IsDeleted != true
                            select new { iM.ItemMasterATAMappingId, iM.ItemMasterId, iM.ATAChapterId, iM.ATAChapterCode, iM.ATAChapterName, iM.PartNumber, iM.ATASubChapterId, iM.ATASubChapterDescription }).ToList();
                var uniquedata = data.GroupBy(item => new { item.ATAChapterId, item.ATASubChapterId }).Select(group => group.First()).ToList();
                return uniquedata;
            }
            else if (ATAChapterId != null && ATASubChapterID == null)
            {
                var data = (from iM in _appContext.ItemMasterATAMapping
                            where iM.ItemMasterId == ItemMasterid && myATAChapterId.Contains(iM.ATAChapterId) && iM.IsActive == true && iM.IsDeleted != true
                            select new { iM.ItemMasterATAMappingId, iM.ItemMasterId, iM.ATAChapterId, iM.ATAChapterCode, iM.ATAChapterName, iM.PartNumber, iM.ATASubChapterId, iM.ATASubChapterDescription }).ToList();
                var uniquedata = data.GroupBy(item => new { item.ATAChapterId, item.ATASubChapterId }).Select(group => group.First()).ToList();
                return uniquedata;

            }
            else if (ATAChapterId == null && ATASubChapterID != null)
            {
                var data = (from iM in _appContext.ItemMasterATAMapping
                            where iM.ItemMasterId == ItemMasterid && myATASubChapterID.Contains(iM.ATASubChapterId) && iM.IsActive == true && iM.IsDeleted != true
                            select new { iM.ItemMasterATAMappingId, iM.ItemMasterId, iM.ATAChapterId, iM.ATAChapterCode, iM.ATAChapterName, iM.PartNumber, iM.ATASubChapterId, iM.ATASubChapterDescription }).ToList();
                var uniquedata = data.GroupBy(item => new { item.ATAChapterId, item.ATASubChapterId }).Select(group => group.First()).ToList();
                return uniquedata;

            }
            else
            {
                var data = (from iM in _appContext.ItemMasterATAMapping
                            where iM.ItemMasterId == ItemMasterid && iM.IsActive == true && iM.IsDeleted != true
                            select new { iM.ItemMasterATAMappingId, iM.ItemMasterId, iM.ATAChapterId, iM.ATAChapterCode, iM.ATAChapterName, iM.PartNumber, iM.ATASubChapterId, iM.ATASubChapterDescription }).ToList();
                var uniquedata = data.GroupBy(item => new { item.ATAChapterId, item.ATASubChapterId }).Select(group => group.First()).ToList();
                return uniquedata;

            }
        }

        public IEnumerable<object> gePurcSaleByItemMasterID(long ItemMasterid)
        {

            var data = (from iM in _appContext.ItemMasterPurchaseSale
                        where iM.ItemMasterId == ItemMasterid && iM.IsActive == true && iM.IsDeleted == false
                        select new
                        {
                            iM.Condition,
                            iM.ItemMasterId,
                            iM.ItemMasterPurchaseSaleId,
                            iM.PartNumber,
                            iM.PP_CurrencyId,
                            iM.PP_FXRatePerc,
                            iM.PP_LastListPriceDate,
                            iM.PP_LastPurchaseDiscDate,
                            iM.PP_PurchaseDiscAmount,
                            iM.PP_PurchaseDiscPerc,
                            iM.PP_UnitPurchasePrice,
                            iM.PP_UOMId,
                            iM.PP_VendorListPrice,
                            iM.SP_CalSPByPP_BaseSalePrice,
                            iM.SP_CalSPByPP_LastMarkUpDate,
                            iM.SP_CalSPByPP_LastSalesDiscDate,
                            iM.SP_CalSPByPP_MarkUpAmount,
                            iM.SP_CalSPByPP_MarkUpPercOnListPrice,
                            iM.SP_CalSPByPP_SaleDiscAmount,
                            iM.SP_CalSPByPP_SaleDiscPerc,
                            iM.SP_CalSPByPP_UnitSalePrice,
                            iM.SP_FSP_CurrencyId,
                            iM.SP_FSP_FlatPriceAmount,
                            iM.SP_FSP_FXRatePerc,
                            iM.SP_FSP_LastFlatPriceDate,
                            iM.SP_FSP_UOMId,
                            iM.UpdatedBy,
                            iM.UpdatedDate,
                            iM.IsActive,
                            iM.IsDeleted,
                            iM.CreatedBy,
                            iM.CreatedDate,



                        }).ToList();
            return data;
        }

        public Nha_Tla_Alt_Equ_ItemMapping CreateNhaTlaAltEquPart(Nha_Tla_Alt_Equ_ItemMapping part)
        {
            try
            {
                _appContext.Nha_Tla_Alt_Equ_ItemMapping.Add(part);
                _appContext.SaveChanges();
                return part;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public Nha_Tla_Alt_Equ_ItemMapping UpdateNhaTlaAltEquPart(Nha_Tla_Alt_Equ_ItemMapping part)
        {
            try
            {
                _appContext.Nha_Tla_Alt_Equ_ItemMapping.Update(part);
                _appContext.SaveChanges();
                return part;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public IEnumerable<object> NhaTlaAltEquPartList(Common.Filters<NhaAltEquFilters> filters)
        {
            try
            {
                if (filters.filters == null)
                    filters.filters = new NhaAltEquFilters();
                var pageNumber = filters.first + 1;
                var take = filters.rows;
                var skip = take * (pageNumber - 1);

                if (filters.filters.MappingItemMasterId == null)
                    filters.filters.MappingItemMasterId = 0;
                if (filters.filters.ManufacturerId == null)
                    filters.filters.ManufacturerId = 0;

                var totalRecords = (from alt in _appContext.Nha_Tla_Alt_Equ_ItemMapping
                                    join im in _appContext.ItemMaster on alt.ItemMasterId equals im.ItemMasterId
                                    join im1 in _appContext.ItemMaster on alt.MappingItemMasterId equals im1.ItemMasterId
                                    join man in _appContext.Manufacturer on im1.ManufacturerId equals man.ManufacturerId
                                    where alt.IsActive == true && alt.IsDeleted == false && alt.ItemMasterId == filters.filters.ItemMasterId
                                    && alt.MappingType == filters.filters.MappingType
                                    && alt.MappingItemMasterId == (filters.filters.MappingItemMasterId > 0 ? filters.filters.MappingItemMasterId : alt.MappingItemMasterId)
                                    && im1.PartDescription.Contains(!string.IsNullOrEmpty(filters.filters.Description) ? filters.filters.Description : im1.PartDescription)
                                    && im1.ManufacturerId == (filters.filters.ManufacturerId > 0 ? filters.filters.ManufacturerId : im1.ManufacturerId)
                                    select new
                                    {
                                        alt.ItemMappingId,
                                    }).Distinct()
                                  .Count();

                var list = (from alt in _appContext.Nha_Tla_Alt_Equ_ItemMapping
                            join im in _appContext.ItemMaster on alt.ItemMasterId equals im.ItemMasterId
                            join im1 in _appContext.ItemMaster on alt.MappingItemMasterId equals im1.ItemMasterId
                            join man in _appContext.Manufacturer on im1.ManufacturerId equals man.ManufacturerId
                            where alt.IsActive == true && alt.IsDeleted == false && alt.ItemMasterId == filters.filters.ItemMasterId
                            && alt.MappingType == filters.filters.MappingType
                            && alt.MappingItemMasterId == (filters.filters.MappingItemMasterId > 0 ? filters.filters.MappingItemMasterId : alt.MappingItemMasterId)
                            && im1.PartDescription.Contains(!string.IsNullOrEmpty(filters.filters.Description) ? filters.filters.Description : im1.PartDescription)
                            && im1.ManufacturerId == (filters.filters.ManufacturerId > 0 ? filters.filters.ManufacturerId : im1.ManufacturerId)
                            select new
                            {
                                alt.ItemMappingId,
                                im.PartNumber,
                                im.PartDescription,
                                Manufacturer = man.Name,
                                im1.ManufacturerId,
                                im.ItemMasterId,
                                AltPartNo = im1.PartNumber,
                                alt.MappingItemMasterId,
                                AltPartDescription = im1.PartDescription,
                                alt.IsActive,
                                alt.IsDeleted,
                                alt.CreatedBy,
                                alt.CreatedDate,
                                alt.MasterCompanyId,
                                alt.UpdatedBy,
                                alt.UpdatedDate,
                                alt.MappingType,
                                TotalRecords = totalRecords
                            }).Distinct()
                                  .ToList();
                return list;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public void DeleteNhaTlaAltEquPart(long mappingId, string updatedBy)
        {
            try
            {
                Nha_Tla_Alt_Equ_ItemMapping model = new Nha_Tla_Alt_Equ_ItemMapping();

                model.ItemMappingId = mappingId;
                model.IsDeleted = true;
                model.UpdatedDate = DateTime.Now;
                model.UpdatedBy = updatedBy;

                var count = _appContext.NhaTlaAltEquAudit.Where(p => p.ItemMappingId == mappingId).Count();
                if (count > 1)
                {
                    _appContext.Nha_Tla_Alt_Equ_ItemMapping.Attach(model);

                    _appContext.Entry(model).Property(x => x.IsDeleted).IsModified = true;
                    _appContext.Entry(model).Property(x => x.UpdatedDate).IsModified = true;
                    _appContext.Entry(model).Property(x => x.UpdatedBy).IsModified = true;
                }
                else
                {
                    _appContext.Nha_Tla_Alt_Equ_ItemMapping.Remove(model);
                }
                _appContext.SaveChanges();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public void NhaTlaAltEquPartStatus(long mappingId, bool status, string updatedBy)
        {
            try
            {
                Nha_Tla_Alt_Equ_ItemMapping model = new Nha_Tla_Alt_Equ_ItemMapping();

                model.ItemMappingId = mappingId;
                model.IsActive = status;
                model.UpdatedDate = DateTime.Now;
                model.UpdatedBy = updatedBy;

                _appContext.Nha_Tla_Alt_Equ_ItemMapping.Attach(model);

                _appContext.Entry(model).Property(x => x.IsActive).IsModified = true;
                _appContext.Entry(model).Property(x => x.UpdatedDate).IsModified = true;
                _appContext.Entry(model).Property(x => x.UpdatedBy).IsModified = true;

                _appContext.SaveChanges();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public IEnumerable<object> GetAlterEquParts(long itemMasterId)
        {
            try
            {
                var list = (from im in _appContext.ItemMaster
                            join ic in _appContext.ItemClassification on im.ItemClassificationId equals ic.ItemClassificationId
                            join alt in _appContext.Nha_Tla_Alt_Equ_ItemMapping on im.ItemMasterId equals alt.ItemMasterId
                            into imalt
                            from alt in imalt.DefaultIfEmpty()
                            join man in _appContext.Manufacturer on im.ManufacturerId equals man.ManufacturerId
                            where im.IsActive == true && (im.IsDeleted == false || im.IsDeleted == null)
                            && im.ItemMasterId != itemMasterId && alt.ItemMasterId == null
                            select new
                            {
                                im.ItemMasterId,
                                im.PartNumber,
                                im.PartDescription,
                                im.ManufacturerId,
                                Manufacturer = man.Name,
                                im.ItemClassificationId,
                                ItemClassification = ic.Description
                            }).Distinct()
                          .ToList();
                return list;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public Nha_Tla_Alt_Equ_ItemMapping CreateEquivalencyPart(Nha_Tla_Alt_Equ_ItemMapping part)
        {
            try
            {
                _appContext.Nha_Tla_Alt_Equ_ItemMapping.Add(part);
                _appContext.SaveChanges();
                return part;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public Nha_Tla_Alt_Equ_ItemMapping UpdateEquivalencyPart(Nha_Tla_Alt_Equ_ItemMapping part)
        {
            try
            {
                _appContext.Nha_Tla_Alt_Equ_ItemMapping.Update(part);
                _appContext.SaveChanges();
                return part;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public IEnumerable<object> EquivalencyPartList(Common.Filters<NhaAltEquFilters> filters)
        {
            try
            {
                if (filters.filters == null)
                    filters.filters = new NhaAltEquFilters();
                var pageNumber = filters.first + 1;
                var take = filters.rows;
                var skip = take * (pageNumber - 1);

                if (filters.filters.MappingItemMasterId == null)
                    filters.filters.MappingItemMasterId = 0;
                if (filters.filters.ManufacturerId == null)
                    filters.filters.ManufacturerId = 0;
                if (filters.filters.ItemClassificationId == null)
                    filters.filters.ItemClassificationId = 0;

                var totalRecords = (from alt in _appContext.Nha_Tla_Alt_Equ_ItemMapping
                                    join im in _appContext.ItemMaster on alt.MappingItemMasterId equals im.ItemMasterId
                                    join im1 in _appContext.ItemMaster on alt.MappingItemMasterId equals im1.ItemMasterId
                                    join man in _appContext.Manufacturer on im.ManufacturerId equals man.ManufacturerId
                                    join ic in _appContext.ItemClassification on im.ItemClassificationId equals ic.ItemClassificationId
                                    where alt.IsActive == true && alt.IsDeleted == false && alt.ItemMasterId == filters.filters.ItemMasterId
                                    && alt.MappingType == filters.filters.MappingType
                                    && alt.MappingItemMasterId == (filters.filters.MappingItemMasterId > 0 ? filters.filters.MappingItemMasterId : alt.MappingItemMasterId)
                                    && im.PartDescription.Contains(!string.IsNullOrEmpty(filters.filters.Description) ? filters.filters.Description : im.PartDescription)
                                    && im.ManufacturerId == (filters.filters.ManufacturerId > 0 ? filters.filters.ManufacturerId : im.ManufacturerId)
                                    && im.ItemClassificationId == (filters.filters.ItemClassificationId > 0 ? filters.filters.ItemClassificationId : im.ItemClassificationId)
                                    select new
                                    {
                                        alt.ItemMappingId,
                                    }).Distinct()
                                  .Count();

                var list = (from alt in _appContext.Nha_Tla_Alt_Equ_ItemMapping
                            join im in _appContext.ItemMaster on alt.ItemMasterId equals im.ItemMasterId
                            join im1 in _appContext.ItemMaster on alt.MappingItemMasterId equals im1.ItemMasterId
                            join man in _appContext.Manufacturer on im1.ManufacturerId equals man.ManufacturerId
                            join ic in _appContext.ItemClassification on im1.ItemClassificationId equals ic.ItemClassificationId
                            where alt.IsActive == true && alt.IsDeleted == false && alt.ItemMasterId == filters.filters.ItemMasterId
                            && alt.MappingType == filters.filters.MappingType
                            && alt.MappingItemMasterId == (filters.filters.MappingItemMasterId > 0 ? filters.filters.MappingItemMasterId : alt.MappingItemMasterId)
                            && im1.PartDescription.Contains(!string.IsNullOrEmpty(filters.filters.Description) ? filters.filters.Description : im1.PartDescription)
                            && im1.ManufacturerId == (filters.filters.ManufacturerId > 0 ? filters.filters.ManufacturerId : im1.ManufacturerId)
                            && im1.ItemClassificationId == (filters.filters.ItemClassificationId > 0 ? filters.filters.ItemClassificationId : im1.ItemClassificationId)
                            select new
                            {
                                alt.ItemMappingId,
                                im.PartNumber,
                                im.PartDescription,
                                Manufacturer = man.Name,
                                im1.ManufacturerId,
                                im.ItemMasterId,
                                AltPartNo = im1.PartNumber,
                                alt.MappingItemMasterId,
                                AltPartDescription = im1.PartDescription,
                                alt.IsActive,
                                alt.IsDeleted,
                                alt.CreatedBy,
                                alt.CreatedDate,
                                alt.MasterCompanyId,
                                alt.UpdatedBy,
                                alt.UpdatedDate,
                                alt.MappingType,
                                im1.ItemClassificationId,
                                ItemClassification = ic.Description,
                                AttachmentDetails = (from at in _appContext.Attachment
                                                     join ad in _appContext.AttachmentDetails on at.AttachmentId equals ad.AttachmentId
                                                     where at.ReferenceId == alt.ItemMappingId && at.ModuleId == Convert.ToInt64(ModuleEnum.NhaTlaAltEquItemMapping)
                                                     select new
                                                     {
                                                         ad
                                                     }).OrderByDescending(p => p.ad.AttachmentDetailId).FirstOrDefault(),
                                TotalRecords = totalRecords
                            }).Distinct()
                                  .ToList();
                return list;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public IEnumerable<object> NhaTlaAltEquPartHistory(long itemMappingId)
        {
            try
            {
                var list = (from alt in _appContext.NhaTlaAltEquAudit
                            join im in _appContext.ItemMaster on alt.ItemMasterId equals im.ItemMasterId
                            join im1 in _appContext.ItemMaster on alt.MappingItemMasterId equals im1.ItemMasterId
                            join man in _appContext.Manufacturer on im.ManufacturerId equals man.ManufacturerId
                            join ic in _appContext.ItemClassification on im.ItemClassificationId equals ic.ItemClassificationId
                            where alt.ItemMappingId == itemMappingId
                            select new
                            {
                                im.PartNumber,
                                im.PartDescription,
                                Manufacturer = man.Name,
                                AltPartNo = im1.PartNumber,
                                AltPartDescription = im1.PartDescription,
                                alt.IsActive,
                                alt.IsDeleted,
                                alt.CreatedBy,
                                alt.CreatedDate,
                                alt.UpdatedBy,
                                alt.UpdatedDate,
                                ItemClassification = ic.Description,
                                AttachmentDetails = (from at in _appContext.Attachment
                                                     join ad in _appContext.AttachmentDetails on at.AttachmentId equals ad.AttachmentId
                                                     where at.ReferenceId == alt.ItemMappingId && at.ModuleId == Convert.ToInt64(ModuleEnum.NhaTlaAltEquItemMapping)
                                                     select new
                                                     {
                                                         ad
                                                     }).OrderByDescending(p => p.ad.AttachmentDetailId).FirstOrDefault(),

                            }).ToList();
                return list;
            }
            catch (Exception)
            {
                throw;
            }
        }



        public IEnumerable<ItemMaster> SearchItemMaster(ItemMaster itemMaster)
        {
            var result = Enumerable.Empty<ItemMaster>();

            return result;
        }

        public Expression<Func<ItemMaster, bool>> GetPredicate(ItemMaster itemMaster)
        {
            Expression<Func<ItemMaster, bool>> predicate = null;

            if (!string.IsNullOrWhiteSpace(itemMaster.PartNumber) && !string.IsNullOrWhiteSpace(itemMaster.PartDescription))
            {
                predicate = item => item.PartNumber.Contains(itemMaster.PartNumber) && item.PartDescription.ToLower().Contains(itemMaster.PartDescription.ToLower());

            }

            else if (!string.IsNullOrWhiteSpace(itemMaster.PartNumber) && string.IsNullOrWhiteSpace(itemMaster.PartDescription))
            {
                predicate = item => item.PartNumber.Contains(itemMaster.PartNumber);

            }

            else if (string.IsNullOrWhiteSpace(itemMaster.PartNumber) && !string.IsNullOrWhiteSpace(itemMaster.PartDescription))
            {
                predicate = item => item.PartDescription.ToLower().Contains(itemMaster.PartDescription.ToLower());

            }


            return predicate;

        }

        public IEnumerable<object> GetPartnumberList()
        {
            var result = (from at in _appContext.ItemMaster
                          join atd in _appContext.Manufacturer on at.ManufacturerId equals atd.ManufacturerId
                          where (at.IsActive == true || at.IsActive == null) && (at.IsDeleted == false || at.IsDeleted == null)
                          select new
                          {
                              at.ItemMasterId,
                              at.ItemGroupId,
                              at.ItemTypeId,
                              at.PartDescription,
                              at.PartNumber,
                              at.RevisedPartId,
                              at.Memo,
                              at.CreatedBy,
                              at.UpdatedBy,
                              ManufacturerName = atd.Name
                          }


                          ).ToList();

            return result;
        }

        public List<ItemMasterCapes> CreateItemMasterCapes(List<ItemMasterCapes> itemMasterCapes)
        {
            try
            {
                itemMasterCapes.ForEach(p => { p.IsActive = true; p.IsDeleted = false; p.CreatedDate = DateTime.Now; p.UpdatedDate = DateTime.Now; });
                _appContext.ItemMasterCapes.AddRange(itemMasterCapes);
                _appContext.SaveChanges();
                return itemMasterCapes;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public void DeleteItemMasterCapes(long itemMasterCapesId, string updatedBy)
        {
            ItemMasterCapes itemMasterCapes = new ItemMasterCapes();
            try
            {
                itemMasterCapes.ItemMasterCapesId = itemMasterCapesId;
                itemMasterCapes.UpdatedDate = DateTime.Now;
                itemMasterCapes.UpdatedBy = updatedBy;
                itemMasterCapes.IsDeleted = true;

                _appContext.ItemMasterCapes.Attach(itemMasterCapes);
                _appContext.Entry(itemMasterCapes).Property(x => x.IsDeleted).IsModified = true;
                _appContext.Entry(itemMasterCapes).Property(x => x.UpdatedDate).IsModified = true;
                _appContext.Entry(itemMasterCapes).Property(x => x.UpdatedBy).IsModified = true;
                _appContext.SaveChanges();
            }
            catch (Exception)
            {

                throw;
            }
        }

        public IEnumerable<object> GetItemMasterCapes(Common.Filters<ItemMasterCapesFilters> capesFilters)
        {

            if (capesFilters.filters == null)
                capesFilters.filters = new ItemMasterCapesFilters();
            var pageNumber = capesFilters.first + 1;
            var pageSize = capesFilters.rows;

            string sortColumn = string.Empty;

            try
            {

                var sorts = new Sorts<ItemMasterCapesFilters>();


                if (string.IsNullOrEmpty(capesFilters.SortField))
                {
                    sortColumn = "createdDate";
                    capesFilters.SortOrder = -1;
                    sorts.Add(sortColumn == "createdDate", x => x.createdDate, true);
                }
                else
                {
                    sortColumn = capesFilters.SortField;
                }


                if (capesFilters.SortOrder == -1)
                {
                    switch (capesFilters.SortField)
                    {
                        case "partNo":
                            sorts.Add(sortColumn == "partNo", x => x.partNo, true);
                            break;
                        case "capabilityType":
                            sorts.Add(sortColumn == "capabilityType", x => x.capabilityType, true);
                            break;
                        case "aircraftType":
                            sorts.Add(sortColumn == "aircraftType", x => x.aircraftType, true);
                            break;
                        case "aircraftModel":
                            sorts.Add(sortColumn == "aircraftModel", x => x.aircraftModel, true);
                            break;
                        case "aircraftDashNumber":
                            sorts.Add(sortColumn == "aircraftDashNumber", x => x.aircraftDashNumber, true);
                            break;
                        case "description":
                            sorts.Add(sortColumn == "description", x => x.description, true);
                            break;
                        case "aTAChapter":
                            sorts.Add(sortColumn == "aTAChapter", x => x.aTAChapter, true);
                            break;
                        case "aTASubChapter":
                            sorts.Add(sortColumn == "aTASubChapter", x => x.aTASubChapter, true);
                            break;
                        case "entryDate":
                            sorts.Add(sortColumn == "entryDate", x => x.entryDate, true);
                            break;
                        case "cMM":
                            sorts.Add(sortColumn == "cMM", x => x.cMM, true);
                            break;
                        case "integrateWith":
                            sorts.Add(sortColumn == "integrateWith", x => x.integrateWith, true);
                            break;
                        case "isVerified":
                            sorts.Add(sortColumn == "isVerified", x => x.isVerified, true);
                            break;
                        case "verifiedBy":
                            sorts.Add(sortColumn == "verifiedBy", x => x.verifiedBy, true);
                            break;
                        case "verifiedDate":
                            sorts.Add(sortColumn == "verifiedDate", x => x.verifiedDate, true);
                            break;
                        case "memo":
                            sorts.Add(sortColumn == "memo", x => x.memo, true);
                            break;
                    }
                }
                else
                {
                    switch (capesFilters.SortField)
                    {
                        case "partNo":
                            sorts.Add(sortColumn == "partNo", x => x.partNo);
                            break;
                        case "capabilityType":
                            sorts.Add(sortColumn == "capabilityType", x => x.capabilityType);
                            break;
                        case "aircraftType":
                            sorts.Add(sortColumn == "aircraftType", x => x.aircraftType);
                            break;
                        case "aircraftModel":
                            sorts.Add(sortColumn == "aircraftModel", x => x.aircraftModel);
                            break;
                        case "aircraftDashNumber":
                            sorts.Add(sortColumn == "aircraftDashNumber", x => x.aircraftDashNumber);
                            break;
                        case "description":
                            sorts.Add(sortColumn == "description", x => x.description);
                            break;
                        case "aTAChapter":
                            sorts.Add(sortColumn == "aTAChapter", x => x.aTAChapter);
                            break;
                        case "aTASubChapter":
                            sorts.Add(sortColumn == "aTASubChapter", x => x.aTASubChapter);
                            break;
                        case "entryDate":
                            sorts.Add(sortColumn == "entryDate", x => x.entryDate);
                            break;
                        case "cMM":
                            sorts.Add(sortColumn == "cMM", x => x.cMM);
                            break;
                        case "integrateWith":
                            sorts.Add(sortColumn == "integrateWith", x => x.integrateWith);
                            break;
                        case "isVerified":
                            sorts.Add(sortColumn == "isVerified", x => x.isVerified);
                            break;
                        case "verifiedBy":
                            sorts.Add(sortColumn == "verifiedBy", x => x.verifiedBy);
                            break;
                        case "verifiedDate":
                            sorts.Add(sortColumn == "verifiedDate", x => x.verifiedDate);
                            break;
                        case "memo":
                            sorts.Add(sortColumn == "memo", x => x.memo);
                            break;
                    }
                }

                var totalRecords = (from imc in _appContext.ItemMasterCapes
                                    join im in _appContext.ItemMaster on imc.ItemMasterId equals im.ItemMasterId
                                    join ct in _appContext.capabilityType on imc.CapabilityTypeId equals ct.CapabilityTypeId
                                    join act in _appContext.AircraftType on imc.AircraftTypeId equals act.AircraftTypeId
                                    join acm in _appContext.AircraftModel on imc.AircraftModelId equals acm.AircraftModelId
                                    join acd in _appContext.AircraftDashNumber on imc.AircraftDashNumberId equals acd.DashNumberId
                                    join atc in _appContext.ATAChapter on imc.ATAChapterId equals atc.ATAChapterId into imcatc
                                    from atc in imcatc.DefaultIfEmpty()
                                    join ats in _appContext.ATASubChapter on imc.ATASubChapterId equals ats.ATASubChapterId into imcats
                                    from ats in imcats.DefaultIfEmpty()
                                    join pub in _appContext.Publication on imc.CMMId equals pub.PublicationRecordId into imcpub
                                    from pub in imcpub.DefaultIfEmpty()
                                    join ip in _appContext.IntegrationPortal on imc.IntegrateWithId equals ip.IntegrationPortalId into imcip
                                    from ip in imcip.DefaultIfEmpty()
                                    join ver in _appContext.Employee on imc.VerifiedById equals ver.EmployeeId into imcver
                                    from ver in imcver.DefaultIfEmpty()
                                    where imc.IsDeleted == false
                                    && im.PartNumber.Contains(!String.IsNullOrEmpty(capesFilters.filters.partNo) ? capesFilters.filters.partNo : im.PartNumber)
                                    && ct.Description.Contains(!String.IsNullOrEmpty(capesFilters.filters.capabilityType) ? capesFilters.filters.capabilityType : ct.Description)
                                    && act.Description.Contains(!String.IsNullOrEmpty(capesFilters.filters.aircraftType) ? capesFilters.filters.aircraftType : act.Description)
                                    && acm.ModelName.Contains(!String.IsNullOrEmpty(capesFilters.filters.aircraftModel) ? capesFilters.filters.aircraftModel : acm.ModelName)
                                    && imc.Description.Contains(!String.IsNullOrEmpty(capesFilters.filters.description) ? capesFilters.filters.description : imc.Description)
                                    && atc.ATAChapterName.Contains(!String.IsNullOrEmpty(capesFilters.filters.aTAChapter) ? capesFilters.filters.aTAChapter : atc.ATAChapterName)
                                    && ats.Description.Contains(!String.IsNullOrEmpty(capesFilters.filters.aTASubChapter) ? capesFilters.filters.aTASubChapter : ats.Description)
                                    && imc.EntryDate == (capesFilters.filters.entryDate != null ? capesFilters.filters.entryDate : imc.EntryDate)
                                    && pub.PublicationId.Contains(!String.IsNullOrEmpty(capesFilters.filters.cMM) ? capesFilters.filters.cMM : pub.PublicationId)
                                    && ip.Description.Contains(!String.IsNullOrEmpty(capesFilters.filters.integrateWith) ? capesFilters.filters.integrateWith : ip.Description)
                                    && imc.IsVerified == (capesFilters.filters.isVerified != null ? capesFilters.filters.isVerified : imc.IsVerified)
                                    && ver.FirstName.Contains(!String.IsNullOrEmpty(capesFilters.filters.verifiedBy) ? capesFilters.filters.verifiedBy : ver.FirstName)
                                    && imc.VerifiedDate == (capesFilters.filters.verifiedDate != null ? capesFilters.filters.verifiedDate : imc.VerifiedDate)
                                    && imc.Memo.Contains(!String.IsNullOrEmpty(capesFilters.filters.memo) ? capesFilters.filters.memo : imc.Memo)
                                    select new
                                    {
                                        imc.ItemMasterCapesId
                                    }).Distinct().Count();

                var list = (from imc in _appContext.ItemMasterCapes
                            join im in _appContext.ItemMaster on imc.ItemMasterId equals im.ItemMasterId
                            join ct in _appContext.capabilityType on imc.CapabilityTypeId equals ct.CapabilityTypeId
                            join act in _appContext.AircraftType on imc.AircraftTypeId equals act.AircraftTypeId
                            join acm in _appContext.AircraftModel on imc.AircraftModelId equals acm.AircraftModelId
                            join acd in _appContext.AircraftDashNumber on imc.AircraftDashNumberId equals acd.DashNumberId
                            join atc in _appContext.ATAChapter on imc.ATAChapterId equals atc.ATAChapterId into imcatc
                            from atc in imcatc.DefaultIfEmpty()
                            join ats in _appContext.ATASubChapter on imc.ATASubChapterId equals ats.ATASubChapterId into imcats
                            from ats in imcats.DefaultIfEmpty()
                            join pub in _appContext.Publication on imc.CMMId equals pub.PublicationRecordId into imcpub
                            from pub in imcpub.DefaultIfEmpty()
                            join ip in _appContext.IntegrationPortal on imc.IntegrateWithId equals ip.IntegrationPortalId into imcip
                            from ip in imcip.DefaultIfEmpty()
                            join ver in _appContext.Employee on imc.VerifiedById equals ver.EmployeeId into imcver
                            from ver in imcver.DefaultIfEmpty()
                            where imc.IsDeleted == false
                            && im.PartNumber.Contains(!String.IsNullOrEmpty(capesFilters.filters.partNo) ? capesFilters.filters.partNo : im.PartNumber)
                            && ct.Description.Contains(!String.IsNullOrEmpty(capesFilters.filters.capabilityType) ? capesFilters.filters.capabilityType : ct.Description)
                            && act.Description.Contains(!String.IsNullOrEmpty(capesFilters.filters.aircraftType) ? capesFilters.filters.aircraftType : act.Description)
                            && acm.ModelName.Contains(!String.IsNullOrEmpty(capesFilters.filters.aircraftModel) ? capesFilters.filters.aircraftModel : acm.ModelName)
                            && imc.Description.Contains(!String.IsNullOrEmpty(capesFilters.filters.description) ? capesFilters.filters.description : imc.Description)
                            && atc.ATAChapterName.Contains(!String.IsNullOrEmpty(capesFilters.filters.aTAChapter) ? capesFilters.filters.aTAChapter : atc.ATAChapterName)
                            && ats.Description.Contains(!String.IsNullOrEmpty(capesFilters.filters.aTASubChapter) ? capesFilters.filters.aTASubChapter : ats.Description)
                            && imc.EntryDate == (capesFilters.filters.entryDate != null ? capesFilters.filters.entryDate : imc.EntryDate)
                            && pub.PublicationId.Contains(!String.IsNullOrEmpty(capesFilters.filters.cMM) ? capesFilters.filters.cMM : pub.PublicationId)
                            && ip.Description.Contains(!String.IsNullOrEmpty(capesFilters.filters.integrateWith) ? capesFilters.filters.integrateWith : ip.Description)
                            && imc.IsVerified == (capesFilters.filters.isVerified != null ? capesFilters.filters.isVerified : imc.IsVerified)
                            && ver.FirstName.Contains(!String.IsNullOrEmpty(capesFilters.filters.verifiedBy) ? capesFilters.filters.verifiedBy : ver.FirstName)
                            && imc.VerifiedDate == (capesFilters.filters.verifiedDate != null ? capesFilters.filters.verifiedDate : imc.VerifiedDate)
                            && imc.Memo.Contains(!String.IsNullOrEmpty(capesFilters.filters.memo) ? capesFilters.filters.memo : imc.Memo)

                            select new ItemMasterCapesFilters()
                            {
                                ItemMasterCapesId = imc.ItemMasterCapesId,
                                partNo = im.PartNumber,
                                capabilityType = ct.Description,
                                aircraftType = act.Description,
                                aircraftModel = acm.ModelName,
                                aircraftDashNumber = acd.DashNumber,
                                description = imc.Description,
                                aTAChapter = atc == null ? "" : atc.ATAChapterName,
                                aTASubChapter = ats == null ? "" : ats.Description,
                                entryDate = imc.EntryDate,
                                cMM = pub.PublicationId,
                                integrateWith = ip.Description,
                                isVerified = imc.IsVerified,
                                verifiedBy = ver == null ? "" : ver.FirstName,
                                verifiedDate = imc.VerifiedDate,
                                memo = imc.Memo,
                                createdDate = imc.CreatedDate,
                                isActive = imc.IsActive,
                                TotalRecords=totalRecords
                            }
                          ).Distinct()
                          .Paginate(pageNumber, pageSize, sorts).Results;
                return list;
            }
            catch (Exception)
            {

                throw;
            }
        }

    }
}
