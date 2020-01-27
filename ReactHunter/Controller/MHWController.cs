using Nancy;
using SmartHunter.Game.Data.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReactHunter.Controller
{
    public class MHWController : NancyModule
    {
        public MHWController()
        {
            Get("/", x => {
                return View["Web/index.html"];
            });
            Get("/get", x => {
                var teams = OverlayViewModel.Instance.TeamWidget.Context.Players.ToArray();
                var monsters = OverlayViewModel.Instance.MonsterWidget.Context.Monsters.ToArray();

                
                return Response.AsJson(new { 
                    isSuccess=true,
                    date=DateTime.Now.ToString(),
                    data=new 
                    {
                        players=teams,
                        monsters=monsters
                    }
                });
            });
        }
    }
}
