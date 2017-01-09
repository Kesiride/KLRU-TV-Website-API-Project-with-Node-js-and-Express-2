var express = require('express');
var router = express.Router();
var coveapi = require('cove-api');

router.use(express.static('public'));

var api_id = 'KLRU-33074411-4d78-4875-a9dc-ff1ae3e12a24';
var api_secret  = 'b3c4f332-8244-4498-b9f1-8bbab085a1dc';

var coveopt = {
    api_id : api_id,
    api_secret : api_secret
    //log_level : 'off'
};

/* GET users listing. */
router.get('/', function(req, res, next) {
    var coveshows = new coveapi(coveopt);
    var options = { auth_using_headers: true };
    var url = 'http://api.pbs.org/cove/v1/programs/?filter_producer__name=klru';
    coveshows.request(url, options).
    then(function(data){
       res.render('about', {title: 'Cove Posts',
			    atx: data.results});
	//res.send('Debugging'); 
    })
    .catch(function(e){
	console.error(e);
    })
    .done();
});

module.exports = router;
