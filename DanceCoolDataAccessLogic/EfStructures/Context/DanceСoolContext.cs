using DanceCoolDataAccessLogic.EfStructures.Entities;
using Microsoft.EntityFrameworkCore;

namespace DanceCoolDataAccessLogic.EfStructures.Context
{
    public partial class DanceСoolContext : DbContext
    {
        public virtual DbSet<Abonnement> Abonnements { get; set; }
        public virtual DbSet<Attendance> Attendances { get; set; }
        public virtual DbSet<DanceDirection> DanceDirections { get; set; }
        public virtual DbSet<Group> Groups { get; set; }
        public virtual DbSet<Lesson> Lessons { get; set; }
        public virtual DbSet<Payment> Payments { get; set; }
        public virtual DbSet<Role> Roles { get; set; }
        public virtual DbSet<SkillLevel> SkillLevels { get; set; }
        public virtual DbSet<User> Users { get; set; }
        public virtual DbSet<UserCredential> UserCredentials { get; set; }
        public virtual DbSet<UserGroup> UserGroups { get; set; }

        public DanceСoolContext(DbContextOptions<DanceСoolContext> options) : base(options)
        {
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer("Data Source=XPS15\\SQLEXPRESS;Initial Catalog=DanceCool;Integrated Security=True");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("ProductVersion", "2.2.0-rtm-35687");

            modelBuilder.Entity<Attendance>(entity =>
            {
                entity.HasOne(d => d.Lesson)
                    .WithMany(p => p.Attendances)
                    .HasForeignKey(d => d.LessonId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Lesson_Attendances");

                entity.HasOne(d => d.PresentStudent)
                    .WithMany(p => p.Attendances)
                    .HasForeignKey(d => d.PresentStudentId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_User_Attendances");
            });

            modelBuilder.Entity<Group>(entity =>
            {
                entity.HasOne(d => d.Direction)
                    .WithMany(p => p.Groups)
                    .HasForeignKey(d => d.DirectionId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Direction_Group");

                entity.HasOne(d => d.Level)
                    .WithMany(p => p.Groups)
                    .HasForeignKey(d => d.LevelId)
                    .HasConstraintName("FK_Level_Group");

                entity.HasOne(d => d.PrimaryMentor)
                    .WithMany(p => p.GroupPrimaryMentors)
                    .HasForeignKey(d => d.PrimaryMentorId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_PrimMentor_Group");

                entity.HasOne(d => d.SecondaryMentor)
                    .WithMany(p => p.GroupSecondaryMentors)
                    .HasForeignKey(d => d.SecondaryMentorId)
                    .HasConstraintName("FK_SecMentor_Group");
            });

            modelBuilder.Entity<Lesson>(entity =>
            {
                entity.HasOne(d => d.Group)
                    .WithMany(p => p.Lessons)
                    .HasForeignKey(d => d.GroupId)
                    .HasConstraintName("FK_Group_Lesson");
            });

            modelBuilder.Entity<Payment>(entity =>
            {
                entity.HasOne(d => d.Abonnement)
                    .WithMany(p => p.Payments)
                    .HasForeignKey(d => d.AbonnementId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Abonement_Payment");

                entity.HasOne(d => d.UserReceiver)
                    .WithMany(p => p.PaymentUserReceivers)
                    .HasForeignKey(d => d.UserReceiverId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_UserReceiver_Payment");

                entity.HasOne(d => d.UserSender)
                    .WithMany(p => p.PaymentUserSenders)
                    .HasForeignKey(d => d.UserSenderId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_UserSender_Payment");
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.HasIndex(e => e.PhoneNumber)
                    .HasName("UQ__Users__85FB4E38B4B26030")
                    .IsUnique();

                entity.Property(e => e.PhoneNumber).IsUnicode(false);

                entity.HasOne(d => d.Role)
                    .WithMany(p => p.Users)
                    .HasForeignKey(d => d.RoleId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_User_UserCredentials");
            });

            modelBuilder.Entity<UserCredential>(entity =>
            {
                entity.HasIndex(e => e.Email)
                    .HasName("UQ__UserCred__A9D10534290A7C03")
                    .IsUnique();

                entity.HasIndex(e => e.UserId)
                    .HasName("UQ__UserCred__1788CC4DB0055F80")
                    .IsUnique();

                entity.HasOne(d => d.User)
                    .WithOne(p => p.UserCredential)
                    .HasForeignKey<UserCredential>(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_User_Roles");
            });

            modelBuilder.Entity<UserGroup>(entity =>
            {
                entity.HasOne(d => d.Group)
                    .WithMany(p => p.UserGroups)
                    .HasForeignKey(d => d.GroupId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Group_UserGroup");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.UserGroups)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_User_UserGroup");
            });

            OnModelCreatingExt(modelBuilder);
        }

        partial void OnModelCreatingExt(ModelBuilder modelBuilder);
    }
}