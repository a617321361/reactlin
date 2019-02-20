import React from 'react'
import {connect} from 'react-redux'
import styles from './Header.scss'
import actions from '../fengui/redux/actions'
import { browserHistory } from 'react-router'
import {getweather} from '../api/ajax'
import logo from '../../../img/comp/common_logo.png'

const navlist=[
  {
    name:'首页',
    url:'index'
  },{
    name:'购卡',
    url:'buycard'
  }
  
];
let Header = React.createClass({

  getInitialState(){
    return{
      
    }
  },
  
  componentDidMount () {
       
  },
  changenav(url){
    browserHistory.push('/home/main/'+url)
  },

  render() {
   let{params}=this.props;
   
  
    return (
      <div className={styles.Headerbox}>

        <div className={styles.navHeader}>
          <div className={styles.header}>
            <p>Hi~ 欢迎来到公象网！</p>
            <div className={styles.rightinfo}>
              <a>登录</a>
              <a>注册</a>
            </div>
          </div>   
        </div>

        <div className={styles.search_div}>
          <img src={logo} />
           <input type='text' placeholder='请输入关键词' />
           <button>搜索</button>
           <div className={styles.gwc} >
                <a>购物车</a>
                <div className={styles.gwcbtn}>0</div>
            </div>
        </div>
        <div className={styles.banner_nav}>
          <ul>
            {
              navlist.map((val,key)=>{
                return(
                  <li className={params.page==val.url?styles.act:styles.noact} onClick={()=>this.changenav(val.url)} key={key}>{val.name}</li>
                )
              })
            }
          </ul>
        </div>
      </div>
    );
  }
})

const mapStateToProps = (state) => {
  return {
   
    
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    
  
   
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
