require('../../config.js');
const pgp = require('pg-promise')();
const db = pgp(process.env.DB_URL);
//server side's running js code called process, get env variable(DB_URL)
// console.log(process.env.DB_URL);
const schemaSql = `
    -- Extensions
    CREATE EXTENSION IF NOT EXISTS pg_trgm;

    -- Drop (droppable only when no dependency)
    --DROP INDEX IF EXISTS posts_idx_text;
    --DROP INDEX IF EXISTS posts_idx_ts;
    DROP TABLE IF EXISTS Refrige;
    DROP TABLE IF EXISTS Freezer;
    DROP TYPE IF EXISTS category CASCADE;
    DROP TYPE IF EXISTS unit CASCADE;

    -- Create
    CREATE TYPE category AS ENUM (
        '蔬菜',
        '肉類',
        '海鮮',
        '水果',
        '蛋/乳製品',
        '調味料',
        '熟食'
    );
    CREATE TYPE unit AS ENUM (
        '個',
        '人份',
        '克',
        '公斤',
        '台斤',
        '毫升',
        '公升'
    );
    CREATE TABLE Refrige (
        id                  serial PRIMARY KEY NOT NULL,
        name                text NOT NULL,
        category            category NOT NULL,
        quantity            integer NOT NULL DEFAULT 1,
        unit                unit NOT NULL,
        "isSetDeadline"     boolean NOT NULL DEFAULT false,
        deadline            text NOT NULL,
        "isAlarm"           boolean NOT NULL DEFAULT false,
        "alarmDate"         text NOT NULL,
        "alarmTime"         text NOT NULL,
        text                text
    );
    CREATE TABLE Freezer (
        id                  serial PRIMARY KEY NOT NULL,
        name                text NOT NULL,
        category            category NOT NULL,
        quantity            integer NOT NULL DEFAULT 1,
        unit                unit NOT NULL,
        "isSetDeadline"     boolean NOT NULL DEFAULT false,
        deadline            text NOT NULL,
        "isAlarm"           boolean NOT NULL DEFAULT false,
        "alarmDate"         text NOT NULL,
        "alarmTime"         text NOT NULL,
        text                text
    );



`;
/*

    CREATE TABLE posts (
        id              serial PRIMARY KEY NOT NULL,
        mood            text NOT NULL,
        unit            unit NOT NULL,
        text            text NOT NULL,
        "clearVotes"    integer NOT NULL DEFAULT 0,
        "cloudsVotes"   integer NOT NULL DEFAULT 0,
        "drizzleVotes"  integer NOT NULL DEFAULT 0,
        "rainVotes"     integer NOT NULL DEFAULT 0,
        "thunderVotes"  integer NOT NULL DEFAULT 0,
        "snowVotes"     integer NOT NULL DEFAULT 0,
        "windyVotes"    integer NOT NULL DEFAULT 0
    );
*/
    // CREATE TABLE Freezer (
    //     id              serial PRIMARY KEY NOT NULL,
    //     name            text NOT NULL,
    //     category        text NOT NULL,
    //     quiantity       integer NOT NULL DEFAULT 1,
    //     unit            text NOT NULL,
    //     isSetDeadline   boolean NOT NULL DEFAULT false,
    //     deadline        text NOT NULL,
    //     isAlarm   　　　　　boolean NOT NULL DEFAULT false,
    //     alarmDate       date NOT NULL,
    //     alarmTime       date NOT NULL,
    //     memo    　　　　　　 text
    // );


    // CREATE INDEX posts_idx_ts ON posts USING btree(ts);
    // CREATE INDEX posts_idx_text ON posts USING gin(text gin_trgm_ops);

// const dataSql = `
//     -- Populate dummy posts
//     INSERT INTO posts (mood, text, ts)
//     SELECT
//         'Clear',
//         'word' || i || ' word' || (i+1) || ' word' || (i+2),
//         round(extract(epoch from now()) + (i - 1000000) * 3600.0)
//     FROM generate_series(1, 10) AS s(i);
// `;

db.none(schemaSql).then(() => {
    console.log('Schema created');
    // db.none(dataSql).then(() => {
    //     console.log('Data populated');
    //     pgp.end();
    // });
    pgp.end();
}).catch(err => {
    console.log('Error creating schema', err);
});
