namespace DanceCoolDTO
{
    public class GroupDTO
    {
        public int GroupId { get; set; }
        public string GroupDirection { get; set; }
        public int PrimaryMentorId { get; set; }
        public string PrimaryMentorFirstName { get; set; }
        public string PrimaryMentorLastName { get; set; }
        public int? SecondaryMentorId { get; set; }
        public string SecondaryMentorFirstName { get; set; }
        public string SecondaryMentorLastName { get; set; }
        public string GroupLevel { get; set; }

        public GroupDTO(int groupId, 
            string groupDirection, 
            int primaryMentorId, 
            string primaryMentorFirstName, 
            string primaryMentorLastName, 
            int? secondaryMentorId, 
            string secondaryMentorFirstName, 
            string secondaryMentorLastName, 
            string groupLevel)
        {
            GroupId = groupId;
            GroupDirection = groupDirection;
            PrimaryMentorId = primaryMentorId;
            PrimaryMentorFirstName = primaryMentorFirstName;
            PrimaryMentorLastName = primaryMentorLastName;
            SecondaryMentorId = secondaryMentorId;
            SecondaryMentorFirstName = secondaryMentorFirstName;
            SecondaryMentorLastName = secondaryMentorLastName;
            GroupLevel = groupLevel;
        }
    }
}