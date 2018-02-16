import { connect } from '../src';

const app = (s, a, v, c) => {
  const next = (state, actions) => v(state, actions);
  next(s, a);
  return next;
};

afterEach(() => {
  connect.keys().forEach(k => connect.delete(k));
});

test('connect', () => {
  expect(Object.keys(connect)).toEqual(['keys', 'delete']);
});

test('connect(string)', () => {
  const cn = connect('test');
  expect(cn).toBeInstanceOf(Function);
  expect(Object.keys(cn)).toEqual(['hoa']);
});

test('connect.keys()', () => {
  expect(connect.keys).toBeInstanceOf(Function);
  expect(connect.keys()).toEqual([]);
  connect('test');
  expect(connect.keys()).toEqual(['test']);
});

test('connect.delete(string)', () => {
  connect('test');
  expect(connect.keys()).toEqual(['test']);
  connect.delete('test');
  expect(connect.keys()).toEqual([]);
});

test('connect(string).hoa(app)', () => {
  const { hoa } = connect('test');
  expect(hoa).toBeInstanceOf(Function);

  const view = jest.fn();
  const next = hoa(app)('state0', 'actions0', view, {});
  expect(view).toHaveBeenCalled();
  expect(view.mock.calls[0]).toEqual(['state0', 'actions0']);
  next('state1', 'actions1');
  expect(view.mock.calls[1]).toEqual(['state1', 'actions1']);
});

test('connect(string)(component)', () => {
  const cn = connect('test');

  const component = jest.fn();
  const view = jest.fn((...args) => [component('props', 'children'), cn(component)('props', 'children')]);

  const next = cn.hoa(app)('state0', 'actions0', view, {});
  expect(component.mock.calls[0]).toEqual(['props', 'children']);
  expect(component.mock.calls[1]).toEqual(['props', 'children', 'state0', 'actions0']);
  next('state1', 'actions1');
  expect(component.mock.calls[2]).toEqual(['props', 'children']);
  expect(component.mock.calls[3]).toEqual(['props', 'children', 'state1', 'actions1']);
});
