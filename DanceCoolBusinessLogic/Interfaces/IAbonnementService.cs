using System;
using System.Collections.Generic;
using DanceCoolDataAccessLogic.EfStructures.Entities;
using DanceCoolDTO;

namespace DanceCoolBusinessLogic.Interfaces
{
    public interface IAbonnementService
    {
        IEnumerable<AbonnementDTO> GetAllAbonnements();
        void AddAbonnement(string abonnementName, decimal price);
    }
}