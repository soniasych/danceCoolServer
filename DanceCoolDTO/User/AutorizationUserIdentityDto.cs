namespace DanceCoolDTO
{
    public class AutorizationUserIdentityDto
    {
        public string email { get; set; }
        public string password { get; set; }

        public AutorizationUserIdentityDto(string email, string password)
        {
            this.email = email;
            this.password = password;
        }
    }
}
