import {JetView} from "webix-jet";

import countries from "../models/countries";
import statuses from "../models/statuses";
import BaseData from "./BaseData";

export default class DataView extends JetView {
	config() {
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
										header: "Country",
										fillspace: true
									},
									delColumn
								]
							},
							countries,
							"Country"
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
										header: "Status",
										fillspace: true
									},
									delColumn
								]
							},
							statuses,
							"Status"
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
