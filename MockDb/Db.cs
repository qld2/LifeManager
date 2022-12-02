using Dapper;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace MockDb
{
    public class Db
    {
        public string _name { get; }
        public string _schema_filename { get; }

        public Db(string name, string schema_filename)
        {
            _name = name;
            _schema_filename = schema_filename;
        }
    }
}
