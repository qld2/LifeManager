using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using WardrobeApi.DTO;
using WardrobeApi.DB;
using MySqlConnector;
using Microsoft.AspNetCore.Cors;
using System.Security.Claims;
using System.Data;
using Microsoft.IdentityModel.Protocols;
using System.Data.SqlClient;
using Dapper;

namespace WardrobeApi.Controllers
{
    //[Route("api/[controller]")]
    //[Authorize]
    //[ApiController]
    public class ClothesController : Controller //Base
    {
        public ClothingDb _db { get; set; }

        public ClothesController(ClothingDb db)
        {
            _db = db;
        }

        [Route("api/clothes")]
        [Authorize]
        //[EnableCors]
        //[HttpGet]
        public IEnumerable<ClothingDTO> List()
        {
            //string email = (from c in User.Claims
            //                   where c.Type == ClaimTypes.Email
            //                   select new string(c.Value)).First();

            return _db.ListClothes("test");
        }

        //[EnableCors]
        [HttpPost]
        [Route("api/clothes/add")]
        [Authorize]
        public void Add([FromBody] ClothingDTO article)
        {
            /*
            string email = (from c in User.Claims
                              where c.Type == ClaimTypes.Email
                              select new string(c.Value)).First();
            
            for (int i = 0; i < HttpContext.User.Claims.Count(); i++)
            {
                Console.WriteLine(HttpContext.User.Claims.ToArray()[i]);
            }
            */

            //_db.AddArticle("test", article);
        }
    }
}
