using DbLib.Table;
using NUnit.Framework;
using System.Collections.Generic;
using WardrobeApi.DTO;
using WardrobeApi.Controllers;

namespace ApiTests
{
    public class ExampleTests
    {
        private MockTable<ExampleSchema> mockTable;
        private ClothesController controller;

        [SetUp]
        public void Setup()
        {
            //string fp = "Load somehow.";
            //mockTable = new MockTable<ExampleSchema>(fp);

            //controller = new ClothesController();
        }

        [Test]
        public void Test1()
        {
            Assert.AreEqual(1, 2);
        }
    }
}