import { astStats, parse } from '../src/';


describe('vue-i18n translation parser', () => {

  describe('astStats', () => {
    var cu;

    before(() => {});

    var tests = [
      {args: ['test'], expected: {format: 0, link: 0, tags: 0}},
      {args: ['<div>test</div>'], expected: {format: 0, link: 0, tags: 1}},
      {args: ['test {val} text %{encoded} some @:nesting.some help'], expected: {format: 2, link: 1, tags: 0}}
    ];

    tests.forEach((test) => {
      it('correctly calcs stats ' + JSON.stringify(test.args) + ' args', () => {
        expect(astStats(parse(test.args[0]))).to.eql(test.expected);
      });
    });
  });
});
