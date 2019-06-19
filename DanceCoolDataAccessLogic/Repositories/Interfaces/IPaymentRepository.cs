using System;
using System.Collections.Generic;
using System.Text;
using DanceCoolDataAccessLogic.EfStructures.Entities;

namespace DanceCoolDataAccessLogic.Repositories.Interfaces
{
    public interface IPaymentRepository : IRepository<Payment>
    {
        IEnumerable<Payment> GetPaymentsByGroupId(int groupId);
        IEnumerable<Payment> GetPaymentsByUserSenderId(int userSenderId);
    }
}
