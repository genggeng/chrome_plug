chrome.contextMenus.create({
    'type':'normal',
    'title':'设置标题',
    'contexts':['selection'],
    'id':'tit',
    'onclick':setTitle
});

chrome.contextMenus.create({
    'type':'normal',
    'title':'设置简介',
    'contexts':['selection'],
    'id':'summary',
    'onclick':setSummary
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

var title,summary,content;

function setTitle(info, tab){
    title = info.selectionText;
    console.log(title);
    chrome.contextMenus.update('tit',{
        'title':'标题已设置'
    });
}

function setSummary(info, tab){
    summary = info.selectionText;
    chrome.contextMenus.update('summary',{
        'title':'简介已设置'
    });
}

function setContent(info, tab){
    content = info.selectionText;
    chrome.contextMenus.update('content',{
        'title':'内容已设置'
    });
}

function toSubmit(){
    //还原title，重新添加内容
    chrome.contextMenus.update('tit',{
        'title':'设置标题'
    });

    chrome.contextMenus.update('summary',{
        'title':'设置简介'
    });

    chrome.contextMenus.update('content',{
        'title':'设置内容'
    });

    if(!title || !summary || !content){
        console.log("缺必选项！");
    }else{
        $.ajax({
            url: 'http://www.lihuazhai.com/yizhan/Public/chorme_plug/insert.php',
            type: 'POST',
            data: {cateId : 2,title : title,summary : summary,content : content,ifShow : 1},
            timeout: 30000
        }).done(function(msg) {
            console.log(msg);
        }).fail(function(jqXHR, textStatus) {
            console.log(textStatus);
        });
    }
}






