sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"
], function (Controller, MessageToast) {
    "use strict";

    return Controller.extend("com.demo.b72ui5app.controller.View1", {

        onInit: function () {
            // API call or model initialization
        },

        onViewProduct: function (oEvent) {

            // Get the selected product
            var oContext = oEvent.getSource().getBindingContext();

            if (!oContext) {
                MessageToast.show("No product selected");
                return;
            }

            // Create the dialog only once
            if (!this._pProductDialog) {
                this._pProductDialog = this.loadFragment({
                    name: "com.demo.b72ui5app.view.ProductDetail"
                });
            }

            // Open the dialog
            this._pProductDialog.then(function (oDialog) {

                // Show the selected product
                oDialog.bindElement(oContext.getPath());

                // Open popup
                oDialog.open();
            });
        },

        onCloseProductDialog: function (oEvent) {

            // Close the dialog
            oEvent.getSource().getParent().close();
        },

        onDeleteProduct: function (oEvent) {

            var oContext = oEvent.getSource().getBindingContext(); // Get the context/ address of the selected product
            var oModel = this.getView().getModel();// Get the model from the view

            var sPath = oContext.getPath(); // Get the path of the selected product in the model
            var aProducts = oModel.getProperty("/Products"); // Get the array of products from the model

            var iIndex = parseInt(sPath.split("/")[2], 10); // Extract the index of the selected product from the path

            aProducts.splice(iIndex, 1);// Remove the product from the array

            oModel.setProperty("/Products", aProducts);// Update the model with the modified array of products

            MessageToast.show("Product deleted");// Show a message toast to indicate that the product has been deleted
        },


        onAddProduct: function () {

            // Create dialog only once
            if (!this._pAddDialog) {
                this._pAddDialog = this.loadFragment({
                    name: "com.demo.b72ui5app.view.AddProduct"
                });
            }

            // Open dialog
            this._pAddDialog.then(function (oDialog) {
                oDialog.open();
            });
        },

        onSaveNewProduct: function () {

            // Get model 
            var oModel = this.getView().getModel();

            // Get existing products
            var aProducts = oModel.getProperty("/Products");

            // Get values from input fields
            var sTitle = this.byId("inpNewTitle").getValue();
            var sPrice = this.byId("inpNewPrice").getValue();
            var sCategory = this.byId("inpNewCategory").getValue();

            // Check title
            if (!sTitle) {
                MessageToast.show("Please enter a title");
                return;
            }

            // Create new product
            var oNewProduct = {
                id: aProducts.length + 1,
                title: sTitle,
                price: Number(sPrice),
                category: sCategory || "General"
            };

            // Add product to array
            aProducts.push(oNewProduct);

            // Update model
            oModel.setProperty("/Products", aProducts);

            // Close dialog
            this.byId("addProductDialog").close();

            // Show message
            MessageToast.show("Product added");
        },

        onCancelAddProduct: function (oEvent) {

            oEvent.getSource().getParent().close();

        }
    }

    );
});