// ==========================================================================
// Project:   Stik Labs - Stik testing environments
// Copyright: Copyright 2013-2014 Lukas Alexandre
// License:   Licensed under MIT license
//            See https://github.com/stikjs/stik-labs/blob/master/LICENSE
// ==========================================================================

// Version: 1.1.2 | From: 20-04-2014

window.stik.labs = {};

window.stik.labs.behavior = function behaviorLab( spec ){
  if ( !spec ) { throw "Stik: Behavior Lab needs an environment to run"; }
  if ( !spec.name ) { throw "Stik: Behavior Lab needs a name"; }
  if ( !spec.template ) { throw "Stik: Behavior Lab needs a template"; }

  var env = {},
      result;

  env.template = parseAsDOM();

  result = window.stik.$$manager.bindBehaviorWithTemplate(
    spec.name, env.template
  );

  env.run = function run( doubles ){
    result.context.load(
      result.executionUnit, mergeModules( doubles )
    );
  };

  function parseAsDOM(){
    var container = document.implementation.createHTMLDocument();
    container.body.innerHTML = spec.template;
    return container.body.firstChild;
  }

  function mergeModules( doubles ){
    for ( var dbl in doubles ) {
      result.modules[ dbl ] = window.stik.injectable({
        module: doubles[ dbl ]
      });
    }
    return result.modules;
  }

  return env;
};

window.stik.labs.boundary = function boundaryLab( spec ){
  if ( !spec ) { throw "Stik: Boundary Lab needs an environment to run"; }
  if ( !spec.name ) { throw "Stik: Boundary Lab needs a name"; }

  var env = {},
      boundary = window.stik.$$manager.getBoundary( spec.name );

  env.run = function run( doubles ){
    return boundary.to.resolve( asInjectables( doubles ) );
  };

  function asInjectables( doubles ){
    var injectableDoubles = {};

    for ( var dbl in doubles ) {
      injectableDoubles[ dbl ] = window.stik.injectable({
        module: doubles[ dbl ]
      });
    }

    return injectableDoubles;
  }

  return env;
};

window.stik.labs.controller = function controllerLab( spec ){
  if ( !spec ) { throw "Stik: Controller Lab needs an environment to run"; }
  if ( !spec.name ) { throw "Stik: Controller Lab needs a name"; }
  if ( !spec.action ) { throw "Stik: Controller Lab needs the action name"; }
  if ( !spec.template ) { throw "Stik: Controller Lab needs a template"; }

  var env = {},
      result;

  env.template = parseAsDOM();

  result = window.stik.$$manager.bindActionWithTemplate(
    spec.name, spec.action, env.template
  );

  env.run = function run( doubles ){
    result.context.load(
      result.executionUnit, mergeModules( doubles )
    );
  };

  function parseAsDOM(){
    var container = document.implementation.createHTMLDocument();
    container.body.innerHTML = spec.template;
    return container.body.firstChild;
  }

  function mergeModules( doubles ){
    for ( var dbl in doubles ) {
      result.modules[ dbl ] = window.stik.injectable({
        module: doubles[ dbl ]
      });
    }
    return result.modules;
  }

  return env;
};

window.stik.labs.helper = function helperLab( spec ){
  if ( !spec ) { throw "Stik: Helper Lab needs an environment to run"; }
  if ( !spec.name ) { throw "Stik: Helper Lab needs a name"; }

  var env = {},
      boundary = window.stik.labs.boundary( { name: "$h" } );

  env.run = function run( doubles ){
    var helpers = boundary.run( doubles );
    helpers.pushDoubles( doubles );
    return function(){
      return helpers[ spec.name ].apply( {}, arguments );
    };
    // helpers.cleanDoubles();
  };

  return env;
};

window.stik.labs.dom = function domLab( spec ){
  if ( !spec ) { throw "Stik: Helper Lab needs an environment to run"; }
  if ( !spec.name ) { throw "Stik: Helper Lab needs a name"; }

  var env = {},
      boundary = window.stik.labs.boundary( { name: "$dom" } );

  env.run = function run( doubles ){
    var methods = boundary.run( doubles );
    methods.pushDoubles( doubles );
    return function(){
      return methods[ spec.name ].apply( {}, arguments );
    };
  };

  return env;
};
