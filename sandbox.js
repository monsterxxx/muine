//script will create new angular sandbox

var fs = require('fs');
var path = require('path');
//mkdirp was available in angular-seed project, but may be needed to install via 'npm install mkdirp'
var mkdirp = require("mkdirp");
//q was available in angular-seed project, but may be needed to install via 'npm install q'
var q = require('q');

var boxName = process.argv[2];
var boxDir = path.join(__dirname, 'app/sandbox', boxName);

console.log("Going to create sandbox directory");

// console.log(path.dirname(require.main.filename));
// console.log(__dirname);
// console.log(path.resolve(__dirname, 'app/sandbox'));
// console.log(path.join(__dirname, 'app/sandbox'));

//  console.log("Let's read newly written data");
//  fs.readFile('input.txt', function (err, data) {
//     if (err) {
//        return console.error(err);
//     }
//     console.log("Asynchronous read: " + data.toString());
//  });

mkdirp(boxDir, function(err){
  if (err) {
     return console.error(err);
  }
  console.log("Directory " + boxDir + " created successfully!");

  var deferred1 = q.defer();
  var deferred2 = q.defer();
  var deferred3 = q.defer();

  console.log('Going to write '+ boxName + '.html template file');

  var htmlName = boxName + '.html';
  var htmlDir = path.join(boxDir, htmlName);
  var htmlContent = '<div class="' + boxName + '-container">\n</div>'
  fs.writeFile(htmlDir, htmlContent,  function(err) {
    if (err) {
      deferred1.reject(err);
    }
    deferred1.resolve();
  });

  console.log('Going to write _'+ boxName + '.sass style file');

  var sassName = '_' + boxName + '.sass';
  var sassDir = path.join(boxDir, sassName);
  var sassContent = 'div.' + boxName + '-container'
  fs.writeFile(sassDir, sassContent,  function(err) {
    if (err) {
      deferred2.reject(err);
    }
    deferred2.resolve();
  });

  console.log('Going to write '+ boxName + '.js angular module file');

  var jsName = boxName + '.js';
  var jsDir = path.join(boxDir, jsName);
  var jsContent = "(function(){\n\n"
                + "'use strict';\n\n"
                + "angular.module('myApp." + boxName + "', [])\n\n"
                + ".config(['$stateProvider', function($stateProvider) {\n"
                + "  $stateProvider\n"
                + "  .state('" + boxName + "', {\n"
                + "    url: '/" + boxName + "',\n"
                + "    templateUrl: '" + boxName + "/" + boxName + ".html',\n"
                + "    controller: '" + boxName + "Ctrl'\n"
                + "  });\n"
                + "}])\n\n"
                + ".controller('" + boxName + "Ctrl', [function() {\n\n"
                + "}]);\n\n"
                + "})();\n\n";
  fs.writeFile(jsDir, jsContent,  function(err) {
    if (err) {
      deferred3.reject(err);
    }
    deferred3.resolve();
  });

  var deferredAll1 = q.all([
    deferred1.promise.then(console.log(htmlName + " written successfully!")),
    deferred2.promise.then(console.log(sassName + " written successfully!")),
    deferred3.promise.then(console.log(jsName + " written successfully!"))]);
  deferredAll1.then(console.log('all 3 files done!'));

  console.log('Going to append _sandbox.sass file');

  var sandboxSassDir = path.join(boxDir, '..', '_sandbox.sass');
  var sandboxSassContent = '\n@import ./' + boxName + '/' + boxName;
  fs.appendFile(sandboxSassDir, sandboxSassContent, function (err) {
    if (err) {
      console.log('error appending _sandbox.sass');
    }
    console.log('Import link was appended to _sandbox.sass!');
  });

  var jsdom = require("jsdom");
  var indexHtmlDir = path.join(__dirname, 'app/index.html');

  fs.readFile(indexHtmlDir, 'utf8', function(error, data) {
      jsdom.env(data, [], function (errors, window) {
          var $ = require('jquery')(window);
          // $("p").each(function () {
          //     var content = $(this).text();
          //     $(this).text(content + " modified!");
          // });
          $('ul.menu').append('  <li><a ui-sref="'+ boxName + '">'+ boxName + '</a></li>\n  ');
          $('body').append('  <script src="sandbox/'+ boxName + '/'+ boxName + '.js"></script>\n');
          var htmlPrefix = '<!DOCTYPE html>\n' +
            '<!--[if lt IE 7]>      <html lang="en" ng-app="myApp" class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->\n' +
            '<!--[if IE 7]>         <html lang="en" ng-app="myApp" class="no-js lt-ie9 lt-ie8"> <![endif]-->\n' +
            '<!--[if IE 8]>         <html lang="en" ng-app="myApp" class="no-js lt-ie9"> <![endif]-->\n' +
            '<!--[if gt IE 8]><!--> ';
          fs.writeFile(indexHtmlDir, htmlPrefix + window.document.documentElement.outerHTML,
                       function (error){
              if (error) throw error;
              console.log('index.html was appended!');
          });
      });
  });

  // var html = "<!doctype html><html><body><h1>Hello world!</h1></body></html>";

  /* parse the html and create a dom window */
  // var window = require('jsdom').jsdom(html, null, {
  //         // standard options:  disable loading other assets
  //         // or executing script tags
  //         FetchExternalResources: false,
  //         ProcessExternalResources: false,
  //         MutationEvents: false,
  //         QuerySelector: false
  // }).createWindow();

  // var jsdom = require("jsdom");
  // var window = jsdom.jsdom(html).defaultView;
  //
  // console.log(window.document.documentElement.outerHTML);
  // // output: "<html><head></head><body>hello world</body></html>"
  //
  // console.log(window.innerWidth);
  // // output: 1024
  //
  // console.log(typeof window.document.getElementsByClassName);
  // // outputs: function
  //
  // jsdom.jQueryify(window, "http://code.jquery.com/jquery-2.1.1.js", function () {
  //   window.$("body").append('<div class="testing">Hello World, It works</div>');
  //
  //   console.log(window.$(".testing").text());
  //   console.log(window.document.documentElement.outerHTML);
  // });



  // /* apply jquery to the window */
  // var $ = require('jquery').create(window);
  //
  // /* modify html using jquery */
  // $('h1').text('World hello!');
  // $('body').append('<p>Lorem ipsum...</p>');
  //
  // /* output the modified html with doctype */
  // console.log( window.document.doctype + window.document.innerHTML );

});
