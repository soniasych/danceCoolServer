using System;
using DanceCoolBusinessLogic.Interfaces;
using System.Collections.Generic;
using System.Linq;
using DanceCoolDataAccessLogic.EfStructures.Entities;
using DanceCoolDataAccessLogic.UnitOfWork;
using DanceCoolDTO;

namespace DanceCoolBusinessLogic.Services
{
    public class PaymentService : BaseService, IPaymentService
    {
        public PaymentService(IUnitOfWork db) : base(db)
        {
        }

        public IEnumerable<PaymentDTO> GetPaymentsByGroupId(int groupId)
        {
            var paymentModels = db.Payments.GetPaymentsByGroupId(groupId);

            if (paymentModels == null)
                return null;

            var paymentDtos = new List<PaymentDTO>();

            foreach (var model in paymentModels)
                paymentDtos.Add(PaymentModelToDTO(model));

            return paymentDtos;
        }

        public void AddPayment(DateTime date, decimal totalSum, int userSender, int userReceiver, int abonnement)
        {
            var payment = new Payment
            {
                Date = date,
                TotalSum = totalSum,
                UserSenderId = userSender,
                UserReceiverId = userReceiver,
                AbonnementId = abonnement
            };
            db.Payments.AddEntity(payment);
            db.Save();
        }

        public IEnumerable<PaymentDTO> GetPaymentsByUserSenderId(int userSenderId)
        {
            var paymentModels = db.Payments.GetPaymentsByUserSenderId(userSenderId);

            if (paymentModels == null)
                return null;

            var paymentDtos = new List<PaymentDTO>();

            foreach (var model in paymentModels)
                paymentDtos.Add(PaymentModelToDTO(model));

            return paymentDtos;
        }

        private PaymentDTO PaymentModelToDTO(Payment paymentModel) => new PaymentDTO(
            paymentModel.Id,
            paymentModel.Date,
            paymentModel.TotalSum,
            $"{paymentModel.UserSender.FirstName} {paymentModel.UserSender.LastName}",
            paymentModel.UserSenderId,
            $"{paymentModel.UserReceiver.FirstName} {paymentModel.UserReceiver.LastName}",
            paymentModel.Abonnement.AbonnementName);

        
    }
}
