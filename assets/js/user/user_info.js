$(function() {
    var form = layui.form
    var layer = layui.layer
    form.verify({
        nickname: function(value) {
            if (value > 6) {
                return '昵称的长度必须在1~6之间'
            }
        }
    })
    initUserInfo()

    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('获取基本信息失败！')
                }
                // console.log(res)
                form.val('formUserInfo', res.data)
            }
        })
    }
    $('#btnReset').on('click', function(e) {
        e.preventDefault()
        initUserInfo()
    })

    $('.layui-form').on('submit', function(e) {
        //操作表单都要阻止表单的默认提交行为
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('更新信息失败！')
                }
                layer.msg('更新信息成功！')
                window.parent.getUserInfo()
            }
        })
    })
})