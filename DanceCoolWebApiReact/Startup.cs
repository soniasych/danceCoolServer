using DanceCoolBusinessLogic.Interfaces;
using DanceCoolBusinessLogic.Services;
using DanceCoolDataAccessLogic.EfStructures.Context;
using DanceCoolDataAccessLogic.UnitOfWork;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using System.Threading.Tasks;

namespace DanceCoolWebApiReact
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<DanceCoolContext>
                (opt => opt.UseSqlServer(Configuration["Data:CommandAPIConnection:ConnectionString"]));
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2);

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                    .AddJwtBearer(options =>
                    {
                        options.RequireHttpsMetadata = false;
                        options.TokenValidationParameters = new TokenValidationParameters
                        {
                            // óêçûâàåò, áóäåò ëè âàëèäèðîâàòüñÿ èçäàòåëü ïðè âàëèäàöèè òîêåíà
                            ValidateIssuer = true,
                            // ñòðîêà, ïðåäñòàâëÿþùàÿ èçäàòåëÿ
                            ValidIssuer = AuthOptions.ISSUER,

                            // áóäåò ëè âàëèäèðîâàòüñÿ ïîòðåáèòåëü òîêåíà
                            ValidateAudience = true,
                            // óñòàíîâêà ïîòðåáèòåëÿ òîêåíà
                            ValidAudience = AuthOptions.AUDIENCE,
                            // áóäåò ëè âàëèäèðîâàòüñÿ âðåìÿ ñóùåñòâîâàíèÿ
                            ValidateLifetime = true,

                            // óñòàíîâêà êëþ÷à áåçîïàñíîñòè
                            IssuerSigningKey = AuthOptions.GetSymmetricSecurityKey(),
                            // âàëèäàöèÿ êëþ÷à áåçîïàñíîñòè
                            ValidateIssuerSigningKey = true,
                        };
                    });

            services.AddTransient<IUnitOfWork, UnitOfWork>();
            services.AddTransient<IGroupService, GroupService>();
            services.AddTransient<IUserService, UserService>();
            services.AddTransient<ILessonService, LessonService>();
            services.AddScoped<IAuthenticationService, AuthenticationService>();
            services.AddTransient<IPaymentService, PaymentService>();
            services.AddTransient<IAbonnementService, AbonnementService>();
            services.AddTransient<IAttendanceService, AttendanceService>();

            // In production, the React files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/build";
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseAuthentication();
            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseSpaStaticFiles();

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller}/{action=Index}/{id?}");
            });

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseReactDevelopmentServer(npmScript: "start");
                }
            });
        }
    }
}
