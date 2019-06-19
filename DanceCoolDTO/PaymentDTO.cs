using System;

namespace DanceCoolDTO
{
    public class PaymentDTO
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public decimal TotalSum { get; set; }
        public string UserSender { get; set; }
        public int UserSenderId { get; set; }
        public string UserReceiver { get; set; }
        public string Abonnement { get; set; }

        public PaymentDTO(int id, DateTime date, decimal totalSum, string userSender, int userSenderId, string userReceiver, string abonnement)
        {
            Id = id;
            Date = date;
            TotalSum = totalSum;
            UserSender = userSender;
            UserSenderId = userSenderId;
            UserReceiver = userReceiver;
            Abonnement = abonnement;
        }
    }
}