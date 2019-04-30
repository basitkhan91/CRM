using DAL.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;


namespace DAL.Repositories
{
   public class GLAccountClassRepository : Repository<DAL.Models.GLAccountClass>, IGLAccountClassRespository
    {
        public GLAccountClassRepository(ApplicationDbContext context) : base(context)
        { }

        public IEnumerable<Models.GLAccountClass> GetAllGLAccountClassData()
        {
            return _appContext.GLAccountClass.Where(a => a.IsDelete == false || a.IsDelete == null).OrderByDescending(a => a.GLAccountClassId).ToList();
           
        }
        //Task<Tuple<bool, string[]>> CreateRoleAsync(ApplicationRole role, IEnumerable<string> claims);

        public IEnumerable<object> getShareWithEntityNodeById(long id)
        {
            try
            {
                var result = (from gle in _appContext.GLAccountNodeShareWithEntityMapper
                              join gn in _appContext.GLAccountNode on gle.GLAccountNodeId equals gn.GLAccountNodeId
                              join  ms in _appContext.ManagementStructure on gle.ManagementStructureId equals ms.ManagementStructureId 
                              where gle.GLAccountNodeId == id
                              select new
                              {
                                  ms.Code,
                                  gle.GLAccountNodeId,
                                  gle.ManagementStructureId

                              }).ToList();
                
                return result;
            }
            catch (Exception ex)
            {

                return null;
            }


        }

        //public IEnumerable<object> getAllNodeSetup()
        //{
        //    try
        //    {
        //        var result = (from glAccountNode in _appContext.GLAccountNode
        //                      join glEntityMapper in _appContext.GLAccountNodeShareWithEntityMapper on gle.GLAccountNodeId equals gn.GLAccountNodeId
        //                      join ms in _appContext.ManagementStructure on gle.ManagementStructureId equals ms.ManagementStructureId
        //                      where gle.GLAccountNodeId == id
        //                      select new
        //                      {
        //                          ms.Code,
        //                          gle.GLAccountNodeId,
        //                          gle.ManagementStructureId

        //                      }).ToList();

        //        return result;
        //    }
        //    catch (Exception ex)
        //    {

        //        return null;
        //    }


        //}
        private ApplicationDbContext _appContext => (ApplicationDbContext)_context;

    }
}
