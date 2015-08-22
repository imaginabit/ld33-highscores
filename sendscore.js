$.getScript("http://www.parsecdn.com/js/parse-1.5.0.min.js", function(){
   console.log("Script loaded but not necessarily executed.");
   Parse.initialize("Vz8t62Nh4003qMWIfJL7ORRRwWXtMVJtWBbOrxJ5", "ePqAgI4cUuC5NNtGghJ68AHLYkh9jV0311MYoL1I");



   sendscore('Fernando',9999999,213232,2121);
   sendscore('Roberto',999999,21332,121);
   sendscore('Jonay',9999999,213232,2121);

});

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
