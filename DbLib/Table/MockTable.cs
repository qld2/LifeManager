using CsvHelper;
using System;
using System.Collections.Generic;
using System.Data;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DbLib.Table
{
    public class MockTable<TableSchema> //: ITaable<TableSchema>
        where TableSchema : ITableSchema
    {
        public string Name { get; }
        public IEnumerable<TableSchema> _data { get; }

        public MockTable(string filepath)
        {
            Name = "";
        }

        public MockTable(ITaable<TableSchema> table)
        {
            Name = table.Name;
            _data = table.List();
        }

        public bool WriteToCSV(string filepath)
        {
            using (var writer = new StreamWriter(filepath))
            using (var csv = new CsvWriter(writer, CultureInfo.InvariantCulture))
            {
                csv.WriteRecords(_data);
            }

            return true;
        }

        public IEnumerable<TableSchema> List()
        {
            return _data;
        }

        //public void Refresh() {}
    }
}
