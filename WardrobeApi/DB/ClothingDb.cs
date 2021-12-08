using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using MySqlConnector;
using WardrobeApi.DTO;
using Dapper;

namespace WardrobeApi.DB
{
    public class ClothingDb : IDisposable
    {
        public MySqlConnection Connection { get; }

        public ClothingDb(string connectionString)
        {
            Connection = new MySqlConnection(connectionString);
        }

        public void Dispose() => Connection.Dispose();

        //user_id broken
        public IEnumerable<ClothingDTO> ListClothes(string user_id)
        {
            string SQLQuery = "Select name, clothingType, color From Clothes";
            return Connection.Query<ClothingDTO>(SQLQuery).ToList();
        }

        //user_id broken
        public void AddArticle(string user_id, ClothingDTO article)
        {
            try
            {
                Connection.Open();
                string sql = "insert into clothes (user_id, guid, name, color, clothingType) values (\"" + "TEST" 
                   + "\",\"" + Guid.NewGuid() + "\",\"" + article.name + "\",\"" + article.color + "\", \"" + article.type + "\")";

                MySqlCommand cmd = new MySqlCommand(sql, Connection);
                cmd.ExecuteNonQuery();
                Connection.Close();
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
            }
        }
    }
}
