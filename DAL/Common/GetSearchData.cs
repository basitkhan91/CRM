using System.Collections.Generic;
using System.Linq;

namespace DAL.Common
{
    public class GetSearchData<T> where T : class
    {
        public GetSearchData()
        {
            Data = Enumerable.Empty<T>().ToList();
        }

        public int TotalRecordsCount { get; set; }

        public List<T> Data { get; set; }
    }
}
