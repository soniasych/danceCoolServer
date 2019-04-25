using DanceCoolDataAccessLogic.UnitOfWork;

namespace DanceCoolBusinessLogic.Services
{
    public class BaseService
    {
        protected readonly IUnitOfWork db;

        public BaseService(IUnitOfWork db)
        {
            this.db = db;
        }

        public void Dispose()
        {
            db.Dispose();
        }
    }
}