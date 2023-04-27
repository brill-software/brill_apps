/**
 * Deletes a user from the brill_cms_user table by setting the deleted flag to 'Y' and
 * appending _XXX#<user id> to the username.
 * 
 * The deletion can be undone using MySQL Workbench to change the username back and change the 
 * deleted flag to 'N'.
 * 
 * Content:
 * {
 *      user_id: number
 *      username: string
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
function processDelete(content, db) {
    var queryParameters = {};
    var contentObj = JSON.parse(content);
    print("******* contentObj = " + JSON.stringify(contentObj));
    var query = "update brill_cms_user set deleted = 'Y', username = :username where user_id = :user_id";
    queryParameters["user_id"] = contentObj.user_id;
    queryParameters["username"] = contentObj.username + "_XXX#" + contentObj.user_id;
    print("sql = " + query);

    var rowCount = db.executeNamedParamsUpdate(query, JSON.stringify(queryParameters));
    
    var result = {count: rowCount, republishTopic: "javascript:/brill_cms/Database/admin/readUsers.js"};
    print("Finished executing JavaScript");
    return JSON.stringify(result);
}

function print(str) {
    java.lang.System.out.println(str);
}

processDelete(content, db);