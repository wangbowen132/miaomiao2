import MessageBox from '@/components/JS/MessageBox'
import Vue from 'vue'

export var messageBox = (function (opts) {
  var defaults = {
    title:'',
    content:'',
    cancel:'',
    ok:'',
    handleCancel: null,
    handleOk: null//默认值
  };
  return function( opts ){ //配置参数
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
})
