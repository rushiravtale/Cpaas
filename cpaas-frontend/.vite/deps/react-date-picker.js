import {
  require_react_dom
} from "./chunk-EKFKCRXB.js";
import {
  clsx_default
} from "./chunk-2KHBIA62.js";
import {
  require_jsx_runtime
} from "./chunk-R3OQ3HAY.js";
import {
  require_react
} from "./chunk-ULSRCYB6.js";
import {
  __commonJS,
  __toESM
} from "./chunk-G3PMV62Z.js";

// node_modules/warning/warning.js
var require_warning = __commonJS({
  "node_modules/warning/warning.js"(exports, module) {
    "use strict";
    var __DEV__ = true;
    var warning2 = function() {
    };
    if (__DEV__) {
      printWarning = function printWarning2(format, args) {
        var len = arguments.length;
        args = new Array(len > 1 ? len - 1 : 0);
        for (var key = 1; key < len; key++) {
          args[key - 1] = arguments[key];
        }
        var argIndex = 0;
        var message = "Warning: " + format.replace(/%s/g, function() {
          return args[argIndex++];
        });
        if (typeof console !== "undefined") {
          console.error(message);
        }
        try {
          throw new Error(message);
        } catch (x) {
        }
      };
      warning2 = function(condition, format, args) {
        var len = arguments.length;
        args = new Array(len > 2 ? len - 2 : 0);
        for (var key = 2; key < len; key++) {
          args[key - 2] = arguments[key];
        }
        if (format === void 0) {
          throw new Error(
            "`warning(condition, format, ...args)` requires a warning message argument"
          );
        }
        if (!condition) {
          printWarning.apply(null, [format].concat(args));
        }
      };
    }
    var printWarning;
    module.exports = warning2;
  }
});

// node_modules/react-date-picker/dist/DatePicker.js
var import_jsx_runtime30 = __toESM(require_jsx_runtime(), 1);
var import_react7 = __toESM(require_react(), 1);
var import_react_dom = __toESM(require_react_dom(), 1);

// node_modules/make-event-props/dist/index.js
var clipboardEvents = ["onCopy", "onCut", "onPaste"];
var compositionEvents = [
  "onCompositionEnd",
  "onCompositionStart",
  "onCompositionUpdate"
];
var focusEvents = ["onFocus", "onBlur"];
var formEvents = ["onInput", "onInvalid", "onReset", "onSubmit"];
var imageEvents = ["onLoad", "onError"];
var keyboardEvents = ["onKeyDown", "onKeyPress", "onKeyUp"];
var mediaEvents = [
  "onAbort",
  "onCanPlay",
  "onCanPlayThrough",
  "onDurationChange",
  "onEmptied",
  "onEncrypted",
  "onEnded",
  "onError",
  "onLoadedData",
  "onLoadedMetadata",
  "onLoadStart",
  "onPause",
  "onPlay",
  "onPlaying",
  "onProgress",
  "onRateChange",
  "onSeeked",
  "onSeeking",
  "onStalled",
  "onSuspend",
  "onTimeUpdate",
  "onVolumeChange",
  "onWaiting"
];
var mouseEvents = [
  "onClick",
  "onContextMenu",
  "onDoubleClick",
  "onMouseDown",
  "onMouseEnter",
  "onMouseLeave",
  "onMouseMove",
  "onMouseOut",
  "onMouseOver",
  "onMouseUp"
];
var dragEvents = [
  "onDrag",
  "onDragEnd",
  "onDragEnter",
  "onDragExit",
  "onDragLeave",
  "onDragOver",
  "onDragStart",
  "onDrop"
];
var selectionEvents = ["onSelect"];
var touchEvents = ["onTouchCancel", "onTouchEnd", "onTouchMove", "onTouchStart"];
var pointerEvents = [
  "onPointerDown",
  "onPointerMove",
  "onPointerUp",
  "onPointerCancel",
  "onGotPointerCapture",
  "onLostPointerCapture",
  "onPointerEnter",
  "onPointerLeave",
  "onPointerOver",
  "onPointerOut"
];
var uiEvents = ["onScroll"];
var wheelEvents = ["onWheel"];
var animationEvents = [
  "onAnimationStart",
  "onAnimationEnd",
  "onAnimationIteration"
];
var transitionEvents = ["onTransitionEnd"];
var otherEvents = ["onToggle"];
var changeEvents = ["onChange"];
var allEvents = [
  ...clipboardEvents,
  ...compositionEvents,
  ...focusEvents,
  ...formEvents,
  ...imageEvents,
  ...keyboardEvents,
  ...mediaEvents,
  ...mouseEvents,
  ...dragEvents,
  ...selectionEvents,
  ...touchEvents,
  ...pointerEvents,
  ...uiEvents,
  ...wheelEvents,
  ...animationEvents,
  ...transitionEvents,
  ...changeEvents,
  ...otherEvents
];
function makeEventProps(props, getArgs) {
  const eventProps = {};
  for (const eventName of allEvents) {
    const eventHandler = props[eventName];
    if (!eventHandler) {
      continue;
    }
    if (getArgs) {
      eventProps[eventName] = ((event) => eventHandler(event, getArgs(eventName)));
    } else {
      eventProps[eventName] = eventHandler;
    }
  }
  return eventProps;
}

// node_modules/react-calendar/dist/Calendar.js
var import_jsx_runtime20 = __toESM(require_jsx_runtime(), 1);
var import_react3 = __toESM(require_react(), 1);

// node_modules/react-calendar/dist/Calendar/Navigation.js
var import_jsx_runtime = __toESM(require_jsx_runtime(), 1);

// node_modules/mimic-function/index.js
var copyProperty = (to, from, property, ignoreNonConfigurable) => {
  if (property === "length" || property === "prototype") {
    return;
  }
  if (property === "arguments" || property === "caller") {
    return;
  }
  const toDescriptor = Object.getOwnPropertyDescriptor(to, property);
  const fromDescriptor = Object.getOwnPropertyDescriptor(from, property);
  if (!canCopyProperty(toDescriptor, fromDescriptor) && ignoreNonConfigurable) {
    return;
  }
  Object.defineProperty(to, property, fromDescriptor);
};
var canCopyProperty = function(toDescriptor, fromDescriptor) {
  return toDescriptor === void 0 || toDescriptor.configurable || toDescriptor.writable === fromDescriptor.writable && toDescriptor.enumerable === fromDescriptor.enumerable && toDescriptor.configurable === fromDescriptor.configurable && (toDescriptor.writable || toDescriptor.value === fromDescriptor.value);
};
var changePrototype = (to, from) => {
  const fromPrototype = Object.getPrototypeOf(from);
  if (fromPrototype === Object.getPrototypeOf(to)) {
    return;
  }
  Object.setPrototypeOf(to, fromPrototype);
};
var wrappedToString = (withName, fromBody) => `/* Wrapped ${withName}*/
${fromBody}`;
var toStringDescriptor = Object.getOwnPropertyDescriptor(Function.prototype, "toString");
var toStringName = Object.getOwnPropertyDescriptor(Function.prototype.toString, "name");
var changeToString = (to, from, name) => {
  const withName = name === "" ? "" : `with ${name.trim()}() `;
  const newToString = wrappedToString.bind(null, withName, from.toString());
  Object.defineProperty(newToString, "name", toStringName);
  const { writable, enumerable, configurable } = toStringDescriptor;
  Object.defineProperty(to, "toString", { value: newToString, writable, enumerable, configurable });
};
function mimicFunction(to, from, { ignoreNonConfigurable = false } = {}) {
  const { name } = to;
  for (const property of Reflect.ownKeys(from)) {
    copyProperty(to, from, property, ignoreNonConfigurable);
  }
  changePrototype(to, from);
  changeToString(to, from, name);
  return to;
}

// node_modules/memoize/distribution/index.js
var maxTimeoutValue = 2147483647;
var cacheStore = /* @__PURE__ */ new WeakMap();
var cacheTimerStore = /* @__PURE__ */ new WeakMap();
var cacheKeyStore = /* @__PURE__ */ new WeakMap();
function getValidCacheItem(cache, key) {
  const item = cache.get(key);
  if (!item) {
    return void 0;
  }
  if (item.maxAge <= Date.now()) {
    cache.delete(key);
    return void 0;
  }
  return item;
}
function memoize(function_, { cacheKey, cache = /* @__PURE__ */ new Map(), maxAge } = {}) {
  if (maxAge === 0) {
    return function_;
  }
  if (typeof maxAge === "number" && Number.isFinite(maxAge)) {
    if (maxAge > maxTimeoutValue) {
      throw new TypeError(`The \`maxAge\` option cannot exceed ${maxTimeoutValue}.`);
    }
    if (maxAge < 0) {
      throw new TypeError("The `maxAge` option should not be a negative number.");
    }
  }
  const memoized = function(...arguments_) {
    const key = cacheKey ? cacheKey(arguments_) : arguments_[0];
    const cacheItem = getValidCacheItem(cache, key);
    if (cacheItem) {
      return cacheItem.data;
    }
    const result = function_.apply(this, arguments_);
    const computedMaxAge = typeof maxAge === "function" ? maxAge(...arguments_) : maxAge;
    if (computedMaxAge !== void 0 && computedMaxAge !== Number.POSITIVE_INFINITY) {
      if (!Number.isFinite(computedMaxAge)) {
        throw new TypeError("The `maxAge` function must return a finite number, `0`, or `Infinity`.");
      }
      if (computedMaxAge <= 0) {
        return result;
      }
      if (computedMaxAge > maxTimeoutValue) {
        throw new TypeError(`The \`maxAge\` function result cannot exceed ${maxTimeoutValue}.`);
      }
    }
    cache.set(key, {
      data: result,
      maxAge: computedMaxAge === void 0 || computedMaxAge === Number.POSITIVE_INFINITY ? Number.POSITIVE_INFINITY : Date.now() + computedMaxAge
    });
    if (computedMaxAge !== void 0 && computedMaxAge !== Number.POSITIVE_INFINITY) {
      const timer = setTimeout(() => {
        cache.delete(key);
        cacheTimerStore.get(memoized)?.delete(timer);
      }, computedMaxAge);
      timer.unref?.();
      const timers = cacheTimerStore.get(memoized) ?? /* @__PURE__ */ new Set();
      timers.add(timer);
      cacheTimerStore.set(memoized, timers);
    }
    return result;
  };
  mimicFunction(memoized, function_, {
    ignoreNonConfigurable: true
  });
  cacheStore.set(memoized, cache);
  cacheKeyStore.set(memoized, cacheKey ?? ((arguments_) => arguments_[0]));
  return memoized;
}

// node_modules/get-user-locale/dist/index.js
function isString(el) {
  return typeof el === "string";
}
function isUnique(el, index, arr) {
  return arr.indexOf(el) === index;
}
function isAllLowerCase(el) {
  return el.toLowerCase() === el;
}
function fixCommas(el) {
  return el.indexOf(",") === -1 ? el : el.split(",");
}
function normalizeLocale(locale) {
  if (!locale) {
    return locale;
  }
  if (locale === "C" || locale === "posix" || locale === "POSIX") {
    return "en-US";
  }
  if (locale.indexOf(".") !== -1) {
    var _a = locale.split(".")[0], actualLocale = _a === void 0 ? "" : _a;
    return normalizeLocale(actualLocale);
  }
  if (locale.indexOf("@") !== -1) {
    var _b = locale.split("@")[0], actualLocale = _b === void 0 ? "" : _b;
    return normalizeLocale(actualLocale);
  }
  if (locale.indexOf("-") === -1 || !isAllLowerCase(locale)) {
    return locale;
  }
  var _c = locale.split("-"), splitEl1 = _c[0], _d = _c[1], splitEl2 = _d === void 0 ? "" : _d;
  return "".concat(splitEl1, "-").concat(splitEl2.toUpperCase());
}
function getUserLocalesInternal(_a) {
  var _b = _a === void 0 ? {} : _a, _c = _b.useFallbackLocale, useFallbackLocale = _c === void 0 ? true : _c, _d = _b.fallbackLocale, fallbackLocale = _d === void 0 ? "en-US" : _d;
  var languageList = [];
  if (typeof navigator !== "undefined") {
    var rawLanguages = navigator.languages || [];
    var languages = [];
    for (var _i = 0, rawLanguages_1 = rawLanguages; _i < rawLanguages_1.length; _i++) {
      var rawLanguagesItem = rawLanguages_1[_i];
      languages = languages.concat(fixCommas(rawLanguagesItem));
    }
    var rawLanguage = navigator.language;
    var language = rawLanguage ? fixCommas(rawLanguage) : rawLanguage;
    languageList = languageList.concat(languages, language);
  }
  if (useFallbackLocale) {
    languageList.push(fallbackLocale);
  }
  return languageList.filter(isString).map(normalizeLocale).filter(isUnique);
}
var getUserLocales = memoize(getUserLocalesInternal, { cacheKey: JSON.stringify });
function getUserLocaleInternal(options) {
  return getUserLocales(options)[0] || null;
}
var getUserLocale = memoize(getUserLocaleInternal, { cacheKey: JSON.stringify });
var dist_default = getUserLocale;

// node_modules/@wojtekmaj/date-utils/dist/index.js
function makeGetEdgeOfNeighbor(getPeriod, getEdgeOfPeriod, defaultOffset) {
  return function makeGetEdgeOfNeighborInternal(date, offset = defaultOffset) {
    const previousPeriod = getPeriod(date) + offset;
    return getEdgeOfPeriod(previousPeriod);
  };
}
function makeGetEnd(getBeginOfNextPeriod) {
  return function makeGetEndInternal(date) {
    return new Date(getBeginOfNextPeriod(date).getTime() - 1);
  };
}
function makeGetRange(getStart, getEnd3) {
  return function makeGetRangeInternal(date) {
    return [getStart(date), getEnd3(date)];
  };
}
function getYear(date) {
  if (date instanceof Date) {
    return date.getFullYear();
  }
  if (typeof date === "number") {
    return date;
  }
  const year = Number.parseInt(date, 10);
  if (typeof date === "string" && !Number.isNaN(year)) {
    return year;
  }
  throw new Error(`Failed to get year from date: ${date}.`);
}
function getMonth(date) {
  if (date instanceof Date) {
    return date.getMonth();
  }
  throw new Error(`Failed to get month from date: ${date}.`);
}
function getMonthHuman(date) {
  if (date instanceof Date) {
    return date.getMonth() + 1;
  }
  throw new Error(`Failed to get human-readable month from date: ${date}.`);
}
function getDate(date) {
  if (date instanceof Date) {
    return date.getDate();
  }
  throw new Error(`Failed to get year from date: ${date}.`);
}
function getCenturyStart(date) {
  const year = getYear(date);
  const centuryStartYear = year + (-year + 1) % 100;
  const centuryStartDate = /* @__PURE__ */ new Date();
  centuryStartDate.setFullYear(centuryStartYear, 0, 1);
  centuryStartDate.setHours(0, 0, 0, 0);
  return centuryStartDate;
}
var getPreviousCenturyStart = makeGetEdgeOfNeighbor(getYear, getCenturyStart, -100);
var getNextCenturyStart = makeGetEdgeOfNeighbor(getYear, getCenturyStart, 100);
var getCenturyEnd = makeGetEnd(getNextCenturyStart);
var getPreviousCenturyEnd = makeGetEdgeOfNeighbor(getYear, getCenturyEnd, -100);
var getNextCenturyEnd = makeGetEdgeOfNeighbor(getYear, getCenturyEnd, 100);
var getCenturyRange = makeGetRange(getCenturyStart, getCenturyEnd);
function getDecadeStart(date) {
  const year = getYear(date);
  const decadeStartYear = year + (-year + 1) % 10;
  const decadeStartDate = /* @__PURE__ */ new Date();
  decadeStartDate.setFullYear(decadeStartYear, 0, 1);
  decadeStartDate.setHours(0, 0, 0, 0);
  return decadeStartDate;
}
var getPreviousDecadeStart = makeGetEdgeOfNeighbor(getYear, getDecadeStart, -10);
var getNextDecadeStart = makeGetEdgeOfNeighbor(getYear, getDecadeStart, 10);
var getDecadeEnd = makeGetEnd(getNextDecadeStart);
var getPreviousDecadeEnd = makeGetEdgeOfNeighbor(getYear, getDecadeEnd, -10);
var getNextDecadeEnd = makeGetEdgeOfNeighbor(getYear, getDecadeEnd, 10);
var getDecadeRange = makeGetRange(getDecadeStart, getDecadeEnd);
function getYearStart(date) {
  const year = getYear(date);
  const yearStartDate = /* @__PURE__ */ new Date();
  yearStartDate.setFullYear(year, 0, 1);
  yearStartDate.setHours(0, 0, 0, 0);
  return yearStartDate;
}
var getPreviousYearStart = makeGetEdgeOfNeighbor(getYear, getYearStart, -1);
var getNextYearStart = makeGetEdgeOfNeighbor(getYear, getYearStart, 1);
var getYearEnd = makeGetEnd(getNextYearStart);
var getPreviousYearEnd = makeGetEdgeOfNeighbor(getYear, getYearEnd, -1);
var getNextYearEnd = makeGetEdgeOfNeighbor(getYear, getYearEnd, 1);
var getYearRange = makeGetRange(getYearStart, getYearEnd);
function makeGetEdgeOfNeighborMonth(getEdgeOfPeriod, defaultOffset) {
  return function makeGetEdgeOfNeighborMonthInternal(date, offset = defaultOffset) {
    const year = getYear(date);
    const month = getMonth(date) + offset;
    const previousPeriod = /* @__PURE__ */ new Date();
    previousPeriod.setFullYear(year, month, 1);
    previousPeriod.setHours(0, 0, 0, 0);
    return getEdgeOfPeriod(previousPeriod);
  };
}
function getMonthStart(date) {
  const year = getYear(date);
  const month = getMonth(date);
  const monthStartDate = /* @__PURE__ */ new Date();
  monthStartDate.setFullYear(year, month, 1);
  monthStartDate.setHours(0, 0, 0, 0);
  return monthStartDate;
}
var getPreviousMonthStart = makeGetEdgeOfNeighborMonth(getMonthStart, -1);
var getNextMonthStart = makeGetEdgeOfNeighborMonth(getMonthStart, 1);
var getMonthEnd = makeGetEnd(getNextMonthStart);
var getPreviousMonthEnd = makeGetEdgeOfNeighborMonth(getMonthEnd, -1);
var getNextMonthEnd = makeGetEdgeOfNeighborMonth(getMonthEnd, 1);
var getMonthRange = makeGetRange(getMonthStart, getMonthEnd);
function makeGetEdgeOfNeighborDay(getEdgeOfPeriod, defaultOffset) {
  return function makeGetEdgeOfNeighborDayInternal(date, offset = defaultOffset) {
    const year = getYear(date);
    const month = getMonth(date);
    const day = getDate(date) + offset;
    const previousPeriod = /* @__PURE__ */ new Date();
    previousPeriod.setFullYear(year, month, day);
    previousPeriod.setHours(0, 0, 0, 0);
    return getEdgeOfPeriod(previousPeriod);
  };
}
function getDayStart(date) {
  const year = getYear(date);
  const month = getMonth(date);
  const day = getDate(date);
  const dayStartDate = /* @__PURE__ */ new Date();
  dayStartDate.setFullYear(year, month, day);
  dayStartDate.setHours(0, 0, 0, 0);
  return dayStartDate;
}
var getPreviousDayStart = makeGetEdgeOfNeighborDay(getDayStart, -1);
var getNextDayStart = makeGetEdgeOfNeighborDay(getDayStart, 1);
var getDayEnd = makeGetEnd(getNextDayStart);
var getPreviousDayEnd = makeGetEdgeOfNeighborDay(getDayEnd, -1);
var getNextDayEnd = makeGetEdgeOfNeighborDay(getDayEnd, 1);
var getDayRange = makeGetRange(getDayStart, getDayEnd);
function getDaysInMonth(date) {
  return getDate(getMonthEnd(date));
}
function padStart(num, val = 2) {
  const numStr = `${num}`;
  if (numStr.length >= val) {
    return num;
  }
  return `0000${numStr}`.slice(-val);
}
function getISOLocalMonth(date) {
  const year = padStart(getYear(date), 4);
  const month = padStart(getMonthHuman(date));
  return `${year}-${month}`;
}
function getISOLocalDate(date) {
  const year = padStart(getYear(date), 4);
  const month = padStart(getMonthHuman(date));
  const day = padStart(getDate(date));
  return `${year}-${month}-${day}`;
}

// node_modules/react-calendar/dist/shared/const.js
var CALENDAR_TYPES = {
  GREGORY: "gregory",
  HEBREW: "hebrew",
  ISLAMIC: "islamic",
  ISO_8601: "iso8601"
};
var CALENDAR_TYPE_LOCALES = {
  gregory: [
    "en-CA",
    "en-US",
    "es-AR",
    "es-BO",
    "es-CL",
    "es-CO",
    "es-CR",
    "es-DO",
    "es-EC",
    "es-GT",
    "es-HN",
    "es-MX",
    "es-NI",
    "es-PA",
    "es-PE",
    "es-PR",
    "es-SV",
    "es-VE",
    "pt-BR"
  ],
  hebrew: ["he", "he-IL"],
  islamic: [
    // ar-LB, ar-MA intentionally missing
    "ar",
    "ar-AE",
    "ar-BH",
    "ar-DZ",
    "ar-EG",
    "ar-IQ",
    "ar-JO",
    "ar-KW",
    "ar-LY",
    "ar-OM",
    "ar-QA",
    "ar-SA",
    "ar-SD",
    "ar-SY",
    "ar-YE",
    "dv",
    "dv-MV",
    "ps",
    "ps-AR"
  ]
};
var WEEKDAYS = [0, 1, 2, 3, 4, 5, 6];

// node_modules/react-calendar/dist/shared/dateFormatter.js
var formatterCache = /* @__PURE__ */ new Map();
function getFormatter(options) {
  return function formatter(locale, date) {
    var localeWithDefault = locale || dist_default();
    if (!formatterCache.has(localeWithDefault)) {
      formatterCache.set(localeWithDefault, /* @__PURE__ */ new Map());
    }
    var formatterCacheLocale = formatterCache.get(localeWithDefault);
    if (!formatterCacheLocale.has(options)) {
      formatterCacheLocale.set(options, new Intl.DateTimeFormat(localeWithDefault || void 0, options).format);
    }
    return formatterCacheLocale.get(options)(date);
  };
}
function toSafeHour(date) {
  var safeDate = new Date(date);
  return new Date(safeDate.setHours(12));
}
function getSafeFormatter(options) {
  return function(locale, date) {
    return getFormatter(options)(locale, toSafeHour(date));
  };
}
var formatDateOptions = {
  day: "numeric",
  month: "numeric",
  year: "numeric"
};
var formatDayOptions = { day: "numeric" };
var formatLongDateOptions = {
  day: "numeric",
  month: "long",
  year: "numeric"
};
var formatMonthOptions = { month: "long" };
var formatMonthYearOptions = {
  month: "long",
  year: "numeric"
};
var formatShortWeekdayOptions = { weekday: "short" };
var formatWeekdayOptions = { weekday: "long" };
var formatYearOptions = { year: "numeric" };
var formatDate = getSafeFormatter(formatDateOptions);
var formatDay = getSafeFormatter(formatDayOptions);
var formatLongDate = getSafeFormatter(formatLongDateOptions);
var formatMonth = getSafeFormatter(formatMonthOptions);
var formatMonthYear = getSafeFormatter(formatMonthYearOptions);
var formatShortWeekday = getSafeFormatter(formatShortWeekdayOptions);
var formatWeekday = getSafeFormatter(formatWeekdayOptions);
var formatYear = getSafeFormatter(formatYearOptions);

// node_modules/react-calendar/dist/shared/dates.js
var SUNDAY = WEEKDAYS[0];
var FRIDAY = WEEKDAYS[5];
var SATURDAY = WEEKDAYS[6];
function getDayOfWeek(date, calendarType) {
  if (calendarType === void 0) {
    calendarType = CALENDAR_TYPES.ISO_8601;
  }
  var weekday = date.getDay();
  switch (calendarType) {
    case CALENDAR_TYPES.ISO_8601:
      return (weekday + 6) % 7;
    case CALENDAR_TYPES.ISLAMIC:
      return (weekday + 1) % 7;
    case CALENDAR_TYPES.HEBREW:
    case CALENDAR_TYPES.GREGORY:
      return weekday;
    default:
      throw new Error("Unsupported calendar type.");
  }
}
function getBeginOfCenturyYear(date) {
  var beginOfCentury = getCenturyStart(date);
  return getYear(beginOfCentury);
}
function getBeginOfDecadeYear(date) {
  var beginOfDecade = getDecadeStart(date);
  return getYear(beginOfDecade);
}
function getBeginOfWeek(date, calendarType) {
  if (calendarType === void 0) {
    calendarType = CALENDAR_TYPES.ISO_8601;
  }
  var year = getYear(date);
  var monthIndex = getMonth(date);
  var day = date.getDate() - getDayOfWeek(date, calendarType);
  return new Date(year, monthIndex, day);
}
function getWeekNumber(date, calendarType) {
  if (calendarType === void 0) {
    calendarType = CALENDAR_TYPES.ISO_8601;
  }
  var calendarTypeForWeekNumber = calendarType === CALENDAR_TYPES.GREGORY ? CALENDAR_TYPES.GREGORY : CALENDAR_TYPES.ISO_8601;
  var beginOfWeek = getBeginOfWeek(date, calendarType);
  var year = getYear(date) + 1;
  var dayInWeekOne;
  var beginOfFirstWeek;
  do {
    dayInWeekOne = new Date(year, 0, calendarTypeForWeekNumber === CALENDAR_TYPES.ISO_8601 ? 4 : 1);
    beginOfFirstWeek = getBeginOfWeek(dayInWeekOne, calendarType);
    year -= 1;
  } while (date < beginOfFirstWeek);
  return Math.round((beginOfWeek.getTime() - beginOfFirstWeek.getTime()) / (864e5 * 7)) + 1;
}
function getBegin(rangeType, date) {
  switch (rangeType) {
    case "century":
      return getCenturyStart(date);
    case "decade":
      return getDecadeStart(date);
    case "year":
      return getYearStart(date);
    case "month":
      return getMonthStart(date);
    case "day":
      return getDayStart(date);
    default:
      throw new Error("Invalid rangeType: ".concat(rangeType));
  }
}
function getBeginPrevious(rangeType, date) {
  switch (rangeType) {
    case "century":
      return getPreviousCenturyStart(date);
    case "decade":
      return getPreviousDecadeStart(date);
    case "year":
      return getPreviousYearStart(date);
    case "month":
      return getPreviousMonthStart(date);
    default:
      throw new Error("Invalid rangeType: ".concat(rangeType));
  }
}
function getBeginNext(rangeType, date) {
  switch (rangeType) {
    case "century":
      return getNextCenturyStart(date);
    case "decade":
      return getNextDecadeStart(date);
    case "year":
      return getNextYearStart(date);
    case "month":
      return getNextMonthStart(date);
    default:
      throw new Error("Invalid rangeType: ".concat(rangeType));
  }
}
function getBeginPrevious2(rangeType, date) {
  switch (rangeType) {
    case "decade":
      return getPreviousDecadeStart(date, -100);
    case "year":
      return getPreviousYearStart(date, -10);
    case "month":
      return getPreviousMonthStart(date, -12);
    default:
      throw new Error("Invalid rangeType: ".concat(rangeType));
  }
}
function getBeginNext2(rangeType, date) {
  switch (rangeType) {
    case "decade":
      return getNextDecadeStart(date, 100);
    case "year":
      return getNextYearStart(date, 10);
    case "month":
      return getNextMonthStart(date, 12);
    default:
      throw new Error("Invalid rangeType: ".concat(rangeType));
  }
}
function getEnd(rangeType, date) {
  switch (rangeType) {
    case "century":
      return getCenturyEnd(date);
    case "decade":
      return getDecadeEnd(date);
    case "year":
      return getYearEnd(date);
    case "month":
      return getMonthEnd(date);
    case "day":
      return getDayEnd(date);
    default:
      throw new Error("Invalid rangeType: ".concat(rangeType));
  }
}
function getEndPrevious(rangeType, date) {
  switch (rangeType) {
    case "century":
      return getPreviousCenturyEnd(date);
    case "decade":
      return getPreviousDecadeEnd(date);
    case "year":
      return getPreviousYearEnd(date);
    case "month":
      return getPreviousMonthEnd(date);
    default:
      throw new Error("Invalid rangeType: ".concat(rangeType));
  }
}
function getEndPrevious2(rangeType, date) {
  switch (rangeType) {
    case "decade":
      return getPreviousDecadeEnd(date, -100);
    case "year":
      return getPreviousYearEnd(date, -10);
    case "month":
      return getPreviousMonthEnd(date, -12);
    default:
      throw new Error("Invalid rangeType: ".concat(rangeType));
  }
}
function getRange(rangeType, date) {
  switch (rangeType) {
    case "century":
      return getCenturyRange(date);
    case "decade":
      return getDecadeRange(date);
    case "year":
      return getYearRange(date);
    case "month":
      return getMonthRange(date);
    case "day":
      return getDayRange(date);
    default:
      throw new Error("Invalid rangeType: ".concat(rangeType));
  }
}
function getValueRange(rangeType, date1, date2) {
  var rawNextValue = [date1, date2].sort(function(a, b) {
    return a.getTime() - b.getTime();
  });
  return [getBegin(rangeType, rawNextValue[0]), getEnd(rangeType, rawNextValue[1])];
}
function toYearLabel(locale, formatYear2, dates) {
  return dates.map(function(date) {
    return (formatYear2 || formatYear)(locale, date);
  }).join(" – ");
}
function getCenturyLabel(locale, formatYear2, date) {
  return toYearLabel(locale, formatYear2, getCenturyRange(date));
}
function getDecadeLabel(locale, formatYear2, date) {
  return toYearLabel(locale, formatYear2, getDecadeRange(date));
}
function isCurrentDayOfWeek(date) {
  return date.getDay() === (/* @__PURE__ */ new Date()).getDay();
}
function isWeekend(date, calendarType) {
  if (calendarType === void 0) {
    calendarType = CALENDAR_TYPES.ISO_8601;
  }
  var weekday = date.getDay();
  switch (calendarType) {
    case CALENDAR_TYPES.ISLAMIC:
    case CALENDAR_TYPES.HEBREW:
      return weekday === FRIDAY || weekday === SATURDAY;
    case CALENDAR_TYPES.ISO_8601:
    case CALENDAR_TYPES.GREGORY:
      return weekday === SATURDAY || weekday === SUNDAY;
    default:
      throw new Error("Unsupported calendar type.");
  }
}

// node_modules/react-calendar/dist/Calendar/Navigation.js
var className = "react-calendar__navigation";
function Navigation(_a) {
  var activeStartDate = _a.activeStartDate, drillUp = _a.drillUp, _b = _a.formatMonthYear, formatMonthYear2 = _b === void 0 ? formatMonthYear : _b, _c = _a.formatYear, formatYear2 = _c === void 0 ? formatYear : _c, locale = _a.locale, maxDate = _a.maxDate, minDate = _a.minDate, _d = _a.navigationAriaLabel, navigationAriaLabel = _d === void 0 ? "" : _d, navigationAriaLive = _a.navigationAriaLive, navigationLabel = _a.navigationLabel, _e = _a.next2AriaLabel, next2AriaLabel = _e === void 0 ? "" : _e, _f = _a.next2Label, next2Label = _f === void 0 ? "»" : _f, _g = _a.nextAriaLabel, nextAriaLabel = _g === void 0 ? "" : _g, _h = _a.nextLabel, nextLabel = _h === void 0 ? "›" : _h, _j = _a.prev2AriaLabel, prev2AriaLabel = _j === void 0 ? "" : _j, _k = _a.prev2Label, prev2Label = _k === void 0 ? "«" : _k, _l = _a.prevAriaLabel, prevAriaLabel = _l === void 0 ? "" : _l, _m = _a.prevLabel, prevLabel = _m === void 0 ? "‹" : _m, setActiveStartDate = _a.setActiveStartDate, showDoubleView = _a.showDoubleView, view = _a.view, views = _a.views;
  var drillUpAvailable = views.indexOf(view) > 0;
  var shouldShowPrevNext2Buttons = view !== "century";
  var previousActiveStartDate = getBeginPrevious(view, activeStartDate);
  var previousActiveStartDate2 = shouldShowPrevNext2Buttons ? getBeginPrevious2(view, activeStartDate) : void 0;
  var nextActiveStartDate = getBeginNext(view, activeStartDate);
  var nextActiveStartDate2 = shouldShowPrevNext2Buttons ? getBeginNext2(view, activeStartDate) : void 0;
  var prevButtonDisabled = (function() {
    if (previousActiveStartDate.getFullYear() < 0) {
      return true;
    }
    var previousActiveEndDate = getEndPrevious(view, activeStartDate);
    return minDate && minDate >= previousActiveEndDate;
  })();
  var prev2ButtonDisabled = shouldShowPrevNext2Buttons && (function() {
    if (previousActiveStartDate2.getFullYear() < 0) {
      return true;
    }
    var previousActiveEndDate = getEndPrevious2(view, activeStartDate);
    return minDate && minDate >= previousActiveEndDate;
  })();
  var nextButtonDisabled = maxDate && maxDate < nextActiveStartDate;
  var next2ButtonDisabled = shouldShowPrevNext2Buttons && maxDate && maxDate < nextActiveStartDate2;
  function onClickPrevious() {
    setActiveStartDate(previousActiveStartDate, "prev");
  }
  function onClickPrevious2() {
    setActiveStartDate(previousActiveStartDate2, "prev2");
  }
  function onClickNext() {
    setActiveStartDate(nextActiveStartDate, "next");
  }
  function onClickNext2() {
    setActiveStartDate(nextActiveStartDate2, "next2");
  }
  function renderLabel(date) {
    var label = (function() {
      switch (view) {
        case "century":
          return getCenturyLabel(locale, formatYear2, date);
        case "decade":
          return getDecadeLabel(locale, formatYear2, date);
        case "year":
          return formatYear2(locale, date);
        case "month":
          return formatMonthYear2(locale, date);
        default:
          throw new Error("Invalid view: ".concat(view, "."));
      }
    })();
    return navigationLabel ? navigationLabel({
      date,
      label,
      locale: locale || getUserLocale() || void 0,
      view
    }) : label;
  }
  function renderButton() {
    var labelClassName = "".concat(className, "__label");
    return (0, import_jsx_runtime.jsxs)("button", { "aria-label": navigationAriaLabel, "aria-live": navigationAriaLive, className: labelClassName, disabled: !drillUpAvailable, onClick: drillUp, style: { flexGrow: 1 }, type: "button", children: [(0, import_jsx_runtime.jsx)("span", { className: "".concat(labelClassName, "__labelText ").concat(labelClassName, "__labelText--from"), children: renderLabel(activeStartDate) }), showDoubleView ? (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [(0, import_jsx_runtime.jsx)("span", { className: "".concat(labelClassName, "__divider"), children: " – " }), (0, import_jsx_runtime.jsx)("span", { className: "".concat(labelClassName, "__labelText ").concat(labelClassName, "__labelText--to"), children: renderLabel(nextActiveStartDate) })] }) : null] });
  }
  return (0, import_jsx_runtime.jsxs)("div", { className, children: [prev2Label !== null && shouldShowPrevNext2Buttons ? (0, import_jsx_runtime.jsx)("button", { "aria-label": prev2AriaLabel, className: "".concat(className, "__arrow ").concat(className, "__prev2-button"), disabled: prev2ButtonDisabled, onClick: onClickPrevious2, type: "button", children: prev2Label }) : null, prevLabel !== null && (0, import_jsx_runtime.jsx)("button", { "aria-label": prevAriaLabel, className: "".concat(className, "__arrow ").concat(className, "__prev-button"), disabled: prevButtonDisabled, onClick: onClickPrevious, type: "button", children: prevLabel }), renderButton(), nextLabel !== null && (0, import_jsx_runtime.jsx)("button", { "aria-label": nextAriaLabel, className: "".concat(className, "__arrow ").concat(className, "__next-button"), disabled: nextButtonDisabled, onClick: onClickNext, type: "button", children: nextLabel }), next2Label !== null && shouldShowPrevNext2Buttons ? (0, import_jsx_runtime.jsx)("button", { "aria-label": next2AriaLabel, className: "".concat(className, "__arrow ").concat(className, "__next2-button"), disabled: next2ButtonDisabled, onClick: onClickNext2, type: "button", children: next2Label }) : null] });
}

// node_modules/react-calendar/dist/CenturyView.js
var import_jsx_runtime7 = __toESM(require_jsx_runtime(), 1);

// node_modules/react-calendar/dist/CenturyView/Decades.js
var import_jsx_runtime6 = __toESM(require_jsx_runtime(), 1);

// node_modules/react-calendar/dist/TileGroup.js
var import_jsx_runtime3 = __toESM(require_jsx_runtime(), 1);

// node_modules/react-calendar/dist/Flex.js
var import_jsx_runtime2 = __toESM(require_jsx_runtime(), 1);
var import_react = __toESM(require_react(), 1);
var __assign = function() {
  __assign = Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
        t[p] = s[p];
    }
    return t;
  };
  return __assign.apply(this, arguments);
};
var __rest = function(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
    t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
      if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
        t[p[i]] = s[p[i]];
    }
  return t;
};
function toPercent(num) {
  return "".concat(num, "%");
}
function Flex(_a) {
  var children = _a.children, className8 = _a.className, count = _a.count, direction = _a.direction, offset = _a.offset, style = _a.style, wrap = _a.wrap, otherProps = __rest(_a, ["children", "className", "count", "direction", "offset", "style", "wrap"]);
  return (0, import_jsx_runtime2.jsx)("div", __assign({ className: className8, style: __assign({ display: "flex", flexDirection: direction, flexWrap: wrap ? "wrap" : "nowrap" }, style) }, otherProps, { children: import_react.Children.map(children, function(child, index) {
    var marginInlineStart = offset && index === 0 ? toPercent(100 * offset / count) : null;
    return (0, import_react.cloneElement)(child, __assign(__assign({}, child.props), { style: {
      flexBasis: toPercent(100 / count),
      flexShrink: 0,
      flexGrow: 0,
      overflow: "hidden",
      marginLeft: marginInlineStart,
      marginInlineStart,
      marginInlineEnd: 0
    } }));
  }) }));
}

// node_modules/react-calendar/dist/shared/utils.js
function between(value, min, max) {
  if (min && min > value) {
    return min;
  }
  if (max && max < value) {
    return max;
  }
  return value;
}
function isValueWithinRange(value, range) {
  return range[0] <= value && range[1] >= value;
}
function isRangeWithinRange(greaterRange, smallerRange) {
  return greaterRange[0] <= smallerRange[0] && greaterRange[1] >= smallerRange[1];
}
function doRangesOverlap(range1, range2) {
  return isValueWithinRange(range1[0], range2) || isValueWithinRange(range1[1], range2);
}
function getRangeClassNames(valueRange, dateRange, baseClassName3) {
  var isRange = doRangesOverlap(dateRange, valueRange);
  var classes = [];
  if (isRange) {
    classes.push(baseClassName3);
    var isRangeStart = isValueWithinRange(valueRange[0], dateRange);
    var isRangeEnd = isValueWithinRange(valueRange[1], dateRange);
    if (isRangeStart) {
      classes.push("".concat(baseClassName3, "Start"));
    }
    if (isRangeEnd) {
      classes.push("".concat(baseClassName3, "End"));
    }
    if (isRangeStart && isRangeEnd) {
      classes.push("".concat(baseClassName3, "BothEnds"));
    }
  }
  return classes;
}
function isCompleteValue(value) {
  if (Array.isArray(value)) {
    return value[0] !== null && value[1] !== null;
  }
  return value !== null;
}
function getTileClasses(args) {
  if (!args) {
    throw new Error("args is required");
  }
  var value = args.value, date = args.date, hover = args.hover;
  var className8 = "react-calendar__tile";
  var classes = [className8];
  if (!date) {
    return classes;
  }
  var now = /* @__PURE__ */ new Date();
  var dateRange = (function() {
    if (Array.isArray(date)) {
      return date;
    }
    var dateType = args.dateType;
    if (!dateType) {
      throw new Error("dateType is required when date is not an array of two dates");
    }
    return getRange(dateType, date);
  })();
  if (isValueWithinRange(now, dateRange)) {
    classes.push("".concat(className8, "--now"));
  }
  if (!value || !isCompleteValue(value)) {
    return classes;
  }
  var valueRange = (function() {
    if (Array.isArray(value)) {
      return value;
    }
    var valueType = args.valueType;
    if (!valueType) {
      throw new Error("valueType is required when value is not an array of two dates");
    }
    return getRange(valueType, value);
  })();
  if (isRangeWithinRange(valueRange, dateRange)) {
    classes.push("".concat(className8, "--active"));
  } else if (doRangesOverlap(valueRange, dateRange)) {
    classes.push("".concat(className8, "--hasActive"));
  }
  var valueRangeClassNames = getRangeClassNames(valueRange, dateRange, "".concat(className8, "--range"));
  classes.push.apply(classes, valueRangeClassNames);
  var valueArray = Array.isArray(value) ? value : [value];
  if (hover && valueArray.length === 1) {
    var hoverRange = hover > valueRange[0] ? [valueRange[0], hover] : [hover, valueRange[0]];
    var hoverRangeClassNames = getRangeClassNames(hoverRange, dateRange, "".concat(className8, "--hover"));
    classes.push.apply(classes, hoverRangeClassNames);
  }
  return classes;
}

// node_modules/react-calendar/dist/TileGroup.js
function TileGroup(_a) {
  var className8 = _a.className, _b = _a.count, count = _b === void 0 ? 3 : _b, dateTransform = _a.dateTransform, dateType = _a.dateType, end = _a.end, hover = _a.hover, offset = _a.offset, renderTile = _a.renderTile, start = _a.start, _c = _a.step, step = _c === void 0 ? 1 : _c, value = _a.value, valueType = _a.valueType;
  var tiles = [];
  for (var point = start; point <= end; point += step) {
    var date = dateTransform(point);
    tiles.push(renderTile({
      classes: getTileClasses({
        date,
        dateType,
        hover,
        value,
        valueType
      }),
      date
    }));
  }
  return (0, import_jsx_runtime3.jsx)(Flex, { className: className8, count, offset, wrap: true, children: tiles });
}

// node_modules/react-calendar/dist/CenturyView/Decade.js
var import_jsx_runtime5 = __toESM(require_jsx_runtime(), 1);

// node_modules/react-calendar/dist/Tile.js
var import_jsx_runtime4 = __toESM(require_jsx_runtime(), 1);
var import_react2 = __toESM(require_react(), 1);
function Tile(props) {
  var activeStartDate = props.activeStartDate, children = props.children, classes = props.classes, date = props.date, formatAbbr = props.formatAbbr, locale = props.locale, maxDate = props.maxDate, maxDateTransform = props.maxDateTransform, minDate = props.minDate, minDateTransform = props.minDateTransform, onClick = props.onClick, onMouseOver = props.onMouseOver, style = props.style, tileClassNameProps = props.tileClassName, tileContentProps = props.tileContent, tileDisabled = props.tileDisabled, view = props.view;
  var tileClassName = (0, import_react2.useMemo)(function() {
    var args = { activeStartDate, date, view };
    return typeof tileClassNameProps === "function" ? tileClassNameProps(args) : tileClassNameProps;
  }, [activeStartDate, date, tileClassNameProps, view]);
  var tileContent = (0, import_react2.useMemo)(function() {
    var args = { activeStartDate, date, view };
    return typeof tileContentProps === "function" ? tileContentProps(args) : tileContentProps;
  }, [activeStartDate, date, tileContentProps, view]);
  return (0, import_jsx_runtime4.jsxs)("button", { className: clsx_default(classes, tileClassName), disabled: minDate && minDateTransform(minDate) > date || maxDate && maxDateTransform(maxDate) < date || (tileDisabled === null || tileDisabled === void 0 ? void 0 : tileDisabled({ activeStartDate, date, view })), onClick: onClick ? function(event) {
    return onClick(date, event);
  } : void 0, onFocus: onMouseOver ? function() {
    return onMouseOver(date);
  } : void 0, onMouseOver: onMouseOver ? function() {
    return onMouseOver(date);
  } : void 0, style, type: "button", children: [formatAbbr ? (0, import_jsx_runtime4.jsx)("abbr", { "aria-label": formatAbbr(locale, date), children }) : children, tileContent] });
}

// node_modules/react-calendar/dist/CenturyView/Decade.js
var __assign2 = function() {
  __assign2 = Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
        t[p] = s[p];
    }
    return t;
  };
  return __assign2.apply(this, arguments);
};
var __rest2 = function(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
    t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
      if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
        t[p[i]] = s[p[i]];
    }
  return t;
};
var className2 = "react-calendar__century-view__decades__decade";
function Decade(_a) {
  var _b = _a.classes, classes = _b === void 0 ? [] : _b, currentCentury = _a.currentCentury, _c = _a.formatYear, formatYear2 = _c === void 0 ? formatYear : _c, otherProps = __rest2(_a, ["classes", "currentCentury", "formatYear"]);
  var date = otherProps.date, locale = otherProps.locale;
  var classesProps = [];
  if (classes) {
    classesProps.push.apply(classesProps, classes);
  }
  if (className2) {
    classesProps.push(className2);
  }
  if (getCenturyStart(date).getFullYear() !== currentCentury) {
    classesProps.push("".concat(className2, "--neighboringCentury"));
  }
  return (0, import_jsx_runtime5.jsx)(Tile, __assign2({}, otherProps, { classes: classesProps, maxDateTransform: getDecadeEnd, minDateTransform: getDecadeStart, view: "century", children: getDecadeLabel(locale, formatYear2, date) }));
}

// node_modules/react-calendar/dist/CenturyView/Decades.js
var __assign3 = function() {
  __assign3 = Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
        t[p] = s[p];
    }
    return t;
  };
  return __assign3.apply(this, arguments);
};
var __rest3 = function(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
    t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
      if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
        t[p[i]] = s[p[i]];
    }
  return t;
};
function Decades(props) {
  var activeStartDate = props.activeStartDate, hover = props.hover, showNeighboringCentury = props.showNeighboringCentury, value = props.value, valueType = props.valueType, otherProps = __rest3(props, ["activeStartDate", "hover", "showNeighboringCentury", "value", "valueType"]);
  var start = getBeginOfCenturyYear(activeStartDate);
  var end = start + (showNeighboringCentury ? 119 : 99);
  return (0, import_jsx_runtime6.jsx)(TileGroup, { className: "react-calendar__century-view__decades", dateTransform: getDecadeStart, dateType: "decade", end, hover, renderTile: function(_a) {
    var date = _a.date, otherTileProps = __rest3(_a, ["date"]);
    return (0, import_jsx_runtime6.jsx)(Decade, __assign3({}, otherProps, otherTileProps, { activeStartDate, currentCentury: start, date }), date.getTime());
  }, start, step: 10, value, valueType });
}

// node_modules/react-calendar/dist/CenturyView.js
var __assign4 = function() {
  __assign4 = Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
        t[p] = s[p];
    }
    return t;
  };
  return __assign4.apply(this, arguments);
};
function CenturyView(props) {
  function renderDecades() {
    return (0, import_jsx_runtime7.jsx)(Decades, __assign4({}, props));
  }
  return (0, import_jsx_runtime7.jsx)("div", { className: "react-calendar__century-view", children: renderDecades() });
}

// node_modules/react-calendar/dist/DecadeView.js
var import_jsx_runtime10 = __toESM(require_jsx_runtime(), 1);

// node_modules/react-calendar/dist/DecadeView/Years.js
var import_jsx_runtime9 = __toESM(require_jsx_runtime(), 1);

// node_modules/react-calendar/dist/DecadeView/Year.js
var import_jsx_runtime8 = __toESM(require_jsx_runtime(), 1);
var __assign5 = function() {
  __assign5 = Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
        t[p] = s[p];
    }
    return t;
  };
  return __assign5.apply(this, arguments);
};
var __rest4 = function(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
    t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
      if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
        t[p[i]] = s[p[i]];
    }
  return t;
};
var className3 = "react-calendar__decade-view__years__year";
function Year(_a) {
  var _b = _a.classes, classes = _b === void 0 ? [] : _b, currentDecade = _a.currentDecade, _c = _a.formatYear, formatYear2 = _c === void 0 ? formatYear : _c, otherProps = __rest4(_a, ["classes", "currentDecade", "formatYear"]);
  var date = otherProps.date, locale = otherProps.locale;
  var classesProps = [];
  if (classes) {
    classesProps.push.apply(classesProps, classes);
  }
  if (className3) {
    classesProps.push(className3);
  }
  if (getDecadeStart(date).getFullYear() !== currentDecade) {
    classesProps.push("".concat(className3, "--neighboringDecade"));
  }
  return (0, import_jsx_runtime8.jsx)(Tile, __assign5({}, otherProps, { classes: classesProps, maxDateTransform: getYearEnd, minDateTransform: getYearStart, view: "decade", children: formatYear2(locale, date) }));
}

// node_modules/react-calendar/dist/DecadeView/Years.js
var __assign6 = function() {
  __assign6 = Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
        t[p] = s[p];
    }
    return t;
  };
  return __assign6.apply(this, arguments);
};
var __rest5 = function(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
    t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
      if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
        t[p[i]] = s[p[i]];
    }
  return t;
};
function Years(props) {
  var activeStartDate = props.activeStartDate, hover = props.hover, showNeighboringDecade = props.showNeighboringDecade, value = props.value, valueType = props.valueType, otherProps = __rest5(props, ["activeStartDate", "hover", "showNeighboringDecade", "value", "valueType"]);
  var start = getBeginOfDecadeYear(activeStartDate);
  var end = start + (showNeighboringDecade ? 11 : 9);
  return (0, import_jsx_runtime9.jsx)(TileGroup, { className: "react-calendar__decade-view__years", dateTransform: getYearStart, dateType: "year", end, hover, renderTile: function(_a) {
    var date = _a.date, otherTileProps = __rest5(_a, ["date"]);
    return (0, import_jsx_runtime9.jsx)(Year, __assign6({}, otherProps, otherTileProps, { activeStartDate, currentDecade: start, date }), date.getTime());
  }, start, value, valueType });
}

// node_modules/react-calendar/dist/DecadeView.js
var __assign7 = function() {
  __assign7 = Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
        t[p] = s[p];
    }
    return t;
  };
  return __assign7.apply(this, arguments);
};
function DecadeView(props) {
  function renderYears() {
    return (0, import_jsx_runtime10.jsx)(Years, __assign7({}, props));
  }
  return (0, import_jsx_runtime10.jsx)("div", { className: "react-calendar__decade-view", children: renderYears() });
}

// node_modules/react-calendar/dist/YearView.js
var import_jsx_runtime13 = __toESM(require_jsx_runtime(), 1);

// node_modules/react-calendar/dist/YearView/Months.js
var import_jsx_runtime12 = __toESM(require_jsx_runtime(), 1);

// node_modules/react-calendar/dist/YearView/Month.js
var import_jsx_runtime11 = __toESM(require_jsx_runtime(), 1);
var __assign8 = function() {
  __assign8 = Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
        t[p] = s[p];
    }
    return t;
  };
  return __assign8.apply(this, arguments);
};
var __rest6 = function(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
    t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
      if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
        t[p[i]] = s[p[i]];
    }
  return t;
};
var __spreadArray = function(to, from, pack) {
  if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
    if (ar || !(i in from)) {
      if (!ar) ar = Array.prototype.slice.call(from, 0, i);
      ar[i] = from[i];
    }
  }
  return to.concat(ar || Array.prototype.slice.call(from));
};
var className4 = "react-calendar__year-view__months__month";
function Month(_a) {
  var _b = _a.classes, classes = _b === void 0 ? [] : _b, _c = _a.formatMonth, formatMonth3 = _c === void 0 ? formatMonth : _c, _d = _a.formatMonthYear, formatMonthYear2 = _d === void 0 ? formatMonthYear : _d, otherProps = __rest6(_a, ["classes", "formatMonth", "formatMonthYear"]);
  var date = otherProps.date, locale = otherProps.locale;
  return (0, import_jsx_runtime11.jsx)(Tile, __assign8({}, otherProps, { classes: __spreadArray(__spreadArray([], classes, true), [className4], false), formatAbbr: formatMonthYear2, maxDateTransform: getMonthEnd, minDateTransform: getMonthStart, view: "year", children: formatMonth3(locale, date) }));
}

// node_modules/react-calendar/dist/YearView/Months.js
var __assign9 = function() {
  __assign9 = Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
        t[p] = s[p];
    }
    return t;
  };
  return __assign9.apply(this, arguments);
};
var __rest7 = function(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
    t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
      if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
        t[p[i]] = s[p[i]];
    }
  return t;
};
function Months(props) {
  var activeStartDate = props.activeStartDate, hover = props.hover, value = props.value, valueType = props.valueType, otherProps = __rest7(props, ["activeStartDate", "hover", "value", "valueType"]);
  var start = 0;
  var end = 11;
  var year = getYear(activeStartDate);
  return (0, import_jsx_runtime12.jsx)(TileGroup, { className: "react-calendar__year-view__months", dateTransform: function(monthIndex) {
    var date = /* @__PURE__ */ new Date();
    date.setFullYear(year, monthIndex, 1);
    return getMonthStart(date);
  }, dateType: "month", end, hover, renderTile: function(_a) {
    var date = _a.date, otherTileProps = __rest7(_a, ["date"]);
    return (0, import_jsx_runtime12.jsx)(Month, __assign9({}, otherProps, otherTileProps, { activeStartDate, date }), date.getTime());
  }, start, value, valueType });
}

// node_modules/react-calendar/dist/YearView.js
var __assign10 = function() {
  __assign10 = Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
        t[p] = s[p];
    }
    return t;
  };
  return __assign10.apply(this, arguments);
};
function YearView(props) {
  function renderMonths() {
    return (0, import_jsx_runtime13.jsx)(Months, __assign10({}, props));
  }
  return (0, import_jsx_runtime13.jsx)("div", { className: "react-calendar__year-view", children: renderMonths() });
}

// node_modules/react-calendar/dist/MonthView.js
var import_jsx_runtime19 = __toESM(require_jsx_runtime(), 1);

// node_modules/react-calendar/dist/MonthView/Days.js
var import_jsx_runtime15 = __toESM(require_jsx_runtime(), 1);

// node_modules/react-calendar/dist/MonthView/Day.js
var import_jsx_runtime14 = __toESM(require_jsx_runtime(), 1);
var __assign11 = function() {
  __assign11 = Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
        t[p] = s[p];
    }
    return t;
  };
  return __assign11.apply(this, arguments);
};
var __rest8 = function(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
    t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
      if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
        t[p[i]] = s[p[i]];
    }
  return t;
};
var className5 = "react-calendar__month-view__days__day";
function Day(_a) {
  var calendarType = _a.calendarType, _b = _a.classes, classes = _b === void 0 ? [] : _b, currentMonthIndex = _a.currentMonthIndex, _c = _a.formatDay, formatDay2 = _c === void 0 ? formatDay : _c, _d = _a.formatLongDate, formatLongDate2 = _d === void 0 ? formatLongDate : _d, otherProps = __rest8(_a, ["calendarType", "classes", "currentMonthIndex", "formatDay", "formatLongDate"]);
  var date = otherProps.date, locale = otherProps.locale;
  var classesProps = [];
  if (classes) {
    classesProps.push.apply(classesProps, classes);
  }
  if (className5) {
    classesProps.push(className5);
  }
  if (isWeekend(date, calendarType)) {
    classesProps.push("".concat(className5, "--weekend"));
  }
  if (date.getMonth() !== currentMonthIndex) {
    classesProps.push("".concat(className5, "--neighboringMonth"));
  }
  return (0, import_jsx_runtime14.jsx)(Tile, __assign11({}, otherProps, { classes: classesProps, formatAbbr: formatLongDate2, maxDateTransform: getDayEnd, minDateTransform: getDayStart, view: "month", children: formatDay2(locale, date) }));
}

// node_modules/react-calendar/dist/MonthView/Days.js
var __assign12 = function() {
  __assign12 = Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
        t[p] = s[p];
    }
    return t;
  };
  return __assign12.apply(this, arguments);
};
var __rest9 = function(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
    t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
      if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
        t[p[i]] = s[p[i]];
    }
  return t;
};
function Days(props) {
  var activeStartDate = props.activeStartDate, calendarType = props.calendarType, hover = props.hover, showFixedNumberOfWeeks = props.showFixedNumberOfWeeks, showNeighboringMonth = props.showNeighboringMonth, value = props.value, valueType = props.valueType, otherProps = __rest9(props, ["activeStartDate", "calendarType", "hover", "showFixedNumberOfWeeks", "showNeighboringMonth", "value", "valueType"]);
  var year = getYear(activeStartDate);
  var monthIndex = getMonth(activeStartDate);
  var hasFixedNumberOfWeeks = showFixedNumberOfWeeks || showNeighboringMonth;
  var dayOfWeek = getDayOfWeek(activeStartDate, calendarType);
  var offset = hasFixedNumberOfWeeks ? 0 : dayOfWeek;
  var start = (hasFixedNumberOfWeeks ? -dayOfWeek : 0) + 1;
  var end = (function() {
    if (showFixedNumberOfWeeks) {
      return start + 6 * 7 - 1;
    }
    var daysInMonth = getDaysInMonth(activeStartDate);
    if (showNeighboringMonth) {
      var activeEndDate = /* @__PURE__ */ new Date();
      activeEndDate.setFullYear(year, monthIndex, daysInMonth);
      activeEndDate.setHours(0, 0, 0, 0);
      var daysUntilEndOfTheWeek = 7 - getDayOfWeek(activeEndDate, calendarType) - 1;
      return daysInMonth + daysUntilEndOfTheWeek;
    }
    return daysInMonth;
  })();
  return (0, import_jsx_runtime15.jsx)(TileGroup, { className: "react-calendar__month-view__days", count: 7, dateTransform: function(day) {
    var date = /* @__PURE__ */ new Date();
    date.setFullYear(year, monthIndex, day);
    return getDayStart(date);
  }, dateType: "day", hover, end, renderTile: function(_a) {
    var date = _a.date, otherTileProps = __rest9(_a, ["date"]);
    return (0, import_jsx_runtime15.jsx)(Day, __assign12({}, otherProps, otherTileProps, { activeStartDate, calendarType, currentMonthIndex: monthIndex, date }), date.getTime());
  }, offset, start, value, valueType });
}

// node_modules/react-calendar/dist/MonthView/Weekdays.js
var import_jsx_runtime16 = __toESM(require_jsx_runtime(), 1);
var className6 = "react-calendar__month-view__weekdays";
var weekdayClassName = "".concat(className6, "__weekday");
function Weekdays(props) {
  var calendarType = props.calendarType, _a = props.formatShortWeekday, formatShortWeekday2 = _a === void 0 ? formatShortWeekday : _a, _b = props.formatWeekday, formatWeekday2 = _b === void 0 ? formatWeekday : _b, locale = props.locale, onMouseLeave = props.onMouseLeave;
  var anyDate = /* @__PURE__ */ new Date();
  var beginOfMonth = getMonthStart(anyDate);
  var year = getYear(beginOfMonth);
  var monthIndex = getMonth(beginOfMonth);
  var weekdays = [];
  for (var weekday = 1; weekday <= 7; weekday += 1) {
    var weekdayDate = new Date(year, monthIndex, weekday - getDayOfWeek(beginOfMonth, calendarType));
    var abbr = formatWeekday2(locale, weekdayDate);
    weekdays.push((0, import_jsx_runtime16.jsx)("div", { className: clsx_default(weekdayClassName, isCurrentDayOfWeek(weekdayDate) && "".concat(weekdayClassName, "--current"), isWeekend(weekdayDate, calendarType) && "".concat(weekdayClassName, "--weekend")), children: (0, import_jsx_runtime16.jsx)("abbr", { "aria-label": abbr, title: abbr, children: formatShortWeekday2(locale, weekdayDate).replace(".", "") }) }, weekday));
  }
  return (0, import_jsx_runtime16.jsx)(Flex, { className: className6, count: 7, onFocus: onMouseLeave, onMouseOver: onMouseLeave, children: weekdays });
}

// node_modules/react-calendar/dist/MonthView/WeekNumbers.js
var import_jsx_runtime18 = __toESM(require_jsx_runtime(), 1);

// node_modules/react-calendar/dist/MonthView/WeekNumber.js
var import_jsx_runtime17 = __toESM(require_jsx_runtime(), 1);
var __assign13 = function() {
  __assign13 = Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
        t[p] = s[p];
    }
    return t;
  };
  return __assign13.apply(this, arguments);
};
var __rest10 = function(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
    t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
      if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
        t[p[i]] = s[p[i]];
    }
  return t;
};
var className7 = "react-calendar__tile";
function WeekNumber(props) {
  var onClickWeekNumber = props.onClickWeekNumber, weekNumber = props.weekNumber;
  var children = (0, import_jsx_runtime17.jsx)("span", { children: weekNumber });
  if (onClickWeekNumber) {
    var date_1 = props.date, onClickWeekNumber_1 = props.onClickWeekNumber, weekNumber_1 = props.weekNumber, otherProps = __rest10(props, ["date", "onClickWeekNumber", "weekNumber"]);
    return (0, import_jsx_runtime17.jsx)("button", __assign13({}, otherProps, { className: className7, onClick: function(event) {
      return onClickWeekNumber_1(weekNumber_1, date_1, event);
    }, type: "button", children }));
  } else {
    var date = props.date, onClickWeekNumber_2 = props.onClickWeekNumber, weekNumber_2 = props.weekNumber, otherProps = __rest10(props, ["date", "onClickWeekNumber", "weekNumber"]);
    return (0, import_jsx_runtime17.jsx)("div", __assign13({}, otherProps, { className: className7, children }));
  }
}

// node_modules/react-calendar/dist/MonthView/WeekNumbers.js
function WeekNumbers(props) {
  var activeStartDate = props.activeStartDate, calendarType = props.calendarType, onClickWeekNumber = props.onClickWeekNumber, onMouseLeave = props.onMouseLeave, showFixedNumberOfWeeks = props.showFixedNumberOfWeeks;
  var numberOfWeeks = (function() {
    if (showFixedNumberOfWeeks) {
      return 6;
    }
    var numberOfDays = getDaysInMonth(activeStartDate);
    var startWeekday = getDayOfWeek(activeStartDate, calendarType);
    var days = numberOfDays - (7 - startWeekday);
    return 1 + Math.ceil(days / 7);
  })();
  var dates = (function() {
    var year = getYear(activeStartDate);
    var monthIndex = getMonth(activeStartDate);
    var day = getDate(activeStartDate);
    var result = [];
    for (var index = 0; index < numberOfWeeks; index += 1) {
      result.push(getBeginOfWeek(new Date(year, monthIndex, day + index * 7), calendarType));
    }
    return result;
  })();
  var weekNumbers = dates.map(function(date) {
    return getWeekNumber(date, calendarType);
  });
  return (0, import_jsx_runtime18.jsx)(Flex, { className: "react-calendar__month-view__weekNumbers", count: numberOfWeeks, direction: "column", onFocus: onMouseLeave, onMouseOver: onMouseLeave, style: { flexBasis: "calc(100% * (1 / 8)", flexShrink: 0 }, children: weekNumbers.map(function(weekNumber, weekIndex) {
    var date = dates[weekIndex];
    if (!date) {
      throw new Error("date is not defined");
    }
    return (0, import_jsx_runtime18.jsx)(WeekNumber, { date, onClickWeekNumber, weekNumber }, weekNumber);
  }) });
}

// node_modules/react-calendar/dist/MonthView.js
var __assign14 = function() {
  __assign14 = Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
        t[p] = s[p];
    }
    return t;
  };
  return __assign14.apply(this, arguments);
};
var __rest11 = function(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
    t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
      if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
        t[p[i]] = s[p[i]];
    }
  return t;
};
function getCalendarTypeFromLocale(locale) {
  if (locale) {
    for (var _i = 0, _a = Object.entries(CALENDAR_TYPE_LOCALES); _i < _a.length; _i++) {
      var _b = _a[_i], calendarType = _b[0], locales = _b[1];
      if (locales.includes(locale)) {
        return calendarType;
      }
    }
  }
  return CALENDAR_TYPES.ISO_8601;
}
function MonthView(props) {
  var activeStartDate = props.activeStartDate, locale = props.locale, onMouseLeave = props.onMouseLeave, showFixedNumberOfWeeks = props.showFixedNumberOfWeeks;
  var _a = props.calendarType, calendarType = _a === void 0 ? getCalendarTypeFromLocale(locale) : _a, formatShortWeekday2 = props.formatShortWeekday, formatWeekday2 = props.formatWeekday, onClickWeekNumber = props.onClickWeekNumber, showWeekNumbers = props.showWeekNumbers, childProps = __rest11(props, ["calendarType", "formatShortWeekday", "formatWeekday", "onClickWeekNumber", "showWeekNumbers"]);
  function renderWeekdays() {
    return (0, import_jsx_runtime19.jsx)(Weekdays, { calendarType, formatShortWeekday: formatShortWeekday2, formatWeekday: formatWeekday2, locale, onMouseLeave });
  }
  function renderWeekNumbers() {
    if (!showWeekNumbers) {
      return null;
    }
    return (0, import_jsx_runtime19.jsx)(WeekNumbers, { activeStartDate, calendarType, onClickWeekNumber, onMouseLeave, showFixedNumberOfWeeks });
  }
  function renderDays() {
    return (0, import_jsx_runtime19.jsx)(Days, __assign14({ calendarType }, childProps));
  }
  var className8 = "react-calendar__month-view";
  return (0, import_jsx_runtime19.jsx)("div", { className: clsx_default(className8, showWeekNumbers ? "".concat(className8, "--weekNumbers") : ""), children: (0, import_jsx_runtime19.jsxs)("div", { style: {
    display: "flex",
    alignItems: "flex-end"
  }, children: [renderWeekNumbers(), (0, import_jsx_runtime19.jsxs)("div", { style: {
    flexGrow: 1,
    width: "100%"
  }, children: [renderWeekdays(), renderDays()] })] }) });
}

// node_modules/react-calendar/dist/Calendar.js
var __assign15 = function() {
  __assign15 = Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
        t[p] = s[p];
    }
    return t;
  };
  return __assign15.apply(this, arguments);
};
var baseClassName = "react-calendar";
var allViews = ["century", "decade", "year", "month"];
var allValueTypes = ["decade", "year", "month", "day"];
var defaultMinDate = /* @__PURE__ */ new Date();
defaultMinDate.setFullYear(1, 0, 1);
defaultMinDate.setHours(0, 0, 0, 0);
var defaultMaxDate = /* @__PURE__ */ new Date(864e13);
function toDate(value) {
  if (value instanceof Date) {
    return value;
  }
  return new Date(value);
}
function getLimitedViews(minDetail, maxDetail) {
  return allViews.slice(allViews.indexOf(minDetail), allViews.indexOf(maxDetail) + 1);
}
function isViewAllowed(view, minDetail, maxDetail) {
  var views = getLimitedViews(minDetail, maxDetail);
  return views.indexOf(view) !== -1;
}
function getView(view, minDetail, maxDetail) {
  if (!view) {
    return maxDetail;
  }
  if (isViewAllowed(view, minDetail, maxDetail)) {
    return view;
  }
  return maxDetail;
}
function getValueType(view) {
  var index = allViews.indexOf(view);
  return allValueTypes[index];
}
function getValue(value, index) {
  var rawValue = Array.isArray(value) ? value[index] : value;
  if (!rawValue) {
    return null;
  }
  var valueDate = toDate(rawValue);
  if (Number.isNaN(valueDate.getTime())) {
    throw new Error("Invalid date: ".concat(value));
  }
  return valueDate;
}
function getDetailValue(_a, index) {
  var value = _a.value, minDate = _a.minDate, maxDate = _a.maxDate, maxDetail = _a.maxDetail;
  var valuePiece = getValue(value, index);
  if (!valuePiece) {
    return null;
  }
  var valueType = getValueType(maxDetail);
  var detailValueFrom = (function() {
    switch (index) {
      case 0:
        return getBegin(valueType, valuePiece);
      case 1:
        return getEnd(valueType, valuePiece);
      default:
        throw new Error("Invalid index value: ".concat(index));
    }
  })();
  return between(detailValueFrom, minDate, maxDate);
}
var getDetailValueFrom = function(args) {
  return getDetailValue(args, 0);
};
var getDetailValueTo = function(args) {
  return getDetailValue(args, 1);
};
var getDetailValueArray = function(args) {
  return [getDetailValueFrom, getDetailValueTo].map(function(fn) {
    return fn(args);
  });
};
function getActiveStartDate(_a) {
  var maxDate = _a.maxDate, maxDetail = _a.maxDetail, minDate = _a.minDate, minDetail = _a.minDetail, value = _a.value, view = _a.view;
  var rangeType = getView(view, minDetail, maxDetail);
  var valueFrom = getDetailValueFrom({
    value,
    minDate,
    maxDate,
    maxDetail
  }) || /* @__PURE__ */ new Date();
  return getBegin(rangeType, valueFrom);
}
function getInitialActiveStartDate(_a) {
  var activeStartDate = _a.activeStartDate, defaultActiveStartDate = _a.defaultActiveStartDate, defaultValue = _a.defaultValue, defaultView = _a.defaultView, maxDate = _a.maxDate, maxDetail = _a.maxDetail, minDate = _a.minDate, minDetail = _a.minDetail, value = _a.value, view = _a.view;
  var rangeType = getView(view, minDetail, maxDetail);
  var valueFrom = activeStartDate || defaultActiveStartDate;
  if (valueFrom) {
    return getBegin(rangeType, valueFrom);
  }
  return getActiveStartDate({
    maxDate,
    maxDetail,
    minDate,
    minDetail,
    value: value || defaultValue,
    view: view || defaultView
  });
}
function getIsSingleValue(value) {
  return value && (!Array.isArray(value) || value.length === 1);
}
function areDatesEqual(date1, date2) {
  return date1 instanceof Date && date2 instanceof Date && date1.getTime() === date2.getTime();
}
var Calendar = (0, import_react3.forwardRef)(function Calendar2(props, ref) {
  var activeStartDateProps = props.activeStartDate, allowPartialRange = props.allowPartialRange, calendarType = props.calendarType, className8 = props.className, defaultActiveStartDate = props.defaultActiveStartDate, defaultValue = props.defaultValue, defaultView = props.defaultView, formatDay2 = props.formatDay, formatLongDate2 = props.formatLongDate, formatMonth3 = props.formatMonth, formatMonthYear2 = props.formatMonthYear, formatShortWeekday2 = props.formatShortWeekday, formatWeekday2 = props.formatWeekday, formatYear2 = props.formatYear, _a = props.goToRangeStartOnSelect, goToRangeStartOnSelect = _a === void 0 ? true : _a, inputRef = props.inputRef, locale = props.locale, _b = props.maxDate, maxDate = _b === void 0 ? defaultMaxDate : _b, _c = props.maxDetail, maxDetail = _c === void 0 ? "month" : _c, _d = props.minDate, minDate = _d === void 0 ? defaultMinDate : _d, _e = props.minDetail, minDetail = _e === void 0 ? "century" : _e, navigationAriaLabel = props.navigationAriaLabel, navigationAriaLive = props.navigationAriaLive, navigationLabel = props.navigationLabel, next2AriaLabel = props.next2AriaLabel, next2Label = props.next2Label, nextAriaLabel = props.nextAriaLabel, nextLabel = props.nextLabel, onActiveStartDateChange = props.onActiveStartDateChange, onChangeProps = props.onChange, onClickDay = props.onClickDay, onClickDecade = props.onClickDecade, onClickMonth = props.onClickMonth, onClickWeekNumber = props.onClickWeekNumber, onClickYear = props.onClickYear, onDrillDown = props.onDrillDown, onDrillUp = props.onDrillUp, onViewChange = props.onViewChange, prev2AriaLabel = props.prev2AriaLabel, prev2Label = props.prev2Label, prevAriaLabel = props.prevAriaLabel, prevLabel = props.prevLabel, _f = props.returnValue, returnValue = _f === void 0 ? "start" : _f, selectRange = props.selectRange, showDoubleView = props.showDoubleView, showFixedNumberOfWeeks = props.showFixedNumberOfWeeks, _g = props.showNavigation, showNavigation = _g === void 0 ? true : _g, showNeighboringCentury = props.showNeighboringCentury, showNeighboringDecade = props.showNeighboringDecade, _h = props.showNeighboringMonth, showNeighboringMonth = _h === void 0 ? true : _h, showWeekNumbers = props.showWeekNumbers, tileClassName = props.tileClassName, tileContent = props.tileContent, tileDisabled = props.tileDisabled, valueProps = props.value, viewProps = props.view;
  var _j = (0, import_react3.useState)(defaultActiveStartDate), activeStartDateState = _j[0], setActiveStartDateState = _j[1];
  var _k = (0, import_react3.useState)(null), hoverState = _k[0], setHoverState = _k[1];
  var _l = (0, import_react3.useState)(Array.isArray(defaultValue) ? defaultValue.map(function(el) {
    return el !== null ? toDate(el) : null;
  }) : defaultValue !== null && defaultValue !== void 0 ? toDate(defaultValue) : null), valueState = _l[0], setValueState = _l[1];
  var _m = (0, import_react3.useState)(defaultView), viewState = _m[0], setViewState = _m[1];
  var activeStartDate = activeStartDateProps || activeStartDateState || getInitialActiveStartDate({
    activeStartDate: activeStartDateProps,
    defaultActiveStartDate,
    defaultValue,
    defaultView,
    maxDate,
    maxDetail,
    minDate,
    minDetail,
    value: valueProps,
    view: viewProps
  });
  var value = (function() {
    var rawValue = (function() {
      if (selectRange && getIsSingleValue(valueState)) {
        return valueState;
      }
      return valueProps !== void 0 ? valueProps : valueState;
    })();
    if (!rawValue) {
      return null;
    }
    return Array.isArray(rawValue) ? rawValue.map(function(el) {
      return el !== null ? toDate(el) : null;
    }) : rawValue !== null ? toDate(rawValue) : null;
  })();
  var valueType = getValueType(maxDetail);
  var view = getView(viewProps || viewState, minDetail, maxDetail);
  var views = getLimitedViews(minDetail, maxDetail);
  var hover = selectRange ? hoverState : null;
  var drillDownAvailable = views.indexOf(view) < views.length - 1;
  var drillUpAvailable = views.indexOf(view) > 0;
  var getProcessedValue = (0, import_react3.useCallback)(function(value2) {
    var processFunction = (function() {
      switch (returnValue) {
        case "start":
          return getDetailValueFrom;
        case "end":
          return getDetailValueTo;
        case "range":
          return getDetailValueArray;
        default:
          throw new Error("Invalid returnValue.");
      }
    })();
    return processFunction({
      maxDate,
      maxDetail,
      minDate,
      value: value2
    });
  }, [maxDate, maxDetail, minDate, returnValue]);
  var setActiveStartDate = (0, import_react3.useCallback)(function(nextActiveStartDate, action) {
    setActiveStartDateState(nextActiveStartDate);
    var args = {
      action,
      activeStartDate: nextActiveStartDate,
      value,
      view
    };
    if (onActiveStartDateChange && !areDatesEqual(activeStartDate, nextActiveStartDate)) {
      onActiveStartDateChange(args);
    }
  }, [activeStartDate, onActiveStartDateChange, value, view]);
  var onClickTile = (0, import_react3.useCallback)(function(value2, event) {
    var callback = (function() {
      switch (view) {
        case "century":
          return onClickDecade;
        case "decade":
          return onClickYear;
        case "year":
          return onClickMonth;
        case "month":
          return onClickDay;
        default:
          throw new Error("Invalid view: ".concat(view, "."));
      }
    })();
    if (callback)
      callback(value2, event);
  }, [onClickDay, onClickDecade, onClickMonth, onClickYear, view]);
  var drillDown = (0, import_react3.useCallback)(function(nextActiveStartDate, event) {
    if (!drillDownAvailable) {
      return;
    }
    onClickTile(nextActiveStartDate, event);
    var nextView = views[views.indexOf(view) + 1];
    if (!nextView) {
      throw new Error("Attempted to drill down from the lowest view.");
    }
    setActiveStartDateState(nextActiveStartDate);
    setViewState(nextView);
    var args = {
      action: "drillDown",
      activeStartDate: nextActiveStartDate,
      value,
      view: nextView
    };
    if (onActiveStartDateChange && !areDatesEqual(activeStartDate, nextActiveStartDate)) {
      onActiveStartDateChange(args);
    }
    if (onViewChange && view !== nextView) {
      onViewChange(args);
    }
    if (onDrillDown) {
      onDrillDown(args);
    }
  }, [
    activeStartDate,
    drillDownAvailable,
    onActiveStartDateChange,
    onClickTile,
    onDrillDown,
    onViewChange,
    value,
    view,
    views
  ]);
  var drillUp = (0, import_react3.useCallback)(function() {
    if (!drillUpAvailable) {
      return;
    }
    var nextView = views[views.indexOf(view) - 1];
    if (!nextView) {
      throw new Error("Attempted to drill up from the highest view.");
    }
    var nextActiveStartDate = getBegin(nextView, activeStartDate);
    setActiveStartDateState(nextActiveStartDate);
    setViewState(nextView);
    var args = {
      action: "drillUp",
      activeStartDate: nextActiveStartDate,
      value,
      view: nextView
    };
    if (onActiveStartDateChange && !areDatesEqual(activeStartDate, nextActiveStartDate)) {
      onActiveStartDateChange(args);
    }
    if (onViewChange && view !== nextView) {
      onViewChange(args);
    }
    if (onDrillUp) {
      onDrillUp(args);
    }
  }, [
    activeStartDate,
    drillUpAvailable,
    onActiveStartDateChange,
    onDrillUp,
    onViewChange,
    value,
    view,
    views
  ]);
  var onChange = (0, import_react3.useCallback)(function(rawNextValue, event) {
    var previousValue = value;
    onClickTile(rawNextValue, event);
    var isFirstValueInRange = selectRange && !getIsSingleValue(previousValue);
    var nextValue;
    if (selectRange) {
      if (isFirstValueInRange) {
        nextValue = getBegin(valueType, rawNextValue);
      } else {
        if (!previousValue) {
          throw new Error("previousValue is required");
        }
        if (Array.isArray(previousValue)) {
          throw new Error("previousValue must not be an array");
        }
        nextValue = getValueRange(valueType, previousValue, rawNextValue);
      }
    } else {
      nextValue = getProcessedValue(rawNextValue);
    }
    var nextActiveStartDate = (
      // Range selection turned off
      !selectRange || // Range selection turned on, first value
      isFirstValueInRange || // Range selection turned on, second value, goToRangeStartOnSelect toggled on
      goToRangeStartOnSelect ? getActiveStartDate({
        maxDate,
        maxDetail,
        minDate,
        minDetail,
        value: nextValue,
        view
      }) : null
    );
    event.persist();
    setActiveStartDateState(nextActiveStartDate);
    setValueState(nextValue);
    var args = {
      action: "onChange",
      activeStartDate: nextActiveStartDate,
      value: nextValue,
      view
    };
    if (onActiveStartDateChange && !areDatesEqual(activeStartDate, nextActiveStartDate)) {
      onActiveStartDateChange(args);
    }
    if (onChangeProps) {
      if (selectRange) {
        var isSingleValue = getIsSingleValue(nextValue);
        if (!isSingleValue) {
          onChangeProps(nextValue || null, event);
        } else if (allowPartialRange) {
          if (Array.isArray(nextValue)) {
            throw new Error("value must not be an array");
          }
          onChangeProps([nextValue || null, null], event);
        }
      } else {
        onChangeProps(nextValue || null, event);
      }
    }
  }, [
    activeStartDate,
    allowPartialRange,
    getProcessedValue,
    goToRangeStartOnSelect,
    maxDate,
    maxDetail,
    minDate,
    minDetail,
    onActiveStartDateChange,
    onChangeProps,
    onClickTile,
    selectRange,
    value,
    valueType,
    view
  ]);
  function onMouseOver(nextHover) {
    setHoverState(nextHover);
  }
  function onMouseLeave() {
    setHoverState(null);
  }
  (0, import_react3.useImperativeHandle)(ref, function() {
    return {
      activeStartDate,
      drillDown,
      drillUp,
      onChange,
      setActiveStartDate,
      value,
      view
    };
  }, [activeStartDate, drillDown, drillUp, onChange, setActiveStartDate, value, view]);
  function renderContent(next) {
    var currentActiveStartDate = next ? getBeginNext(view, activeStartDate) : getBegin(view, activeStartDate);
    var onClick = drillDownAvailable ? drillDown : onChange;
    var commonProps = {
      activeStartDate: currentActiveStartDate,
      hover,
      locale,
      maxDate,
      minDate,
      onClick,
      onMouseOver: selectRange ? onMouseOver : void 0,
      tileClassName,
      tileContent,
      tileDisabled,
      value,
      valueType
    };
    switch (view) {
      case "century": {
        return (0, import_jsx_runtime20.jsx)(CenturyView, __assign15({ formatYear: formatYear2, showNeighboringCentury }, commonProps));
      }
      case "decade": {
        return (0, import_jsx_runtime20.jsx)(DecadeView, __assign15({ formatYear: formatYear2, showNeighboringDecade }, commonProps));
      }
      case "year": {
        return (0, import_jsx_runtime20.jsx)(YearView, __assign15({ formatMonth: formatMonth3, formatMonthYear: formatMonthYear2 }, commonProps));
      }
      case "month": {
        return (0, import_jsx_runtime20.jsx)(MonthView, __assign15({ calendarType, formatDay: formatDay2, formatLongDate: formatLongDate2, formatShortWeekday: formatShortWeekday2, formatWeekday: formatWeekday2, onClickWeekNumber, onMouseLeave: selectRange ? onMouseLeave : void 0, showFixedNumberOfWeeks: typeof showFixedNumberOfWeeks !== "undefined" ? showFixedNumberOfWeeks : showDoubleView, showNeighboringMonth, showWeekNumbers }, commonProps));
      }
      default:
        throw new Error("Invalid view: ".concat(view, "."));
    }
  }
  function renderNavigation() {
    if (!showNavigation) {
      return null;
    }
    return (0, import_jsx_runtime20.jsx)(Navigation, { activeStartDate, drillUp, formatMonthYear: formatMonthYear2, formatYear: formatYear2, locale, maxDate, minDate, navigationAriaLabel, navigationAriaLive, navigationLabel, next2AriaLabel, next2Label, nextAriaLabel, nextLabel, prev2AriaLabel, prev2Label, prevAriaLabel, prevLabel, setActiveStartDate, showDoubleView, view, views });
  }
  var valueArray = Array.isArray(value) ? value : [value];
  return (0, import_jsx_runtime20.jsxs)("div", { className: clsx_default(baseClassName, selectRange && valueArray.length === 1 && "".concat(baseClassName, "--selectRange"), showDoubleView && "".concat(baseClassName, "--doubleView"), className8), ref: inputRef, children: [renderNavigation(), (0, import_jsx_runtime20.jsxs)("div", { className: "".concat(baseClassName, "__viewContainer"), onBlur: selectRange ? onMouseLeave : void 0, onMouseLeave: selectRange ? onMouseLeave : void 0, children: [renderContent(), showDoubleView ? renderContent(true) : null] })] });
});
var Calendar_default = Calendar;

// node_modules/react-calendar/dist/index.js
var dist_default2 = Calendar_default;

// node_modules/react-fit/dist/Fit.js
var import_jsx_runtime21 = __toESM(require_jsx_runtime(), 1);
var import_react4 = __toESM(require_react(), 1);

// node_modules/detect-element-overflow/dist/index.js
function getRect(element) {
  return element.getBoundingClientRect();
}
function detectElementOverflow(element, container) {
  return {
    get collidedTop() {
      return getRect(element).top < getRect(container).top;
    },
    get collidedBottom() {
      return getRect(element).bottom > getRect(container).bottom;
    },
    get collidedLeft() {
      return getRect(element).left < getRect(container).left;
    },
    get collidedRight() {
      return getRect(element).right > getRect(container).right;
    },
    get overflowTop() {
      return getRect(container).top - getRect(element).top;
    },
    get overflowBottom() {
      return getRect(element).bottom - getRect(container).bottom;
    },
    get overflowLeft() {
      return getRect(container).left - getRect(element).left;
    },
    get overflowRight() {
      return getRect(element).right - getRect(container).right;
    }
  };
}

// node_modules/react-fit/dist/Fit.js
var import_warning = __toESM(require_warning(), 1);
var __rest12 = function(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
    t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
      if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
        t[p[i]] = s[p[i]];
    }
  return t;
};
var isBrowser = typeof window !== "undefined";
var isMutationObserverSupported = isBrowser && "MutationObserver" in window;
function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
function findScrollContainer(element) {
  let parent = element.parentElement;
  while (parent) {
    const { overflow } = window.getComputedStyle(parent);
    if (overflow.split(" ").every((o) => o === "auto" || o === "scroll")) {
      return parent;
    }
    parent = parent.parentElement;
  }
  return document.documentElement;
}
function alignAxis({ axis, container, element, invertAxis, scrollContainer, secondary, spacing }) {
  const style = window.getComputedStyle(element);
  const parent = container.parentElement;
  if (!parent) {
    return;
  }
  const scrollContainerCollisions = detectElementOverflow(parent, scrollContainer);
  const documentCollisions = detectElementOverflow(parent, document.documentElement);
  const isX = axis === "x";
  const startProperty = isX ? "left" : "top";
  const endProperty = isX ? "right" : "bottom";
  const sizeProperty = isX ? "width" : "height";
  const overflowStartProperty = `overflow${capitalize(startProperty)}`;
  const overflowEndProperty = `overflow${capitalize(endProperty)}`;
  const scrollProperty = `scroll${capitalize(startProperty)}`;
  const uppercasedSizeProperty = capitalize(sizeProperty);
  const offsetSizeProperty = `offset${uppercasedSizeProperty}`;
  const clientSizeProperty = `client${uppercasedSizeProperty}`;
  const minSizeProperty = `min-${sizeProperty}`;
  const scrollbarWidth = scrollContainer[offsetSizeProperty] - scrollContainer[clientSizeProperty];
  const startSpacing = typeof spacing === "object" ? spacing[startProperty] : spacing;
  let availableStartSpace = -Math.max(scrollContainerCollisions[overflowStartProperty], documentCollisions[overflowStartProperty] + document.documentElement[scrollProperty]) - startSpacing;
  const endSpacing = typeof spacing === "object" ? spacing[endProperty] : spacing;
  let availableEndSpace = -Math.max(scrollContainerCollisions[overflowEndProperty], documentCollisions[overflowEndProperty] - document.documentElement[scrollProperty]) - endSpacing - scrollbarWidth;
  if (secondary) {
    availableStartSpace += parent[clientSizeProperty];
    availableEndSpace += parent[clientSizeProperty];
  }
  const offsetSize = element[offsetSizeProperty];
  function displayStart() {
    element.style[startProperty] = "auto";
    element.style[endProperty] = secondary ? "0" : "100%";
  }
  function displayEnd() {
    element.style[startProperty] = secondary ? "0" : "100%";
    element.style[endProperty] = "auto";
  }
  function displayIfFits(availableSpace, display) {
    const fits2 = offsetSize <= availableSpace;
    if (fits2) {
      display();
    }
    return fits2;
  }
  function displayStartIfFits() {
    return displayIfFits(availableStartSpace, displayStart);
  }
  function displayEndIfFits() {
    return displayIfFits(availableEndSpace, displayEnd);
  }
  function displayWhereverShrinkedFits() {
    const moreSpaceStart = availableStartSpace > availableEndSpace;
    const rawMinSize = style.getPropertyValue(minSizeProperty);
    const minSize = rawMinSize ? Number.parseInt(rawMinSize, 10) : null;
    function shrinkToSize(size) {
      (0, import_warning.default)(!minSize || size >= minSize, `<Fit />'s child will not fit anywhere with its current ${minSizeProperty} of ${minSize}px.`);
      const newSize = Math.max(size, minSize || 0);
      (0, import_warning.default)(false, `<Fit />'s child needed to have its ${sizeProperty} decreased to ${newSize}px.`);
      element.style[sizeProperty] = `${newSize}px`;
    }
    if (moreSpaceStart) {
      shrinkToSize(availableStartSpace);
      displayStart();
    } else {
      shrinkToSize(availableEndSpace);
      displayEnd();
    }
  }
  let fits;
  if (invertAxis) {
    fits = displayStartIfFits() || displayEndIfFits();
  } else {
    fits = displayEndIfFits() || displayStartIfFits();
  }
  if (!fits) {
    displayWhereverShrinkedFits();
  }
}
function alignMainAxis(args) {
  alignAxis(args);
}
function alignSecondaryAxis(args) {
  alignAxis(Object.assign(Object.assign({}, args), { axis: args.axis === "x" ? "y" : "x", secondary: true }));
}
function alignBothAxis(args) {
  const { invertAxis, invertSecondaryAxis } = args, commonArgs = __rest12(args, ["invertAxis", "invertSecondaryAxis"]);
  alignMainAxis(Object.assign(Object.assign({}, commonArgs), { invertAxis }));
  alignSecondaryAxis(Object.assign(Object.assign({}, commonArgs), { invertAxis: invertSecondaryAxis }));
}
function Fit({ children, invertAxis, invertSecondaryAxis, mainAxis = "y", spacing = 8 }) {
  const container = (0, import_react4.useRef)(void 0);
  const element = (0, import_react4.useRef)(void 0);
  const elementWidth = (0, import_react4.useRef)(void 0);
  const elementHeight = (0, import_react4.useRef)(void 0);
  const scrollContainer = (0, import_react4.useRef)(void 0);
  const fit = (0, import_react4.useCallback)(() => {
    if (!scrollContainer.current || !container.current || !element.current) {
      return;
    }
    const currentElementWidth = element.current.clientWidth;
    const currentElementHeight = element.current.clientHeight;
    if (elementWidth.current === currentElementWidth && elementHeight.current === currentElementHeight) {
      return;
    }
    elementWidth.current = currentElementWidth;
    elementHeight.current = currentElementHeight;
    const parent = container.current.parentElement;
    if (!parent) {
      return;
    }
    const style = window.getComputedStyle(element.current);
    const { position } = style;
    if (position !== "absolute") {
      element.current.style.position = "absolute";
    }
    const parentStyle = window.getComputedStyle(parent);
    const { position: parentPosition } = parentStyle;
    if (parentPosition !== "relative" && parentPosition !== "absolute") {
      parent.style.position = "relative";
    }
    alignBothAxis({
      axis: mainAxis,
      container: container.current,
      element: element.current,
      invertAxis,
      invertSecondaryAxis,
      scrollContainer: scrollContainer.current,
      spacing
    });
  }, [invertAxis, invertSecondaryAxis, mainAxis, spacing]);
  const child = import_react4.Children.only(children);
  (0, import_react4.useEffect)(() => {
    fit();
    function onMutation() {
      fit();
    }
    if (isMutationObserverSupported && element.current) {
      const mutationObserver = new MutationObserver(onMutation);
      mutationObserver.observe(element.current, {
        attributes: true,
        attributeFilter: ["class", "style"]
      });
    }
  }, [fit]);
  function assignRefs(domElement) {
    if (!domElement || !(domElement instanceof HTMLElement)) {
      return;
    }
    element.current = domElement;
    scrollContainer.current = findScrollContainer(domElement);
  }
  return (0, import_jsx_runtime21.jsx)("span", { ref: (domContainer) => {
    if (!domContainer) {
      return;
    }
    container.current = domContainer;
    const domElement = domContainer === null || domContainer === void 0 ? void 0 : domContainer.firstElementChild;
    assignRefs(domElement);
  }, style: { display: "contents" }, children: child });
}

// node_modules/react-fit/dist/index.js
var dist_default3 = Fit;

// node_modules/react-date-picker/dist/DateInput.js
var import_jsx_runtime29 = __toESM(require_jsx_runtime(), 1);
var import_react6 = __toESM(require_react(), 1);

// node_modules/react-date-picker/dist/DateInput/DayInput.js
var import_jsx_runtime23 = __toESM(require_jsx_runtime(), 1);

// node_modules/react-date-picker/dist/DateInput/Input.js
var import_jsx_runtime22 = __toESM(require_jsx_runtime(), 1);
var import_react5 = __toESM(require_react(), 1);

// node_modules/update-input-width/dist/esm/index.js
var allowedVariants = ["normal", "small-caps"];
function getFontShorthand(element) {
  if (!element) {
    return "";
  }
  var style = window.getComputedStyle(element);
  if (style.font) {
    return style.font;
  }
  var isFontDefined = style.fontFamily !== "";
  if (!isFontDefined) {
    return "";
  }
  var fontVariant = allowedVariants.includes(style.fontVariant) ? style.fontVariant : "normal";
  return "".concat(style.fontStyle, " ").concat(fontVariant, " ").concat(style.fontWeight, " ").concat(style.fontSize, " / ").concat(style.lineHeight, " ").concat(style.fontFamily);
}
var cachedCanvas;
function measureText(text, font) {
  var canvas = cachedCanvas || (cachedCanvas = document.createElement("canvas"));
  var context = canvas.getContext("2d");
  if (!context) {
    return null;
  }
  context.font = font;
  var width = context.measureText(text).width;
  return Math.ceil(width);
}
function updateInputWidth(element) {
  if (typeof document === "undefined" || !element) {
    return null;
  }
  var font = getFontShorthand(element);
  var text = element.value || element.placeholder;
  var width = measureText(text, font);
  if (width === null) {
    return null;
  }
  element.style.width = "".concat(width, "px");
  return width;
}
var esm_default = updateInputWidth;

// node_modules/react-date-picker/dist/DateInput/Input.js
var isBrowser2 = typeof window !== "undefined";
var useIsomorphicLayoutEffect = isBrowser2 ? import_react5.useLayoutEffect : import_react5.useEffect;
var isIEOrEdgeLegacy = isBrowser2 && /(MSIE|Trident\/|Edge\/)/.test(navigator.userAgent);
var isFirefox = isBrowser2 && /Firefox/.test(navigator.userAgent);
function onFocus(event) {
  const { target } = event;
  if (isIEOrEdgeLegacy) {
    requestAnimationFrame(() => target.select());
  } else {
    target.select();
  }
}
function updateInputWidthOnLoad(element) {
  if (document.readyState === "complete") {
    return;
  }
  function onLoad() {
    esm_default(element);
  }
  window.addEventListener("load", onLoad);
}
function updateInputWidthOnFontLoad(element) {
  if (!document.fonts) {
    return;
  }
  const font = getFontShorthand(element);
  if (!font) {
    return;
  }
  const isFontLoaded = document.fonts.check(font);
  if (isFontLoaded) {
    return;
  }
  function onLoadingDone() {
    esm_default(element);
  }
  document.fonts.addEventListener("loadingdone", onLoadingDone);
}
function getSelectionString(input) {
  if (input && "selectionStart" in input && input.selectionStart !== null && "selectionEnd" in input && input.selectionEnd !== null) {
    return input.value.slice(input.selectionStart, input.selectionEnd);
  }
  if ("getSelection" in window) {
    const selection = window.getSelection();
    return selection === null || selection === void 0 ? void 0 : selection.toString();
  }
  return null;
}
function makeOnKeyPress(maxLength) {
  if (maxLength === null) {
    return void 0;
  }
  return function onKeyPress(event) {
    if (isFirefox) {
      return;
    }
    const { key, target: input } = event;
    const { value } = input;
    const isNumberKey = key.length === 1 && /\d/.test(key);
    const selection = getSelectionString(input);
    if (!isNumberKey || !(selection || value.length < maxLength)) {
      event.preventDefault();
    }
  };
}
function Input({ ariaLabel, autoFocus, className: className8, disabled, inputRef, max, min, name, nameForClass, onChange, onKeyDown, onKeyUp, placeholder = "--", required, showLeadingZeros, step, value }) {
  useIsomorphicLayoutEffect(() => {
    if (!inputRef || !inputRef.current) {
      return;
    }
    esm_default(inputRef.current);
    updateInputWidthOnLoad(inputRef.current);
    updateInputWidthOnFontLoad(inputRef.current);
  }, [inputRef, value]);
  const hasLeadingZero = showLeadingZeros && value && Number(value) < 10 && (value === "0" || !value.toString().startsWith("0"));
  const maxLength = max ? max.toString().length : null;
  return (0, import_jsx_runtime22.jsxs)(import_jsx_runtime22.Fragment, { children: [hasLeadingZero ? (0, import_jsx_runtime22.jsx)("span", { className: `${className8}__leadingZero`, children: "0" }) : null, (0, import_jsx_runtime22.jsx)("input", {
    "aria-label": ariaLabel,
    autoComplete: "off",
    // biome-ignore lint/a11y/noAutofocus: This is up to developers' decision
    autoFocus,
    className: clsx_default(`${className8}__input`, `${className8}__${nameForClass || name}`, hasLeadingZero && `${className8}__input--hasLeadingZero`),
    "data-input": "true",
    disabled,
    inputMode: "numeric",
    max,
    min,
    name,
    onChange,
    onFocus,
    onKeyDown,
    onKeyPress: makeOnKeyPress(maxLength),
    onKeyUp: (event) => {
      esm_default(event.target);
      if (onKeyUp) {
        onKeyUp(event);
      }
    },
    placeholder,
    // Assertion is needed for React 18 compatibility
    ref: inputRef,
    required,
    step,
    type: "number",
    value: value !== null ? value : ""
  })] });
}

// node_modules/react-date-picker/dist/shared/utils.js
function between2(value, min, max) {
  if (min && min > value) {
    return min;
  }
  if (max && max < value) {
    return max;
  }
  return value;
}
function isValidNumber(num) {
  return num !== null && num !== false && !Number.isNaN(Number(num));
}
function safeMin(...args) {
  return Math.min(...args.filter(isValidNumber));
}
function safeMax(...args) {
  return Math.max(...args.filter(isValidNumber));
}

// node_modules/react-date-picker/dist/DateInput/DayInput.js
function DayInput({ maxDate, minDate, month, year, ...otherProps }) {
  const currentMonthMaxDays = (() => {
    if (!month) {
      return 31;
    }
    return getDaysInMonth(new Date(Number(year), Number(month) - 1, 1));
  })();
  function isSameMonth(date) {
    return year === getYear(date).toString() && month === getMonthHuman(date).toString();
  }
  const maxDay = safeMin(currentMonthMaxDays, maxDate && isSameMonth(maxDate) && getDate(maxDate));
  const minDay = safeMax(1, minDate && isSameMonth(minDate) && getDate(minDate));
  return (0, import_jsx_runtime23.jsx)(Input, { max: maxDay, min: minDay, name: "day", ...otherProps });
}

// node_modules/react-date-picker/dist/DateInput/MonthInput.js
var import_jsx_runtime24 = __toESM(require_jsx_runtime(), 1);
function MonthInput({ maxDate, minDate, year, ...otherProps }) {
  function isSameYear(date) {
    return date && year === getYear(date).toString();
  }
  const maxMonth = safeMin(12, maxDate && isSameYear(maxDate) && getMonthHuman(maxDate));
  const minMonth = safeMax(1, minDate && isSameYear(minDate) && getMonthHuman(minDate));
  return (0, import_jsx_runtime24.jsx)(Input, { max: maxMonth, min: minMonth, name: "month", ...otherProps });
}

// node_modules/react-date-picker/dist/DateInput/MonthSelect.js
var import_jsx_runtime25 = __toESM(require_jsx_runtime(), 1);

// node_modules/react-date-picker/dist/shared/dateFormatter.js
var formatterCache2 = /* @__PURE__ */ new Map();
function getFormatter2(options) {
  return function formatter(locale, date) {
    const localeWithDefault = locale || dist_default();
    if (!formatterCache2.has(localeWithDefault)) {
      formatterCache2.set(localeWithDefault, /* @__PURE__ */ new Map());
    }
    const formatterCacheLocale = formatterCache2.get(localeWithDefault);
    if (!formatterCacheLocale.has(options)) {
      formatterCacheLocale.set(options, new Intl.DateTimeFormat(localeWithDefault || void 0, options).format);
    }
    return formatterCacheLocale.get(options)(date);
  };
}
function toSafeHour2(date) {
  const safeDate = new Date(date);
  return new Date(safeDate.setHours(12));
}
function getSafeFormatter2(options) {
  return (locale, date) => getFormatter2(options)(locale, toSafeHour2(date));
}
var formatMonthOptions2 = { month: "long" };
var formatShortMonthOptions = { month: "short" };
var formatMonth2 = getSafeFormatter2(formatMonthOptions2);
var formatShortMonth = getSafeFormatter2(formatShortMonthOptions);

// node_modules/react-date-picker/dist/DateInput/MonthSelect.js
function MonthSelect({ ariaLabel, autoFocus, className: className8, disabled, inputRef, locale, maxDate, minDate, onChange, onKeyDown, placeholder = "--", required, short, value, year }) {
  function isSameYear(date) {
    return date && year === getYear(date).toString();
  }
  const maxMonth = safeMin(12, maxDate && isSameYear(maxDate) && getMonthHuman(maxDate));
  const minMonth = safeMax(1, minDate && isSameYear(minDate) && getMonthHuman(minDate));
  const dates = [...Array(12)].map((_el, index) => new Date(2019, index, 1));
  const name = "month";
  const formatter = short ? formatShortMonth : formatMonth2;
  return (0, import_jsx_runtime25.jsxs)("select", {
    "aria-label": ariaLabel,
    // biome-ignore lint/a11y/noAutofocus: This is up to developers' decision
    autoFocus,
    className: clsx_default(`${className8}__input`, `${className8}__${name}`),
    "data-input": "true",
    "data-select": "true",
    disabled,
    name,
    onChange,
    onKeyDown,
    // Assertion is needed for React 18 compatibility
    ref: inputRef,
    required,
    value: value !== null ? value : "",
    children: [!value && (0, import_jsx_runtime25.jsx)("option", { value: "", children: placeholder }), dates.map((date) => {
      const month = getMonthHuman(date);
      const disabled2 = month < minMonth || month > maxMonth;
      return (0, import_jsx_runtime25.jsx)("option", { disabled: disabled2, value: month, children: formatter(locale, date) }, month);
    })]
  });
}

// node_modules/react-date-picker/dist/DateInput/NativeInput.js
var import_jsx_runtime26 = __toESM(require_jsx_runtime(), 1);
function NativeInput({ ariaLabel, disabled, maxDate, minDate, name, onChange, required, value, valueType }) {
  const nativeInputType = (() => {
    switch (valueType) {
      case "decade":
      case "year":
        return "number";
      case "month":
        return "month";
      case "day":
        return "date";
      default:
        throw new Error("Invalid valueType");
    }
  })();
  const nativeValueParser = (() => {
    switch (valueType) {
      case "decade":
      case "year":
        return getYear;
      case "month":
        return getISOLocalMonth;
      case "day":
        return getISOLocalDate;
      default:
        throw new Error("Invalid valueType");
    }
  })();
  function stopPropagation(event) {
    event.stopPropagation();
  }
  return (0, import_jsx_runtime26.jsx)("input", { "aria-label": ariaLabel, disabled, hidden: true, max: maxDate ? nativeValueParser(maxDate) : void 0, min: minDate ? nativeValueParser(minDate) : void 0, name, onChange, onFocus: stopPropagation, required, style: {
    visibility: "hidden",
    position: "absolute",
    zIndex: "-999"
  }, type: nativeInputType, value: value ? nativeValueParser(value) : "" });
}

// node_modules/react-date-picker/dist/DateInput/YearInput.js
var import_jsx_runtime27 = __toESM(require_jsx_runtime(), 1);
function YearInput({ maxDate, minDate, placeholder = "----", valueType, ...otherProps }) {
  const maxYear = safeMin(275760, maxDate && getYear(maxDate));
  const minYear = safeMax(1, minDate && getYear(minDate));
  const yearStep = (() => {
    if (valueType === "century") {
      return 10;
    }
    return 1;
  })();
  return (0, import_jsx_runtime27.jsx)(Input, { max: maxYear, min: minYear, name: "year", placeholder, step: yearStep, ...otherProps });
}

// node_modules/react-date-picker/dist/Divider.js
var import_jsx_runtime28 = __toESM(require_jsx_runtime(), 1);
function Divider({ children }) {
  return (0, import_jsx_runtime28.jsx)("span", { className: "react-date-picker__inputGroup__divider", children });
}

// node_modules/react-date-picker/dist/shared/dates.js
function getBegin2(rangeType, date) {
  switch (rangeType) {
    case "decade":
      return getDecadeStart(date);
    case "year":
      return getYearStart(date);
    case "month":
      return getMonthStart(date);
    case "day":
      return getDayStart(date);
    default:
      throw new Error(`Invalid rangeType: ${rangeType}`);
  }
}
function getEnd2(rangeType, date) {
  switch (rangeType) {
    case "decade":
      return getDecadeEnd(date);
    case "year":
      return getYearEnd(date);
    case "month":
      return getMonthEnd(date);
    case "day":
      return getDayEnd(date);
    default:
      throw new Error(`Invalid rangeType: ${rangeType}`);
  }
}

// node_modules/react-date-picker/dist/DateInput.js
var getFormatterOptionsCache = {};
var defaultMinDate2 = /* @__PURE__ */ new Date();
defaultMinDate2.setFullYear(1, 0, 1);
defaultMinDate2.setHours(0, 0, 0, 0);
var defaultMaxDate2 = /* @__PURE__ */ new Date(864e13);
var allViews2 = ["century", "decade", "year", "month"];
var allValueTypes2 = [...allViews2.slice(1), "day"];
function toDate2(value) {
  if (value instanceof Date) {
    return value;
  }
  return new Date(value);
}
function getValueType2(view) {
  const index = allViews2.indexOf(view);
  return allValueTypes2[index];
}
function getValue2(value, index) {
  const rawValue = Array.isArray(value) ? value[index] : value;
  if (!rawValue) {
    return null;
  }
  const valueDate = toDate2(rawValue);
  if (Number.isNaN(valueDate.getTime())) {
    throw new Error(`Invalid date: ${value}`);
  }
  return valueDate;
}
function getDetailValue2({ value, minDate, maxDate, maxDetail }, index) {
  const valuePiece = getValue2(value, index);
  if (!valuePiece) {
    return null;
  }
  const valueType = getValueType2(maxDetail);
  const detailValueFrom = (() => {
    switch (index) {
      case 0:
        return getBegin2(valueType, valuePiece);
      case 1:
        return getEnd2(valueType, valuePiece);
      default:
        throw new Error(`Invalid index value: ${index}`);
    }
  })();
  return between2(detailValueFrom, minDate, maxDate);
}
var getDetailValueFrom2 = (args) => getDetailValue2(args, 0);
var getDetailValueTo2 = (args) => getDetailValue2(args, 1);
var getDetailValueArray2 = (args) => [getDetailValueFrom2, getDetailValueTo2].map((fn) => fn(args));
function isInternalInput(element) {
  return element.dataset.input === "true";
}
function findInput(element, property) {
  let nextElement = element;
  do {
    nextElement = nextElement[property];
  } while (nextElement && !isInternalInput(nextElement));
  return nextElement;
}
function focus(element) {
  if (element) {
    element.focus();
  }
}
function renderCustomInputs(placeholder, elementFunctions, allowMultipleInstances) {
  const usedFunctions = [];
  const pattern = new RegExp(Object.keys(elementFunctions).map((el) => `${el}+`).join("|"), "g");
  const matches = placeholder.match(pattern);
  return placeholder.split(pattern).reduce((arr, element, index) => {
    const divider = element && // biome-ignore lint/suspicious/noArrayIndexKey: index is stable here
    (0, import_jsx_runtime29.jsx)(Divider, { children: element }, `separator_${index}`);
    arr.push(divider);
    const currentMatch = matches === null || matches === void 0 ? void 0 : matches[index];
    if (currentMatch) {
      const renderFunction = elementFunctions[currentMatch] || elementFunctions[Object.keys(elementFunctions).find((elementFunction) => currentMatch.match(elementFunction))];
      if (!renderFunction) {
        return arr;
      }
      if (!allowMultipleInstances && usedFunctions.includes(renderFunction)) {
        arr.push(currentMatch);
      } else {
        arr.push(renderFunction(currentMatch, index));
        usedFunctions.push(renderFunction);
      }
    }
    return arr;
  }, []);
}
function DateInput({ autoFocus, className: className8, dayAriaLabel, dayPlaceholder, disabled, format, isCalendarOpen: isCalendarOpenProps = null, locale, maxDate, maxDetail = "month", minDate, monthAriaLabel, monthPlaceholder, name = "date", nativeInputAriaLabel, onChange: onChangeProps, onInvalidChange, required, returnValue = "start", showLeadingZeros, value: valueProps, yearAriaLabel, yearPlaceholder }) {
  const [year, setYear] = (0, import_react6.useState)(null);
  const [month, setMonth] = (0, import_react6.useState)(null);
  const [day, setDay] = (0, import_react6.useState)(null);
  const [value, setValue] = (0, import_react6.useState)(null);
  const yearInput = (0, import_react6.useRef)(null);
  const monthInput = (0, import_react6.useRef)(null);
  const monthSelect = (0, import_react6.useRef)(null);
  const dayInput = (0, import_react6.useRef)(null);
  const [isCalendarOpen, setIsCalendarOpen] = (0, import_react6.useState)(isCalendarOpenProps);
  const lastPressedKey = (0, import_react6.useRef)(void 0);
  (0, import_react6.useEffect)(() => {
    setIsCalendarOpen(isCalendarOpenProps);
  }, [isCalendarOpenProps]);
  (0, import_react6.useEffect)(() => {
    const nextValue = getDetailValueFrom2({
      value: valueProps,
      minDate,
      maxDate,
      maxDetail
    });
    if (nextValue) {
      setYear(getYear(nextValue).toString());
      setMonth(getMonthHuman(nextValue).toString());
      setDay(getDate(nextValue).toString());
      setValue(nextValue);
    } else {
      setYear(null);
      setMonth(null);
      setDay(null);
      setValue(null);
    }
  }, [
    valueProps,
    minDate,
    maxDate,
    maxDetail,
    // Toggling calendar visibility resets values
    isCalendarOpen
  ]);
  const valueType = getValueType2(maxDetail);
  const formatDate2 = (() => {
    const level = allViews2.indexOf(maxDetail);
    const formatterOptions = getFormatterOptionsCache[level] || (() => {
      const options = { year: "numeric" };
      if (level >= 2) {
        options.month = "numeric";
      }
      if (level >= 3) {
        options.day = "numeric";
      }
      getFormatterOptionsCache[level] = options;
      return options;
    })();
    return getFormatter2(formatterOptions);
  })();
  function getProcessedValue(value2) {
    const processFunction = (() => {
      switch (returnValue) {
        case "start":
          return getDetailValueFrom2;
        case "end":
          return getDetailValueTo2;
        case "range":
          return getDetailValueArray2;
        default:
          throw new Error("Invalid returnValue.");
      }
    })();
    return processFunction({
      value: value2,
      minDate,
      maxDate,
      maxDetail
    });
  }
  const placeholder = format || (() => {
    const year2 = 2017;
    const monthIndex = 11;
    const day2 = 11;
    const date = new Date(year2, monthIndex, day2);
    const formattedDate = formatDate2(locale, date);
    const datePieces = ["year", "month", "day"];
    const datePieceReplacements = ["y", "M", "d"];
    function formatDatePiece(name2, dateToFormat) {
      const formatterOptions = getFormatterOptionsCache[name2] || (() => {
        const options = { [name2]: "numeric" };
        getFormatterOptionsCache[name2] = options;
        return options;
      })();
      return getFormatter2(formatterOptions)(locale, dateToFormat).match(/\d{1,}/);
    }
    let placeholder2 = formattedDate;
    datePieces.forEach((datePiece, index) => {
      const match = formatDatePiece(datePiece, date);
      if (match) {
        const formattedDatePiece = match[0];
        const datePieceReplacement = datePieceReplacements[index];
        placeholder2 = placeholder2.replace(formattedDatePiece, datePieceReplacement);
      }
    });
    placeholder2 = placeholder2.replace("17", "y");
    return placeholder2;
  })();
  const divider = (() => {
    const dividers = placeholder.match(/[^0-9a-z]/i);
    return dividers ? dividers[0] : null;
  })();
  function onClick(event) {
    if (event.target === event.currentTarget) {
      const firstInput = event.target.children[1];
      focus(firstInput);
    }
  }
  function onKeyDown(event) {
    lastPressedKey.current = event.key;
    switch (event.key) {
      case "ArrowLeft":
      case "ArrowRight":
      case divider: {
        event.preventDefault();
        const { target: input } = event;
        const property = event.key === "ArrowLeft" ? "previousElementSibling" : "nextElementSibling";
        const nextInput = findInput(input, property);
        focus(nextInput);
        break;
      }
      default:
    }
  }
  function onKeyUp(event) {
    const { key, target: input } = event;
    const isLastPressedKey = lastPressedKey.current === key;
    if (!isLastPressedKey) {
      return;
    }
    const isNumberKey = !Number.isNaN(Number(key));
    if (!isNumberKey) {
      return;
    }
    const max = input.getAttribute("max");
    if (!max) {
      return;
    }
    const { value: value2 } = input;
    if (Number(value2) * 10 > Number(max) || value2.length >= max.length) {
      const property = "nextElementSibling";
      const nextInput = findInput(input, property);
      focus(nextInput);
    }
  }
  function onChangeExternal() {
    if (!onChangeProps) {
      return;
    }
    function filterBoolean(value2) {
      return Boolean(value2);
    }
    const formElements = [
      dayInput.current,
      monthInput.current,
      monthSelect.current,
      yearInput.current
    ].filter(filterBoolean);
    const values = {};
    for (const formElement of formElements) {
      values[formElement.name] = "valueAsNumber" in formElement ? formElement.valueAsNumber : Number(formElement.value);
    }
    const isEveryValueEmpty = formElements.every((formElement) => !formElement.value);
    if (isEveryValueEmpty) {
      onChangeProps(null, false);
      return;
    }
    const isEveryValueFilled = formElements.every((formElement) => formElement.value);
    const isEveryValueValid = formElements.every((formElement) => formElement.validity.valid);
    if (isEveryValueFilled && isEveryValueValid) {
      const year2 = Number(values.year || (/* @__PURE__ */ new Date()).getFullYear());
      const monthIndex = Number(values.month || 1) - 1;
      const day2 = Number(values.day || 1);
      const proposedValue = /* @__PURE__ */ new Date();
      proposedValue.setFullYear(year2, monthIndex, day2);
      proposedValue.setHours(0, 0, 0, 0);
      const processedValue = getProcessedValue(proposedValue);
      onChangeProps(processedValue, false);
      return;
    }
    if (!onInvalidChange) {
      return;
    }
    onInvalidChange();
  }
  function onChange(event) {
    const { name: name2, value: value2 } = event.target;
    switch (name2) {
      case "year":
        setYear(value2);
        break;
      case "month":
        setMonth(value2);
        break;
      case "day":
        setDay(value2);
        break;
    }
    onChangeExternal();
  }
  function onChangeNative(event) {
    const { value: value2 } = event.target;
    if (!onChangeProps) {
      return;
    }
    const processedValue = (() => {
      if (!value2) {
        return null;
      }
      const [yearString, monthString, dayString] = value2.split("-");
      const year2 = Number(yearString);
      const monthIndex = Number(monthString) - 1 || 0;
      const day2 = Number(dayString) || 1;
      const proposedValue = /* @__PURE__ */ new Date();
      proposedValue.setFullYear(year2, monthIndex, day2);
      proposedValue.setHours(0, 0, 0, 0);
      return proposedValue;
    })();
    onChangeProps(processedValue, false);
  }
  const commonInputProps = {
    className: className8,
    disabled,
    maxDate: maxDate || defaultMaxDate2,
    minDate: minDate || defaultMinDate2,
    onChange,
    onKeyDown,
    onKeyUp,
    // This is only for showing validity when editing
    required: Boolean(required || isCalendarOpen)
  };
  function renderDay(currentMatch, index) {
    if (currentMatch && currentMatch.length > 2) {
      throw new Error(`Unsupported token: ${currentMatch}`);
    }
    const showLeadingZerosFromFormat = currentMatch && currentMatch.length === 2;
    return (0, import_jsx_runtime29.jsx)(DayInput, { ...commonInputProps, ariaLabel: dayAriaLabel, autoFocus: index === 0 && autoFocus, inputRef: dayInput, month, placeholder: dayPlaceholder, showLeadingZeros: showLeadingZerosFromFormat || showLeadingZeros, value: day, year }, "day");
  }
  function renderMonth(currentMatch, index) {
    if (currentMatch && currentMatch.length > 4) {
      throw new Error(`Unsupported token: ${currentMatch}`);
    }
    if (currentMatch.length > 2) {
      return (0, import_jsx_runtime29.jsx)(MonthSelect, { ...commonInputProps, ariaLabel: monthAriaLabel, autoFocus: index === 0 && autoFocus, inputRef: monthSelect, locale, placeholder: monthPlaceholder, short: currentMatch.length === 3, value: month, year }, "month");
    }
    const showLeadingZerosFromFormat = currentMatch && currentMatch.length === 2;
    return (0, import_jsx_runtime29.jsx)(MonthInput, { ...commonInputProps, ariaLabel: monthAriaLabel, autoFocus: index === 0 && autoFocus, inputRef: monthInput, placeholder: monthPlaceholder, showLeadingZeros: showLeadingZerosFromFormat || showLeadingZeros, value: month, year }, "month");
  }
  function renderYear(_currentMatch, index) {
    return (0, import_jsx_runtime29.jsx)(YearInput, { ...commonInputProps, ariaLabel: yearAriaLabel, autoFocus: index === 0 && autoFocus, inputRef: yearInput, placeholder: yearPlaceholder, value: year, valueType }, "year");
  }
  function renderCustomInputsInternal() {
    const elementFunctions = {
      d: renderDay,
      M: renderMonth,
      y: renderYear
    };
    const allowMultipleInstances = typeof format !== "undefined";
    return renderCustomInputs(placeholder, elementFunctions, allowMultipleInstances);
  }
  function renderNativeInput() {
    return (0, import_jsx_runtime29.jsx)(NativeInput, { ariaLabel: nativeInputAriaLabel, disabled, maxDate: maxDate || defaultMaxDate2, minDate: minDate || defaultMinDate2, name, onChange: onChangeNative, required, value, valueType }, "date");
  }
  return (
    // biome-ignore lint/a11y/useKeyWithClickEvents: This interaction is designed for mouse users only
    // biome-ignore lint/a11y/noStaticElementInteractions: This interaction is designed for mouse users only
    (0, import_jsx_runtime29.jsxs)("div", { className: className8, onClick, children: [renderNativeInput(), renderCustomInputsInternal()] })
  );
}

// node_modules/react-date-picker/dist/DatePicker.js
var baseClassName2 = "react-date-picker";
var outsideActionEvents = ["mousedown", "focusin", "touchstart"];
var iconProps = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 19,
  height: 19,
  viewBox: "0 0 19 19",
  stroke: "black",
  strokeWidth: 2
};
var CalendarIcon = (0, import_jsx_runtime30.jsxs)("svg", { ...iconProps, "aria-hidden": "true", className: `${baseClassName2}__calendar-button__icon ${baseClassName2}__button__icon`, children: [(0, import_jsx_runtime30.jsx)("rect", { fill: "none", height: "15", width: "15", x: "2", y: "2" }), (0, import_jsx_runtime30.jsx)("line", { x1: "6", x2: "6", y1: "0", y2: "4" }), (0, import_jsx_runtime30.jsx)("line", { x1: "13", x2: "13", y1: "0", y2: "4" })] });
var ClearIcon = (0, import_jsx_runtime30.jsxs)("svg", { ...iconProps, "aria-hidden": "true", className: `${baseClassName2}__clear-button__icon ${baseClassName2}__button__icon`, children: [(0, import_jsx_runtime30.jsx)("line", { x1: "4", x2: "15", y1: "4", y2: "15" }), (0, import_jsx_runtime30.jsx)("line", { x1: "15", x2: "4", y1: "4", y2: "15" })] });
function DatePicker(props) {
  const { autoFocus, calendarAriaLabel, calendarIcon = CalendarIcon, className: className8, clearAriaLabel, clearIcon = ClearIcon, closeCalendar: shouldCloseCalendarOnSelect = true, "data-testid": dataTestid, dayAriaLabel, dayPlaceholder, disableCalendar, disabled, format, id, isOpen: isOpenProps = null, locale, maxDate, maxDetail = "month", minDate, monthAriaLabel, monthPlaceholder, name = "date", nativeInputAriaLabel, onCalendarClose, onCalendarOpen, onChange: onChangeProps, onFocus: onFocusProps, onInvalidChange, openCalendarOnFocus = true, required, returnValue = "start", shouldCloseCalendar, shouldOpenCalendar, showLeadingZeros, value, yearAriaLabel, yearPlaceholder, ...otherProps } = props;
  const [isOpen, setIsOpen] = (0, import_react7.useState)(isOpenProps);
  const wrapper = (0, import_react7.useRef)(null);
  const calendarWrapper = (0, import_react7.useRef)(null);
  (0, import_react7.useEffect)(() => {
    setIsOpen(isOpenProps);
  }, [isOpenProps]);
  function openCalendar({ reason }) {
    if (shouldOpenCalendar) {
      if (!shouldOpenCalendar({ reason })) {
        return;
      }
    }
    setIsOpen(true);
    if (onCalendarOpen) {
      onCalendarOpen();
    }
  }
  const closeCalendar = (0, import_react7.useCallback)(({ reason }) => {
    if (shouldCloseCalendar) {
      if (!shouldCloseCalendar({ reason })) {
        return;
      }
    }
    setIsOpen(false);
    if (onCalendarClose) {
      onCalendarClose();
    }
  }, [onCalendarClose, shouldCloseCalendar]);
  function toggleCalendar() {
    if (isOpen) {
      closeCalendar({ reason: "buttonClick" });
    } else {
      openCalendar({ reason: "buttonClick" });
    }
  }
  function onChange(value2, shouldCloseCalendar2 = shouldCloseCalendarOnSelect) {
    if (shouldCloseCalendar2) {
      closeCalendar({ reason: "select" });
    }
    if (onChangeProps) {
      onChangeProps(value2);
    }
  }
  function onFocus2(event) {
    if (onFocusProps) {
      onFocusProps(event);
    }
    if (
      // Internet Explorer still fires onFocus on disabled elements
      disabled || isOpen || !openCalendarOnFocus || event.target.dataset.select === "true"
    ) {
      return;
    }
    openCalendar({ reason: "focus" });
  }
  const onKeyDown = (0, import_react7.useCallback)((event) => {
    if (event.key === "Escape") {
      closeCalendar({ reason: "escape" });
    }
  }, [closeCalendar]);
  function clear() {
    onChange(null);
  }
  function stopPropagation(event) {
    event.stopPropagation();
  }
  const onOutsideAction = (0, import_react7.useCallback)((event) => {
    const { current: wrapperEl } = wrapper;
    const { current: calendarWrapperEl } = calendarWrapper;
    const target = "composedPath" in event ? event.composedPath()[0] : event.target;
    if (target && wrapperEl && !wrapperEl.contains(target) && (!calendarWrapperEl || !calendarWrapperEl.contains(target))) {
      closeCalendar({ reason: "outsideAction" });
    }
  }, [closeCalendar]);
  const handleOutsideActionListeners = (0, import_react7.useCallback)((shouldListen = isOpen) => {
    for (const event of outsideActionEvents) {
      if (shouldListen) {
        document.addEventListener(event, onOutsideAction);
      } else {
        document.removeEventListener(event, onOutsideAction);
      }
    }
    if (shouldListen) {
      document.addEventListener("keydown", onKeyDown);
    } else {
      document.removeEventListener("keydown", onKeyDown);
    }
  }, [isOpen, onOutsideAction, onKeyDown]);
  (0, import_react7.useEffect)(() => {
    handleOutsideActionListeners();
    return () => {
      handleOutsideActionListeners(false);
    };
  }, [handleOutsideActionListeners]);
  function renderInputs() {
    const [valueFrom] = Array.isArray(value) ? value : [value];
    const ariaLabelProps = {
      dayAriaLabel,
      monthAriaLabel,
      nativeInputAriaLabel,
      yearAriaLabel
    };
    const placeholderProps = {
      dayPlaceholder,
      monthPlaceholder,
      yearPlaceholder
    };
    return (0, import_jsx_runtime30.jsxs)("div", { className: `${baseClassName2}__wrapper`, children: [(0, import_jsx_runtime30.jsx)(DateInput, { ...ariaLabelProps, ...placeholderProps, autoFocus, className: `${baseClassName2}__inputGroup`, disabled, format, isCalendarOpen: isOpen, locale, maxDate, maxDetail, minDate, name, onChange, onInvalidChange, required, returnValue, showLeadingZeros, value: valueFrom }), clearIcon !== null && (0, import_jsx_runtime30.jsx)("button", { "aria-label": clearAriaLabel, className: `${baseClassName2}__clear-button ${baseClassName2}__button`, disabled, onClick: clear, onFocus: stopPropagation, type: "button", children: typeof clearIcon === "function" ? (0, import_react7.createElement)(clearIcon) : clearIcon }), calendarIcon !== null && !disableCalendar && (0, import_jsx_runtime30.jsx)("button", { "aria-expanded": isOpen || false, "aria-label": calendarAriaLabel, className: `${baseClassName2}__calendar-button ${baseClassName2}__button`, disabled, onClick: toggleCalendar, onFocus: stopPropagation, type: "button", children: typeof calendarIcon === "function" ? (0, import_react7.createElement)(calendarIcon) : calendarIcon })] });
  }
  function renderCalendar() {
    if (isOpen === null || disableCalendar) {
      return null;
    }
    const { calendarProps, portalContainer, value: value2 } = props;
    const className9 = `${baseClassName2}__calendar`;
    const classNames = clsx_default(className9, `${className9}--${isOpen ? "open" : "closed"}`);
    const calendar = (0, import_jsx_runtime30.jsx)(dist_default2, { locale, maxDate, maxDetail, minDate, onChange: (value3) => onChange(value3), value: value2, ...calendarProps });
    return portalContainer ? (0, import_react_dom.createPortal)((0, import_jsx_runtime30.jsx)("div", { ref: calendarWrapper, className: classNames, children: calendar }), portalContainer) : (0, import_jsx_runtime30.jsx)(dist_default3, { children: (0, import_jsx_runtime30.jsx)("div", { ref: (ref) => {
      if (ref && !isOpen) {
        ref.removeAttribute("style");
      }
    }, className: classNames, children: calendar }) });
  }
  const eventProps = (0, import_react7.useMemo)(
    () => makeEventProps(otherProps),
    // biome-ignore lint/correctness/useExhaustiveDependencies: FIXME
    [otherProps]
  );
  return (
    // biome-ignore lint/a11y/noStaticElementInteractions: False positive caused by non interactive wrapper listening for bubbling events
    (0, import_jsx_runtime30.jsxs)("div", { className: clsx_default(baseClassName2, `${baseClassName2}--${isOpen ? "open" : "closed"}`, `${baseClassName2}--${disabled ? "disabled" : "enabled"}`, className8), "data-testid": dataTestid, id, ...eventProps, onFocus: onFocus2, ref: wrapper, children: [renderInputs(), renderCalendar()] })
  );
}

// node_modules/react-date-picker/dist/index.js
var dist_default4 = DatePicker;
export {
  DatePicker,
  dist_default4 as default
};
//# sourceMappingURL=react-date-picker.js.map
