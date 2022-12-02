using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dapper;
using Dapper.Contrib;

using DbLib.Table;
using MySqlConnector;

namespace DbLib
{
    public interface IDb : IDisposable
    {
        public MockTable<ITableSchema> GetCurrentState(string tableName);
    }

    public class Db : IDb
    {
        private string _title { get; }
        private IDbConnection _connection { get; }
        private Dictionary<string, ITaable<ITableSchema>> _tables;//ITable<IDataToOutput, IDataToInput, ITableSchema>> _tables { get; }
        public Db(string title, IDbConnection connection)
        {
            _title = title;
            _connection = connection;
        }

        public void Dispose() => _connection.Dispose();
        public MockTable<ITableSchema> GetCurrentState(string tableName)
        {
            ITaable<ITableSchema> table = _tables[tableName];
            MockTable<ITableSchema> result = new MockTable<ITableSchema>(table);
            return result;
        }

        public bool RefreshTables()
        {
            _tables = new Dictionary<string, ITaable<ITableSchema>>();

            try
            {
                IEnumerable<string> result = _connection.Query<string>("SHOW TABLES");

                //foreach (string name in result)
                //{
                //    _tables.Add(name, new Taable<>(name, _connection));
                //}

                return true;
            }
            catch (Exception e)
            {
                Console.WriteLine("Error refreshing dbs, SQL Query Failed.");
            }

            return false;
        }

        //public void AddTable(ITaable<ITableSchema> table)
        //{
        //    _tables.Add(table.Name, table);
        //}

        //public void AddTable(ITable<IDataToOutput, IDataToInput, ITableSchema> table)
        //{
        //    _tables.Add(table._name, table);
        //}

        //public IEnumerable<IDataToOutput> SelectByUser(Guid userId, string tableName)
        //{
        //    if (_tables.ContainsKey(tableName))
        //        return _tables[tableName].SelectByUser(_connection, userId);
        //    else return new List<IDataToOutput>();
        //}

        //public void Insert(Guid userId, IDataToInput dataToInput, string tableName)
        //{
        //    _tables[tableName].Insert(_connection, dataToInput);
        //}
    }
}
