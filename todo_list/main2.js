var cats = ["Home", "School"];
var dict = [];

var modifying;

$(document).ready(function() {

    $("#addCatag").click(function() {
        var value = $('#catAdd').val();
        $('#catAdd').val("");
        for(var i = 0; i < cats.length; i++) {
            if(cats[i] == value){
                alert('Already Made This Catagory')
                return false;}
        }
        cats.push(value);
        var section = $('<div class="col-lg-6"><div class="card"><div class="card-body" id='+value.toLowerCase()+'><div class="catButtons"><button type="button" class="btn btn-danger catDelete">Delete</button></div><h2>'+value+'</h2><hr></div></div></div>');
        $('#sections').append(section);
        $('#sectionTypes').html('');
        for(i = 0; i < cats.length; i++) {
            $('#sectionTypes').append($('<option value="'+ cats[i].toLowerCase() +'">'+ cats[i] +'</option>'));
        }
    });

    $("#createTask").click(function() {
        var value = $("#taskAdd").val();
        console.log("HI")
        $("#taskAdd").val("");
        var entry = $("<article class='container'><div class='row'><div class='buttonDiv col'><button class='deleteButton btn btn-danger'>Delete</button><br><button type='button'  class='modifyButton btn btn-info' data-toggle='modal' data-target='#edit'>Modify</button></div><div class='col sbDiv'><i class='fa fa-star-o star-button' aria-hidden='true'></i><br><input type='checkbox'></input></div><div class='mainPara col'>"+ value +"</div></div></article>");
        var section = $('#sectionTypes').find(":selected").text();
        console.log(section);
        var rand = (Math.floor(Math.random()*10000000000)).toString();
        $('#'+section.toLowerCase()).append(entry);
        $('#'+section.toLowerCase()).find(entry).attr('id', rand);

        var tempObj = {
            id: $('#'+section.toLowerCase()).find(entry).attr('id'),
            title: value,
            cat: section.toLowerCase(),
            stared: false,
            done: false,
        }
        dict.push(tempObj);

    });

    $('#saveChanges').click(function() {
        modText = $('#modifyInput').val();
        $(modifying).parent().parent().find('.mainPara').text(modText);
    });

    $('#getData').click(function() {
        var totalTasks = 0;
        var tasksDone = 0;
        var tasksStared = 0;
        var tasksBoth = 0;
        for(key = 0; key < dict.length;key++) {
            totalTasks++;
            if(dict[key].done){tasksDone++;}
            if(dict[key].stared){tasksStared++;}
            if(dict[key].stared && dict[key].done){tasksBoth++;}
        }
        $('#data').html("Total: " + totalTasks + " Done: "+ tasksDone +"<br>Stared: "+ tasksStared +" Both: "+ tasksBoth);
    });

    function star() {
        $(this).parent().find('i').toggleClass('fa-star-o fa-star');
        var mkey;
        for(key = 0; key< dict.length;key++) {
            if(dict[key].id == $(this).parent().parent().parent().attr('id')) {
                mkey = key;
            }
        }
        if(dict[mkey].stared){
            dict[mkey].stared = false;
        }
        else {
            dict[mkey].stared = true;
        }
    }
    function checkBox() {
        var mkey;
        for(key = 0; key < dict.length;key++) {
            if(dict[key].id == $(this).parent().parent().parent().attr('id')) {
                mkey = key;
            }
        }
        if(dict[mkey].done){
            dict[mkey].done = false;
        }
        else {
            dict[mkey].done = true;
        }
    }

    function deleteEntry() {
        $(this).parent().parent().parent().remove();
    }

    function modifyEntry() {
        $('#modifyInput').val(
            $(this).parent().parent().find('.mainPara').text()
        );
        modifying = this;
    }
    function catDelete() {
        $(this).parent().parent().parent().parent().remove();
        var name = $(this).parent().next().text();
        cats = cats.filter(function(a) {return a !== name});
        $('#sectionTypes').html('');
        for(i = 0; i < cats.length; i++) {
            $('#sectionTypes').append($('<option value="'+ cats[i].toLowerCase() +'">'+ cats[i] +'</option>'));
        }

    }

    $('#sections').on('click', '.deleteButton', deleteEntry);
    $('#sections').on('click', '.modifyButton', modifyEntry);
    $('#sections').on('click', '.star-button', star);
    $('#sections').on('click', 'input', checkBox)
    $('#sections').on('click', '.catDelete', catDelete);
});
