using DbLib.Table;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WardrobeApi.DTO
{
    public class ClothingDTO : IDataToOutput
    {
        public Guid id { get; set; }
        public string timeCreated { get; set; }
        public string articleName { get; set; }
        public string clothingType { get; set; }
        public string color { get; set; }
        public int timesWorn { get; set; }

    }

    public class ClothingDTI : ClothingDTO, IDataToInput
    {
        public Guid uid { get; set; }

        public ClothingDTI()
        {
            uid = Guid.Empty;
            id = Guid.Empty;
            timeCreated = "NONEXISTANT";
            clothingType = "NONEXISTANT";
            color = "NONEXISTANT";
            timesWorn = 0;
        }
    }

    public class ClothingSchema : ITableSchema
    {
        public ClothingSchema() { }
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
