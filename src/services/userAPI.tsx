import API from "../api/axiosConfig";

// ------------------ add user -------------------------
interface UserInterface {
  name: string;
  email: string;
  password: string;
}
export const userRegister = async (formData: UserInterface): Promise<void> => {
  console.log("in form data");

  const response = await API.post("/users/register", formData);
  return response.data;
};

//--------------- login  user -------------------------

interface user {
  email: string;
  password: String;
}
export const loginUser = async (value: user): Promise<any> => {
  const response = await API.post("/users/login", value);
  return response.data;
};

//================================ PARTIES API ===========================================

//---------------- fetch user parties ------------
export const fetchParties = async (id: string): Promise<any> => {
  console.log(id);

  const response = await API.get(`/users/parties/${id}`);
  return response.data;
};

//----------------------  add parties ------------------
export const AddPartiess = async (id: string, values: any): Promise<any> => {
  const response = await API.post(`/users/addparties/${id}`, values);
  return response.data;
};

//----------------------  delete parties ------------------
export const DeleteParties = async (
  partieId: string,
  userId: String
): Promise<any> => {
  const response = await API.delete(
    `/users/deletepartie/${partieId}/${userId}`
  );
  return response;
};

//============================= Each Parties ===================================

//---------------------- get partie transacton page ---------------

export const getPartieTransactionData = async (
  userId: string,
  partieId: any
): Promise<any> => {
  const resonse = await API.get(
    `/users/getPartieTransaction/${userId}/${partieId}`
  );
  return resonse.data;
};

// --------------------- add Borrowing --------------------------------

export const addBorrowing = async (
  value: object,
  userId: String,
  partieId: String
): Promise<any> => {
  const response = await API.post(
    `/users/addLending/${userId}/${partieId}`,
    value
  );
  return response.data;
};

// --------------------- add Lending --------------------------------
export const addLending = async (
  value: object,
  userId: String,
  partieId: String
): Promise<any> => {
  const response = await API.post(
    `/users/addLending/${userId}/${partieId}`,
    value
  );
  return response.data;
};

// ======================================== === contorlles === ==============================================

// ----------------------------- get user controlled data ---------------------
export const userControllers = async (id: any): Promise<any> => {
  const response = await API.get(`/users/getControlles/${id}`);
  return response.data;
};

// -------------- add user controllers ------------------------
export const addControlApi = async (
  value: object,
  id: String
): Promise<any> => {
  const response = await API.post(`/users/addControll/${id}`, value);
  response.data;
};


// ----------------------------edit user control ------------------------
export const editControlApi = async (
  value: object,
  id: String,
  controlId: String
): Promise<any> => {
  const response = await API.put(`/users/editControl/${id}/${controlId}`,value);
  return response.data;
};


// ========================================== === Cash book === =================================================
export const  addCredit=async (userId:string,value:object):Promise<any>=>{
    const response=await API.post(`/users/addCredit/${userId}`,value)
}
 

//----------------------------- fetch control data ------------
