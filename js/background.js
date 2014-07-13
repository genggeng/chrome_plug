// chrome.contextMenus.create({
//     'type':'normal',
//     'title':'设置为标题',
//     'contexts':['selection'],
//     'id':'tit',
//     'onclick':setTitle
// });

// chrome.contextMenus.create({
//     'type':'normal',
//     'title':'设置为内容',
//     'contexts':['selection'],
//     'id':'content',
//     'onclick':setContent
// });

// var title,content;
// function setTitle(info, tab){
//     chrome.runtime.onMessage.addListener(function(message, sender, sendResponse){
//         title = message.msg;
//         chrome.contextMenus.update('tit',{
//             'title':'设置标题为“'+message.msg+'”'
//         });
//     });

//     alert(title);
// };
// function setContent(info, tab){
//     chrome.runtime.onMessage.addListener(function(message, sender, sendResponse){
//         content = message.msg;
//         chrome.contextMenus.update('content',{
//             'title':'设置内容为“'+message.msg+'”'
//         });
//     });
//     alert(content);
// }

var title,content;

chrome.contextMenus.create({
    'type':'normal',
    'title':'设置标题',
    'contexts':['selection'],
    'id':'tit',
    'onclick':translate
});

chrome.contextMenus.create({
    'type':'normal',
    'title':'设置内容',
    'contexts':['selection'],
    'id':'content',
    'onclick':setContent
});

chrome.contextMenus.create({
    'type':'normal',
    'title':'提交',
    'contexts':['selection'],
    'id':'submit',
    'onclick':toSubmit
});

function translate(info, tab){
    //var url = 'http://translate.google.com.hk/#auto/zh-CN/'+info.selectionText ;
   // window.open(url, '_blank');
    title = info.selectionText;
    console.log(title);

    chrome.contextMenus.update('tit',{
        'title':'标题已设置'
    });
}

function setContent(info, tab){
    content = info.selectionText;
    console.log(content);
    chrome.contextMenus.update('content',{
        'title':'内容已设置'
    });
}

function toSubmit(){
    //还原title，重新添加内容
    chrome.contextMenus.update('tit',{
        'title':'设置标题'
    });

    chrome.contextMenus.update('content',{
        'title':'设置内容'
    });

    $.ajax({
        url: 'http://localhost/yizhan/admin.php/Article/add',
        cache: false,
        type: 'POST',
        data: {cateId : 2,title : 2,is_original : 2,summary : 2,content : 2,expense_credit : 2,add_date : '2012-10-20 15:34:28',click_count : 2,ifShow : 1},
        dataType: 'json',
        timeout: 1000,
        success: function(data){
            console.log('sdsd');
        }
    }).done(function(msg) {
        console.log(msg);
    }).fail(function(jqXHR, textStatus) {
        console.log(textStatus);
    });





}


// chrome.runtime.onMessage.addListener(function(message, sender, sendResponse){
//     chrome.contextMenus.update('cn',{
//         'title':'使用Google翻译“'+message+'”'
//     });
// });





