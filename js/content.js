(function() {
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

	/*
     * Get the selected content
     */
    function getSelectedContent(sel, textOnly) {
        var div = document.createElement('div');
        var range = sel.getRangeAt(0);

        if (!textOnly) { // Expand the selection if want to copy html code
            while (range.startContainer.nodeType == document.TEXT_NODE || range.startContainer.childNodes.length == 1)
                range.setStartBefore(range.startContainer);

            while (range.endContainer.nodeType == document.TEXT_NODE || range.endContainer.childNodes.length == 1)
                range.setEndAfter(range.endContainer);
        }

        /* Remove hidden text in the selection content */
        //removeHidden(range.commonAncestorContainer);

        if (textOnly) {
            return sel.toString();
        } else {
            //range = sel.getRangeAt(0);
            div.appendChild(range.cloneContents());

            return div.innerHTML;
        }
    }


    /*
     * Get selected html content.
     */
    function html(sel) { return getSelectedContent(sel, false); }

    /* 
     * Get selected text content
     */
    function text(sel) { return getSelectedContent(sel, true); }

    /*
     * Copy non-empty value to clipboard
     */
    function copy(value, mode)
    {
        // if (value.match(/^(\s|\n)*$/) != null)
        //     return;

        mode = mode || 'default';
        chrome.extension.sendMessage({
            command: 'copy',
            data: value,
            mode: mode
        }, function (response) {
            // do nothing
            console.log(response);
        });
    }


	/*
	 * Mouseup event handler
	 */
	function onkeydown(event) {
		var sel = event.view.getSelection();

        var raw = true;
        var value = "";

        if (event.shiftKey && event.keyCode == 67) /* Shift + c */
            raw = false;
        else if (event.ctrlKey && event.keyCode == 67) /* Ctrl + c */
            raw = true;
        else
            return;

        value = raw ? text(sel) : html(sel);
        //debug(value);
		copy(value);
        sel.removeAllRanges();
	}


    document.addEventListener('keydown', onkeydown, false);

})();