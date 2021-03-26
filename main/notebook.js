$(document).ready( () => {

    // DOM elements
    var myTextArea = $(".notebook textarea");
    var editor = CodeMirror.fromTextArea(myTextArea[0], 
        {
            mode: 'text/x-mysql',
            lineNumbers: true
        }
    );

    // HELP functions
    function createTableFromJSON(jsonData) {
      
        // EXTRACT VALUE FOR HTML HEADER. 
        var col = [];
        for (var i = 0; i < jsonData.length; i++) {
            for (var key in jsonData[i]) {
                if (col.indexOf(key) === -1) {
                    col.push(key);
                }
            }
        }

        // CREATE DYNAMIC TABLE.
        var table = document.createElement("table");

        // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.

        var tr = table.insertRow(-1);                   // TABLE ROW.

        for (var i = 0; i < col.length; i++) {
            var th = document.createElement("th");      // TABLE HEADER.
            th.innerHTML = col[i];
            tr.appendChild(th);
        }

        // ADD JSON DATA TO THE TABLE AS ROWS.
        for (var i = 0; i < jsonData.length; i++) {

            tr = table.insertRow(-1);

            for (var j = 0; j < col.length; j++) {
                var tabCell = tr.insertCell(-1);
                tabCell.innerHTML = jsonData[i][col[j]];
            }
        }

        // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
        var divContainer = document.getElementById("notebook-show-data");
        divContainer.innerHTML = "";
        divContainer.appendChild(table);
    }

    function createMensajeError(errorData) {

        var p = document.createElement('p');
        p.innerHTML = errorData;
        var divContainer = document.getElementById("notebook-show-data");
        divContainer.innerHTML = "";
        divContainer.appendChild(p);
    }

    // DOM interaction
    $(".notebook-cell").on('keydown', (e) => {
        
        if (e.ctrlKey && e.keyCode === 13) {

            db.transaction((tx) => {
                tx.executeSql(
                    editor.getValue(), 
                    [],
                    (tx, data) => {

                        createTableFromJSON(data.rows)
                    },
                    (tx, error) => {
                        createMensajeError(error.message);
                    }
                );
            });
        };
        
    });
});
