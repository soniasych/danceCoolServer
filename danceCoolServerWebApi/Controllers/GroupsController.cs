using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DanceCoolBusinessLogic.Services;
using DanceCoolDataAccessLogic.Repositories.Interfaces;
using DanceCoolDTO;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace danceCoolWebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GroupsController : ControllerBase
    {
        private readonly IGroupRepository _groupRepository;

        public GroupsController(IGroupRepository groupRepository)
        {
            _groupRepository = groupRepository;
        }
        // GET: api/Groups
        [HttpGet]
        public IEnumerable<string> Get()
        {
            //var data = _groupRepository.GetAllGroupsAsync();
            return new string[] { "value1", "value2" };
        }

        // GET: api/Groups/5
        [HttpGet("{id}", Name = "Get")]
        public string GetEntity(int id)
        {
            return "value";
        }

        // POST: api/Groups
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT: api/Groups/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
