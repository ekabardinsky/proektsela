function openLink(url) {
    var win = window.open(url, '_blank');
    win.focus();
}

function downloadExample(name) {
    openLink('examples/' + name)
}