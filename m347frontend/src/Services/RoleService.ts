import api from "../config/Api";

const RoleService = {
  findAll: () => api.get("/roles")}
export default RoleService;
