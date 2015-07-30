chrome.extension.sendMessage({
    action: "getSource",
    source: document.getElementById('conceptField').innerHTML
});