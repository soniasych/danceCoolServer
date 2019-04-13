using System;
using System.Collections.Generic;

namespace danceCoolServer.Models
{
    public partial class Abonement
    {
        public Abonement()
        {
            Payment = new HashSet<Payment>();
        }

        public int Id { get; set; }
        public string AbonementName { get; set; }

        public virtual ICollection<Payment> Payment { get; set; }
    }
}
