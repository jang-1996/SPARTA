function submit() {
    let title = $('#title').val();
    let text = $('#text').val();
    let type = $('#type').val();
    let username = $('#username').val();

    if (title == '') {
        alert('제목을 입력해주세요.')
        $('#title').focus()
        return;
    } else if (text == '') {
        alert('질문을 입력해주세요.')
        $('#text').focus()
        return;
    } else if (type == '분야를 정하세요') {
        alert('분야를 정하세요.')
        $('#type').focus()
        return;
    } else if (username == '') {
        alert('별명을 입력해주세요.')
        $('#username').focus()
        return;
    }

    $.ajax({
        type: "POST",
        url: "/posting",
        data: { title_give: title, text_give: text, type_give: type, username_give: username },
        success: function (response) {
            if (response['result'] == 'success') {
                alert(response['msg']);
                $('#title').val('');
                $('#text').val('');
                $('#type').val('분야를 정하세요');
                $('#username').val('');

                window.location.reload();
            }
        }
    })
}


$(document).ready(function () {
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
    })
}

function make_card(title, summernote, type, username) {
    let temp_html =
        '<a href="xxx"><div>\
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
});