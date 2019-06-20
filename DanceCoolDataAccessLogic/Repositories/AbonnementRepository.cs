using System;
using System.Collections.Generic;
using System.Text;
using System.Linq;
using DanceCoolDataAccessLogic.EfStructures.Context;
using DanceCoolDataAccessLogic.EfStructures.Entities;
using DanceCoolDataAccessLogic.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace DanceCoolDataAccessLogic.Repositories
{
    public class AbonnementRepository : BaseRepository<Abonnement>, IAbonnementRepository
    {
        public AbonnementRepository(DanceCoolContext context) : base(context)
        {
        }

}
}