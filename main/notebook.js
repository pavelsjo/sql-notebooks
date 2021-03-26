$(document).ready( () => {

    // DOM elements
    var myTextArea = $(".notebook textarea");
    var editor = CodeMirror.fromTextArea(myTextArea[0], 
        {mode: 'text/x-mysql',
        lineNumbers: true});

    // DOM interaction
    $(".notebook-cell-button").on('click', () => {

        db.transaction((tran) => {
            tran.executeSql(editor.getValue(), [], (tran, data) => {
                console.log(data);
            }, (err)=>{
                console.log(err);
            });
        });
    });
});
