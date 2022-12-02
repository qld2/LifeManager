using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MockDb.temp
{
    public class ClothingSchema : ISchema
    {
        public string uid { get; set; }
        public string id { get; set; }
        public string timeCreated { get; set; }
        public string articleName { get; set; }
        public string clothingType { get; set; }
        public string clothingTags { get; set; }
        public string color { get; set; }
        public int timesWorn { get; set; }
    }
}
