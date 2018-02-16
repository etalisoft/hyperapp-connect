var connections = {};

function create() {
  var current = [];

  // const connection = component => (...args) => component(...args, ...current);
  function connection(component) {
    return function() {
      return component.apply(component, [].slice.call(arguments).concat(current));
    };
  }

  // connection.hoa = app => (state, actions, view, container) =>
  //   app(state, actions, (...args) => (current = args) && app(state, actions, hov, container) , container);
  connection.hoa = function(app) {
    return function(state, actions, view, container) {
      function hov() {
        current = [].slice.call(arguments);
        return view.apply(view, current);
      }
      return app(state, actions, hov, container);
    };
  };

  return connection;
}

function connect(name) {
  return (connections[name] = connections[name] || create());
}

connect.keys = function() {
  return Object.keys(connections);
};

connect.delete = function(name) {
  delete connections[name];
};

export { connect };
