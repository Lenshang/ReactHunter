using Nancy.Hosting.Self;
using SmartHunter.Core;
using SmartHunter.Game;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace ReactHunter
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }

        private void Form1_Load(object sender, EventArgs e)
        {
            Console.SetOut(new TextBoxWriter(this.textBox1));

            //Start MonsterHunterMemoryUpdater
            var m_MemoryUpdater = new MhwMemoryUpdater();

            //Start WebApi
            HostConfiguration config = new HostConfiguration();
            config.RewriteLocalhost = true;
            var host = new NancyHost(config, new Uri(Config.Get().ApiHost));
            host.Start();
            Log.WriteLine("Api Start On " + Config.Get().ApiHost);
        }
    }
}
