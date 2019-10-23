// ===============================
// info@ebenmonney.com
// www.ebenmonney.com/quickapp-pro
// ===============================

using System;

namespace DAL.Core
{
    public enum Gender
    {
        None,
        Female,
        Male
    }


    public enum DataExtractorType
    {
        None = 1,  
        Excel,
    }
    public enum UploadTag
    {
        Queued = 1,
        Invalid,
        Duplicate,
        Unique,
        Success,
        Failed,
    }
}
