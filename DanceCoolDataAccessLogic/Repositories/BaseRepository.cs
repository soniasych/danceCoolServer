using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using DanceCoolDataAccessLogic.EfStructures.Context;
using DanceCoolDataAccessLogic.Repositories.Interfaces;

namespace DanceCoolDataAccessLogic.Repositories
{
    public class BaseRepository<TEntity> : IRepository<TEntity> where TEntity : class
    {
        protected DanceCoolContext Context;

        public BaseRepository(DanceCoolContext context)
        {
            Context = context;
        }

        public void AddEntity(TEntity entity)
        {
            Context.Set<TEntity>().Add(entity);
        }       

        public void AddRange(IEnumerable<TEntity> entities)
        {
            Context.Set<TEntity>().AddRange(entities);
        }

        public IEnumerable<TEntity> FindEntity(Expression<Func<TEntity, bool>> predicate)
        {
            return Context.Set<TEntity>().Where(predicate);
        }

        public IEnumerable<TEntity> GetAll()
        {
            return Context.Set<TEntity>().ToList();
        }

        public TEntity GetEntityById(int id)
        {
            return Context.Set<TEntity>().Find(id);
        }        

        public void Remove(TEntity entity)
        {
            Context.Set<TEntity>().Remove(entity);
        }

        public void RemoveRange(IEnumerable<TEntity> entitiesToRemove)
        {
            Context.Set<TEntity>().RemoveRange(entitiesToRemove);
        }
    }
}
