$(document).ready(function() {

    var buttonEditing;

    function deleteRow(evt) {
        console.log(this);
        $(this).parent().parent().parent().remove();
    }

    function modifyRow(evt) {
        console.log("clicked");
        $('#modifyInput').val(
            $(this).parent().parent().find('p').text()
        );
        buttonEditing = this;
    }

    function saveChanges() {
        console.log("Hello")
        modText = $('#modifyInput').val();
        $(buttonEditing).parent().parent().find('p').text(modText);
    }

    //adds an event listener to the button
    $("#create").click(function() {
        if ($('#textInput').val() !== "") {
            var text = $('#textInput').val();

            var deleteButton = $('<button class="btn btn-danger cardButton" id="deleteButton">Delete</button>');
            var modifyButton = $('<button type="button" class="btn btn-primary cardButton" id="modifyButton" data-toggle="modal" data-target="#edit">Modify</button>');

            var para = $("<p class='col-9'> </p>").text(text);
            var buttonDiv = $("<div class='col-3 buttonDiv'> </div>")

            buttonDiv.append(deleteButton);
            buttonDiv.append($('<br>'))
            buttonDiv.append(modifyButton);

            var card = $("<div class='card container row'></div>");
            card.append(para);
            card.append(buttonDiv);
            var elem = $("<div class='row'></div>").append(card);

            $('#submissions').append(elem);
            $('#textInput').val("");
        }
    });

    $('#submissions').on('click', '#deleteButton', deleteRow);
    $('#submissions').on('click', '#modifyButton', modifyRow);
    $('#saveChanges').on('click', saveChanges);

});
