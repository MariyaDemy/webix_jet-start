import {JetView} from "webix-jet";

export default class BaseData extends JetView {
	constructor(app, config, data, label) {
		super(app);
		this._config = config;
		this.data = data;
		this.label = label;
	}

	config() {
		const valuesToForm = (id) => {
			let val = this.$$("my_table").getItem(id);
			this.$$("my_form").setValues(val);
		};

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
					onAfterSelect: valuesToForm
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
						click() {
							let form = this.$$("my_form");
							if (form.validate()) {
								const values = form.getValues();
								if (values.id) {
									this.$$("my_table").updateItem(values.id, values);
								}
								else {
									this.$$("my_table").add(values);
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
							let form = this.$$("my_form");
							form.clear();
							form.clearValidation();
							this.$$("my_table").unselectAll();
						}
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
}
