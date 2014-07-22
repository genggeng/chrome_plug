var debug = (function(){
    //开启调试功能,可以在上线时关闭
    DEBUG = true;
    /* An empty debug function */
    var _emptyFunc = function(msg) { return false; };
    var _debugFunc = function(msg) { console.log('[DEBUG] ' + msg); };
    var debug = _emptyFunc;

    // if DEBUG is true and Firebug console is available, use it for logging
    if (window.DEBUG && typeof(console) !== 'undefined') {
        return _debugFunc;
    }else{
        return _emptyFunc;
    }
})();

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

var title,summary,content;

function setTitle(info, tab){
    title = info.selectionText;
    chrome.contextMenus.update('tit',{
        'title':'标题已设置'
    });
    showSubmit();
}
function setSummary(info, tab){
    summary = info.selectionText;
    chrome.contextMenus.update('summary',{
        'title':'简介已设置'
    });
    showSubmit();
}
function setContent(info, tab){
    console.log("请使用Shift + c复制HTML内容");
}


/*
 * Message passing between content script and backgroud page
 */
chrome.extension.onMessage.addListener(
    function(request) {
      switch (request.command) {
        case 'copy':
            //console.log(request.data);
            content = request.data;
            chrome.contextMenus.update('content',{
                'title':'内容已设置'
            });
            showSubmit();
            break;
        default:
            break;
        }
    }
);

var showSubmit = function(){
    if(title && summary && content){
        chrome.contextMenus.create({
            'type':'normal',
            'title':'提交',
            'contexts':['page'],
            'id':'submit',
            'onclick':toSubmit
         });
    }
}

var resetData = function(){
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
    var title = undefined,summary = undefined,content= undefined;
}

function toSubmit(){
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
            resetData();
        }).fail(function(jqXHR, textStatus) {
            console.log(textStatus);
        });
    }
}






