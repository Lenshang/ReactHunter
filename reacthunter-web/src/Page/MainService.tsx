import Config from '../Config';
import Client from '../Utils/HttpClient';
export async function GetData(): Promise<any> {
    if(Config.fakeApi){
        let _players:Array<any>=[];
        let _monsters:Array<any>=[];
        _players.push({
            index:0,
            name:"连殇",
            damage:1236,
            damageFraction:1,
            barFraction:1
        });

        _monsters.push({
            name:"皮卡丘",
            health:{
                max: 2296,
                current: 2296,
                fraction:1
            }
        })
        return new Promise((resolve:any,reject:any)=>{
            resolve({
                isSuccess:true,
                date:"2020/1/27 14:04:05",
                data:{
                    players:_players,
                    monsters:_monsters
                }
            });
        });
    }
    else{
        let r:any=await Client.get("/get");
        return r.data;
    }
}