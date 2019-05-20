using System;

namespace DanceCoolDataAccessLogic.Entities
{
    public partial class Payment
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public decimal TotalSum { get; set; }
        public int UserSenderId { get; set; }
        public int UserReceiverId { get; set; }
        public int AbonementId { get; set; }

        public virtual Abonement Abonement { get; set; }
        public virtual User UserReceiver { get; set; }
        public virtual User UserSender { get; set; }
    }
}
