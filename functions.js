$.urlParam = function(name){
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results==null){
       return null;
    }
    else{
       return results[1] || 0;
    }
}


function addTotal(lastIcecream,icecream,lastDestroyed,destroyed,lastScore,score) {
    var Total = Parse.Object.extend("Total");
    var total = new Total();

    total.save(
    {
        score: lastScore + score ,
        icecream: lastIcecream + icecream,
        destroyed: lastDestroyed + destroyed
    },{
        success: function(object) {
            resp = [lastIcecream, icecream];
            $("body").html("success " + lastIcecream + ' ' +icecream);
        },
        error: function(model, error) {
            $("body").html("error");
        }
    });
}

function getLastGameScoreAndSum(icecream,destroyed,score) {
    var Total = Parse.Object.extend("Total");
    var query = new Parse.Query(Total);
    query.descending("createdAt");
    var lastIcecream = 0;
    var lastDestroyed = 0;
    var lastScore = 0;

    query.find({
        success: function(o) {
            var first = o[0];
            if (first !== undefined){
                lastIcecream = first.get('icecream');
                lastDestroyed = first.get('destroyed');
                lastScore = first.get('score');
            }
            // $("body").append("success " + ' ' + lastIcecream + ' ' +  lastDestroyed  + ' ' + lastScore);
            addTotal(
                lastIcecream, icecream,
                lastDestroyed, destroyed,
                lastScore, score
            );

        }
    });
}

function printScore(targetid,scores) {
    for (var i = 0; i < scores.length; i++) {
      var score = scores[i];
      var row = $('<tr>');
      row.append('<td>' + score.get("playername") + '</td>');
      row.append('<td>' + score.get("score") + '</td>');
      row.append('<td>' + score.get("icecream") + '</td>');
      row.append('<td>' + score.get("destroyed")  + '</td>');
      $(targetid).append(row);
    }
}
function getScoresPrint(query,targetid) {
    query.find({
      success: function(scores) {
          printScore(targetid,scores)
      },
      error: function(object, error) {
        $('#title').append("Error al obtener datos");
      }
    });
}
