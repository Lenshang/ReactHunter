
using Nancy.Hosting.Self;
using SmartHunter.Core;
using SmartHunter.Game;
using SmartHunter.Game.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace ReactHunter
{
    class Program
    {
        static void Main(string[] args)
        {
            var m_MemoryUpdater = new MhwMemoryUpdater();
            //HunterDataCenter.OnDataReceive = (teams,monster) => {
            //    Console.Clear();
            //    foreach(var m in monster)
            //    {
            //        Console.WriteLine($"=={m.Name}==");
            //        Console.WriteLine($"HP:{m.Health.Current}/{m.Health.Max}");
            //    }
            //    Console.WriteLine("================================");
            //    foreach(var player in teams)
            //    {
            //        Console.WriteLine($"{player.Index}号位:[{player.Name}]>{player.Damage}");
            //    }
            //};

            HostConfiguration config = new HostConfiguration();
            config.RewriteLocalhost = true;
            var host = new NancyHost(config, new Uri(Config.Get().ApiHost));
            host.Start();
            Log.WriteLine("Api Start On " + Config.Get().ApiHost);
            while (true)
            {
                m_MemoryUpdater.NewUpdate();
                HunterDataCenter.Update();
                Thread.Sleep(500);
            }
        }
    }
}
