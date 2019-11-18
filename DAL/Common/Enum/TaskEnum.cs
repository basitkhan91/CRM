using System;
using System.Collections.Generic;
using System.Text;

namespace DAL.Common
{
    public enum TaskEnum
    {
        Receive=1,
        Inspect,
        Evaluate,
        TearDown,
        Disassemble,
        Assemble,
        Testing,
        QualityControl,
        Ship,
        Clean
    }
}
