import {JetView} from "webix-jet";

export default class Settings extends JetView {
	config() {
		return {
			view: "segmented",
			options: [
				{id: "1", value: "EN"},
				{id: "2", value: "RU"}
			],
			value: 2
		};
	}
}
