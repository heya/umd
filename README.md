# Reflection API for UMD modules [![Build Status](https://travis-ci.org/heya/umd.png?branch=master)](https://travis-ci.org/heya/umd)

Reflection API for UMD modules.

## What is UMD?

UMD is Universal Module Definition: a unification pattern that allows Javascript modules to work in both the [AMD](http://en.wikipedia.org/wiki/Asynchronous_module_definition) (e.g. [requirejs](http://requirejs.org/)) and the [CommonJS](http://en.wikipedia.org/wiki/CommonJS) (e.g. [Node.js](http://nodejs.org/)) environments. Various implementations of this pattern can be found [here](https://github.com/umdjs/umd), [here](http://dontkry.com/posts/code/browserify-and-the-universal-module-definition.html) and [here](http://know.cujojs.com/tutorials/modules/authoring-umd-modules).

Heya suggests -- and uses internally in its libraries -- a relatively simple implementation of UMD intended to support the basic level of AMD as well as Node.js:

```
(typeof define=="function" && define
  ||
 function(d,f,m){
   m={ module:module, require:require};
   module.exports=f.apply( null, d.map(
     function(n){ return m[n] || require(n) }
   ))
 }
)
```

It takes place of the simple `define` in AMD and, when compacted into a single line of code, can be easily replaced by an optimizer tool when preparing 
a build for browser-based AMD loader.

## What is this library?

This library provides a simple reflection API that UMD modules can use to determine the environment they've been loaded into and some of its properties.

## How to install

If you plan to use `heya-umd` in your [node.js](http://nodejs.org) project install it
like this:

```
npm install heya-umd
```

For your browser-based projects I suggest using [volo.js](http://volojs.org):

```
volo install heya/umd heya-umd
```

## Documentation

Module `heya-umd` provides the following properties and functions:

### usingAMD

A simple property set to an implementation dependent truthy value when loaded in AMD environment. Iit could, but is not guaranteed to, be a string identifying the 
specific AMD loader in use such as `"requirejs"`.

### usingCommonJS

A simple property set to an implementation dependent truthy value when loaded in CommonJS environment. Iit could, but is not guaranteed to, be a string identifying 
the specific CommonJS loader in use such as `"node"`.

### isRequire()

A predicate function that checks whether its argument is a valid (or valid-looking, where exact determination cannot be made) `require()` function provided by the
loader.

### isModule()

A predicate function that checks whether its argument is a valid (or valid-looking, where exact determination cannot be made) `module` object provided by the
loader.

## Example

```
/* UMD.define */ (typeof define=="function"&&define||function(d,f,m){m={module:module,require:require};module.exports=f.apply(null,d.map(function(n){return m[n]||require(n)}))})
( [ 'module', 'require', 'heya/umd' ], 
  function( module, require, umd ) {
    var loader = typeof umd.usingAMD == "string" && umd.usingAMD ||
                 umd.usingAMD && "AMD" ||
                 typeof umd.usingCommonJS == "string" && umd.usingCommonJS ||
                 umd.usingCommonJS && "CommonJS" ||
                 "unknown";

    console.log( "Loader: " + loader );

    console.log( "require() is " + ( umd.isRequire( require ) ? "recognized" : "not recognized" );
    console.log( "module is " + ( umd.isModule( module ) ? "recognized" : "not recognized" );
  }
)
```
