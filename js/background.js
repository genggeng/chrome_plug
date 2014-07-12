chrome.contextMenus.create({
    'type':'normal',
    'title':'设置为标题',
    'contexts':['selection'],
    'id':'tit',
    'onclick':setTitle
});

chrome.contextMenus.create({
    'type':'normal',
    'title':'设置为内容',
    'contexts':['selection'],
    'id':'content',
    'onclick':setContent
});

var title,content;
function setTitle(info, tab){
    chrome.runtime.onMessage.addListener(function(message, sender, sendResponse){
        title = message.msg;
        chrome.contextMenus.update('tit',{
            'title':'设置标题为“'+message.msg+'”'
        });
    });

    alert(title);
};
function setContent(info, tab){
    chrome.runtime.onMessage.addListener(function(message, sender, sendResponse){
        content = message.msg;
        chrome.contextMenus.update('content',{
            'title':'设置内容为“'+message.msg+'”'
        });
    });
    alert(content);
}





