/**
 * Retrives rows from the user table. Supports paging and sorting. 
 * 
 * Filter:
 * {
 *      offset: number
 *      row_count: number
 *      sort_col: string
 *      sort_direction: string  ( ASC or DEC )
 *      search_text: string
 *      columns: string[]
 *      filter_list: [string[]]
 * }
 * 
 * Result:
 * {
 *   data: Row[]
 *   count: number
 * }
 * 
 * @param filter String containing request JSON
 * @returns String containg row data and a count of the total number of rows in the DB table.
 *
 */
function processRequest(filter, db) {
    var queryParameters = {};
    var filterObj = JSON.parse(filter);
    print("******* filterObj = " + JSON.stringify(filterObj));
    
    var query = "select user_id, username, first_name, last_name, email, last_login, workspace, case when length(password) > 30 then '******' else password end password, permissions, hidden_apps, changePassword from brill_cms_user where deleted != 'Y'";

    var whereAdded = false;
    var whereClause = "";

    if (filterObj.columns) {
        for (var i = 0; i < filterObj.columns.length; i++) {
            if (filterObj.filter_list[i]) {
                for (var j = 0; j < filterObj.filter_list[i].length; j++) {
                    if (!whereAdded) {
                        whereClause += " where";
                        whereAdded = true
                    } else {
                        whereClause += " and"
                    }
                    whereClause += " " + filterObj.columns[i] + " like ?";
                    queryParameters[filterObj.columns[i] + j] = filterObj.filter_list[i][j] + "%";
                }
            }
        }
    }

    if (filterObj.search_text) {
        if (!whereAdded) {
            whereClause += " where";
            whereAdded = true
        } else {
            whereClause += " and"
        }
        whereClause += " match (username,first_name) against ('" + 
                    filterObj.search_text + "*' in boolean mode)"
    }

    var countQuery = "select count(*) count from brill_cms_user" + whereClause;
    var countJson = db.executeQuery(countQuery, JSON.stringify(queryParameters));
    print("countJson = " + countJson);
    var countRow = JSON.parse(countJson);
    var count = countRow[0].count;

    query += whereClause;
    if (filterObj.sort_col && filterObj.sort_direction) {
        query += " order by " + filterObj.sort_col + " " + filterObj.sort_direction;
    }

    query += " limit ?, ?";
    queryParameters["offset"] = filterObj.offset;
    queryParameters["row_count"] = filterObj.row_count;

    print("sql = " + query);
    var dataJson = db.executeQuery(query, JSON.stringify(queryParameters));
    var data = JSON.parse(dataJson);

    var result = {data: data, count: count};
    print("Finished executing readUsers.js");
    return JSON.stringify(result);
}

function print(str) {
    java.lang.System.out.println(str);
}

processRequest(filter, db);