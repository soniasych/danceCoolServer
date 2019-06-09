namespace DanceCoolDTO
{
    public class GroupDTO
    {
        public int GroupId { get; set; }
        public string GroupDirection { get; set; }
        public int PrimaryMentorId { get; set; }
        public string PrimaryMentor { get; set; }
        public int? SecondaryMentorId { get; set; }
        public string SecondaryMentor { get; set; }
        public string GroupLevel { get; set; }

        public GroupDTO(int groupId, 
                        string groupDirection,
                        int primaryMentorId, 
                        string primaryMentor,
                        int? secondaryMentorId, 
                        string secondaryMentor, 
                        string groupLevel)
        {
            GroupId = groupId;
            GroupDirection = groupDirection;
            PrimaryMentorId = primaryMentorId;
            PrimaryMentor = primaryMentor;
            SecondaryMentorId = secondaryMentorId;
            SecondaryMentor = secondaryMentor;
            GroupLevel = groupLevel;
        }
    }
}