sap.ui.define([
	'jquery.sap.global',
	'sap/ui/core/mvc/Controller',
	'sap/ui/model/json/JSONModel', 
	'sap/m/MessageBox'
], function(jQuery, Controller, JSONModel, MessageBox) {
	"use strict";

	var ResponsiveSplitterController = Controller.extend("sap.ui.layout.sample.ResponsiveSplitter.C", {

		onInit: function(evt) {
			var aData = {
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
					RowNm: 2,
					RlNm: "IT - Engineer",
					Com: "SAP",
					Frm: "4/1/2017",
					To: "12/31/2018",
					Res: "SWARNENDU",
					Jan: "0.5",
					Feb: "0.5",
					Mar: "0.5",
					Apr: "0.5",
					May: "0.5"
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
					Name: "BODRUG"
				}, {
					Name: "SWARNENDU"
				}]
			};

			var aModel = new sap.ui.model.json.JSONModel(aData);
			this.getView().setModel(aModel, 'ProjModelData');
			console.log(this.getView().getModel("ProjModelData"));

			//this.getView().setModel(oModel);

			// set explored app's demo model on this sample
			var oModel = new JSONModel(jQuery.sap.getModulePath("sap.ui.demo.mock", "/products.json"));
			this.getView().setModel(oModel);
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
		
		onHide : function(oEvent)
		{
			this.getView().byId("ProjDtlsTbl").setVisible(false);
		},
		onShow : function(oEvent)
		{
			this.getView().byId("ProjDtlsTbl").setVisible(true);
		}

	});

	return ResponsiveSplitterController;

});