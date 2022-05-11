import {JetView} from "webix-jet";

import countries from "../models/countries";
import statuses from "../models/statuses";

export default class DataView extends JetView {
	config() {
		const valuesToForm = (id) => {
			let val = $$("countriesTable").getItem(id);
			$$("countriesForm").setValues(val);
		};

		const valuesToForm2 = (id) => {
			let val = $$("statusTable").getItem(id);
			$$("statusForm").setValues(val);
		};

		let dataForm1 = {
			view: "form",
			id: "countriesForm",
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
						let form = $$("countriesForm");
						if (form.validate()) {
							const values = form.getValues();
							if (values.id) {
								$$("countriesTable").updateItem(values.id, values);
							}
							else {
								$$("countriesTable").add(values);
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
						let form = $$("countriesForm");
						form.clear();
						form.clearValidation();
						$$("countriesTable").unselectAll();
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
			id: "statusForm",
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
						let form = $$("statusForm");
						if (form.validate()) {
							const values = form.getValues();
							if (values.id) {
								$$("statusTable").updateItem(values.id, values);
							}
							else {
								$$("statusTable").add(values);
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
						let form = $$("statusForm");
						form.clear();
						form.clearValidation();
						$$("statusTable").unselectAll();
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
						{
							view: "datatable",
							id: "countriesTable",
							select: true,
							data: countries,
							scrollX: false,
							scrollY: false,
							columns: [
								{
									id: "Name",
									header: "Country",
									fillspace: true
								},
								{
									id: "del",
									header: "",
									template: "{common.trashIcon()}"
								}
							],
							onClick: {
								"wxi-trash": function (event, id) {
									this.remove(id);
									return false;
								}
							},
							on: {
								onAfterSelect: valuesToForm
							}
						},
						dataForm1
					]
				},
				{
					id: "data2",
					rows: [
						{
							view: "datatable",
							id: "statusTable",
							select: true,
							data: statuses,
							scrollX: false,
							scrollY: false,
							columns: [
								{
									id: "Name",
									header: "Status",
									fillspace: true
								},
								{
									id: "del",
									header: "",
									template: "{common.trashIcon()}"
								}
							],
							onClick: {
								"wxi-trash": function (event, id) {
									this.remove(id);
									return false;
								}
							},
							on: {
								onAfterSelect: valuesToForm2
							}
						},
						dataForm2
					]
				}
			]
		};

		let tabs = {
			view: "tabbar",
			type: "bottom",
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
