using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReactHunter
{
    class Config
    {
        public string ApiHost { get; set; }
        private static Config _config;
        public static Config Get()
        {
            if (Config._config == null)
            {
                var jsonStr = File.ReadAllText("ReactHunterConfig.json");
                Config._config = Newtonsoft.Json.JsonConvert.DeserializeObject<Config>(jsonStr);
            }
            return Config._config;
        }
    }
}
