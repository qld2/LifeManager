using DbLib.Table;
using NUnit.Framework;
using System.Collections.Generic;
using WardrobeApi.DTO;

namespace ApiTests.Wardrobe
{
    class WardrobeTsts
    {
        private MockTable<ClothingSchema> mockTable;

        [SetUp]
        public void Setup()
        {
            string fp = "Load somehow.";
            mockTable = new MockTable<ClothingSchema>(fp);
        }

        [Test]
        public void Test1()
        {
            Assert.AreEqual(1, 2);
        }
    }


}
