using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DanceCoolBusinessLogic.Interfaces;
using DanceCoolBusinessLogic.Services;
using DanceCoolDataAccessLogic.EfStructures.Entities;
using DanceCoolDTO;
using Microsoft.AspNetCore.Authorization;
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

        // GET: api/Payment/group/2
        [Authorize(Roles = "Mentor, Admin")]
        [HttpGet]
        [Route("api/payments/group/{groupId}")]
        public IEnumerable<PaymentDTO> GetPaymentsByGroupId(int groupId)
        {
            return _paymentService.GetPaymentsByGroupId(groupId);
        }

        // GET: api/Payment/13
        [Authorize(Roles = "Student")]
        [HttpGet]
        [Route("api/payments/{userSenderId}")]
        public IEnumerable<PaymentDTO> GetPaymentsByUserSenderId(int userSenderId)
        {
            return _paymentService.GetPaymentsByUserSenderId(userSenderId);
        }

        /// <summary>Adding new payment.</summary>
        /// <param name="addNewPaymentReqObject">Parameters for adding new payment. Must include userSenderId, userReceiverId and abonnementId</param>
        [Authorize]
        [HttpPost]
        [Route("api/payments/")]
        public IActionResult AddNewPayment([FromBody]dynamic addNewPaymentReqObject)
        {
            var objPaymentDateTime = $"{addNewPaymentReqObject.date} {addNewPaymentReqObject.time}";
            
            if (!DateTime.TryParse(objPaymentDateTime, out DateTime paymentDate))
                return BadRequest("Вказано невірну дату");
           
            var totalSum = (decimal) addNewPaymentReqObject.totalSum;
            var userSenderId = (int) addNewPaymentReqObject.userSender;
            var userReceiverId = (int) addNewPaymentReqObject.userReceiver;
            var abonnement = (int) addNewPaymentReqObject.abonnement;
            
            _paymentService.AddPayment(paymentDate, totalSum, userSenderId, userReceiverId, abonnement);
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
