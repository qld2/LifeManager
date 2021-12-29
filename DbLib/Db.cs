using MySqlConnector;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dapper;
using Dapper.Contrib;
using System.Reflection;

namespace DbLib
{
    public class Db : IDisposable
    {
        public IDbConnection _connection { get; }

        private Dictionary<string, ITable<IDataToOutput, IDataToInput, ITableSchema>> _tables { get; }

        public void Dispose() => _connection.Dispose();

        public Db(string connectionString)
        {
            _connection = new MySqlConnection(connectionString);
            _tables = new Dictionary<string, ITable<IDataToOutput, IDataToInput, ITableSchema>>();
        }

        public void AddTable(ITable<IDataToOutput, IDataToInput, ITableSchema> table)
        {
            _tables.Add(table._name, table);
        }

        public IEnumerable<IDataToOutput> SelectByUser(Guid userId, string tableName) {
            if (_tables.ContainsKey(tableName))
                return _tables[tableName].SelectByUser(_connection, userId);
            else return new List<IDataToOutput>();
        }

        public void Insert(Guid userId, IDataToInput dataToInput, string tableName)
        {
            _tables[tableName].Insert(_connection, dataToInput);
        }
    }
}
