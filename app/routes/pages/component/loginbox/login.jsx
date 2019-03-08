import React from 'react';
import {connect} from 'react-redux';
import actions from '../../fengui/redux/actions'
import {browserHistory} from 'react-router'
import styles from './login.scss'
import closeImg from '../../../../img/icon/close.png'
import {isPoneAvailable} from '../../method/comFunction.js'
import { message ,Icon } from 'antd';
let Component = React.createClass({
    getInitialState(){
        return{
          mobile:'',
          showErrorTxt:false,
          codetxt:'发送验证码',
          code:'',
          login:false
        }
      },
    componentDidMount() {
        
    },
   
    VerificationCode(){//发送验证码
       
        if (this.state.codetxt != '发送验证码') {
            return
          }
          if (!isPoneAvailable(this.state.mobile)) {//验证手机号
            this.setState({
                showErrorTxt: true
                })
            return
          }
         
        var timer;
        var i = 60;
        this.setState({
        codetxt: i + 's'
        })
        timer = setInterval(() => {
        if (i == 0) {
            clearInterval(timer)
            this.setState({
            codetxt: '发送验证码'
            })
        } else {
            this.setState({
            codetxt: (i - 1) + 's'
            })
            i--;
        }
        }, 1000)

    },
    handelChange(event){//手机号双向绑定
        //  console.log(event.value)
        this.setState({mobile:event.value})
    },
    handelChangecode(event){//验证码双向绑定
        this.setState({code:event.value})
    },
    VerificationMobile(bool){//验证手机号
      let bol =  bool?bool:isPoneAvailable(this.state.mobile);
    //   console.log(888,bol)
        this.setState({
            showErrorTxt:!bol
        })
    },
    login(){//登录
        if(this.state.login){return}
        if(!this.state.mobile){message.warning('手机号不能为空'); return}
        if (this.state.showErrorTxt) { return };
        if(!this.state.code||this.state.code.length!=6){
            message.warning('验证码错误');
            return
        }
        this.setState({
            login:true
        })
        this.props.loginto(this.state.mobile,this.state.code);
    },
    render() {
        let{mobile,showErrorTxt,codetxt,code,login}=this.state;
        let{params,closeloginbox}=this.props;
       
        return (
            <div className={styles.loginboxpage}>
                   <div className={styles.loginBg}>
                        <h2>用户登录</h2>
                        <a className={styles.closeImg} onClick={()=>closeloginbox()}>
                            <img src={closeImg} />
                        </a>
                        <input type='number' placeholder='手机号'
                            value={mobile} 
                            onChange={(e)=>this.handelChange(e.target)} 
                            onBlur={()=>this.VerificationMobile()} 
                            onFocus={()=>this.VerificationMobile(true)} 
                            className={styles.mobile} />
                        {showErrorTxt&&<span className={styles.mobileinfo}>请输入正确的手机号</span>}
                        <input type='number' placeholder='手机验证码' value={code}  onChange={(e)=>this.handelChangecode(e.target)} className={styles.mobile} style={{top:'190px'}} />
                        <div className={styles.code} onClick={()=>this.VerificationCode()}>{codetxt}</div>

                        <div className={styles.loginbtn} onClick={()=>this.login()}>{login&&<Icon type="loading" style={{marginRight:'10px'}} />}{login?'登录中...':'登录'}</div>
                        

                        <div className={styles.logintxt}>无需注册,输入手机号,立即登录!</div>
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
        loginto:(mobile,code)=>{
            console.log(mobile,code);
             dispatch(actions.setVars('showloginbox',false))
        },
        closeloginbox:()=>{
            dispatch(actions.setVars('showloginbox',false))
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Component);
