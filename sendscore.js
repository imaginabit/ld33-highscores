// need http://www.parsecdn.com/js/parse-1.5.0.min.js"
// and parse_key.js Parse.initialize with the keys

var sendscore = function(name,score,icecream,destroyed) {
    var GameScore = Parse.Object.extend("GameScore");
    var gamescore = new GameScore
    var status;

    gamescore.save({
        playername: name,
        score: score,
        icecream: icecream,
        destroyed: destroyed
     },{
        success: function(object) {
            // $("body").html("success");
            status = 'ok';
        },
        error: function(model, error) {
            status = 'error';
        }
    });
};
