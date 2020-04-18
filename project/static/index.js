function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }


function submit() {
    let title = $('#title').val();
    //let text = $('.note-editing-area').val();
    let type = $('#type').val();
    let username = $('#username').val();
    let text = $('#summernote').summernote('code');
    let filesList = $('#files')[0].files;
    let encodedFileList = []
    // for (let i=0; i<filesList.length; i++){
    //     encodedFileList.push(getBase64(filesList[i]));
    // }
    

    if (title == '') {
        alert('제목을 입력해주세요.')
        $('#title').focus()
        return;
    } else if (text == '') {
        alert('질문을 입력해주세요.')
        $('.summernote').summernote('focus')
        //$('.note-editing-area').focus()
        return;
    } else if (type == '분야를 정하세요') {
        alert('분야를 정하세요.')
        $('#type').focus()
        return;
    } else if (username == '') {
        alert('이름을 입력해주세요.')
        $('#username').focus()
        return;
    }

    getBase64(filesList[0]).then(
        data => {
            console.log(data)

            $.ajax({
                type: "POST",
                url: "/posting",
                data: { title_give: title, text_give: text, type_give: type, username_give: username,
                        file_give: data },
                success: function (response) {
                    if (response['result'] == 'success') {
                        alert(response['msg']);
                        $('#title').val('');
                        $('#summernote').summernote('reset');
                        //$('.note-editing-area').val('');
                        $('#type').val('분야를 정하세요');
                        $('#username').val('');
        
                        //window.location.reload();
                    }
                }
            })
            
        }
    );
    

    
}


$(document).ready(function () {
    $('#summernote').summernote({
        placeholder: 'Hello stand alone ui',
        tabsize: 2,
        height: 120,
        toolbar: [
            ['style', ['style']],
            ['font', ['bold', 'underline', 'clear']],
            ['color', ['color']],
            ['para', ['ul', 'ol', 'paragraph']],
            ['table', ['table']],
            ['insert', ['link', 'picture', 'video']],
            ['view', ['fullscreen', 'codeview', 'help']]
        ]
    });
    $('#posting_box').html('');
    listing();
});

function listing() {
    $.ajax({
        type: "GET",
        url: "/posting",
        data: {},
        success: function (response) {
            if (response['result'] == 'success') {
                let posting = response['posting'];
                for (let i = 0; i < posting.length; i++) {
                    make_card(posting[i]['title'], posting[i]['text'], posting[i]['type'], posting[i]['username']);
                }
            } else {
                alert('질문을 받아오지 못했습니다');
            }
        }
    });
}

var formData = new FormData($("#form")[0]);
var formData = new FormData();
formData.append("title", $("#title").val());
formData.append("content", $("#content").val());
formData.append("file", $("#file")[0].files[0]);
console.log(formData)

$.ajax({
    type: 'POST', url: '/board/save', processData: false,
    contentType: false,
    data: formData, success: function (data) { }
});







function make_card(title, text, type, username) {
    let temp_html =
        '<a href="/question_answer"><div>\
            <div class="card">\
            <div class="card-body">\
                <h5 class="card-title">'+ title + '</h5>\
                <h6 class="card-subtitle mb-2 text-muted">'+ type + ',' + username + '</h6>\
                <p class="card-text">'+ text + '</p>\
                <a href="#" class="card-link">수정</a>\
            </div>\
            </div>\
         </div></a>\
         '
    $('#posting_box').append(temp_html);
}

