﻿using DAL.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using Microsoft.EntityFrameworkCore;

using System.Threading.Tasks;
using DAL.Core;
using DAL.Models;
using DAL.Common;

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
                                ManufacturerName = mfgs == null ? "" : mfgs.Name,
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
                throw;
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
                                t.Manufacturer
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
                throw;
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

        public void DeleteNhaTlaAltEquItemMapping(long id, string updatedBy)
        {
            try
            {
                Nha_Tla_Alt_Equ_ItemMapping model = new Nha_Tla_Alt_Equ_ItemMapping();

                model.ItemMappingId = id;
                model.IsDeleted = true;
                model.UpdatedDate = DateTime.Now;
                model.UpdatedBy = updatedBy;

                _appContext.Nha_Tla_Alt_Equ_ItemMapping.Attach(model);

                _appContext.Entry(model).Property(x => x.IsDeleted).IsModified = true;
                _appContext.Entry(model).Property(x => x.UpdatedDate).IsModified = true;
                _appContext.Entry(model).Property(x => x.UpdatedBy).IsModified = true;

                _appContext.SaveChanges();
            }
            catch (Exception)
            {

                throw;
            }
        }

        public void NhaTlaAltEquItemMappingStatus(long id, bool status, string updatedBy)
        {
            try
            {
                Nha_Tla_Alt_Equ_ItemMapping model = new Nha_Tla_Alt_Equ_ItemMapping();



                model.ItemMappingId = id;
                model.IsActive = status;
                model.UpdatedDate = DateTime.Now;
                model.UpdatedBy = updatedBy;

                _appContext.Nha_Tla_Alt_Equ_ItemMapping.Attach(model);

                _appContext.Entry(model).Property(x => x.IsActive).IsModified = true;
                _appContext.Entry(model).Property(x => x.UpdatedDate).IsModified = true;
                _appContext.Entry(model).Property(x => x.UpdatedBy).IsModified = true;

                _appContext.SaveChanges();
            }
            catch (Exception)
            {

                throw;
            }
        }

        public GetData<Nha_Tla_Alt_Equ_ItemMapping_List> NhaTlaAltEquItemMappingList(int mappingType, int pageNumber, int pageSize)
        {
            GetData<Nha_Tla_Alt_Equ_ItemMapping_List> getData = new GetData<Nha_Tla_Alt_Equ_ItemMapping_List>();
            Nha_Tla_Alt_Equ_ItemMapping_List itemMapping;

            try
            {
                pageNumber = pageNumber + 1;
                var take = pageSize;
                var skip = take * (pageNumber - 1);


                getData.TotalRecordsCount = _appContext.Nha_Tla_Alt_Equ_ItemMapping
                   .Join(_appContext.ItemMaster,
                              mp => mp.ItemMasterId,
                              im => im.ItemMasterId,
                              (mp, im) => new { mp, im })

                    .Where(p => p.mp.IsDeleted == false && p.mp.MappingType == mappingType)
                    .Count();

                var result = _appContext.Nha_Tla_Alt_Equ_ItemMapping
                   .Join(_appContext.ItemMaster,
                              mp => mp.ItemMasterId,
                              im => im.ItemMasterId,
                              (mp, im) => new { mp, im })

                    .Where(p => p.mp.IsDeleted == false && p.mp.MappingType == mappingType)
                    .Select(p => new
                    {
                        IItemMaster = p.im,
                        Memo = p.mp.Memo
                    })
                    .OrderByDescending(p => p.IItemMaster.UpdatedDate)
                    .Skip(skip)
                    .Take(take)
                    .ToList();

                if (result != null && result.Count > 0)
                {
                    getData.PaginationList = new List<Nha_Tla_Alt_Equ_ItemMapping_List>();
                    foreach (var item in result)
                    {
                        itemMapping = new Nha_Tla_Alt_Equ_ItemMapping_List();
                        itemMapping.ItemMaster = item.IItemMaster;
                        itemMapping.MappingMemo = item.Memo;
                        getData.PaginationList.Add(itemMapping);
                    }
                }
                else
                {
                    getData.PaginationList = new List<Nha_Tla_Alt_Equ_ItemMapping_List>();
                    getData.TotalRecordsCount = 0;
                }

                return getData;
            }
            catch (Exception)
            {

                throw;
            }
        }

        public Nha_Tla_Alt_Equ_ItemMapping NhaTlaAltEquItemMappingById(long itemMappingId, int mappingType)
        {
            Nha_Tla_Alt_Equ_ItemMapping itemMapping = new Nha_Tla_Alt_Equ_ItemMapping();

            try
            {

                var result = _appContext.Nha_Tla_Alt_Equ_ItemMapping
                   .Join(_appContext.ItemMaster,
                              mp => mp.ItemMasterId,
                              im => im.ItemMasterId,
                              (mp, im) => new { mp, im })

                    .Where(p => p.mp.IsDeleted == false && p.mp.ItemMappingId == itemMappingId && p.mp.MappingType == mappingType)
                    .Select(p => new
                    {
                        ItemMaster = p.im,
                        ItemMapping = p.mp
                    })
                    .FirstOrDefault();


                if (result != null && result.ItemMapping != null && result.ItemMapping.ItemMappingId > 0)
                {
                    itemMapping = result.ItemMapping;
                    itemMapping.ItemMaster = result.ItemMaster;

                }
                return itemMapping;
            }
            catch (Exception)
            {

                throw;
            }
        }

    }
}
