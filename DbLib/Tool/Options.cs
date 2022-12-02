using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CommandLine;

namespace DbLib.Tool
{
    [Verb("create", HelpText = "Create database with given name.")]
    class CreateOptions
    {
        [Option('l', "load",
            Default = "",
            HelpText = "Specify filepath to load from.")]
        public string Filepath { get; set; }

        [Option('n', "name",
            Default = "",
            HelpText = "Specify name for database")]
        public string Name { get; set; }
    }

    [Verb("load", HelpText = "Loads a database or table from file.")]
    class LoadOptions
    {
        [Option('f', "file",
            Default = "",
            HelpText = "Specify filepath to load from.")]
        public string Filepath { get; set; }

        [Option('t', "table",
            Default = false,
            HelpText = "Specify file contains table.")]
        public bool Table { get; set; }

        [Option('d', "database",
            Default = false,
            HelpText = "Specify file contains database")]
        public bool Database { get; set; }
    }

    [Verb("drop", HelpText = "Drop given database.")]
    class DropOptions
    {
        [Option('d', "database",
            Default = "",
            HelpText = "Specify filepath")]
        public string Database { get; set; }
    }

    [Verb("list", HelpText = "Lists databases.")]
    class ListOptions
    {
        [Option('v', "verbose",
            Default = false,
            HelpText = "Retrieves more info on the dbs.")]
        public bool Verbose { get; set; }
    }

    [Verb("download", HelpText = "Downloads table or database to CSV file.")]
    class DownloadOptions
    {
        [Option('d', "database",
            Required = true,
            HelpText = "Specify db")]
        public string Database { get; set; }

        [Option('t', "table",
            Default = "",
            HelpText = "Specify table")]
        public string Table { get; set; }

        [Option('o', "output",
            Default = "",
            HelpText = "Specify output filepath.")]
        public string Output { get; set; }
    }

    [Verb("normalize", HelpText = "Decomposes table template to BCNF form")]
    class NormalizeOptions
    {
        [Option('t', "table",
            Default = "",
            HelpText = "Specify table")]
        public string Table { get; set; }

        [Option('o', "output",
            Default = "",
            HelpText = "Specify output filepath.")]
        public string Output { get; set; }
    }
}
