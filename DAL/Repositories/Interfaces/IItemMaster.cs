using DAL.Common;
using DAL.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Repositories.Interfaces
{

    public interface IItemMaster : IRepository<ItemMaster>
    {

        IEnumerable<object> getByID(long itemMasterId);
        IEnumerable<object> GetAircraftMapped(long ItemmasterId);
        IEnumerable<object> GetATAMapped(long ItemmasterId);
        IEnumerable<ItemMaster> getAlldata();

        IEnumerable<object> getAllItemMasterdata();

        IEnumerable<object> getAllItemMasterStockdata();

        IEnumerable<object> getAllItemMasterNonstockdata();

        IEnumerable<object> getAllItemMasterequipmentdata();
        object getAllItemMasterStockdataById(long id);
        object getAllItemMasterNonstockdataById(long id);
        object getAllItemMasterequipmentdataById(long id);
        IEnumerable<object> getLegalEntityData();

        IEnumerable<object> getRolesData();

        IEnumerable<object> getRolesDatayRoleId(long value);
        IEnumerable<object> Getdescriptionbypart(string partNumber);
        IEnumerable<object> aircraftManufacturerData(long id);

        IEnumerable<object> getIntegrationData(long id);

        IEnumerable<object> getCapabilityData(long id);
        IEnumerable<object> getItemMasterData(long id);

        IEnumerable<object> getLegalEntityAccountsData(long id);
        IEnumerable<object> getItemAircraftMappingDataByMultiTypeIdModelIDDashID(long ItemMasterID, string AircraftTypeID, string AirModelId, string DashNumberId);
        IEnumerable<object> getItemATAMappingDataByMultiTypeIdATAIDATASUBID(long ItemMasterid, string ATAID, string ATASubID);

        IEnumerable<object> searchItemAircraftMappingDataByMultiTypeIdModelIDDashID(long ItemMasterID, string AircraftTypeID, string AircraftModelID, string DashNumberId);
        IEnumerable<object> searchgetItemATAMappingDataByMultiTypeIdATAIDATASUBID(long ItemMasterid, string ATAChapterId, string ATASubChapterID);
        IEnumerable<ItemMasterPurchaseSale> gePurcSaleByItemMasterID(long ItemMasterid);
        IEnumerable<object> geAuditHistoryPurcSaleByItemMasterID(long itemMasterPurchaseSaleId);

        


        Nha_Tla_Alt_Equ_ItemMapping CreateNhaTlaAltEquPart(Nha_Tla_Alt_Equ_ItemMapping part);
        Nha_Tla_Alt_Equ_ItemMapping UpdateNhaTlaAltEquPart(Nha_Tla_Alt_Equ_ItemMapping part);
        IEnumerable<object> NhaTlaAltEquPartList(Filters<NhaAltEquFilters> filters);
        void DeleteNhaTlaAltEquPart(long mappingId, string updatedBy);
        void NhaTlaAltEquPartStatus(long mappingId, bool status, string updatedBy);
        IEnumerable<object> GetAlterEquParts(long itemMasterId);
        Nha_Tla_Alt_Equ_ItemMapping CreateEquivalencyPart(Nha_Tla_Alt_Equ_ItemMapping part);
        Nha_Tla_Alt_Equ_ItemMapping UpdateEquivalencyPart(Nha_Tla_Alt_Equ_ItemMapping part);
        IEnumerable<object> EquivalencyPartList(Filters<NhaAltEquFilters> filters);
        IEnumerable<object> NhaTlaAltEquPartHistory(long itemMappingId);


        IEnumerable<ItemMaster> SearchItemMaster(ItemMaster master);

        IEnumerable<object> GetPartnumberList();

        List<ItemMasterCapes> CreateItemMasterCapes(List<ItemMasterCapes> itemMasterCapes);
        object ItemMasterCapesById(long itemMasterCapesId);
        void DeleteItemMasterCapes(long itemMasterCapesId, string updatedBy);
        IEnumerable<object> ItemMasterCapsAudit(long itemMasterCapesId);
        IEnumerable<object> GetItemMasterCapes(Common.Filters<ItemMasterCapesFilters> capesFilters);
        IEnumerable<object> ItemMasterCapesGlobalSearch(long itemMasterId, string filterText, int pageNumber, int pageSize);
        IEnumerable<object> ItemMasterData(Common.Filters<ItemMasterDataFilters> capesFilters);
        IEnumerable<object> GetAircraftMappedAudit(long itemMasterAircraftMappingId);
       object ItemMasterAircraftMappedById(long itemMasterId,long itemMasterAircraftMappingId);

        
    }
}
