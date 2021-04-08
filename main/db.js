// Web SQL is required
var db = openDatabase('chinookdb', '1.0', 'Test DB', 2*1024*1024);

// Data  sources
const urlScripts = "data/Scripts.json"
const urlAlbum = "data/Album.json";
const urlArtist = "data/Artist.json";
const urlCustomer = "data/Customer.json";
const urlEmployee = "data/Employee.json";
const urlGenre = "data/Genre.json";
const urlInvoice = "data/Invoice.json";
const urlInvoiceLine = "data/InvoiceLine.json";
const urlMediaType = "data/MediaType.json";
const urlPlaylist = "data/Playlist.json";
const urlPlaylistTrack = "data/PlaylistTrack.json";
const urlTrack = "data/Track.json";

// Functions

function runScripts (url) {

    $.getJSON(url, (jsonData) => {

        // Clean Data Base
        jsonData[0]["dropTables"].forEach((table)=>{
            db.transaction((tran) => {
                tran.executeSql(table);
            });
            console.log("Tables Dropped");
        });

        // Create New Tables
        jsonData[2]["createTables"].forEach((table)=>{
            db.transaction((tran) => {
                tran.executeSql(table);
            });
            console.log("New tables created");
        });

        jsonData[1]["foreingKey"].forEach((table)=>{
            db.transaction((tran) => {
                tran.executeSql(table);
            });
            console.log("Foreing Keys created");
        });
    });
};

function populateTable(tableName, url) {
  
  $.getJSON(url, (jsonData) => {
    
    // get columns
    var columns = Object.keys(jsonData[0]);
    var columnsSqlFormat = [];
    
    columns.forEach( (col) => {
      columnsSqlFormat.push('[' + col + ']');
    });
    
    // get rows
    jsonData.forEach(row => {

      var rowValues = [];

      columns.forEach((col)=>{
        if(typeof row[col] === "number"){
          rowValues.push(row[col]);
        }else{
          rowValues.push("'" + row[col] + "'");
          };
      });
      
      // insert data
      db.transaction((tran) => {
        tran.executeSql(`INSERT INTO [${tableName}] (${columns}) VALUES (${rowValues})`);
      });
    });
  });
  console.log(`${tableName} - Success!`)
};

function setupDataBase(query){
    
    db.transaction((tran) => {
        tran.executeSql(query, [], 
            (tran, data) => {
                if(data.rows.length == 0){

                    console.log("Setup Data Base");

                    // Clean data base and create new tables
                    runScripts(urlScripts);

                    // populate fast initial table
                    setTimeout(()=>{
                        populateTable("Artist", urlArtist);
                    }, 1000)
                } else {
                    console.log("Star coding with CHINOOK data base!");
                }
            },
            (tran, error) => {
                console.log(error);
            }
        );
    });
};

function checkReRunDataBase(tableArray) {
    
    tableArray.forEach((table) => {
        
        db.transaction((tran) => {
            tran.executeSql(
                `SELECT COUNT(*) total FROM ${table}`, 
                [],
                (tran, data) => {
                    if (data.rows[0].total === 0){
                        setTimeout(()=>{
                            populateTable(`${table}`,`data/${table}.json`);
                        console.log(`Rechecked population succes: ${table}`)
                        }, 7200);
                    }
                },
                (tran, error) => {
                    console.log(error);
                }
            );
        });
    })
};

// MAIN

var querySelectAllTables = `
SELECT 
    name 
FROM 
    sqlite_master 
WHERE 
    type ='table' AND name NOT LIKE 'sqlite_%' AND name NOT LIKE '__WebKitDatabaseInfoTable__';
`;

//This check for tables
setupDataBase(querySelectAllTables); 

//This check for row numbers
setTimeout(() => {
    tables = [ 'Album', 'Artist', 'Customer', 'Employee', 'Genre', 'Invoice', 'InvoiceLine', 'MediaType', 'Playlist', 'PlaylistTrack', 'Track'];
checkReRunDataBase(tables); 
}, 3600);

