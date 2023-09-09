import api from "@/services/api";

class HomeServices {
  static projApi() {
    return api.get(`home`);
  }
}
export default HomeServices;
