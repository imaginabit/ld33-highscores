//
// Parse.Cloud.define("ranking", function(request, response) {
//   // query.equalTo("playername", request.params.playername);
//   scoreid = request.params.scoreid;
//   var query = new Parse.Query("GameScore");
//   query.limit(1000);
//   query.find({
//     success: function(results) {
//       var sum = 0;
//       for (var i = 0; i < results.length; ++i) {
//         row = results[i];
//         if (row.id == scoreid ){
//           data = Array();
//           for (var j= -4; j < 5; ++j) {
//             n = i + j;
//             data.push( { results[n].id,
//               results[n].get("playername"),
//               results[n].get("score"),
//               results[n].get("icecream"),
//               results[n].get("destroyed"),
//             });
//           }
//         }
//       }
//       response.success(data);
//     },
//     error: function() {
//       response.error("lookup failed");
//     }
//   });
// });


Parse.Cloud.afterSave("GameScore", function(request) {
    if (request.object.get("icecream") > 0 ||
          request.object.get("destroyed") > 0 ||
          request.object.get("score") > 0) {

      // get last row data
      var icecream = request.object.get("icecream");
      var destroyed = request.object.get("destroyed");
      var score = request.object.get("score");

      getLastGameScoreAndSum(icecream,destroyed,score);
    }
});

function addTotal(
        lastIcecream,icecream,
        lastDestroyed,destroyed,
        lastScore,score) {
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
