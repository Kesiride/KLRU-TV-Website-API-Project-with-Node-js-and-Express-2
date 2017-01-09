var express = require('express');                                                                                                      
var path = require('path');                                                                                                            
var router = require('express').Router();                                                                                              
var Promise = require('bluebird');                                                                                                     
var coveapi = require('cove-api');     

var completeUrl = videosUrl+name+append;
Promise.all([
    local_prods.request(url, options),
    local_prods.request(completeUrl, options)
]).
then(function(data){

}).
catch(function(e){
    console.error(e)
}).
done();
