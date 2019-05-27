using System;
using System.Collections.Generic;
using System.Text;
using DanceCoolDataAccessLogic.EfStructures.Context;
using DanceCoolDataAccessLogic.EfStructures.Entities;
using DanceCoolDataAccessLogic.Repositories.Interfaces;

namespace DanceCoolDataAccessLogic.Repositories
{
    public class AttendanceRepository : BaseRepository<Attendance>, IAttendanceRepository
    {
        public AttendanceRepository(DanceCoolContext context) : base(context)
        {
        }

        public IEnumerable<Attendance> GetAllAttendances() => Context.Attendances;


        public Attendance GetAttendanceById(int id) => Context.Attendances.Find(id);

    }
}
