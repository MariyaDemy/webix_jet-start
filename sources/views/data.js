import {JetView} from "webix-jet";

import countries from "../models/countries";
import statuses from "../models/statuses";
import BaseData from "./BaseData";

export default class DataView extends JetView {
	config() {
		const valuesToForm1 = (id) => {
			let val = this.$$("countriesTable").getItem(id);
			this.$$("countriesForm").setValues(val);
		};

		const valuesToForm2 = (id) => {
			let val = this.$$("statusTable").getItem(id);
			this.$$("statusForm").setValues(val);
		};

		let dataForm1 = {
			view: "form",
			localId: "countriesForm",
			elements: [
				{
					view: "text",
					label: "Country",
					height: 50,
					name: "Name"
				},
				{
					view: "button",
					value: "Save",
					css: "webix_primary",
					click() {
						let form = this.$$("countriesForm");
						if (form.validate()) {
							const values = form.getValues();
							if (values.id) {
								this.$$("countriesTable").updateItem(values.id, values);
							}
							else {
								this.$$("countriesTable").add(values);
								form.clear();
							}
						}
					}
				},
				{
					view: "button",
					value: "Clear",
					css: "webix_primary",
					click() {
						let form = this.$$("countriesForm");
						form.clear();
						form.clearValidation();
						this.$$("countriesTable").unselectAll();
					}
				}
			],
			elementsConfig: {
				inputWidth: 350
			},
			rules: {
				Name: webix.rules.isNotEmpty
			}
		};

		let dataForm2 = {
			view: "form",
			localId: "statusForm",
			elements: [
				{
					view: "text",
					label: "Status",
					height: 50,
					name: "Name"
				},
				{
					view: "button",
					value: "Save",
					css: "webix_primary",
					click() {
						let form = this.$$("statusForm");
						if (form.validate()) {
							const values = form.getValues();
							if (values.id) {
								this.$$("statusTable").updateItem(values.id, values);
							}
							else {
								this.$$("statusTable").add(values);
								form.clear();
							}
						}
					}
				},
				{
					view: "button",
					value: "Clear",
					css: "webix_primary",
					click() {
						let form = this.$$("statusForm");
						form.clear();
						form.clearValidation();
						this.$$("statusTable").unselectAll();
					}
				}
			],
			elementsConfig: {
				inputWidth: 350
			},
			rules: {
				Name: webix.rules.isNotEmpty
			}
		};

		let multiview = {
			view: "multiview",
			id: "multiview",
			cells: [
				{
					id: "data1",
					rows: [
						new BaseData(
							this.app,
							{
								columns: [
									{
										id: "Name",
										header: "Country",
										fillspace: true
									},
									{
										localId: "del",
										header: "",
										template: "{common.trashIcon()}"
									}
								]
							},
							"countriesTable",
							countries,
							valuesToForm1
						),
						dataForm1
					]
				},
				{
					id: "data2",
					rows: [
						new BaseData(
							this.app,
							{
								columns: [
									{
										id: "Name",
										header: "Status",
										fillspace: true
									},
									{
										localId: "del",
										header: "",
										template: "{common.trashIcon()}"
									}
								]
							},
							"statusTable",
							statuses,
							valuesToForm2
						),
						dataForm2
					]
				}
			]
		};

		let tabs = {
			view: "tabbar",
			multiview: true,
			value: "data1",
			options: [
				{
					value: "Countries",
					id: "data1"
				},
				{
					value: "Statuses",
					id: "data2"
				}
			],
			height: 75
		};

		return {
			cols: [
				{
					rows: [tabs, multiview]
				}
			]
		};
	}
}
