using DAL.Models;
using DAL.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;


namespace DAL.Repositories
{
    public class CapabilityTypeRepository : Repository<DAL.Models.CapabilityType>, ICapabilityTypeRepository
    {
        public CapabilityTypeRepository(ApplicationDbContext context) : base(context)
        { }

        public IEnumerable<DAL.Models.CapabilityType> GetAllCapabilityListData()
        {
            var data = _appContext.capabilityType.OrderByDescending(a => a.CapabilityTypeId).Where(p=>p.IsDeleted == null || p.IsDeleted==false ).ToList();
            return data;
        }

        public IEnumerable<object> getAllCapesList()
        {
            var data = _appContext.Capability.Where(a => a.AssetRecordId > 0).OrderByDescending(a => a.AssetRecordId).ToList();

            return data;
        }

        public IEnumerable<object> getAllCapesList(long id)
        {
            throw new System.NotImplementedException();
        }


        public object CapabilityTypeEdit(int id)
        {
            var resultData = (from cty in _appContext.capabilityType
                              where cty.CapabilityTypeId == id
                              select cty).FirstOrDefault();
            return resultData;
        }
        public bool CapabilityTypeStatusUpdate(int id, bool status, string updatedBy)
        {
            bool result = false;
            try
            {
                CapabilityType objCapTypeData = new CapabilityType();
                objCapTypeData.CapabilityTypeId = id;
                objCapTypeData.UpdatedDate = DateTime.Now;
                objCapTypeData.UpdatedBy = updatedBy;
                objCapTypeData.IsActive = status;

                _appContext.capabilityType.Attach(objCapTypeData);
                _appContext.Entry(objCapTypeData).Property(x => x.IsActive).IsModified = true;
                _appContext.Entry(objCapTypeData).Property(x => x.UpdatedDate).IsModified = true;
                _appContext.Entry(objCapTypeData).Property(x => x.UpdatedBy).IsModified = true;
                _appContext.SaveChanges();
                result = true;
            }
            catch (Exception)
            {
                throw;
            }

            return result;
        }
        public bool CapabilityTypeDelete(int id, string updatedBy)
        {
            bool result = false;
            try
            {
                CapabilityType objCapTypeData = new CapabilityType();
                objCapTypeData.CapabilityTypeId = id;
                objCapTypeData.UpdatedDate = DateTime.Now;
                objCapTypeData.UpdatedBy = updatedBy;
                objCapTypeData.IsDeleted = true;

                _appContext.capabilityType.Attach(objCapTypeData);
                _appContext.Entry(objCapTypeData).Property(x => x.IsDeleted).IsModified = true;
                _appContext.Entry(objCapTypeData).Property(x => x.UpdatedDate).IsModified = true;
                _appContext.Entry(objCapTypeData).Property(x => x.UpdatedBy).IsModified = true;
                _appContext.SaveChanges();
                result = true;
            }
            catch (Exception)
            {
                throw;
            }

            return result;
        }
        public IEnumerable<object> GetAllCapabilityTypeDataAudit(int capabilityTypeId)
        {
            var resultData = (from cty in _appContext.CapabilityTypeAudit
                              where cty.CapabilityTypeId == capabilityTypeId
                              select cty).OrderByDescending(cty => cty.UpdatedDate).ToList();
            return resultData;

        }
        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;
    }
}
