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

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _server = __webpack_require__(2);

	var _index = __webpack_require__(3);

	var _index2 = _interopRequireDefault(_index);

	var _template = __webpack_require__(17);

	var _template2 = _interopRequireDefault(_template);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var bodyParser = __webpack_require__(18);

	var express = __webpack_require__(19);
	var server = express();
	var mysql = __webpack_require__(20);

	server.use(bodyParser.json()); // support json encoded bodies
	server.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

	server.use('/assets', express.static('assets'));
	server.get('/', function (req, res) {
	    var appString = (0, _server.renderToString)(_react2.default.createElement(_index2.default, null));
	    res.send((0, _template2.default)({
	        body: appString,
	        title: 'My-app'
	    }));
	});

	server.post('/', function (req, res) {
	    var con = mysql.createConnection({
	        host: "localhost",
	        user: "root",
	        password: "root",
	        database: "my_db"
	    });

	    con.connect(function (err) {
	        if (err) {
	            throw err;
	        }

	        var values = [[req.body.year, req.body.month, req.body.day, req.body.time, req.body.name, req.body.status]];
	        con.query("INSERT INTO registers (year, month, day, time, name, status) VALUES ?", [values], function (err, result) {
	            if (err) throw err;
	            console.log("1 record inserted");
	        });
	    });
	    res.send('Response from server');
	});

	server.get('/deleteRegisters', function (req, res) {
	    console.log("deleteRegisters");
	    var con = mysql.createConnection({
	        host: "localhost",
	        user: "root",
	        password: "root",
	        database: "my_db"
	    });
	    con.connect(function (err) {
	        if (err) throw err;
	        con.query("DELETE FROM `my_db`.`registers` WHERE `year`='2018';", function (err, result) {
	            if (err) throw err;
	            res.send(result);
	        });
	    });
	});

	server.get('/setMockData', function (req, res) {

	    var values = [['2018', '07', '2', '08.00', 'John Doe', 'available'], ['2018', '07', '3', '09.00', 'John Doe', 'available'], ['2018', '07', '4', '10.00', 'John Doe', 'available'], ['2018', '07', '5', '11.00', 'John Doe', 'available'], ['2018', '07', '6', '12.00', 'John Doe', 'available'], ['2018', '07', '7', '13.00', 'John Doe', 'available'], ['2018', '07', '8', '14.00', 'John Doe', 'available']];

	    var con = mysql.createConnection({
	        host: "localhost",
	        user: "root",
	        password: "root",
	        database: "my_db"
	    });

	    con.query("INSERT INTO registers (year, month, day, time, name, status) VALUES ?", [values], function (err, result) {
	        if (err) throw err;
	        console.log("Mock data is set");
	    });
	});

	server.get('/getRegisters', function (req, res) {
	    console.log("GET From SERVER");
	    var con = mysql.createConnection({
	        host: "localhost",
	        user: "root",
	        password: "root",
	        database: "my_db"
	    });
	    con.connect(function (err) {
	        if (err) throw err;
	        con.query("SELECT * FROM registers", function (err, result) {
	            if (err) throw err;
	            res.send(result);
	        });
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
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _PageHeader = __webpack_require__(4);

	var _PageHeader2 = _interopRequireDefault(_PageHeader);

	var _MonthTable = __webpack_require__(5);

	var _MonthTable2 = _interopRequireDefault(_MonthTable);

	var _LoginForm = __webpack_require__(14);

	var _LoginForm2 = _interopRequireDefault(_LoginForm);

	var _MonthNavigation = __webpack_require__(16);

	var _MonthNavigation2 = _interopRequireDefault(_MonthNavigation);

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

	    _createClass(App, [{
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
	                _react2.default.createElement(
	                    _PageHeader2.default,
	                    { className: 'header' },
	                    'My-app'
	                ),
	                _react2.default.createElement(_MonthNavigation2.default, { updateMonthCount: this.updateMonthCount, currentMonth: this.state.currentDate.currentMonth,
	                    currentYear: this.state.currentDate.currentYear }),
	                _react2.default.createElement(_MonthTable2.default, { currentDate: this.state.currentDate, weeksObject: this.state.weeksObject }),
	                _react2.default.createElement(_LoginForm2.default, { show: this.state.isOpen })
	            );
	        }
	    }]);

	    return App;
	}(_react.Component);

	exports.default = App;

/***/ }),
/* 4 */
/***/ (function(module, exports) {

	module.exports = require("react-bootstrap/lib/PageHeader");

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

	var _DayList = __webpack_require__(6);

	var _DayList2 = _interopRequireDefault(_DayList);

	var _Table = __webpack_require__(13);

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

	            // fetch('/deleteRegisters', {
	            //     method: 'GET'
	            // }).then((response) => {
	            // 
	            // });

	            fetch('/setMockData', {
	                method: 'GET'
	            }).then(function (response) {});
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
	                        _react2.default.createElement(_DayList2.default, { currentMonth: month, currentYear: year, currentDay: currentDay })
	                    ));
	                    currentDay += 1;
	                }
	                for (j = 5; j < 7; j++) {
	                    arrayName.push(_react2.default.createElement(
	                        'td',
	                        { className: 'day_weekend' },
	                        _react2.default.createElement(_DayList2.default, { currentMonth: month, currentYear: year, currentDay: currentDay })
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
	                                        _react2.default.createElement(_DayList2.default, { currentMonth: this.props.currentDate.currentMonth, currentYear: this.props.currentDate.currentYear, currentDay: currentDay })
	                                    ));
	                                    currentDay += 1;
	                                } else {
	                                    this.props.weeksObject.firstWeekBeforeMonthStart.push(_react2.default.createElement(
	                                        'td',
	                                        { className: 'day_weekend' },
	                                        _react2.default.createElement(_DayList2.default, { currentMonth: this.props.currentDate.currentMonth, currentYear: this.props.currentDate.currentYear, currentDay: currentDay })
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
	                                        _react2.default.createElement(_DayList2.default, { currentMonth: this.props.currentDate.currentMonth, currentYear: this.props.currentDate.currentYear, currentDay: currentDay })
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
	                                        _react2.default.createElement(_DayList2.default, { currentMonth: this.props.currentDate.currentMonth, currentYear: this.props.currentDate.currentYear, currentDay: currentDay })
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
	                        { 'class': 'month-header' },
	                        _react2.default.createElement(
	                            'tr',
	                            null,
	                            this.state.trHead.map(function (day) {
	                                return _react2.default.createElement(
	                                    'td',
	                                    { 'class': 'month-header' },
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
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _RegisterList = __webpack_require__(7);

	var _RegisterList2 = _interopRequireDefault(_RegisterList);

	var _ClientNameInput = __webpack_require__(10);

	var _ClientNameInput2 = _interopRequireDefault(_ClientNameInput);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var fetch = __webpack_require__(12);

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
	            REGISTERS: []
	        };
	        return _this;
	    }

	    _createClass(DayList, [{
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            var _this2 = this;

	            // fetch('/setMockData', {
	            //     method: 'GET'
	            // }).then((response) => {
	            // });
	            // fetch('/deleteRegisters', {
	            //     method: 'GET'
	            // }).then((response) => {
	            //  
	            // });

	            var registersDB = [];

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
	            var newRegister = {
	                year: register.year,
	                month: register.month,
	                day: register.day,
	                time: register.time,
	                name: register.name,
	                status: 'available'
	            };
	            var newArray = this.state.registers;

	            newArray.filter(function (item) {
	                var index = item.time.indexOf(newRegister.time);
	                if (index !== -1) item.status = 'busy';
	                return item;
	            });
	            this.setState({ registers: newArray });
	        }
	    }, {
	        key: 'render',
	        value: function render() {

	            var currentMonth = this.props.currentMonth;
	            var currentDay = this.props.currentDay;
	            var arr = this.state.registers;

	            var busyTime = ['08.00', '09.00', '10.00', '11.00', '12.00', '13.00', '14.00', '15.00'];
	            var REGISTERS = this.state.REGISTERS;

	            var filteredArray = REGISTERS.concat(arr).filter(function (register) {
	                if (register.month == currentMonth && register.day == currentDay && register.status == 'available') {
	                    var index = busyTime.indexOf(register.time);
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
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _Button = __webpack_require__(8);

	var _Button2 = _interopRequireDefault(_Button);

	var _Glyphicon = __webpack_require__(9);

	var _Glyphicon2 = _interopRequireDefault(_Glyphicon);

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
	            var sortedArr = sortByKey(arr, 'time');

	            function sortByKey(array, key) {
	                return array.sort(function (a, b) {
	                    var x = a[key];
	                    var y = b[key];
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
	                        return _react2.default.createElement(
	                            'li',
	                            { className: 'register_list' },
	                            _react2.default.createElement(
	                                'span',
	                                { className: 'register_time' },
	                                sortedArr[key].time
	                            ),
	                            _react2.default.createElement(
	                                'span',
	                                { className: 'register_name' },
	                                sortedArr[key].name
	                            ),
	                            _react2.default.createElement(
	                                'span',
	                                null,
	                                _react2.default.createElement(
	                                    _Button2.default,
	                                    { bsSize: 'xsmall', bsStyle: 'danger', className: 'btn-close', onClick: function onClick() {
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
/* 8 */
/***/ (function(module, exports) {

	module.exports = require("react-bootstrap/lib/Button");

/***/ }),
/* 9 */
/***/ (function(module, exports) {

	module.exports = require("react-bootstrap/lib/Glyphicon");

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _Button = __webpack_require__(8);

	var _Button2 = _interopRequireDefault(_Button);

	var _Glyphicon = __webpack_require__(9);

	var _Glyphicon2 = _interopRequireDefault(_Glyphicon);

	var _methods = __webpack_require__(11);

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
	            names: ''
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
	                this.props.addRegister(this.state.registers);
	                var newRegister = {
	                    year: this.props.currentYear,
	                    month: this.props.currentMonth,
	                    day: this.props.currentDay,
	                    time: this.state.times.time,
	                    name: this.state.names,
	                    status: 'available'
	                };
	                var newArray = this.state.registers;
	                newArray.push(newRegister);
	                this.setState({ registers: newArray });
	                (0, _methods.sendData)(newRegister);
	                this.refs.registerForm.reset();
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
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.sendData = undefined;

	var _nodeFetch = __webpack_require__(12);

	var _nodeFetch2 = _interopRequireDefault(_nodeFetch);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var sendData = exports.sendData = function sendData(dataObject) {
	    (0, _nodeFetch2.default)('/', {
	        method: "POST",
	        body: JSON.stringify(dataObject),
	        headers: {
	            "Content-Type": "application/json"
	        }
	    }).then(function (response) {}, function (error) {
	        console.log('error= ' + error);
	    });
	};

/***/ }),
/* 12 */
/***/ (function(module, exports) {

	module.exports = require("node-fetch");

/***/ }),
/* 13 */
/***/ (function(module, exports) {

	module.exports = require("react-bootstrap/lib/Table");

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

	var _FormControl = __webpack_require__(15);

	var _FormControl2 = _interopRequireDefault(_FormControl);

	var _Button = __webpack_require__(8);

	var _Button2 = _interopRequireDefault(_Button);

	var _methods = __webpack_require__(11);

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
	                (0, _methods.sendData)(this.state.servantData);
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
/* 15 */
/***/ (function(module, exports) {

	module.exports = require("react-bootstrap/lib/FormControl");

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _Button = __webpack_require__(8);

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
/* 17 */
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
/* 18 */
/***/ (function(module, exports) {

	module.exports = require("body-parser");

/***/ }),
/* 19 */
/***/ (function(module, exports) {

	module.exports = require("express");

/***/ }),
/* 20 */
/***/ (function(module, exports) {

	module.exports = require("mysql");

/***/ })
/******/ ]);