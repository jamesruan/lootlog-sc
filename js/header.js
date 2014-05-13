$.getJSON('headers.php', function(data) {

    // The trust boolean value
    var trusted = data.trust;
    // The content of the headers, "un-prefixed"
    var values = data.values;

    if (!trusted) { // Set to false, trust is required
        // Ask for trust
        CCPEVE.requestTrust(
            location.protocol
            + '//' +
            location.host
            );
    }
    else { // Trust is granted, we have the data
        // Lets greet the player by name
        $(document.body).prepend(
            '<h2>Hello ' +
            values.charname
            + '</h2>'
            );
    }
});
