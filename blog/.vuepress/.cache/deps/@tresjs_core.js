import {
  ACESFilmicToneMapping,
  ArrowHelper,
  BackSide,
  BufferAttribute,
  BufferGeometry,
  Camera,
  Clock,
  Color,
  DirectionalLightHelper,
  DoubleSide,
  Float32BufferAttribute,
  HemisphereLightHelper,
  Line,
  LineBasicMaterial,
  MathUtils,
  Mesh,
  MeshBasicMaterial,
  NoToneMapping,
  Object3D,
  PCFSoftShadowMap,
  PerspectiveCamera,
  PointLightHelper,
  REVISION,
  Raycaster,
  SRGBColorSpace,
  Scene,
  SpotLightHelper,
  TextureLoader,
  Vector2,
  Vector3,
  WebGLRenderer,
  three_module_exports
} from "./chunk-BTMJE3UT.js";
import {
  Fragment,
  computed,
  createElementBlock,
  createRenderer,
  customRef,
  defineComponent,
  getCurrentInstance,
  getCurrentScope,
  h,
  hasInjectionContext,
  inject,
  isRef,
  nextTick,
  normalizeClass,
  normalizeStyle,
  onMounted,
  onScopeDispose,
  onUnmounted,
  openBlock,
  provide,
  reactive,
  readonly,
  ref,
  renderSlot,
  shallowRef,
  toRefs,
  toValue,
  unref,
  useSlots,
  watch,
  watchEffect,
  withAsyncContext
} from "./chunk-LW4I4DCF.js";
import "./chunk-PZ5AY32C.js";

// node_modules/@tresjs/core/node_modules/@vueuse/shared/index.mjs
function tryOnScopeDispose(fn) {
  if (getCurrentScope()) {
    onScopeDispose(fn);
    return true;
  }
  return false;
}
function createEventHook() {
  const fns = /* @__PURE__ */ new Set();
  const off = (fn) => {
    fns.delete(fn);
  };
  const clear = () => {
    fns.clear();
  };
  const on = (fn) => {
    fns.add(fn);
    const offFn = () => off(fn);
    tryOnScopeDispose(offFn);
    return {
      off: offFn
    };
  };
  const trigger = (...args) => {
    return Promise.all(Array.from(fns).map((fn) => fn(...args)));
  };
  return {
    on,
    off,
    trigger,
    clear
  };
}
var localProvidedStateMap = /* @__PURE__ */ new WeakMap();
var injectLocal = (...args) => {
  var _a;
  const key = args[0];
  const instance = (_a = getCurrentInstance()) == null ? void 0 : _a.proxy;
  if (instance == null && !hasInjectionContext())
    throw new Error("injectLocal must be called in setup");
  if (instance && localProvidedStateMap.has(instance) && key in localProvidedStateMap.get(instance))
    return localProvidedStateMap.get(instance)[key];
  return inject(...args);
};
var isClient = typeof window !== "undefined" && typeof document !== "undefined";
var isWorker = typeof WorkerGlobalScope !== "undefined" && globalThis instanceof WorkerGlobalScope;
var notNullish = (val) => val != null;
var toString = Object.prototype.toString;
var isObject = (val) => toString.call(val) === "[object Object]";
var noop = () => {
};
var isIOS = getIsIOS();
function getIsIOS() {
  var _a, _b;
  return isClient && ((_a = window == null ? void 0 : window.navigator) == null ? void 0 : _a.userAgent) && (/iP(?:ad|hone|od)/.test(window.navigator.userAgent) || ((_b = window == null ? void 0 : window.navigator) == null ? void 0 : _b.maxTouchPoints) > 2 && /iPad|Macintosh/.test(window == null ? void 0 : window.navigator.userAgent));
}
function createFilterWrapper(filter, fn) {
  function wrapper(...args) {
    return new Promise((resolve, reject) => {
      Promise.resolve(filter(() => fn.apply(this, args), { fn, thisArg: this, args })).then(resolve).catch(reject);
    });
  }
  return wrapper;
}
function debounceFilter(ms, options = {}) {
  let timer;
  let maxTimer;
  let lastRejector = noop;
  const _clearTimeout = (timer2) => {
    clearTimeout(timer2);
    lastRejector();
    lastRejector = noop;
  };
  let lastInvoker;
  const filter = (invoke) => {
    const duration = toValue(ms);
    const maxDuration = toValue(options.maxWait);
    if (timer)
      _clearTimeout(timer);
    if (duration <= 0 || maxDuration !== void 0 && maxDuration <= 0) {
      if (maxTimer) {
        _clearTimeout(maxTimer);
        maxTimer = null;
      }
      return Promise.resolve(invoke());
    }
    return new Promise((resolve, reject) => {
      lastRejector = options.rejectOnCancel ? reject : resolve;
      lastInvoker = invoke;
      if (maxDuration && !maxTimer) {
        maxTimer = setTimeout(() => {
          if (timer)
            _clearTimeout(timer);
          maxTimer = null;
          resolve(lastInvoker());
        }, maxDuration);
      }
      timer = setTimeout(() => {
        if (maxTimer)
          _clearTimeout(maxTimer);
        maxTimer = null;
        resolve(invoke());
      }, duration);
    });
  };
  return filter;
}
function cacheStringFunction(fn) {
  const cache = /* @__PURE__ */ Object.create(null);
  return (str) => {
    const hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cacheStringFunction((str) => str.replace(hyphenateRE, "-$1").toLowerCase());
var camelizeRE = /-(\w)/g;
var camelize = cacheStringFunction((str) => {
  return str.replace(camelizeRE, (_, c) => c ? c.toUpperCase() : "");
});
function identity(arg) {
  return arg;
}
function pxValue(px) {
  return px.endsWith("rem") ? Number.parseFloat(px) * 16 : Number.parseFloat(px);
}
function objectPick(obj, keys2, omitUndefined = false) {
  return keys2.reduce((n, k) => {
    if (k in obj) {
      if (!omitUndefined || obj[k] !== void 0)
        n[k] = obj[k];
    }
    return n;
  }, {});
}
function getLifeCycleTarget(target) {
  return target || getCurrentInstance();
}
function toArray(value) {
  return Array.isArray(value) ? value : [value];
}
function useDebounceFn(fn, ms = 200, options = {}) {
  return createFilterWrapper(
    debounceFilter(ms, options),
    fn
  );
}
function refDebounced(value, ms = 200, options = {}) {
  const debounced = ref(value.value);
  const updater = useDebounceFn(() => {
    debounced.value = value.value;
  }, ms, options);
  watch(value, () => updater());
  return debounced;
}
function toRefs2(objectRef, options = {}) {
  if (!isRef(objectRef))
    return toRefs(objectRef);
  const result = Array.isArray(objectRef.value) ? Array.from({ length: objectRef.value.length }) : {};
  for (const key in objectRef.value) {
    result[key] = customRef(() => ({
      get() {
        return objectRef.value[key];
      },
      set(v) {
        var _a;
        const replaceRef = (_a = toValue(options.replaceRef)) != null ? _a : true;
        if (replaceRef) {
          if (Array.isArray(objectRef.value)) {
            const copy = [...objectRef.value];
            copy[key] = v;
            objectRef.value = copy;
          } else {
            const newObject = { ...objectRef.value, [key]: v };
            Object.setPrototypeOf(newObject, Object.getPrototypeOf(objectRef.value));
            objectRef.value = newObject;
          }
        } else {
          objectRef.value[key] = v;
        }
      }
    }));
  }
  return result;
}
var toValue2 = toValue;
function tryOnMounted(fn, sync = true, target) {
  const instance = getLifeCycleTarget();
  if (instance)
    onMounted(fn, target);
  else if (sync)
    fn();
  else
    nextTick(fn);
}
function useIntervalFn(cb, interval = 1e3, options = {}) {
  const {
    immediate = true,
    immediateCallback = false
  } = options;
  let timer = null;
  const isActive = shallowRef(false);
  function clean() {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
  }
  function pause() {
    isActive.value = false;
    clean();
  }
  function resume() {
    const intervalValue = toValue(interval);
    if (intervalValue <= 0)
      return;
    isActive.value = true;
    if (immediateCallback)
      cb();
    clean();
    if (isActive.value)
      timer = setInterval(cb, intervalValue);
  }
  if (immediate && isClient)
    resume();
  if (isRef(interval) || typeof interval === "function") {
    const stopWatch = watch(interval, () => {
      if (isActive.value && isClient)
        resume();
    });
    tryOnScopeDispose(stopWatch);
  }
  tryOnScopeDispose(pause);
  return {
    isActive,
    pause,
    resume
  };
}
function watchImmediate(source, cb, options) {
  return watch(
    source,
    cb,
    {
      ...options,
      immediate: true
    }
  );
}

// node_modules/@tresjs/core/node_modules/@vueuse/core/index.mjs
var defaultWindow = isClient ? window : void 0;
var defaultDocument = isClient ? window.document : void 0;
var defaultNavigator = isClient ? window.navigator : void 0;
var defaultLocation = isClient ? window.location : void 0;
function unrefElement(elRef) {
  var _a;
  const plain = toValue(elRef);
  return (_a = plain == null ? void 0 : plain.$el) != null ? _a : plain;
}
function useEventListener(...args) {
  const cleanups = [];
  const cleanup = () => {
    cleanups.forEach((fn) => fn());
    cleanups.length = 0;
  };
  const register = (el, event, listener, options) => {
    el.addEventListener(event, listener, options);
    return () => el.removeEventListener(event, listener, options);
  };
  const firstParamTargets = computed(() => {
    const test = toArray(toValue(args[0])).filter((e) => e != null);
    return test.every((e) => typeof e !== "string") ? test : void 0;
  });
  const stopWatch = watchImmediate(
    () => {
      var _a, _b;
      return [
        (_b = (_a = firstParamTargets.value) == null ? void 0 : _a.map((e) => unrefElement(e))) != null ? _b : [defaultWindow].filter((e) => e != null),
        toArray(toValue(firstParamTargets.value ? args[1] : args[0])),
        toArray(unref(firstParamTargets.value ? args[2] : args[1])),
        // @ts-expect-error - TypeScript gets the correct types, but somehow still complains
        toValue(firstParamTargets.value ? args[3] : args[2])
      ];
    },
    ([raw_targets, raw_events, raw_listeners, raw_options]) => {
      cleanup();
      if (!(raw_targets == null ? void 0 : raw_targets.length) || !(raw_events == null ? void 0 : raw_events.length) || !(raw_listeners == null ? void 0 : raw_listeners.length))
        return;
      const optionsClone = isObject(raw_options) ? { ...raw_options } : raw_options;
      cleanups.push(
        ...raw_targets.flatMap(
          (el) => raw_events.flatMap(
            (event) => raw_listeners.map((listener) => register(el, event, listener, optionsClone))
          )
        )
      );
    },
    { flush: "post" }
  );
  const stop = () => {
    stopWatch();
    cleanup();
  };
  tryOnScopeDispose(cleanup);
  return stop;
}
function useMounted() {
  const isMounted = shallowRef(false);
  const instance = getCurrentInstance();
  if (instance) {
    onMounted(() => {
      isMounted.value = true;
    }, instance);
  }
  return isMounted;
}
function useSupported(callback) {
  const isMounted = useMounted();
  return computed(() => {
    isMounted.value;
    return Boolean(callback());
  });
}
function useMutationObserver(target, callback, options = {}) {
  const { window: window2 = defaultWindow, ...mutationOptions } = options;
  let observer;
  const isSupported = useSupported(() => window2 && "MutationObserver" in window2);
  const cleanup = () => {
    if (observer) {
      observer.disconnect();
      observer = void 0;
    }
  };
  const targets = computed(() => {
    const value = toValue(target);
    const items = toArray(value).map(unrefElement).filter(notNullish);
    return new Set(items);
  });
  const stopWatch = watch(
    () => targets.value,
    (targets2) => {
      cleanup();
      if (isSupported.value && targets2.size) {
        observer = new MutationObserver(callback);
        targets2.forEach((el) => observer.observe(el, mutationOptions));
      }
    },
    { immediate: true, flush: "post" }
  );
  const takeRecords = () => {
    return observer == null ? void 0 : observer.takeRecords();
  };
  const stop = () => {
    stopWatch();
    cleanup();
  };
  tryOnScopeDispose(stop);
  return {
    isSupported,
    stop,
    takeRecords
  };
}
function useRafFn(fn, options = {}) {
  const {
    immediate = true,
    fpsLimit = void 0,
    window: window2 = defaultWindow,
    once = false
  } = options;
  const isActive = shallowRef(false);
  const intervalLimit = computed(() => {
    return fpsLimit ? 1e3 / toValue(fpsLimit) : null;
  });
  let previousFrameTimestamp = 0;
  let rafId = null;
  function loop(timestamp2) {
    if (!isActive.value || !window2)
      return;
    if (!previousFrameTimestamp)
      previousFrameTimestamp = timestamp2;
    const delta = timestamp2 - previousFrameTimestamp;
    if (intervalLimit.value && delta < intervalLimit.value) {
      rafId = window2.requestAnimationFrame(loop);
      return;
    }
    previousFrameTimestamp = timestamp2;
    fn({ delta, timestamp: timestamp2 });
    if (once) {
      isActive.value = false;
      rafId = null;
      return;
    }
    rafId = window2.requestAnimationFrame(loop);
  }
  function resume() {
    if (!isActive.value && window2) {
      isActive.value = true;
      previousFrameTimestamp = 0;
      rafId = window2.requestAnimationFrame(loop);
    }
  }
  function pause() {
    isActive.value = false;
    if (rafId != null && window2) {
      window2.cancelAnimationFrame(rafId);
      rafId = null;
    }
  }
  if (immediate)
    resume();
  tryOnScopeDispose(pause);
  return {
    isActive: readonly(isActive),
    pause,
    resume
  };
}
var ssrWidthSymbol = Symbol("vueuse-ssr-width");
function useSSRWidth() {
  const ssrWidth = hasInjectionContext() ? injectLocal(ssrWidthSymbol, null) : null;
  return typeof ssrWidth === "number" ? ssrWidth : void 0;
}
function useMediaQuery(query, options = {}) {
  const { window: window2 = defaultWindow, ssrWidth = useSSRWidth() } = options;
  const isSupported = useSupported(() => window2 && "matchMedia" in window2 && typeof window2.matchMedia === "function");
  const ssrSupport = shallowRef(typeof ssrWidth === "number");
  const mediaQuery = shallowRef();
  const matches = shallowRef(false);
  const handler = (event) => {
    matches.value = event.matches;
  };
  watchEffect(() => {
    if (ssrSupport.value) {
      ssrSupport.value = !isSupported.value;
      const queryStrings = toValue(query).split(",");
      matches.value = queryStrings.some((queryString) => {
        const not = queryString.includes("not all");
        const minWidth = queryString.match(/\(\s*min-width:\s*(-?\d+(?:\.\d*)?[a-z]+\s*)\)/);
        const maxWidth = queryString.match(/\(\s*max-width:\s*(-?\d+(?:\.\d*)?[a-z]+\s*)\)/);
        let res = Boolean(minWidth || maxWidth);
        if (minWidth && res) {
          res = ssrWidth >= pxValue(minWidth[1]);
        }
        if (maxWidth && res) {
          res = ssrWidth <= pxValue(maxWidth[1]);
        }
        return not ? !res : res;
      });
      return;
    }
    if (!isSupported.value)
      return;
    mediaQuery.value = window2.matchMedia(toValue(query));
    matches.value = mediaQuery.value.matches;
  });
  useEventListener(mediaQuery, "change", handler, { passive: true });
  return computed(() => matches.value);
}
var _global = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
var globalKey = "__vueuse_ssr_handlers__";
var handlers = getHandlers();
function getHandlers() {
  if (!(globalKey in _global))
    _global[globalKey] = _global[globalKey] || {};
  return _global[globalKey];
}
function useDevicePixelRatio(options = {}) {
  const {
    window: window2 = defaultWindow
  } = options;
  const pixelRatio = shallowRef(1);
  const query = useMediaQuery(() => `(resolution: ${pixelRatio.value}dppx)`, options);
  let stop = noop;
  if (window2) {
    stop = watchImmediate(query, () => pixelRatio.value = window2.devicePixelRatio);
  }
  return {
    pixelRatio: readonly(pixelRatio),
    stop
  };
}
function useResizeObserver(target, callback, options = {}) {
  const { window: window2 = defaultWindow, ...observerOptions } = options;
  let observer;
  const isSupported = useSupported(() => window2 && "ResizeObserver" in window2);
  const cleanup = () => {
    if (observer) {
      observer.disconnect();
      observer = void 0;
    }
  };
  const targets = computed(() => {
    const _targets = toValue(target);
    return Array.isArray(_targets) ? _targets.map((el) => unrefElement(el)) : [unrefElement(_targets)];
  });
  const stopWatch = watch(
    targets,
    (els) => {
      cleanup();
      if (isSupported.value && window2) {
        observer = new ResizeObserver(callback);
        for (const _el of els) {
          if (_el)
            observer.observe(_el, observerOptions);
        }
      }
    },
    { immediate: true, flush: "post" }
  );
  const stop = () => {
    cleanup();
    stopWatch();
  };
  tryOnScopeDispose(stop);
  return {
    isSupported,
    stop
  };
}
function useElementBounding(target, options = {}) {
  const {
    reset = true,
    windowResize = true,
    windowScroll = true,
    immediate = true,
    updateTiming = "sync"
  } = options;
  const height = shallowRef(0);
  const bottom = shallowRef(0);
  const left = shallowRef(0);
  const right = shallowRef(0);
  const top = shallowRef(0);
  const width = shallowRef(0);
  const x = shallowRef(0);
  const y = shallowRef(0);
  function recalculate() {
    const el = unrefElement(target);
    if (!el) {
      if (reset) {
        height.value = 0;
        bottom.value = 0;
        left.value = 0;
        right.value = 0;
        top.value = 0;
        width.value = 0;
        x.value = 0;
        y.value = 0;
      }
      return;
    }
    const rect = el.getBoundingClientRect();
    height.value = rect.height;
    bottom.value = rect.bottom;
    left.value = rect.left;
    right.value = rect.right;
    top.value = rect.top;
    width.value = rect.width;
    x.value = rect.x;
    y.value = rect.y;
  }
  function update() {
    if (updateTiming === "sync")
      recalculate();
    else if (updateTiming === "next-frame")
      requestAnimationFrame(() => recalculate());
  }
  useResizeObserver(target, update);
  watch(() => unrefElement(target), (ele) => !ele && update());
  useMutationObserver(target, update, {
    attributeFilter: ["style", "class"]
  });
  if (windowScroll)
    useEventListener("scroll", update, { capture: true, passive: true });
  if (windowResize)
    useEventListener("resize", update, { passive: true });
  tryOnMounted(() => {
    if (immediate)
      update();
  });
  return {
    height,
    bottom,
    left,
    right,
    top,
    width,
    x,
    y,
    update
  };
}
function useElementSize(target, initialSize = { width: 0, height: 0 }, options = {}) {
  const { window: window2 = defaultWindow, box = "content-box" } = options;
  const isSVG = computed(() => {
    var _a, _b;
    return (_b = (_a = unrefElement(target)) == null ? void 0 : _a.namespaceURI) == null ? void 0 : _b.includes("svg");
  });
  const width = shallowRef(initialSize.width);
  const height = shallowRef(initialSize.height);
  const { stop: stop1 } = useResizeObserver(
    target,
    ([entry]) => {
      const boxSize = box === "border-box" ? entry.borderBoxSize : box === "content-box" ? entry.contentBoxSize : entry.devicePixelContentBoxSize;
      if (window2 && isSVG.value) {
        const $elem = unrefElement(target);
        if ($elem) {
          const rect = $elem.getBoundingClientRect();
          width.value = rect.width;
          height.value = rect.height;
        }
      } else {
        if (boxSize) {
          const formatBoxSize = toArray(boxSize);
          width.value = formatBoxSize.reduce((acc, { inlineSize }) => acc + inlineSize, 0);
          height.value = formatBoxSize.reduce((acc, { blockSize }) => acc + blockSize, 0);
        } else {
          width.value = entry.contentRect.width;
          height.value = entry.contentRect.height;
        }
      }
    },
    options
  );
  tryOnMounted(() => {
    const ele = unrefElement(target);
    if (ele) {
      width.value = "offsetWidth" in ele ? ele.offsetWidth : initialSize.width;
      height.value = "offsetHeight" in ele ? ele.offsetHeight : initialSize.height;
    }
  });
  const stop2 = watch(
    () => unrefElement(target),
    (ele) => {
      width.value = ele ? initialSize.width : 0;
      height.value = ele ? initialSize.height : 0;
    }
  );
  function stop() {
    stop1();
    stop2();
  }
  return {
    width,
    height,
    stop
  };
}
function useFps(options) {
  var _a;
  const fps = shallowRef(0);
  if (typeof performance === "undefined")
    return fps;
  const every = (_a = options == null ? void 0 : options.every) != null ? _a : 10;
  let last = performance.now();
  let ticks = 0;
  useRafFn(() => {
    ticks += 1;
    if (ticks >= every) {
      const now = performance.now();
      const diff = now - last;
      fps.value = Math.round(1e3 / (diff / ticks));
      last = now;
      ticks = 0;
    }
  });
  return fps;
}
function useMemory(options = {}) {
  const memory = ref();
  const isSupported = useSupported(() => typeof performance !== "undefined" && "memory" in performance);
  if (isSupported.value) {
    const { interval = 1e3 } = options;
    useIntervalFn(() => {
      memory.value = performance.memory;
    }, interval, { immediate: options.immediate, immediateCallback: options.immediateCallback });
  }
  return { isSupported, memory };
}
var defaultState = {
  x: 0,
  y: 0,
  pointerId: 0,
  pressure: 0,
  tiltX: 0,
  tiltY: 0,
  width: 0,
  height: 0,
  twist: 0,
  pointerType: null
};
var keys = Object.keys(defaultState);
function usePointer(options = {}) {
  const {
    target = defaultWindow
  } = options;
  const isInside = shallowRef(false);
  const state = ref(options.initialValue || {});
  Object.assign(state.value, defaultState, state.value);
  const handler = (event) => {
    isInside.value = true;
    if (options.pointerTypes && !options.pointerTypes.includes(event.pointerType))
      return;
    state.value = objectPick(event, keys, false);
  };
  if (target) {
    const listenerOptions = { passive: true };
    useEventListener(target, ["pointerdown", "pointermove", "pointerup"], handler, listenerOptions);
    useEventListener(target, "pointerleave", () => isInside.value = false, listenerOptions);
  }
  return {
    ...toRefs2(state),
    isInside
  };
}
var DEFAULT_UNITS = [
  { max: 6e4, value: 1e3, name: "second" },
  { max: 276e4, value: 6e4, name: "minute" },
  { max: 72e6, value: 36e5, name: "hour" },
  { max: 5184e5, value: 864e5, name: "day" },
  { max: 24192e5, value: 6048e5, name: "week" },
  { max: 28512e6, value: 2592e6, name: "month" },
  { max: Number.POSITIVE_INFINITY, value: 31536e6, name: "year" }
];
var _TransitionPresets = {
  easeInSine: [0.12, 0, 0.39, 0],
  easeOutSine: [0.61, 1, 0.88, 1],
  easeInOutSine: [0.37, 0, 0.63, 1],
  easeInQuad: [0.11, 0, 0.5, 0],
  easeOutQuad: [0.5, 1, 0.89, 1],
  easeInOutQuad: [0.45, 0, 0.55, 1],
  easeInCubic: [0.32, 0, 0.67, 0],
  easeOutCubic: [0.33, 1, 0.68, 1],
  easeInOutCubic: [0.65, 0, 0.35, 1],
  easeInQuart: [0.5, 0, 0.75, 0],
  easeOutQuart: [0.25, 1, 0.5, 1],
  easeInOutQuart: [0.76, 0, 0.24, 1],
  easeInQuint: [0.64, 0, 0.78, 0],
  easeOutQuint: [0.22, 1, 0.36, 1],
  easeInOutQuint: [0.83, 0, 0.17, 1],
  easeInExpo: [0.7, 0, 0.84, 0],
  easeOutExpo: [0.16, 1, 0.3, 1],
  easeInOutExpo: [0.87, 0, 0.13, 1],
  easeInCirc: [0.55, 0, 1, 0.45],
  easeOutCirc: [0, 0.55, 0.45, 1],
  easeInOutCirc: [0.85, 0, 0.15, 1],
  easeInBack: [0.36, 0, 0.66, -0.56],
  easeOutBack: [0.34, 1.56, 0.64, 1],
  easeInOutBack: [0.68, -0.6, 0.32, 1.6]
};
var TransitionPresets = Object.assign({}, { linear: identity }, _TransitionPresets);
function useWindowSize(options = {}) {
  const {
    window: window2 = defaultWindow,
    initialWidth = Number.POSITIVE_INFINITY,
    initialHeight = Number.POSITIVE_INFINITY,
    listenOrientation = true,
    includeScrollbar = true,
    type = "inner"
  } = options;
  const width = shallowRef(initialWidth);
  const height = shallowRef(initialHeight);
  const update = () => {
    if (window2) {
      if (type === "outer") {
        width.value = window2.outerWidth;
        height.value = window2.outerHeight;
      } else if (type === "visual" && window2.visualViewport) {
        const { width: visualViewportWidth, height: visualViewportHeight, scale } = window2.visualViewport;
        width.value = Math.round(visualViewportWidth * scale);
        height.value = Math.round(visualViewportHeight * scale);
      } else if (includeScrollbar) {
        width.value = window2.innerWidth;
        height.value = window2.innerHeight;
      } else {
        width.value = window2.document.documentElement.clientWidth;
        height.value = window2.document.documentElement.clientHeight;
      }
    }
  };
  update();
  tryOnMounted(update);
  const listenerOptions = { passive: true };
  useEventListener("resize", update, listenerOptions);
  if (window2 && type === "visual" && window2.visualViewport) {
    useEventListener(window2.visualViewport, "resize", update, listenerOptions);
  }
  if (listenOrientation) {
    const matches = useMediaQuery("(orientation: portrait)");
    watch(matches, () => update());
  }
  return { width, height };
}

// node_modules/@tresjs/core/dist/tres.js
var Et = Object.defineProperty;
var Tt = (e, t, n) => t in e ? Et(e, t, { enumerable: true, configurable: true, writable: true, value: n }) : e[t] = n;
var he = (e, t, n) => Tt(e, typeof t != "symbol" ? t + "" : t, n);
var dn = "@tresjs/core";
var pn = "module";
var mn = "4.3.3";
var hn = "pnpm@9.15.5";
var gn = "Declarative ThreeJS using Vue Components";
var vn = "Alvaro Saburido <hola@alvarosaburido.dev> (https://github.com/alvarosabu/)";
var yn = "MIT";
var _n = { type: "git", url: "git+https://github.com/Tresjs/tres.git" };
var wn = ["vue", "3d", "threejs", "three", "threejs-vue"];
var bn = false;
var Mn = { ".": { types: "./dist/index.d.ts", import: "./dist/tres.js", require: "./dist/tres.umd.cjs" }, "./components": { types: "./dist/src/components/index.d.ts" }, "./composables": { types: "./dist/src/composables/index.d.ts" }, "./types": { types: "./dist/src/types/index.d.ts" }, "./utils": { types: "./dist/src/utils/index.d.ts" }, "./*": "./*" };
var Pn = "./dist/tres.js";
var Cn = "./dist/tres.js";
var En = "./dist/index.d.ts";
var Tn = ["*.d.ts", "dist"];
var Sn = { access: "public" };
var An = { dev: "pnpm --filter='./playground/vue' dev", "dev:nuxt": "pnpm --filter='./playground/nuxt' dev", build: "vite build", test: "vitest", "test:ci": "vitest run", "test:ui": "vitest --ui --coverage.enabled=true", release: "release-it", coverage: "vitest run --coverage", lint: "eslint .", "lint:fix": "eslint . --fix", "docs:dev": "vitepress dev docs", "docs:build": "vitepress build docs", "docs:serve": "vitepress serve docs", "docs:preview": "vitepress preview docs", "docs:contributors": "esno scripts/update-contributors.ts" };
var xn = { three: ">=0.133", vue: ">=3.4" };
var kn = { "@alvarosabu/utils": "^3.2.0", "@vue/devtools-api": "^6.6.3", "@vueuse/core": "^12.5.0" };
var Ln = { "@release-it/conventional-changelog": "^10.0.0", "@stackblitz/sdk": "^1.11.0", "@tresjs/cientos": "4.1.0", "@tresjs/eslint-config": "^1.4.0", "@types/three": "^0.173.0", "@typescript-eslint/eslint-plugin": "^8.23.0", "@typescript-eslint/parser": "^8.23.0", "@vitejs/plugin-vue": "^5.2.1", "@vitest/coverage-c8": "^0.33.0", "@vitest/coverage-v8": "^3.0.5", "@vitest/ui": "^3.0.5", "@vue/test-utils": "^2.4.6", eslint: "^9.19.0", "eslint-plugin-vue": "^9.32.0", esno: "^4.8.0", gsap: "^3.12.7", jsdom: "^26.0.0", kolorist: "^1.8.0", ohmyfetch: "^0.4.21", pathe: "^2.0.2", "release-it": "^18.1.2", "rollup-plugin-analyzer": "^4.0.0", "rollup-plugin-copy": "^3.5.0", "rollup-plugin-visualizer": "^5.14.0", sponsorkit: "^16.3.0", three: "^0.173.0", unocss: "^65.4.3", unplugin: "^2.1.2", "unplugin-vue-components": "^28.0.0", vite: "^6.1.0", "vite-plugin-banner": "^0.8.0", "vite-plugin-dts": "4.5.0", "vite-plugin-inspect": "^10.1.0", "vite-plugin-require-transform": "^1.0.21", "vite-svg-loader": "^5.1.0", vitepress: "1.6.3", vitest: "3.0.5", vue: "3.5.13", "vue-demi": "^0.14.10" };
var Rn = {
  name: dn,
  type: pn,
  version: mn,
  packageManager: hn,
  description: gn,
  author: vn,
  license: yn,
  repository: _n,
  keywords: wn,
  sideEffects: bn,
  exports: Mn,
  main: Pn,
  module: Cn,
  types: En,
  files: Tn,
  publishConfig: Sn,
  scripts: An,
  peerDependencies: xn,
  dependencies: kn,
  devDependencies: Ln
};
function On(e) {
  const t = { nodes: {}, materials: {} };
  return e && e.traverse((n) => {
    n.name && (t.nodes[n.name] = n), n.material && !t.materials[n.material.name] && (t.materials[n.material.name] = n.material);
  }), t;
}
async function Dn(e, t, n, r, o) {
  const { logError: l } = Q(), s = new e();
  return o && o(s), n && n(s), await new Promise((a, c) => {
    s.load(
      t,
      (i) => {
        const f = i;
        f.scene && Object.assign(f, On(f.scene)), a(f);
      },
      r,
      (i) => {
        l("[useLoader] - Failed to load resource", i), c(i);
      }
    );
  });
}
var Yr = defineComponent({
  __name: "component",
  props: {
    loader: {},
    url: {}
  },
  async setup(e) {
    let t, n;
    const r = e, o = ([t, n] = withAsyncContext(() => reactive(Dn(r.loader, r.url))), t = await t, n(), t);
    return (l, s) => renderSlot(l.$slots, "default", { data: unref(o) });
  }
});
var jn = class extends Mesh {
  constructor(...n) {
    super(...n);
    he(this, "type", "HightlightMesh");
    he(this, "createTime");
    this.createTime = Date.now();
  }
  onBeforeRender() {
    const r = (Date.now() - this.createTime) / 1e3, s = 1 + 0.07 * Math.sin(2.5 * r);
    this.scale.set(s, s, s);
  }
};
function Me(e) {
  return typeof e > "u";
}
function de(e) {
  return Array.isArray(e);
}
function Bn(e) {
  return typeof e == "number";
}
function ft(e) {
  return typeof e == "string";
}
function G(e) {
  return typeof e == "function";
}
function H(e) {
  return e === Object(e) && !de(e) && !G(e);
}
function N(e) {
  return H(e) && "isObject3D" in e && !!e.isObject3D;
}
function ze(e) {
  return H(e) && "isCamera" in e && !!e.isCamera;
}
function In(e) {
  return H(e) && "isBufferGeometry" in e && !!e.isBufferGeometry;
}
function $n(e) {
  return H(e) && "isMaterial" in e && !!e.isMaterial;
}
function Hn(e) {
  return H(e) && "isLight" in e && !!e.isLight;
}
function Un(e) {
  return H(e) && "isFog" in e && !!e.isFog;
}
function Fn(e) {
  return H(e) && "isScene" in e && !!e.isScene;
}
function re(e) {
  return N(e) || In(e) || $n(e) || Un(e);
}
function Wn(e) {
  return H(e) && !!e.isPrimitive;
}
var dt = (e, t) => {
  for (const n of Object.keys(t))
    t[n] instanceof Object && Object.assign(t[n], dt(e[n], t[n]));
  return Object.assign(e || {}, t), e;
};
var Nn = "html,body,base,head,link,meta,style,title,address,article,aside,footer,header,hgroup,h1,h2,h3,h4,h5,h6,nav,section,div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,ruby,s,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,embed,object,param,source,canvas,script,noscript,del,ins,caption,col,colgroup,table,thead,tbody,td,th,tr,button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,output,progress,select,textarea,details,dialog,menu,summary,template,blockquote,iframe,tfoot";
var zn = Yn(Nn);
function Ge(e) {
  return e && e.nodeType === 1;
}
function oe(e) {
  return e.replace(/-([a-z])/g, (t, n) => n.toUpperCase());
}
var Gn = /\B([A-Z])/g;
function Vn(e) {
  return e.replace(Gn, "-$1").toLowerCase();
}
function Yn(e, t) {
  const n = /* @__PURE__ */ Object.create(null), r = e.split(",");
  for (let o = 0; o < r.length; o++)
    n[r[o]] = true;
  return t ? (o) => !!n[o.toLowerCase()] : (o) => !!n[o];
}
var Ve = (e, t) => {
  if (!t)
    return;
  const n = Array.isArray(t) ? t : t.match(/([^[.\]])+/g);
  return n == null ? void 0 : n.reduce((r, o) => r && r[o], e);
};
var qn = (e, t, n) => {
  const r = Array.isArray(t) ? t : t.match(/([^[.\]])+/g);
  r && r.reduce((o, l, s) => (o[l] === void 0 && (o[l] = {}), s === r.length - 1 && (o[l] = n), o[l]), e);
};
function pt(e, t) {
  if (Ge(e) && Ge(t)) {
    const o = e.attributes, l = t.attributes;
    return o.length !== l.length ? false : Array.from(o).every(({ name: s, value: a }) => t.getAttribute(s) === a);
  }
  if (e === t)
    return true;
  if (e === null || typeof e != "object" || t === null || typeof t != "object")
    return false;
  const n = Object.keys(e), r = Object.keys(t);
  if (n.length !== r.length)
    return false;
  for (const o of n)
    if (!r.includes(o) || !pt(e[o], t[o]))
      return false;
  return true;
}
function Kn(e, t) {
  if (!Array.isArray(e) || !Array.isArray(t) || e.length !== t.length)
    return false;
  for (let n = 0; n < e.length; n++)
    if (!pt(e[n], t[n]))
      return false;
  return true;
}
var Jn = Array.isArray;
function Qn(e, t, n, r) {
  const o = (c) => {
    if (c.uuid === t)
      return c;
    for (const i of c.children) {
      const f = o(i);
      if (f)
        return f;
    }
  }, l = o(e);
  if (!l) {
    console.warn("Object with UUID not found in the scene.");
    return;
  }
  let s = l;
  for (let c = 0; c < n.length - 1; c++)
    if (s[n[c]] !== void 0)
      s = s[n[c]];
    else {
      console.warn(`Property path is not valid: ${n.join(".")}`);
      return;
    }
  const a = n[n.length - 1];
  s[a] !== void 0 ? s[a] = r : console.warn(`Property path is not valid: ${n.join(".")}`);
}
function Xn(e) {
  const t = new MeshBasicMaterial({
    color: 11003607,
    // Highlight color, e.g., yellow
    transparent: true,
    opacity: 0.2,
    depthTest: false,
    // So the highlight is always visible
    side: DoubleSide
    // To e
  });
  return new jn(e.geometry.clone(), t);
}
function Zn(e) {
  var n;
  let t = e.value;
  return e.value && ((n = e.value) != null && n.isMesh) && (t = e.value.position), Array.isArray(e.value) && (t = new Vector3(...t)), t;
}
function er(e) {
  return "map" in e;
}
function Ye(e) {
  er(e) && e.map && e.map.dispose(), e.dispose();
}
function mt(e) {
  var n, r;
  if (e.parent && ((n = e.removeFromParent) == null || n.call(e)), delete e.__tres, [...e.children].forEach((o) => mt(o)), !(e instanceof Scene)) {
    const o = e;
    e && ((r = e.dispose) == null || r.call(e)), o.geometry && o.geometry.dispose(), Array.isArray(o.material) ? o.material.forEach((l) => Ye(l)) : o.material && Ye(o.material);
  }
}
function tr(e, t) {
  let n = 0;
  for (let r = 0; r < e.length; r++)
    t(e[r], r) && (e[n] = e[r], n++);
  return e.length = n, e;
}
function Pe(e, t) {
  let n = e;
  if (t.includes("-")) {
    const r = t.split("-");
    let o = r.shift();
    for (; n && r.length; )
      o in n ? (n = n[o], o = r.shift()) : o = qe(o, r.shift());
    return { target: n, key: qe(o, ...r) };
  } else
    return { target: n, key: t };
}
function qe(...e) {
  return e.map((t, n) => n === 0 ? t : t.charAt(0).toUpperCase() + t.slice(1)).join("");
}
var Ke = /-\d+$/;
function nr(e, t, n) {
  if (ft(n)) {
    if (Ke.test(n)) {
      const l = n.replace(Ke, ""), { target: s, key: a } = Pe(e, l);
      if (!Array.isArray(s[a])) {
        const c = s[a], i = [];
        i.__tresDetach = () => {
          i.every((f) => Me(f)) && (s[a] = c);
        }, s[a] = i;
      }
    }
    const { target: r, key: o } = Pe(e, n);
    t.__tres.previousAttach = r[o], r[o] = J(t);
  } else
    t.__tres.previousAttach = n(e, t);
}
function rr(e, t, n) {
  var r, o, l;
  if (ft(n)) {
    const { target: s, key: a } = Pe(e, n), c = t.__tres.previousAttach;
    c === void 0 ? delete s[a] : s[a] = c, "__tresDetach" in s && s.__tresDetach();
  } else
    (o = (r = t.__tres) == null ? void 0 : r.previousAttach) == null || o.call(r, e, t);
  (l = t.__tres) == null || delete l.previousAttach;
}
function z(e, t, n) {
  const r = e;
  return r.__tres = {
    type: "unknown",
    eventCount: 0,
    root: n,
    handlers: {},
    memoizedProps: {},
    objects: [],
    parent: null,
    previousAttach: null,
    ...t
  }, r.__tres.attach || (r.isMaterial ? r.__tres.attach = "material" : r.isBufferGeometry ? r.__tres.attach = "geometry" : r.isFog && (r.__tres.attach = "fog")), r;
}
function ht(e) {
  var n;
  const t = (n = e == null ? void 0 : e.__tres) == null ? void 0 : n.root;
  t && t.render && t.render.canBeInvalidated.value && t.invalidate();
}
function or(e, t, n) {
  var o;
  if (!G(e.setPixelRatio))
    return;
  let r = 0;
  if (n && de(n)) {
    const l = n;
    if (l.length >= 2) {
      const [s, a] = l;
      r = MathUtils.clamp(t, s, a);
    }
  } else Bn(n) ? r = n : r = t;
  r !== ((o = e.getPixelRatio) == null ? void 0 : o.call(e)) && e.setPixelRatio(r);
}
function sr(e, t, n, r, o) {
  const l = [...t.__tres.objects], s = J(t);
  if (e = J(e), s === e)
    return true;
  const a = z(e, t.__tres ?? {}, o), c = t.parent ?? t.__tres.parent ?? null, i = { ...t.__tres.memoizedProps };
  delete i.object;
  for (const f of l)
    gt(f, o), vt(f, o);
  s.__tres.objects = [], r.remove(t);
  for (const [f, g] of Object.entries(i))
    r.patchProp(a, f, a[f], g);
  n(e), r.insert(t, c);
  for (const f of l)
    r.insert(f, t);
  return true;
}
function J(e) {
  return Wn(e) ? (e.object.__tres = e.__tres, e.object) : e;
}
function gt(e, t) {
  var r, o, l, s;
  const n = ((r = e.__tres) == null ? void 0 : r.parent) || t.scene.value;
  e.__tres && (e.__tres.parent = null), n && n.__tres && "objects" in n.__tres && tr(n.__tres.objects, (a) => a !== e), (o = e.__tres) != null && o.attach ? rr(n, e, e.__tres.attach) : ((s = (l = e.parent) == null ? void 0 : l.remove) == null || s.call(l, J(e)), e.parent = null);
}
function vt(e, t) {
  var n;
  (n = e.traverse) == null || n.call(e, (r) => {
    var o;
    t.deregisterCamera(r), (o = t.eventManager) == null || o.deregisterPointerMissedObject(r);
  }), t.deregisterCamera(e), ht(e);
}
async function ir(e, t) {
  const n = new TextureLoader(t), r = (o) => new Promise((l, s) => {
    n.load(
      o,
      (a) => l(a),
      () => null,
      () => {
        s(new Error("[useTextures] - Failed to load texture"));
      }
    );
  });
  if (Jn(e)) {
    const o = await Promise.all(e.map((l) => r(l)));
    return e.length > 1 ? o : o[0];
  } else {
    const {
      map: o,
      displacementMap: l,
      normalMap: s,
      roughnessMap: a,
      metalnessMap: c,
      aoMap: i,
      alphaMap: f,
      matcap: g
    } = e;
    return {
      map: o ? await r(o) : null,
      displacementMap: l ? await r(l) : null,
      normalMap: s ? await r(s) : null,
      roughnessMap: a ? await r(a) : null,
      metalnessMap: c ? await r(c) : null,
      aoMap: i ? await r(i) : null,
      alphaMap: f ? await r(f) : null,
      matcap: g ? await r(g) : null
    };
  }
}
var qr = defineComponent({
  __name: "component",
  props: {
    map: {},
    displacementMap: {},
    normalMap: {},
    roughnessMap: {},
    metalnessMap: {},
    aoMap: {},
    alphaMap: {},
    matcap: {}
  },
  async setup(e) {
    let t, n;
    const r = e, o = ([t, n] = withAsyncContext(() => reactive(ir(r))), t = await t, n(), t);
    return (l, s) => renderSlot(l.$slots, "default", { textures: unref(o) });
  }
});
var ar = ({ sizes: e }) => {
  const t = ref([]), n = computed(
    () => t.value[0]
  ), r = (s) => {
    const a = s instanceof Camera ? s : t.value.find((i) => i.uuid === s);
    if (!a)
      return;
    const c = t.value.filter(({ uuid: i }) => i !== a.uuid);
    t.value = [a, ...c];
  }, o = (s, a = false) => {
    if (ze(s)) {
      const c = s;
      if (t.value.some(({ uuid: i }) => i === c.uuid))
        return;
      a ? r(c) : t.value.push(c);
    }
  }, l = (s) => {
    if (ze(s)) {
      const a = s;
      t.value = t.value.filter(({ uuid: c }) => c !== a.uuid);
    }
  };
  return watchEffect(() => {
    e.aspectRatio.value && t.value.forEach((s) => {
      !s.manual && (s instanceof PerspectiveCamera || lr(s)) && (s instanceof PerspectiveCamera ? s.aspect = e.aspectRatio.value : (s.left = e.width.value * -0.5, s.right = e.width.value * 0.5, s.top = e.height.value * 0.5, s.bottom = e.height.value * -0.5), s.updateProjectionMatrix());
    });
  }), onUnmounted(() => {
    t.value = [];
  }), {
    camera: n,
    cameras: t,
    registerCamera: o,
    deregisterCamera: l,
    setCameraActive: r
  };
};
function lr(e) {
  return e.hasOwnProperty("isOrthographicCamera") && e.isOrthographicCamera;
}
var Kr = true;
var pe = "[TresJS ▲ ■ ●] ";
function cr(...e) {
  typeof e[0] == "string" ? e[0] = pe + e[0] : e.unshift(pe), console.error(...e);
}
function ur(...e) {
  typeof e[0] == "string" ? e[0] = pe + e[0] : e.unshift(pe), console.warn(...e);
}
function fr(e, t) {
}
function Q() {
  return {
    logError: cr,
    logWarning: ur,
    logMessage: fr
  };
}
var Ce = ref({});
var Ee = (e) => Object.assign(Ce.value, e);
function ye() {
  const e = /* @__PURE__ */ new Map(), t = /* @__PURE__ */ new Set();
  let n = 0, r = false;
  const o = () => {
    const i = Array.from(e.entries()).sort((f, g) => {
      const u = f[1].priority - g[1].priority;
      return u === 0 ? f[1].addI - g[1].addI : u;
    });
    t.clear(), i.forEach((f) => t.add(f[0]));
  }, l = (i) => {
    e.delete(i), t.delete(i);
  };
  return { on: (i, f = 0) => {
    e.set(i, { priority: f, addI: n++ });
    const g = () => l(i);
    return tryOnScopeDispose(g), r = true, {
      off: g
    };
  }, off: l, trigger: (...i) => {
    r && (o(), r = false), t.forEach((f) => f(...i));
  }, dispose: () => {
    e.clear(), t.clear();
  }, get count() {
    return e.size;
  } };
}
function dr() {
  let e = true, t = true, n = false;
  const r = new Clock(false), o = ref(r.running), l = ref(false);
  let s;
  const a = MathUtils.generateUUID();
  let c = null;
  const i = ye(), f = ye(), g = ye();
  S();
  let u = {};
  function y(M) {
    u = M;
  }
  function p(M, x, m = 0) {
    switch (x) {
      case "before":
        return i.on(M, m);
      case "render":
        return c || (c = M), f.dispose(), f.on(M);
      case "after":
        return g.on(M, m);
    }
  }
  function _() {
    t && (t = false, S(), E());
  }
  function d() {
    t = true, S(), cancelAnimationFrame(s);
  }
  function v() {
    n = false, S();
  }
  function P() {
    n = true, S();
  }
  function C() {
    l.value = true;
  }
  function w() {
    l.value = false;
  }
  function E() {
    if (!e) {
      s = requestAnimationFrame(E);
      return;
    }
    const M = r.getDelta(), x = r.getElapsedTime(), m = {
      camera: unref(u.camera),
      scene: unref(u.scene),
      renderer: unref(u.renderer),
      raycaster: unref(u.raycaster),
      controls: unref(u.controls),
      invalidate: u.invalidate,
      advance: u.advance
    }, b = { delta: M, elapsed: x, clock: r, ...m };
    o.value && i.trigger(b), l.value || (f.count ? f.trigger(b) : c && c(b)), o.value && g.trigger(b), s = requestAnimationFrame(E);
  }
  function S() {
    const M = !t && !n;
    r.running !== M && (r.running ? r.stop() : r.start()), o.value = r.running;
  }
  return {
    loopId: a,
    register: (M, x, m) => p(M, x, m),
    start: _,
    stop: d,
    pause: P,
    resume: v,
    pauseRender: C,
    resumeRender: w,
    isRenderPaused: l,
    isActive: o,
    setContext: y,
    setReady: (M) => e = M
  };
}
function ke(e) {
  let t = 0;
  return e.traverse((n) => {
    if (n.isMesh && n.geometry && n.type !== "HightlightMesh") {
      const r = n.geometry, o = r.attributes.position.count * 3 * Float32Array.BYTES_PER_ELEMENT, l = r.index ? r.index.count * Uint32Array.BYTES_PER_ELEMENT : 0, s = r.attributes.normal ? r.attributes.normal.count * 3 * Float32Array.BYTES_PER_ELEMENT : 0, a = r.attributes.uv ? r.attributes.uv.count * 2 * Float32Array.BYTES_PER_ELEMENT : 0, c = o + l + s + a;
      t += c;
    }
  }), t;
}
function pr(e) {
  return (e / 1024).toFixed(2);
}
var mr = Number.parseInt(REVISION.replace("dev", ""));
function Jr(e) {
  return typeof e == "number" ? [e, e, e] : e instanceof Vector3 ? [e.x, e.y, e.z] : e;
}
function hr(e) {
  return e instanceof Color ? e : Array.isArray(e) ? new Color(...e) : new Color(e);
}
var se = {
  realistic: {
    shadows: true,
    physicallyCorrectLights: true,
    outputColorSpace: SRGBColorSpace,
    toneMapping: ACESFilmicToneMapping,
    toneMappingExposure: 3,
    shadowMap: {
      enabled: true,
      type: PCFSoftShadowMap
    }
  },
  flat: {
    toneMapping: NoToneMapping,
    toneMappingExposure: 1
  }
};
function gr({
  canvas: e,
  options: t,
  contextParts: { sizes: n, render: r, invalidate: o, advance: l }
}) {
  const s = computed(() => ({
    alpha: toValue2(t.alpha) ?? true,
    depth: toValue2(t.depth),
    canvas: unrefElement(e),
    context: toValue2(t.context),
    stencil: toValue2(t.stencil),
    antialias: toValue2(t.antialias) ?? true,
    precision: toValue2(t.precision),
    powerPreference: toValue2(t.powerPreference),
    premultipliedAlpha: toValue2(t.premultipliedAlpha),
    preserveDrawingBuffer: toValue2(t.preserveDrawingBuffer),
    logarithmicDepthBuffer: toValue2(t.logarithmicDepthBuffer),
    failIfMajorPerformanceCaveat: toValue2(t.failIfMajorPerformanceCaveat)
  })), a = shallowRef(new WebGLRenderer(s.value));
  function c() {
    t.renderMode === "on-demand" && o();
  }
  watch(s, () => {
    a.value.dispose(), a.value = new WebGLRenderer(s.value), c();
  }), watch([n.width, n.height], () => {
    a.value.setSize(n.width.value, n.height.value), c();
  }, {
    immediate: true
  }), watch(() => t.clearColor, c);
  const { pixelRatio: i } = useDevicePixelRatio(), { logError: f } = Q(), u = (() => {
    const p = new WebGLRenderer(), _ = {
      shadowMap: {
        enabled: p.shadowMap.enabled,
        type: p.shadowMap.type
      },
      toneMapping: p.toneMapping,
      toneMappingExposure: p.toneMappingExposure,
      outputColorSpace: p.outputColorSpace
    };
    return p.dispose(), _;
  })(), y = toValue2(t.renderMode);
  return y === "on-demand" && o(), y === "manual" && setTimeout(() => {
    l();
  }, 100), watchEffect(() => {
    const p = toValue2(t.preset);
    p && (p in se || f(`Renderer Preset must be one of these: ${Object.keys(se).join(", ")}`), dt(a.value, se[p])), or(a.value, i.value, toValue2(t.dpr)), y === "always" && (r.frames.value = Math.max(1, r.frames.value));
    const _ = (P, C) => {
      const w = toValue2(P), E = () => {
        if (p)
          return Ve(se[p], C);
      };
      if (w !== void 0)
        return w;
      const S = E();
      return S !== void 0 ? S : Ve(u, C);
    }, d = (P, C) => qn(a.value, C, _(P, C));
    d(t.shadows, "shadowMap.enabled"), d(t.toneMapping ?? ACESFilmicToneMapping, "toneMapping"), d(t.shadowMapType, "shadowMap.type"), mr < 150 && d(!t.useLegacyLights, "physicallyCorrectLights"), d(t.outputColorSpace, "outputColorSpace"), d(t.toneMappingExposure, "toneMappingExposure");
    const v = _(t.clearColor, "clearColor");
    v && a.value.setClearColor(
      v ? hr(v) : new Color(0)
      // default clear color is not easily/efficiently retrievable from three
    );
  }), onUnmounted(() => {
    a.value.dispose(), a.value.forceContextLoss();
  }), {
    renderer: a
  };
}
function vr(e, t, n = 10) {
  const r = toValue2(e) ? useWindowSize() : useElementSize(computed(() => toValue2(t).parentElement)), o = readonly(refDebounced(r.width, n)), l = readonly(refDebounced(r.height, n)), s = computed(() => o.value / l.value);
  return {
    height: l,
    width: o,
    aspectRatio: s
  };
}
var yr = (e, t) => {
  const n = computed(() => t.renderer.value.domElement), r = shallowRef([]), { x: o, y: l } = usePointer({ target: n });
  let s = 0;
  const { width: a, height: c, top: i, left: f } = useElementBounding(n), g = ({ x: h2, y: T }) => {
    if (n.value)
      return {
        x: (h2 - f.value) / a.value * 2 - 1,
        y: -((T - i.value) / c.value) * 2 + 1
      };
  }, u = ({ x: h2, y: T }) => {
    if (t.camera.value)
      return t.raycaster.value.setFromCamera(new Vector2(h2, T), t.camera.value), r.value = t.raycaster.value.intersectObjects(e.value, true), r.value;
  }, y = (h2) => {
    const T = g({
      x: (h2 == null ? void 0 : h2.clientX) ?? o.value,
      y: (h2 == null ? void 0 : h2.clientY) ?? l.value
    });
    return T ? u(T) || [] : [];
  }, p = createEventHook(), _ = createEventHook(), d = createEventHook(), v = createEventHook(), P = createEventHook(), C = createEventHook(), w = createEventHook(), E = createEventHook();
  function S(h2) {
    const T = {};
    for (const U in h2)
      typeof U != "function" && (T[U] = h2[U]);
    return T;
  }
  const M = (h2, T) => {
    var Be, Ie, $e;
    const U = S(T), ne = new Vector3(T == null ? void 0 : T.clientX, T == null ? void 0 : T.clientY, 0).unproject((Be = t.camera) == null ? void 0 : Be.value);
    h2.trigger({
      ...U,
      intersections: r.value,
      // The unprojectedPoint is wrong, math needs to be fixed
      unprojectedPoint: ne,
      ray: (Ie = t.raycaster) == null ? void 0 : Ie.value.ray,
      camera: ($e = t.camera) == null ? void 0 : $e.value,
      sourceEvent: T,
      delta: s,
      stopPropagating: false
    });
  };
  let x;
  const m = (h2) => {
    y(h2), M(d, h2), x = h2;
  }, b = () => {
    x && m(x);
  };
  let k, L, R;
  const j = (h2) => {
    var T;
    k = (T = r.value[0]) == null ? void 0 : T.object, s = 0, L = new Vector2(
      (h2 == null ? void 0 : h2.clientX) ?? o.value,
      (h2 == null ? void 0 : h2.clientY) ?? l.value
    ), M(P, h2);
  };
  let O, V = false;
  const Re = (h2) => {
    var T, U, ne;
    h2 instanceof PointerEvent && (r.value.length === 0 && M(C, h2), k === ((T = r.value[0]) == null ? void 0 : T.object) && (R = new Vector2(
      (h2 == null ? void 0 : h2.clientX) ?? o.value,
      (h2 == null ? void 0 : h2.clientY) ?? l.value
    ), s = L == null ? void 0 : L.distanceTo(R), h2.button === 0 ? (M(p, h2), O === ((U = r.value[0]) == null ? void 0 : U.object) ? V = true : (O = (ne = r.value[0]) == null ? void 0 : ne.object, V = false)) : h2.button === 2 && M(w, h2)), M(v, h2));
  }, Oe = (h2) => {
    V && (M(_, h2), O = void 0, V = false);
  }, De = (h2) => M(d, h2), je = (h2) => M(E, h2);
  return n.value.addEventListener("pointerup", Re), n.value.addEventListener("pointerdown", j), n.value.addEventListener("pointermove", m), n.value.addEventListener("pointerleave", De), n.value.addEventListener("dblclick", Oe), n.value.addEventListener("wheel", je), onUnmounted(() => {
    n != null && n.value && (n.value.removeEventListener("pointerup", Re), n.value.removeEventListener("pointerdown", j), n.value.removeEventListener("pointermove", m), n.value.removeEventListener("pointerleave", De), n.value.removeEventListener("dblclick", Oe), n.value.removeEventListener("wheel", je));
  }), {
    intersects: r,
    onClick: (h2) => p.on(h2).off,
    onDblClick: (h2) => _.on(h2).off,
    onContextMenu: (h2) => w.on(h2).off,
    onPointerMove: (h2) => d.on(h2).off,
    onPointerUp: (h2) => v.on(h2).off,
    onPointerDown: (h2) => P.on(h2).off,
    onPointerMissed: (h2) => C.on(h2).off,
    onWheel: (h2) => E.on(h2).off,
    forceUpdate: b
  };
};
function _e(e, t) {
  if (Array.isArray(e))
    for (const n of e)
      n(t);
  typeof e == "function" && e(t);
}
function _r(e, t, n) {
  var x;
  const r = shallowRef(), o = shallowRef();
  e && (r.value = e), t && (o.value = t);
  const l = (m) => {
    var b;
    return ((b = m.__tres) == null ? void 0 : b.eventCount) > 0;
  }, s = (m) => {
    var b;
    return ((b = m.children) == null ? void 0 : b.some((k) => s(k))) || l(m);
  }, a = shallowRef(((x = r.value) == null ? void 0 : x.children).filter(s) || []);
  function c(m, b) {
    const k = [], L = () => b.stopPropagating = true;
    b.stopPropagation = L;
    for (const R of b == null ? void 0 : b.intersections) {
      if (b.stopPropagating)
        return;
      b = { ...b, ...R };
      const { object: j } = R;
      b.eventObject = j, _e(j[m], b), k.push(j);
      let O = j.parent;
      for (; O !== null && !b.stopPropagating && !k.includes(O); )
        b.eventObject = O, _e(O[m], b), k.push(O), O = O.parent;
      const V = Vn(m.slice(2));
      n(V, { intersection: R, event: b });
    }
  }
  const {
    onClick: i,
    onDblClick: f,
    onContextMenu: g,
    onPointerMove: u,
    onPointerDown: y,
    onPointerUp: p,
    onPointerMissed: _,
    onWheel: d,
    forceUpdate: v
  } = yr(a, t);
  p((m) => c("onPointerUp", m)), y((m) => c("onPointerDown", m)), i((m) => c("onClick", m)), f((m) => c("onDoubleClick", m)), g((m) => c("onContextMenu", m)), d((m) => c("onWheel", m));
  let P = [];
  u((m) => {
    const b = m.intersections.map(({ object: L }) => L), k = m.intersections;
    P.forEach(({ object: L }) => {
      b.includes(L) || (m.intersections = P, c("onPointerLeave", m), c("onPointerOut", m));
    }), m.intersections = k, m.intersections.forEach(({ object: L }) => {
      P.includes(L) || (c("onPointerEnter", m), c("onPointerOver", m));
    }), c("onPointerMove", m), P = m.intersections;
  });
  const C = [];
  _((m) => {
    const b = () => m.stopPropagating = true;
    m.stopPropagation = b, C.forEach((k) => {
      m.stopPropagating || (m.eventObject = k, _e(k.onPointerMissed, m));
    }), n("pointer-missed", { event: m });
  });
  function w(m) {
    re(m) && N(m) && a.value.push(m);
  }
  function E(m) {
    if (re(m) && N(m)) {
      const b = a.value.indexOf(m);
      b > -1 && a.value.splice(b, 1);
    }
  }
  function S(m) {
    re(m) && N(m) && m.onPointerMissed && C.push(m);
  }
  function M(m) {
    if (re(m) && N(m)) {
      const b = C.indexOf(m);
      b > -1 && C.splice(b, 1);
    }
  }
  return t.eventManager = {
    forceUpdate: v,
    registerObject: w,
    deregisterObject: E,
    registerPointerMissedObject: S,
    deregisterPointerMissedObject: M
  }, {
    forceUpdate: v,
    registerObject: w,
    deregisterObject: E,
    registerPointerMissedObject: S,
    deregisterPointerMissedObject: M
  };
}
function wr(e, t, n = 100) {
  n = n <= 0 ? 100 : n;
  const r = createEventHook(), o = /* @__PURE__ */ new Set();
  let l = false, s = false, a = null;
  function c() {
    a && clearTimeout(a), !s && !l && e() ? (r.trigger(t), o.forEach((u) => u()), o.clear(), l = true) : !s && !l && (a = setTimeout(c, n));
  }
  function i() {
    s = true, a && clearTimeout(a);
  }
  c();
  const f = (u, ...y) => {
    u(...y);
  };
  return {
    on: (u) => {
      if (l)
        return f(u, t), { off: () => {
        } };
      {
        const y = r.on(u);
        return o.add(y.off), r.on(u);
      }
    },
    off: r.off,
    trigger: r.trigger,
    clear: r.clear,
    cancel: i
  };
}
var ee = /* @__PURE__ */ new WeakMap();
function yt(e) {
  if (e = e || me(), ee.has(e))
    return ee.get(e);
  const t = 100, n = Date.now(), l = wr(() => {
    if (Date.now() - n >= t)
      return true;
    {
      const s = e.renderer.value, a = (s == null ? void 0 : s.domElement) || { width: 0, height: 0 };
      return !!(s && a.width > 0 && a.height > 0);
    }
  }, e);
  return ee.set(e, l), l;
}
function Qr(e) {
  const t = me();
  if (t)
    return ee.has(t) ? ee.get(t).on(e) : yt(t).on(e);
}
function br({
  scene: e,
  canvas: t,
  windowSize: n,
  rendererOptions: r,
  emit: o
}) {
  const l = shallowRef(e), s = vr(n, t), {
    camera: a,
    cameras: c,
    registerCamera: i,
    deregisterCamera: f,
    setCameraActive: g
  } = ar({ sizes: s }), u = {
    mode: ref(r.renderMode || "always"),
    priority: ref(0),
    frames: ref(0),
    maxFrames: 60,
    canBeInvalidated: computed(() => u.mode.value === "on-demand" && u.frames.value === 0)
  };
  function y(R = 1) {
    r.renderMode === "on-demand" && (u.frames.value = Math.min(u.maxFrames, u.frames.value + R));
  }
  function p() {
    r.renderMode === "manual" && (u.frames.value = 1);
  }
  const { renderer: _ } = gr(
    {
      canvas: t,
      options: r,
      // TODO: replace contextParts with full ctx at https://github.com/Tresjs/tres/issues/516
      contextParts: { sizes: s, render: u, invalidate: y, advance: p }
    }
  ), d = {
    sizes: s,
    scene: l,
    camera: a,
    cameras: readonly(c),
    renderer: _,
    raycaster: shallowRef(new Raycaster()),
    controls: ref(null),
    perf: {
      maxFrames: 160,
      fps: {
        value: 0,
        accumulator: []
      },
      memory: {
        currentMem: 0,
        allocatedMem: 0,
        accumulator: []
      }
    },
    render: u,
    advance: p,
    extend: Ee,
    invalidate: y,
    registerCamera: i,
    setCameraActive: g,
    deregisterCamera: f,
    loop: dr()
  };
  provide("useTres", d), d.scene.value.__tres = {
    root: d
  }, d.loop.register(() => {
    a.value && u.frames.value > 0 && (_.value.render(e, a.value), o("render", d.renderer.value)), u.priority.value = 0, u.mode.value === "always" ? u.frames.value = 1 : u.frames.value = Math.max(0, u.frames.value - 1);
  }, "render");
  const { on: v, cancel: P } = yt(d);
  d.loop.setReady(false), d.loop.start(), v(() => {
    o("ready", d), d.loop.setReady(true), _r(e, d, o);
  }), onUnmounted(() => {
    P(), d.loop.stop();
  });
  const C = 100, w = useFps({ every: C }), { isSupported: E, memory: S } = useMemory({ interval: C }), M = 160;
  let x = performance.now();
  const m = ({ timestamp: R }) => {
    d.scene.value && (d.perf.memory.allocatedMem = ke(d.scene.value)), R - x >= C && (x = R, d.perf.fps.accumulator.push(w.value), d.perf.fps.accumulator.length > M && d.perf.fps.accumulator.shift(), d.perf.fps.value = w.value, E.value && S.value && (d.perf.memory.accumulator.push(S.value.usedJSHeapSize / 1024 / 1024), d.perf.memory.accumulator.length > M && d.perf.memory.accumulator.shift(), d.perf.memory.currentMem = d.perf.memory.accumulator.reduce((j, O) => j + O, 0) / d.perf.memory.accumulator.length));
  };
  let b = 0;
  const k = 1, { pause: L } = useRafFn(({ delta: R }) => {
    window.__TRES__DEVTOOLS__ && (m({ timestamp: performance.now() }), b += R, b >= k && (window.__TRES__DEVTOOLS__.cb(d), b = 0));
  }, { immediate: true });
  return onUnmounted(() => {
    L();
  }), d;
}
function me() {
  const e = inject("useTres");
  if (!e)
    throw new Error("useTresContext must be used together with useTresContextProvider");
  return e;
}
var Xr = me;
function Zr() {
  const {
    camera: e,
    scene: t,
    renderer: n,
    loop: r,
    raycaster: o,
    controls: l,
    invalidate: s,
    advance: a
  } = me();
  r.setContext({
    camera: e,
    scene: t,
    renderer: n,
    raycaster: o,
    controls: l,
    invalidate: s,
    advance: a
  });
  function c(g, u = 0) {
    return r.register(g, "before", u);
  }
  function i(g) {
    return r.register(g, "render");
  }
  function f(g, u = 0) {
    return r.register(g, "after", u);
  }
  return {
    pause: r.pause,
    resume: r.resume,
    pauseRender: r.pauseRender,
    resumeRender: r.resumeRender,
    isActive: r.isActive,
    onBeforeRender: c,
    render: i,
    onAfterRender: f
  };
}
var _t = createEventHook();
var wt = createEventHook();
var Le = createEventHook();
var te = new Clock();
var ce = 0;
var ue = 0;
var { pause: Mr, resume: Je, isActive: Pr } = useRafFn(
  () => {
    _t.trigger({ delta: ce, elapsed: ue, clock: te }), wt.trigger({ delta: ce, elapsed: ue, clock: te }), Le.trigger({ delta: ce, elapsed: ue, clock: te });
  },
  { immediate: false }
);
Le.on(() => {
  ce = te.getDelta(), ue = te.getElapsedTime();
});
var Qe = false;
var eo = () => (Qe || (Qe = true, Je()), {
  onBeforeLoop: _t.on,
  onLoop: wt.on,
  onAfterLoop: Le.on,
  pause: Mr,
  resume: Je,
  isActive: Pr
});
function to() {
  const { logWarning: e } = Q();
  function t(l, s, a) {
    let c = null;
    return l.traverse((i) => {
      i[s] === a && (c = i);
    }), c || e(`Child with ${s} '${a}' not found.`), c;
  }
  function n(l, s, a) {
    const c = [];
    return l.traverse((i) => {
      i[s].includes(a) && c.push(i);
    }), c.length || e(`Children with ${s} '${a}' not found.`), c;
  }
  function r(l, s) {
    return t(l, "name", s);
  }
  function o(l, s) {
    return n(l, "name", s);
  }
  return {
    seek: t,
    seekByName: r,
    seekAll: n,
    seekAllByName: o
  };
}
function Cr(e, t = {}, n = {}) {
  let r = e;
  const o = (a) => {
    r = a;
  };
  let l = new Proxy({}, {});
  const s = {
    has(a, c) {
      return c in t || c in r;
    },
    get(a, c, i) {
      return c in t ? t[c](r) : r[c];
    },
    set(a, c, i) {
      const f = n[c];
      return f && typeof f == "function" ? f(i, r, l, o) : r[c] = i, true;
    }
  };
  return l = new Proxy({}, s), l;
}
var { logError: Xe } = Q();
var Ze = [
  "onClick",
  "onContextMenu",
  "onPointerMove",
  "onPointerEnter",
  "onPointerLeave",
  "onPointerOver",
  "onPointerOut",
  "onDoubleClick",
  "onPointerDown",
  "onPointerUp",
  "onPointerCancel",
  "onPointerMissed",
  "onLostPointerCapture",
  "onWheel"
];
var Er = (e) => {
  const t = e.scene.value;
  function n(i, f, g, u) {
    if (u || (u = {}), u.args || (u.args = []), i === "template" || zn(i))
      return null;
    let y = i.replace("Tres", ""), p;
    if (i === "primitive") {
      (!H(u.object) || isRef(u.object)) && Xe(
        "Tres primitives need an 'object' prop, whose value is an object or shallowRef<object>"
      ), y = u.object.type;
      const _ = {};
      p = Cr(
        u.object,
        {
          object: (v) => v,
          isPrimitive: () => true,
          __tres: () => _
        },
        {
          object: (v, P, C, w) => {
            sr(v, C, w, { patchProp: l, remove: o, insert: r }, e);
          },
          __tres: (v) => {
            Object.assign(_, v);
          }
        }
      );
    } else {
      const _ = Ce.value[y];
      _ || Xe(
        `${y} is not defined on the THREE namespace. Use extend to add it to the catalog.`
      ), p = new _(...u.args);
    }
    return p ? (p.isCamera && (u != null && u.position || p.position.set(3, 3, 3), u != null && u.lookAt || p.lookAt(0, 0, 0)), p = z(p, {
      ...p.__tres,
      type: y,
      memoizedProps: u,
      eventCount: 0,
      primitive: i === "primitive",
      attach: u.attach
    }, e), p) : null;
  }
  function r(i, f) {
    var y, p, _;
    if (!i)
      return;
    f = f || t;
    const g = i.__tres ? i : z(i, {}, e), u = f.__tres ? f : z(f, {}, e);
    i = J(g), f = J(u), i.__tres && ((y = i.__tres) == null ? void 0 : y.eventCount) > 0 && ((p = e.eventManager) == null || p.registerObject(i)), e.registerCamera(i), (_ = e.eventManager) == null || _.registerPointerMissedObject(i), g.__tres.attach ? nr(u, g, g.__tres.attach) : N(i) && N(u) && (u.add(i), i.dispatchEvent({ type: "added" })), g.__tres.parent = u, u.__tres.objects && !u.__tres.objects.includes(g) && u.__tres.objects.push(g);
  }
  function o(i, f) {
    var p, _, d, v;
    if (!i)
      return;
    i != null && i.__tres && ((p = i.__tres) == null ? void 0 : p.eventCount) > 0 && ((_ = e.eventManager) == null || _.deregisterObject(i)), f = Me(f) ? "default" : f;
    const g = (d = i.__tres) == null ? void 0 : d.dispose;
    Me(g) || (g === null ? f = false : f = g);
    const u = (v = i.__tres) == null ? void 0 : v.primitive, y = f === "default" ? !u : !!f;
    if (i.__tres && "objects" in i.__tres && [...i.__tres.objects].forEach((P) => o(P, f)), y && i.children && [...i.children].forEach((P) => o(P, f)), gt(i, e), vt(i, e), y && !Fn(i)) {
      if (G(f))
        f(i);
      else if (G(i.dispose))
        try {
          i.dispose();
        } catch {
        }
    }
    "__tres" in i && delete i.__tres;
  }
  function l(i, f, g, u) {
    var P, C;
    if (!i)
      return;
    let y = i, p = f;
    if (i.__tres && (i.__tres.memoizedProps[f] = u), f === "attach") {
      const w = ((P = i.__tres) == null ? void 0 : P.parent) || i.parent;
      o(i), z(i, { attach: u }, e), w && r(i, w);
      return;
    }
    if (f === "dispose") {
      i.__tres || (i = z(i, {}, e)), i.__tres.dispose = u;
      return;
    }
    if (N(i) && p === "blocks-pointer-events") {
      u || u === "" ? i[p] = u : delete i[p];
      return;
    }
    Ze.includes(f) && i.__tres && (i.__tres.eventCount += 1);
    let _ = oe(p), d = y == null ? void 0 : y[_];
    if (p === "args") {
      const w = i, E = g ?? [], S = u ?? [], M = ((C = i.__tres) == null ? void 0 : C.type) || i.type;
      M && E.length && !Kn(E, S) && (y = Object.assign(
        w,
        new Ce.value[M](...u)
      ));
      return;
    }
    if (y.type === "BufferGeometry") {
      if (p === "args")
        return;
      y.setAttribute(
        oe(p),
        new BufferAttribute(...u)
      );
      return;
    }
    if (p.includes("-") && d === void 0) {
      const w = p.split("-");
      d = w.reduce((E, S) => E[oe(S)], y), p = w.pop(), _ = p, d != null && d.set || (y = w.reduce((E, S) => E[oe(S)], y));
    }
    let v = u;
    if (v === "" && (v = true), G(d)) {
      Ze.includes(f) || (de(v) ? i[_](...v) : i[_](v)), _.startsWith("on") && G(v) && (y[_] = v);
      return;
    }
    !(d != null && d.set) && !G(d) ? y[_] = v : d.constructor === v.constructor && (d != null && d.copy) ? d == null || d.copy(v) : de(v) ? d.set(...v) : !d.isColor && d.setScalar ? d.setScalar(v) : d.set(v), ht(i);
  }
  function s(i) {
    var f;
    return ((f = i == null ? void 0 : i.__tres) == null ? void 0 : f.parent) || null;
  }
  function a(i) {
    const f = z(new Object3D(), { type: "Comment" }, e);
    return f.name = i, f;
  }
  function c(i) {
    var y;
    const f = s(i), g = ((y = f == null ? void 0 : f.__tres) == null ? void 0 : y.objects) || [], u = g.indexOf(i);
    return u < 0 || u >= g.length - 1 ? null : g[u + 1];
  }
  return {
    insert: r,
    remove: o,
    createElement: n,
    patchProp: l,
    parentNode: s,
    createText: () => void 0,
    createComment: a,
    setText: () => void 0,
    setElementText: () => void 0,
    nextSibling: c,
    querySelector: () => void 0,
    setScopeId: () => void 0,
    cloneNode: () => void 0,
    insertStaticContent: () => void 0
  };
};
function Tr() {
  return bt().__VUE_DEVTOOLS_GLOBAL_HOOK__;
}
function bt() {
  return typeof navigator < "u" && typeof window < "u" ? window : typeof globalThis < "u" ? globalThis : {};
}
var Sr = typeof Proxy == "function";
var Ar = "devtools-plugin:setup";
var xr = "plugin:settings:set";
var Y;
var Te;
function kr() {
  var e;
  return Y !== void 0 || (typeof window < "u" && window.performance ? (Y = true, Te = window.performance) : typeof globalThis < "u" && (!((e = globalThis.perf_hooks) === null || e === void 0) && e.performance) ? (Y = true, Te = globalThis.perf_hooks.performance) : Y = false), Y;
}
function Lr() {
  return kr() ? Te.now() : Date.now();
}
var Rr = class {
  constructor(t, n) {
    this.target = null, this.targetQueue = [], this.onQueue = [], this.plugin = t, this.hook = n;
    const r = {};
    if (t.settings)
      for (const s in t.settings) {
        const a = t.settings[s];
        r[s] = a.defaultValue;
      }
    const o = `__vue-devtools-plugin-settings__${t.id}`;
    let l = Object.assign({}, r);
    try {
      const s = localStorage.getItem(o), a = JSON.parse(s);
      Object.assign(l, a);
    } catch {
    }
    this.fallbacks = {
      getSettings() {
        return l;
      },
      setSettings(s) {
        try {
          localStorage.setItem(o, JSON.stringify(s));
        } catch {
        }
        l = s;
      },
      now() {
        return Lr();
      }
    }, n && n.on(xr, (s, a) => {
      s === this.plugin.id && this.fallbacks.setSettings(a);
    }), this.proxiedOn = new Proxy({}, {
      get: (s, a) => this.target ? this.target.on[a] : (...c) => {
        this.onQueue.push({
          method: a,
          args: c
        });
      }
    }), this.proxiedTarget = new Proxy({}, {
      get: (s, a) => this.target ? this.target[a] : a === "on" ? this.proxiedOn : Object.keys(this.fallbacks).includes(a) ? (...c) => (this.targetQueue.push({
        method: a,
        args: c,
        resolve: () => {
        }
      }), this.fallbacks[a](...c)) : (...c) => new Promise((i) => {
        this.targetQueue.push({
          method: a,
          args: c,
          resolve: i
        });
      })
    });
  }
  async setRealTarget(t) {
    this.target = t;
    for (const n of this.onQueue)
      this.target.on[n.method](...n.args);
    for (const n of this.targetQueue)
      n.resolve(await this.target[n.method](...n.args));
  }
};
function Or(e, t) {
  const n = e, r = bt(), o = Tr(), l = Sr && n.enableEarlyProxy;
  if (o && (r.__VUE_DEVTOOLS_PLUGIN_API_AVAILABLE__ || !l))
    o.emit(Ar, e, t);
  else {
    const s = l ? new Rr(n, o) : null;
    (r.__VUE_DEVTOOLS_PLUGINS__ = r.__VUE_DEVTOOLS_PLUGINS__ || []).push({
      pluginDescriptor: n,
      setupFn: t,
      proxy: s
    }), s && t(s.proxiedTarget);
  }
}
function Dr(e, t) {
  const n = `▲ ■ ●${e}`;
  typeof et == "function" ? et(n, t) : console.log(n);
}
function et(e, t) {
  throw new Error(e + t);
}
var Mt = (e) => {
  const t = {
    id: e.uuid,
    label: e.type,
    children: [],
    tags: []
  };
  e.name !== "" && t.tags.push({
    label: e.name,
    textColor: 5750629,
    backgroundColor: 15793395
  });
  const n = ke(e);
  return n > 0 && t.tags.push({
    label: `${pr(n)} KB`,
    textColor: 15707189,
    backgroundColor: 16775644,
    tooltip: "Memory usage"
  }), e.type.includes("Light") && (Hn(e) && t.tags.push({
    label: `${e.intensity}`,
    textColor: 9738662,
    backgroundColor: 16316922,
    tooltip: "Intensity"
  }), t.tags.push({
    label: `#${new Color(e.color).getHexString()}`,
    textColor: 9738662,
    backgroundColor: 16316922,
    tooltip: "Color"
  })), e.type.includes("Camera") && (t.tags.push({
    label: `${e.fov}°`,
    textColor: 9738662,
    backgroundColor: 16316922,
    tooltip: "Field of view"
  }), t.tags.push({
    label: `x: ${Math.round(e.position.x)} y: ${Math.round(e.position.y)} z: ${Math.round(e.position.z)}`,
    textColor: 9738662,
    backgroundColor: 16316922,
    tooltip: "Position"
  })), t;
};
function Pt(e, t, n = "") {
  e.children.forEach((r) => {
    if (r.type === "HightlightMesh" || n && !r.type.includes(n) && !r.name.includes(n))
      return;
    const o = Mt(r);
    t.children.push(o), Pt(r, o, n);
  });
}
var jr = [];
var X = "tres:inspector";
var Br = reactive({
  sceneGraph: null
});
function Ir(e, t) {
  Or(
    {
      id: "dev.esm.tres",
      label: "TresJS 🪐",
      logo: "https://raw.githubusercontent.com/Tresjs/tres/main/public/favicon.svg",
      packageName: "tresjs",
      homepage: "https://tresjs.org",
      componentStateTypes: jr,
      app: e
    },
    (n) => {
      typeof n.now != "function" && Dr(
        "You seem to be using an outdated version of Vue Devtools. Are you still using the Beta release instead of the stable one? You can find the links at https://devtools.vuejs.org/guide/installation.html."
      ), n.addInspector({
        id: X,
        label: "TresJS 🪐",
        icon: "account_tree",
        treeFilterPlaceholder: "Search instances"
      }), setInterval(() => {
        n.sendInspectorTree(X);
      }, 1e3), setInterval(() => {
        n.notifyComponentUpdate();
      }, 5e3), n.on.getInspectorTree((l) => {
        if (l.inspectorId === X) {
          const s = Mt(t.scene.value);
          Pt(t.scene.value, s, l.filter), Br.sceneGraph = s, l.rootNodes = [s];
        }
      });
      let r = null, o = null;
      n.on.getInspectorState((l) => {
        var s;
        if (l.inspectorId === X) {
          const [a] = t.scene.value.getObjectsByProperty("uuid", l.nodeId);
          if (!a)
            return;
          if (o && r && r.parent && o.remove(r), a.isMesh) {
            const c = Xn(a);
            a.add(c), r = c, o = a;
          }
          l.state = {
            object: Object.entries(a).map(([c, i]) => c === "children" ? { key: c, value: i.filter((f) => f.type !== "HightlightMesh") } : { key: c, value: i, editable: true }).filter(({ key: c }) => c !== "parent")
          }, a.isScene && (l.state = {
            ...l.state,
            state: [
              {
                key: "Scene Info",
                value: {
                  objects: a.children.length,
                  memory: ke(a),
                  calls: t.renderer.value.info.render.calls,
                  triangles: t.renderer.value.info.render.triangles,
                  points: t.renderer.value.info.render.points,
                  lines: t.renderer.value.info.render.lines
                }
              },
              {
                key: "Programs",
                value: ((s = t.renderer.value.info.programs) == null ? void 0 : s.map((c) => ({
                  ...c,
                  programName: c.name
                }))) || []
              }
            ]
          });
        }
      }), n.on.editInspectorState((l) => {
        l.inspectorId === X && Qn(t.scene.value, l.nodeId, l.path, l.state.value);
      });
    }
  );
}
var $r = ["data-scene", "data-tres"];
var Hr = defineComponent({
  __name: "TresCanvas",
  props: {
    shadows: { type: Boolean, default: void 0 },
    clearColor: {},
    toneMapping: {},
    shadowMapType: {},
    useLegacyLights: { type: Boolean, default: void 0 },
    outputColorSpace: {},
    toneMappingExposure: {},
    renderMode: { default: "always" },
    dpr: {},
    camera: {},
    preset: {},
    windowSize: { type: Boolean, default: void 0 },
    enableProvideBridge: { type: Boolean, default: true },
    context: {},
    alpha: { type: Boolean, default: void 0 },
    premultipliedAlpha: { type: Boolean },
    antialias: { type: Boolean, default: void 0 },
    stencil: { type: Boolean, default: void 0 },
    preserveDrawingBuffer: { type: Boolean, default: void 0 },
    powerPreference: {},
    depth: { type: Boolean, default: void 0 },
    failIfMajorPerformanceCaveat: { type: Boolean, default: void 0 },
    precision: {},
    logarithmicDepthBuffer: { type: Boolean, default: void 0 },
    reverseDepthBuffer: { type: Boolean }
  },
  emits: [
    "render",
    "click",
    "double-click",
    "context-menu",
    "pointer-move",
    "pointer-up",
    "pointer-down",
    "pointer-enter",
    "pointer-leave",
    "pointer-over",
    "pointer-out",
    "pointer-missed",
    "wheel",
    "ready"
  ],
  setup(e, { expose: t, emit: n }) {
    const r = e, o = n, l = useSlots(), s = ref(), a = shallowRef(new Scene()), c = getCurrentInstance();
    Ee(three_module_exports);
    const i = (p, _ = false) => defineComponent({
      setup() {
        var C;
        const d = (C = getCurrentInstance()) == null ? void 0 : C.appContext;
        d && (d.app = c == null ? void 0 : c.appContext.app);
        const v = {};
        function P(w) {
          w && (w.parent && P(w.parent), w.provides && Object.assign(v, w.provides));
        }
        return c != null && c.parent && r.enableProvideBridge && (P(c.parent), Reflect.ownKeys(v).forEach((w) => {
          provide(w, v[w]);
        })), provide("useTres", p), provide("extend", Ee), typeof window < "u" && Ir(d == null ? void 0 : d.app, p), () => h(Fragment, null, _ ? [] : l.default());
      }
    }), f = (p, _ = false) => {
      const d = i(p, _), { render: v } = createRenderer(Er(p));
      v(h(d), a.value);
    }, g = (p, _ = false) => {
      mt(p.scene.value), _ && (p.renderer.value.dispose(), p.renderer.value.renderLists.dispose(), p.renderer.value.forceContextLoss()), a.value.__tres = {
        root: p
      };
    }, u = shallowRef(null);
    t({ context: u, dispose: () => g(u.value, true) });
    const y = () => {
      g(u.value), f(u.value, true);
    };
    return onMounted(() => {
      const p = s;
      u.value = br({
        scene: a.value,
        canvas: p,
        windowSize: r.windowSize ?? false,
        rendererOptions: r,
        emit: o
      });
      const { registerCamera: _, camera: d, cameras: v, deregisterCamera: P } = u.value;
      f(u.value);
      const C = () => {
        const w = new PerspectiveCamera(
          45,
          window.innerWidth / window.innerHeight,
          0.1,
          1e3
        );
        w.position.set(3, 3, 3), w.lookAt(0, 0, 0), _(w);
        const E = watchEffect(() => {
          v.value.length >= 2 && (w.removeFromParent(), P(w), E == null || E());
        });
      };
      watch(
        () => r.camera,
        (w, E) => {
          w && _(w), E && (E.removeFromParent(), P(E));
        },
        {
          immediate: true
        }
      ), d.value || C();
    }), onUnmounted(y), (p, _) => (openBlock(), createElementBlock("canvas", {
      ref_key: "canvas",
      ref: s,
      "data-scene": a.value.uuid,
      class: normalizeClass(p.$attrs.class),
      "data-tres": `tresjs ${unref(Rn).version}`,
      style: normalizeStyle({
        display: "block",
        width: "100%",
        height: "100%",
        position: p.windowSize ? "fixed" : "relative",
        top: 0,
        left: 0,
        pointerEvents: "auto",
        touchAction: "none",
        ...p.$attrs.style
      })
    }, null, 14, $r));
  }
});
var Ur = [
  "TresCanvas",
  "TresLeches",
  "TresScene"
];
var no = {
  template: {
    compilerOptions: {
      isCustomElement: (e) => e.startsWith("Tres") && !Ur.includes(e) || e === "primitive"
    }
  }
};
var { logWarning: Fr } = Q();
var B = null;
var ro = {
  updated: (e, t) => {
    var o;
    const n = Zn(t);
    if (!n) {
      Fr(`v-distance-to: problem with binding value: ${t.value}`);
      return;
    }
    B && (B.dispose(), e.parent.remove(B));
    const r = n.clone().sub(e.position);
    r.normalize(), B = new ArrowHelper(r, e.position, e.position.distanceTo(n), 16776960), e.parent.add(B), console.table(
      [
        ["Distance:", e.position.distanceTo(n)],
        [`origin: ${e.name || e.type}`, `x:${e.position.x}, y:${e.position.y}, z:${(o = e.position) == null ? void 0 : o.z}`],
        [`Destiny: ${e.name || e.type}`, `x:${n.x}, y:${n.y}, z:${n == null ? void 0 : n.z}`]
      ]
    );
  },
  unmounted: (e) => {
    B == null || B.dispose(), e.parent && e.parent.remove(B);
  }
};
var Ct = class extends Line {
  constructor(t, n) {
    const r = [1, 1, 0, -1, 1, 0, -1, -1, 0, 1, -1, 0, 1, 1, 0], o = new BufferGeometry();
    o.setAttribute("position", new Float32BufferAttribute(r, 3)), o.computeBoundingSphere();
    const l = new LineBasicMaterial({ fog: false });
    super(o, l), this.light = t, this.color = n, this.type = "RectAreaLightHelper";
    const s = [1, 1, 0, -1, 1, 0, -1, -1, 0, 1, 1, 0, -1, -1, 0, 1, -1, 0], a = new BufferGeometry();
    a.setAttribute("position", new Float32BufferAttribute(s, 3)), a.computeBoundingSphere(), this.add(new Mesh(a, new MeshBasicMaterial({ side: BackSide, fog: false })));
  }
  updateMatrixWorld() {
    if (this.scale.set(0.5 * this.light.width, 0.5 * this.light.height, 1), this.color !== void 0)
      this.material.color.set(this.color), this.children[0].material.color.set(this.color);
    else {
      this.material.color.copy(this.light.color).multiplyScalar(this.light.intensity);
      const t = this.material.color, n = Math.max(t.r, t.g, t.b);
      n > 1 && t.multiplyScalar(1 / n), this.children[0].material.color.copy(this.material.color);
    }
    this.matrixWorld.extractRotation(this.light.matrixWorld).scale(this.scale).copyPosition(this.light.matrixWorld), this.children[0].matrixWorld.copy(this.matrixWorld);
  }
  dispose() {
    this.geometry.dispose(), this.material.dispose(), this.children[0].geometry.dispose(), this.children[0].material.dispose();
  }
};
var { logWarning: tt } = Q();
var ie;
var F;
var Wr = {
  DirectionalLight: DirectionalLightHelper,
  PointLight: PointLightHelper,
  SpotLight: SpotLightHelper,
  HemisphereLight: HemisphereLightHelper,
  RectAreaLight: Ct
};
var oo = {
  mounted: (e) => {
    if (!e.isLight) {
      tt(`${e.type} is not a light`);
      return;
    }
    ie = Wr[e.type], e.parent.add(new ie(e, 1, e.color.getHex()));
  },
  updated: (e) => {
    F = e.parent.children.find((t) => t instanceof ie), !(F instanceof Ct) && F.update();
  },
  unmounted: (e) => {
    if (!e.isLight) {
      tt(`${e.type} is not a light`);
      return;
    }
    F = e.parent.children.find((t) => t instanceof ie), F && F.dispose && F.dispose(), e.parent && e.parent.remove(F);
  }
};
var so = {
  mounted: (e, t) => {
    if (t.arg) {
      console.log(`v-log:${t.arg}`, e[t.arg]);
      return;
    }
    console.log("v-log", e);
  }
};
var io = {
  install(e) {
    e.component("TresCanvas", Hr);
  }
};
export {
  Hr as TresCanvas,
  Yr as UseLoader,
  qr as UseTexture,
  Ce as catalogue,
  dr as createRenderLoop,
  io as default,
  mt as dispose,
  Ee as extend,
  Kr as isProd,
  hr as normalizeColor,
  Jr as normalizeVectorFlexibleParam,
  Qr as onTresReady,
  no as templateCompilerOptions,
  On as traverseObjects,
  ar as useCamera,
  Dn as useLoader,
  Q as useLogger,
  Zr as useLoop,
  yr as useRaycaster,
  eo as useRenderLoop,
  gr as useRenderer,
  to as useSeek,
  ir as useTexture,
  Xr as useTres,
  me as useTresContext,
  br as useTresContextProvider,
  _r as useTresEventManager,
  ro as vDistanceTo,
  oo as vLightHelper,
  so as vLog
};
//# sourceMappingURL=@tresjs_core.js.map
