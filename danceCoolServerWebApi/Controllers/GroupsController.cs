using System.Collections.Generic;
using DanceCoolBusinessLogic.Services;
using DanceCoolDTO;
using Microsoft.AspNetCore.Mvc;

namespace danceCoolWebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GroupsController : ControllerBase
    {
        private IGroupService _groupService;

        public GroupsController(IGroupService groupService)
        {
            _groupService = groupService;
        }

        //GET: api/Groups
        [HttpGet]
        public IEnumerable<GroupDTO> Get()
        {
            return _groupService.GetAllGroups();
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
