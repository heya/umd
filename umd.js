if( typeof define === "function" )
	define( [ 'require', 'module' ],
    		function( require, module ) {
				return {
					usingAMD: require.undef && require.defined && require.specified && "requirejs" || true,

					isRequire: function( r ) {
						return typeof r === "function" && typeof r.toUrl === "function";
					},
				
					isModule: function( m ) {
						return typeof m === "object" && typeof m.id === "string" && require( m.id );
					}
				}
			}
	);
else if( require && module && exports ) {

	exports.usingCommonJS = require.cache && "node" || true;
	
	exports.isRequire = function( r ) {
		return typeof r === "function" && (
		   require.cache 
				? require.cache === r.cache 	// Node.js
				: require.paths === r.paths		// CommonJS Modules/1.1.1
		);
	}

	exports.isModule = function( m ) {
		return typeof m === "object" && (
			require.cache 
				? m.id in require.cache							// Node.js
				: typeof m.id === "string" && require( m.id )	// CommonJS Modules/1.1.1
		);
	}
}
else
	throw Error( "Loader type cannot be determined" );
