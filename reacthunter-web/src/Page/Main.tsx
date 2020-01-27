import React from 'react';
import { Layout, Menu, Breadcrumb, message, Progress, Divider } from 'antd';
import * as Api from './MainService';

const { Header, Content, Footer } = Layout;
interface IProps {

}
interface IState {
    apiData: any
}
export default class Main extends React.Component<IProps, IState>{
    Interval: NodeJS.Timeout | undefined;
    constructor(props: IProps) {
        super(props);
        this.state = {
            apiData: {}
        }
    }
    componentDidMount() {
        this.Interval = setInterval(() => {
            this.doInterval();
        }, 500);
    }
    componentWillUnmount() {
        clearInterval(this.Interval!);
    }

    doInterval = async () => {
        let _r = await Api.GetData();
        if (_r.isSuccess) {
            this.setState({
                apiData: _r.data
            })
        }
        else {
            message.error({
                content: "Data Get Failure!"
            })
        }
    }
    render() {
        const MonsterBarColor = '#FF0000';
        const TeamDamageBarColor = '#FF0000';
        let getMonsters = () => {
            if (!this.state.apiData || !this.state.apiData.monsters) {
                return null;
            }
            return this.state.apiData.monsters.map((m: any) => {
                return (
                    <>
                        <span style={{ fontWeight: "bold" }}>{m.name} ({m.health.current}/{m.health.max})</span>
                        <Progress
                            key={m.name}
                            strokeColor={MonsterBarColor}
                            percent={m.health.fraction * 100}
                            format={percent => m.health.current}
                        />
                    </>
                )
            });
        }

        let getTeam = () => {
            if (!this.state.apiData || !this.state.apiData.players) {
                return null;
            }
            return this.state.apiData.players.map((p: any) => {
                return (
                    <>
                        <span style={{ fontWeight: "bold" }}>{p.name} {p.damage}</span>
                        <Progress
                            key={p.name}
                            strokeColor={MonsterBarColor}
                            percent={p.barFraction * 100}
                            format={percent => p.damage}
                        />
                    </>
                )
            });
        }
        return (
            <Layout className="layout" style={{ height: "100vh" }}>
                <Content style={{ padding: '0px 10px', height: "100%" }}>
                    <div style={{ background: '#fff', padding: 15, minHeight: "100%" }}>
                        <h1>React Hunter</h1>
                        <Divider />
                        <h2>Monster</h2>
                        <div>
                            {getMonsters()}
                        </div>

                        <Divider />
                        <h2>Team Damage</h2>
                        <div>
                            {getTeam()}
                        </div>
                    </div>
                </Content>
            </Layout>
        );
    }
}