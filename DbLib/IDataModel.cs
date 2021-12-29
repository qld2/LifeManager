using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DbLib
{
    public interface IDataToOutput
    {
        public Guid id { get; set; }
        public string timeCreated { get; set; }
    }

    public interface IDataToInput : IDataToOutput
    {
        public Guid uid { get; set; }
    }

    public interface ITableSchema
    {

    }
}
