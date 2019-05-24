using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DanceCoolDataAccessLogic.EfStructures.Entities
{
    public partial class Payment
    {
        public int Id { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime Date { get; set; }
        [Column(TypeName = "money")]
        public decimal TotalSum { get; set; }
        public int UserSenderId { get; set; }
        public int UserReceiverId { get; set; }
        public int AbonementId { get; set; }

        [ForeignKey("AbonementId")]
        [InverseProperty("Payments")]
        public virtual Abonement Abonement { get; set; }
        [ForeignKey("UserReceiverId")]
        [InverseProperty("PaymentUserReceivers")]
        public virtual User UserReceiver { get; set; }
        [ForeignKey("UserSenderId")]
        [InverseProperty("PaymentUserSenders")]
        public virtual User UserSender { get; set; }
    }
}