if (!global.db) {
    const pgp = require('pg-promise')();
    db = pgp(process.env.DB_URL);
}

function list(isRefrige) {

    if(isRefrige === 'true')
        var where = 'Refrige';
    else
        var where = 'Freezer';

    const sql = `
        SELECT *
        FROM ${where}
        ORDER BY id ASC
        -- LIMIT 10
    `;
    return db.any(sql, isRefrige);
}

function create(isRefrige, name, category, quantity, unit, isSetDeadline, deadline, isAlarm, alarmDate, alarmTime, text) {

    // console.log(isRefrige);

    if(isRefrige==='true')
        var where = 'Refrige';
    else
        var where = 'Freezer';

    // console.log(isSetDeadline);
    // console.log(alarmDate);
    // console.log(alarmTime);
    const sql = `
        INSERT INTO ${where} (name, category, quantity, unit, "isSetDeadline", deadline, "isAlarm", "alarmDate", "alarmTime", text)
        VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        RETURNING *
    `;
    return db.one(sql, [name, category, quantity, unit, isSetDeadline, deadline, isAlarm, alarmDate, alarmTime, text]);
}

function update(isRefrige, id, name, category, quantity, unit, isSetDeadline, deadline, isAlarm, alarmDate, alarmTime, text){
    if(isRefrige==='true')
        var where = 'Refrige';
    else
        var where = 'Freezer';

    // console.log(isSetDeadline+"    QQ");
    // console.log(id);
    const sql = `
        UPDATE  ${where}
        SET name = $2, category = $3, quantity = $4, unit = $5,
        "isSetDeadline" = $6, deadline = $7, "isAlarm" = $8,
        "alarmDate" = $9, "alarmTime" = $10, text = $11
        WHERE id = $1
        RETURNING *
    `;
    return db.one(sql, [id, name, category, quantity, unit, isSetDeadline, deadline, isAlarm, alarmDate, alarmTime, text]);
}
function remove(isRefrige, id){
    if(isRefrige==='true')
        var where = 'Refrige';
    else
        var where = 'Freezer';

    const sql = `
        DELETE FROM ${where}
        WHERE id = $1
    `;
    return db.any(sql, id);
}

module.exports = {
    list,
    create,
    update,
    remove
};
