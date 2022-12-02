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

using DbLib.Table;
using DbLib.DB;

namespace DbLib
{
    public class DbManager : IDisposable
    {
        //private string _connectionString { get; }
        private IDbConnection _connection { get; }
        private Dictionary<string, IDb> _databases { get; set; }
        private string _current { get; set; }

        public DbManager(string connectionString)
        {
            _connection = new MySqlConnection(connectionString);
            _current = null;

            RefreshDatabases();
        }

        public void Dispose() {
            foreach(KeyValuePair<string, IDb> db in _databases)
            {
                db.Value.Dispose();
            }
        }

        public bool CreateDb(string name)
        {
            try
            {
                _connection.Execute("CREATE DATABASE " + name);
                return true;
            }
            catch (Exception e)
            {
                Console.WriteLine("Error in db creation, SQL Execution Failed.");
            }

            RefreshDatabases();
            return false;
        }

        public bool DropDb(string name)
        {
            try
            {
                _connection.Execute("DROP DATABASE " + name);

                return true;
            }
            catch (Exception e)
            {
                Console.WriteLine("Error in db deletion, SQL Execution Failed.");
            }

            return false;
        }

        public IDb UseDb(string name)
        {
            RefreshDatabases();

            try
            {
                _connection.Execute("USE " + name);
                _current = name;
                return _databases[_current];
            }
            catch (Exception e)
            {
                Console.WriteLine("Error in db use, SQL Execution Failed.");
            }

            return null;
        }

        //public MockTable<ITableSchema> GetTableState(string tableName)
        //{
        //    if (_current == null) return null;
        //    IDb db = _databases[_current];
        //    return db.GetCurrentState(tableName);
        //}

        public bool RefreshDatabases()
        {
            _databases = new Dictionary<string, IDb>();

            try
            {
                IEnumerable<string> result = _connection.Query<string>("SHOW DATABASES");
                
                foreach (string name in result)
                {
                    _databases.Add(name, new Db(name, _connection));
                }

                return true;
            }
            catch (Exception e)
            {
                Console.WriteLine("Error refreshing dbs, SQL Query Failed.");
            }

            return false;
        }

        public IEnumerable<string> ListDatabases()
        {
            //Likely shouldnt have
            RefreshDatabases();

            List<string> result = new List<string>();

            foreach (KeyValuePair<string, IDb> db in _databases)
                result.Add(db.Key);

            return result;
        }

        public DbNode GetDbNode(string db_name)
        {
            try
            {
                IEnumerable<string> result = _connection.Query<string>("SHOW DATABASES");

                foreach (string name in result)
                {
                    if (name == db_name)
                    {
                        return new DbNode(name, _connection);
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
