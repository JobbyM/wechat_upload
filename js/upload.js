/*
* constructor
*/
function Upload (opt) {

  this.$fileToUpload = opt.fileToUpload || null;
  this.$thumb = opt.thumb || null;
  this.$progress = opt.progress || null;
  this.url = opt.url || null;

}

/*
* 选择图片，获取图片大小，也可以在这里获取图片格式，限制用户上传非要求格式的
* 图片
*/
Upload.prototype.fileSelected = function () {
  var files = this.$fileToUpload.files;
  var count = files.length;
  for (var index = 0; index < count; index++) {
    var file = files[index];
    var fileSize = 0;
    if (file.size > 1024 * 1024) {
      fileSize = (Math.round(file.size * 100 / (1024 * 1024)) / 100).toString() +
        'MB';
    } else {
      fileSize = (Math.round(file.size * 100 / 1024) / 100).toString() + 'KB';
    }
  }

  this.uploadFile();
};

/*
* 异步上传图片
*/
Upload.prototype.uploadFile = function () {
  // 创建表单数据
  var fd = new FormData();
  var files = this.$fileToUpload.files;
  var count = files.length;
  for (var index = 0; index < count; index++) {
    var file = files[index];
    // 将文件添加到表单数据
    fd.append('file', file);
    // 上传前预览图片，也可以通过其他方式预览
    this.previewImage(file);
  }

  var xhr = new XMLHttpRequest();
  xhr.upload.addEventListener("progress", this.uploadProgress ,false);

  xhr.addEventListener('load', this.uploadComplete, false);
  xhr.addEventListener('error', this.uploadFailed, false);

  xhr.open('POST', this.url);
  xhr.send(fd);
};

/*
* 图片预览
*/
Upload.prototype.previewImage = function (file) {
  var gallery = this.$thumb;
  var img = document.createElement('img');
  img.file = file;
  this.$thumb.appendChild(img);

  // 使用FileReader 方法显示图片内容
  var reader = new FileReader();
  reader.onload = (function(aImg) {
    return function(e) {
      aImg.src = e.target.result;
    }
  })(img);

  reader.readAsDataURL(file);
};


/*
* 图片上传进度
*/
Upload.prototype.uploadProgress = function (evt) {
  if (evt.lengthComputable) {
    var percentComplete = Math.round(evt.loaded * 100 / evt.total);
    // $progress.style.width = percentComplete.toString() + '%';
  }
};

/*
* 图片上传完成
*/
Upload.prototype.uploadComplete = function (evt) {
  alert(evt.target.responseText)
};
