$(function() {
    getUserInfo()

    $('#btnLogout').on('click', function() {
        layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function(index) {
            //清空localStorage
            localStorage.removeItem('token')
                //跳转到登录页面
            location.href = '/login.html'

            layer.close(index);
        })
    })
})

function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function(res) {
                if (res.status !== 0) {
                    return layui.layer.msg('获取用户信息失败')
                }
                renderAvatar(res.data)
            }
            //     // 不论成功还是失败，最终都会调用 complete 回调函数
            //     complete: function(res) {
            //         // console.log('执行了 complete 回调：')
            //         // console.log(res)
            //         // 在 complete 回调函数中，可以使用 res.responseJSON 拿到服务器响应回来的数据
            //         if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            //             // 1. 强制清空 token
            //             localStorage.removeItem('token')
            //                 // 2. 强制跳转到登录页面
            //             location.href = '/login.html'
            //         }
            //     }
    })
}

function renderAvatar(user) {
    var fisrt = user.nickname || user.username
    $('.welcome1').html('欢迎&nbsp;&nbsp;' + fisrt)
    if (user.user_pic !== null) {
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.welcome').hide()
    } else {
        $('.layui-nav-img').hide()
        $('.welcome').html(fisrt[0].toUpperCase()).show()
    }
}