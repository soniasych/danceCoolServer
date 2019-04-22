namespace DanceCoolDTO
{
    class GroupDTO
    {
        public int GroupId { get; set; }
        public string GroupDirection { get; set; }
        public string GroupLevel { get; set; }

        public GroupDTO(int groupId, string groupDirection, string groupLevel)
        {
            GroupId = groupId;
            GroupDirection = groupDirection;
            GroupLevel = groupLevel;
        }
    }
}
