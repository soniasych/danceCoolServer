using System.Collections.Generic;
using System.Threading.Tasks;
using DanceCoolDataAccessLogic.Entities;

namespace DanceCoolDataAccessLogic.Repositories.Interfaces
{
    interface ILessonRepository : IRepository<Lesson>
    {
        Task<IEnumerable<Lesson>> GetAllLessonsAsync();
        Task<Lesson> GetAsync(int id);
    }
}
