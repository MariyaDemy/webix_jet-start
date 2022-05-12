import {JetView} from "webix-jet";

export default class BaseData extends JetView {
	constructor(app, config, data, label) {
		super(app);
		this._config = config;
		this.data = data;
		this.label = label;
	}

	config() {
		return {
			rows: [{
				view: "datatable",
				localId: "my_table",
				select: true,
				scrollX: false,
				scrollY: false,
				data: this.data,
				columns: this._config.columns,
				onClick: {
					"wxi-trash": function (event, id) {
						this.remove(id);
						return false;
					}
				},
				on: {
					onAfterSelect: id => this.valuesToForm(id)
				}
			},
			{
				view: "form",
				localId: "my_form",
				elements: [
					{
						view: "text",
						label: this.label,
						height: 50,
						name: "Name"
					},
					{
						view: "button",
						value: "Save",
						css: "webix_primary",
						click: () => this.saveData()
					},
					{
						view: "button",
						value: "Clear",
						css: "webix_primary",
						click: () => this.clearData()
					}
				],
				elementsConfig: {
					inputWidth: 350
				},
				rules: {
					Name: webix.rules.isNotEmpty
				}
			}]
		};
	}

	init() {
		this.Form = this.$$("my_form");
		this.Table = this.$$("my_table");
	}

	valuesToForm(id) {
		let val = this.Table.getItem(id);
		this.Form.setValues(val);
	}

	saveData() {
		if (this.Form.validate()) {
			const values = this.Form.getValues();
			if (values.id) {
				this.Table.updateItem(values.id, values);
			}
			else {
				this.Table.add(values);
				this.Form.clear();
			}
		}
	}

	clearData() {
		this.Form.clear();
		this.Form.clearValidation();
		this.Table.unselectAll();
	}
}
