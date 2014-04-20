##Stik Labs
Stik comes with a collection of utilities, called Labs, that allows you to write automated tests for your components.

Labs are framework agnostic, which means that they can be written using [jasmine](http://jasmine.github.io/edge/introduction.html), [QUnit](https://qunitjs.com/), or any other assertion library out there.

###Controller Lab

```javascript
// this controller might be defined in your star_wars_ctrl.js file
stik.controller("StarWarsCtrl", "Dialog", function($viewBag){
  $viewBag.push({
    luke: "You killed my father",
    vader: "Luke, I'm your father"
  });
});

// and this in your specs/controllers/star_wars_ctrl_spec.js
it("should push data to the template", function(){
  var template, lab;

  template = "<div data-controller=\"StarWarsCtrl\" data-action=\"Dialog\">" +
    "<span class=\"luke\" data-key=\"luke\"></span>" +
    "<span class=\"vader\" data-key=\"vader\"></span>" +
  "</div>";

  lab = stik.labs.controller({
    name: "StarWarsCtrl",
    action: "Dialog",
    template: template
  });
  lab.run();

  expect(
    lab.template.getElementsByClassName("luke")[0].textContent
  ).toEqual("You killed my father");

  expect(
    lab.template.getElementsByClassName("vader")[0].textContent
  ).toEqual("Luke, I'm your father");
});
```

###Behavior Lab
```javascript
// this behavior might be defined in your lightsaber-sparks.js file
stik.behavior( "lightsaber-sparks", function( $template ){
  $template.className += " sparkling";
});

// and this in your specs/behaviors/lightsaber_sparks_spec.js
it("should run the specified behavior", function(){
  var template, lab;

  template = "<span class=\"lightsaber-sparks\"></span>";

  lab = stik.labs.behavior({
    name: "lightsaber-sparks",
    template: template
  });
  lab.run();

  expect(
    lab.template.className
  ).toEqual( "lightsaber-sparks sparkling" );
});
```

###Boundary Lab
```javascript
// this boundary might be defined in your stik_data.js file
stik.boundary({
  as: "$data",
  resolvable: true,
  to: function( $template ){
    var attrs = {}, name;

    for ( attr in $template.attributes ) {
      if ( $template.attributes[ attr ].value ) {
        name = $template.attributes[ attr ].name
        attrs[ parseName( name ) ] =
          $template.attributes[ attr ].value;
      }
    }

    function parseName( name ){
      return name.match(/(data-)(.+)/)[ 2 ];
    }

    return attrs;
  }
});

// and this in your specs/boundaries/stik_params_spec.js
it("should retrieve one attribute from the template", function(){
  var template = document.createElement("div"),
      result;

  template.setAttribute("data-id", "$081209j09urr123");

  result = stik.labs.boundary({
    name: "$data"
  }).run({
    $template: template
  });

  expect(result).toEqual( { id: "$081209j09urr123" } );
});
```

###Helper Lab
```javascript
stik.helper( "hasClass", function(){
  return function( elm, selector ){
    var className = " " + selector + " ";
    return ( " " + elm.className + " " ).
      replace( /[\n\t]/g, " " ).
      indexOf( className ) > -1;
  }
});

var elm = document.createElement("div");
elm.className = "not-active";

var hasClassHelper = stik.labs.helper({
  name: "hasClass"
}).run();

expect(hasClassHelper(elm, "active")).toBeFalsy();
```

###Mocks and Stubs
Eventually your components might depend on external services or have expensive operations. For those situations every Lab provides an interfaces for you to inject doubles instead of the real entities.

For more information on Mocks and Stubs please read [Mocks Aren't Stubs](http://martinfowler.com/articles/mocksArentStubs.html). And for a more in depth look at how to write testable software be sure to read this awesome book [Growing Object-Oriented Software, Guided by Tests](http://www.amazon.com/Growing-Object-Oriented-Software-Guided-Tests/dp/0321503627/ref=sr_1_1?ie=UTF8&qid=1393900349&sr=8-1&keywords=growing+object-oriented+software+guided+by+tests)

```javascript
// create your mock that will be injected
var viewBagMock = jasmine.createObjSpy('viewBagMock', ['push']);
// this can be created with any mocking library

lab = stik.labs.controller({
  name: "StarWarsCtrl",
  action: "Dialog",
  template: template
});
lab.run({
  // here you can specify all your mocks and/or stubs
  // that should replace the real entity
  $viewBag: viewBagMock
});

expect(viewBagMock.push).toHaveBeenCalledWith({/* ... */})
```
