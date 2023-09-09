import api from "@/services/api";

class FavoritesServices {
  static favProjApi() {
    return api.get(`member/project?user_list=1&page=1`);
  }
}
export default FavoritesServices;
