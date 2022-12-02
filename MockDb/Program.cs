using System;
using System.Collections.Generic;
using CommandLine;

namespace MockDb
{
    class Program
    {
        static Dictionary<string, ISchema> schemas { get; set; }
        static void Startup()
        {
            //Load up schemas
        }

        static bool ProcessCommand(Options o)
        {
            if (o.Add)
            {
                if (o.Schema == "")
                {
                    Console.WriteLine("Must specify schema.");
                }
                ////else if (!schemas.Contains(o.Schema))
                ////{
                ////    Console.WriteLine("Schema not found.");
                ////}
                else
                {

                }
            }

            return true;
        }

        static bool Shutdown()
        {
            return true;
        }

        static void Main(string[] args)
        {
            List<String> schemas = new List<string> { "clothing" };

            Startup();

            Parser.Default.ParseArguments<Options>(args)
                   .WithParsed<Options>(o => ProcessCommand(o));

            Shutdown();
        }
    }
}
