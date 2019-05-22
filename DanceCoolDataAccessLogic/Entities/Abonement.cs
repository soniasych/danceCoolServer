using System;
using System.Collections.Generic;

namespace DanceCoolDataAccessLogic.Entities
{
    public partial class Abonement
    {
        public Abonement()
        {
            Payments = new HashSet<Payment>();
        }

        public int Id { get; set; }
        public string AbonementName { get; set; }

        public virtual ICollection<Payment> Payments { get; set; }
    }
}
