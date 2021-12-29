using DbLib;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WardrobeApi.DB;
using WardrobeApi.DTO;

namespace WardrobeApi
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            //services.AddTransient(_ => 
            //{ 
            //    new ClothingDb(Configuration["Databases:MySql"])

            //});

            services.AddTransient(_ =>
            {
                Db db = new Db(Configuration["Databases:MySql"]);

                ITable<IDataToOutput, IDataToInput, ITableSchema> table 
                    = new Table<ClothingDTO, ClothingDTI, ClothingSchema>("clothes");
                db.AddTable(table);

                return db;
            });

            //services.AddTransient(_ => Configuration["Databases:MySql"]);

            services.AddAuthentication("Bearer")
                .AddJwtBearer("Bearer", config => {
                    config.Authority = "https://localhost:44396/";
                    config.Audience = "WardrobeApi";
                });

            services.AddCors(config => config.AddPolicy("AllowAll", 
                p => p.AllowAnyOrigin()
                    .AllowAnyMethod()
                    .AllowAnyHeader()
                ));

            services.AddControllers();
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseCors("AllowAll");

            app.UseRouting();

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
