const Role = require("../schemas/mst_roles.schema");
const Trade = require("../schemas/mst_trade_schema");
const Permission = require("../schemas/mst_permissions.schema")
const sendResponse = require("../utils/sendResponse");


const getRoles = async (req, res)=>{
  try {
    const getAllRoles = await Role.find();

    responseJSON["rid"] = "s-mst-1";
    responseJSON["data"] = getAllRoles;
    return sendResponse(responseJSON, res);
  } catch (err) {
    console.log("err", err);

    err.rid = "e-mst-1";
    return sendResponse({ rid: "e-mst-1", data: err.message }, res);
  }
}

const getAllTrades = async (req, res)=>{
  try {
    const getAllTrade = await Trade.find().sort({ index: 1 });

    responseJSON["rid"] = "s-mst-2";
    responseJSON["data"] = getAllTrade;
    return sendResponse(responseJSON, res);
  } catch (err) {
    console.log("err", err);

    err.rid = "e-mst-1";
    return sendResponse({ rid: "e-mst-1", data: err.message }, res);
  }
}


const getAllPermission = async (req, res)=>{
  try {
    const getAllPermission = await Permission.find();
console.log("getAllPermission",getAllPermission);

    responseJSON["rid"] = "s-mst-3";
    responseJSON["data"] = getAllPermission;
    return sendResponse(responseJSON, res);
  } catch (err) {
    console.log("err", err);

    err.rid = "e-mst-1";
    return sendResponse({ rid: "e-mst-1", data: err.message }, res);
  }
}

module.exports = {
getRoles,
getAllTrades,
getAllPermission
};
