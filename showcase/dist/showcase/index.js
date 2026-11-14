// src/host.ts
var e = globalThis.__ALABASTER_PLUGIN_HOST__, t = "showcase", n = "showcase", r = {
	en: {
		title: "Plugin showcase",
		pageTitle: "Plugin showcase",
		state: "Printer state",
		progress: "Print progress",
		hotend: "Hotend",
		temperatureUnit: "°C",
		noReading: "—",
		note: "Note",
		amount: "Amount",
		amountUnit: "mm",
		tone: "Status colour",
		toneNeutral: "Neutral",
		toneAccent: "Accent",
		tonePositive: "Positive",
		level: "Level",
		percent: "%",
		highlight: "Highlight",
		send: "Send M115",
		ask: "Ask first",
		askTitle: "Send M115?",
		askDescription: "The printer reports its firmware version in the console.",
		askConfirm: "Send",
		showProgress: "Show print progress",
		showControls: "Show the example controls",
		remember: "Remember the note",
		behaviour: "Behaviour",
		pageIntro: "A plugin page is an ordinary component inside the page shell. Use page-column and page-card to lay it out.",
		sensors: "Temperature sensors",
		noSensors: "No temperature sensors reported yet."
	},
	nb: {
		title: "Utvidelseseksempel",
		pageTitle: "Utvidelseseksempel",
		state: "Skriverstatus",
		progress: "Fremdrift",
		hotend: "Dyse",
		note: "Notat",
		amount: "Mengde",
		tone: "Statusfarge",
		toneNeutral: "Nøytral",
		toneAccent: "Aksent",
		tonePositive: "Positiv",
		level: "Nivå",
		highlight: "Fremhev",
		send: "Send M115",
		ask: "Spør først",
		askTitle: "Sende M115?",
		askDescription: "Skriveren oppgir fastvareversjonen i konsollen.",
		askConfirm: "Send",
		showProgress: "Vis fremdrift",
		showControls: "Vis eksempelkontrollene",
		remember: "Husk notatet",
		behaviour: "Oppførsel",
		pageIntro: "En utvidelsesside er en vanlig komponent inne i sideskallet. Bruk page-column og page-card til oppsettet.",
		sensors: "Temperatursensorer",
		noSensors: "Ingen temperatursensorer er rapportert ennå."
	}
}, i = ["showProgress"];
function a(t) {
	return {
		showProgress: e.configBoolean(t, "showProgress", !0),
		showControls: e.configBoolean(t, "showControls", !0),
		rememberNote: e.configBoolean(t, "rememberNote", !1),
		tone: e.configString(t, "tone", "accent"),
		amount: e.configNumber(t, "amount", 10),
		note: e.configString(t, "note", "")
	};
}
// \0alabaster-host-vue
var o = globalThis.__ALABASTER_PLUGIN_HOST__.vue;
o.BaseTransition, o.BaseTransitionPropsValidators, o.Comment, o.DeprecationTypes, o.EffectScope, o.ErrorCodes, o.ErrorTypeStrings;
var s = o.Fragment;
o.KeepAlive, o.ReactiveEffect, o.Static, o.Suspense, o.Teleport, o.Text, o.TrackOpTypes, o.Transition, o.TransitionGroup, o.TriggerOpTypes, o.VueElement, o.__esModule, o.assertNumber, o.callWithAsyncErrorHandling, o.callWithErrorHandling, o.camelize, o.capitalize, o.cloneVNode, o.compatUtils, o.compile;
var c = o.computed;
o.createApp;
var l = o.createBlock, u = o.createCommentVNode, d = o.createElementBlock, f = o.createElementVNode;
o.createHydrationRenderer, o.createPropsRestProxy, o.createRenderer, o.createSSRApp, o.createSlots, o.createStaticVNode, o.createTextVNode;
var p = o.createVNode;
o.customRef, o.defineAsyncComponent;
var m = o.defineComponent;
o.defineCustomElement, o.defineEmits, o.defineExpose, o.defineModel, o.defineOptions, o.defineProps, o.defineSSRCustomElement, o.defineSlots, o.devtools, o.effect, o.effectScope, o.getCurrentInstance, o.getCurrentScope, o.getCurrentWatcher, o.getTransitionRawChildren, o.guardReactiveProps, o.h, o.handleError, o.hasInjectionContext, o.hydrate, o.hydrateOnIdle, o.hydrateOnInteraction, o.hydrateOnMediaQuery, o.hydrateOnVisible, o.initCustomFormatter, o.initDirectivesForSSR, o.inject, o.isMemoSame, o.isProxy, o.isReactive, o.isReadonly, o.isRef, o.isRuntimeOnly, o.isShallow, o.isVNode, o.markRaw, o.mergeDefaults, o.mergeModels, o.mergeProps, o.nextTick, o.nodeOps, o.normalizeClass, o.normalizeProps, o.normalizeStyle, o.onActivated, o.onBeforeMount, o.onBeforeUnmount, o.onBeforeUpdate, o.onDeactivated, o.onErrorCaptured, o.onMounted, o.onRenderTracked, o.onRenderTriggered, o.onScopeDispose, o.onServerPrefetch, o.onUnmounted, o.onUpdated, o.onWatcherCleanup;
var h = o.openBlock;
o.patchProp, o.popScopeId, o.provide, o.proxyRefs, o.pushScopeId, o.queuePostFlushCb, o.reactive, o.readonly;
var g = o.ref;
o.registerRuntimeCompiler, o.render;
var _ = o.renderList;
o.renderSlot, o.resolveComponent, o.resolveDirective, o.resolveDynamicComponent, o.resolveFilter, o.resolveTransitionHooks, o.setBlockTracking, o.setDevtoolsHook, o.setTransitionHooks, o.shallowReactive, o.shallowReadonly, o.shallowRef, o.ssrContextKey, o.ssrUtils, o.stop;
var v = o.toDisplayString;
o.toHandlerKey, o.toHandlers, o.toRaw, o.toRef, o.toRefs, o.toValue, o.transformVNodeArgs, o.triggerRef;
var y = o.unref;
o.useAttrs, o.useCssModule, o.useCssVars, o.useHost, o.useId, o.useModel, o.useSSRContext, o.useShadowRoot, o.useSlots, o.useTemplateRef, o.useTransitionState, o.vModelCheckbox, o.vModelDynamic, o.vModelRadio, o.vModelSelect, o.vModelText, o.vShow, o.version, o.warn, o.watch, o.watchEffect, o.watchPostEffect, o.watchSyncEffect, o.withAsyncContext;
var b = o.withCtx;
o.withDefaults, o.withDirectives, o.withKeys, o.withMemo, o.withModifiers, o.withScopeId;
// src/ShowcaseCard.vue?vue&type=script&setup=true&lang.ts
var x = { class: "showcase-grid" }, S = { class: "showcase-grid showcase-grid--two" }, C = { class: "showcase-actions" }, w = /* @__PURE__ */ m({
	__name: "ShowcaseCard",
	setup(r) {
		let { AppButton: i, AppField: o, AppOutputRow: m, AppProgressBar: _, AppSelect: v, AppSlider: b, AppStatusField: w, ConfirmDialog: T } = e.components, { t: E } = e.useText(t), { config: D, updateConfig: O } = e.useModule(t, n), k = e.stores.usePrinterStore(), A = e.stores.useTelemetryStore(), j = c(() => a(D.value)), M = c(() => {
			let e = A.readings.extruder?.temperature;
			return typeof e == "number" ? `${e.toFixed(1)} ${E("temperatureUnit")}` : E("noReading");
		}), N = c({
			get: () => j.value.amount,
			set: (e) => {
				e !== null && O({ amount: e });
			}
		}), P = c({
			get: () => j.value.tone,
			set: (e) => O({ tone: e })
		}), F = c(() => [
			{
				value: "neutral",
				label: E("toneNeutral")
			},
			{
				value: "accent",
				label: E("toneAccent")
			},
			{
				value: "positive",
				label: E("tonePositive")
			}
		]), I = g(40), L = g(!1), R = g(!1);
		function z() {
			e.sendGcode("M115");
		}
		function B() {
			R.value = !1, z();
		}
		return (e, t) => (h(), d("div", x, [
			p(y(w), {
				text: `${y(E)("hotend")} ${M.value}`,
				tone: P.value
			}, null, 8, ["text", "tone"]),
			j.value.showProgress ? (h(), l(y(_), {
				key: 0,
				value: y(k).progress,
				label: y(E)("progress")
			}, null, 8, ["value", "label"])) : u("", !0),
			j.value.showControls ? (h(), d(s, { key: 1 }, [
				f("div", S, [p(y(o), {
					modelValue: N.value,
					"onUpdate:modelValue": t[0] ||= (e) => N.value = e,
					label: y(E)("amount"),
					unit: y(E)("amountUnit"),
					min: 0,
					max: 100,
					step: 1,
					size: "sm"
				}, null, 8, [
					"modelValue",
					"label",
					"unit"
				]), p(y(v), {
					modelValue: P.value,
					"onUpdate:modelValue": t[1] ||= (e) => P.value = e,
					label: y(E)("tone"),
					options: F.value
				}, null, 8, [
					"modelValue",
					"label",
					"options"
				])]),
				p(y(b), {
					modelValue: I.value,
					"onUpdate:modelValue": t[2] ||= (e) => I.value = e,
					label: y(E)("level"),
					unit: y(E)("percent"),
					min: 0,
					max: 100,
					size: "sm"
				}, null, 8, [
					"modelValue",
					"label",
					"unit"
				]),
				p(y(m), {
					modelValue: L.value,
					"onUpdate:modelValue": t[3] ||= (e) => L.value = e,
					label: y(E)("highlight"),
					icon: "plug",
					toggle: "",
					size: "sm"
				}, null, 8, ["modelValue", "label"]),
				f("div", C, [p(y(i), {
					size: "sm",
					label: y(E)("send"),
					disabled: y(k).isPrinting,
					onClick: z
				}, null, 8, ["label", "disabled"]), p(y(i), {
					variant: "quiet",
					size: "sm",
					label: y(E)("ask"),
					disabled: y(k).isPrinting,
					onClick: t[4] ||= (e) => R.value = !0
				}, null, 8, ["label", "disabled"])])
			], 64)) : u("", !0),
			p(y(T), {
				open: R.value,
				title: y(E)("askTitle"),
				description: y(E)("askDescription"),
				"confirm-label": y(E)("askConfirm"),
				onConfirm: B,
				onCancel: t[5] ||= (e) => R.value = !1
			}, null, 8, [
				"open",
				"title",
				"description",
				"confirm-label"
			])
		]));
	}
}), T = { class: "page-column" }, E = { class: "page-card" }, D = { class: "text-eyebrow text-data-blue" }, O = { class: "mt-2 text-section-title" }, k = { class: "showcase-note" }, A = {
	key: 0,
	class: "showcase-note"
}, j = {
	key: 1,
	class: "showcase-grid showcase-grid--two"
}, M = /* @__PURE__ */ m({
	__name: "ShowcasePage",
	setup(n) {
		let { AppStatusField: r } = e.components, { t: i } = e.useText(t), a = e.stores.useTelemetryStore(), o = c(() => a.sensors);
		function u(e) {
			return e.temperature === null ? i("noReading") : `${e.temperature.toFixed(1)} ${i("temperatureUnit")}`;
		}
		return (e, t) => (h(), d("div", T, [f("section", E, [
			f("p", D, v(y(i)("pageTitle")), 1),
			f("h2", O, v(y(i)("sensors")), 1),
			f("p", k, v(y(i)("pageIntro")), 1),
			o.value.length === 0 ? (h(), d("p", A, v(y(i)("noSensors")), 1)) : (h(), d("div", j, [(h(!0), d(s, null, _(o.value, (e) => (h(), l(y(r), {
				key: e.objectName,
				text: `${e.name}: ${u(e)}`,
				tone: "neutral"
			}, null, 8, ["text"]))), 128))]))
		])]));
	}
}), N = { class: "settings-row" }, P = { class: "check-row" }, F = ["checked"], I = {
	key: 0,
	class: "settings-row"
}, L = /* @__PURE__ */ m({
	__name: "ShowcasePaneSettings",
	setup(r) {
		let { AppField: i, SurfaceSection: o } = e.components, { t: s } = e.useText(t), { config: m, updateConfig: g } = e.useModule(t, n), _ = c(() => a(m.value)), x = c({
			get: () => _.value.note,
			set: (e) => g({ note: e })
		});
		return (e, t) => (h(), l(y(o), {
			title: y(s)("behaviour"),
			divided: ""
		}, {
			default: b(() => [f("div", N, [f("label", P, [f("input", {
				type: "checkbox",
				checked: _.value.rememberNote,
				onChange: t[0] ||= (e) => y(g)({ rememberNote: !_.value.rememberNote })
			}, null, 40, F), f("span", null, v(y(s)("remember")), 1)])]), _.value.rememberNote ? (h(), d("div", I, [p(y(i), {
				modelValue: x.value,
				"onUpdate:modelValue": t[1] ||= (e) => x.value = e,
				label: y(s)("note"),
				type: "text",
				size: "sm"
			}, null, 8, ["modelValue", "label"])])) : u("", !0)]),
			_: 1
		}, 8, ["title"]));
	}
}), R = {
	key: 0,
	class: "settings-row"
}, z = { class: "check-row" }, B = ["checked"], V = {
	key: 1,
	class: "settings-row"
}, H = { class: "check-row" }, U = ["checked"], W = {
	messages: r,
	modules: [{
		id: n,
		title: "title",
		icon: "plug",
		requires: "klipper",
		component: w,
		settings: {
			fields: /* @__PURE__ */ m({
				__name: "ShowcaseSettings",
				props: { mode: {} },
				setup(r) {
					let o = r, { QuickSettingToggle: p } = e.components, { t: m } = e.useText(t), { config: g, updateConfig: _ } = e.useModule(t, n), b = e.useQuickSettings(g, _, i, () => o.mode), x = c(() => a(g.value));
					return (e, t) => (h(), d(s, null, [y(b).visible("showProgress") ? (h(), d("div", R, [f("label", z, [f("input", {
						type: "checkbox",
						checked: x.value.showProgress,
						onChange: t[0] ||= (e) => y(_)({ showProgress: !x.value.showProgress })
					}, null, 40, B), f("span", null, v(y(m)("showProgress")), 1)]), r.mode === "pane" ? (h(), l(y(p), {
						key: 0,
						label: y(m)("showProgress"),
						shown: y(b).isQuick("showProgress"),
						onToggle: t[1] ||= (e) => y(b).setQuick("showProgress", e)
					}, null, 8, ["label", "shown"])) : u("", !0)])) : u("", !0), y(b).visible("showControls") ? (h(), d("div", V, [f("label", H, [f("input", {
						type: "checkbox",
						checked: x.value.showControls,
						onChange: t[2] ||= (e) => y(_)({ showControls: !x.value.showControls })
					}, null, 40, U), f("span", null, v(y(m)("showControls")), 1)]), r.mode === "pane" ? (h(), l(y(p), {
						key: 0,
						label: y(m)("showControls"),
						shown: y(b).isQuick("showControls"),
						onToggle: t[3] ||= (e) => y(b).setQuick("showControls", e)
					}, null, 8, ["label", "shown"])) : u("", !0)])) : u("", !0)], 64));
				}
			}),
			defaultQuickKeys: i,
			pane: L
		},
		summary: () => {
			let t = e.stores.usePrinterStore();
			return t.hasActivePrint ? `${Math.round(t.progress * 100)}%` : null;
		}
	}],
	pages: [{
		id: "showcase",
		title: "pageTitle",
		icon: "plug",
		requires: "moonraker",
		component: M
	}]
};
export { W as default };
