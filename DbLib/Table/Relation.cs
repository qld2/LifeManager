using Dapper;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DbLib.Table
{
    public class Relation<T>
    {
        private string _name;
        private IDbConnection _connection { get; }
        private List<Attribute> attributes { get; }

        public Relation(string name)
        {
            _name = name;

            try
            {
                IEnumerable<string> result = _connection.Query<string>($"SELECT * from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME = '{ _name }'");

                foreach (string s in result)
                {

                }

            }
            catch (Exception e)
            {
                Console.WriteLine("Error refreshing dbs, SQL Query Failed.");
            }
        }
        public void Dispose() => _connection.Dispose();

        public bool DownloadToCSV(string filepath)
        {
            try
            {
                IEnumerable<string> result = _connection.Query<string>($"SELECT * from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME = '{ _name }'");


            }
            catch (Exception e)
            {
                Console.WriteLine("Error refreshing dbs, SQL Query Failed.");
            }


            return false;
        }

        public void PrintData()
        {
            try
            {
                IEnumerable<string> result = _connection.Query<string>($"SELECT * from INFORMATION_SCHEMA.COLUMNS where TABLE_NAME = '{ _name }'");

                //convert result to attributes
                //build Type from attributes

                //IEnumerable<string> result = _connection.Query<?>($"SELECT * from { _name }");


            }
            catch (Exception e)
            {
                Console.WriteLine("Error refreshing dbs, SQL Query Failed.");
            }
        }
    }
}
