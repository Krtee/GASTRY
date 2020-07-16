const UserController = require("./user.controller");
const CustomerModel = require("../models/customer.model");
const SupplierModel = require("../models/supplier.model");

class CustomerController extends UserController {
    constructor(model) {
        super(model);
    }

    getSuppliersList = async (req, res) => {
        try {
            const category = req.params.category;
            console.log(category)
            const suppliers = await SupplierModel.find({});
            const suppliersInfo = suppliers.filter((supplier) => {
                if (category == "both"){
                    return true;
                }
                else {
                    if (supplier.category == "both") {
                        return true
                    }
                    else {
                        return supplier.category == category
                    }
                }
            }).map((supplier) => {
                return {
                    _id: supplier._id,
                    name: supplier.company,
                    address: supplier.address,
                };
            });
            res.status(200).send({
                message: "Successfully fetched all suppliers",
                data: suppliersInfo,
            });
        } catch (e) {
            res.status(400).send({
                error: e,
            });
        }
    };
}

module.exports = new CustomerController(CustomerModel);
