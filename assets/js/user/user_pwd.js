$(function() {

    var form = layui.form

    form.verify({
        Pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        samePwd: function(value) {
            if (value === $('[name=oldpwd]').val()) {
                return '与旧密码相同，请重新输入！'
            }
        },
        rePwd: function(value) {
            if (value !== $('[name=newpwd]').val()) {
                return '两次输入的密码不相同，请重新输入！'
            }
        }
    })

    $('.layui-form').on('submit', function(e) {
        e.preventDefault()
        console.log('ok');
        $.post('/my/updatepwd', $(this).serialize(), function(res) {
                console.log(res);
            })
            // $.ajax({
            //     method: 'POST',
            //     url: '/my/updatepwd',
            //     data: $(this).serialize(),
            //     success: function(res) {
            //         if (res.status !== 0) {
            //             return layui.layer.msg('更新密码失败！')
            //         }
            //         layui.layer.msg('更新密码成功！')
            //             // 重置表单
            //         $('.layui-form')[0].reset()
            //     }
            // })
    })

})