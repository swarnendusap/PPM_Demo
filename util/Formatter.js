/* global globe, com, illumina, ppm */

$.sap.declare('illumina.ppm.util.Formatter');
$.sap.require("sap.ca.ui.model.format.DateFormat");

illumina.ppm.util.Formatter = {

	dateFormatter: function(dDate) {
		var oDateFormat = sap.ca.ui.model.format.DateFormat.getDateInstance();
		return oDateFormat.format(dDate);
	},

	textLbl: function(lbl) {
		var str = "";
		if (lbl === "ALL") {
			str = "Display All Notifications";
		} else if (lbl === "I0068") {
			str = "Display Outstanding Notification";
		} else if (lbl === "I0070") {
			str = "Display In-Process Notification";
		} else if (lbl === "I0072") {
			str = "Display Completed Notification";
		}
		return str;
	},
	concatFisLasName: function(fName, lName) {
		if (fName === "") {
			return lName;
		}
		else if(lName === ""){
			return lName;
		}
		return fName + " " + lName;
	}

};

illumina.ppm.util.Formatter.textFormatter = function(sCode, sText) {
	if (sCode === "") {
		return sCode;
	}
	return sCode + "  |   " + sText;
};

illumina.ppm.util.Formatter.textFormAddHyphen = function(sCode, sText) {
	return sCode + "   \-   " + sText;
};

illumina.ppm.util.Formatter.formatMasterListTitle = function(text, oListData) {
	return text + '(' + oListData.length + ')';
};

illumina.ppm.util.Formatter.stateFormatter = function(text) {
	var state;
	if (text === "Notification completed") {
		state = "Success";
	} else if (text === "Notification in process") {
		state = "Warning";
	} else {
		state = "Error";
	}

	return state;
};

// Add check for integer