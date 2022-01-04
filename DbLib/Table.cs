using Dapper;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace DbLib
{
    public interface ITable<out DataToOutput, out DataToInput, out TableSchema>
        where DataToOutput : IDataToOutput
        where DataToInput : IDataToInput, DataToOutput//, new()
        where TableSchema : ITableSchema
    {
        public string _name {get; }

        public IEnumerable<DataToOutput> SelectByUser(IDbConnection db, Guid userId);
        public void Insert(IDbConnection db, IDataToInput dataToInput);
    }

    public class Table<DataToOutput, DataToInput, TableSchema> 
        : ITable<DataToOutput, DataToInput, TableSchema>
        where DataToOutput : IDataToOutput
        where DataToInput : IDataToInput, DataToOutput
        where TableSchema : ITableSchema
    {
        public string _name { get; }

        public Table(string name)
        {
            _name = name;
        }

        public IEnumerable<DataToOutput> SelectByUser(IDbConnection db, Guid userId)
        {
            string SQLQuery = GetSQLSelect();
            
            //return db.Query<DataToOutput>(SQLQuery).ToList();
            IEnumerable<TableSchema> response =  db.Query<TableSchema>(SQLQuery).ToList();
            List<DataToOutput> result = new List<DataToOutput>();

            foreach (TableSchema row in response)
            {
                result.Add(ToDataToOutput(row)); 
            }

            return result;
        }

        public void Insert(IDbConnection db, IDataToInput dataToInput)
        {
            if (dataToInput.GetType() != typeof(DataToInput))
                return;

            TableSchema input = ToTableSchema((DataToInput)dataToInput);
            string SQLQuery = GetSQLInsert(input);
            db.Query<TableSchema>(SQLQuery);
        }

        private string GetSQLSelect()
        {
            //PropertyInfo[] properties = typeof(DataToOutput).GetProperties();
            //PropertyInfo last = properties.Last();

            //String DTOTableFields = "";
            //foreach (PropertyInfo property in properties)
            //{
            //    DTOTableFields += property.Name + (property == last ? "" : ", ");
            //}

            string SQLQuery = "Select * From " + _name;
            return SQLQuery;
        }

        private string GetSQLInsert(TableSchema input)
        {
            PropertyInfo[] properties = typeof(TableSchema).GetProperties();
            PropertyInfo last = properties.Last();

            String DTITableFields = "(";
            foreach (PropertyInfo property in properties)
            {
                DTITableFields += property.Name + (property == last ? ")" : ", ");
            }

            String SQLQuery = "insert into " + _name + " " + DTITableFields + " values (\"";
            foreach (PropertyInfo property in properties)
            {
                object val = property.GetValue(input);
                SQLQuery += (val != null ? Encode(val, typeof(string)) : "NUL")
                    + (property == last ? "\")" : "\",\"");
            }

            return SQLQuery;
        }

        private TableSchema ToTableSchema(DataToInput input)
        {
            var cstr = typeof(TableSchema).GetConstructor(new Type[0]);
            TableSchema schemaResult = (TableSchema)cstr.Invoke(new object[0]);

            PropertyInfo[] dtiProps = typeof(DataToInput).GetProperties();
            PropertyInfo[] schemaProps = typeof(TableSchema).GetProperties();

            foreach (PropertyInfo schemaProp in schemaProps)
            {
                foreach (PropertyInfo dtiProp in dtiProps)
                {
                    if (dtiProp.Name != schemaProp.Name)
                        continue;

                    object val = Encode(dtiProp.GetValue(input), schemaProp.PropertyType);
                    schemaProp.SetValue(schemaResult, val);
                }
            }

            return schemaResult;
        }

        private DataToOutput ToDataToOutput(TableSchema output)
        {
            PropertyInfo[] dtiProps = typeof(DataToInput).GetProperties();
            PropertyInfo[] schemaProps = typeof(TableSchema).GetProperties();

            var cstr = typeof(DataToInput).GetConstructor(new Type[0]);
            DataToInput dtiResult = (DataToInput)cstr.Invoke(new object[0]);

            foreach (PropertyInfo dtiProp in dtiProps)
            {
                foreach (PropertyInfo schemaProp in schemaProps)
                {
                    if (dtiProp.Name != schemaProp.Name)
                        continue;

                    object value = Decode(schemaProp.GetValue(output), dtiProp.PropertyType);
                    dtiProp.SetValue(dtiResult, value);
                }
            }

            return dtiResult;
        }

        private static object Encode(object input, Type resultType)
        {
            if (input is int)
            {
                if (resultType == typeof(string))
                {
                    return input.ToString();
                }
                else if (resultType == typeof(int))
                {
                    return 1;
                }
            }
            else if (input is string)
            {
                if (resultType == typeof(string))
                {
                    return (string)input;
                }
                else if (resultType == typeof(int))
                {
                    return 1;
                }
            }
            else if (input is IEnumerable<string> inp)
            {
                string output = "_A_";

                foreach(string elem in inp)
                {
                   output += elem + "_";
                }

                output += "_";

                return output;
            }
            else if (input is Guid)
            {
                return ((Guid)input).ToString();
            }

            return "_Err";
        }
        private static object Decode(object input, Type resultType)
        {
            if (input is string)
            {
                if (resultType == typeof(string))
                {
                    return input;
                }
                else if (resultType == typeof(IEnumerable<string>))
                {
                    return new List<string> { "A" , "B" };
                }
                else if (resultType == typeof(Guid))
                {
                    //should TryParse
                    Guid parsed = Guid.Parse((string)input);
                    return parsed;
                }
            }
            else if (input is int)
            {
                if (resultType == typeof(int))
                {
                    return input;
                }
                else if (resultType == typeof(string))
                {
                    return input.ToString();
                }
                else if (resultType == typeof(IEnumerable<string>))
                {
                    return new List<string> { "A", "B" };
                }
                else if (resultType == typeof(Guid))
                {
                    //should TryParse
                    Guid parsed = Guid.Parse((string)input);
                    return parsed;
                }
            }

            return input.ToString();
        }
    }
}
