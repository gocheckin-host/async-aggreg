var Router = require("Router");

var appRouter = new Router();

var http = require("http")();

var _ = require("lodash");

appRouter.get("/rawSessions", function(req,res) {
  var data = http.getJSON("http://spring-boot-hateoas.cfapps.io/sessions").then(function(response) {
    var result = _.map(response.body._embedded.sessions, function(session) {
      var presenters = http.getJSON(session._links.presenters.href).then(function(response) {
        return response.body._embedded.presenters;
      });
      return {session:session, presenters:presenters};
    });

    return result;
  });
  res.setBody(data);
});

var jsonmask = require("json-mask");
var wenn = require("wenn");

appRouter.get("/sessions", function(req,res) {
  var data = http.getJSON("http://spring-boot-hateoas.cfapps.io/sessions").then(function(response) {
    var result = _.map(response.body._embedded.sessions, function(session) {
      var presenters = http.getJSON(session._links.presenters.href).then(function(response) {
        return response.body._embedded.presenters;
      });

      return {session:session, presenters:presenters};
    });

    return result;
  });

  filteredData = wenn(data).then(function(data) {
    return _.map(data, function(obj) {
        return jsonmask(obj, "session/name,presenters/(firstName,lastName)");
    });
  });

  res.setBody(filteredData);
});

appRouter.get("/hello", function(req,res) {
  res.setBody({message: "Hello World!"});
});

appRouter.all('/*catchall', function(req,res) {
  var helloUrl = baseUrl.toString()+'/hello';
  res.setBody({
    links :[
    {title: 'Hello world', href: baseUrl+'/hello'},
    {title: 'Raw Sessions', href: baseUrl+'/rawSessions'},
    {title: 'Sessions', href: baseUrl + "/sessions"}
  ]});
});

module.exports = appRouter;
