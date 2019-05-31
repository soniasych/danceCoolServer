using System.ComponentModel.DataAnnotations.Schema;

namespace DanceCoolDataAccessLogic.EfStructures.Entities
{
    public partial class UserGroup
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int GroupId { get; set; }

        [ForeignKey("GroupId")]
        [InverseProperty("UserGroups")]
        public virtual Group Group { get; set; }
        [ForeignKey("UserId")]
        [InverseProperty("UserGroups")]
        public virtual User User { get; set; }
    }
}