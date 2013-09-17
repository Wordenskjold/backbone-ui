// A mixin for dealing with glyphs in widgets 
(function(){

  var loadGlyph = function(name, size, bgSize){
    var div = $.el.span({
      className : 'glyph'
    });
    $(div).css({
      background : name,
      width : size + 'px',
      height : size + 'px',
      backgroundSize : bgSize
    });
    return div;
  };

  Backbone.UI.HasGlyph = {

    options : {
      // The pixel size of the width and height of a glyph
      glyphSize : 26,
      glyphPadding : 3,
      glyphBackgroundSize : 'auto'
    },
    
    insertGlyphLayout : function(glyphCss, glyphRightCss, content, parent) {

      // append left glyph
      if(glyphCss && (glyphCss !== "glyphCss")) {
        var glyphLeft = loadGlyph(glyphCss, this.options.glyphSize, this.options.glyphBackgroundSize);
        $(glyphLeft).css({
          paddingRight : this.options.glyphPadding + 'px'
        });
        parent.appendChild(glyphLeft);
      }
      
      // append content
      if(content) {
        parent.appendChild(content);
      }
      
      // append right glyph
      if(glyphRightCss && (glyphRightCss !== "glyphRightCss")) {
        var glyphRight = loadGlyph(glyphRightCss, this.options.glyphSize, this.options.glyphBackgroundSize);
        $(glyphRight).css({
          paddingLeft : this.options.glyphPadding + 'px'
        });
        parent.appendChild(glyphRight);
      }
     
    },

    resolveGlyph : function(model, content) {
      if(content === null) return null;
      var glyph = null;
      if(_(model).exists() && _((model.attributes || model)[content]).exists()) {
        glyph = this.resolveContent(model, content);
      }
      return _(glyph).exists() ? glyph : content;
    }
  };
}());
