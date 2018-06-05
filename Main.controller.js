sap.ui.define([
	'jquery.sap.global',
	'sap/ui/core/mvc/Controller',
	'sap/ui/model/json/JSONModel', 
	'sap/m/MessageBox'
], function(jQuery, Controller, JSONModel, MessageBox) {
	"use strict";

	var ResponsiveSplitterController = Controller.extend("illumina.ppm.Main", {

		onInit: function(evt) {
/*			var aData = {
				"ProjDtls": [{
					RowNm: 1,
					RlNm: "Bioinformatician - Cosmin",
					Com: "Please assign ABC",
					Frm: "1/1/2018",
					To: "12/31/2018",
					Res: "BODRUG",
					Jan: "0.25",
					Feb: "0.25",
					Mar: "0.25",
					Apr: "0.25",
					May: "0.25"
				}, {
					RowNm: 3,
					RlNm: "Enzyme Developer",
					Com: "Pl Assign XYZ",
					Frm: "1/1/2018",
					To: "12/31/2019",
					Res: "TREGIDGO",
					Jan: "0.25",
					Feb: "0.25",
					Mar: "0.25",
					Apr: "0.25",
					May: "0.25"
				}],
				"NameList": [{
					Name: "TREGIDGO"
				}, {
					Name: "SWARNENDU"
				}]
			};*/

			// var aModel = new sap.ui.model.json.JSONModel(aData);
			// this.getView().setModel(aModel, 'ProjModelData');

			var mModel = new JSONModel(jQuery.sap.getModulePath("sap.ui.demo.mock", "/projects.json"));
			this.getView().setModel(mModel, "ProjModelData");
			
console.log(this.getView().getModel("ProjModelData"));

			// set explored app's demo model on this sample
			var oModel = new JSONModel(jQuery.sap.getModulePath("sap.ui.demo.mock", "/products.json"));
			this.getView().setModel(oModel);
			
			
			//Table 1
			// var filters = [ new sap.ui.model.Filter("ResNm", sap.ui.model.FilterOperator.Contains, "TREGIDGO") ];
			// this.getView().byId("ResAsmntTbl").getBinding("items").filter(filters); 			
			
			//Table 2
			// var filters = [ new sap.ui.model.Filter("ResNm", sap.ui.model.FilterOperator.Contains, "TREGIDGO") ];
			// this.getView().byId("ResAsmntTbl").getBinding("items").filter(filters); 
		},

		onPressAdd: function(oEvent) {
			//Disable Buttons
			/*this.getView().byId("btnSubmitAdd").setVisible(true);
			this.getView().byId("btnDelete").setEnabled(false);*/

			var oModel = this.getView().getModel('ProjModelData');
			var data = oModel.getData();
			var vRowCount = data.ProjDtls.length;
			console.log("Row Count:" + vRowCount);
			console.log(data.ProjDtls);
			data.ProjDtls.push({
				RowNm: vRowCount + 1,
				RlNm: "",
				Com: "",
				Frm: "",
				To: "",
				Res: "",
				Jan: "0",
				Feb: "0",
				Mar: "0",
				Apr: "0",
				May: "0"
			});
			oModel.setData(data);
			console.log(oModel);
			oModel.refresh();

			//this._hideDeleteBtn();
		},
		onPressAllocate: function(oEvent) {

			console.log(this.getView().byId("iAllocFld").getValue());
			var vAllocVal = this.getView().byId("iAllocFld").getValue();
			var oTable = this.getView().byId("ProjDtlsTbl");
			var oModel = this.getView().getModel('ProjModelData');
			var tblRow = oTable._aSelectedPaths[0];
			var data = oModel.getData();
			//var oItem = oEvent.getSource();
			//var tblRow = oItem.oPropagatedProperties.oBindingContexts.WMPickingAreaModel.sPath;
			var row = tblRow.split("/");
			var rowNum = row[2];
			console.log(data.ProjDtls[rowNum].RlNm);
			//data.ProjDtls[rowNum].RlNm = "Software Engineer";
			data.ProjDtls[rowNum].Jan= vAllocVal;
			data.ProjDtls[rowNum].Feb= vAllocVal;
			data.ProjDtls[rowNum].Mar= vAllocVal;
			data.ProjDtls[rowNum].Apr= vAllocVal;
			data.ProjDtls[rowNum].May= vAllocVal;
				//data.splice(rowNum, 1);
			oModel.setData(data);
			oModel.refresh();
		},

		onPressDelete: function(oEvent) {
			/*
			 * var oTable = this.getView().byId("notifDisplayTable"); var oModel =
			 * this.getView().getModel('WMPickingAreaModel'); var data =
			 * oModel.getData(); var selRowCount =
			 * oTable._aSelectedPaths.length; var Flag = false; for (var i = 0;
			 * i < selRowCount; i++) { var tblRow = oTable._aSelectedPaths[i];
			 * var row = tblRow.split("/"); var rowNum = row[1];
			 * data.splice(rowNum, 1); oModel.setData(data); oModel.refresh(); }
			 */

			var oTable = this.getView().byId("ProjDtlsTbl");
			var oModel = this.getView().getModel('ProjModelData');
			var tblRow = oTable._aSelectedPaths[0];
			console.log(tblRow);
			var row = tblRow.split("/");
			console.log(row);
			var rowNum = row[2];
			console.log(rowNum);
			var data = oModel.getData();

			data.ProjDtls.splice(rowNum, 1);
			console.log(data.ProjDtls);
			oModel.setData(data);
			oModel.refresh();

			/*			var deletedData = oModel.getData()[rowNum];
						var countReqest = 0;
						deletedData.Mode = "D";
						deletedData.Transport = "ES1K902784";
						this.getModel().create("/SCWM_EWM_MAP_ACTSet", deletedData, {
							success : $.proxy(function(oData) {

								if (oData.Message === "") {
									MessageBox.show("Data Deleted successfully", {
										icon : MessageBox.Icon.SUCCESS,
										title : "Success",
										actions : [ MessageBox.Action.OK ],
									});
									this._getWMPickingAreaDetails();
								} else {
									MessageBox.show(oData.Message, {
										icon : MessageBox.Icon.ERROR,
										title : "Error",
										actions : [ MessageBox.Action.OK ],
									});
								}
							}, this),
							error : $.proxy(this.handleError, this)
						})*/
		},
		onPressSave: function(oEvent) {
			MessageBox.show("Data Saved successfully", {
				icon: MessageBox.Icon.SUCCESS,
				title: "Success",
				actions: [MessageBox.Action.OK]
			});
		},
		
		onSearchRlNm : function(oEvent) {

			var searchString = oEvent.getParameter("query");
			var filters = [];
			if (searchString && searchString.length > 0) {
				filters = [ new sap.ui.model.Filter("RlNm", sap.ui.model.FilterOperator.Contains, searchString) ];
			}
			//oEvent.getSource().getBinding("items").filter(filters);
			this.getView().byId("ProjDtlsTbl").getBinding("items").filter(filters);  
		},
		onShowDanali : function(oEvent)
		{
			var searchString = "Denali"; //oEvent.getParameter("query");
			var filters = [];
			if (searchString && searchString.length > 0) {
				filters = [ new sap.ui.model.Filter("ProjNm", sap.ui.model.FilterOperator.Contains, searchString) ];
			}
			//oEvent.getSource().getBinding("items").filter(filters);
			this.getView().byId("ProjDtlsTbl").getBinding("items").filter(filters);  
			this.getView().byId("ProjDtlsTbl").setVisible(true);
		},
		onShowNewtera : function(oEvent)
		{
			var searchString = "Newtera"; //oEvent.getParameter("query");
			var filters = [];
			if (searchString && searchString.length > 0) {
				filters = [ new sap.ui.model.Filter("ProjNm", sap.ui.model.FilterOperator.Contains, searchString) ];
			}
			//oEvent.getSource().getBinding("items").filter(filters);
			this.getView().byId("ProjDtlsTbl").getBinding("items").filter(filters);  
			this.getView().byId("ProjDtlsTbl").setVisible(true);
		},
		onShowSAP : function(oEvent)
		{
			var searchString = "SAP Upgrade"; //oEvent.getParameter("query");
			var filters = [];
			if (searchString && searchString.length > 0) {
				filters = [ new sap.ui.model.Filter("ProjNm", sap.ui.model.FilterOperator.Contains, searchString) ];
			}
			//oEvent.getSource().getBinding("items").filter(filters);
			this.getView().byId("ProjDtlsTbl").getBinding("items").filter(filters);  
			this.getView().byId("ProjDtlsTbl").setVisible(true);
		},
		onShowTab2_1 : function(oEvent)
		{
			var searchString = "TREGIDGO"; //oEvent.getParameter("query");
			var filters = [];
			if (searchString && searchString.length > 0) {
				filters = [ new sap.ui.model.Filter("ResNm", sap.ui.model.FilterOperator.Contains, searchString) ];
			}
			//oEvent.getSource().getBinding("items").filter(filters);
			this.getView().byId("ResAsmntTbl").getBinding("items").filter(filters);  
			//this.getView().byId("ResAsmntTbl").setVisible(true);
		},
		onShowTab2_2 : function(oEvent)
		{
			var searchString = "BODRUG"; //oEvent.getParameter("query");
			var filters = [];
			if (searchString && searchString.length > 0) {
				filters = [ new sap.ui.model.Filter("ResNm", sap.ui.model.FilterOperator.Contains, searchString) ];
			}
			//oEvent.getSource().getBinding("items").filter(filters);
			this.getView().byId("ResAsmntTbl").getBinding("items").filter(filters);  
			//this.getView().byId("ResAsmntTbl").setVisible(true);
		},
		onShowTab2_3 : function(oEvent)
		{
			var searchString = "SWARNENDU"; //oEvent.getParameter("query");
			var filters = [];
			if (searchString && searchString.length > 0) {
				filters = [ new sap.ui.model.Filter("ResNm", sap.ui.model.FilterOperator.Contains, searchString) ];
			}
			//oEvent.getSource().getBinding("items").filter(filters);
			this.getView().byId("ResAsmntTbl").getBinding("items").filter(filters);  
			//this.getView().byId("ResAsmntTbl").setVisible(true);
		},		
		onHideTable : function(oEvent)
		{
			//this.getView().byId("ProjDtlsTbl").setVisible(false);
		},
		onShowTable : function(oEvent)
		{
			//this.getView().byId("ProjDtlsTbl").setVisible(true);
		}

	});

	return ResponsiveSplitterController;

});