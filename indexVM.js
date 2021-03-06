const pqOptions = {
    width: "auto",
    height: 500,
    showTitle: false,
    showHeader: true,
    showTop: true,
    showToolbar: false,
    showBottom: true,
    wrap: true,
    hwrap: false,
    sortable: false,
    editable: false,
    resizable: false,
    collapsible: false,
    draggable: true, dragColumns: { enabled: true },
    scrollModel: { autoFit: true },
    numberCell: { show: true, resizable: true, title: "S.N.", minWidth: 30 },
    pageModel: { curPage: 1, rPP: 10, type: "local" },
    columnTemplate: { wrap: true, editable: false, dataType: "string", halign: "center", hvalign: "center", resizable: true, styleHead: { 'font-weight': "bold" } },
};

function IndexVM() {
    const self = this;

    var isNullOrEmpty = function (str) {
        if (str === undefined || str === null) {
            return true;
        } else if (typeof str === "string") {
            return (str.trim() === "");
        } else {
            return false;
        }
    };

    const models = {
        MyModel: function (item) {
            item = item || {};
            this.fname = ko.observable(item.fname || "");
            this.mname = ko.observable(item.mname || "");
            this.lname = ko.observable(item.lname || "");
            this.dob = ko.observable(item.dob || "");
            this.GenderId = ko.observable(item.GenderId || "");
            this.GenderName = ko.observable(item.GenderName || "");

            this.email = ko.observable(item.email || "");
            this.mobile = ko.observable(item.mobile || "");
           // this.Address = ko.observable(item.Address || ""); 
            this.StreetName = ko.observable(item.StreetName || ""); 
            this.AddressId = ko.observable(item.AddressId || "");
            this.AddressName = ko.observable(item.AddressName || "");
            this.HouseNumber = ko.observable(item.HouseNumber || "");


        },
        UiElements: function () {
            self.MyModel = ko.observable(new models.MyModel());
            self.DataList = ko.observableArray([]);
           self.selectedTransaction = ko.observable();
            self.GenderList = ko.observableArray([
            { Text: 'Male', Value: '1' },
            { Text: 'Female', Value: '0' }]);
			self.AddressList = ko.observableArray([
            { Text: 'Permanent', Value: '1' },
            { Text: 'Temporary', Value: '0' }]);
        },
    };

    self.SaveInformation = function () {

        if (UiEvents.validate.SaveValidation()) {
            UiEvents.functions.Save();
        }
    };

    self.deleteRow = function (id) {
        UiEvents.functions.Delete(id);
    };
	
	self.editRow = function(id)
	{
		self.MyModel(new models.MyModel());
		var RowId= id;
		var selectItem = $("#demoGrid").pqGrid("getRowData", {rowIndxPage:Number(RowId)});
		self.selectedTransaction (RowId);
		
		self.MyModel().HouseNumber(selectItem.HouseNumber);
		self.MyModel().StreetName(selectItem.StreetName);
		
		self.MyModel().AddressId(selectItem.AddressId);
		
    };
		

    const UiEvents = {
        validate: {
            SaveValidation: function (item) {
                if (isNullOrEmpty(self.MyModel().fname())) {
                    alert("Warning! - First Name cannot be empty...!!!");
                    return false;
                }
                else if (isNullOrEmpty(self.MyModel().lname())) {
                    alert("Warning! - Last Name cannot be empty...!!!");
                    return false;
                }
				else if (isNullOrEmpty(self.MyModel().dob())) { 
                        alert("Warning! - Date of birth cannot be empty....!!");
                        return false;
				}
                 // else if (isNullOrEmpty(self.MyModel().GenderId())) {
                     // alert("Warning! - Error...!!!");
                     
					 // return false;
                 // }
				 else if (isNullOrEmpty(self.MyModel().AddressId())) {
                     alert("Warning! - Address cannot be empty...!!!");
                     return false;
				 }
				 
				 else {

                    self.MyModel().AddressName((self.AddressList().find(X => X.Value == self.MyModel().AddressId()) || {}).Text);
					alert("Validation Success");
					//self.MyModel().GenderName((self.GenderList().find(X => X.Value == self.MyModel().GenderId()) || {}).Text);
					if (isNullOrEmpty(self.selectedTransaction())){
					alert('new');				
						self.DataList.push(ko.toJS(self.MyModel()));
					 }
					else { // update 
						alert('old');
						self.DataList.splice(self.selectedTransaction(),1);
						self.DataList.push(ko.toJS(self.MyModel()));
						self.selectedTransaction('');
					}
				 
					
					
				 self.MyModel (new models.MyModel());
				 return true;
				}
		}
					
					
               
			
		
        },
        clear: {
            ResetAll: function () {
                self.MyModel(new models.MyModel());
                self.DataList([]);
            },
        },
        functions: {
            Save: function () {

                if ($("#demoGrid").pqGrid("instance")) {
                    $("#demoGrid").pqGrid('option', 'dataModel.data', ko.toJS(self.DataList()));
                    $("#demoGrid").pqGrid('refreshDataAndView');
                }
                else {
                    const options = Object.assign({}, pqOptions);
                    options.colModel = [
                        { title: "Address", align: "center", dataIndx: "AddressName", width: "40%" },
                        { title: "StreetName", align: "center", dataIndx: "StreetName", width: "25%" },
                        { title: "House Number", align: "center", dataIndx: "HouseNumber", width: "15%" },
                        {
                             title: "Action", align: "left", render: function (ui) {
                                 return `<button type='button' title='Delete' onclick='obj.deleteRow("${ui.rowIndx}")'>Delete</button>   <button type='button' title='Edit' onclick='obj.editRow("${ui.rowIndx}")'>Edit</button>
								 `


                             }, width: "20%"
                        },

                    ];
                    options.dataModel = { data: ko.toJS(self.DataList()) };
                    $("#demoGrid").pqGrid(options);
                }
            },
            Delete: function (index) {
                self.DataList.splice(index, 1);
                UiEvents.functions.Save(); 
            },
        },

    };

    function Init() {
        models.UiElements();
        UiEvents.clear.ResetAll();
        UiEvents.functions.Save();
    }
    Init();
}

var obj;

$(document).ready(function () {
    obj = new IndexVM();
    ko.applyBindings(obj);

});