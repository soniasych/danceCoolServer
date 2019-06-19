namespace DanceCoolDTO
{
    public class AbonnementDTO
    {
        public int Id { get; set; }
        public string AbonnementName { get; set; }
        public decimal Price { get; set; }

        public AbonnementDTO(int id, string abonnementName, decimal price)
        {
            Id = id;
            AbonnementName = abonnementName;
            Price = price;
        }
    }
}