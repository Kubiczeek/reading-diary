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
		client: {start:"_app/immutable/entry/start.qrcfdJ69.js",app:"_app/immutable/entry/app.CR8Z8iYQ.js",imports:["_app/immutable/entry/start.qrcfdJ69.js","_app/immutable/chunks/DyYVkn8S.js","_app/immutable/chunks/D_P7J2Hz.js","_app/immutable/entry/app.CR8Z8iYQ.js","_app/immutable/chunks/D_P7J2Hz.js","_app/immutable/chunks/BVLX1rLE.js","_app/immutable/chunks/y0faoB-u.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./chunks/0-DUHIr59H.js')),
			__memo(() => import('./chunks/1-B5iwq3pq.js')),
			__memo(() => import('./chunks/2-B-YoKufD.js')),
			__memo(() => import('./chunks/3-DKbql4Nc.js'))
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
