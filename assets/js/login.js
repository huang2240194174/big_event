$(function() {
    //去注册的点击事件
    $("#link_reg").on("click",function() {
        $(".navbox").hide();
        $(".navsbox").show();
    })

    //去登录的点击事件
    $("#link_login").on("click",function() {
        $(".navsbox").hide();
        $(".navbox").show();
    })
})
// 通过 form.verify() 函数自定义校验规则
var form = layui.form
form.verify({
    pwe: [/^[\s]{6,12}$/,'密码必须6-12位,且不能有空格'],
    //判断两次密码是否一致
    repwd: function(value) {
        var pwa = $('.navsbox [name=password]').val()
        if(pwa !== value) return '两次密码不一致'
    }
    
})

//监听submit的点击事件
$("#form_login").on("submit",function(e) {
    e.preventDefault()
    
})