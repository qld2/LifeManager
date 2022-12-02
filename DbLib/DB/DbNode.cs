using Dapper;
using DbLib.Table;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DbLib.DB
{
    public class DbNode
    {
        private string _title { get; }
        private IDbConnection _connection { get; }
        private Dictionary<string, Relation<int>> _tables;//ITable<IDataToOutput, IDataToInput, ITableSchema>> _tables { get; }
        public DbNode(string title, IDbConnection connection)
        {
            _title = title;
            _connection = connection;
        }

        public void Dispose() => _connection.Dispose();

        public Relation<int> GetTableNode(string table_name)
        {
            try
            {
                IEnumerable<string> result = _connection.Query<string>("SHOW TABLES");

                foreach (string name in result)
                {
                    if (name == table_name)
                    {
                        return new Relation<int>(name);
                    }
                }
            }
            catch (Exception e)
            {
                Console.WriteLine("Error refreshing dbs, SQL Query Failed.");
            }

            return null;
        }
    }
}
