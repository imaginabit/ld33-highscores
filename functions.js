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
      var row = $('<tr class="'+ score.id +'">');
      row.append('<td>' + (i+1) + '</td>');
      row.append('<td>' + score.get("playername") + '</td>');
      row.append('<td>' + score.get("score") + '</td>');
      row.append('<td>' + score.get("icecream") + '</td>');
      row.append('<td>' + score.get("destroyed")  + '</td>');
      $(targetid).append(row);
    }
}

//imprimir resultaddos del ranking con tu posicion NO el top10
//TODO
function printRanking(targetid,scores) {
    for (var i = 0; i < scores.length; i++) {
      var score = scores[i];
      var n = 0;
      var row = $('<tr class="'+ score.id +'">');
      row.append('<td>' + (n) + '</td>');
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
          printScore(targetid,scores);
      },
      error: function(object, error) {
        $('#title').append("Error al obtener datos");
      }
    });
}

function gScoresPrintH(query,targetid) {
    query.find({
      success: function(scores) {
          printScore(targetid,scores);
          $("tr."+id).addClass("info");
          $("#yourScore").show()
      },
      error: function(object, error) {
        $('#title').append("Error al obtener datos");
      }
    });
}


// function getRankingData(scoreid) {
//   // query.equalTo("playername", request.params.playername);
//   //scoreid = request.params.scoreid;
//   data = Array();
//   var query = new Parse.Query("GameScore");
//   query.limit(1000);
//   query.descending("score")
//   query.find({
//     success: function(results) {
//       var sum = 0;
//       for (var i = 0; i < results.length; ++i) {
//         row = results[i];
//         if (row.id == scoreid ){
//           data = Array();
//           for (var j= -2; j < 3; ++j) {
//             n = i + j;
//             if( results[n] ){
//               data.push( [
//                 n,
//                 results[n].id,
//                 results[n].get("playername"),
//                 results[n].get("score"),
//                 results[n].get("icecream"),
//                 results[n].get("destroyed"),
//               ]);
//             }
//           }
//         }
//       }
//       loadRanking(data);
//       $("tr."+id).addClass("info");
//     },
//     error: function() {
//       response.error("lookup failed");
//     }
//   });
// }

function getRankingData(scoreid,type) {
  data = Array();
  type = typeof type !== 'undefined' ? type : '';
  console.log("#yours"+capFirst(type));

  var query = new Parse.Query("GameScore");
  query.limit(1000);
  if (type=='') query.descending("score");
  else{
    query.descending(type);
    $("#your"+capFirst(type)+"Score").show();
    $("#yours"+capFirst(type)).show();
  }

  $("#yours"+capFirst(type)).append("<DIV id='yoursLoading"+capFirst(type)+"' class='loading'>LOADING ...</DIV>");
  query.find({
    success: function(results) {
      var sum = 0;
      for (var i = 0; i < results.length; ++i) {
        row = results[i];
        if (row.id == scoreid ){
          data = Array();
          for (var j= -2; j < 3; ++j) {
            n = i + j;
            if( results[n] ){
              data.push([
                n,
                results[n].id,
                results[n].get("playername"),
                results[n].get("score"),
                results[n].get("icecream"),
                results[n].get("destroyed"),
              ]);
            }
          }
        }
      }
      loadRanking(data,type);
      $("tr."+id).addClass("info");
    },
    error: function() {
      console.log("error al recibir datos");
    }
  });
}
//
// function loadRanking(data) {
//   console.log("datos :");
//   console.log(data);
//
//   targetid= "#yours";
//   if (data.length>0){
//     for (var i = 0; i < data.length; i++) {
//       var d = data[i];
//       var n = d[0];
//       scoreid = d[1];
//       playername = d[2] ;
//       score = d[3] ;
//       icecream = d[4] || 0;
//       destroyed = d[5] || 0;
//
//       var row = $('<tr class="'+ scoreid +'">');
//       row.append('<td>' + (n) + '</td>');
//       row.append('<td>' + playername + '</td>');
//       row.append('<td>' + score + '</td>');
//       row.append('<td>' + icecream + '</td>');
//       row.append('<td>' + destroyed  + '</td>');
//       $(targetid).append(row);
//     }
//   } else {
//     $(targetid).html("sorry, your ranking too low :(")
//   }
//   $("#yoursLoading").hide();
// }

function capFirst(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function loadRanking(data,type) {
  type = typeof type !== 'undefined' ? type : '';
  console.log("datos :" + type +" ");
  console.log(data);

  targetid= "#yours"+capFirst(type);
  if (data.length>0){
    for (var i = 0; i < data.length; i++) {
      var d = data[i];
      var n = d[0];
      scoreid = d[1];
      playername = d[2] ;
      score = d[3] ;
      icecream = d[4] || 0;
      destroyed = d[5] || 0;

      var row = $('<tr class="'+ scoreid +'">');
      row.append('<td>' + (n) + '</td>');
      row.append('<td>' + playername + '</td>');
      row.append('<td>' + score + '</td>');
      row.append('<td>' + icecream + '</td>');
      row.append('<td>' + destroyed  + '</td>');
      $(targetid).append(row);
    }
  } else {
    $(targetid).html("sorry, your ranking too low :(")
  }
  $("#yoursLoading"+capFirst(type)).hide();
}
