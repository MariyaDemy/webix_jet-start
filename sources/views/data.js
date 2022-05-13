import {JetView} from "webix-jet";

import countriesData from "../models/countries";
import statusesData from "../models/statuses";
import BaseData from "./BaseData";

export default class DataView extends JetView {
	config() {
		const _ = this.app.getService("locale")._;

		let delColumn = {
			header: "",
			template: "{common.trashIcon()}"
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
										header: _("Country"),
										fillspace: true
									},
									delColumn
								]
							},
							countriesData,
							_("Country")
						)
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
										header: _("Status"),
										fillspace: true
									},
									delColumn
								]
							},
							statusesData,
							_("Status")
						)
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
					value: _("Countries"),
					id: "data1"
				},
				{
					value: _("Statuses"),
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
