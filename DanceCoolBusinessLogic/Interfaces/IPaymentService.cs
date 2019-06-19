using System;
using System.Collections.Generic;
using DanceCoolDataAccessLogic.EfStructures.Entities;
using DanceCoolDTO;

namespace DanceCoolBusinessLogic.Interfaces
{
    public interface IPaymentService
    {
        IEnumerable<PaymentDTO> GetPaymentsByGroupId(int groupId);
        void AddPayment(DateTime date, decimal totalSum, int userSender, int userReceiver, int abonnement);
        IEnumerable<PaymentDTO> GetPaymentsByUserSenderId(int userSenderId);
    }
}