using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using MySqlConnector;
using WardrobeApi.DTO;
using Dapper;
using Dapper.Contrib;

namespace WardrobeApi.DB
{
    public class ClothingDb : IDisposable
    {
        public IDbConnection Connection { get; }

        public ClothingDb(string connectionString)
        {
            Connection = new MySqlConnection(connectionString);
        }

        public void Dispose() => Connection.Dispose();

        //user_id broken
        public IEnumerable<ClothingDTO> ListClothes(string user_id)
        {
            string SQLQuery = "Select id AS GuidByDapper, articleName, clothingType, color, timeCreated, timesWorn From Clothes";
            return Connection.Query<ClothingDTO>(SQLQuery).ToList();
        }

        //user_id broken
        public void AddArticle(string user_id, ClothingDTO article)
        {
            string SQLQuery = "insert into clothes (uid, id, articleName, color, clothingType) values (\"" + "TEST"
                   + "\",\"" + Guid.NewGuid() + "\",\"" + article.articleName + "\",\"" + article.color + "\", \"" + article.clothingType + "\")";

            Connection.Query<ClothingDTI>(SQLQuery);
        }
    }
}
