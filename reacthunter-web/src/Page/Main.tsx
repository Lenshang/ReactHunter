import React from 'react';
import { Layout, Menu, Breadcrumb, message, Progress, Divider, Icon, Row, Col, Collapse, Statistic, Card } from 'antd';
import * as Api from './MainService';
import './Main.css'
const { Header, Content, Footer } = Layout;
const { Panel } = Collapse;
interface IProps {

}
interface IState {
    apiData: any;
    preApiData: any;
}
export default class Main extends React.Component<IProps, IState>{
    Interval: NodeJS.Timeout | undefined;
    activeMonsterIndex: number;
    constructor(props: IProps) {
        super(props);
        this.state = {
            apiData: {},
            preApiData: {}
        }
        this.activeMonsterIndex = 0;
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
                apiData: _r.data,
                preApiData: this.state.apiData
            })
        }
        else {
            message.error({
                content: "Data Get Failure!"
            })
        }
    }
    render() {
        const MonsterBarColor = '#108ee9';
        const TeamDamageBarColor = '#FF0000';
        let getMonsterEffect = (data: any) => {
            if (!data) {
                return null
            }
            return data.map((ef: any, index: number) => {
                if (ef.isVisible) {
                    return (
                        <Card.Grid key={index} style={{ padding: 5 }}>
                            <div>{ef.name}</div>
                            <Progress strokeColor="rgb(255, 157, 255)" percent={ef.buildup.fraction * 100} showInfo={false} />
                            <Progress strokeColor="#8fa7ff" percent={ef.duration.fraction * 100} showInfo={false} />
                        </Card.Grid>);
                }
                else {
                    return null;
                }
            });
        }

        let getMonsterCrown=(data:any)=>{
            if(data.crown==2){
                return (<Icon type="trophy" theme="twoTone" twoToneColor="darkgray" />)
            }
            else if(data.crown==3){
                return (<Icon type="trophy" theme="twoTone" twoToneColor="darkgoldenrod"/>)
            }
        }

        let getMonsters = () => {
            if (!this.state.apiData || !this.state.apiData.monsters) {
                return null;
            }
            var data = this.state.apiData.monsters as Array<any>;
            var preData = this.state.preApiData.monsters as Array<any>;
            var _temphp = 2;
            //var _tempIndex = 0;
            //获得当前正在讨伐的怪物
            if (preData?.length == data?.length &&
                preData.every((v: any, i: number) => data[i].name == v.name)) {
                var _t = 0;
                preData.forEach((item: any, index: number) => {
                    var _t2 = item.health.fraction - data[index].health.fraction;
                    if (_t2 > _t) {
                        _t = _t2;
                        this.activeMonsterIndex = index;
                    }
                });
            }
            else {
                data.forEach((m: any, index: number) => {
                    if (m.health.fraction < _temphp && m.health.fraction > 0) {
                        _temphp = m.health.fraction;
                        this.activeMonsterIndex = index;
                    }
                });
            }
            var monsterRender = data.map((m: any, index: number) => {
                let fontStyle: any = {
                    fontWeight: "bold"
                }
                if (index == this.activeMonsterIndex) {
                    fontStyle.fontSize = "20px";
                }
                return (
                    <Panel showArrow={false} key={String(index)} header={(
                        <>
                            <span style={fontStyle}>{m.name} ({m.health.current}/{m.health.max})  {getMonsterCrown(m)}</span>
                            <Progress
                                status="active"
                                strokeColor={index == this.activeMonsterIndex ? "#FF0000" : MonsterBarColor}
                                percent={m.health.fraction * 100}
                                format={percent => (<span style={{ color: m.health.fraction <= 0.3 ? "red" : m.health.fraction == 1 ? "green" : "black", fontWeight: "bold" }}>{Math.floor(m.health.fraction * 100)}%</span>)}
                            />
                        </>
                    )}>
                        <Row>
                            <Col span={24}>{getMonsterEffect(m.statusEffects)}</Col>
                            <Col span={24} style={{ height: 10 }}></Col>
                            {m.parts.map((p: any) => {
                                return (
                                    <Col key={m.address + p.name} span={6} style={{ textAlign: "center" }}>
                                        <div>{p.name}</div>
                                        <Progress
                                            type="circle"
                                            percent={p.health.fraction * 100}
                                            width={65}
                                            format={percent => (<span style={{ color: "black" }}>{Math.floor(p.health.fraction * 100)}%</span>)}
                                        />
                                    </Col>
                                );
                            })}
                        </Row>
                        <div style={{ height: "10px" }}></div>
                    </Panel>
                )
            });
            return (
                <Collapse accordion activeKey={String(this.activeMonsterIndex)}>
                    {monsterRender}
                </Collapse>
            )
        }

        let getTeam = () => {
            if (!this.state.apiData || !this.state.apiData.players) {
                return null;
            }
            var data = this.state.apiData.players;
            var _tempDamage = 0;
            var _tempIndex = 0;
            data.forEach((m: any, index: number) => {
                if (m.damage > _tempDamage) {
                    _tempDamage = m.damage;
                    _tempIndex = index;
                }
            });
            return data.map((p: any, index: number) => {
                return (
                    <div key={p.name} style={{ height: 60 }}>
                        <span style={{ fontWeight: "bold" }}>{p.name} {p.damage}</span>
                        {index == _tempIndex ? (<Icon style={{ color: "red", marginLeft: 10, fontSize: "18px" }} type="chrome" spin={true} />) : null}
                        <Progress
                            strokeColor={MonsterBarColor}
                            percent={p.barFraction * 100}
                            format={percent => (<span style={{ color: "black", fontWeight: "bold" }}>{p.barFraction * 100}%</span>)}
                        />
                    </div>
                )
            });
        }
        return (
            <Layout className="layout" style={{ height: "100vh" }}>
                <Content style={{ padding: '0px 10px', height: "100%" }}>
                    <div style={{ background: '#fff', padding: 10, minHeight: "100%" }}>
                        <div style={{ fontWeight: "bold", fontSize: "20px", position: "absolute", margin: "0px 10px" }}>React Hunter</div>
                        <Row>
                            <Col lg={12} style={{ padding: 10 }}>
                                <Divider orientation="right">Monster</Divider>
                                <div>
                                    {getMonsters()}
                                </div>
                            </Col>
                            <Col lg={12} style={{ padding: 10 }}>
                                <Divider orientation="right">Team Damage</Divider>
                                <div>
                                    {getTeam()}
                                </div>
                            </Col>
                        </Row>
                    </div>
                </Content>
            </Layout>
        );
    }
}