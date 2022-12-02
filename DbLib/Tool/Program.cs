using CommandLine;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using CsvHelper;
using System.IO;
using System.Globalization;
using DbLib.Table;

namespace DbLib.Tool
{
    class Program
    {
        private static DbManager dbManager { get; set; }
        private static Dictionary<string, ISchema> schemas { get; set; }
        private static bool Startup()
        {

            var config = new ConfigurationBuilder().AddUserSecrets<DatabaseProviders>().Build();

            IConfigurationProvider provider = config.Providers.First();
            provider.TryGet("DatabaseProviders:MySql", out string connectionString);

            if (connectionString == null)
                return false;
            
            // Tied to shutdown
            //--------------------------
            dbManager = new DbManager(connectionString);



            //--------------------------

            return true;
        }

        private static bool ProcessCreate(CreateOptions o)
        {
            string dbName = o.Name.ToLower();
            if (dbName == string.Empty)
            {
                Console.WriteLine("Command requires -n, --name flag.");
                return false;
            }

            bool succeeded = dbManager.CreateDb(dbName);
            if (succeeded)
            {
                Console.WriteLine("Successfully created database '" + dbName + "'.");
            }
            else
            {
                Console.WriteLine("Failed to created database '" + dbName + "'.");
            }

            return true;
        }

        private static bool ProcessDrop(DropOptions o)
        {
            string dbName = o.Database.ToLower();
            if (dbName == string.Empty)
            {
                Console.WriteLine("Command requires -d, --database flag.");
                return false;
            }

            bool succeeded = dbManager.DropDb(dbName);
            if (succeeded)
            {
                Console.WriteLine("Successfully dropped database '" + dbName + "'.");
            }
            else
            {
                Console.WriteLine("Failed to drop database '" + dbName + "'.");
            }

            return true;
        }

        private static bool ProcessList(ListOptions o)
        {
            IEnumerable<string> dbs = dbManager.ListDatabases();
            foreach (string dbName in dbs)
            {
                Console.WriteLine("Found DB: '" + dbName + "'.");
            }

            return true;
        }

        private static bool ProcessLoad(LoadOptions o)
        {
            if (o.Filepath == string.Empty)
            {
                Console.WriteLine("Load requires filepath.");
                return false;
            }

            using (var reader = new StreamReader("path\\to\\file.csv"))
            using (var csv = new CsvReader(reader, CultureInfo.InvariantCulture))
            {
                //var records = new List<Object>();
                csv.Read();
                csv.ReadHeader();
                while (csv.Read())
                {
                    var Name = csv.GetField("Name");
                     
                }
            }

            return true;
        }

        private static bool ProcessDownload(DownloadOptions o)
        {
            if (o.Database == string.Empty || o.Table == string.Empty)
            {
                Console.WriteLine("Download requires database & table.");
                return false;
            }

            Relation<object> tableNode = null;//dbManager.GetDbNode(o.Database)?.GetTableNode(o.Table);

            if (tableNode != null)
            {
                tableNode.PrintData();
            }

            return true;
        }

        private static bool Shutdown()
        {
            return true;
        }

        static int Main(string[] args)
        {
            bool succeeded = Startup();
            if (!succeeded)
                return -1;

            Parser.Default.ParseArguments<CreateOptions, DropOptions, ListOptions, LoadOptions, DownloadOptions>(args)
                   .WithParsed<CreateOptions>(o => ProcessCreate(o))
                   .WithParsed<DropOptions>(o => ProcessDrop(o))
                   .WithParsed<ListOptions>(o => ProcessList(o))
                   .WithParsed<LoadOptions>(o => ProcessLoad(o))
                   .WithParsed<DownloadOptions>(o => ProcessDownload(o));

            return 0;
        }
    }
}
