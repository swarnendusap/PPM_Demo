var oComponent, oMainModel, oMainView;
sap.ui.define([
	'jquery.sap.global',
	'sap/ui/core/mvc/Controller',
	'sap/ui/model/json/JSONModel',
	'sap/m/MessageBox',
	'sap/ui/model/Filter',
	'sap/m/MessageToast',
	'sap/ui/model/FilterOperator'
], function(jQuery, Controller, JSONModel, MessageBox, Filter, MessageToast, FilterOperator) {
	"use strict";

	var ResponsiveSplitterController = Controller.extend("illumina.ppm.Main", {

		onInit: function(evt) {

			// https://sapfioridev.illumina.com/sap/opu/odata/sap/ZC2E_RESOURCE_ALLOCATION_SRV/TProjectLSet?$filter=MgrId eq 'SBASU' and ProjectId eq ''
			var sServiceUrl = "https://sapfioridev.illumina.com/sap/opu/odata/sap/ZC2E_RESOURCE_ALLOCATION_SRV";
			this.oModelInit = new sap.ui.model.odata.ODataModel(sServiceUrl, true);
			this.populateProjectTableHeader();
			this.populateResourceTableHeader();

			/*			var params = "('" + this._istat + "')/TO_NOTIF";
						this.getModel().read("/NotifstatusSet" + params, {
							success: $.proxy(function(oData) {
								if (this.isBackendDataNotNull(oData)) { // this is for oData
									var jsonModel = new JSONModel();
									jsonModel.setData(oData.results);
									this.getOwnerComponent().setModel(jsonModel, "NotificationDisplayModel");
								}
								this.hideBusyDialog();
							}, this),
							error: $.proxy(this.handleError, this)
						});*/

			// set explored app's demo model on this sample
			// var oModel = new JSONModel(jQuery.sap.getModulePath("sap.ui.demo.mock", "/products.json"));
			// this.getView().setModel(oModel);

			//Table 1
			// var filters = [ new sap.ui.model.Filter("ResNm", sap.ui.model.FilterOperator.Contains, "TREGIDGO") ];
			// this.getView().byId("ResAsmntTbl").getBinding("items").filter(filters); 			

			//Table 2
			// var filters = [ new sap.ui.model.Filter("ResNm", sap.ui.model.FilterOperator.Contains, "TREGIDGO") ];
			// this.getView().byId("ResAsmntTbl").getBinding("items").filter(filters); 
		},

		onAfterRendering: function() {
			this.oModel = this.getView().getModel("masterOModel");
			//this.oModel = this.getOwnerComponent().getModel("masterOModel");

			this.populateProjectList();
			this.populateResourceList();

		},
		populateProjectTableHeader: function() {
			var this1 = this;
			var projectHeaderTexts = [];
			var oJsonModel = new sap.ui.model.json.JSONModel();
			//filters: [new Filter('MgrId', FilterOperator.EQ, 'SBASU'), new Filter('ProjectId', FilterOperator.EQ, '')],
			this.oModelInit.read("/TStaffingHSet?$filter=UserId%20eq%20%27SBASU%27", null, null, true,
				function(oData, response) {
					oJsonModel.setData(oData.results[0]);
					projectHeaderTexts = oData.results[0];
					console.log(oData.results[0].ProjectId);
					//console.log("Text: "+projectHeaderTexts.ProjectId);

					//Set Table Header Text
					this1.getView().byId("l_RoleName").setText(oData.results[0].RoleName);
					this1.getView().byId("l_RoleFunction").setText(oData.results[0].RoleFunction);
					this1.getView().byId("l_BeginDate").setText(oData.results[0].BeginDate);
					this1.getView().byId("l_EndDate").setText(oData.results[0].EndDate);
					this1.getView().byId("l_ResourceName").setText(oData.results[0].ResourceName);
					this1.getView().byId("l_Month1").setText(oData.results[0].Month1);
					this1.getView().byId("l_Month2").setText(oData.results[0].Month2);
					this1.getView().byId("l_Month3").setText(oData.results[0].Month3);
					this1.getView().byId("l_Month4").setText(oData.results[0].Month4);
					this1.getView().byId("l_Month5").setText(oData.results[0].Month5);
					this1.getView().byId("l_Month6").setText(oData.results[0].Month6);
					this1.getView().byId("l_Month7").setText(oData.results[0].Month7);
					this1.getView().byId("l_Month8").setText(oData.results[0].Month8);
					this1.getView().byId("l_Month9").setText(oData.results[0].Month9);
					this1.getView().byId("l_Month10").setText(oData.results[0].Month10);
					this1.getView().byId("l_Month11").setText(oData.results[0].Month11);
					this1.getView().byId("l_Month12").setText(oData.results[0].Month12);
					this1.getView().byId("l_Month13").setText(oData.results[0].Month13);
					this1.getView().byId("l_Month14").setText(oData.results[0].Month14);
					this1.getView().byId("l_Month15").setText(oData.results[0].Month15);
					this1.getView().byId("l_Month16").setText(oData.results[0].Month16);
					this1.getView().byId("l_Month17").setText(oData.results[0].Month17);
					this1.getView().byId("l_Month18").setText(oData.results[0].Month18);
					this1.getView().byId("l_Month19").setText(oData.results[0].Month19);
					this1.getView().byId("l_Month20").setText(oData.results[0].Month20);
					this1.getView().byId("l_Month21").setText(oData.results[0].Month21);
					this1.getView().byId("l_Month22").setText(oData.results[0].Month22);
					this1.getView().byId("l_Month23").setText(oData.results[0].Month23);
					this1.getView().byId("l_Month24").setText(oData.results[0].Month24);

				});
			sap.ui.getCore().setModel(oJsonModel, "ProjectTableHeader");

			//console.log("Label: "+this.getView().byId("l_rlNm").getText());
			//this.getView().byId("l_rlNm").setText("New Text");
		},
		populateResourceTableHeader: function() {
			var this1 = this;
			var projectHeaderTexts = [];
			var oJsonModel = new sap.ui.model.json.JSONModel();
			//filters: [new Filter('MgrId', FilterOperator.EQ, 'SBASU'), new Filter('ProjectId', FilterOperator.EQ, '')],
			this.oModelInit.read("/TAssignmentHSet", null, null, true,
				function(oData, response) {
					oJsonModel.setData(oData.results[0]);
					projectHeaderTexts = oData.results[0];
					console.log(oData.results[0]);
					//console.log("Text: "+projectHeaderTexts.ProjectId);

					//Set Table Header Text
					this1.getView().byId("l2_Projnam").setText(oData.results[0].Projnam);
					this1.getView().byId("l2_RoleName").setText(oData.results[0].RoleName);
					this1.getView().byId("l2_ResourceName").setText(oData.results[0].ResourceName);
					this1.getView().byId("l2_Month1").setText(oData.results[0].Month1);
					this1.getView().byId("l2_Month2").setText(oData.results[0].Month2);
					this1.getView().byId("l2_Month3").setText(oData.results[0].Month3);
					this1.getView().byId("l2_Month4").setText(oData.results[0].Month4);
					this1.getView().byId("l2_Month5").setText(oData.results[0].Month5);
					this1.getView().byId("l2_Month6").setText(oData.results[0].Month6);
					this1.getView().byId("l2_Month7").setText(oData.results[0].Month7);
					this1.getView().byId("l2_Month8").setText(oData.results[0].Month8);
					this1.getView().byId("l2_Month9").setText(oData.results[0].Month9);
					this1.getView().byId("l2_Month10").setText(oData.results[0].Month10);
					this1.getView().byId("l2_Month11").setText(oData.results[0].Month11);
					this1.getView().byId("l2_Month12").setText(oData.results[0].Month12);
					this1.getView().byId("l2_Month13").setText(oData.results[0].Month13);
					this1.getView().byId("l2_Month14").setText(oData.results[0].Month14);
					this1.getView().byId("l2_Month15").setText(oData.results[0].Month15);
					this1.getView().byId("l2_Month16").setText(oData.results[0].Month16);
					this1.getView().byId("l2_Month17").setText(oData.results[0].Month17);
					this1.getView().byId("l2_Month18").setText(oData.results[0].Month18);
					this1.getView().byId("l2_Month19").setText(oData.results[0].Month19);
					this1.getView().byId("l2_Month20").setText(oData.results[0].Month20);
					this1.getView().byId("l2_Month21").setText(oData.results[0].Month21);
					this1.getView().byId("l2_Month22").setText(oData.results[0].Month22);
					this1.getView().byId("l2_Month23").setText(oData.results[0].Month23);
					this1.getView().byId("l2_Month24").setText(oData.results[0].Month24);

				});
			sap.ui.getCore().setModel(oJsonModel, "ProjectTableHeader");

			//console.log("Label: "+this.getView().byId("l_rlNm").getText());
			//this.getView().byId("l_rlNm").setText("New Text");
		},
		populateProjectList: function() {
			this.oModel.read("/TProjectLSet", {
				success: $.proxy(function(oData) {
					//if (this.isBackendDataNotNull(oData)) { // this is for oData
					var jsonModel = new JSONModel();
					jsonModel.setData(oData.results);
					this.getOwnerComponent().setModel(jsonModel, "ProjectList");
					console.log(oData.results);
					//}
					//this.hideBusyDialog();
				}, this),
				error: $.proxy(this.handleError, this)
			});
		},
		populateResourceList: function() {
			this.oModel.read("/TResourceSet", {
				success: $.proxy(function(oData) {
					//if (this.isBackendDataNotNull(oData)) { // this is for oData
					var jsonModel = new JSONModel();
					jsonModel.setData(oData.results);
					this.getOwnerComponent().setModel(jsonModel, "ResourceList");
					console.log(oData.results);
					//}
					//this.hideBusyDialog();
				}, this),
				error: $.proxy(this.handleError, this)
			});
		},

		onListItemPress: function(evt) {
			MessageToast.show("Pressed : " + evt.getSource().getSelectedKey());

			var selectedProjId = evt.getSource().getSelectedKey();

			var param = "/TStaffingSet" + "('" + selectedProjId + "')";
			console.log(param);
			this.oModel.read("/TStaffingSet", {
				success: $.proxy(function(oData) {

					//if (this.isBackendDataNotNull(oData)) { // this is for oData
					var jsonModel = new JSONModel();
					jsonModel.setData(oData.results);
					this.getOwnerComponent().setModel(jsonModel, "SelectedProjectTableData");
					console.log(oData.results);
					//}
					//this.hideBusyDialog();
				}, this),
				error: $.proxy(this.handleError, this)
			});

		},
		
		onListResourceItemPress: function(evt) {
			MessageToast.show("Pressed : " + evt.getSource().getSelectedKey());

			var selectedResourceId = evt.getSource().getSelectedKey();

			var param = "/TAssignmentSet" + "('" + selectedResourceId + "')";
			console.log(param);
			this.oModel.read("/TAssignmentSet", {
				success: $.proxy(function(oData) {

					//if (this.isBackendDataNotNull(oData)) { // this is for oData
					var jsonModel = new JSONModel();
					jsonModel.setData(oData.results);
					this.getOwnerComponent().setModel(jsonModel, "SelectedResouceTableData");
					console.log(oData.results);
					//}
					//this.hideBusyDialog();
				}, this),
				error: $.proxy(this.handleError, this)
			});

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
			data.ProjDtls[rowNum].Jan = vAllocVal;
			data.ProjDtls[rowNum].Feb = vAllocVal;
			data.ProjDtls[rowNum].Mar = vAllocVal;
			data.ProjDtls[rowNum].Apr = vAllocVal;
			data.ProjDtls[rowNum].May = vAllocVal;
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

		getModel: function(sName) {
			//return this.getView().getModel(sName);
			if (sName) {
				return this.getOwnerComponent().getModel(sName);
			} else {
				return this.getOwnerComponent().getModel();
			}
		},
		setModel: function(oModel, sName) {
			return this.getView().setModel(oModel, sName);
		},
		getResourceBundle: function() {
			return this.getOwnerComponent().getModel("i18n").getResourceBundle();
		},

		loadData: function() {
			var this1 = this;
			this.getView().getModel().read("/TStaffingSet", {
				filters: [
					new Filter('UserId', FilterOperator.EQ, 'SBASU')
				],
				success: $.proxy(function(oData) {
					if (this.isBackendDataNotNull(oData)) { // this is for oData
						this.getView().setModel(new JSONModel(oData.results), 'ConfigDetailsModel');
						console.log(oData.results);
						/*this.getModel().attachRequestCompleted(function() {*/
						//	this1._populateTable();
						/*console.log("Execution Allowed");
						});*/
					}
					this.hideBusyDialog();
				}, this),
				failed: function(oData, response) {
					//console.log("Failed to get Input Values from service!");
				}
			});
		},

		onSearchRlNm: function(oEvent) {

			var searchString = oEvent.getParameter("query");
			var filters = [];
			if (searchString && searchString.length > 0) {
				filters = [new sap.ui.model.Filter("RlNm", sap.ui.model.FilterOperator.Contains, searchString)];
			}
			//oEvent.getSource().getBinding("items").filter(filters);
			this.getView().byId("ProjDtlsTbl").getBinding("items").filter(filters);
		},

		//Example of Filtering Table Data
		onShowDanali: function(oEvent) {
			var searchString = "Denali"; //oEvent.getParameter("query");
			var filters = [];
			if (searchString && searchString.length > 0) {
				filters = [new sap.ui.model.Filter("ProjNm", sap.ui.model.FilterOperator.Contains, searchString)];
			}
			//oEvent.getSource().getBinding("items").filter(filters);
			this.getView().byId("ProjDtlsTbl").getBinding("items").filter(filters);
			this.getView().byId("ProjDtlsTbl").setVisible(true);
		},
		onShowNewtera: function(oEvent) {
			var searchString = "Newtera"; //oEvent.getParameter("query");
			var filters = [];
			if (searchString && searchString.length > 0) {
				filters = [new sap.ui.model.Filter("ProjNm", sap.ui.model.FilterOperator.Contains, searchString)];
			}
			//oEvent.getSource().getBinding("items").filter(filters);
			this.getView().byId("ProjDtlsTbl").getBinding("items").filter(filters);
			this.getView().byId("ProjDtlsTbl").setVisible(true);
		},
		onShowSAP: function(oEvent) {
			var searchString = "SAP Upgrade"; //oEvent.getParameter("query");
			var filters = [];
			if (searchString && searchString.length > 0) {
				filters = [new sap.ui.model.Filter("ProjNm", sap.ui.model.FilterOperator.Contains, searchString)];
			}
			//oEvent.getSource().getBinding("items").filter(filters);
			this.getView().byId("ProjDtlsTbl").getBinding("items").filter(filters);
			this.getView().byId("ProjDtlsTbl").setVisible(true);
		},

		onHideTable: function(oEvent) {
			//this.getView().byId("ProjDtlsTbl").setVisible(false);
		},
		onShowTable: function(oEvent) {
			//this.getView().byId("ProjDtlsTbl").setVisible(true);
		}

	});

	return ResponsiveSplitterController;

});