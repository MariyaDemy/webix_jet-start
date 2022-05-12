import {JetView} from "webix-jet";

import contacts from "../models/contacts";

export default class Contacts extends JetView {
	config() {
		let list = {
			view: "list",
			template: "#Name# Email: #Email# Status: #Status# Country: #Country#",
			data: contacts,
			scroll: false
		};

		let form = {
			view: "form",
			elements: [
				{type: "section", template: "Contacts"},
				{
					view: "text",
					label: "Name",
					height: 50,
					name: "name"
				},
				{
					view: "text",
					label: "Email",
					height: 50,
					name: "email"
				},
				{
					view: "text",
					label: "Status",
					height: 50,
					name: "status"
				},
				{
					view: "text",
					label: "Country",
					height: 50,
					name: "country"
				},
				{}
			]
		};

		let ui = {
			type: "wide",
			css: "app_layout",
			cols: [list, form]
		};

		return ui;
	}
}
