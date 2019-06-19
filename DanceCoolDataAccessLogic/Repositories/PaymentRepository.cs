using System;
using System.Collections.Generic;
using System.Text;
using System.Linq;
using DanceCoolDataAccessLogic.EfStructures.Context;
using DanceCoolDataAccessLogic.EfStructures.Entities;
using DanceCoolDataAccessLogic.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace DanceCoolDataAccessLogic.Repositories
{
    public class PaymentRepository : BaseRepository<Payment>, IPaymentRepository
    {
        public PaymentRepository(DanceCoolContext context) : base(context)
        {
        }

        public IEnumerable<Payment> GetPaymentsByGroupId(int groupId)
        {
            var payersId = Context.Users
                .Include(user => user.Role)
                .Include(user => user.UserGroups).ThenInclude(ug => ug.Group)
                .Where(user => user.RoleId == 1 && user.UserGroups.Any(ug => ug.GroupId == groupId))
                .Select(student => student.Id).ToArray();

            var payments = Context.Payments
                .Include(payment => payment.UserSender)
                .Include(payment => payment.UserReceiver)
                .Include(payment => payment.Abonnement)
                .Where(payment => payersId.Contains(payment.UserSenderId))
                .ToList();

            return payments;
        }

        public IEnumerable<Payment> GetPaymentsByUserSenderId(int userSenderId)
        {
            var payments = Context.Payments
                .Include(payment => payment.UserSender)
                .Include(payment => payment.UserReceiver)
                .Include(payment => payment.Abonnement)
                .Where(payment => payment.UserSenderId == userSenderId)
                .ToList();

            return payments;
        }
    }
}
