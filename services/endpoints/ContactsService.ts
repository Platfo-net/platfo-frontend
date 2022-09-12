import $axios from "../axios.config";

class Contacts {
  getContactDetails = ( id) =>
    $axios.get(`api/v1/contact/${id}`);

  postUpdateContactProfile = (data, igs_id) =>
    $axios.post(`api/v1/contact/profile/${igs_id}`, data);

  getContacts = (params, page_id) =>
    $axios.get(`api/v1/contact/page/${page_id}`, { params });
}

const ContactsService = new Contacts();
export default ContactsService;
