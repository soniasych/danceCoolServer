using System.Collections.Generic;
using DanceCoolBusinessLogic.Interfaces;
using DanceCoolDTO;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DanceCoolWebApiReact.Controllers
{
    [ApiController]
    public class AbonnementController : ControllerBase
    {
        private readonly IAbonnementService _abonnementService;
        public AbonnementController(IAbonnementService abonnementService)
        {
            _abonnementService = abonnementService;
        }

        // GET: api/Abonnement
        [HttpGet]
        [Route("api/abonnements")]
        public IEnumerable<AbonnementDTO> GetAllAbonnements()
        {
            return _abonnementService.GetAllAbonnements();
        }

        /// <summary>Adding new abonnement.</summary>
        /// <param name="addNewAbonnementReqObject">Parameters for adding new abonnement.</param>
        [Authorize(Roles = "Admin")]
        [HttpPost]
        [Route("api/abonnements/new-abonnement")]
        public IActionResult AddNewAbonnement([FromBody]dynamic addNewAbonnementReqObject)
        {
            var abonnementName = $"{addNewAbonnementReqObject.abonnementName}";

            if (!decimal.TryParse(addNewAbonnementReqObject.abonnementprice.ToString(), out decimal abonnementPrice))
                return BadRequest("Невідомі дані про ціну");

            _abonnementService.AddAbonnement(abonnementName, abonnementPrice);
            return Ok();
        }
    }
}
