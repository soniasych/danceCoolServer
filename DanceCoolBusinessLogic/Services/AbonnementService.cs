using System;
using DanceCoolBusinessLogic.Interfaces;
using System.Collections.Generic;
using System.Linq;
using DanceCoolDataAccessLogic.EfStructures.Entities;
using DanceCoolDataAccessLogic.UnitOfWork;
using DanceCoolDTO;

namespace DanceCoolBusinessLogic.Services
{
    public class AbonnementService : BaseService, IAbonnementService
    {
        public AbonnementService(IUnitOfWork db) : base(db)
        {

        }

        public IEnumerable<AbonnementDTO> GetAllAbonnements()
        {
            var abonnementModels = db.Abonnements.GetAll();

            if (abonnementModels == null)
            {
                return null;
            }

            var abonnementDtos = new List<AbonnementDTO>();

            foreach (var item in abonnementModels)
            {
                abonnementDtos.Add(AbonnementModelToAbonnementDTO(item));
            }
            return abonnementDtos;
        }

        public void AddAbonnement(string abonnementName, decimal price)
        {
            var abonnement = new Abonnement()
            {
                AbonnementName = abonnementName,
                Price = price
            };
            db.Abonnements.AddEntity(abonnement);
            db.Save();
        }

        private AbonnementDTO AbonnementModelToAbonnementDTO(Abonnement abonnementModel) =>
            new AbonnementDTO(abonnementModel.Id,
                abonnementModel.AbonnementName,
                abonnementModel.Price);
    }
}