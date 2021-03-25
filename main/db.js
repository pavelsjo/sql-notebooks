// create a db
var db = openDatabase('mydb', '1.0', 'Test DB', 2*1024*1024);

// create table
db.transaction((tran) => {   
    tran.executeSql('CREATE TABLE IF NOT EXISTS USERS (id unique, name)'); 
 });

// insert data
db.transaction((tran)=>{
    tran.executeSql('INSERT INTO USERS (id, name) VALUES (1, "Juan")');
    tran.executeSql('INSERT INTO USERS (id, name) VALUES (2,"Maria")');
});

// insert dynamic data
var db_id = 3
var db_name = "Eugenia"

db.transaction((tran)=> {
    tran.executeSql('INSERT INTO USERS (id, name)  VALUES (?, ?)', [db_id, db_name])
});