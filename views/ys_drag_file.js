//判断是点击上传 还是拖拽上传
var flag = 0;
//拖拽div
var file_container = 'ys_drag_file_container';
//上传div
var file_display = 'ys_drag_file_display'
//定义上传成功的回调函数
var uploadCallback = function (result) {
    alert(result);
}
// 判断是否图片
    function checkType(type) {
        switch (type) {
        case 'image/jpeg':
        case 'image/png':
        case 'image/gif':
        case 'image/bmp':
        case 'image/jpg':
            return true;
        default:
            return true;
        }
    }

    function handleFileSelect(evt) {
        evt.stopPropagation();
        evt.preventDefault();
        var files;
        if (flag == 1)
            files = evt.dataTransfer.files;
        else
            files = evt.target.files;

        for (var i = 0, f; f = files[i]; i++) {

            var t = f.type ? f.type : 'n/a',
                reader = new FileReader(),
                looks = function (f, img) {
                    list.innerHTML += '<li><strong>' + f.name + '</strong> (' + t +
                        ') - ' + f.size + ' bytes<p>' + img + '</p></li>';
                    cnt.innerHTML = img;
                },
                isImg = checkType(t),
                img;
            if (isImg) {
                reader.readAsDataURL(f);
                reader.onload = (function (theFile) {
                    return function (e) {
                        img = '<img class="preview" src="' + e.target.result + '" title="' + theFile.name + '"/>';
                        $.post("/upload", {
                            type: theFile.type,
                            size: theFile.fileSize,
                            name: theFile.fileName,
                            file: this.result
                        }, function (result) {
                            alert(result);
                        });
                        looks(theFile, img);
                    };
                })(f)
            } else {
                img = '"o((>ω< ))o"，你传进来的不是图片！！';
                looks(f, img);
            }
        }
    }

    // 处理插入拖出效果
    function handleDragEnter(evt) {
        flag = 1;
        this.setAttribute('style', 'border-style:dashed;');
    }

    function handleDragLeave(evt) {
        this.setAttribute('style', '');
    }

    // 处理文件拖入事件，防止浏览器默认事件带来的重定向
    function handleDragOver(evt) {
        evt.stopPropagation();
        evt.preventDefault();
    }

if (window.FileReader) {
    var cnt = document.getElementsByClassName(file_container)[0],
        list = document.getElementsByClassName(file_display)[0];
    cnt.addEventListener('dragenter', handleDragEnter, false);
    cnt.addEventListener('dragover', handleDragOver, false);
    cnt.addEventListener('drop', handleFileSelect, false);
    cnt.addEventListener('dragleave', handleDragLeave, false);
    document.getElementById('filess').addEventListener('change', handleFileSelect, false);
} else {
    document.getElementById(file_display).innerHTML = '你的浏览器不支持啊，同学';
}