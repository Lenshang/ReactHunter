import Config from '../Config';
import Client from '../Utils/HttpClient';
export async function GetData(): Promise<any> {
    if (Config.fakeApi) {
        let _players: Array<any> = [];
        let _monsters: Array<any> = [];
        _players.push({
            index: 0,
            name: "连殇",
            damage: 1236,
            damageFraction: 1,
            barFraction: 0.3
        });

        _players.push({
            index: 0,
            name: "蓝白",
            damage: 2345,
            damageFraction: 1,
            barFraction: 0.7
        });

        _monsters.push({
            name: "雌火龙",
            "address": 4961948784,
            health: {
                max: 2296,
                current: 2296,
                fraction: 1
            },
            "parts": [{
                "address": 4962032104,
                "isRemovable": false,
                "health": {
                    "max": 180,
                    "current": 180,
                    "fraction": 1,
                    "angle": 359.999,
                    "shouldCapCurrent": false
                },
                "timesBrokenCount": 0,
                "name": "Head",
                "groupId": "Part",
                "isVisible": false,
                "initialTime": "2020-01-27T06:03:58.5203317+00:00",
                "lastChangedTime": null
            }, {
                "address": 4962032608,
                "isRemovable": false,
                "health": {
                    "max": 300,
                    "current": 300,
                    "fraction": 1,
                    "angle": 359.999,
                    "shouldCapCurrent": false
                },
                "timesBrokenCount": 0,
                "name": "Body",
                "groupId": "Part",
                "isVisible": false,
                "initialTime": "2020-01-27T06:03:58.5208304+00:00",
                "lastChangedTime": null
            }, {
                "address": 4962033112,
                "isRemovable": false,
                "health": {
                    "max": 210,
                    "current": 210,
                    "fraction": 1,
                    "angle": 359.999,
                    "shouldCapCurrent": false
                },
                "timesBrokenCount": 0,
                "name": "Left Wing",
                "groupId": "Part",
                "isVisible": false,
                "initialTime": "2020-01-27T06:03:58.5208304+00:00",
                "lastChangedTime": null
            }, {
                "address": 4962033616,
                "isRemovable": false,
                "health": {
                    "max": 210,
                    "current": 210,
                    "fraction": 1,
                    "angle": 359.999,
                    "shouldCapCurrent": false
                },
                "timesBrokenCount": 0,
                "name": "Right Wing",
                "groupId": "Part",
                "isVisible": false,
                "initialTime": "2020-01-27T06:03:58.5208304+00:00",
                "lastChangedTime": null
            }, {
                "address": 4962034120,
                "isRemovable": false,
                "health": {
                    "max": 240,
                    "current": 240,
                    "fraction": 1,
                    "angle": 359.999,
                    "shouldCapCurrent": false
                },
                "timesBrokenCount": 0,
                "name": "Left Leg",
                "groupId": "Part",
                "isVisible": false,
                "initialTime": "2020-01-27T06:03:58.5208304+00:00",
                "lastChangedTime": null
            }, {
                "address": 4962034624,
                "isRemovable": false,
                "health": {
                    "max": 240,
                    "current": 240,
                    "fraction": 1,
                    "angle": 359.999,
                    "shouldCapCurrent": false
                },
                "timesBrokenCount": 0,
                "name": "Right Leg",
                "groupId": "Part",
                "isVisible": false,
                "initialTime": "2020-01-27T06:03:58.5208304+00:00",
                "lastChangedTime": null
            }, {
                "address": 4962035128,
                "isRemovable": false,
                "health": {
                    "max": 220,
                    "current": 220,
                    "fraction": 1,
                    "angle": 359.999,
                    "shouldCapCurrent": false
                },
                "timesBrokenCount": 0,
                "name": "Tail",
                "groupId": "Part",
                "isVisible": false,
                "initialTime": "2020-01-27T06:03:58.5208304+00:00",
                "lastChangedTime": null
            }
            ],
            "crown": 2,
        })
        _monsters.push({
            name: "黑狼鸟",
            "address": 4961815328,
            health: {
                max: 2296,
                current: 2296,
                fraction: 0.7
            },
            "parts": [{
                "address": 4962032104,
                "isRemovable": false,
                "health": {
                    "max": 180,
                    "current": 180,
                    "fraction": 1,
                    "angle": 359.999,
                    "shouldCapCurrent": false
                },
                "timesBrokenCount": 0,
                "name": "Head",
                "groupId": "Part",
                "isVisible": false,
                "initialTime": "2020-01-27T06:03:58.5203317+00:00",
                "lastChangedTime": null
            }, {
                "address": 4962032608,
                "isRemovable": false,
                "health": {
                    "max": 300,
                    "current": 300,
                    "fraction": 1,
                    "angle": 359.999,
                    "shouldCapCurrent": false
                },
                "timesBrokenCount": 0,
                "name": "Body",
                "groupId": "Part",
                "isVisible": false,
                "initialTime": "2020-01-27T06:03:58.5208304+00:00",
                "lastChangedTime": null
            }, {
                "address": 4962033112,
                "isRemovable": false,
                "health": {
                    "max": 210,
                    "current": 210,
                    "fraction": 1,
                    "angle": 359.999,
                    "shouldCapCurrent": false
                },
                "timesBrokenCount": 0,
                "name": "Left Wing",
                "groupId": "Part",
                "isVisible": false,
                "initialTime": "2020-01-27T06:03:58.5208304+00:00",
                "lastChangedTime": null
            }, {
                "address": 4962033616,
                "isRemovable": false,
                "health": {
                    "max": 210,
                    "current": 210,
                    "fraction": 1,
                    "angle": 359.999,
                    "shouldCapCurrent": false
                },
                "timesBrokenCount": 0,
                "name": "Right Wing",
                "groupId": "Part",
                "isVisible": false,
                "initialTime": "2020-01-27T06:03:58.5208304+00:00",
                "lastChangedTime": null
            }, {
                "address": 4962034120,
                "isRemovable": false,
                "health": {
                    "max": 240,
                    "current": 240,
                    "fraction": 1,
                    "angle": 359.999,
                    "shouldCapCurrent": false
                },
                "timesBrokenCount": 0,
                "name": "Left Leg",
                "groupId": "Part",
                "isVisible": false,
                "initialTime": "2020-01-27T06:03:58.5208304+00:00",
                "lastChangedTime": null
            }, {
                "address": 4962034624,
                "isRemovable": false,
                "health": {
                    "max": 240,
                    "current": 240,
                    "fraction": 1,
                    "angle": 359.999,
                    "shouldCapCurrent": false
                },
                "timesBrokenCount": 0,
                "name": "Right Leg",
                "groupId": "Part",
                "isVisible": false,
                "initialTime": "2020-01-27T06:03:58.5208304+00:00",
                "lastChangedTime": null
            }, {
                "address": 4962035128,
                "isRemovable": false,
                "health": {
                    "max": 220,
                    "current": 220,
                    "fraction": 1,
                    "angle": 359.999,
                    "shouldCapCurrent": false
                },
                "timesBrokenCount": 0,
                "name": "Tail",
                "groupId": "Part",
                "isVisible": false,
                "initialTime": "2020-01-27T06:03:58.5208304+00:00",
                "lastChangedTime": null
            }],
            "statusEffects": [{
                "index": 0,
                "groupId": "StatusEffect",
                "buildup": {
                    "max": 1.401298E-45,
                    "current": 1.401298E-45,
                    "fraction": 1,
                    "angle": 359.999,
                    "shouldCapCurrent": true
                },
                "duration": {
                    "max": 1.401298E-45,
                    "current": 0,
                    "fraction": 0,
                    "angle": 0,
                    "shouldCapCurrent": true
                },
                "timesActivatedCount": 860356608,
                "name": "Poison",
                "isVisible": false,
                "initialTime": "2020-01-27T06:03:56.0046962+00:00",
                "lastChangedTime": null
            }, {
                "index": 4,
                "groupId": "StatusEffect",
                "buildup": {
                    "max": 1.401298E-45,
                    "current": 1.401298E-45,
                    "fraction": 1,
                    "angle": 359.999,
                    "shouldCapCurrent": true
                },
                "duration": {
                    "max": 1.401298E-45,
                    "current": 0,
                    "fraction": 0,
                    "angle": 0,
                    "shouldCapCurrent": true
                },
                "timesActivatedCount": 860356608,
                "name": "Mount",
                "isVisible": false,
                "initialTime": "2020-01-27T06:03:56.0056945+00:00",
                "lastChangedTime": null
            }, {
                "index": 8,
                "groupId": "StatusEffect",
                "buildup": {
                    "max": 1.401298E-45,
                    "current": 1.401298E-45,
                    "fraction": 1,
                    "angle": 359.999,
                    "shouldCapCurrent": true
                },
                "duration": {
                    "max": 1.401298E-45,
                    "current": 0,
                    "fraction": 0,
                    "angle": 0,
                    "shouldCapCurrent": true
                },
                "timesActivatedCount": 860356608,
                "name": "Flash",
                "isVisible": false,
                "initialTime": "2020-01-27T06:03:56.0056945+00:00",
                "lastChangedTime": null
            }, {
                "index": 10,
                "groupId": "StatusEffect",
                "buildup": {
                    "max": 1.401298E-45,
                    "current": 1.401298E-45,
                    "fraction": 1,
                    "angle": 359.999,
                    "shouldCapCurrent": true
                },
                "duration": {
                    "max": 1.401298E-45,
                    "current": 0,
                    "fraction": 0,
                    "angle": 0,
                    "shouldCapCurrent": true
                },
                "timesActivatedCount": 860356608,
                "name": "Shock Trap",
                "isVisible": false,
                "initialTime": "2020-01-27T06:03:56.0056945+00:00",
                "lastChangedTime": null
            }, {
                "index": 12,
                "groupId": "StatusEffect",
                "buildup": {
                    "max": 1.401298E-45,
                    "current": 1.401298E-45,
                    "fraction": 1,
                    "angle": 359.999,
                    "shouldCapCurrent": true
                },
                "duration": {
                    "max": 1.401298E-45,
                    "current": 0,
                    "fraction": 0,
                    "angle": 0,
                    "shouldCapCurrent": true
                },
                "timesActivatedCount": 860356608,
                "name": "Elderseal",
                "isVisible": false,
                "initialTime": "2020-01-27T06:03:56.0056945+00:00",
                "lastChangedTime": null
            }, {
                "index": 14,
                "groupId": "StatusEffect",
                "buildup": {
                    "max": 1,
                    "current": 0,
                    "fraction": 0,
                    "angle": 0,
                    "shouldCapCurrent": true
                },
                "duration": {
                    "max": 1.401298E-45,
                    "current": 1.401298E-45,
                    "fraction": 1,
                    "angle": 359.999,
                    "shouldCapCurrent": true
                },
                "timesActivatedCount": 0,
                "name": "Fatigue",
                "isVisible": false,
                "initialTime": "2020-01-27T06:03:56.0056945+00:00",
                "lastChangedTime": null
            }],
            "crown": 3,
        })
        return new Promise((resolve: any, reject: any) => {
            resolve({
                isSuccess: true,
                date: "2020/1/27 14:04:05",
                data: {
                    players: _players,
                    monsters: _monsters
                }
            });
        });
    }
    else {
        let r: any = await Client.get("/get");
        return r.data;
    }
}