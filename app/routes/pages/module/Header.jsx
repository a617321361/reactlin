import React from 'react'
import {connect} from 'react-redux'
import styles from './Header.scss'
import actions from '../fengui/redux/actions'
import { browserHistory } from 'react-router'
import {getweather} from '../api/ajax'
import logo from '../../../img/comp/common_logo.png'

const navlist=['首页','购卡'];
let Header = React.createClass({

  getInitialState(){
    return{
      act:0
    }
  },
  
  componentDidMount () {
       
  },
  changenav(key){
    this.setState({
      act:key
    })
  },

  render() {
   
    let{act}=this.state;
    
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
                  <li className={act==key?styles.act:styles.noact} onClick={()=>this.changenav(key)} key={key}>{val}</li>
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
