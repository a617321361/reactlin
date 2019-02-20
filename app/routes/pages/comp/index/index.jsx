import React from 'react';
import {connect} from 'react-redux';
import actions from '../../fengui/redux/actions'
import {browserHistory} from 'react-router'
import styles from './index.scss'
import banner from '../../../../img/comp/banner.png'
import banner2 from '../../../../img/comp/banner2.png'

import bannericon from '../../../../img/icon/bannericon.png'
import bannericon2 from '../../../../img/icon/bannericon2.png'

import testdata from '../../testdata/data'



const imgurl=[
    {
        url:banner,
        color:'rgb(255, 210, 26)',
       
    },{
        url:banner2,
        color:'rgb(41, 173, 255)',
        
    }
    
];
var timer;
let Component = React.createClass({
    getInitialState(){
        return{
            imgkey:0,
            cardkey:0
        }
      },
    componentWillMount(){

    },
    componentDidMount() {
        
     
        let that=this;
        timer=setInterval(()=>{
            let len=imgurl.length-this.state.imgkey-1;
            that.setState({
                imgkey:len
            })
        },3000)
    },
    changebanner(key){
        if(key!=this.state.imgkey){
            this.setState({
                imgkey:key
            })
        }
    },

    showactcard(id){
        this.setState({
            cardkey:id
        })
    },

    render() {
      
        let{imgkey,cardkey}=this.state;
       
        return (
            <div className={styles.indexpage}>
                   <div className={styles.bannerbox} style={{background:imgurl[imgkey].color}}>
                        <div className={styles.banner}>
                           <img src={imgurl[imgkey].url} />
                            
                            <div className={styles.bannerselectbar}>
                            {
                                imgurl.map((val,key)=>{
                                    return(
                                        <img className={imgkey==key?styles.act:styles.noact} 
                                        src={imgkey==key?bannericon:bannericon2}
                                        onMouseEnter={()=>this.changebanner(key)}
                                         key={key} />
                                    )
                                })
                            }
                            </div>
                            
                        </div>
                   </div>

                   <div className={styles.carlist}>
                        <ul>
                            {
                                testdata.carlist.data.map((val,key)=>{
                                    return(
                                        <li key={key}>
                                            <div className={styles.liitem}>
                                                <p className={styles.floor}>{key+1}F</p>
                                                <p className={styles.title}>{val.classifi}</p>
                                                <p className={styles.line}></p>
                                            </div>
                                            <div className={styles.caritem}>
                                            {
                                                val.goods.map((valC,keyC)=>{
                                                    return(
                                                        <div className={`${styles.card} ${cardkey==valC.goodsId?styles.cardact:styles.noact}`}
                                                        key={keyC}
                                                        onMouseEnter={()=>this.showactcard(valC.goodsId)} 
                                                        onMouseLeave={()=>this.showactcard(0)}
                                                        >
                                                            <img src={'http://img.gxcards.com/'+valC.fistPicUrl} />
                                                            <p className={styles.txt}>{valC.goodsName}</p>
                                                            <p className={styles.price}>￥{(valC.outPrice/100).toFixed(2)}</p>
                                                            {cardkey==valC.goodsId&&<p className={styles.enjoygwc}>加入购物车</p>}
                                                        </div>
                                                    )
                                                })
                                            }
                                                
                                            </div>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                   </div>
                   <div className={styles.footerBox}></div>
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
