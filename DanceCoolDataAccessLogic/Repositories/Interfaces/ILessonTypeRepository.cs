using System.Collections.Generic;
using System.Threading.Tasks;
using DanceCoolDataAccessLogic.Entities;

namespace DanceCoolDataAccessLogic.Repositories.Interfaces
{
    interface ILessonTypeRepository : IRepository<LessonType>
    {
        Task<IEnumerable<LessonType>> GetAllLessonTypesAsync();
        Task<LessonType> GetAsync(int id);
    }
}
