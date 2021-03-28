import MessageBox from '@/components/JS/MessageBox'
import Vue from 'vue'
import axios from 'axios'

export var messageBox = (function (opts) {
  return function( opts ){ //配置参数
    var defaults = {
      title:'',
      content:'',
      cancel:'',
      ok:'',
      handleCancel: null,
      handleOk: null//默认值
    };
    for(var attr in opts) {
      defaults[attr] = opts[attr];
    }

    var MyComponent = Vue.extend(MessageBox);

    var vm = new MyComponent({
      el : document.createElement('div'), 
      data: {title : defaults.title, 
        content: defaults.content, 
        cancel: defaults.cancel,
        ok: defaults.ok
      },
      methods: { 
        handleCancel(){
          defaults.handleCancel && defaults .handleCancel.call(this);
          document.body.removeChild(vm.$el);
        },
        handleOk(){
          defaults.handleOk && defaults .handleOk.call(this);
          document.body.removeChild(vm.$el);
        }
      }
    });
    document.body.appendChild(vm.$el);
  }(opts);
});

export function verify(email, disabled){
  axios.get('/api2/users/verify?email=' + email).then((res) => {
    if(res.data.status === 0){
      disabled();
      messageBox({
        title: '验证码',
        content: '验证码发送成功',
        ok: '确定'
      });
    }else{
      messageBox({
        title: '验证码',
        content: '验证码发送失败',
        ok: '确定'
      });
    }
  });
}
