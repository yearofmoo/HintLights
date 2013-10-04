describe('Hintlights', function() {

  describe('configurations', function() {
    it('should accept and use the parser function', function() {
      var inst = HintLights({
        parseFn : function(content) {
          return content + "-123";
        }
      });

      expect(inst.render('hello', [])).toBe('hello-123');
    });

    it('should accept and use the wrapper function', function() {
      var inst = HintLights({
        wrapFn : function(line, code, data) {
          return '<strong>' + line + '</strong>';
        }
      });

      var replacements = [
        { pattern: /hello/, yes: 'no' }
      ];

      expect(inst.render('hello', replacements)).toBe('<strong>hello</strong>');
    });

    it('should pass the replacement data object into the wrapFn', function() {
      var interceptedData;
      var inst = HintLights({
        wrapFn : function(line, code, data) {
          interceptedData = data;
          return line;
        }
      });

      var replacements = [
        { pattern: /hello/, yes: 'no' }
      ];

      inst.render('hello', replacements);
      expect(interceptedData).toEqual(replacements[0]);
    });
  });

});
