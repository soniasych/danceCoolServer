using System;
using System.Collections.Generic;
using System.Text;
using DanceCoolDataAccessLogic.UnitOfWork;

namespace DanceCoolBusinessLogic.Services
{
    class UserService : BaseService
    {
        public UserService(IUnitOfWork db) : base(db)
        {
        }

    }
}
