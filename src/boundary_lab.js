window.stik.labs.boundary = function boundaryLab( spec ){
  if ( !spec ) { throw "Stik: Boundary Lab needs an environment to run"; }
  if ( !spec.name ) { throw "Stik: Boundary Lab needs a name"; }

  var env = {},
      boundary = window.stik.$$manager.getBoundary( spec.name );

  env.run = function run( doubles ){
    return boundary.to.resolve( mergeModules( doubles ) );
  };

  function mergeModules( doubles ){
    var modules = window.stik.$$manager.boundariesFor( "behavior" );

    for ( var dbl in doubles ) {
      modules[ dbl ] = window.stik.injectable({
        module: doubles[ dbl ]
      });
    }

    return modules;
  }

  return env;
};
