namespace DanceCoolDTO
{
    public class RoleDto
    {
        public int RoleId { get; set; }
        public string RoleName { get; set; }

        public RoleDto(int roleId, string roleName)
        {
            RoleId = roleId;
            RoleName = roleName;
        }
    }
}
