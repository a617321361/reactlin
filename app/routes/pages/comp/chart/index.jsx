import React from 'react';
import {connect} from 'react-redux';
import actions from '../../fengui/redux/actions'
import {browserHistory} from 'react-router'
import styles from './index.scss'
import chartdata from './chart'
let Component = React.createClass({
    getInitialState(){
        return{
            list:[1,1,1,1,1,1,1,1,1,1,1,1]
        }
      },
    componentWillMount(){

    },
    componentDidMount() {
        //初始化
        var myChart = echarts.init(document.getElementById('ddbox'));
        myChart.setOption(chartdata.ddoption);
        //投资
        var myChart1 = echarts.init(document.getElementById('tzbox'));
        myChart1.setOption(chartdata.tzoption);
        //安全
        var myChart2 = echarts.init(document.getElementById('charts1'));
        myChart2.setOption(chartdata.leftoption);
    },

    render() {
        let{params}=this.props;
        let{list}=this.state;
       
        return (
            <div className={styles.page}>
                   <div className={styles.leftbox}>
                        <div className={styles.gzjbox}></div>
                        <div className={styles.chartbox} id="ddbox" ></div>
                        <div className={styles.chartbox}>
                          <h2>关键工期</h2>
                          <div className={styles.list}>
                            {
                                list.map((val,key)=>{
                                    return(
                                        <div key={key} className={styles.listitem}>
                                            <span>电器安装完工</span>
                                            <a>2019年09月30日</a>
                                        </div>
                                    )
                                })
                            }
                          </div>
                        </div>
                   </div>
                   <div className={styles.rightbox}>
                        <div className={styles.item}>
                            <a className={styles.title}>投资</a>
                            <div className={styles.columchar} id="tzbox"></div>
                            <div className={styles.bar}>
                                <p>年度累计投资(万元)</p>
                                <div>
                                    <span>17505</span>
                                    <a>11605</a>
                                </div>
                                <p>开工累计投资(万元)</p>
                                <div>
                                    <span>23000</span>
                                    <a>18000</a>
                                </div>
                            </div>
                        </div>
                        <div className={styles.item}>
                        <a className={styles.title}>安全</a>
                        <div className={styles.charts} id="charts1"></div>
                        <div className={styles.charts} id="charts2"></div>
                        <div className={styles.charts} id="charts3"></div>
                        </div>
                        <div className={styles.item}>333</div>
                   </div>
            </div>
        );
    }
});


const mapStateToProps = (state) => {
    return {
      
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
       
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
