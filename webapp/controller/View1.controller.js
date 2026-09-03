sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"
], function (Controller, MessageToast) {
    "use strict";

    return Controller.extend("com.demo.b72ui5app.controller.View1", {   

        onInit: function () {
            // API call or model initialization
        },

        onAddProduct: function () {
            MessageToast.show("Add Product clicked");
        },

        onViewProduct: function (oEvent) {
            var oItem = oEvent.getSource().getParent();
            var oContext = oItem.getBindingContext();

            var oProduct = oContext.getObject();
            MessageToast.show("Product: " + oProduct.title);
        }

    });
});