// Define nonce that webpack should use for separately loaded chunks
const scriptElement = document.querySelector("script[nonce]");
if (scriptElement) {
  __webpack_nonce__ = scriptElement.nonce;
}

// Override the Function constructor with a version that uses inlined code if available 
const originalFunction = window.Function;
window.Function = function(...args) {
  const key = args.join(",");
  
  if (functions.has(key)) {
    return functions.get(key);
  }
  
  // In "training" mode, log expression to add to the map
  if (!scriptElement) {
    const code = args[args.length - 1];
    // Ignore the stats gatherer which isn't used in production mode
    if (code.indexOf("var StatisticsGatherer") == -1) {
      const snippet = `functions.set("${key}",\n  function(${args.slice(0, -1).join(',')}) {${code}});`
      console.warn(snippet);
    }
  }
  
  // Fall back to the original constructor (seem to be fine not use it as a constructor)
  return originalFunction.apply(null, args)
}


// Inlined versions of all the functions that would otherwise have to be evaled
const functions = new Map();
functions.set("$0,$0.addEventListener('items-changed', function(){ this.$server.updateSelectedTab(true); });",
  function($0) {$0.addEventListener('items-changed', function(){ this.$server.updateSelectedTab(true); });});
functions.set("$0,return (function() { this.validate = function () {return this.checkValidity();};}).apply($0)",
  function($0) {return (function() { this.validate = function () {return this.checkValidity();};}).apply($0)});
functions.set("$0,$1,$2,return (function() { this.$server['}p']($0, true, $1)}).apply($2)",
  function($0,$1,$2) {return (function() { this.$server['}p']($0, true, $1)}).apply($2)});
functions.set("event,element,return (event.shiftKey)",
  function(event,element) {return (event.shiftKey)});
functions.set("event,element,return (event.metaKey)",
  function(event,element) {return (event.metaKey)});
functions.set("event,element,return (event.detail)",
  function(event,element) {return (event.detail)});
functions.set("event,element,return (event.ctrlKey)",
  function(event,element) {return (event.ctrlKey)});
functions.set("event,element,return (event.clientX)",
  function(event,element) {return (event.clientX)});
functions.set("event,element,return (event.clientY)",
  function(event,element) {return (event.clientY)});
functions.set("event,element,return (event.altKey)",
  function(event,element) {return (event.altKey)});
functions.set("event,element,return (event.button)",
  function(event,element) {return (event.button)});
functions.set("event,element,return (event.screenY)",
  function(event,element) {return (event.screenY)});
functions.set("event,element,return (event.screenX)",
  function(event,element) {return (event.screenX)});
functions.set("$0,this.scrollPositionHandlerAfterServerNavigation($0);",
  function($0) {this.scrollPositionHandlerAfterServerNavigation($0);});
functions.set("$0,document.title = $0",
  function($0) {document.title = $0});
  