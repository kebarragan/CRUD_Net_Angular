using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BackEndLibreria.Models;

namespace BackEndLibreria.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LibroController : ControllerBase
    {
        private readonly ApiLibreriaDbContext _context;

        public LibroController(ApiLibreriaDbContext context)
        {
            _context = context;
        }

        // GET: api/Libro
        [HttpGet]
        public async Task<ActionResult<IEnumerable<LibroModel>>> GetCliente()
        {
            return await _context.Cliente.ToListAsync();
        }

        // GET: api/Libro/5
        [HttpGet("{id}")]
        public async Task<ActionResult<LibroModel>> GetLibroModel(int id)
        {
            var libroModel = await _context.Cliente.FindAsync(id);

            if (libroModel == null)
            {
                return NotFound();
            }

            return libroModel;
        }

        // PUT: api/Libro/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutLibroModel(int id, LibroModel libroModel)
        {
            if (id != libroModel.id)
            {
                return BadRequest();
            }

            _context.Entry(libroModel).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!LibroModelExists(id))
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

        // POST: api/Libro
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<LibroModel>> PostLibroModel(LibroModel libroModel)
        {
            _context.Cliente.Add(libroModel);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetLibroModel", new { id = libroModel.id }, libroModel);
        }

        // DELETE: api/Libro/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteLibroModel(int id)
        {
            var libroModel = await _context.Cliente.FindAsync(id);
            if (libroModel == null)
            {
                return NotFound();
            }

            _context.Cliente.Remove(libroModel);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool LibroModelExists(int id)
        {
            return _context.Cliente.Any(e => e.id == id);
        }
    }
}
