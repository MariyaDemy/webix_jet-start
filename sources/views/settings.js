import {JetView} from "webix-jet";

export default class SettingsView extends JetView {
	config() {
		const _ = this.app.getService("locale")._;

		const lang = this.app.getService("locale").getLang();

		return {
			label: _("Language"),
			view: "segmented",
			localId: "lang",
			options: [
				{id: "en", value: "EN"},
				{id: "ru", value: "RU"}
			],
			click: () => this.toggleLanguage(),
			value: lang
		};
	}

	toggleLanguage() {
		const langs = this.app.getService("locale");
		const value = this.$$("lang").getValue();
		langs.setLang(value);
	}
}
