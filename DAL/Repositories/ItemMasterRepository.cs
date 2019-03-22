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
            //return _appContext.ItemMaster.Include("MasterCompany").OrderByDescending(c => c.ItemMasterId).ToList();
            //return _appContext.ItemMaster.OrderByDescending(c => c.ItemMasterId).ToList();
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
                                t.IsShelfLifeAvailable,
                                t.TagDate,
                                t.TagType,
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

                        //join PT in _appContext.Part on IM.PartId equals PT.PartId into pt

                        //from PT in pt.DefaultIfEmpty()
                        join MF in _appContext.Manufacturer on IM.ManufacturerId equals MF.ManufacturerId into mfg

                        from MF in mfg.DefaultIfEmpty()

                        join PS in _appContext.Provision on IM.ProvisionId equals PS.ProvisionId into pro

                        from PS in pro.DefaultIfEmpty()

                        join PR in _appContext.Priority on IM.PriorityId equals PR.PriorityId into pri

                        from PR in pri.DefaultIfEmpty()

                        where

                        (
                        //(PR == null ? 0 : PR.PriorityId) == 0 && (MF == null ? 0 : MF.ManufacturerId) == 0 &&

                        // (PT == null ? 0 : PT.PartId) == 0 &&
                        // (PS == null ? 0 : PS.ProvisionId) == 0

                        //&& 

                        IM.ItemTypeId == 1 && IM.IsActive == true)
                        // select new { t, ad, vt }).ToList();
                        select new
                        {
                            IM,
                           // PT,
                            MF,
                            PS,
                            PR,
                           // IM.PartNumber,
                            IM.PartNumber,
                            //PartDescription = IM.PartDescription,
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

                        

                       

                       
                        // select new { t, ad, vt }).ToList();
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



                            // select new { t, ad, vt }).ToList();
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

        public IEnumerable<object> getAllItemMasterStockdata()
        {
            var data = _appContext.ItemMaster.Include("Manufacturer").Include("Provision").Include("Priority").Include("ItemClassification").Include("Currency").Include("ExportClassification")

                   //join PT in _appContext.Part on IM.PartId equals PT.PartId
                   //join MF in _appContext.Manufacturer on IM.ManufacturerId equals MF.ManufacturerId
                   //join PS in _appContext.Provision on IM.ProvisionId equals PS.ProvisionId
                   //join PR in _appContext.Priority on IM.PriorityId equals PR.PriorityId

                   .Where(a => a.ItemTypeId == 1 && (a.IsDelete == true || a.IsDelete==null)).OrderByDescending(a => a.ItemMasterId).ToList();
            // select new { t, ad, vt }).ToList();

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

                                where e.IsActive==true || e.IsActive==null
                                

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
                                    //domeswire.DomesticWirePaymentId,
                                    DomesticIntermediateBank=domeswire.IntermediaryBankName,
                                    //DomesticBenficiaryBankName=domeswire.BenificiaryBankName,
                                    //InternationalBankName=internalwire.BankName,
                                    //InternationalBenficiaryBankName=internalwire.IntermediaryBank,
                                    //internalwire.InternationalWirePaymentId,
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
                                    achBankName=achdata.BankName,
                                    achIntermediateBank = achdata.IntermediateBankName,
                                    achBenficiaryBankName = achdata.BeneficiaryBankName,
                                    achBankAccountNumber = achdata.AccountNumber,
                                    achABANumber = achdata.ABA,
                                    achSWIFTID=achdata.SwiftCode

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
             //from IM in _appContext.ItemMaster


             //        join PT in _appContext.Part on IM.PartId equals PT.PartId
             //        // join Eq in _appContext.Equipment on IM.EquipmentId equals Eq.EquipmentId
             //        join Eqt in _appContext.EquipmentValidationType on IM.EquipmentValidationTypeId equals Eqt.EquipmentValidationTypeId
             //        join MF in _appContext.Manufacturer on IM.ManufacturerId equals MF.ManufacturerId
             //        where IM.ItemTypeId == 3 && IM.IsActive == true

             //        // select new { t, ad, vt }).ToList();
             //        select new
             //        {
             //            IM,
             //            PT,
             //            MF,
             //            MF.ManufacturerId,
             //            Manufacturerdesc = MF.Name,
             //            PT.PartNumber,
             //            //PartDescription = PT.Description,
             //            Partdescription = PT.Description,
             //            IM.CertificationRequired,
             //            IM.UnitCost,
             //            IM.ListPrice,
             //            Eqt.EquipmentValidationTypeId,
             //            EquipmentValidationDescription = Eqt.Description,
             //            IM.ItemMasterId

             //        }).ToList();

             var data = _appContext.ItemMaster.Include("Equipment").Include("EquipmentValidationType").Include("Manufacturer")

                  .Where(a => a.ItemTypeId == 3 && (a.IsDelete == true || a.IsDelete == null)).OrderByDescending(a => a.ItemMasterId).ToList();
            return data;

        }

        public IEnumerable<object> Getdescriptionbypart(long partNumber)
        {
            var data = (from IM in _appContext.ItemMaster

                        //join PT in _appContext.Part on IM.PartId equals PT.PartId 
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
                                iM.CompanyId,
                                iM.BuisinessUnitId,
                                iM.DivisionId,
                                iM.DepartmentId


                            }).ToList();
                return data;
            }
        }

        //Task<Tuple<bool, string[]>> CreateRoleAsync(ApplicationRole role, IEnumerable<string> claims);

        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;

    }
}
