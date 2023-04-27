/**
 * Set Workspace radio buttons
 * 
 */

function process(username) {

    radioButtons = [
        {"value": username, "label": username + " [private]"},
        {"value": "development", "label": "development"},
        {"value": "test", "label": "test"},
        {"value": "production", "label": "production"}];

    return JSON.stringify(radioButtons);
}

process(username)