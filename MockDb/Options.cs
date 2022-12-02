using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CommandLine;

namespace MockDb
{
    class Options
    {
        [Option('l', "list",
                  Default = false,
                  HelpText = "Lists all registered schemas.")]
        public bool List { get; set; }

        [Option('s', "schema",
            Required = false,
            HelpText = "Specifies a schema for some actions.")]
        public string Schema { get; set; }

        [Option("add",
            Default = false,
            HelpText = "Add a db with given name. Must specify schema.")]
        public bool Add { get; set; }
    }
}
