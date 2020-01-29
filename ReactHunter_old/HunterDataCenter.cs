using SmartHunter.Game.Data;
using SmartHunter.Game.Data.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReactHunter
{

    public class HunterDataCenter
    {
        public static Player[] TeamInfo = new Player[4];

        public static Action<Player[]> OnTeamReceive = null;

        public static Action<Player[], Monster[]> OnDataReceive = null;
        private static object locker = new object();


        public static void Update()
        {

            OnDataReceive?.Invoke(OverlayViewModel.Instance.TeamWidget.Context.Players.ToArray(), OverlayViewModel.Instance.MonsterWidget.Context.Monsters.ToArray());
        }
    }
}
