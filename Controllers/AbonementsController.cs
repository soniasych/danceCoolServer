using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using danceCoolServer.Models;

namespace danceCoolServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AbonementsController : ControllerBase
    {
        private readonly DanceCoolContext _context;

        public AbonementsController(DanceCoolContext context)
        {
            _context = context;
        }

        // GET: api/Abonements
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Abonement>>> GetAbonement()
        {
            return await _context.Abonement.ToListAsync();
        }

        // GET: api/Abonements/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Abonement>> GetAbonement(int id)
        {
            var abonement = await _context.Abonement.FindAsync(id);

            if (abonement == null)
            {
                return NotFound();
            }

            return abonement;
        }

        // PUT: api/Abonements/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAbonement(int id, Abonement abonement)
        {
            if (id != abonement.Id)
            {
                return BadRequest();
            }

            _context.Entry(abonement).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AbonementExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Abonements
        [HttpPost]
        public async Task<ActionResult<Abonement>> PostAbonement(Abonement abonement)
        {
            _context.Abonement.Add(abonement);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (AbonementExists(abonement.Id))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetAbonement", new { id = abonement.Id }, abonement);
        }

        // DELETE: api/Abonements/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Abonement>> DeleteAbonement(int id)
        {
            var abonement = await _context.Abonement.FindAsync(id);
            if (abonement == null)
            {
                return NotFound();
            }

            _context.Abonement.Remove(abonement);
            await _context.SaveChangesAsync();

            return abonement;
        }

        private bool AbonementExists(int id)
        {
            return _context.Abonement.Any(e => e.Id == id);
        }
    }
}
