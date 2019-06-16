using System;

namespace DanceCoolDTO
{
    public class NewPaymentDTO
    {
        public DateTime Date { get; set; }
        public decimal TotalSum { get; set; }
        public string UserSender { get; set; }
        public string UserReceiver { get; set; }
        public string Abonnement { get; set; }

        public NewPaymentDTO( DateTime date, decimal totalSum, string userSender, string userReceiver, string abonnement)
        {
            Date = date;
            TotalSum = totalSum;
            UserSender = userSender;
            UserReceiver = userReceiver;
            Abonnement = abonnement;
        }
    }
}