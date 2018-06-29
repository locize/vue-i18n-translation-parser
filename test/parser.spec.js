import { parse, stringify } from '../src/';


describe('vue-i18n translation parser', () => {

  describe('basic html parse / stringify', () => {
   var cu;

   before(() => {});

   var tests = [
     {args: ['test'], expected: 'test'},
     {args: ['<div>test</div>'], expected: '<div>test</div>'}
   ];

   tests.forEach((test) => {
     it('correctly parse and stringify back ' + JSON.stringify(test.args) + ' args', () => {
       expect(stringify(parse(test.args[0]))).to.eql(test.expected);
     });
   });
 });

 describe('basic html parse / stringify - with vue-i18n notation', () => {
  var cu;

  before(() => {});

  var tests = [
    {args: ['test {val} text %{encoded} some @:nesting.some help'], expected: 'test {val} text %{encoded} some @:nesting.some help'}
  ];

  tests.forEach((test) => {
    it('correctly parse and stringify back ' + JSON.stringify(test.args) + ' args', () => {
      expect(stringify(parse(test.args[0]))).to.eql(test.expected);
    });
  });
});

});
