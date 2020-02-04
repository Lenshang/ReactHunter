import React from 'react';
import { Layout, Menu, Breadcrumb, message, Progress, Divider, Icon, Row, Col, Collapse, Statistic, Card, Button } from 'antd';
import * as Api from './MainService';
import './Main.css'
const { Header, Content, Footer } = Layout;
const { Panel } = Collapse;
const ButtonGroup = Button.Group;
interface IProps {

}
interface IState {
    apiData: any;
    preApiData: any;
    zoomLevel: number;
}
interface IZoomStyle {
    defaultFontSize: number;
    activeMonsterFontSize: number;
    activeTeamIconSize: number;
    defaultProgressWidth: number;
    activeProgressWidth: number;
    teamHeight: number;
}
export default class Main extends React.Component<IProps, IState>{
    Interval: NodeJS.Timeout | undefined;
    activeMonsterIndex: number;
    zoomStyle: Array<IZoomStyle>;
    constructor(props: IProps) {
        super(props);
        this.state = {
            apiData: {},
            preApiData: {},
            zoomLevel: 1
        }
        this.activeMonsterIndex = 0;
        this.zoomStyle = [
            {
                defaultFontSize: 10,
                activeMonsterFontSize: 16,
                activeTeamIconSize: 14,
                defaultProgressWidth: 8,
                activeProgressWidth: 8,
                teamHeight: 50
            },
            {
                defaultFontSize: 14,
                activeMonsterFontSize: 20,
                activeTeamIconSize: 18,
                defaultProgressWidth: 10,
                activeProgressWidth: 10,
                teamHeight: 60
            },
            {
                defaultFontSize: 18,
                activeMonsterFontSize: 26,
                activeTeamIconSize: 22,
                defaultProgressWidth: 12,
                activeProgressWidth: 12,
                teamHeight: 70
            },
            {
                defaultFontSize: 22,
                activeMonsterFontSize: 30,
                activeTeamIconSize: 26,
                defaultProgressWidth: 16,
                activeProgressWidth: 16,
                teamHeight: 80
            },
            {
                defaultFontSize: 26,
                activeMonsterFontSize: 36,
                activeTeamIconSize: 30,
                defaultProgressWidth: 20,
                activeProgressWidth: 20,
                teamHeight: 90
            }
        ];
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

    getStyle = () => {
        return this.zoomStyle[this.state.zoomLevel];
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

        let getMonsterCrown = (data: any) => {
            if (data.crown == 2) {
                return (<Icon type="trophy" theme="twoTone" twoToneColor="darkgray" />)
            }
            else if (data.crown == 3) {
                return (<Icon type="trophy" theme="twoTone" twoToneColor="darkgoldenrod" />)
            }
            else if (data.crown == 1) {
                return (<Icon type="smile" theme="twoTone" twoToneColor="darkgoldenrod" />)
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
                    fontWeight: "bold",
                    fontSize: this.getStyle().defaultFontSize
                }
                if (index == this.activeMonsterIndex) {
                    fontStyle.fontSize = this.getStyle().activeMonsterFontSize;
                }
                return (
                    <Panel showArrow={false} key={String(index)} header={(
                        <div style={{ height: index == this.activeMonsterIndex ? this.getStyle().teamHeight - 20 : this.getStyle().teamHeight - 25 }}>
                            <div style={{ display: "flex" }}>
                                <span style={fontStyle}>{m.name} ({m.health.current}/{m.health.max})  {getMonsterCrown(m)}</span>
                                <div style={{ flexGrow: 1, textAlign: "right" }}>
                                    <span style={{ color: m.health.fraction <= 0.3 ? "red" : m.health.fraction == 1 ? "green" : "black", fontWeight: "bold", fontSize: this.getStyle().defaultFontSize }}>{Math.floor(m.health.fraction * 100)}%</span>
                                </div>

                            </div>
                            <Progress
                                strokeWidth={index == this.activeMonsterIndex ? this.getStyle().activeProgressWidth : this.getStyle().defaultProgressWidth}
                                status="active"
                                strokeColor={index == this.activeMonsterIndex ? "#FF0000" : MonsterBarColor}
                                percent={m.health.fraction * 100}
                                showInfo={false}
                            />
                        </div>
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
                if (p.name == "未知玩家") {
                    return null;
                }
                else {
                    return (
                        <div key={p.name} style={{ height: this.getStyle().teamHeight }}>
                            <div style={{ display: "flex" }}>
                                <div>
                                    <span style={{ fontWeight: "bold", fontSize: this.getStyle().defaultFontSize }}>{p.name} {p.damage}</span>
                                    {index == _tempIndex ? (<Icon style={{ color: "red", marginLeft: 10, fontSize: this.getStyle().activeTeamIconSize }} type="chrome" spin={true} />) : null}
                                </div>
                                <div style={{ flexGrow: 1, textAlign: "right" }}>
                                    <span style={{ color: "black", fontWeight: "bold", fontSize: this.getStyle().defaultFontSize }}>{p.barFraction * 100}%</span>
                                </div>
                            </div>
                            <Progress
                                strokeWidth={this.getStyle().defaultProgressWidth}
                                strokeColor={MonsterBarColor}
                                percent={p.barFraction * 100}
                                showInfo={false}
                            />
                        </div>
                    )
                }
            });
        }

        let defaultFont = {
            fontSize: 10
        }

        let onZoomChange = (isZoomIn: boolean) => {
            if (isZoomIn) {
                if (this.state.zoomLevel >= this.zoomStyle.length - 1) {
                    return;
                }
                this.setState({
                    zoomLevel: this.state.zoomLevel + 1
                })
            }
            else {
                if (this.state.zoomLevel <= 0) {
                    return;
                }
                this.setState({
                    zoomLevel: this.state.zoomLevel - 1
                })
            }
        }
        return (
            <Layout className="layout" style={{ height: "100vh" }}>
                <Content style={{ padding: '0px 10px', height: "100%" }}>
                    <div style={{ background: '#fff', padding: 10, minHeight: "100%" }}>
                        <div style={{ fontWeight: "bold", fontSize: "20px", position: "absolute", margin: "0px 10px" }}>
                            React Hunter
                            <ButtonGroup style={{ marginLeft: 20, zIndex: 9999 }}>
                                <Button type="primary" icon="zoom-in" onClick={e => { onZoomChange(true) }} />
                                <Button type="primary" icon="zoom-out" onClick={e => { onZoomChange(false) }} />
                            </ButtonGroup>
                        </div>
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