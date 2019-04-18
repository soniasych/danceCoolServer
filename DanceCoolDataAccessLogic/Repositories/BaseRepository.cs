using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using DanceCoolDataAccessLogic.Entities;
using DanceCoolDataAccessLogic.Repositories.Interfaces;

namespace DanceCoolDataAccessLogic.Repositories
{
    internal class BaseRepository<TEntity> : IRepository<TEntity> where TEntity : class
    {
        protected readonly DanceCoolContext Context;

        public BaseRepository(DanceCoolContext context)
        {
            Context = context;
        }

        public async Task AddAsync(TEntity entity)
        {
            Context.Set<TEntity>().Add(entity);
        }

        public async Task AddRangeAsync(IEnumerable<TEntity> entities)
        {
            Context.Set<TEntity>().AddRange(entities);
        }

        public async Task<IEnumerable<TEntity>> FindEntity(Expression<Func<TEntity, bool>> predicate)
        {
            return Context.Set<TEntity>().Where(predicate);
        }

        public async Task<IEnumerable<TEntity>> GetAll()
        {
            return Context.Set<TEntity>().ToList();
        }

        public async Task<TEntity> GetEntityAsync(int id)
        {
            return Context.Set<TEntity>().Find(id);
        }

        public async Task RemoveAsync(TEntity entity)
        {
            Context.Set<TEntity>().Remove(entity);
        }

        public async Task RemoveRangeAsync(IEnumerable<TEntity> entitiesToRemove)
        {
            Context.Set<TEntity>().RemoveRange(entitiesToRemove);
        }
    }
}
