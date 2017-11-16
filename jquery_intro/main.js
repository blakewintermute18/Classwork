$(document).ready(function() {

    var buttonEditing;

    function deleteRow(evt) {
        console.log(this);
        $(this).parent().remove();
    }

    function modifyRow(evt) {
        console.log("clicked");
        $('#modifyInput').val(
            $(this).parent().find('p').text()
        );
        buttonEditing = this;
    }

    function saveChanges() {
        console.log("Hello")
        modText = $('#modifyInput').val();
        $(buttonEditing).parent().find('p').text(modText)
    }

    //adds an event listener to the button
    $("#create").click(function() {
        if ($('#textInput').val() !== "") {
            var text = $('#textInput').val();
            var para = $("<p> </p><br>").text(text);
            var elem = $("<div class='row card'> </div>").append(para);
            var deleteButton = $('<button class="btn btn-danger" id="deleteButton">delete</button>');
            var modifyButton = $('<button type="button" class="btn btn-primary" id="modifyButton" data-toggle="modal" data-target="#edit">Modify</button>');
            elem.append(deleteButton);
            elem.append(modifyButton);
            $('#submissions').append(elem);
            $('#textInput').val("");
        }
    });

    $('#submissions').on('click', '#deleteButton', deleteRow);
    $('#submissions').on('click', '#modifyButton', modifyRow);
    $('#saveChanges').on('click', saveChanges);

});
