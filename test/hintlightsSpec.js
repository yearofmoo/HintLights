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

  it('should wrap multiple replacements', function() {
    var inst = HintLights({
      wrapFn : function(line, code, data) {
        return '<' + data.tag + '>' + line + '</' + data.tag + '>';
      }
    });

    var replacements = [
      { pattern: /hello/, tag: 'strong' },
      { pattern: /little man/, tag: 'i' }
    ];

    var content = inst.render('hello little man', replacements);
    expect(content).toBe('<strong>hello</strong> <i>little man</i>');
  });

});
