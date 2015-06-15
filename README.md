# Async Aggregation
A Async Aggregation sample, using Spring, an example of module loading, and testing with Jasmine

An API Gateway application starts with [src/main/resources/app.js](src/main/resources/app.js). Here, a Router is defined, which is responsible for handling HTTP requests and generating responses. A Router with no defined routes would look like this:
 
```
var Router = require("Router");

var appRouter = new Router();
\\ Your routes would go here
module.exports = appRouter;
``` 

API Gateway application based on Spring Boot. Sometimes you'll want to write something in Java or use some pre-existing Java library. If you can write a Spring Bean that encapsulates what you want to do in Java, it's very easy to access that bean and call it in JavaScript.


Data Source:
[http://spring-boot-hateoas.cfapps.io/sessions](http://spring-boot-hateoas.cfapps.io/sessions)

Aggregation Result:
[http://async-aggreg.kolsch.mini.pez.pivotal.io/api/sessions](http://async-aggreg.kolsch.mini.pez.pivotal.io/api/sessions)