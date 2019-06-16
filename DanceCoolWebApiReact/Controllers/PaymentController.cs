using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DanceCoolBusinessLogic.Interfaces;
using DanceCoolBusinessLogic.Services;
using DanceCoolDataAccessLogic.EfStructures.Entities;
using DanceCoolDTO;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DanceCoolWebApiReact.Controllers
{
    [ApiController]
    public class PaymentController : ControllerBase
    {
        private readonly IPaymentService _paymentService;

        public PaymentController(IPaymentService paymentService)
        {
            _paymentService = paymentService;
        }

        // GET: api/Payment
        [HttpGet]
        [Route("api/payments/{groupId}")]
        public IEnumerable<PaymentDTO> GetPaymentsByGroupId(int groupId)
        {
            return _paymentService.GetPaymentsByGroupId(groupId);
        }

        /// <summary>Changes Group skill level.</summary>
        /// <param name="addNewPaymentReqObject">Parameters for adding new payment. Must include userSenderId, userReceiverId and abonnementId</param>
        [HttpPost]
        [Route("api/payments/")]
        public IActionResult AddNewPayment([FromBody]dynamic addNewPaymentReqObject)
        {
            var date = (DateTime)addNewPaymentReqObject.date;
            var totalSum = (decimal)addNewPaymentReqObject.totalSum;
            var userSenderId = (int)addNewPaymentReqObject.userSenderId;
            var userReceiverId = (int)addNewPaymentReqObject.userReceiverId;
            var abonnement = (int)addNewPaymentReqObject.abonnement;
            
            _paymentService.AddPayment(date, totalSum, userSenderId, userReceiverId, abonnement);
            return Ok();
        }

        //// GET: api/Payment
        //[HttpGet]
        //public IEnumerable<string> Get()
        //{
        //    return new string[] { "value1", "value2" };
        //}

        //// GET: api/Payment/5
        //[HttpGet("{id}", Name = "Get")]
        //public string Get(int id)
        //{
        //    return "value";
        //}

        //// POST: api/Payment
        //[HttpPost]
        //public void Post([FromBody] string value)
        //{
        //}

        //// PUT: api/Payment/5
        //[HttpPut("{id}")]
        //public void Put(int id, [FromBody] string value)
        //{
        //}

        //// DELETE: api/ApiWithActions/5
        //[HttpDelete("{id}")]
        //public void Delete(int id)
        //{
        //}
    }
}
