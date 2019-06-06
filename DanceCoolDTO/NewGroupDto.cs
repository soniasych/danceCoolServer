namespace DanceCoolDTO
{
    public class NewGroupDto
    {
        public int SkillLevelId { get; set; }
        public int DirectionId { get; set; }

        public NewGroupDto(int directionId, int skillLevelId)
        {
            DirectionId = directionId;
            SkillLevelId = skillLevelId;
        }
    }
}
