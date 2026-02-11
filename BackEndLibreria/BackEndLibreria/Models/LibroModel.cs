namespace BackEndLibreria.Models
{
    public class LibroModel
    {
        public int id { get; set; }
        public string titulo { get; set; }
        public string autor { get; set; }
        public string genero { get; set; }
        public int anio_publicacion { get; set; }
        public int stock { get; set; }
    }
}
