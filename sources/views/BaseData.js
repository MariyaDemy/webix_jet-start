import {JetView} from "webix-jet";

export default class BaseData extends JetView {
	constructor(app, config, id, data, func) {
		super(app);
		this._config = config;
		this.id = id;
		this.data = data;
		this.func = func;
	}

	config() {
		return {
			view: "datatable",
			localId: this.id,
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
				onAfterSelect: this.func
			}
		};
	}
}
