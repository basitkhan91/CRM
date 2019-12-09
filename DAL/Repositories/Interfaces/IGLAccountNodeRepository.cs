﻿using DAL.Models;
using System.Collections.Generic;

namespace DAL.Repositories.Interfaces
{
    public interface IGLAccountNodeRepository : IRepository<GLAccountNode>
    {
        IEnumerable<GLAccountNode> GetAllGLAccount();
        IEnumerable<GLAccountNode> GetAllGLAccountLeafNode();
    }
}
