using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace DanceCoolDataAccessLogic.Repositories.Interfaces
{
    public interface IRepository<TEntity> where TEntity: class
    {
        TEntity GetEntityById(int id);
        IEnumerable<TEntity> GetAll();
        IEnumerable<TEntity> FindEntity(Expression<Func<TEntity, bool>> predicate);
        
        void AddEntity(TEntity entity);
        void AddRange(IEnumerable<TEntity> entities);
        
        void Remove(TEntity entity);
        void RemoveRange(IEnumerable<TEntity> entitiesToRemove);
    }
}
