using DAL.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using Microsoft.EntityFrameworkCore;

using System.Threading.Tasks;
using DAL.Core;
using DAL.Models;

namespace DAL.Repositories
{
    public class ItemMasterRepository : Repository<DAL.Models.ItemMaster>, IItemMaster
    {
        public ItemMasterRepository(ApplicationDbContext context) : base(context)
        { }

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

            {
                var data = (from iM in _appContext.ItemMaster
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
                                iM.Manufacturer


                            }).ToList();
                return data;
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
                var data = (from iM in _appContext.ItemMasterAircraftManufacturer
                            where iM.ItemMasterId == id

                            select new
                            {
                                iM.ItemMasterAircraftManufacturerId,
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
                            UserRoleLevelDescription= PT.Description,
                            PS.EntityName,
                            PS.ModuleName,
                            PS. ScreenName,
                            PS.TableName,
                            PS.FieldName,
                            MF.PermittedEditActionId,
                            PermittedEditActionDescription=MF.Description
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
                        where PT.UserRoleLevelId==value

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
            var data =          (from e in _appContext.LegalEntity
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

                   .Where(a => a.ItemTypeId == 1 && (a.IsDelete == true || a.IsDelete==null)).OrderByDescending(a => a.ItemMasterId).ToList();
        

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

                                where e.IsDelete == false || e.IsDelete == null


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

            return leftOuterJoin.OrderByDescending(a=>a.LegalEntityId).ToList();
        }

        

        public IEnumerable<object> getAllItemMasterNonstockdata()
        {
          
            var data = _appContext.ItemMaster.Include("Manufacturer").Include("ItemClassification").Include("Currency")
                .Where(a => a.ItemTypeId == 2 && (a.IsDelete == true || a.IsDelete == null)).OrderByDescending(a => a.ItemMasterId).ToList();
            return data;
        }

        public IEnumerable<object> getAllItemMasterequipmentdata()
        {            
             var data = _appContext.ItemMaster.Include("Equipment").Include("EquipmentValidationType").Include("Manufacturer")

                  .Where(a => a.ItemTypeId == 3 && (a.IsDelete == true || a.IsDelete == null)).OrderByDescending(a => a.ItemMasterId).ToList();
            return data;

        }


        public IEnumerable<object> Getdescriptionbypart(long partNumber)
        {
            var data = (from IM in _appContext.ItemMaster
                        
                        where(
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

        public IEnumerable<object> getItemAircraftMappingDataByMultiTypeIdModelIDDashID(long ItemmasterId, string AircraftTypeId, string AircraftModelId, string DashNumberId)
        {
            var myAircraftTypeId = AircraftTypeId.Split(',').Select(n => Convert.ToInt64(n)).ToArray();
            var myAircraftModelId = AircraftModelId.Split(',').Select(y => Convert.ToInt64(y)).ToArray();
            var myDashNumberId = DashNumberId.Split(',').Select(x => Convert.ToInt64(x)).ToArray();
            var data = (from it in _appContext.ItemMasterAircraftMapping
                        where it.IsActive == true && it.ItemMasterId== ItemmasterId &&  myAircraftTypeId.Contains(it.AircraftTypeId) && myAircraftModelId.Contains(it.AircraftModelId) && myDashNumberId.Contains(it.DashNumberId)

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

        public IEnumerable<object> getItemATAMappingDataByMultiTypeIdATAIDATASUBID(long ItemMasterid,string ATAID,string ATASubID)
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
            if (AircraftTypeId != null && AircraftTypeId!="")
                myAircraftTypeId = AircraftTypeId.Split(',').Select(n => Convert.ToInt64(n)).ToArray();
            if (AircraftModelId != null && AircraftModelId!="")
                myAircraftModelId = AircraftModelId.Split(',').Select(y => Convert.ToInt64(y)).ToArray();
            if (DashNumberId != null && DashNumberId != "")
                myDashNumberId = DashNumberId.Split(',').Select(x => Convert.ToInt64(x)).ToArray();
            if (AircraftTypeId != null && AircraftModelId != null && myDashNumberId != null)
            {               var data = (from it in _appContext.ItemMasterAircraftMapping
                            where it.IsActive == true && it.ItemMasterId == ItemmasterId && myAircraftTypeId.Contains(it.AircraftTypeId) && myAircraftModelId.Contains(it.AircraftModelId) && myDashNumberId.Contains(it.DashNumberId) && it.IsDeleted!=true
                            select new{it.ItemMasterId,it.PartNumber,it.AircraftTypeId,it.AircraftModelId,it.DashNumberId,it.DashNumber,it.AircraftType,it.AircraftModel,it.Memo,it.MasterCompanyId,it.IsActive,it.IsDeleted}).ToList();
                            return data;
            }
            if (AircraftTypeId != null && AircraftModelId != null && myDashNumberId == null)
            {
                            var data = (from it in _appContext.ItemMasterAircraftMapping
                            where it.IsActive == true && it.ItemMasterId == ItemmasterId && myAircraftTypeId.Contains(it.AircraftTypeId) && myAircraftModelId.Contains(it.AircraftModelId) && it.IsDeleted != true
                            select new{it.ItemMasterId,it.PartNumber,it.AircraftTypeId,it.AircraftModelId,it.DashNumberId,it.DashNumber,it.AircraftType,it.AircraftModel,it.Memo,it.MasterCompanyId,it.IsActive,it.IsDeleted}).ToList();
                            return data;
            }
            if (AircraftTypeId != null && myAircraftModelId == null && myDashNumberId == null)
            {
                            var data = (from it in _appContext.ItemMasterAircraftMapping
                            where it.IsActive == true && it.ItemMasterId == ItemmasterId && myAircraftTypeId.Contains(it.AircraftTypeId) && it.IsDeleted != true
                            select new{it.ItemMasterId,it.PartNumber,it.AircraftTypeId,it.AircraftModelId,it.DashNumberId,it.DashNumber,it.AircraftType,it.AircraftModel,it.Memo,it.MasterCompanyId,it.IsActive,it.IsDeleted}).ToList();
                            return data;
            }
            if (AircraftTypeId != null && myAircraftModelId == null && myDashNumberId != null)
            {
                            var data = (from it in _appContext.ItemMasterAircraftMapping
                            where it.IsActive == true && it.ItemMasterId == ItemmasterId && myAircraftTypeId.Contains(it.AircraftTypeId) && myDashNumberId.Contains(it.DashNumberId) && it.IsDeleted != true
                            select new{it.ItemMasterId,it.PartNumber,it.AircraftTypeId,it.AircraftModelId,it.DashNumberId,it.DashNumber,it.AircraftType,it.AircraftModel,it.Memo,it.MasterCompanyId,it.IsActive,it.IsDeleted}).ToList();
                            return data;
            }
            if (AircraftTypeId == null && AircraftModelId != null && myDashNumberId != null)
            {
                            var data = (from it in _appContext.ItemMasterAircraftMapping
                            where it.IsActive == true && it.ItemMasterId == ItemmasterId && myAircraftModelId.Contains(it.AircraftModelId) && myDashNumberId.Contains(it.DashNumberId) && it.IsDeleted != true
                            select new{it.ItemMasterId,it.PartNumber,it.AircraftTypeId,it.AircraftModelId,it.DashNumberId,it.DashNumber,it.AircraftType,it.AircraftModel,it.Memo,it.MasterCompanyId,it.IsActive,it.IsDeleted}).ToList();
                            return data;
            }
            if (AircraftTypeId == null && myAircraftModelId == null && myDashNumberId != null)
            {
                            var data = (from it in _appContext.ItemMasterAircraftMapping
                            where it.IsActive == true && it.ItemMasterId == ItemmasterId && myDashNumberId.Contains(it.DashNumberId) && it.IsDeleted != true
                            select new { it.ItemMasterId, it.PartNumber, it.AircraftTypeId, it.AircraftModelId, it.DashNumberId, it.DashNumber, it.AircraftType, it.AircraftModel, it.Memo, it.MasterCompanyId, it.IsActive, it.IsDeleted }).ToList();
                            return data;
            }
            else
            {
                            var data = (from it in _appContext.ItemMasterAircraftMapping
                            where it.IsActive == true && it.ItemMasterId == ItemmasterId && it.IsDeleted != true
                            select new { it.ItemMasterId, it.PartNumber, it.AircraftTypeId, it.AircraftModelId, it.DashNumberId, it.DashNumber, it.AircraftType, it.AircraftModel, it.Memo, it.MasterCompanyId, it.IsActive, it.IsDeleted }).ToList();
                            return data;
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
            {               var data = (from iM in _appContext.ItemMasterATAMapping
                            where iM.ItemMasterId == ItemMasterid && myATAChapterId.Contains(iM.ATAChapterId) && myATASubChapterID.Contains(iM.ATASubChapterId) && iM.IsActive == true && iM.IsDeleted != true
                            select new{iM.ItemMasterATAMappingId,iM.ItemMasterId,iM.ATAChapterId,iM.ATAChapterCode,iM.ATAChapterName,iM.PartNumber,iM.ATASubChapterId,iM.ATASubChapterDescription}).ToList();
                            return data;
            }
            if (ATAChapterId != null && ATASubChapterID == null)
            {
                            var data = (from iM in _appContext.ItemMasterATAMapping
                            where iM.ItemMasterId == ItemMasterid && myATAChapterId.Contains(iM.ATAChapterId)  && iM.IsActive == true && iM.IsDeleted != true
                            select new { iM.ItemMasterATAMappingId, iM.ItemMasterId, iM.ATAChapterId, iM.ATAChapterCode, iM.ATAChapterName, iM.PartNumber, iM.ATASubChapterId, iM.ATASubChapterDescription }).ToList();
                            return data;
            }
            if (ATAChapterId == null && ATASubChapterID != null)
            {
                            var data = (from iM in _appContext.ItemMasterATAMapping
                            where iM.ItemMasterId == ItemMasterid && myATASubChapterID.Contains(iM.ATASubChapterId) && iM.IsActive == true && iM.IsDeleted != true
                            select new { iM.ItemMasterATAMappingId, iM.ItemMasterId, iM.ATAChapterId, iM.ATAChapterCode, iM.ATAChapterName, iM.PartNumber, iM.ATASubChapterId, iM.ATASubChapterDescription }).ToList();
                            return data;
            }
            else 
            {
                            var data = (from iM in _appContext.ItemMasterATAMapping
                            where iM.ItemMasterId == ItemMasterid && iM.IsActive == true && iM.IsDeleted != true
                            select new { iM.ItemMasterATAMappingId, iM.ItemMasterId, iM.ATAChapterId, iM.ATAChapterCode, iM.ATAChapterName, iM.PartNumber, iM.ATASubChapterId, iM.ATASubChapterDescription }).ToList();
                            return data;
            }
        }
    }
}
