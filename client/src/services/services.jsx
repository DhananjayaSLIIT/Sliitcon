/* eslint-disable no-useless-concat */
import axios from "axios";

const GET_CONF = "http://localhost:5000/api/v1/get-conferences";
const Add_RESEARCH = "http://localhost:5000/api/v1/add-research";
const GET_USER_RESEARCH = "http://localhost:5000/api/v1/get-all-researchById/";
const GET_PAYMENT = "http://localhost:5000/api/v1/get-payment";
const GET_APPROVED = `http://localhost:5000/api/v1/all-approved-research/`;
const DOWNLOAD = "http://localhost:5000/api/v1/download/";
const MAKE_PAYMENT = "http://localhost:5000/api/v1/update-payment/"
const GET_PAYED = "http://localhost:5000/api/v1/get-all-payed";
const GET_R_BY_ID = "http://localhost:5000/api/v1/get-research-by-id/";
const UPDATE_RESEARCH = "http://localhost:5000/api/v1/update-research/";
const RES_FOR_CONF = "http://localhost:5000/api/v1/research-by-name/";



class Services{


     getConferences  () {
        return axios.get(GET_CONF);
    }

    addResearch (research) {
       return axios.post(Add_RESEARCH,research,{
           headers: {
               'Content-Type': 'multipart/form-data'
           }
       });
    }

    getResearchPapersByUserId (id) {
        return axios.get(GET_USER_RESEARCH+""+id);
    }

    getPayment () {
        return axios.get(GET_PAYMENT );
    }

    getAllApproved (researchEmail){//complete
        return axios.get(GET_APPROVED+""+ researchEmail);
    }

    getDownload (e, filePath, name){
        return axios.get(DOWNLOAD+""+filePath,{responseType: 'blob',})
    }
    makePayment(id,payment){
        return axios.get(MAKE_PAYMENT+`${id}`+`/`+`${payment}`);
    }
    getAllPayed(){
        return axios.get(GET_PAYED);
    }
    getResearchById(id){
        return axios.get(GET_R_BY_ID+`${id}`);
    }
    updateResearchPaper(id,research){
        return axios.put(UPDATE_RESEARCH +`${id}`,research,{
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    }
    getConferencesResearch(name){
        return axios.get(RES_FOR_CONF+`${name}`);
    }
}
export default new Services()