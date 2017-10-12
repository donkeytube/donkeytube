var request = require('request');
var db = require('../services/db');

for(var i = 0; i < 200; i++){
    request('http://www.theimdbapi.org/api/movie?movie_id=tt0' + (418279 + i), function (error, response, body) {
        var b = JSON.parse(body);
        var sql = "INSERT INTO temp_imdb (title,release_date,director,length,imdb_id,rating,genre,storyline,description,stars,poster,countries,year) VALUES (\"" 
            + b.title + "\",\"" 
            + b.release_date + "\",\"" 
            + b.director + "\",\"" 
            + b.length + "\",\"" 
            + b.imdb_id + "\",\"" 
            + b.rating + "\",\"" 
            + b.genre + "\",\"" 
            + b.storyline + "\",\"" 
            + b.description + "\",\"" 
            + b.stars + "\",\"" 
            + b.poster.thumb + "\",\""
            + b.metadata.countries + "\",\""
            + b.year + "\")";

        db(sql, function(err,data) {
            console.log(sql);
        });
    }); 
};

