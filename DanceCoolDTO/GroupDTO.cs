namespace DanceCoolDTO
{
    public class GroupDTO
    {
        public int GroupId { get; set; }
        public string GroupDirection { get; set; }
        public string PrimaryMentor { get; set; }
        public string SecondaryMentor { get; set; }
        public string GroupLevel { get; set; }

        public GroupDTO(int groupId, string groupDirection, string primaryMentor, string secondaryMentor, string groupLevel)
        {
            GroupId = groupId;
            GroupDirection = groupDirection;
            PrimaryMentor = primaryMentor;
            SecondaryMentor = secondaryMentor;
            GroupLevel = groupLevel;
        }
    }
}
