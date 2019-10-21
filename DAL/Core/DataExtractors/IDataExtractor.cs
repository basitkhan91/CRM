using DAL.Common;
using Microsoft.AspNetCore.Http;
using System.Collections.Generic;

namespace DAL.Core.DataExtractors
{
    public interface IDataExtractor<TOutputType>//s where TInputType : class where TOutputType : class
    {
        IEnumerable<TOutputType> Extract(IFormFile file, ModuleEnum module);
    }
}
