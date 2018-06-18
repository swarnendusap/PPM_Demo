sap.ui.define(['sap/ui/core/UIComponent', 'sap/ui/model/resource/ResourceModel', 'sap/ui/model/json/JSONModel',
		'sap/ui/model/odata/v2/ODataModel', 'sap/ui/model/odata/CountMode', 'sap/m/MessageBox', 'sap/ui/core/TextDirection'
	],
	function(UIComponent, ResourceModel, JSONModel, ODataModel, CountMode, MessageBox, TextDirection) {
		"use strict";

		var Component = UIComponent.extend("illumina.ppm.Component", {

			metadata: {
				includes: ["util/formatter.js", "css/custom.css"],
				rootView: "illumina.ppm.Main",
				dependencies: {
					"libs": ["sap.m", "sap.ui.layout", "sap.ushell"],
					"components": []
				},
				config: {
					resourceBundle: 'i18n/i18n.properties',
					serviceConfig: [{
						name: "localData",
						//serviceUrl: '/sap/opu/odata/sap/ZC2E_RESOURCE_ALLOCATION_SRV/',
						serviceUrl: "http://ussddevgw01.illumina.com:8000/sap/opu/odata/sap/ZC2E_RESOURCE_ALLOCATION_SRV/",
						local: true
					}]
				}
			},

			init: function() {
				UIComponent.prototype.init.apply(this, arguments);

				var mConfig = this.getMetadata().getConfig();
				var oServiceConfig = mConfig.serviceConfig[0];
				var sServiceUrl = oServiceConfig.serviceUrl;

				var oModel = new ODataModel(sServiceUrl, {
					useBatch: true,
					defaultUpdateMethod: 'PATCH',
					json: true,
					countSupported: true
				});
				this.setModel(oModel, "masterOModel");

				//console.log(oModel);

				// var router = this.getRouter();
				// this.routerHandler = new sap.m.routing.RouteMatchedHandler(router);
				// router.register();
				// router.initialize();
			},

			destroy: function() {

			}
		});

		return Component;

	});