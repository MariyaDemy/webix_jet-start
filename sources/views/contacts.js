import {JetView} from "webix-jet";

import contactsData from "../models/contacts";
import ContactsForm from "./form";

export default class Contacts extends JetView {
	config() {
		let list = {
			view: "list",
			id: "contactsList",
			template: "#Name# Email: #Email# Status: #Status# Country: #Country# <span class='webix_icon wxi-close removeBtn'></span>",
			scroll: false,
			select: true,
			css: "contactslist",
			on: {
				onAfterSelect: (id) => {
					this.setParam("id", id, true);
				}
			},
			onClick: {
				removeBtn(event, id) {
					contactsData.remove(id);
					return false;
				}
			}
		};

		let ui = {
			type: "wide",
			css: "app_layout",
			cols: [list, {$subview: ContactsForm}]
		};

		return ui;
	}

	init() {
		const list = this.$$("contactsList");
		const id = this.getParam("id");

		list.sync(contactsData);

		// list.select(list.getFirstId());
		list.select(id);
	}
}
