/* eslint-disable no-undef */
import {JetApp, EmptyRouter, HashRouter, plugins} from "webix-jet";
import "./styles/app.css";

export default class MyApp extends JetApp {
	constructor(config) {
		const defaults = {
			id: APPNAME,
			version: VERSION,
			router: BUILD_AS_MODULE ? EmptyRouter : HashRouter,
			debug: true,
			start: "/top/contacts"
		};

		super({...defaults, ...config});
	}
}

if (!BUILD_AS_MODULE) {
	webix.ready(() => {
		let app = new MyApp();
		app.attachEvent("app:error:resolve", () => {
			webix.delay(() => app.show("/top/contacts"));
		});
		app.use(plugins.Locale, {lang: "ru"});
		app.render();
	});
}

