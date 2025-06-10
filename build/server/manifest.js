const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png"]),
	mimeTypes: {".png":"image/png"},
	_: {
		client: {start:"_app/immutable/entry/start.DkSsQRbr.js",app:"_app/immutable/entry/app.UEl3meJ6.js",imports:["_app/immutable/entry/start.DkSsQRbr.js","_app/immutable/chunks/C7fVi21o.js","_app/immutable/chunks/D_P7J2Hz.js","_app/immutable/entry/app.UEl3meJ6.js","_app/immutable/chunks/D_P7J2Hz.js","_app/immutable/chunks/BVLX1rLE.js","_app/immutable/chunks/y0faoB-u.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./chunks/0-DUHIr59H.js')),
			__memo(() => import('./chunks/1-DGiDHRxB.js')),
			__memo(() => import('./chunks/2-BngmWy-s.js')),
			__memo(() => import('./chunks/3-DRD2T0Sx.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/add",
				pattern: /^\/add\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();

const prerendered = new Set([]);

const base = "";

export { base, manifest, prerendered };
//# sourceMappingURL=manifest.js.map
