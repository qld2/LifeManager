using MySqlConnector;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MockDb
{
    class DbConnection : IDisposable
    {
        public IDbConnection _connection { get; }
        private Dictionary<string, Db> _databases { get; }
        public void Dispose() => _connection.Dispose();

        public DbConnection(string connectionString)
        {
            _connection = new MySqlConnection(connectionString);
        }
    }
}
