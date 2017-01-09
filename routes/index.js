var express = require('express');
var router = express.Router();
var posts = require('../WP_Posts.json');

//-------------------- Begin WordPress ------------------------------------------//
/*var WP = require( 'wordpress-rest-api' );
var site = new WP({ endpoint: 'http://www.klrubeta.org/wp-json' });
var posts = "";
*/

/*GET KLRU posts*/
/*site.posts().get(function( err, data ) {
    if ( err ) {
        // handle err
        console.log("We apologise for the inconvenience");
    }
    // do something with the returned posts
    posts = data;
});
*/
//--------------------- End WordPress -----------------------------------------//

//-------------- Begin COVE -------------//
var coveapi = require('cove-api');
//var cove_api_id = 'KLRU-33074411-4d78-4875-a9dc-ff1ae3e12a24';
//var cove_api_secret = 'b3c4f332-8244-4498-b9f1-8bbab085a1dc';

var cove_api_id =  process.env.COVE_API_ID;
var cove_api_secret = process.env.COVE_API_SECRET;

var cid = {
  api_id : cove_api_id,
  api_secret : cove_api_secret
  //log_level : 'off'
  };

//-------------- End Cove --------------//

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Klrubeta.org',
		        Klru_post: posts
		      });
});

/*router.get('/local', function(req, res, next) {
  var coveshows = new coveapi(cid);
  var options = { auth_using_headers: true };
  var url = 'http://api.pbs.org/cove/v1/programs/?filter_producer__name=KLRU';
  coveshows.request(url, options).
  then(function(data){
      res.render('local', { title: 'Austin SHOWS', atx: data });
  })
  .catch(function(e){
      console.error(e);
  })
  .done();


  // res.render('cove', { title: 'Klrubeta.org',
	// 	        Klru_post: posts
	// 	      });
});
*/

module.exports = router;
