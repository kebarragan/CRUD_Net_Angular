using Microsoft.EntityFrameworkCore;

namespace BackEndLibreria.Models
{
    public class ApiLibreriaDbContext : DbContext
    {
        public ApiLibreriaDbContext(DbContextOptions<ApiLibreriaDbContext> options) : base(options)
        {

        }

        public DbSet<LibroModel> Cliente { get; set; }
    }
}
