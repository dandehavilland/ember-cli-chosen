import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'option',

  attributeBindings: ['value', 'selected'],

  content: null,

  value: null,

  label: null,

  _willRender: function() {
    this.labelPathDidChange();
    this.valuePathDidChange();
  },

  selected: Ember.computed(function() {
    var value = this.get('value');
    var selection = this.get('selection');
    if (this.get('multiple')) {
      return selection && selection.indexOf(value) > -1;
    } else {
      // Primitives get passed through bindings as objects... since
      // `new Number(4) !== 4`, we use `==` below
      return value == this.get('parentValue'); // jshint ignore:line
    }
  }).property('content', 'selection'),

  labelPathDidChange: Ember.observer('optionLabelPath', function() {
    var labelPath = this.get('optionLabelPath');
    Ember.defineProperty(this, 'label', Ember.computed.alias(labelPath));
  }),

  valuePathDidChange: Ember.observer('optionValuePath', function() {
    var valuePath = this.get('optionValuePath');
    Ember.defineProperty(this, 'value', Ember.computed.alias(valuePath));
  })
});
