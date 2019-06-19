using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace DanceCoolDataAccessLogic.EfStructures.Entities
{
    public partial class Payment
    {
        public int Id { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime Date { get; set; }
        [Column(TypeName = "decimal(18, 0)")]
        public decimal TotalSum { get; set; }
        public int UserSenderId { get; set; }
        public int UserReceiverId { get; set; }
        public int AbonnementId { get; set; }

        [ForeignKey("AbonnementId")]
        [InverseProperty("Payments")]
        public virtual Abonnement Abonnement { get; set; }
        [ForeignKey("UserReceiverId")]
        [InverseProperty("PaymentUserReceivers")]
        public virtual User UserReceiver { get; set; }
        [ForeignKey("UserSenderId")]
        [InverseProperty("PaymentUserSenders")]
        public virtual User UserSender { get; set; }
    }
}