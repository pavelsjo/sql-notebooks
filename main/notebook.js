// codemirror
var myTextArea = document.querySelector('#mycode');
var tableArea = document.querySelector('table');

var editor = CodeMirror.fromTextArea(myTextArea, {
    lineNumbers: true
  });

// interaction with web-sql

function runCell () {
    
    db.transaction((tran) => {

        tran.executeSql(editor.getValue(), [], (tran, data) => {

            // create column
            var columnNames = Object.keys(data.rows.item(0));
            var trHeader = document.createElement('tr');
            tableArea.appendChild(trHeader);

            columnNames.forEach((col)=>{
                var header = document.createElement('th');
                header.textContent = col;
                trHeader.appendChild(header);
                });

            // create rows
            var trData = document.createElement('tr');
            tableArea.appendChild(trData);

            Array.from(data.rows).forEach((row) => {
                // var data = document.createElement('td');
                // data.textContent = toString(row.item);
                // trData.appendChild(data);
                console.log(row.value);
                Array.from(row).forEach((col)=>{
                    console.log(col.value);
                });
            });
        });
    });

};

// var query = db.transaction((tran)=>{
//     tran.executeSql("SELECT * FROM USERS", [], (tran,data) => {console.log(data)
//     })
// });
// SELECT * FROM USERS

  