var HintLights = function(config) {

  var noop = function(v){ return v };

  config = config || {};
  var parser = config.parseFn || noop;
  var wrapper = config.wrapFn || noop;

  return {
    render : function(rawCode, replacements) {
      var registry = {},
          x = 0;

      for(var i = 0; i < replacements.length; i++) {
        var data = replacements[i];
        rawCode = rawCode.replace(data.pattern, function(_) {
          var key = 'REPLACEME' + (x++) + '_';
          var html = wrapper(_, rawCode, data);
          registry[key] = html;
          return key;
        });
      }

      var parsedCode = parser(rawCode);
      for(var i in registry) {
        parsedCode = parsedCode.replace(i, registry[i]);
      }

      return parsedCode;
    }
  }
};
