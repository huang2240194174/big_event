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
    // 通过 form.verify() 函数自定义校验规则
    var form = layui.form
    var layer = layui.layer
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
    //判断两次密码是否一致
        repwd: function(value) {
        var pwa = $('.navsbox [name=password]').val()
        if(pwa !== value) return '两次密码不一致'
    }
    
    })
    //监听submit的点击事件
    $("#form_login").on("submit",function(e) {
    e.preventDefault()
    //发起Ajax的POST请求
    var data = {
        username: $('#form_login [name=username]').val(),
        password: $('#form_login [name=password]').val()
      }
    $.post('/api/reguser',data,function(res) {
        console.log(res);
        if(res.status !==0) {
            return layer.msg(res.message)
        }
            layer.msg('注册成功,请登录! ')
            $("#link_login").click()
    })
    })

    //登录事件
    $("#form_reg").on("submit",function(e) {
        e.preventDefault()
        $.ajax({
            url: '/api/login',
            method: 'POST',
            // 快速获取表单中的数据
            data: $(this).serialize(),
            success: function(res) {
                if(res.status !==0) {
                    return layer.msg('登录失败! ')
                }
                layer.msg('登录成功! ')
                 // 将登录成功得到的 token 字符串，保存到 localStorage 中
                localStorage.setItem('token', res.token)
                // 跳转到后台主页
                location.href = '/index.html'
                }
        })
    })
})