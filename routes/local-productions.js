var express = require('express');
var path = require('path');
var router = require('express').Router();
var Promise = require('bluebird');
var coveapi = require('cove-api');
var api_id = 'KLRU-33074411-4d78-4875-a9dc-ff1ae3e12a24';    
var api_secret  = 'b3c4f332-8244-4498-b9f1-8bbab085a1dc';
var $ = require('jquery');
router.use(express.static(__dirname + '/public'));

var coveopt = {
    api_id: api_id,
    api_secret: api_secret
    //log_level: 'off'
};

var local_prods = new coveapi(coveopt);
var options = {auth_using_headers: true};
var url = 'http://api.pbs.org/cove/v1/programs/?filter_producer__name=klru';
var database = [];
var db = [];
var imageUrl = 'http://api.pbs.org/cove/v1/videos/?fields=associated_images&filter_program__title='
var videoUrl = 'http://api.pbs.org/cove/v1/videos/?fields=mediafiles&filter_program__title=' 
var append = '&filter_airdate__gt=2016-01-01';

var localShows = function(url, options){
local_prods.request(url, options).
    then(function(data){ 
        loop(data)                                                                                                    
        router.get('/', function(req, res){                                                                    
	    res.render('local-productions', {title: 'Local Productions',
					     titleDB: db,                                                            
					     path: 'local-productions',                 
					     linkDB: database,                                                     
					     jsonData: data.results
	    });                                                                                                          
	});
                                                                                                      
        showPage(db, data, database) 
    }).
    catch(function(e){
	console.error(e)
    }).
    done();
}

localShows(url, options)

var loop = function(data){
    for(var i = 0; i < data.results.length; i++){                                                                  
        var title = data.results[i].title;                            
        db.push(title);                                 
        title = title.replace(/\s+/g, '');                         
         database.push("/"+title);                       
    }
}

var showPage = function(db, data, database){
    database.forEach(function(name, num){       
	var completeImageUrl = imageUrl+db[num]+append;
	var completeVideoUrl = videoUrl+db[num]+append;
        Promise.join(
        local_prods.request(completeVideoUrl, options),
	local_prods.request(completeImageUrl, options), 
	function(videos, image){
            router.get(name, function(req, res){
		    res.render('shows', {title: db[num],                                                                            
					 titleDB: db,                                                                        
					 titlePath: name,                                                                         
					 linkDB: database,                                                                      
					 jsonData: data.results,                                                                    
					 Description: data.results[num].long_description,
					 imageData: image.results,
					 videoData: videos.results,
					 index: 0,
					 number: false});
	    });

	    router.get(name+'/singlePreview/:d', function(req, res) {
		res.render('single-preview', { imageData: image.results,
					       index: req.params.d,
					       videoData: videos.results,
					       Path: name});
	    });

            router.get(name + '/about', function(req, res){                                         
		res.render('showsAbout', {title: db[num],                                
					  titlePath: database[num],                                                       
					  Description: data.results[num].long_description});                     
            });                
	})
    }); 
}

module.exports = router;
