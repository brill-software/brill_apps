/**
 * Creates a new user row in the brill_cms_user table. 
 * 
 * Content:
 * {
 *      user_id: number
 *      username: string
 *      name: string
 *      password: string
 *      changePassowrd: string
 *      permissions: string
 * }
 * 
 * Result:
 * {
 *   count: number
 *   republishTopic: The JavaScript topic for re-reading the table contents.
 * }
 * Or 
 * {
 *   error: {title: "Error Title", detail: "Detail Message"}
 * }
 * 
 * 
 * @param filter String containing request JSON
 * @returns String containg a count of the number of rows updated or an error.
 *
 */
function processInsert(content, db) {

    var contentObj = JSON.parse(content);

    // Check for special charaters.
    if (contentObj.username !== db.removeSpecialChars(contentObj.username)) {
        return JSON.stringify({error: {title: "Invalid Username", detail: "The username <b>" + contentObj.username + "</b> contains special characters or spaces. Please correct."}});
    }
    // See if the user already exists.
    var checkQuery = "select username from brill_cms_user where username = :username";
    var existingUser = db.executeNamedParamsQuery(checkQuery, JSON.stringify({username: contentObj.username}));
    if (existingUser.includes(contentObj.username)) {
        return JSON.stringify({error: {title: "Duplicate Username", detail: "A user with the username <b>" + contentObj.username + "</b> already exists. Please use a different username."}});
    }
    // Check password and confirmation password are the same.
    if (contentObj.password !== contentObj.passwordConfirm) {
        return JSON.stringify({error: {title: "Password Mismatch", detail: "The password and confirmation password don't match. Please correct."}});
    }
    // Insert the new user.
    var query = "insert brill_cms_user (username, first_name, last_name, email, repository, workspace, password, changePassword, permissions, hidden_apps, deleted) " +
                    "values (:username, :first_name, :last_name, :email, :repository, :workspace, :password, :changePassword, :permissions, :hidden_apps, 'N')";
    var queryParameters = {};
    queryParameters["user_id"] = contentObj.user_id;
    queryParameters["username"] = contentObj.username.toLowerCase();
    queryParameters["first_name"] = contentObj.first_name;
    queryParameters["last_name"] = contentObj.last_name;
    queryParameters["email"] = contentObj.email;
    queryParameters["repository"] = contentObj.repository;
    queryParameters["workspace"] = contentObj.workspace;
    queryParameters["password"] = db.hashPassword(contentObj.username,contentObj.password);
    queryParameters["changePassword"] = contentObj.changePassword;
    queryParameters["permissions"] = contentObj.permissions;
    queryParameters["hidden_apps"] = contentObj.hidden_apps;
    print("sql = " + query);
    print("values = " + JSON.stringify(queryParameters));

    var rowCount = db.executeNamedParamsUpdate(query, JSON.stringify(queryParameters));

    print("Query executed.");  
    var result = {count: rowCount, republishTopic: "javascript:/brill_cms/Database/admin/readUsers.js"};
    print("Finished executing newUser.js");
    return JSON.stringify(result);
}

function print(str) {
    java.lang.System.out.println(str);
}

processInsert(content, db);
