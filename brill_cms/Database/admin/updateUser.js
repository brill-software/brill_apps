/**
 * Updates a user table row. 
 * 
 * Content:
 * {
 *      user_id: number
 *      username: string - not used.
 *      name: string
 *      changePassowrd: string
 *      permissions: string
 *      resetPassword: "Y" | "N"
 *      passowrd: string   - password hash.
 * }
 * 
 * Result:
 * {
 *   count: number
 *   republishTopic: The JavaScript topic for re-reading the table contents.
 * 
 * }
 * 
 * @param filter String containing request JSON
 * @returns String containg a count of the number of rows updated.
 *
 */
function processUpdate(content, db) {
    var queryParameters = {};
    var contentObj = JSON.parse(content);
    print("******* contentObj = " + JSON.stringify(contentObj));

    // Check the password
    if (contentObj.resetPassword) {
        if (!contentObj.password) {
            return JSON.stringify({error: {title: "Password Required", detail: "The password doesn't meet the minimum requirements. Please change."}});
        }
        // Check password and confirmation password are the same.
        if (contentObj.password !== contentObj.passwordConfirm) {
            return JSON.stringify({error: {title: "Password Mismatch", detail: "The password and confirmation password don't match. Please correct."}});
        }
    }

    // Execute the query to perform the update.
    var query
    if (contentObj.resetPassword)
    {
        query = "update brill_cms_user set name = :name, email = :email, workspace = :workspace, changePassword = :changePassword, permissions = :permissions, password = :password where user_id = :user_id";
    } else {
        query = "update brill_cms_user set name = :name, email = :email, workspace = :workspace, changePassword = :changePassword, permissions = :permissions where user_id = :user_id";
    }
    queryParameters["user_id"] = contentObj.user_id;
    queryParameters["name"] = contentObj.name;
    queryParameters["email"] = contentObj.email;
     queryParameters["workspace"] = contentObj.workspace;
    queryParameters["changePassword"] = contentObj.changePassword;
    queryParameters["permissions"] = contentObj.permissions;
    if (contentObj.resetPassword) {
        queryParameters["password"] = db.hashPassword(contentObj.username,contentObj.password);
    }

    var rowCount = db.executeNamedParamsUpdate(query, JSON.stringify(queryParameters));

    var result = {count: rowCount, republishTopic: "javascript:/brill_cms/Database/admin/readUsers.js"};
    print("Finished executing updateUser.js");
    return JSON.stringify(result);
}

function print(str) {
    java.lang.System.out.println(str);
}

processUpdate(content, db);
