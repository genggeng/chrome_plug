(function() {
	window.onmouseup = function() {
		var selection = window.getSelection();
		if (selection.anchorOffset != selection.extentOffset) {
			chrome.runtime.sendMessage(selection.toString());
		}
	}


	/* An empty debug function */
    var _emptyFunc = function(msg) {};
    var _debugFunc = function(msg) { console.log('[DEBUG] ' + msg); };
    var debug = _emptyFunc;

    // if DEBUG is true and Firebug console is available, use it for logging
    if (window.DEBUG && typeof(console) !== 'undefined') {
        debug = _debugFunc;
    }else{
    	debug = _emptyFunc;
    }


	/*
     * Get the selected content
     */
    function getSelectedContent(sel, textOnly)
    {
        var div = document.createElement('div');
        var range = sel.getRangeAt(0);

        if (!textOnly) { // Expand the selection if want to copy html code
            while(range.startContainer.nodeType == document.TEXT_NODE
                  || range.startContainer.childNodes.length == 1)
                range.setStartBefore(range.startContainer);

            while(range.endContainer.nodeType == document.TEXT_NODE
                  || range.endContainer.childNodes.length == 1)
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
     * Copy non-empty value to clipboard
     */
    function copy(value, mode)
    {
        if (value.match(/^(\s|\n)*$/) != null)
            return;

        mode = mode || 'default';
        debug('Copyied string: ' + value + ', copy mode: ' + mode);

        chrome.extension.sendMessage({
            command: 'copy',
            data: value,
            mode: mode
        }, function (response) {
            // do nothing
        });
    }


	/*
	 * Mouseup event handler
	 */
	function onmouseup(event) {
		 var sel = event.view.getSelection();
		 value = html(sel);
		 // copy(value);
	}



	document.addEventListener('mouseup', onmouseup, false);



})();