(function( labs ){
  labs.dom = function domLab( spec ){
    if ( !spec ) { throw "Stik: Helper Lab needs an environment to run"; }
    if ( !spec.name ) { throw "Stik: Helper Lab needs a name"; }

    var env = {},
        boundary = labs.boundary( { name: "$dom" } );

    env.run = function run( doubles ){
      var methods = boundary.run( doubles );
      methods.pushDoubles( doubles );
      return function(){
        return methods[ spec.name ].apply( {}, arguments );
      };
    };

    return env;
  };
})( window.stik.labs );
