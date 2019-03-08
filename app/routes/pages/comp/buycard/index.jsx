import React from 'react';
import {connect} from 'react-redux';
import actions from 'fengui/redux/actions'
import {browserHistory} from 'react-router'
import styles from './index.scss'
import testdata from '../../testdata/data'
import imgdemo from 'img/comp/imgdemo.png'
import upicon from 'img/icon/up.png'
import downicon from 'img/icon/down.png'

import { Pagination } from 'antd';

let Component = React.createClass({
    getInitialState(){
        return{
           card1:0,
           card2:0,
           card3:0,
           sel:0,
           cardkey:0

        }
      },
    componentDidMount() {
      
    },
    changecard(key,bol){
        switch(bol){
            case 1:
            this.setState({
                card1:key
            });
            break;
            case 2:
            this.setState({
                card2:key
            });
            break;
            case 3:
            this.setState({
                card3:key
            });
            break;
        }
       
    },
    changepaixu(key){
        this.setState({
            sel:key
        })
    },
    showactcard(id){
        this.setState({
            cardkey:id
        })
    },
    onChange(pageNumber){
        console.log(58888,pageNumber)
    },
    render() {
        let{params}=this.props;
        let{card1,card2,card3,sel,cardkey}=this.state;
        return (
            <div className={styles.buycardpage}>

                  <div className={styles.buy_cards_search}>
                  <div className={styles.row}>
                        <a>筛选</a>
                        <div className={styles.typelist}>
                        {card1!=0&&<div className={styles.selitem}><p>种类:{testdata.card.data[card1].name}</p><i onClick={()=>this.changecard(0,1)}>x</i></div>}
                        {card2!=0&&<div className={styles.selitem}><p>品类:{testdata.pl.data[card2].name}</p><i onClick={()=>this.changecard(0,2)}>x</i></div>}
                        {card3!=0&&<div className={styles.selitem}><p>价格:{testdata.jg.data[card3].name}</p><i onClick={()=>this.changecard(0,3)}>x</i></div>}
                        </div>
                    </div>
                    <div className={styles.row}>
                        <a>种类</a>
                        <div className={styles.typelist}>
                            {
                                testdata.card.data.map((val,key)=>{
                                    return(
                                        <span className={card1==key?styles.act:styles.noact} key={key} onClick={()=>this.changecard(key,1)} >{val.name}</span>
                                    )
                                })
                            }
                            
                            
                        </div>
                    </div>
                    <div className={styles.row}>
                        <a>品类</a>
                        <div className={styles.typelist}>
                            {
                                testdata.pl.data.map((val,key)=>{
                                    return(
                                        <span className={card2==key?styles.act:styles.noact} key={key} onClick={()=>this.changecard(key,2)} >{val.name}</span>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className={styles.row}>
                        <a>价格</a>
                        <div className={styles.typelist}>
                            {
                                testdata.jg.data.map((val,key)=>{
                                    return(
                                        <span className={card3==key?styles.act:styles.noact} key={key} onClick={()=>this.changecard(key,3)} >{val.name}</span>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className={styles.row}>
                        <a>区域</a>
                        <div className={styles.typelist}>
                            <span className={styles.act}>全国</span>
                            
                        </div>
                    </div>
                  </div>

                   <div  className={styles.cate}>
                        <div className={styles.cateraw}>
                            <p className={sel==1?styles.act:styles.oderby} onClick={()=>this.changepaixu(1)} >价格<img src={upicon} /></p>
                            <p className={sel==2?styles.act:styles.oderby} onClick={()=>this.changepaixu(2)} >上架时间<img  src={upicon} /></p>
                        </div>
                    </div>

                    <div className={styles.itembox}>
                        {
                            testdata.carditem.data.list.map((valC,keyC)=>{
                                return(
                                    <div className={`${styles.card} ${cardkey==valC.goodsId?styles.cardact:styles.noact}`}
                                    key={keyC}
                                    onMouseEnter={()=>this.showactcard(valC.goodsId)} 
                                    onMouseLeave={()=>this.showactcard(0)}
                                    >
                                        <img src={imgdemo} />
                                        <p className={styles.txt}>{valC.goodsName}</p>
                                        <p className={styles.price}>￥{(valC.outPrice/100).toFixed(2)}</p>
                                        {cardkey==valC.goodsId&&<p className={styles.enjoygwc}>加入购物车</p>}
                                    </div>
                                )
                            })
                        }
                        <p style={{marginTop:'50px',float:'left',width: '100%'}}></p>
                        <Pagination 
                        showQuickJumper
                        // size='small'
                        defaultCurrent={1}//默认当前为第一页
                        total={500} //总条数
                        pageSize={10} //一页条数
                        onChange={(page)=>this.onChange(page)} />,
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
