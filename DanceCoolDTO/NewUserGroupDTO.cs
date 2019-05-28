namespace DanceCoolDTO
{
    public class NewUserGroupDTO
    {
        public int UserId { get; set; }
        public int GroupId { get; set; }
        public NewUserGroupDTO(int userId, int groupId)
        {
            UserId = userId;
            GroupId = groupId;
        }
    }
}
