$(function() {
    //调用getUserInfo获取用户的基本信息
    getUserInfo();

    var layer = layui.layer
    $('#btnLogout').on('click',function() {
        //提示用户是否确认退出
        layer.confirm('确定退出登录?', {icon: 3, title:'提示'}, function(index){
            //do something
            //清空本地存储中的token
            localStorage.removeItem('token')
            //重新跳转到登录页
            location.href = '/login.html'
            //关闭询问框
            layer.close(index);
          });
    })
})

//获取用户基本信息
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url:'/my/userinfo',
        //headers就是请求头的配置对象
        // headers: {
        //     Authorization: localStorage.getItem('token')||''
        // },
        success: function(res) {
            // console.log(res);
            if(res.status !==0) {
                return layui.layer.msg('获取用户信息失败! ')
            }
            //调用renderAvatar来渲染用户头像
            renderAvatar(res.data);
        }
    })
}

function renderAvatar(user) {
    //获取用户的姓名
    var name = user.nickname || user.username
    $('#welcome').html('欢迎&nbsp;&nbsp' + name)
    //渲染用户头像
    if(user.user_pir !== null) {
        $('.layui-nav-img').attr('src', user.user_pir).show()
        $('.text-avatar').hide()
    }else {
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }
}