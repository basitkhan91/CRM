﻿using DAL.Common;
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
        IEnumerable<object> gePurcSaleByItemMasterID(long ItemMasterid);

        void DeleteNhaTlaAltEquItemMapping(long id, string updatedBy);
        void NhaTlaAltEquItemMappingStatus(long id, bool status, string updatedBy);
        GetData<Nha_Tla_Alt_Equ_ItemMapping_List> NhaTlaAltEquItemMappingList(int mappingType, int pageNumber, int pageSize);
         Nha_Tla_Alt_Equ_ItemMapping NhaTlaAltEquItemMappingById(long itemMappingId, int mappingType);


    }
}
