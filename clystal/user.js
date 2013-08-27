module.exports = {
    tableName  : "user",
    primaryKey : "user_id",
    dsn        : "user",
    queries    : {
        insert :
            "INSERT IGNORE INTO __TABLE_NAME__ " +
            " ( name,  mail,  pass, ctime) VALUES " +
            " (:name, :mail, :pass, NOW())",
        findByMail :
            "SELECT * FROM __TABLE_NAME__ " +
            " WHERE mail = :mail",
        createTable :
            "CREATE TABLE IF NOT EXISTS __TABLE_NAME__ (" +
            " user_id   INT UNSIGNED    NOT NULL    AUTO_INCREMENT," +
            " name      VARCHAR(256)    NOT NULL," +
            " mail      VARCHAR(256)    CHARACTER SET ascii   NOT NULL," +
            " pass      VARCHAR(256)    NOT NULL," +
            " ctime     DATETIME        NOT NULL    DEFAULT '0000-00-00 00\\:00\\:00'," +
            " mtime     TIMESTAMP       NOT NULL    DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP," +
            " PRIMARY KEY   (user_id)," +
            " UNIQUE KEY    (mail)" +
            ") ENGINE=InnoDB DEFAULT CHARSET=utf8mb4",
    },
}
