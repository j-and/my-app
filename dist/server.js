module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _server = __webpack_require__(2);

	var _reactRouter = __webpack_require__(3);

	var _index = __webpack_require__(4);

	var _index2 = _interopRequireDefault(_index);

	var _template = __webpack_require__(30);

	var _template2 = _interopRequireDefault(_template);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var bodyParser = __webpack_require__(31);

	var express = __webpack_require__(32);
	var server = express();
	var mysql = __webpack_require__(33);

	server.use(bodyParser.json()); // support json encoded bodies
	server.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

	server.use('/assets', express.static('assets'));

	server.get('/', function (req, res) {
	    var context = {};
	    var appString = (0, _server.renderToString)(_react2.default.createElement(
	        _reactRouter.StaticRouter,
	        { location: req.url, context: context },
	        _react2.default.createElement(_index2.default, null)
	    ));

	    res.send((0, _template2.default)({
	        body: appString,
	        title: 'My-app'
	    }));
	});
	server.get('/clients', function (req, res) {
	    var context = {};
	    var appString = (0, _server.renderToString)(_react2.default.createElement(
	        _reactRouter.StaticRouter,
	        { location: req.url, context: context },
	        _react2.default.createElement(_index2.default, null)
	    ));

	    res.send((0, _template2.default)({
	        body: appString,
	        title: 'My-app'
	    }));
	});

	var config = {
	    host: "localhost",
	    user: "root",
	    password: "root",
	    database: "my_db"
	};

	var Database = function () {
	    function Database(config) {
	        _classCallCheck(this, Database);

	        this.connection = mysql.createConnection(config);
	    }

	    _createClass(Database, [{
	        key: 'query',
	        value: function query(sql, args) {
	            var _this = this;

	            return new Promise(function (resolve, reject) {
	                _this.connection.query(sql, args, function (err, rows) {
	                    if (err) throw err; //return reject(err);
	                    resolve(rows);
	                });
	            });
	        }
	    }, {
	        key: 'close',
	        value: function close() {
	            var _this2 = this;

	            return new Promise(function (resolve, reject) {
	                _this2.connection.end(function (err) {
	                    if (err) throw err; //if (err) return reject(err);
	                    resolve();
	                });
	            });
	        }
	    }]);

	    return Database;
	}();

	server.post('/addRegister', function (req, res) {
	    var database = new Database(config);
	    var client_id;
	    database.query("SELECT * FROM my_db.clients WHERE name= " + mysql.escape(req.body.name)).then(function (result) {
	        if (result.length != 0) {
	            client_id = result[0].client_id;
	        }
	        return client_id;
	    }).then(function (client_id) {
	        var valuesClient = [[req.body.name, null, req.body.datetime, null, null, null]];
	        database.query("INSERT INTO clients (name, desease, birthdate, phone, email, description) VALUES ?", [valuesClient]);
	    }).then(function (res) {
	        return database.query("SELECT client_id FROM clients WHERE name= " + mysql.escape(req.body.name));
	    }).then(function (rows) {
	        client_id = rows[0].client_id;
	        return client_id;
	    }).then(function () {
	        var valuesRegisters = [[req.body.datetime, req.body.name, 'busy', client_id]];
	        database.query("INSERT INTO registers (dateTime, name, status,client_id) VALUES ?", [valuesRegisters]);
	    }).then(function () {
	        var valuesVisit = [[req.body.name, req.body.datetime, 'comment', 50, client_id]];
	        database.query("INSERT INTO visits (name, datetime, comment, payment,client_id) VALUES ?", [valuesVisit]);
	        return database.close();
	    });
	});

	server.post('/addClient', function (req, res) {
	    var database = new Database(config);
	    var client_id;
	    database.query("SELECT * FROM my_db.clients WHERE name= " + mysql.escape(req.body.name)).then(function (result) {
	        if (result.length != 0) {
	            client_id = result[0].client_id;
	        }
	        return client_id;
	    }).then(function (client_id) {
	        if (!client_id) {
	            var valuesClient = [[req.body.name, null, req.body.datetime, null, null, null]];
	            database.query("INSERT INTO clients (name, desease, birthdate, phone, email, description) VALUES ?", [valuesClient]);
	        }
	        return database.close();
	    });

	    res.send('Response from server');
	});

	server.post('/editClient', function (req, res) {
	    var database = new Database(config);
	    database.query("UPDATE my_db.clients SET desease = " + mysql.escape(req.body.desease) + ", birthdate=" + mysql.escape(req.body.birthdate) + ", phone=" + mysql.escape(req.body.phone) + ", email=" + mysql.escape(req.body.email) + ", description=" + mysql.escape(req.body.description) + " WHERE name = " + mysql.escape(req.body.name)).then(function () {
	        return database.close();
	    });
	    res.send('Response from server');
	});

	server.get('/clearRegistersDB', function (req, res) {
	    var database = new Database(config);
	    database.query("DELETE FROM registers").then(function () {
	        return database.close();
	    });
	    res.send('Response from server');
	});

	server.post('/removeRegister', function (req, res) {
	    var con = mysql.createConnection({
	        host: "localhost",
	        user: "root",
	        password: "root",
	        database: "my_db"
	    });
	    con.connect(function (err) {
	        if (err) throw err;
	        con.query("DELETE FROM registers WHERE datetime=" + mysql.escape(req.body.datetime) + "AND name=" + mysql.escape(req.body.name), function (err, result) {
	            if (err) throw err;
	            con.query("SELECT * FROM registers", function (err, result) {
	                if (err) throw err;
	                res.send(result);
	            });
	        });
	    });
	});

	server.get('/setMockRegistersData', function (req, res) {

	    var values = [['2018-08-02 08.00', 'John Doe', 'busy'], ['2018-08-02 09.00', 'John Doe', 'busy'], ['2018-08-06 10.00', 'John Doe', 'busy'], ['2018-08-06 11.00', 'John Doe', 'busy'], ['2018-08-06 12.00', 'John Doe', 'busy'], ['2018-08-07 13.00', 'John Doe', 'busy'], ['2018-08-07 14.00', 'John Doe', 'busy']];

	    var con = mysql.createConnection({
	        host: "localhost",
	        user: "root",
	        password: "root",
	        database: "my_db"
	    });

	    con.query("INSERT INTO registers (dateTime, name, status) VALUES ?", [values], function (err, result) {
	        if (err) throw err;
	    });
	});

	server.get('/getRegisters', function (req, res) {
	    var database = new Database(config);
	    database.query("SELECT * FROM registers").then(function (result) {
	        res.send(result);
	    }).then(function (result) {
	        return database.close();
	    });
	});

	server.post('/getVisits', function (req, res) {
	    var database = new Database(config);
	    database.query("SELECT * FROM visits WHERE name = " + mysql.escape(req.body.name)).then(function (result) {
	        res.send(result);
	    }).then(function (result) {
	        return database.close();
	    });
	});

	server.get('/getClients', function (req, res) {
	    var database = new Database(config);
	    database.query("SELECT * FROM clients").then(function (result) {
	        res.send(result);
	    }).then(function (result) {
	        return database.close();
	    });
	});

	server.post('/switchClient', function (req, res) {
	    var database = new Database(config);
	    database.query("SELECT * FROM `my_db`.`clients` WHERE `name`=" + mysql.escape(req.body.name)).then(function (result) {
	        res.send(result);
	    }).then(function (result) {
	        return database.close();
	    });
	});

	server.listen(3000);

/***/ }),
/* 1 */
/***/ (function(module, exports) {

	module.exports = require("react");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	module.exports = require("react-dom/server");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

	module.exports = require("react-router");

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _Clients = __webpack_require__(5);

	var _Clients2 = _interopRequireDefault(_Clients);

	var _Calendar = __webpack_require__(18);

	var _Calendar2 = _interopRequireDefault(_Calendar);

	var _reactRouterDom = __webpack_require__(26);

	var _Navbar = __webpack_require__(27);

	var _Navbar2 = _interopRequireDefault(_Navbar);

	var _Nav = __webpack_require__(28);

	var _Nav2 = _interopRequireDefault(_Nav);

	var _FormControl = __webpack_require__(8);

	var _FormControl2 = _interopRequireDefault(_FormControl);

	var _FormGroup = __webpack_require__(29);

	var _FormGroup2 = _interopRequireDefault(_FormGroup);

	var _Button = __webpack_require__(6);

	var _Button2 = _interopRequireDefault(_Button);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var App = function (_Component) {
	    _inherits(App, _Component);

	    function App(props) {
	        _classCallCheck(this, App);

	        var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

	        _this.state = {
	            isOpen: '' //,true
	        };
	        _this.toggleModal = _this.toggleModal.bind(_this);
	        return _this;
	    }

	    _createClass(App, [{
	        key: 'toggleModal',
	        value: function toggleModal() {
	            this.setState({
	                isOpen: !this.state.isOpen
	            });
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            return _react2.default.createElement(
	                'div',
	                null,
	                _react2.default.createElement(
	                    _Navbar2.default,
	                    null,
	                    _react2.default.createElement(
	                        _Navbar2.default.Header,
	                        null,
	                        _react2.default.createElement(
	                            _Navbar2.default.Brand,
	                            null,
	                            _react2.default.createElement(
	                                'a',
	                                { href: '#' },
	                                'My-app'
	                            )
	                        )
	                    ),
	                    _react2.default.createElement(
	                        _Nav2.default,
	                        null,
	                        _react2.default.createElement(
	                            'li',
	                            null,
	                            _react2.default.createElement(
	                                _reactRouterDom.NavLink,
	                                { to: '/' },
	                                'Home'
	                            )
	                        ),
	                        _react2.default.createElement(
	                            'li',
	                            null,
	                            _react2.default.createElement(
	                                _reactRouterDom.NavLink,
	                                { to: '/clients' },
	                                'Clients'
	                            )
	                        )
	                    ),
	                    _react2.default.createElement(
	                        _Navbar2.default.Form,
	                        { pullLeft: true },
	                        _react2.default.createElement(
	                            _FormGroup2.default,
	                            null,
	                            _react2.default.createElement(_FormControl2.default, { type: 'text', placeholder: 'Search' })
	                        ),
	                        ' ',
	                        _react2.default.createElement(
	                            _Button2.default,
	                            { type: 'submit' },
	                            'Submit'
	                        )
	                    )
	                ),
	                _react2.default.createElement(
	                    _reactRouterDom.Switch,
	                    null,
	                    _react2.default.createElement(_reactRouterDom.Route, { exact: true, path: '/', component: _Calendar2.default }),
	                    _react2.default.createElement(_reactRouterDom.Route, { path: '/clients', component: _Clients2.default })
	                )
	            );
	        }
	    }]);

	    return App;
	}(_react.Component);

	exports.default = App;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _Button = __webpack_require__(6);

	var _Button2 = _interopRequireDefault(_Button);

	var _ClientsCard = __webpack_require__(7);

	var _ClientsCard2 = _interopRequireDefault(_ClientsCard);

	var _ClientsHistory = __webpack_require__(12);

	var _ClientsHistory2 = _interopRequireDefault(_ClientsHistory);

	var _ClientsList = __webpack_require__(17);

	var _ClientsList2 = _interopRequireDefault(_ClientsList);

	var _moment = __webpack_require__(11);

	var _moment2 = _interopRequireDefault(_moment);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Client = function (_Component) {
	    _inherits(Client, _Component);

	    function Client(props) {
	        _classCallCheck(this, Client);

	        var _this = _possibleConstructorReturn(this, (Client.__proto__ || Object.getPrototypeOf(Client)).call(this, props));

	        _this.state = {
	            client: {},
	            CLIENTS: [],
	            VISITS: [],
	            editable: true,
	            isAdded: true
	        };
	        _this.changeClient = _this.changeClient.bind(_this);
	        _this.fillForm = _this.fillForm.bind(_this);
	        _this.switchClient = _this.switchClient.bind(_this);
	        return _this;
	    }

	    _createClass(Client, [{
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            var _this2 = this;

	            fetch('/getClients', {
	                method: 'GET'
	            }).then(function (response) {
	                response.json().then(function (data) {
	                    _this2.setState({ CLIENTS: data });
	                });
	            });
	        }
	    }, {
	        key: 'switchClient',
	        value: function switchClient(clientName) {
	            var _this3 = this;

	            var client = {
	                name: clientName
	            };
	            fetch('/switchClient', {
	                method: "POST",
	                body: JSON.stringify(client),
	                headers: {
	                    "Content-Type": "application/json"
	                }
	            }).then(function (response) {
	                response.json().then(function (data) {
	                    _this3.setState({ client: data[0] });
	                    _this3.setState({ editable: false });
	                });
	            });
	            fetch('/getVisits', {
	                method: "POST",
	                body: JSON.stringify(client),
	                headers: {
	                    "Content-Type": "application/json"
	                }
	            }).then(function (response) {
	                response.json().then(function (data) {
	                    _this3.setState({ VISITS: data });
	                });
	            });
	        }
	    }, {
	        key: 'changeClient',
	        value: function changeClient(clients) {
	            var oldArray = this.state.CLIENTS;
	            if (clients.length) {
	                for (var i = 0; i < oldArray.length; i++) {
	                    if (oldArray[i]) {
	                        if (oldArray[i].name == clients[0].name) {
	                            delete oldArray[i];
	                        }
	                    } else {
	                        i++;
	                    }
	                }
	            }
	            clients = clients.concat(oldArray);
	            this.setState({ CLIENTS: clients });
	            this.setState({ editable: false });
	            this.setState({ isAdded: false });
	            this.setState({ client: false });
	        }
	    }, {
	        key: 'fillForm',
	        value: function fillForm() {
	            var birthdate = this.state.client.birthdate ? this.state.client.birthdate : new Date();
	            birthdate = (0, _moment2.default)(birthdate).format('YYYY-MM-DD');
	            document.getElementById('clientName').value = this.state.client.name;
	            document.getElementById('clientDesease').value = this.state.client.desease;
	            document.getElementById('clientBirthdate').value = birthdate;
	            document.getElementById('clientPhone').value = this.state.client.phone;
	            document.getElementById('clientEmail').value = this.state.client.email;
	            document.getElementById('clientDescription').value = this.state.client.description;
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var _this4 = this;

	            var showEditBtn = this.state.client.name ? '' : 'disabled';

	            return _react2.default.createElement(
	                'div',
	                null,
	                _react2.default.createElement(
	                    'div',
	                    { className: 'col-sm-3' },
	                    _react2.default.createElement(_ClientsList2.default, { switchClient: this.switchClient, CLIENTS: this.state.CLIENTS }),
	                    _react2.default.createElement(
	                        _Button2.default,
	                        { bsStyle: 'success', value: 'Add', onClick: function onClick() {
	                                _this4.setState({ editable: true });
	                                _this4.setState({ isAdded: true });_this4.setState({ client: {} });
	                            } },
	                        'Add new'
	                    ),
	                    _react2.default.createElement(
	                        _Button2.default,
	                        { bsSize: 'xsmall', bsStyle: 'success', className: showEditBtn, value: 'Edit', onClick: function onClick() {
	                                _this4.setState({ isAdded: false });
	                                _this4.setState({ editable: true });_this4.fillForm();
	                            } },
	                        'Edit client'
	                    )
	                ),
	                _react2.default.createElement(
	                    'div',
	                    { className: 'col-sm-6' },
	                    _react2.default.createElement(_ClientsCard2.default, { client: this.state.client,
	                        changeClient: this.changeClient,
	                        CLIENTS: this.state.CLIENTS,
	                        editable: this.state.editable,
	                        isAdded: this.state.isAdded })
	                ),
	                _react2.default.createElement(
	                    'div',
	                    { className: 'col-sm-3' },
	                    _react2.default.createElement(_ClientsHistory2.default, { client: this.state.client,
	                        VISITS: this.state.VISITS })
	                )
	            );
	        }
	    }]);

	    return Client;
	}(_react.Component);

	exports.default = Client;

/***/ }),
/* 6 */
/***/ (function(module, exports) {

	module.exports = require("react-bootstrap/lib/Button");

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _Button = __webpack_require__(6);

	var _Button2 = _interopRequireDefault(_Button);

	var _FormControl = __webpack_require__(8);

	var _FormControl2 = _interopRequireDefault(_FormControl);

	var _methods = __webpack_require__(9);

	var _moment = __webpack_require__(11);

	var _moment2 = _interopRequireDefault(_moment);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var ClientsCard = function (_Component) {
	    _inherits(ClientsCard, _Component);

	    function ClientsCard(props) {
	        _classCallCheck(this, ClientsCard);

	        var _this = _possibleConstructorReturn(this, (ClientsCard.__proto__ || Object.getPrototypeOf(ClientsCard)).call(this, props));

	        _this.state = {
	            client: {},
	            clients: [],
	            editable: false,
	            clientName: '',
	            clientBirthdate: (0, _moment2.default)(new Date()).format('YYYY-MM-DD'),
	            clientDesease: '',
	            clientPhone: '',
	            clientEmail: '',
	            clientDescription: ''
	        };
	        _this.clearForm = _this.clearForm.bind(_this);
	        _this.handleInputChange = _this.handleInputChange.bind(_this);
	        _this.handleSubmit = _this.handleSubmit.bind(_this);
	        _this.saveClient = _this.saveClient.bind(_this);
	        _this.saveEditedClient = _this.saveEditedClient.bind(_this);
	        return _this;
	    }

	    _createClass(ClientsCard, [{
	        key: 'handleInputChange',
	        value: function handleInputChange(event) {
	            var target = event.target;
	            var value = target.value;
	            var name = target.name;
	            this.setState(_defineProperty({}, name, value));
	        }
	    }, {
	        key: 'saveClient',
	        value: function saveClient() {
	            var name = this.state.clientName;
	            var birthdate = this.state.clientBirthdate ? this.state.clientBirthdate : new Date();
	            var desease = this.state.clientDesease ? this.state.clientDesease : '';
	            var phone = this.state.clientPhone ? this.state.clientPhone : '';
	            var email = this.state.clientEmail ? this.state.clientEmail : '';
	            var description = this.state.clientDescription ? this.state.clientDescription : '';
	            var newClient = {
	                /*client_id is auto generated in db*/
	                //client_id:'idididi',
	                name: name,
	                birthdate: birthdate,
	                desease: desease,
	                phone: phone,
	                email: email,
	                description: description
	            };
	            var newArray = this.state.clients;
	            newArray.push(newClient);
	            this.setState({ clients: newArray });
	            (0, _methods.sendData)(newClient, '/addClient');
	            this.props.changeClient(this.state.clients);
	            this.clearForm(newClient);
	        }
	    }, {
	        key: 'saveEditedClient',
	        value: function saveEditedClient() {
	            var name = this.state.clientName ? this.state.clientName : this.props.client.name;
	            var birthdate = this.state.clientBirthdate ? this.state.clientBirthdate : this.props.client.birthdate;
	            var desease = this.state.clientDesease ? this.state.clientDesease : this.props.client.desease;
	            var phone = this.state.clientPhone ? this.state.clientPhone : this.props.client.phone;
	            var email = this.state.clientEmail ? this.state.clientEmail : this.props.client.email;
	            var description = this.state.clientDescription ? this.state.clientDescription : this.props.client.description;
	            var newClient = {
	                /*client_id is auto generated in db*/
	                //client_id:'idididi',
	                name: name,
	                birthdate: (0, _methods.dateToTimestamp)(birthdate),
	                desease: desease,
	                phone: phone,
	                email: email,
	                description: description
	            };
	            (0, _methods.sendData)(newClient, '/editClient');
	            this.setState({ clients: [] });
	            this.props.changeClient(this.state.clients);
	            this.clearForm(newClient);
	        }
	    }, {
	        key: 'clearForm',
	        value: function clearForm(newClient) {
	            this.refs.registerForm.reset();
	            this.setState({ client: {} });
	            this.setState({ clients: [] });
	            this.setState({ clientName: '' });
	            this.setState({ clientDesease: '' });
	            this.setState({ clientBirthdate: (0, _methods.dateToTimestamp)(new Date()) });
	            this.setState({ clientPhone: '' });
	            this.setState({ clientEmail: '' });
	            this.setState({ clientDescription: '' });
	        }
	    }, {
	        key: 'handleSubmit',
	        value: function handleSubmit(event) {
	            event.preventDefault();
	            if (this.props.isAdded) {
	                this.saveClient();
	            } else {
	                this.saveEditedClient();
	            }
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var client = this.props.client;

	            if (this.props.editable) {
	                var className = '';
	                var birthdateDateInput = '';
	                var birthdateTextInput = 'disabled';
	                var showSaveBtn = '';
	            } else {
	                if (this.state.editable && this.props.isAdded) {
	                    className = '';
	                    birthdateDateInput = '';
	                    birthdateTextInput = 'disabled';
	                    showSaveBtn = '';
	                } else {
	                    className = 'view-form';
	                    birthdateDateInput = 'disabled';
	                    birthdateTextInput = '';
	                    showSaveBtn = 'disabled';
	                }
	            }

	            if (this.props.client.birthdate) {
	                var birthdate = (0, _moment2.default)(this.props.client.birthdate).format('MM/DD/YYYY');
	            }

	            return _react2.default.createElement(
	                'div',
	                null,
	                _react2.default.createElement(
	                    'h2',
	                    null,
	                    ' Clients card ',
	                    client.name,
	                    client.client_id
	                ),
	                _react2.default.createElement(
	                    'form',
	                    { ref: 'registerForm', className: className, onSubmit: this.handleSubmit },
	                    _react2.default.createElement(
	                        'label',
	                        null,
	                        'Name'
	                    ),
	                    _react2.default.createElement(_FormControl2.default, { type: 'text', label: 'Name', placeholder: client.name, onChange: this.handleInputChange,
	                        id: 'clientName', name: 'clientName' }),
	                    _react2.default.createElement(
	                        'div',
	                        { className: 'col-xs-6 client_col_left' },
	                        _react2.default.createElement(
	                            'label',
	                            null,
	                            'Desease'
	                        ),
	                        _react2.default.createElement(_FormControl2.default, { type: 'text', label: 'Desease', placeholder: client.desease,
	                            onChange: this.handleInputChange, id: 'clientDesease', name: 'clientDesease' }),
	                        _react2.default.createElement(
	                            'label',
	                            null,
	                            'Date of birth'
	                        ),
	                        _react2.default.createElement(_FormControl2.default, { type: 'date', label: 'Date of birth', className: birthdateDateInput,
	                            onChange: this.handleInputChange, id: 'clientBirthdate', name: 'clientBirthdate' }),
	                        _react2.default.createElement(_FormControl2.default, { type: 'text', label: 'Date of birth', className: birthdateTextInput,
	                            placeholder: birthdate })
	                    ),
	                    _react2.default.createElement(
	                        'div',
	                        { className: 'col-xs-6 client_col_right' },
	                        _react2.default.createElement(
	                            'label',
	                            null,
	                            'Phone'
	                        ),
	                        _react2.default.createElement(_FormControl2.default, { type: 'phone', label: 'Phone', placeholder: client.phone,
	                            onChange: this.handleInputChange, id: 'clientPhone', name: 'clientPhone' }),
	                        _react2.default.createElement(
	                            'label',
	                            null,
	                            'Email'
	                        ),
	                        _react2.default.createElement(_FormControl2.default, { type: 'email', label: 'Email address', placeholder: client.email,
	                            onChange: this.handleInputChange, id: 'clientEmail', name: 'clientEmail' })
	                    ),
	                    _react2.default.createElement(
	                        'label',
	                        null,
	                        'Description'
	                    ),
	                    _react2.default.createElement(_FormControl2.default, { componentClass: 'textarea', placeholder: client.description, rows: '15',
	                        onChange: this.handleInputChange, id: 'clientDescription', name: 'clientDescription' }),
	                    _react2.default.createElement(
	                        _Button2.default,
	                        { bsSize: 'xsmall', bsStyle: 'success', type: 'submit', value: 'Add', className: showSaveBtn },
	                        'Save changes'
	                    )
	                )
	            );
	        }
	    }]);

	    return ClientsCard;
	}(_react.Component);

	exports.default = ClientsCard;

/***/ }),
/* 8 */
/***/ (function(module, exports) {

	module.exports = require("react-bootstrap/lib/FormControl");

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.sortByKey = exports.dateToTimestamp = exports.sendData = undefined;

	var _nodeFetch = __webpack_require__(10);

	var _nodeFetch2 = _interopRequireDefault(_nodeFetch);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var sendData = exports.sendData = function sendData(dataObject, url) {
	    (0, _nodeFetch2.default)(url, {
	        method: "POST",
	        body: JSON.stringify(dataObject),
	        headers: {
	            "Content-Type": "application/json"
	        }
	    }).then(function (response) {}, function (error) {
	        console.log('error= ' + error);
	    });
	};

	var dateToTimestamp = exports.dateToTimestamp = function dateToTimestamp(dateString) {
	    var date = new Date(dateString);
	    var utc = date.getTime() + -date.getTimezoneOffset() * 60000;
	    var datetime = new Date(utc).toISOString();
	    datetime = datetime.slice(0, 10) + ' ' + datetime.slice(11, datetime.length);
	    datetime = datetime.slice(0, datetime.length - 2);
	    return datetime;
	};

	var sortByKey = exports.sortByKey = function sortByKey(array, key) {
	    return array.sort(function (a, b) {
	        var x = a[key];
	        var y = b[key];
	        return x < y ? -1 : x > y ? 1 : 0;
	    });
	};

/***/ }),
/* 10 */
/***/ (function(module, exports) {

	module.exports = require("node-fetch");

/***/ }),
/* 11 */
/***/ (function(module, exports) {

	module.exports = require("moment");

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _ListGroup = __webpack_require__(13);

	var _ListGroup2 = _interopRequireDefault(_ListGroup);

	var _Visit = __webpack_require__(14);

	var _Visit2 = _interopRequireDefault(_Visit);

	var _methods = __webpack_require__(9);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var ClientsHistory = function (_Component) {
	    _inherits(ClientsHistory, _Component);

	    function ClientsHistory(props) {
	        _classCallCheck(this, ClientsHistory);

	        var _this = _possibleConstructorReturn(this, (ClientsHistory.__proto__ || Object.getPrototypeOf(ClientsHistory)).call(this, props));

	        _this.state = {};
	        return _this;
	    }

	    _createClass(ClientsHistory, [{
	        key: 'render',
	        value: function render() {

	            var arr = this.props.VISITS;
	            var sortedArr = (0, _methods.sortByKey)(arr, 'datetime');
	            var client = this.props.client;

	            return _react2.default.createElement(
	                'div',
	                null,
	                _react2.default.createElement(
	                    'h2',
	                    null,
	                    ' Clients history'
	                ),
	                _react2.default.createElement(
	                    'label',
	                    null,
	                    'Visits of ',
	                    client.name
	                ),
	                _react2.default.createElement(
	                    _ListGroup2.default,
	                    null,
	                    Object.keys(sortedArr).map(function (key) {
	                        return _react2.default.createElement(
	                            _Visit2.default,
	                            { clientInfo: sortedArr[key] },
	                            ' '
	                        );
	                    })
	                )
	            );
	        }
	    }]);

	    return ClientsHistory;
	}(_react.Component);

	exports.default = ClientsHistory;

/***/ }),
/* 13 */
/***/ (function(module, exports) {

	module.exports = require("react-bootstrap/lib/ListGroup");

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _Button = __webpack_require__(6);

	var _Button2 = _interopRequireDefault(_Button);

	var _Glyphicon = __webpack_require__(15);

	var _Glyphicon2 = _interopRequireDefault(_Glyphicon);

	var _ListGroupItem = __webpack_require__(16);

	var _ListGroupItem2 = _interopRequireDefault(_ListGroupItem);

	var _FormControl = __webpack_require__(8);

	var _FormControl2 = _interopRequireDefault(_FormControl);

	var _methods = __webpack_require__(9);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Visit = function (_Component) {
	    _inherits(Visit, _Component);

	    function Visit(props) {
	        _classCallCheck(this, Visit);

	        var _this = _possibleConstructorReturn(this, (Visit.__proto__ || Object.getPrototypeOf(Visit)).call(this, props));

	        _this.state = {
	            visitComment: 'comment'
	        };
	        _this.changeComment = _this.changeComment.bind(_this);
	        _this.handleInputChange = _this.handleInputChange.bind(_this);
	        _this.handleSubmit = _this.handleSubmit.bind(_this);
	        return _this;
	    }

	    _createClass(Visit, [{
	        key: 'changeComment',
	        value: function changeComment(event) {
	            document.getElementsByClassName("visit_comment")[0].style.display = 'block';
	            event.target.style.display = 'none';
	            this.setState({ visitComment: event.target.value });
	        }
	    }, {
	        key: 'handleInputChange',
	        value: function handleInputChange(event) {
	            var target = event.target;
	            var value = target.value;
	            var name = target.name;
	            this.setState(_defineProperty({}, name, value));
	        }
	    }, {
	        key: 'handleSubmit',
	        value: function handleSubmit(event) {
	            event.preventDefault();
	            document.getElementsByClassName("visit_label")[0].style.display = 'block';
	            this.refs.registerForm.reset();
	            event.target.style.display = 'none';
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var time = new Date(this.props.clientInfo.datetime);
	            time = time.toDateString();
	            return _react2.default.createElement(
	                'div',
	                null,
	                _react2.default.createElement(
	                    _ListGroupItem2.default,
	                    null,
	                    _react2.default.createElement(
	                        'span',
	                        null,
	                        time
	                    ),
	                    _react2.default.createElement(
	                        'span',
	                        { onClick: this.changeComment, className: 'visit_label' },
	                        this.props.clientInfo.comment
	                    ),
	                    _react2.default.createElement(
	                        'span',
	                        { className: 'visit_label' },
	                        this.props.clientInfo.status
	                    ),
	                    _react2.default.createElement(
	                        'span',
	                        null,
	                        _react2.default.createElement(
	                            'form',
	                            { className: 'visit_comment', onSubmit: this.handleSubmit, ref: 'registerForm' },
	                            _react2.default.createElement('input', { type: 'text', value: this.state.value, onChange: this.handleInputChange,
	                                name: 'visitComment' }),
	                            _react2.default.createElement(
	                                _Button2.default,
	                                { bsSize: 'xsmall', bsStyle: 'success', type: 'submit', value: 'Add' },
	                                _react2.default.createElement(_Glyphicon2.default, { glyph: 'plus' })
	                            )
	                        )
	                    ),
	                    _react2.default.createElement('input', { type: 'checkbox' })
	                )
	            );
	        }
	    }]);

	    return Visit;
	}(_react.Component);

	exports.default = Visit;

/***/ }),
/* 15 */
/***/ (function(module, exports) {

	module.exports = require("react-bootstrap/lib/Glyphicon");

/***/ }),
/* 16 */
/***/ (function(module, exports) {

	module.exports = require("react-bootstrap/lib/ListGroupItem");

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _ListGroup = __webpack_require__(13);

	var _ListGroup2 = _interopRequireDefault(_ListGroup);

	var _methods = __webpack_require__(9);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var ClientsList = function (_Component) {
	    _inherits(ClientsList, _Component);

	    function ClientsList(props) {
	        _classCallCheck(this, ClientsList);

	        var _this = _possibleConstructorReturn(this, (ClientsList.__proto__ || Object.getPrototypeOf(ClientsList)).call(this, props));

	        _this.state = {
	            CLIENTS: []
	        };
	        return _this;
	    }

	    _createClass(ClientsList, [{
	        key: 'render',
	        value: function render() {
	            var switchClient = this.props.switchClient;
	            var arr = this.props.CLIENTS;
	            var sortedArr = (0, _methods.sortByKey)(arr, 'name');

	            var listItems = sortedArr.map(function (client) {
	                return _react2.default.createElement(
	                    'li',
	                    null,
	                    _react2.default.createElement(
	                        'a',
	                        { onClick: function onClick() {
	                                switchClient(client.name);
	                            } },
	                        client.name
	                    )
	                );
	            });
	            return _react2.default.createElement(
	                'div',
	                null,
	                _react2.default.createElement(
	                    'h2',
	                    null,
	                    ' Clients list'
	                ),
	                _react2.default.createElement(
	                    'ul',
	                    { className: 'clients_list' },
	                    listItems
	                )
	            );
	        }
	    }]);

	    return ClientsList;
	}(_react.Component);

	exports.default = ClientsList;

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _MonthTable = __webpack_require__(19);

	var _MonthTable2 = _interopRequireDefault(_MonthTable);

	var _LoginForm = __webpack_require__(24);

	var _LoginForm2 = _interopRequireDefault(_LoginForm);

	var _MonthNavigation = __webpack_require__(25);

	var _MonthNavigation2 = _interopRequireDefault(_MonthNavigation);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Calendar = function (_Component) {
	    _inherits(Calendar, _Component);

	    function Calendar(props) {
	        _classCallCheck(this, Calendar);

	        var _this = _possibleConstructorReturn(this, (Calendar.__proto__ || Object.getPrototypeOf(Calendar)).call(this, props));

	        _this.state = {
	            isOpen: '', //true,
	            currentDate: {
	                currentDay: new Date().getDate(),
	                currentMonth: new Date().getMonth() + 1,
	                currentYear: new Date().getFullYear(),
	                monthStart: new Date(new Date().getFullYear(), new Date().getMonth(), 0).getDay(),
	                daysInMonth: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate()
	            },
	            weeksObject: {
	                nullWeekBeforeMonthStart: [],
	                firstWeekBeforeMonthStart: [],
	                firstWeekAfterMonthStart: [],
	                secondWeekInMonth: [],
	                thirdWeekInMonth: [],
	                forthWeekInMonth: [],
	                fifthWeekInMonth: [],
	                sixthWeekInMonth: []
	            }
	        };

	        _this.toggleModal = _this.toggleModal.bind(_this);
	        _this.updateMonthCount = _this.updateMonthCount.bind(_this);
	        return _this;
	    }

	    _createClass(Calendar, [{
	        key: 'toggleModal',
	        value: function toggleModal() {
	            this.setState({
	                isOpen: !this.state.isOpen
	            });
	        }
	    }, {
	        key: 'updateMonthCount',
	        value: function updateMonthCount(month, year) {
	            var weeksObjectCopy = Object.assign({}, this.state.weeksObject);
	            Object.keys(weeksObjectCopy).map(function (key) {
	                weeksObjectCopy[key] = [];
	            });
	            var currentDateCopy = Object.assign({}, this.state.currentDate);
	            currentDateCopy.currentMonth = month;
	            currentDateCopy.currentYear = year;
	            currentDateCopy.monthStart = new Date(year, month - 1, 0).getDay();
	            currentDateCopy.daysInMonth = new Date(year, month, 0).getDate();

	            this.setState({ weeksObject: weeksObjectCopy });
	            this.setState({ currentDate: currentDateCopy });
	        }
	    }, {
	        key: 'render',
	        value: function render() {

	            return _react2.default.createElement(
	                'div',
	                null,
	                _react2.default.createElement(_MonthNavigation2.default, { updateMonthCount: this.updateMonthCount,
	                    currentMonth: this.state.currentDate.currentMonth,
	                    currentYear: this.state.currentDate.currentYear }),
	                _react2.default.createElement(_MonthTable2.default, { currentDate: this.state.currentDate, weeksObject: this.state.weeksObject }),
	                _react2.default.createElement(_LoginForm2.default, { show: this.state.isOpen })
	            );
	        }
	    }]);

	    return Calendar;
	}(_react.Component);

	exports.default = Calendar;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _DayList = __webpack_require__(20);

	var _DayList2 = _interopRequireDefault(_DayList);

	var _Table = __webpack_require__(23);

	var _Table2 = _interopRequireDefault(_Table);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var MonthTable = function (_Component) {
	    _inherits(MonthTable, _Component);

	    function MonthTable(props) {
	        _classCallCheck(this, MonthTable);

	        var _this = _possibleConstructorReturn(this, (MonthTable.__proto__ || Object.getPrototypeOf(MonthTable)).call(this, props));

	        _this.state = {
	            trHead: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
	            daysArray: []
	        };
	        _this.fillHeadArray = _this.fillHeadArray.bind(_this);
	        return _this;
	    }

	    _createClass(MonthTable, [{
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            fetch('/clearRegistersDB', {
	                method: 'GET'
	            }).then(function (response) {});

	            // fetch('/setMockRegistersData', {
	            //     method: 'GET'
	            // }).then((response) => {
	            // });
	        }
	    }, {
	        key: 'fillHeadArray',
	        value: function fillHeadArray() {
	            var array = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
	            for (var i = 0; i < array.length; i++) {
	                this.state.trHead.push(_react2.default.createElement(
	                    'td',
	                    { className: 'day_ordinary' },
	                    'array[i]'
	                ));
	            }
	            return this.state.trHead;
	        }
	    }, {
	        key: 'render',
	        value: function render() {

	            var currentDay = 1;
	            var month = this.props.currentDate.currentMonth;
	            var year = this.props.currentDate.currentYear;

	            function fillWeekArray(arrayName) {
	                arrayName = [];

	                var j;
	                for (j = 0; j < 5; j++) {
	                    arrayName.push(_react2.default.createElement(
	                        'td',
	                        { className: 'day_ordinary' },
	                        _react2.default.createElement(_DayList2.default, { currentMonth: month, currentYear: year,
	                            currentDay: currentDay })
	                    ));
	                    currentDay += 1;
	                }
	                for (j = 5; j < 7; j++) {
	                    arrayName.push(_react2.default.createElement(
	                        'td',
	                        { className: 'day_weekend' },
	                        _react2.default.createElement(_DayList2.default, { currentMonth: month, currentYear: year,
	                            currentDay: currentDay })
	                    ));
	                    currentDay += 1;
	                }
	                return arrayName;
	            }

	            /*Calendar*/
	            var i, j;
	            var wholeWeekCount = Math.floor(this.props.currentDate.daysInMonth / 7) + 1;

	            for (i = 1; i <= wholeWeekCount; i++) {
	                switch (i) {
	                    case 1:
	                        if (this.props.currentDate.monthStart !== -1) {
	                            for (j = 0; j < this.props.currentDate.monthStart; j++) {
	                                j < 5 ? this.props.weeksObject.firstWeekBeforeMonthStart.push(_react2.default.createElement(
	                                    'td',
	                                    {
	                                        className: 'day_ordinary' },
	                                    '-'
	                                )) : this.props.weeksObject.firstWeekBeforeMonthStart.push(_react2.default.createElement(
	                                    'td',
	                                    { className: 'day_weekend' },
	                                    '-'
	                                ));
	                            }
	                            for (j = this.props.currentDate.monthStart; j < 7; j++) {
	                                if (j < 5) {
	                                    this.props.weeksObject.firstWeekBeforeMonthStart.push(_react2.default.createElement(
	                                        'td',
	                                        { className: 'day_ordinary' },
	                                        _react2.default.createElement(_DayList2.default, { currentMonth: this.props.currentDate.currentMonth,
	                                            currentYear: this.props.currentDate.currentYear, currentDay: currentDay })
	                                    ));
	                                    currentDay += 1;
	                                } else {
	                                    this.props.weeksObject.firstWeekBeforeMonthStart.push(_react2.default.createElement(
	                                        'td',
	                                        { className: 'day_weekend' },
	                                        _react2.default.createElement(_DayList2.default, { currentMonth: this.props.currentDate.currentMonth,
	                                            currentYear: this.props.currentDate.currentYear, currentDay: currentDay })
	                                    ));
	                                    currentDay += 1;
	                                }
	                            }
	                        } else {
	                            for (j = 0; j < 5; j++) {
	                                this.props.weeksObject.nullWeekBeforeMonthStart.push(_react2.default.createElement(
	                                    'td',
	                                    { className: 'day_ordinary' },
	                                    '-'
	                                ));
	                            }
	                            this.props.weeksObject.nullWeekBeforeMonthStart.push(_react2.default.createElement(
	                                'td',
	                                { className: 'day_weekend' },
	                                '-'
	                            ));
	                            this.props.weeksObject.nullWeekBeforeMonthStart.push(_react2.default.createElement(
	                                'td',
	                                { className: 'day_weekend' },
	                                _react2.default.createElement(_DayList2.default, {
	                                    currentDay: currentDay })
	                            ));
	                            currentDay += 1;
	                            this.props.weeksObject.firstWeekBeforeMonthStart = fillWeekArray('firstWeekBeforeMonthStart');
	                        }
	                        break;
	                    case 2:
	                        this.props.weeksObject.secondWeekInMonth = fillWeekArray('secondWeekInMonth');
	                        break;
	                    case 3:
	                        this.props.weeksObject.thirdWeekInMonth = fillWeekArray('thirdWeekInMonth');
	                        break;
	                    case 4:
	                        this.props.weeksObject.forthWeekInMonth = fillWeekArray('forthWeekInMonth');
	                        break;
	                    case 5:
	                        if (this.props.currentDate.daysInMonth - currentDay < 7) {
	                            for (j = 0; j < this.props.currentDate.daysInMonth - currentDay; j++) {
	                                if (j < 5) {
	                                    this.props.weeksObject.fifthWeekInMonth.push(_react2.default.createElement(
	                                        'td',
	                                        { className: 'day_ordinary' },
	                                        _react2.default.createElement(_DayList2.default, { currentMonth: this.props.currentDate.currentMonth,
	                                            currentYear: this.props.currentDate.currentYear, currentDay: currentDay })
	                                    ));
	                                    currentDay += 1;
	                                } else {
	                                    this.props.weeksObject.fifthWeekInMonth.push(_react2.default.createElement(
	                                        'td',
	                                        { className: 'day_weekend' },
	                                        _react2.default.createElement(_DayList2.default, {
	                                            currentDay: currentDay })
	                                    ));
	                                    currentDay += 1;
	                                }
	                            }
	                            for (j = this.props.currentDate.daysInMonth - currentDay; j < 7; j++) {
	                                if (j < 5) {
	                                    this.props.weeksObject.fifthWeekInMonth.push(_react2.default.createElement(
	                                        'td',
	                                        { className: 'day_ordinary' },
	                                        '-'
	                                    ));
	                                } else {
	                                    this.props.weeksObject.fifthWeekInMonth.push(_react2.default.createElement(
	                                        'td',
	                                        { className: 'day_weekend' },
	                                        '-'
	                                    ));
	                                }
	                            }
	                        } else {
	                            this.props.weeksObject.fifthWeekInMonth = fillWeekArray('fifthWeekInMonth');

	                            for (j = 0; j <= this.props.currentDate.daysInMonth - currentDay + 1; j++) {
	                                if (j < 5) {
	                                    this.props.weeksObject.sixthWeekInMonth.push(_react2.default.createElement(
	                                        'td',
	                                        { className: 'day_ordinary' },
	                                        _react2.default.createElement(_DayList2.default, { currentMonth: this.props.currentDate.currentMonth,
	                                            currentYear: this.props.currentDate.currentYear, currentDay: currentDay })
	                                    ));
	                                    currentDay += 1;
	                                } else {
	                                    this.props.weeksObject.sixthWeekInMonth.push(_react2.default.createElement(
	                                        'td',
	                                        { className: 'day_weekend' },
	                                        _react2.default.createElement(_DayList2.default, {
	                                            currentDay: currentDay })
	                                    ));
	                                    currentDay += 1;
	                                }
	                            }

	                            for (j; j < 7; j++) {
	                                j < 5 ? this.props.weeksObject.sixthWeekInMonth.push(_react2.default.createElement(
	                                    'td',
	                                    { className: 'day_ordinary' },
	                                    '-'
	                                )) : this.props.weeksObject.sixthWeekInMonth.push(_react2.default.createElement(
	                                    'td',
	                                    { className: 'day_weekend' },
	                                    '-'
	                                ));
	                            }
	                        }
	                        break;
	                    default:
	                        alert('Error');
	                        break;
	                }
	            }

	            return _react2.default.createElement(
	                'div',
	                null,
	                _react2.default.createElement(
	                    _Table2.default,
	                    { responsive: true },
	                    _react2.default.createElement(
	                        'thead',
	                        { className: 'month-header' },
	                        _react2.default.createElement(
	                            'tr',
	                            null,
	                            this.state.trHead.map(function (day) {
	                                return _react2.default.createElement(
	                                    'td',
	                                    { className: 'month-header' },
	                                    day
	                                );
	                            })
	                        )
	                    ),
	                    _react2.default.createElement(
	                        'tbody',
	                        null,
	                        _react2.default.createElement(
	                            'tr',
	                            null,
	                            this.props.weeksObject.firstWeekBeforeMonthStart.map(function (i) {
	                                return i;
	                            }),
	                            this.props.weeksObject.firstWeekAfterMonthStart.map(function (i) {
	                                return i;
	                            })
	                        ),
	                        _react2.default.createElement(
	                            'tr',
	                            null,
	                            this.props.weeksObject.secondWeekInMonth.map(function (i) {
	                                return i;
	                            })
	                        ),
	                        _react2.default.createElement(
	                            'tr',
	                            null,
	                            this.props.weeksObject.thirdWeekInMonth.map(function (i) {
	                                return i;
	                            })
	                        ),
	                        _react2.default.createElement(
	                            'tr',
	                            null,
	                            this.props.weeksObject.forthWeekInMonth.map(function (i) {
	                                return i;
	                            })
	                        ),
	                        _react2.default.createElement(
	                            'tr',
	                            null,
	                            this.props.weeksObject.fifthWeekInMonth.map(function (i) {
	                                return i;
	                            })
	                        ),
	                        _react2.default.createElement(
	                            'tr',
	                            null,
	                            this.props.weeksObject.sixthWeekInMonth.map(function (i) {
	                                return i;
	                            })
	                        )
	                    )
	                )
	            );
	        }
	    }]);

	    return MonthTable;
	}(_react.Component);

	exports.default = MonthTable;

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _RegisterList = __webpack_require__(21);

	var _RegisterList2 = _interopRequireDefault(_RegisterList);

	var _ClientNameInput = __webpack_require__(22);

	var _ClientNameInput2 = _interopRequireDefault(_ClientNameInput);

	var _methods = __webpack_require__(9);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var fetch = __webpack_require__(10);

	var DayList = function (_Component) {
	    _inherits(DayList, _Component);

	    function DayList(props) {
	        _classCallCheck(this, DayList);

	        var _this = _possibleConstructorReturn(this, (DayList.__proto__ || Object.getPrototypeOf(DayList)).call(this, props));

	        _this.addRegister = _this.addRegister.bind(_this);
	        _this.removeRegister = _this.removeRegister.bind(_this);

	        _this.state = {
	            registers: [],
	            times: {},
	            initialTimeArray: [],
	            REGISTERS: [],
	            busytime: []
	        };
	        return _this;
	    }

	    _createClass(DayList, [{
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            var _this2 = this;

	            fetch('/getRegisters', {
	                method: 'GET'
	            }).then(function (response) {
	                response.json().then(function (data) {
	                    _this2.setState({ REGISTERS: data });
	                });
	            });
	        }
	    }, {
	        key: 'addRegister',
	        value: function addRegister(registers) {
	            this.setState({ registers: registers });
	        }
	    }, {
	        key: 'removeRegister',
	        value: function removeRegister(register) {
	            var _this3 = this;

	            var datetime = (0, _methods.dateToTimestamp)(register.datetime);
	            var newRegister = {
	                datetime: datetime,
	                name: register.name,
	                status: 'available'
	            };
	            fetch('/removeRegister', {
	                method: "POST",
	                body: JSON.stringify(newRegister),
	                headers: {
	                    "Content-Type": "application/json"
	                }
	            }).then(function (response) {
	                response.json().then(function (data) {
	                    _this3.setState({ REGISTERS: data });
	                    _this3.setState({ registers: [] });
	                });
	            });
	        }
	    }, {
	        key: 'render',
	        value: function render() {

	            var currentMonth = this.props.currentMonth < 10 ? '0' + this.props.currentMonth : this.props.currentMonth;

	            var currentDay = this.props.currentDay < 10 ? '0' + this.props.currentDay : this.props.currentDay;
	            var arr = this.state.registers;

	            var busyTime = ['08.00', '09.00', '10.00', '11.00', '12.00', '13.00', '14.00', '15.00'];
	            var REGISTERS = this.state.REGISTERS;

	            var filteredArray = REGISTERS.concat(arr).filter(function (register) {
	                var datetime = (0, _methods.dateToTimestamp)(register.datetime);
	                datetime = datetime.slice(0, datetime.length - 2);

	                var month = datetime.slice(5, 7);
	                var day = datetime.slice(8, 10);
	                var time = datetime.slice(11, 13) + '.00'; //:00:00';

	                if (time.length == 4) {
	                    time = '0' + time;
	                }
	                if (month == currentMonth && day == currentDay && register.status == 'busy') {
	                    var index = busyTime.indexOf(time);
	                    if (index !== -1) busyTime.splice(index, 1);
	                    return register;
	                }
	            });
	            return _react2.default.createElement(
	                'div',
	                null,
	                _react2.default.createElement(
	                    'div',
	                    { className: 'day_ordinary_label' },
	                    ' ',
	                    this.props.currentDay
	                ),
	                _react2.default.createElement(_RegisterList2.default, { registers: filteredArray, removeRegister: this.removeRegister }),
	                _react2.default.createElement(_ClientNameInput2.default, { addRegister: this.addRegister,
	                    initialTimeArray: busyTime,
	                    currentDay: this.props.currentDay, currentMonth: this.props.currentMonth,
	                    currentYear: this.props.currentYear })
	            );
	        }
	    }]);

	    return DayList;
	}(_react.Component);

	exports.default = DayList;

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _Button = __webpack_require__(6);

	var _Button2 = _interopRequireDefault(_Button);

	var _Glyphicon = __webpack_require__(15);

	var _Glyphicon2 = _interopRequireDefault(_Glyphicon);

	var _methods = __webpack_require__(9);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var RegisterList = function (_Component) {
	    _inherits(RegisterList, _Component);

	    function RegisterList(props) {
	        _classCallCheck(this, RegisterList);

	        var _this = _possibleConstructorReturn(this, (RegisterList.__proto__ || Object.getPrototypeOf(RegisterList)).call(this, props));

	        _this.state = {};
	        return _this;
	    }

	    _createClass(RegisterList, [{
	        key: 'render',
	        value: function render() {
	            var arr = this.props.registers;
	            var sortedArr = dateSortByKey(arr, 'datetime');

	            function dateSortByKey(array, key) {
	                return array.sort(function (a, b) {
	                    var x = (0, _methods.dateToTimestamp)(a[key]);
	                    var y = (0, _methods.dateToTimestamp)(b[key]);
	                    return x < y ? -1 : x > y ? 1 : 0;
	                });
	            }

	            var removeRegister = this.props.removeRegister;

	            return _react2.default.createElement(
	                'div',
	                null,
	                _react2.default.createElement(
	                    'ul',
	                    { className: 'register_ul' },
	                    Object.keys(sortedArr).map(function (key) {
	                        var time = new Date(sortedArr[key].datetime).getHours() + '.00';
	                        if (time.length == 4) {
	                            time = '0' + time;
	                        }
	                        return _react2.default.createElement(
	                            'li',
	                            { className: 'register_list' },
	                            _react2.default.createElement(
	                                'span',
	                                { className: 'register_time' },
	                                time
	                            ),
	                            _react2.default.createElement(
	                                'span',
	                                {
	                                    className: 'register_name' },
	                                sortedArr[key].name
	                            ),
	                            _react2.default.createElement(
	                                'span',
	                                null,
	                                _react2.default.createElement(
	                                    _Button2.default,
	                                    { bsSize: 'xsmall', bsStyle: 'danger', className: 'btn-close',
	                                        onClick: function onClick() {
	                                            removeRegister(sortedArr[key]);
	                                        } },
	                                    _react2.default.createElement(_Glyphicon2.default, { glyph: 'remove' })
	                                )
	                            )
	                        );
	                    })
	                )
	            );
	        }
	    }]);

	    return RegisterList;
	}(_react.Component);

	exports.default = RegisterList;

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _Button = __webpack_require__(6);

	var _Button2 = _interopRequireDefault(_Button);

	var _Glyphicon = __webpack_require__(15);

	var _Glyphicon2 = _interopRequireDefault(_Glyphicon);

	var _methods = __webpack_require__(9);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var ClientNameInput = function (_Component) {
	    _inherits(ClientNameInput, _Component);

	    function ClientNameInput(props) {
	        _classCallCheck(this, ClientNameInput);

	        var _this = _possibleConstructorReturn(this, (ClientNameInput.__proto__ || Object.getPrototypeOf(ClientNameInput)).call(this, props));

	        _this.state = {
	            registers: [],
	            times: {
	                time: '',
	                isAvailable: true
	            },
	            names: '',
	            client_id: ''
	        };
	        _this.handleChange = _this.handleChange.bind(_this);
	        _this.handleTimeChange = _this.handleTimeChange.bind(_this);
	        _this.handleSubmit = _this.handleSubmit.bind(_this);
	        return _this;
	    }

	    _createClass(ClientNameInput, [{
	        key: 'handleChange',
	        value: function handleChange(event) {
	            this.setState({ names: event.target.value });
	        }
	    }, {
	        key: 'handleSubmit',
	        value: function handleSubmit(event) {
	            event.preventDefault();
	            if (this.state.times && this.state.names) {
	                var date = new Date(this.props.currentYear, this.props.currentMonth - 1, this.props.currentDay, this.state.times.time);

	                var datetime = (0, _methods.dateToTimestamp)(date);
	                var newRegister = {
	                    datetime: datetime,
	                    name: this.state.names,
	                    status: 'busy'
	                };
	                var newArray = this.state.registers;
	                newArray.push(newRegister);
	                this.setState({ registers: newArray });
	                this.props.addRegister(this.state.registers);
	                //this.getClientId(newRegister);
	                (0, _methods.sendData)(newRegister, "/addRegister");
	                this.refs.registerForm.reset();
	                this.setState({ times: '' });
	                this.setState({ names: '' });
	            } else {
	                alert("Enter name");
	            }
	        }
	    }, {
	        key: 'handleTimeChange',
	        value: function handleTimeChange(event) {
	            var timesCopy = Object.assign({}, this.state.times);
	            timesCopy.time = event.target.value;
	            this.setState({ times: timesCopy });
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var arr = this.props.initialTimeArray;
	            return _react2.default.createElement(
	                'div',
	                null,
	                _react2.default.createElement(
	                    'form',
	                    { onSubmit: this.handleSubmit, ref: 'registerForm', className: 'day_list' },
	                    _react2.default.createElement(
	                        'select',
	                        { value: this.state.value, onChange: this.handleTimeChange },
	                        _react2.default.createElement(
	                            'option',
	                            { value: 'Time' },
	                            'Time'
	                        ),
	                        arr.map(function (time) {
	                            return _react2.default.createElement(
	                                'option',
	                                { value: time },
	                                time
	                            );
	                        })
	                    ),
	                    _react2.default.createElement('input', { type: 'text', value: this.state.value, onChange: this.handleChange }),
	                    _react2.default.createElement(
	                        _Button2.default,
	                        { bsSize: 'xsmall', bsStyle: 'success', type: 'submit', value: 'Add' },
	                        _react2.default.createElement(_Glyphicon2.default, {
	                            glyph: 'plus' })
	                    )
	                )
	            );
	        }
	    }]);

	    return ClientNameInput;
	}(_react.Component);

	exports.default = ClientNameInput;

/***/ }),
/* 23 */
/***/ (function(module, exports) {

	module.exports = require("react-bootstrap/lib/Table");

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _FormControl = __webpack_require__(8);

	var _FormControl2 = _interopRequireDefault(_FormControl);

	var _Button = __webpack_require__(6);

	var _Button2 = _interopRequireDefault(_Button);

	var _methods = __webpack_require__(9);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var LoginForm = function (_Component) {
	    _inherits(LoginForm, _Component);

	    function LoginForm(props) {
	        _classCallCheck(this, LoginForm);

	        var _this = _possibleConstructorReturn(this, (LoginForm.__proto__ || Object.getPrototypeOf(LoginForm)).call(this, props));

	        _this.state = {
	            name: '',
	            password: '',
	            servantData: {},
	            isOpen: false //true

	        };
	        _this.closeLoginForm = _this.closeLoginForm.bind(_this);
	        _this.handleChange = _this.handleChange.bind(_this);
	        _this.handlePasswordChange = _this.handlePasswordChange.bind(_this);
	        _this.handleSubmit = _this.handleSubmit.bind(_this);
	        return _this;
	    }

	    _createClass(LoginForm, [{
	        key: 'closeLoginForm',
	        value: function closeLoginForm() {}
	    }, {
	        key: 'handleChange',
	        value: function handleChange(event) {
	            this.setState({ name: event.target.value });
	        }
	    }, {
	        key: 'handlePasswordChange',
	        value: function handlePasswordChange(event) {
	            this.setState({ password: event.target.value });
	        }
	    }, {
	        key: 'handleSubmit',
	        value: function handleSubmit(event) {
	            event.preventDefault();
	            if (this.state.name && this.state.password) {
	                var servantDataArray = this.state.servantData;
	                servantDataArray.name = this.state.name;
	                servantDataArray.password = this.state.password;
	                this.setState({ servantData: servantDataArray });
	                //sendData(this.state.servantData,"/addRegister");
	                this.refs.registerForm.reset();
	                this.setState({ isOpen: false });
	            } else {
	                alert("Enter name");
	            }
	        }
	    }, {
	        key: 'render',
	        value: function render() {

	            if (!this.state.isOpen) {
	                return null;
	            }

	            return _react2.default.createElement(
	                'div',
	                null,
	                _react2.default.createElement(
	                    'div',
	                    { className: 'login_overlay' },
	                    _react2.default.createElement(
	                        'form',
	                        { className: 'login_form', onSubmit: this.handleSubmit, ref: 'registerForm' },
	                        _react2.default.createElement(_FormControl2.default, { type: 'text', value: this.state.value, onChange: this.handleChange, placeholder: 'Name' }),
	                        _react2.default.createElement(_FormControl2.default, { type: 'password', value: this.state.value, onChange: this.handlePasswordChange,
	                            placeholder: 'Password' }),
	                        _react2.default.createElement(
	                            _Button2.default,
	                            { type: 'submit', onClick: this.handleSubmit },
	                            'Login'
	                        )
	                    )
	                )
	            );
	        }
	    }]);

	    return LoginForm;
	}(_react.Component);

	exports.default = LoginForm;

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _Button = __webpack_require__(6);

	var _Button2 = _interopRequireDefault(_Button);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var MonthNavigation = function (_Component) {
	    _inherits(MonthNavigation, _Component);

	    function MonthNavigation(props) {
	        _classCallCheck(this, MonthNavigation);

	        var _this = _possibleConstructorReturn(this, (MonthNavigation.__proto__ || Object.getPrototypeOf(MonthNavigation)).call(this, props));

	        _this.state = {};
	        return _this;
	    }

	    _createClass(MonthNavigation, [{
	        key: 'render',
	        value: function render() {
	            var _this2 = this;

	            return _react2.default.createElement(
	                'div',
	                { className: 'nav-centered' },
	                _react2.default.createElement(
	                    _Button2.default,
	                    { className: 'btn btn-info',
	                        onClick: function onClick() {
	                            _this2.props.updateMonthCount(_this2.props.currentMonth === 1 ? 12 : _this2.props.currentMonth - 1, _this2.props.currentMonth === 12 ? _this2.props.currentYear - 1 : _this2.props.currentYear);
	                        } },
	                    '\u2190 Previous'
	                ),
	                _react2.default.createElement(
	                    'h2',
	                    null,
	                    new Date(this.props.currentYear, this.props.currentMonth, 0).toLocaleString("en-us", { month: "long" }),
	                    '/ ',
	                    this.props.currentYear
	                ),
	                _react2.default.createElement(
	                    _Button2.default,
	                    { className: 'btn btn-info',
	                        onClick: function onClick() {
	                            _this2.props.updateMonthCount(_this2.props.currentMonth === 12 ? 1 : _this2.props.currentMonth + 1, _this2.props.currentMonth === 12 ? _this2.props.currentYear + 1 : _this2.props.currentYear);
	                        } },
	                    'Next  \u2192'
	                )
	            );
	        }
	    }]);

	    return MonthNavigation;
	}(_react.Component);

	exports.default = MonthNavigation;

/***/ }),
/* 26 */
/***/ (function(module, exports) {

	module.exports = require("react-router-dom");

/***/ }),
/* 27 */
/***/ (function(module, exports) {

	module.exports = require("react-bootstrap/lib/Navbar");

/***/ }),
/* 28 */
/***/ (function(module, exports) {

	module.exports = require("react-bootstrap/lib/Nav");

/***/ }),
/* 29 */
/***/ (function(module, exports) {

	module.exports = require("react-bootstrap/lib/FormGroup");

/***/ }),
/* 30 */
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	exports.default = function (_ref) {
	  var body = _ref.body,
	      title = _ref.title;

	  return "\n    <!DOCTYPE html>\n    <html>\n      <head>\n        <title>" + title + "</title>\n<link rel=\"stylesheet\" href=\"/assets/index.css\"/>\n<link href=\"https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css\" rel=\"stylesheet\">\n<link rel=\"stylesheet\" href=\"/assets/custom-styles.css\"/>\n      </head>\n      <body>\n        <div id=\"root\">" + body + "</div>\n      </body>\n      <script src=\"/assets/bundle.js\"></script>\n      <script src=\"https://cdnjs.cloudflare.com/ajax/libs/fetch/1.0.0/fetch.min.js\"></script>\n    </html>\n  ";
	};

/***/ }),
/* 31 */
/***/ (function(module, exports) {

	module.exports = require("body-parser");

/***/ }),
/* 32 */
/***/ (function(module, exports) {

	module.exports = require("express");

/***/ }),
/* 33 */
/***/ (function(module, exports) {

	module.exports = require("mysql");

/***/ })
/******/ ]);