$(function() {
    initArticleCate()

    var layer = layui.layer
    var form = layui.form

    function initArticleCate() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function(res) {
                // console.log(res)
                var htnlStr = template('tpl-table', res)
                $('tbody').html(htnlStr)
            }
        })
    }
    var indexAdd = null
    $('#btnAdd').on('click', function() {
        indexAdd = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章类别',
            content: $('#dialog_add').html()
        })
    })


    $('body').on('submit', '#form_add', function(e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('新增文章分类失败！')
                }
                layer.msg('新增文章分类成功！')
                initArticleCate()
                layer.close(indexAdd)
            }
        })
    })

    var indexEdit = null
    $('tbody').on('click', '#btn-edit', function() {
        indexEdit = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '修改文章类别',
            content: $('#dialog_edit').html()
        })
        var id = $(this).attr('data-id')
            // console.log(id);
        $.ajax({
            method: 'GET',
            url: '/my/article/cates/' + id,
            success: function(res) {
                form.val('form_edit', res.data)
                    // console.log(res);
            }
        })
    })

    $('body').on('submit', '#form_edit', function(e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('更新分类信息失败！')
                }
                layer.msg('更新分类信息成功！')
                layer.close(indexEdit)
                initArticleCate()
            }
        })
    })
    $('tbody').on('click', '.btn-delete', function() {
        var id = $(this).attr('data-id')
            // console.log('ok');
        layer.confirm('确定删除文章分类？', { icon: 3, title: '提示' }, function(index) {
            $.ajax({
                method: 'GET',
                url: '/my/article/deletecate/' + id,
                success: function(res) {
                    // console.log(res);
                    if (res.status !== 0) {
                        return layer.msg('删除文章分类失败！')
                    }
                    layer.msg('删除文章分类成功！')
                    initArticleCate()
                    layer.close(index)
                }
            })


        })

    })
})