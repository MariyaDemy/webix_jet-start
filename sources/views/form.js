import {JetView} from "webix-jet";

import contactsData from "../models/contacts";
import countriesData from "../models/countries";
import statusesData from "../models/statuses";

export default class ContactsForm extends JetView {
	config() {
		const _ = this.app.getService("locale")._;

		return {
			view: "form",
			localId: "contactsForm",
			elements: [
				{type: "section", template: _("Contacts")},
				{
					view: "text",
					label: _("Name"),
					height: 50,
					name: "Name"
				},
				{
					view: "text",
					label: _("Email"),
					height: 50,
					name: "Email"
				},
				{
					view: "combo",
					label: _("Country"),
					options: {body: {
						template: "#Name#"
					},
					data: countriesData},
					name: "Country"
				},
				{
					view: "combo",
					label: _("Status"),
					options: {body: {
						template: "#Name#"
					},
					data: statusesData},
					name: "Status"
				},
				{
					view: "button",
					value: _("Save"),
					css: "webix_primary",
					click: () => this.saveData()
				},
				{
					view: "button",
					value: _("Clear"),
					css: "webix_primary",
					click: () => this.clearData()
				},
				{}
			],
			rules: {
				Name: webix.rules.isNotEmpty,
				Email: webix.rules.isEmail
			}
		};
	}

	init() {
		this.Form = this.$$("contactsForm");
		this.List = webix.$$("contactsList");
	}

	saveData() {
		if (this.Form.validate()) {
			const values = this.Form.getValues();
			if (values.id) {
				contactsData.updateItem(values.id, values);
			}
			else {
				contactsData.add(values);
				this.Form.clear();
			}
		}
	}

	clearData() {
		this.Form.clear();
		this.Form.clearValidation();
		this.List.unselectAll();
	}

	urlChange(view) {
		const id = this.getParam("id", true);
		if (id) { view.setValues(contactsData.getItem(id)); }
	}
}
