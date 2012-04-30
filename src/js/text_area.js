(function(){
  window.Backbone.UI.TextArea = Backbone.View.extend({
    options : {
      className : 'text_area',

      // id to use on the actual textArea 
      textAreaId : null,

      // disables the text area
      disabled : false,
      
      enableScrolling : true,

      tabIndex : null 
    },

    // public accessors
    textArea : null,

    initialize : function() {
      this.mixin([Backbone.UI.HasGlyph, Backbone.UI.HasModel]);
      $(this.el).addClass('text_area');
    },

    render : function() {
      var value = (this.textArea && this.textArea.value.length) > 0 ? 
        this.textArea.value : this.resolveContent();

      $(this.el).empty();

      this.textArea = $.el.textarea({
        id : this.options.textAreaId,
        tabIndex : this.options.tabIndex, 
        placeholder : this.options.placeholder}, value);

      var content = this.textArea;
      if(this.options.enableScrolling) {
        this._scroller = new Backbone.UI.Scroller({
          content : this.textArea
        }).render();
        content = this._scroller.el;
      }

      // insert glyphs
      var contentEl = this.insertGlyphLayout(this.options.glyph,this.options.glyphRight,this.el);
      contentEl.appendChild(content);

      this.setEnabled(!this.options.disabled);

      $(this.textArea).keyup(_.bind(function() {
        _.defer(_(this._updateModel).bind(this));
      }, this));

      return this;
    },

    getValue : function() {
      return this.textArea.value;
    },

    setValue : function(value) {
      $(this.textArea).empty();
      this.textArea.value = value;
      this._updateModel();
    },

    // sets the enabled state
    setEnabled : function(enabled) {
      if(enabled) {
        $(this.el).removeClass('disabled');
      } else {
        $(this.el).addClass('disabled');
      }
      this.textArea.disabled = !enabled;
    },

    _updateModel : function() {
      _(this.model).setProperty(this.options.content, this.textArea.value);
    }
  });
}());
