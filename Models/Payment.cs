using System;
using System.Collections.Generic;

namespace danceCoolServer.Models
{
    public partial class Payment
    {
        public Payment()
        {
            InverseUserReceiver = new HashSet<Payment>();
            InverseUserSender = new HashSet<Payment>();
        }

        public int Id { get; set; }
        public DateTime Date { get; set; }
        public decimal TotalSum { get; set; }
        public int UserSenderId { get; set; }
        public int UserReceiverId { get; set; }
        public int AbonementId { get; set; }

        public virtual Payment UserReceiver { get; set; }
        public virtual Payment UserSender { get; set; }
        public virtual ICollection<Payment> InverseUserReceiver { get; set; }
        public virtual ICollection<Payment> InverseUserSender { get; set; }
    }
}
