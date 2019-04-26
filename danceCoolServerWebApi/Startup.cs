using DanceCoolBusinessLogic.Services;
using DanceCoolDataAccessLogic.Entities;
using DanceCoolDataAccessLogic.Repositories;
using DanceCoolDataAccessLogic.Repositories.Interfaces;
using DanceCoolDataAccessLogic.UnitOfWork;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Configuration;

namespace danceCoolServer
{
    public class Startup
    {
        //public IContainer ApplicationContainer { get; private set; }
        public IConfiguration Configuration {get;}

        public Startup(IConfiguration configuration) => Configuration = configuration;


        //----------------------
        //-----Working code-----
        //----------------------
        //public IServiceProvider ConfigureServices(IServiceCollection services)
        //{
        //    services.AddMvc()
        //        .SetCompatibilityVersion(CompatibilityVersion.Version_2_2);
        //    services.AddDbContext<DanceCoolContext>
        //        (opt => opt.UseSqlServer(Configuration["Data:CommandAPIConnection:ConnectionString"]));

        //    var builder = new ContainerBuilder();

        //    builder.RegisterType<UnitOfWork>().As<IUnitOfWork>();
        //    builder.RegisterType<GroupService>().As<IGroupService>();

        //    builder.Populate(services);

        //    ApplicationContainer = builder.Build();

        //    return new AutofacServiceProvider(ApplicationContainer);
        //}


        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc()
                .SetCompatibilityVersion(CompatibilityVersion.Version_2_2);
            services.AddDbContext<DanceCoolContext>
                (opt => opt.UseSqlServer(Configuration["Data:CommandAPIConnection:ConnectionString"]));
            services.AddTransient<IUnitOfWork, UnitOfWork>();
            services.AddTransient<IGroupService, GroupService>();

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            app.UseCors(builder => builder.AllowAnyOrigin());
            app.UseMvc();
        }
    }
}
