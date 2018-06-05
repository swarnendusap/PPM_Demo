sap.ui.define(['sap/ui/core/UIComponent'],
	function (UIComponent) {
		"use strict";

		var Component = UIComponent.extend("illumina.ppm.Component", {

			metadata: {
				includes : [ "css/custom.css"],
				rootView: "illumina.ppm.Main",
				dependencies: {
					libs: [
						"sap.ui.layout",
					]
				},
				config: {
/*					sample: {
						stretch : true,
						files: [
							"V.view.xml",
							"C.controller.js"
						]
					}*/
				}
			}
		});

		return Component;

	});