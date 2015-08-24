// need http://www.parsecdn.com/js/parse-1.5.0.min.js"
// and parse_key.js Parse.initialize with the keys

var sendscore = function(name,score,icecream,destroyed) {
    var GameScore = Parse.Object.extend("GameScore");
    var gamescore = new GameScore;
    var status;

    gamescore.save({
        playername: name,
        score: parseInt(score),
        icecream: parseInt(icecream),
        destroyed: parseInt(destroyed)
     },{
        success: function(object) {
            console.log("ok: " + object.id )
            window.location.href = "http://localhost:8080/?id="+object.id;
            //window.location.href ="http://imaginabit.com/ld33/?id="+object.id;
            status = 'ok';
        },
        error: function(model, error) {
            status = 'error';
        }
    });
};
