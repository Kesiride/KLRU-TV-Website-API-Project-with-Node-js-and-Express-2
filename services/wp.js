var WP = require( 'wordpress-rest-api' );
var site = new WP({ endpoint: 'http://www.klrubeta.org/wp-json' });

//Requesting posts                                                                                                                                                                                                                                                            
var posts = site.posts().get(function( err, data ) {
    if ( err ) {
        // handle err                                                                                                                                                                                                                                                         
        console.log("We apologise for the inconvenience");
    }
    // do something with the returned posts                                                                                                                                                                                                                                   
    console.log("Title: " +  data[0].title.rendered);
    console.log('Description: ' + data[0].excerpt.rendered);
});

//console.log(posts[0].title.rendered);
