using DAL.Models;
using DAL.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;

namespace DAL.Repositories
{
    public class EmployeeStationRepository : Repository<EmployeeStation>, IEmployeeStationRepository
    {

        public EmployeeStationRepository(ApplicationDbContext context) : base(context)
        {

        }

        public IEnumerable<object> GetAllEmployeeStationData(bool isActive)
        {
            var resultData = (from ems in _appContext.EmployeeStation
                              where ems.IsDeleted == false
                              select new
                              {                                 
                                  ems.EmployeeStationId,
                                  ems.IsActive,
                                  ems.MasterCompanyId,
                                  ems.StationName,
                                  ems.Memo,
                                  ems.CreatedBy,
                                  ems.CreatedDate,
                                  ems.UpdatedBy,
                                  ems.UpdatedDate,
                              }).OrderByDescending(p=>p.CreatedDate).ToList();

            return resultData;

        }

        public object EmployeeStationEdit(long id)
        {
            var resultData = (from ems in _appContext.EmployeeStation
                              where ems.EmployeeStationId == id
                              select ems).FirstOrDefault();
            return resultData;
        }



        public bool EmployeeStationStatusUpdate(long id, bool status, string updatedBy)
        {
            bool result = false;
            try
            {
                EmployeeStation objStationData = new EmployeeStation();
                objStationData.EmployeeStationId = id;
                objStationData.UpdatedDate = DateTime.Now;
                objStationData.UpdatedBy = updatedBy;
                objStationData.IsActive = status;

                _appContext.EmployeeStation.Attach(objStationData);
                _appContext.Entry(objStationData).Property(x => x.IsActive).IsModified = true;
                _appContext.Entry(objStationData).Property(x => x.UpdatedDate).IsModified = true;
                _appContext.Entry(objStationData).Property(x => x.UpdatedBy).IsModified = true;
                _appContext.SaveChanges();
                result = true;
            }
            catch (Exception)
            {
                throw;
            }

            return result;
        }
        public bool EmployeeStationDelete(long id, string updatedBy)
        {
            bool result = false;
            try
            {
                EmployeeStation objStationData = new EmployeeStation();
                objStationData.EmployeeStationId = id;
                objStationData.UpdatedDate = DateTime.Now;
                objStationData.UpdatedBy = updatedBy;
                objStationData.IsDeleted = true;

                _appContext.EmployeeStation.Attach(objStationData);
                _appContext.Entry(objStationData).Property(x => x.IsDeleted).IsModified = true;
                _appContext.Entry(objStationData).Property(x => x.UpdatedDate).IsModified = true;
                _appContext.Entry(objStationData).Property(x => x.UpdatedBy).IsModified = true;
                _appContext.SaveChanges();
                result = true;
            }
            catch (Exception)
            {
                throw;
            }

            return result;
        }

        public IEnumerable<object> GetAllEmployeeStationDataAudit(long  stationId)
        {
            var resultData = (from ems in _appContext.EmployeeStationAudit
                              where ems.EmployeeStationId == stationId
                              select new
                              {
                                  ems.AuditEmployeeStationId,
                                  ems.EmployeeStationId,
                                  ems.IsActive,
                                  ems.MasterCompanyId,
                                  ems.StationName,
                                  ems.Memo,
                                  ems.CreatedBy,
                                  ems.CreatedDate,
                                  ems.UpdatedBy,
                                  ems.UpdatedDate,
                                  ems.IsDeleted
                              }).OrderByDescending(p => p.AuditEmployeeStationId).ToList();

            return resultData;

        }

        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;


    }

}
